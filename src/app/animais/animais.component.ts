import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../appModules/mat.module';
import { Router } from '@angular/router';
import { SweetalertService } from '../shared/services/sweetalert.service';
import { AnimaisService } from './service/animais.service';
import { error } from 'jquery';

@Component({
  selector: 'app-animais',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './animais.component.html',
  styleUrl: './animais.component.scss'
})
export class AnimaisComponent {
  readonly sweetalertService = inject(SweetalertService)
  readonly animaisService = inject(AnimaisService)
  readonly router = inject(Router)

  criarResenha() {
    this.router.navigateByUrl('animais/resenha')
  }

  verResenha() {
    this.router.navigateByUrl('pages/resenha')
  }

  verProntuario(idHorse: number) {
    this.animaisService.openMedicalRecord(idHorse).subscribe({
      next: (res: any) => {
        if (res.is_active) {
          this.sweetalertService.confirmAlert('warning', 'Já existe prontunário aberto!', 'Deseja continuar o preenchimento do prontuário?').subscribe(
            (res: any) => {
              if (res) {
                this.router.navigateByUrl('animais/prontuario')
              }
            }
          )
        } else {
          this.sweetalertService.confirmAlert('warning', 'Criar novo registro!', 'Deseja atualziar o prontuário?').subscribe(
            (res: any) => {
              if (res) {
                this.router.navigateByUrl('animais/prontuario')
              }
            }
          )
        }
      },
      error: (res: any) => {
        this.sweetalertService.alert('error', 'Registro não exite', 'Confirmar se existe mesmo animal informado!')
      }
    })
  }

  editarResenha() {
    this.router.navigateByUrl('animais/resenha')
  }

}
