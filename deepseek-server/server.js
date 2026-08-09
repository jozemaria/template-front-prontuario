require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Readable } = require('stream');
const { isVeterinaryTopic } = require('./topic-guard');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const ENABLE_TOPIC_GUARD = process.env.ENABLE_TOPIC_GUARD !== 'false';

const OFF_TOPIC_MESSAGE =
  'Este assistente responde apenas sobre medicina veterinária, saúde, nutrição, manejo e bem-estar de equinos e demais animais. Por favor, reformule sua pergunta dentro desse tema.';

const SYSTEM_PROMPT = `
Você é um assistente veterinário especializado em equinos que auxilia veterinários durante o atendimento.
Responda sempre em português do Brasil, de forma clara, técnica e objetiva.

Regras:
- Responda exclusivamente sobre medicina veterinária, saúde, nutrição, manejo e bem-estar de equinos e demais animais.
- Se a pergunta não tiver relação com animais ou medicina veterinária, recuse-se educadamente e oriente o veterinário a manter o foco no atendimento.
- Analise os sinais clínicos, medicamentos, prescrições e o histórico do prontuário antes de responder.
- Liste possíveis diagnósticos diferenciais do mais provável para o menos provável, sempre deixando claro que a avaliação presencial do veterinário é indispensável.
- Sugira exames complementares quando forem relevantes para confirmar ou descartar as hipóteses.
- Ao sugerir medicamentos, cite contraindicações, dosagens aproximadas e riscos, reforçando que a dose final é decisão do veterinário responsável.
- Se faltarem informações, faça perguntas objetivas sobre quais sinais clínicos adicionais seriam úteis.
- Em casos de urgência ou emergência (cólica, hemorragia, fratura, distocia, etc.), oriente o atendimento imediato do animal.
- Sua resposta é um apoio técnico e nunca substitui o exame clínico nem a conduta do médico veterinário responsável.
`;

function extrairMensagemErro(errText, status) {
  try {
    const parsed = JSON.parse(errText);
    if (parsed?.error) {
      if (typeof parsed.error === 'string') return parsed.error;
      if (parsed.error?.message) return parsed.error.message;
    }
    if (parsed?.message) return parsed.message;
  } catch {
    // resposta não é JSON
  }
  return errText
    ? errText.substring(0, 300)
    : `Erro na API do DeepSeek (HTTP ${status}).`;
}

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    if (req.path === '/api/chat') {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} → ${res.statusCode} (${Date.now() - start}ms)`);
    }
  });
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  const { messages = [], horseContext = null, stream = false } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'O campo "messages" é obrigatório.' });
  }

  const ultimaMensagem = [...messages].reverse().find((m) => m.role === 'user');
  if (ENABLE_TOPIC_GUARD && ultimaMensagem && !isVeterinaryTopic(ultimaMensagem.content)) {
    return res.status(400).json({ error: OFF_TOPIC_MESSAGE });
  }

  const systemContent = horseContext
    ? `${SYSTEM_PROMPT}\n\n## Prontuário do cavalo em análise\n${JSON.stringify(horseContext, null, 2)}\n\nUse os dados acima como contexto para responder sobre este animal.`
    : SYSTEM_PROMPT;

  const payload = {
    model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    messages: [{ role: 'system', content: systemContent }, ...messages],
    stream
  };

  try {
    const deepseekRes = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!deepseekRes.ok) {
      const errText = await deepseekRes.text();
      console.error(`[${new Date().toISOString()}] DeepSeek respondeu ${deepseekRes.status}: ${errText.substring(0, 200)}`);
      const msg = extrairMensagemErro(errText, deepseekRes.status);
      return res.status(deepseekRes.status).json({ error: msg });
    }

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      Readable.fromWeb(deepseekRes.body).pipe(res);
    } else {
      const data = await deepseekRes.json();
      const content = data?.choices?.[0]?.message?.content ?? '';
      res.json({ content });
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Erro ao chamar DeepSeek: ${error.message}`);
    res.status(502).json({
      error: 'Falha na comunicação com o DeepSeek. Verifique a chave da API e a conectividade de rede.'
    });
  }
});

app.listen(PORT, () => {
  console.log('══════════════════════════════════════════');
  console.log('  DeepSeek Proxy Veterinário');
  console.log(`  Rodando em: http://localhost:${PORT}`);
  console.log(`  Health:     http://localhost:${PORT}/health`);
  console.log('══════════════════════════════════════════');

  if (!process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY === 'sk-xxxxx') {
    console.warn('⚠  DEEPSEEK_API_KEY não configurada ou ainda é o valor de exemplo.');
    console.warn('   Copie .env.example para .env e preencha sua chave:');
    console.warn('   → https://platform.deepseek.com/api_keys');
  } else {
    console.log('  Chave da API detectada.');
  }

  if (ENABLE_TOPIC_GUARD) {
    console.log('  Guarda de tema: ATIVADA');
  } else {
    console.warn('  Guarda de tema: DESATIVADA (ENABLE_TOPIC_GUARD=false)');
  }

  console.log('══════════════════════════════════════════\n');
});
