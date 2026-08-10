import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SidebarService } from './../sidebar/sidebar.service'
import { TokenService } from '../services/token.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

    dataUser: any = {}

    constructor(
      public sidebarservice: SidebarService,
      private tokenService: TokenService,
      private router: Router
    ) {
        this.carregarDadosUsuario()
      }

      private carregarDadosUsuario() {
        const decoded = this.tokenService.decodeToken<any>();
        if (!decoded) {
          this.tokenService.removeToken();
          this.router.navigate(['/auth/sign-in']);
          return;
        }
        this.dataUser = decoded;
        this.dataUser['photo_url'] = localStorage.getItem('photo_user')
        this.dataUser['name'] = this.corrigirCaracteres(this.dataUser.name)
        this.dataUser['role'] = this.corrigirCaracteres(this.dataUser.role)
      }

      corrigirCaracteres(texto) {
        return decodeURIComponent(escape(texto));
      }

      getSideBarSate() {
          return this.sidebarservice.getSidebarState();
      }
  
    ngOnInit() {
    }

}
