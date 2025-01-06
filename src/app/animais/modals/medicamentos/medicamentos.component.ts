import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatModule } from 'src/app/appModules/mat.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [CommonModule, MatModule, FormsModule],
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.scss'
})
export class MedicamentosComponent {
  readonly dialogRef = inject(MatDialogRef<MedicamentosComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }

}

