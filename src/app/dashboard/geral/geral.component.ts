import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { AnimaisService } from 'src/app/animais/service/animais.service';

export interface IFichaCavalo {
  id: number,
  name: string,
  kind: string,
  baia: string,
  description: string,
  status: boolean,
  picture: string,
}

@Component({
  selector: 'app-geral',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './geral.component.html',
  styleUrl: './geral.component.scss'
})
export class GeralComponent implements OnInit {
  readonly animaisService = inject(AnimaisService)
  listagemCavalos: IFichaCavalo[]


  ngOnInit(): void {
    this.listarTodosCavalos()
  }

  listarTodosCavalos() {
    this.animaisService.getAllAnimal().subscribe(res => this.listagemCavalos = res)
  }


}
