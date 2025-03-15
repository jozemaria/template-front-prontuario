import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDialog } from '@angular/material/dialog';
import { MedicamentosComponent } from '../modals/medicamentos/medicamentos.component';
import { AltaComponent } from '../modals/alta/alta.component';
import { ObservacoesComponent } from '../modals/observacoes/observacoes.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimaisService } from '../service/animais.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { FotosComponent } from '../modals/fotos/fotos.component';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface IFichaCavalo {
  id?: number,
  open?: boolean,
  code_number?: string,
  user?: string,
  user_crm?: string,
  created_at?: string,
  informations?: any,
  horse?: {
    id?: number,
    name?: string,
    gender?: string,
    weight?: string,
    kind?: string,
    hair?: string,
    birthday?: string,
    baia?: string,
    description?: string,
    status?: boolean,
    owner?: boolean,
    created_at?: boolean,
    picture?: string
  },
  history_horse_records?: {
    id: number,
    open_at: string,
    close_at: string,
    user: string
  }
}

@Component({
  selector: 'app-prontuario',
  standalone: true,
  imports: [CommonModule, MatModule, CdkAccordionModule],
  templateUrl: './prontuario.component.html',
  styleUrl: './prontuario.component.scss'
})
export class ProntuarioComponent implements OnInit {
  readonly animaisService = inject(AnimaisService)
  readonly sweetAlertService = inject(SweetalertService)
  readonly route = inject(ActivatedRoute)
  readonly location = inject(Location)

  dadosCavalo: IFichaCavalo
  idCavalo: number
  isData = false

  expandedIndex = 0;
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router)
  changeDetection: ChangeDetectionStrategy.OnPush
  displayedColumns: string[] = ['id', 'open_at', 'close_at'];

  ngOnInit() {
    this.idCavalo = parseInt(this.route.snapshot.paramMap.get('id'))
    this.carregarInformacoes()
  }

  openDialogMedicamentos(): void {
    const dialogRef = this.dialog.open(MedicamentosComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      result.horse_id = this.idCavalo
      const dadosPronturaio = { "medicament": result }
      this.animaisService.salvarNoProntuario('medicaments', dadosPronturaio).subscribe({
        error: err => {
          this.sweetAlertService.alert('error', 'Ops...', 'Erro: ' + err.error.error)
        },
        complete: () => {
          this.sweetAlertService.alert('success', 'Sucesso', 'Medicamentos adicionado com sucesso.')
          this.carregarInformacoes()
        }
      })
    })
  }

  openDialogAlta(): void {
    const dialogRef = this.dialog.open(AltaComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.animaisService.fecharAtendimento(this.idCavalo).subscribe({
          error: err => {
            this.sweetAlertService.alert('error', 'Ops...', 'Erro: ' + err.error.error)
          },
          complete: () => {
            this.sweetAlertService.alert('success', 'Sucesso', 'Prontuário fechado com sucesso e cavalo apto para suas jornadas.')
            this.router.navigateByUrl('animais')
            this.carregarInformacoes()
          }
        })
      }
    });
  }
  openDialogObservacao(): void {
    const dialogRef = this.dialog.open(ObservacoesComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      result.horse_id = this.idCavalo
      const dadosPronturaio = { "prescription": result }
      this.animaisService.salvarNoProntuario('prescriptions', dadosPronturaio).subscribe({
        error: err => {
          this.sweetAlertService.alert('error', 'Ops...', 'Erro: ' + err.error.error)
        },
        complete: () => {
          this.sweetAlertService.alert('success', 'Sucesso', 'Prescrição adicionada.')
          this.carregarInformacoes()
        }
      })
    });
  }

  openDialogFotos(): void {
    const dialogRef = this.dialog.open(FotosComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      const id = this.idCavalo
      const formData = new FormData();

      if (result) {
        formData.append('horse_photo[description]', result.registration.description)
        formData.append('horse_photo[photo]', result.file)
        formData.append('horse_photo[horse_id]', this.idCavalo.toString())
        this.animaisService.salvarFotoEvolucao(formData).subscribe({
          error: (err: any) => {
            this.sweetAlertService.alert('error', 'Ops...', 'Erro: ' + err.error[0])
          },
          complete: () => {
            this.sweetAlertService.alert('success', 'Sucesso!', 'Evolução registrada.')
            this.carregarInformacoes()
          }
        })
      }
    });
  }

  getDates(informations: any): string[] {
    return Object.keys(informations);
  }

  carregarInformacoes() {
    this.animaisService.historicoProntuario(this.idCavalo).subscribe(res => {
      Object.keys(res.informations).length === 0 ? this.isData = true : this.isData = false
      this.dadosCavalo = res
      this.dadosCavalo.horse['birthday'] = format(res.horse.birthday, 'dd/MM/yyyy', { locale: ptBR });
    })
  }

  pegarHistorico(id) {
    this.animaisService.pegarHistorico(id).subscribe(res => {
      this.dadosCavalo.informations = res
      Object.keys(this.dadosCavalo.informations).length === 0 ? this.isData = true : this.isData = false
    })
  }

  botaoVoltar() {
    this.location.back()
  }
}
