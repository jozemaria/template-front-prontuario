import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { DashboardService } from './service/dashboard.service';
import { StatusTextPipe } from 'src/app/shared/pipe/status-text.pipe';

export interface IFichaCavalo {
  id: number,
  name: string,
  photo: string,
  baia: string,
  status: boolean,
}

@Component({
  selector: 'app-geral',
  standalone: true,
  imports: [CommonModule, MatModule, StatusTextPipe],
  templateUrl: './geral.component.html',
  styleUrl: './geral.component.scss'
})
export class GeralComponent implements OnInit {
  readonly dashboardService = inject(DashboardService)
  listagemCavalos: IFichaCavalo[]
  qtdApto: number
  qtdInapto: number
  qtdOutro: number


  ngOnInit(): void {
    this.listarDadosCavalos()
  }

  listarDadosCavalos() {
    this.dashboardService.getListHorse().subscribe(res => {
      this.listagemCavalos = res.horses
      this.qtdApto = res.horse_status.apto
      this.qtdInapto = res.horse_status.inapto
      this.qtdOutro = res.horse_status.externo
    })
  }

}
