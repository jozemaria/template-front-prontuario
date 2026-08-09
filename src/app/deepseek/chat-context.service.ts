import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatContextService {
  horseContext: any = null;
  horseId: number | null = null;

  setHorseContext(context: any, horseId?: number): void {
    this.horseContext = context;
    this.horseId = horseId ?? context?.horse?.id ?? null;
  }

  clear(): void {
    this.horseContext = null;
    this.horseId = null;
  }
}
