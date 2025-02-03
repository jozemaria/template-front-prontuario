import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusComponent } from './modal/status/status.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimaisService } from 'src/app/animais/service/animais.service';

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
  status: boolean,
  owner: boolean,
  created_at: boolean,
  picture: string,
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

  listagemCavalos: IFichaCavalo
  idResenha: number

  ngOnInit(): void {
    this.idResenha = parseInt(this.route.snapshot.paramMap.get('id'))
    this.getResenha()
  }

  botaoVoltar() {
    this.router.navigateByUrl('/animais')
  }

  editarResenha() {
    this.router.navigateByUrl('animais/resenha')
  }

  openDialogStatus(): void {
    const dialogRef = this.dialog.open(StatusComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  getResenha() {
    this.animaisService.getAnimalById(this.idResenha).subscribe(res => this.listagemCavalos = res)
  }
}
