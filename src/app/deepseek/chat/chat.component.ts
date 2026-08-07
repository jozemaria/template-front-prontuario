import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Router } from '@angular/router';
import { MatModule } from 'src/app/appModules/mat.module';
import { FerraduraPipe } from 'src/app/shared/pipe/ferradura.pipe';
import { FerraduraClassPipe } from 'src/app/shared/pipe/ferradura-class.pipe';
import { DeepseekService, ChatMessage } from '../deepseek.service';
import { ChatContextService } from '../chat-context.service';
import { isVeterinaryTopic, OFF_TOPIC_MESSAGE } from '../topic-guard';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MatModule, FormsModule, TextFieldModule, FerraduraPipe, FerraduraClassPipe],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private readonly deepseekService = inject(DeepseekService);
  readonly chatContext = inject(ChatContextService);
  private readonly router = inject(Router);

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  mensagens: ChatMessage[] = [];
  mensagemAtual = '';
  carregando = false;
  contextoCavalo: any = null;
  horseId: number | null = null;

  ngOnInit(): void {
    this.contextoCavalo = this.chatContext.horseContext;
    this.horseId = this.chatContext.horseId;

    if (this.contextoCavalo) {
      this.mensagens.push({
        role: 'assistant',
        content: `Olá! Vou analisar os dados do prontuário de ${this.contextoCavalo?.horse?.name ?? 'este cavalo'}. Descreva os sinais clínicos que está observando para eu ajudar a identificar o que pode estar ocorrendo.`
      });
    } else {
      this.mensagens.push({
        role: 'assistant',
        content: 'Olá! Sou seu assistente veterinário de equinos. Descreva os sinais clínicos ou faça sua pergunta para eu ajudar a identificar o que pode estar ocorrendo.'
      });
    }
  }

  enviar(): void {
    const texto = this.mensagemAtual.trim();
    if (!texto || this.carregando) return;

    if (!isVeterinaryTopic(texto)) {
      this.mensagens.push({ role: 'user', content: texto });
      this.mensagens.push({ role: 'assistant', content: OFF_TOPIC_MESSAGE });
      this.mensagemAtual = '';
      this.rolarParaBaixo();
      return;
    }

    this.mensagens.push({ role: 'user', content: texto });
    this.mensagemAtual = '';
    this.carregando = true;
    this.rolarParaBaixo();

    const contexto = this.contextoCavalo;

    this.deepseekService.enviarMensagemStream(this.mensagens, contexto).subscribe({
      next: (delta) => {
        const ultima = this.mensagens[this.mensagens.length - 1];
        if (ultima?.role === 'assistant') {
          ultima.content += delta;
        } else {
          this.mensagens.push({ role: 'assistant', content: delta });
        }
        this.rolarParaBaixo();
      },
      error: (err) => {
        this.carregando = false;
        const msgErro = err?.message || 'Não foi possível obter uma resposta. Verifique se o servidor proxy está rodando.';
        const prefixo = msgErro === OFF_TOPIC_MESSAGE ? '' : 'Erro: ';
        this.mensagens.push({ role: 'assistant', content: `${prefixo}${msgErro}` });
        this.rolarParaBaixo();
      },
      complete: () => {
        this.carregando = false;
        this.rolarParaBaixo();
      }
    });
  }

  novoChat(): void {
    this.chatContext.clear();
    this.contextoCavalo = null;
    this.horseId = null;
    this.mensagens = [
      {
        role: 'assistant',
        content: 'Conversa reiniciada. O que deseja perguntar?'
      }
    ];
  }

  voltarAoProntuario(): void {
    if (this.horseId) {
      this.router.navigateByUrl(`animais/prontuario/${this.horseId}`);
    } else {
      this.router.navigateByUrl('animais');
    }
  }

  rolarParaBaixo(): void {
    setTimeout(() => {
      this.messagesContainer?.nativeElement.scrollTo({
        top: this.messagesContainer.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
}
