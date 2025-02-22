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

  dadosCavalo: any
  idCavalo: number
  isData = false

  expandedIndex = 0;
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router)
  changeDetection: ChangeDetectionStrategy.OnPush


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
      console.log('The dialog was closed');

    });
  }
  openDialogObservacao(): void {
    const dialogRef = this.dialog.open(ObservacoesComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, `resulta`)
      result.horse_id = this.idCavalo
      console.log(result, `resulta`)
      const dadosPronturaio = { "prescription": result }
      this.animaisService.salvarNoProntuario('prescriptions', dadosPronturaio).subscribe({
        error: err => {
          this.sweetAlertService.alert('error', 'Ops...', 'Erro: ' + err.error.error)
        },
        complete: () => {
          this.sweetAlertService.alert('success', 'Sucesso', 'Prescrição adicionada com sucesso.')
          this.carregarInformacoes()
        }
      })
    });
  }

  getDates(informations: any): string[] {
    return Object.keys(informations);
  }

  carregarInformacoes() {
    this.animaisService.historicoProntuario(this.idCavalo).subscribe(res => {
      if (Object.keys(res.informations).length === 0) this.isData = true
      this.dadosCavalo = res
    })
  }

  botaoVoltar() {
    this.location.back()
  }
}
