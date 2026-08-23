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

export interface IHistoricoRecord {
  code_number: string;
  open_at: string;
  close_at: string;
  medicamentos: { name: string; doses: string; hour: string; description: string }[];
  prescricoes: { description: string }[];
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
  historicoRecords: IHistoricoRecord[] = []
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
    this.animaisService.historicoProntuario(this.idResenha).subscribe((res: any) => {
      const records = res?.history_horse_records || []
      const lastFive = records.slice(-5)

      this.prontuarioCode = res?.code_number || records?.[records.length - 1]?.id?.toString() || ''

      if (lastFive.length === 0) {
        this.historicoRecords = []
        return
      }

      const requests = lastFive.map((record: any) =>
        this.animaisService.pegarHistorico(record.id).pipe(
          catchError(() => of(null))
        )
      )

      forkJoin(requests).subscribe((results: any[]) => {
        this.historicoRecords = results.map((result, index) => {
          const record = lastFive[index]
          if (result) {
            const info = this.extractRecordInfo(result)
            return {
              code_number: record.id.toString(),
              open_at: record.open_at || '',
              close_at: record.close_at || '',
              medicamentos: info.medicamentos,
              prescricoes: info.prescricoes
            }
          }
          return {
            code_number: record.id.toString(),
            open_at: record.open_at || '',
            close_at: record.close_at || '',
            medicamentos: [],
            prescricoes: []
          }
        })
      })
    })
  }

  private extractRecordInfo(informations: any): { medicamentos: any[]; prescricoes: any[] } {
    const medicamentos: any[] = []
    const prescricoes: any[] = []

    if (informations && typeof informations === 'object') {
      const dates = Object.keys(informations)
      dates.forEach(date => {
        const items = informations[date]
        if (Array.isArray(items)) {
          items.forEach((item: any) => {
            if (item.type === 'Medicamento') {
              medicamentos.push(item)
            } else if (item.type === 'Prescrição') {
              prescricoes.push(item)
            }
          })
        }
      })
    }

    return { medicamentos, prescricoes }
  }
}
