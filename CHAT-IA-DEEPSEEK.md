# Chat com IA (DeepSeek) — Prontuário Eletrônico Equino

Documentação de instalação e execução da integração do assistente de IA (DeepSeek) no prontuário eletrônico.

## Visão geral

O sistema permite que o veterinário converse com a IA do DeepSeek para tirar dúvidas sobre o que pode estar ocorrendo com um cavalo. O chat pode:

- Ser acessado pelo menu lateral em **Prontuário → Chat com IA** (rota `/assistente`).
- Receber automaticamente os dados do prontuário do cavalo em análise, ao clicar no botão **"Perguntar à IA"** dentro da página do prontuário do animal.

### Arquitetura

```
┌─────────────────────┐      POST /api/chat       ┌─────────────────────┐     HTTPS      ┌──────────────────────┐
│  Angular (frontend) │ ─────────────────────────► │  Proxy Node/Express │ ─────────────► │  DeepSeek API        │
│  src/app/deepseek/  │  stream + contexto do     │  deepseek-server/   │  Bearer token  │  api.deepseek.com     │
└─────────────────────┘  cavalo                   └─────────────────────┘  (chave no     └──────────────────────┘
                                                          │                  .env)
                                                          ▼
                                              Chave da API protegida
                                              (nunca exposta no frontend)
```

A chave da API do DeepSeek **nunca** fica no código do frontend. Um proxy próprio (Node/Express) guarda a chave no arquivo `.env` e repassa as chamadas à API oficial.

## Pré-requisitos

- Node.js **18 ou superior** (recomendado: 20+)
- npm
- Uma conta e chave de API no [DeepSeek Platform](https://platform.deepseek.com/api_keys)
- Projeto Angular (já configurado)

## 1. Configurar o proxy (backend)

O proxy fica na pasta `deepseek-server/`.

### 1.1 Instalar dependências

```bash
cd deepseek-server
npm install
```

### 1.2 Configurar a chave da API

Copie o arquivo de exemplo e preencha com sua chave:

```bash
copy .env.example .env
```

Edite o `.env`:

```env
DEEPSEEK_API_KEY=sk-sua-chave-aqui
DEEPSEEK_MODEL=deepseek-chat
PORT=3000
```

> - `DEEPSEEK_API_KEY`: obrigatória. Obtenha em https://platform.deepseek.com/api_keys
> - `DEEPSEEK_MODEL`: `deepseek-chat` (padrão) ou `deepseek-reasoner`
> - `PORT`: porta do proxy (padrão `3000`)

> ⚠️ O `.env` está no `.gitignore` e não deve ser versionado.

### 1.3 Rodar o proxy

```bash
npm start
```

Para desenvolvimento com reinício automático:

```bash
npm run dev
```

O servidor deve exibir:

```
DeepSeek proxy rodando em http://localhost:3000
```

### 1.4 Testar se o proxy está de pé

```bash
curl http://localhost:3000/health
# Resposta esperada: {"status":"ok"}
```

## 2. Configurar o frontend (Angular)

O endpoint do proxy é configurado em `src/environment/environment.ts`:

```ts
export const environment = {
  URL_BASE: 'https://cavalaria.onrender.com/api/v1/',
  TOKEN_TEST: '...',
  DEEPSEEK_API_URL: 'http://localhost:3000/api/chat'
};
```

- Em desenvolvimento, `http://localhost:3000/api/chat` já funciona.
- Em produção, troque pelo URL do proxy deployado.

## 3. Rodar o frontend

Na raiz do projeto:

```bash
npm start
```

Acesse `http://localhost:4200`.

## 4. Como usar

### Pelo menu lateral

1. Acesse **Prontuário → Chat com IA** (ou a rota `/assistente`).
2. Descreva os sinais clínicos do cavalo ou faça uma pergunta.
3. A resposta da IA é exibida em tempo real (streaming).

### Pelo prontuário do cavalo

1. Abra o prontuário de um animal (lista de cavalos → prontuário).
2. Clique no botão flutuante **"Perguntar à IA"** (canto inferior direito).
3. O chat abre já com os dados daquele cavalo anexados como contexto.
4. O banner no topo do chat indica **"Prontuário anexado"** com o nome do animal.

### Controles do chat

- **Enviar**: botão de envio ou tecla `Enter` no campo de texto.
- **Novo chat**: ícone de atualizar (↻) no cabeçalho; limpa a conversa e o contexto do cavalo.
- **Markdown**: as respostas do assistente são renderizadas como Markdown (títulos, listas, código, tabelas, citações etc.) usando a biblioteca `marked`. O HTML é sanitizado pelo Angular para remover conteúdo inseguro.

## 5. Estrutura de arquivos criada

```
deepseek-server/                        # Proxy da API do DeepSeek
├── .env.example                        # Exemplo de configuração (copie para .env)
├── .gitignore
├── package.json
├── topic-guard.js                       # Guarda de tema (palavras-chave veterinárias)
└── server.js                           # Servidor Express (endpoint POST /api/chat)

src/app/deepseek/                       # Módulo Angular do chat
├── deepseek.module.ts
├── deepseek-routing.module.ts          # Rota '' → ChatComponent
├── deepseek.service.ts                 # Chamada ao proxy (com streaming)
├── chat-context.service.ts             # Contexto do cavalo selecionado
├── topic-guard.ts                      # Guarda de tema no frontend
└── chat/
    ├── chat.component.ts
    ├── chat.component.html
    └── chat.component.scss

Arquivos alterados:
├── src/environment/environment.ts      # Adicionado DEEPSEEK_API_URL
├── src/app/shared/routes/full-layout.routes.ts   # Rota /assistente
├── src/app/shared/sidebar/sidebar.component.html # Item "Chat com IA"
└── src/app/animais/prontuario/*        # Botão "Perguntar à IA"
```

## 6. Guarda de tema (proteção contra perguntas fora do tema)

Para impedir que usuários façam perguntas aleatórias, o chat só responde sobre **medicina veterinária e mundo animal**. Essa proteção é aplicada em **três camadas**:

| Camada | Onde | O que faz |
| --- | --- | --- |
| 1. Frontend | `src/app/deepseek/topic-guard.ts` | Filtra a mensagem antes de enviar e exibe uma resposta de recusa imediata. |
| 2. Proxy (autoritativo) | `deepseek-server/topic-guard.js` | Valida a última mensagem do usuário e responde `400` se estiver fora do tema — não pode ser burlado pela interface. |
| 3. Prompt do modelo | `server.js` (SYSTEM_PROMPT) | Instrui o DeepSeek a recusar educadamente perguntas fora do tema. |

### Como funciona

A mensagem é normalizada (minúsculas, sem acentos) e comparada com uma lista de palavras-chave do domínio: equinos e prontuário, medicina veterinária, espécies animais, sinais clínicos, medicamentos, exames, doenças e manejo. Se **nenhuma** palavra-chave for encontrada, a mensagem é bloqueada com:

> "Este assistente responde apenas sobre medicina veterinária, saúde, nutrição, manejo e bem-estar de equinos e demais animais. Por favor, reformule sua pergunta dentro desse tema."

Exemplos:

| Pergunta | Permitida? |
| --- | --- |
| "Meu cavalo está com cólica, o que pode ser?" | ✅ Sim |
| "Qual a dose de flunixina para equinos?" | ✅ Sim |
| "Conte uma piada" | ❌ Não |
| "Quanto é 2+2?" | ❌ Não |

### Configuração

- **Desativar/ativar no proxy**: edite o `.env` e ajuste `ENABLE_TOPIC_GUARD=true` (ou `false`).
- **Personalizar palavras-chave**: edite a lista `TOPIC_KEYWORDS` em `deepseek-server/topic-guard.js` (e, se quiser, a lista correspondente em `src/app/deepseek/topic-guard.ts`). As palavras são comparadas sem acento e como palavra inteira.
- **Mensagem de recusa**: ajuste a constante `OFF_TOPIC_MESSAGE` nos dois arquivos se desejar outro texto.

> ⚠️ A camada 1 (frontend) é apenas UX e pode ser burlada. A camada 2 (proxy) é a que realmente protege a aplicação e o consumo de créditos da API.

## 7. Produção

Para colocar em produção:

1. **Deploy do proxy**: publique a pasta `deepseek-server` em um serviço Node (Render, Railway, Fly.io, VPS etc.) e defina `DEEPSEEK_API_KEY` como variável de ambiente.
2. **CORS**: o proxy usa `cors()` aberto (qualquer origem) para facilitar o desenvolvimento. Em produção, restrinja as origens permitidas no `server.js` para o domínio do frontend.
3. **Autenticação**: considere adicionar um token simples no proxy (ex.: cabeçalho `x-api-key`) para evitar que terceiros consumam seu crédito do DeepSeek.
4. **Frontend**: altere `DEEPSEEK_API_URL` em `environment.ts` para o URL do proxy em produção e faça o build.

## 8. Solução de problemas

| Problema | Causa provável | Solução |
| --- | --- | --- |
| `Falha na comunicação com o DeepSeek` (502) | Chave ausente/inválida no `.env` | Confira `DEEPSEEK_API_KEY` e se o `.env` foi copiado |
| `401/403` retornado pela API | Chave inválida ou sem saldo | Verifique a chave em https://platform.deepseek.com/api_keys |
| "Não foi possível obter uma resposta" no chat | Proxy não está rodando ou `DEEPSEEK_API_URL` errado | Inicie o proxy e teste `curl http://localhost:3000/health` |
| Erro de CORS no navegador | Origem bloqueada pelo proxy | Use o `cors()` padrão em desenvolvimento |
| Pergunta veterinária válida bloqueada | Palavra-chave ausente na lista | Adicione o termo em `TOPIC_KEYWORDS` (sem acento) ou desative a guarda em `.env` |
| Resposta lenta | Modelo `deepseek-reasoner` em perguntas complexas | Considere usar `deepseek-chat` |

## 9. Observações importantes

- A IA é um **apoio técnico** e o prompt do sistema reforça que a avaliação presencial do médico veterinário é indispensável.
- As mensagens enviadas ao DeepSeek podem incluir dados do prontuário do cavalo. Garanta que o uso está em conformidade com a política de privacidade do seu SaaS.
