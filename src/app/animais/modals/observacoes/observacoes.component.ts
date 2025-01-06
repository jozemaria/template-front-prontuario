import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatModule } from 'src/app/appModules/mat.module';

@Component({
  selector: 'app-observacoes',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './observacoes.component.html',
  styleUrl: './observacoes.component.scss'
})
export class ObservacoesComponent {
  readonly dialogRef = inject(MatDialogRef<ObservacoesComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
