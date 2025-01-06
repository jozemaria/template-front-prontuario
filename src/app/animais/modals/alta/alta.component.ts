import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alta',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './alta.component.html',
  styleUrl: './alta.component.scss'
})
export class AltaComponent {
  readonly dialogRef = inject(MatDialogRef<AltaComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }

}
