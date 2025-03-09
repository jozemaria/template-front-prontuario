import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { MatModule } from 'src/app/appModules/mat.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileSizePipe } from 'src/app/shared/pipe/file-size.pipe';

@Component({
  selector: 'app-fotos',
  standalone: true,
  imports: [CommonModule, MatModule, ReactiveFormsModule, FileSizePipe],
  templateUrl: './fotos.component.html',
  styleUrl: './fotos.component.scss'
})
export class FotosComponent {
  readonly sweetalertService = inject(SweetalertService)
  readonly dialogRef = inject(MatDialogRef<FotosComponent>);


  selectedFile: File | null = null;
  registration = new FormGroup({
    description: new FormControl('')
  })

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.sweetalertService.alert('warning', 'Atenção', 'A imagem não pode ser maior que 2MB.')
        this.selectedFile = null;
        return;
      }
      if (!file.type.startsWith('image/')) {
        this.sweetalertService.alert('warning', 'Atenção', 'Por favor, selecione um arquivo de imagem.')
        this.selectedFile = null;
        return;
      }
    }
    this.selectedFile = file
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
