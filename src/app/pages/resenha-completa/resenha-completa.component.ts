import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusComponent } from './modal/status/status.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimaisService } from 'src/app/animais/service/animais.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface IFichaCavalo {
  id: number,
  name: string,
  gender: string,
  weight: string,
  kind: string,
  hair: string,
  birthday: string,
  baia: string,
  description: string,
  active: boolean,
  status: boolean,
  owner: boolean,
  created_at: boolean,
  photo_url: string,
  cover_url: string,
}

@Component({
  selector: 'app-resenha-completa',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './resenha-completa.component.html',
  styleUrl: './resenha-completa.component.scss'
})
export class ResenhaCompletaComponent implements OnInit {
  readonly router = inject(Router)
  readonly route = inject(ActivatedRoute)
  readonly dialog = inject(MatDialog);
  readonly animaisService = inject(AnimaisService)
  readonly location = inject(Location)
  readonly sweetAlertService = inject(SweetalertService)


  dadosCavalo: IFichaCavalo
  idResenha: number

  ngOnInit(): void {
    this.idResenha = parseInt(this.route.snapshot.paramMap.get('id'))
    this.getResenha()
  }

  botaoVoltar() {
    this.location.back()
  }

  editarResenha(id: number) {
    this.router.navigateByUrl('animais/resenha/' + id)
  }

  openDialogStatus(): void {
    const dialogRef = this.dialog.open(StatusComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.animaisService.editarStatus(result, this.idResenha).subscribe({
          error: err => {
            this.sweetAlertService.alert('error', 'Ops...', 'Erro: ' + err.error.error)
          },
          complete: () => {
            this.sweetAlertService.alert('success', 'Sucesso', 'Status atualizado com sucesso.')
            this.getResenha()
          }
        })
      }
    });
  }

  getResenha() {
    this.animaisService.getAnimalById(this.idResenha).subscribe(res => {
      this.dadosCavalo = res
      this.dadosCavalo.birthday = format(res.birthday, 'dd/MM/yyyy', { locale: ptBR })
    })
  }

}
