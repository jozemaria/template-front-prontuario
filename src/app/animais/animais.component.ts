import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../appModules/mat.module';
import { Router } from '@angular/router';
import { SweetalertService } from '../shared/services/sweetalert.service';
import { AnimaisService } from './service/animais.service';
import { StatusClassPipe } from '../shared/pipe/status-class.pipe';
import { StatusTextPipe } from '../shared/pipe/status-text.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

interface IFichaCavalo {
  id: number,
  name: string,
  kind: string,
  baia: string,
  description: string,
  status: boolean,
  photo_url: string,
}

@Component({
  selector: 'app-animais',
  standalone: true,
  imports: [CommonModule, MatModule, StatusClassPipe, StatusTextPipe, MatButtonToggleModule],
  templateUrl: './animais.component.html',
  styleUrl: './animais.component.scss'
})
export class AnimaisComponent implements OnInit {
  readonly sweetalertService = inject(SweetalertService)
  readonly animaisService = inject(AnimaisService)
  readonly router = inject(Router)

  listagemCavalos: IFichaCavalo[]

  ngOnInit(): void {
    this.filtrarCavalosPorStatus()
  }

  criarResenha() {
    this.router.navigateByUrl('animais/resenha')
  }

  verResenha(id: number) {
    this.router.navigateByUrl('pages/resenha/' + id)
  }
  deletarCavalo(idHorse: number) {
    this.sweetalertService.confirmAlert('warning', 'Deseja dar baixa na resenha?', 'Caso clique em confirmar, resenha será desativada!').subscribe(
      (res: any) => {
        if (res) {
          this.animaisService.deleteAnimal(idHorse).subscribe({
            next: () => this.filtrarCavalosPorStatus(),
            error: (err: any) => {
              this.sweetalertService.alert('error', 'Ops...', 'Erro: ' + err.error[0])
            },
            complete: () => {
              this.sweetalertService.alert('success', 'Sucesso!', 'Cavalo desativado!')
            }
          })

        }
      }
    )
  }

  verProntuario(idHorse: number) {
    this.animaisService.openMedicalRecord(idHorse).subscribe({
      next: (res: any) => {
        if (res.is_active) {
          this.sweetalertService.confirmAlert('warning', 'Já existe prontunário aberto!', 'Deseja continuar o preenchimento do prontuário?').subscribe(
            (res: any) => {
              if (res) {
                this.router.navigateByUrl('animais/prontuario/' + idHorse)
              }
            }
          )
        } else {
          this.sweetalertService.confirmAlert('warning', 'Criar novo registro!', 'Deseja atualizar prontuário?').subscribe(
            (res: any) => {
              if (res) {
                this.animaisService.abrirAtendimento(idHorse).subscribe((res: boolean) => {
                  if (res) {
                    this.router.navigateByUrl('animais/prontuario/' + idHorse)
                  }
                })
              }
            }
          )
        }
      },
      error: (res: any) => {
        this.sweetalertService.alert('error', 'Registro não existe', 'Entrar em contato com suporte!')
      }
    })
  }

  editarResenha(id: number) {
    this.router.navigateByUrl('animais/resenha/' + id)
  }

  filtrarCavalosPorStatus(status: string = '') {
    this.animaisService.getAllAnimalByStatus(status).subscribe(res => {
      this.listagemCavalos = res
    })
  }

}
