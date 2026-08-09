import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from './../sidebar/sidebar.service'


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

    dataUser: any

    constructor(public sidebarservice: SidebarService
      ) {
        this.dataUser = JSON.parse(atob(localStorage.getItem('access_token').split('.')[1]))
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
