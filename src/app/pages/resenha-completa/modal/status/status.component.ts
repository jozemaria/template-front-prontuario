import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, MatModule, FormsModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  readonly dialogRef = inject(MatDialogRef<StatusComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
