import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDialog } from '@angular/material/dialog';
import { MedicamentosComponent } from '../modals/medicamentos/medicamentos.component';
import { AltaComponent } from '../modals/alta/alta.component';
import { ObservacoesComponent } from '../modals/observacoes/observacoes.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prontuario',
  standalone: true,
  imports: [CommonModule, MatModule, CdkAccordionModule],
  templateUrl: './prontuario.component.html',
  styleUrl: './prontuario.component.scss'
})
export class ProntuarioComponent {
  items = ['26/12/24', '27/12/24', '28/12/24', '02/01/25', '02/01/25'];
  expandedIndex = 0;
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router)
  changeDetection: ChangeDetectionStrategy.OnPush

  openDialogMedicamentos(): void {
    const dialogRef = this.dialog.open(MedicamentosComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
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
      console.log('The dialog was closed');

    });
  }

  botaoVoltar() {
    this.router.navigateByUrl('/animais')
  }
}
