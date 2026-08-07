import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeepseekService {
  private readonly http = inject(HttpClient);

  enviarMensagem(messages: ChatMessage[], horseContext: any = null): Observable<{ content: string }> {
    return this.http.post<{ content: string }>(environment.DEEPSEEK_API_URL, {
      messages,
      horseContext,
      stream: false
    });
  }

  enviarMensagemStream(messages: ChatMessage[], horseContext: any = null): Observable<string> {
    return new Observable<string>((subscriber) => {
      const controller = new AbortController();

      fetch(environment.DEEPSEEK_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, horseContext, stream: true }),
        signal: controller.signal
      })
        .then(async (response) => {
          if (!response.ok) {
            let errText = '';
            try {
              errText = await response.text();
            } catch {
              // ignora falha ao ler o corpo do erro
            }
            let message = 'Erro ao chamar o assistente.';
            if (errText) {
              try {
                const parsed = JSON.parse(errText);
                message = parsed?.error || errText;
              } catch {
                message = errText;
              }
            }
            throw new Error(message);
          }

          const reader = response.body?.getReader();
          if (!reader) {
            subscriber.complete();
            return;
          }

          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const data = line.slice(6).trim();
              if (!data || data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed?.choices?.[0]?.delta?.content;
                if (delta) subscriber.next(delta);
              } catch {
                // ignora blocos parciais ou inválidos
              }
            }
          }

          subscriber.complete();
        })
        .catch((error) => subscriber.error(error));

      return () => controller.abort();
    });
  }
}
