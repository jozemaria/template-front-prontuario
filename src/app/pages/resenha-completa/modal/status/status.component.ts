import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialogRef } from '@angular/material/dialog';
import { AnimaisService } from 'src/app/animais/service/animais.service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, MatModule, ReactiveFormsModule, FormsModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  readonly dialogRef = inject(MatDialogRef<StatusComponent>);

  formStatus = new FormGroup({
    status: new FormControl(''),
    statusDescripition: new FormControl('')
  });


  onNoClick(): void {
    this.dialogRef.close();
  }
}
