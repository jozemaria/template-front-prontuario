# Payload da resenha com imagem fixa e anotações

## 1. Formato de envio para o backend

O frontend envia os dados da resenha em um `FormData`, incluindo os campos adicionais abaixo no bloco `horse`:

```ts
const formData = new FormData();

formData.append('horse[name]', horseForm.get('name')?.value);
formData.append('horse[weight]', horseForm.get('weight')?.value);
// ... demais campos da resenha

formData.append(
  'horse[review_image_url]',
  'assets/images/resenha/Imagem_Cavalo_Informacoes.png'
);

formData.append(
  'horse[image_annotations]',
  JSON.stringify([
    {
      id: 1,
      x: 32,
      y: 58,
      note: 'Lesão na pata dianteira',
      created_at: '2026-08-07T00:00:00.000Z'
    }
  ])
);
```

### Campos enviados
- `horse[review_image_url]`: URL ou caminho da imagem fixa usada na resenha.
- `horse[image_annotations]`: lista de observações marcadas na imagem, em formato JSON.

Cada anotação deve ter a seguinte estrutura:

```json
{
  "id": 1,
  "x": 32,
  "y": 58,
  "note": "Lesão na pata dianteira",
  "created_at": "2026-08-07T00:00:00.000Z"
}
```

## 2. Formato esperado no retorno do backend

O backend pode responder com qualquer uma destas estruturas compatíveis:

### Opção A: dentro de `horse`

```json
{
  "horse": {
    "name": "Rex",
    "review_image_url": "assets/images/resenha/Imagem_Cavalo_Informacoes.png",
    "image_annotations": [
      {
        "id": 1,
        "x": 32,
        "y": 58,
        "note": "Lesão na pata dianteira",
        "created_at": "2026-08-07T00:00:00.000Z"
      }
    ]
  }
}
```

### Opção B: no objeto raiz

```json
{
  "review_image_url": "assets/images/resenha/Imagem_Cavalo_Informacoes.png",
  "image_annotations": [
    {
      "id": 1,
      "x": 32,
      "y": 58,
      "note": "Lesão na pata dianteira",
      "created_at": "2026-08-07T00:00:00.000Z"
    }
  ]
}
```

## 3. Observações importantes

- `image_annotations` pode vir como array JSON já parseado ou como string JSON.
- O frontend já foi preparado para consumir ambos os formatos.
- O campo `review_image_url` pode vir como `review_image_url`, `review_image`, `image_url` ou similares, dependendo do backend.
