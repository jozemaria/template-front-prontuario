import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusComponent } from './modal/status/status.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimaisService } from 'src/app/animais/service/animais.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { StatusTextPipe } from 'src/app/shared/pipe/status-text.pipe';
import { FerraduraPipe } from 'src/app/shared/pipe/ferradura.pipe';
import { FerraduraClassPipe } from 'src/app/shared/pipe/ferradura-class.pipe';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface IHorseImageAnnotation {
  id: number;
  x: number;
  y: number;
  note: string;
  created_at: string;
}

// Entrada individual retornada pelo search do histórico
export interface IHistoricoEntry {
  id: number;
  type: string;
  created_at?: string;
  user?: string;
  user_crm?: string;
  description?: string;
  name?: string;
  doses?: string;
  hour?: string;
  shoe_date?: string;
  exchange_months?: number;
  photo_url?: string;
}

// Grupo de atendimento: um histórico (history_horse_records) com seus cards
export interface IHistoricoGroup {
  id: number;
  openAt: string;
  closeAt: string;
  entries: IHistoricoEntry[];
}

export interface IFichaCavalo {
  id: number;
  name: string;
  gender: string;
  weight: string;
  kind: string;
  hair: string;
  birthday: string;
  baia: string;
  description: string;
  active: boolean;
  status: boolean;
  owner: any;
  created_at: boolean;
  photo_url: string;
  cover_url: string;
  status_description: string;
  last_shoe_date?: string;
  exchange_months?: number;
  father?: string;
  mother?: string;
  registation?: string;
  breed?: string;
  identification?: string;
  tombamento?: string;
  image_annotations?: IHorseImageAnnotation[];
  review_image_url?: string;
}

@Component({
  selector: 'app-resenha-completa',
  standalone: true,
  imports: [CommonModule, MatModule, StatusTextPipe, FerraduraPipe, FerraduraClassPipe],
  templateUrl: './resenha-completa.component.html',
  styleUrl: './resenha-completa.component.scss'
})
export class ResenhaCompletaComponent implements OnInit {
  readonly router = inject(Router)
  readonly route = inject(ActivatedRoute)
  readonly dialog = inject(MatDialog);
  readonly animaisService = inject(AnimaisService)
  readonly location = inject(Location)
  readonly sweetAlertService = inject(SweetalertService)

  dadosCavalo: IFichaCavalo
  idResenha: number
  imageAnnotations: IHorseImageAnnotation[] = []
  // grupos de atendimento, mais recentes primeiro
  historicoGrouped: IHistoricoGroup[] = []
  historicoLoading = false
  prontuarioCode: string = ''
  @ViewChild('fichaContent', { static: false }) fichaContent!: ElementRef;

  get initials(): string {
    return this.dadosCavalo?.name
      ? this.dadosCavalo.name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
      : '';
  }

  ngOnInit(): void {
    this.idResenha = parseInt(this.route.snapshot.paramMap.get('id'))
    this.getResenha()
  }

  botaoVoltar() {
    this.location.back()
  }

  async exportarPDF() {
    this.sweetAlertService.confirmAlert('info', 'Deseja fazer o download da ficha?', `Ficha individual de ${this.dadosCavalo?.name || 'cavalo'}`).subscribe(
      async (res: any) => {
        if (!res) return;

        const element = this.fichaContent.nativeElement;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          onclone: (clonedDoc) => {
            const actions = clonedDoc.querySelector('.action-buttons');
            if (actions) {
              (actions as HTMLElement).style.display = 'none';
            }
          }
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = position - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        const filename = this.dadosCavalo?.name
          ? `Ficha_${this.dadosCavalo.name.replace(/\s+/g, '_')}.pdf`
          : 'Ficha_Cavalo.pdf';
        pdf.save(filename);
      }
    );
  }

  editarResenha(id: number) {
    this.router.navigateByUrl('animais/resenha/' + id)
  }

  deletarResenha(id: number) {
    this.sweetAlertService.confirmAlert('warning', 'Deseja excluir esta resenha?', 'Essa ação não pode ser desfeita.').subscribe(
      (res: any) => {
        if (res) {
          this.animaisService.deleteAnimal(id).subscribe({
            next: () => {
              this.sweetAlertService.alert('success', 'Sucesso!', 'Resenha excluída.')
              this.router.navigateByUrl('animais')
            },
            error: (err: any) => {
              this.sweetAlertService.alert('error', 'Ops...', 'Erro: ' + (err.error[0] || err.error.error))
            }
          })
        }
      }
    )
  }

  openDialogStatus(): void {
    const dialogRef = this.dialog.open(StatusComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.animaisService.editarStatus({ horse: result }, this.idResenha).subscribe({
          error: err => {
            this.sweetAlertService.alert('error', 'Ops...', 'Erro: ' + err.error.error)
          },
          complete: () => {
            this.sweetAlertService.alert('success', 'Sucesso', 'Status atualizado com sucesso.')
            this.getResenha()
          }
        })
      }
    });
  }

  getResenha() {
    this.animaisService.getAnimalById(this.idResenha).subscribe({
      next: (res: any) => {
        this.dadosCavalo = res
        if (res.birthday) {
          this.dadosCavalo.birthday = format(res.birthday, 'dd/MM/yyyy', { locale: ptBR })
        }

        const annotations = res?.image_annotations || res?.horse?.image_annotations
        if (annotations) {
          this.imageAnnotations = Array.isArray(annotations) ? annotations : JSON.parse(annotations)
        } else {
          this.imageAnnotations = []
        }

        this.loadHistorico()
      },
      error: (err: any) => {
        if (err?.status === 404) {
          this.router.navigateByUrl('/cavalo-nao-encontrado')
        }
      }
    })
  }

  loadHistorico() {
    this.historicoLoading = true
    this.animaisService.historicoProntuario(this.idResenha).subscribe({
      next: (res: any) => {
        const records = res?.history_horse_records || []
        this.prontuarioCode = res?.code_number || records?.[records.length - 1]?.id?.toString() || ''

        if (records.length === 0) {
          this.historicoGrouped = []
          this.historicoLoading = false
          return
        }

        const lastThree = records.slice(-3)
        const requests = lastThree.map((record: any) =>
          this.animaisService.pegarHistorico(record.id).pipe(
            catchError(() => of(null))
          )
        )

        forkJoin(requests).subscribe({
          next: (results: any[]) => {
            this.historicoGrouped = this.buildHistorico(lastThree, results)
            this.historicoLoading = false
          },
          error: () => {
            this.historicoGrouped = []
            this.historicoLoading = false
          }
        })
      },
      error: () => {
        this.historicoGrouped = []
        this.historicoLoading = false
      }
    })
  }

  private buildHistorico(records: any[], results: any[]): IHistoricoGroup[] {
    const groups = records.map((record: any, index: number) => {
      const res = results[index]
      const entries: IHistoricoEntry[] = []

      if (res && typeof res === 'object') {
        Object.keys(res).forEach(date => {
          const list = res[date]
          if (!Array.isArray(list)) return
          list.forEach((item: any) => {
            const entry = this.normalizeEntry(item)
            if (entry && entry.type) entries.push(entry)
          })
        })
      }

      return {
        id: record.id,
        openAt: record.open_at,
        closeAt: record.close_at,
        entries
      }
    })

    return groups.sort((a, b) => {
      const aOpen = !a.closeAt
      const bOpen = !b.closeAt
      if (aOpen !== bOpen) return aOpen ? -1 : 1
      return this.parseGroupDate(a.openAt) - this.parseGroupDate(b.openAt)
    })
  }

  private parseGroupDate(value: string): number {
    if (!value) return 0
    const parsed = Date.parse(value)
    if (!isNaN(parsed)) return parsed
    return this.parseDateBR(value)
  }

  formatGroupDate(value?: string): string {
    if (!value) return '—'
    const parsed = Date.parse(value)
    if (!isNaN(parsed)) {
      return format(new Date(value), 'dd/MM/yyyy HH:mm', { locale: ptBR })
    }
    return value
  }

  private normalizeEntry(item: any): IHistoricoEntry {
    return {
      id: item?.id,
      type: item?.type || '',
      created_at: item?.created_at,
      user: item?.user,
      user_crm: item?.user_crm,
      description: item?.description,
      name: item?.name,
      doses: item?.doses,
      hour: item?.hour,
      shoe_date: item?.shoe_date,
      exchange_months: item?.exchange_months,
      photo_url: item?.photo_url || item?.url || item?.path
    }
  }

  private parseDateBR(date: string): number {
    const parts = (date || '').split('/').map(Number)
    if (parts.length !== 3 || parts.some(isNaN)) return 0
    return new Date(parts[2], parts[1] - 1, parts[0]).getTime()
  }

  private entryCategory(entry: IHistoricoEntry): string {
    const t = (entry.type || '').toLowerCase()
    if (t.includes('medicamento')) return 'medicamento'
    if (t.includes('prescr')) return 'prescricao'
    if (t.includes('foto') || t.includes('imagem') || t.includes('image')) return 'foto'
    if (t.includes('shoe') || t.includes('ferradura')) return 'ferradura'
    return 'outro'
  }

  isFoto(entry: IHistoricoEntry): boolean {
    return this.entryCategory(entry) === 'foto'
  }

  isMedicamento(entry: IHistoricoEntry): boolean {
    return this.entryCategory(entry) === 'medicamento'
  }

  isPrescricao(entry: IHistoricoEntry): boolean {
    return this.entryCategory(entry) === 'prescricao'
  }

  isFerradura(entry: IHistoricoEntry): boolean {
    return this.entryCategory(entry) === 'ferradura'
  }

  isOutro(entry: IHistoricoEntry): boolean {
    return this.entryCategory(entry) === 'outro'
  }

  entryIcon(entry: IHistoricoEntry): string {
    switch (this.entryCategory(entry)) {
      case 'medicamento': return 'local_pharmacy'
      case 'prescricao': return 'assignment'
      case 'foto': return 'photo_library'
      case 'ferradura': return 'agriculture'
      default: return 'widgets'
    }
  }

  entryTypeLabel(entry: IHistoricoEntry): string {
    switch (this.entryCategory(entry)) {
      case 'medicamento': return 'Medicamento'
      case 'prescricao': return 'Prescrição'
      case 'foto': return 'Foto'
      case 'ferradura': return 'Ferradura'
      default: return entry.type || 'Registro'
    }
  }
}
