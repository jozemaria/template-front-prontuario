import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { Router } from '@angular/router';
import { StatusComponent } from './modal/status/status.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resenha-completa',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './resenha-completa.component.html',
  styleUrl: './resenha-completa.component.scss'
})
export class ResenhaCompletaComponent {
  readonly router = inject(Router)
  readonly dialog = inject(MatDialog);

  botaoVoltar() {
    this.router.navigateByUrl('/animais')
  }

  editarResenha() {
    this.router.navigateByUrl('animais/resenha')
  }

  openDialogStatus(): void {
    const dialogRef = this.dialog.open(StatusComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
