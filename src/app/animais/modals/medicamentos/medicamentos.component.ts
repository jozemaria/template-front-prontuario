import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [CommonModule, MatModule, ReactiveFormsModule, FormsModule],
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.scss'
})
export class MedicamentosComponent {
  readonly dialogRef = inject(MatDialogRef<MedicamentosComponent>)

  medicament = new FormGroup({
    name: new FormControl(''),
    hour: new FormControl(''),
    doses: new FormControl(''),
    description: new FormControl('')
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

}

