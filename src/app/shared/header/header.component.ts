import { Component, inject, OnInit } from '@angular/core';
import { AppIcon } from './app-icon';
import { SidebarService } from './../sidebar/sidebar.service'
import { Router } from '@angular/router';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  readonly router = inject(Router)
  dataUser: any

  constructor(public sidebarservice: SidebarService) {
    this.dataUser = JSON.parse(atob(localStorage.getItem('access_token').split('.')[1]))
    this.dataUser['name'] = this.corrigirCaracteres(this.dataUser.name)
    this.dataUser['role'] = this.corrigirCaracteres(this.dataUser.role)
    console.log(this.dataUser, `< DATA`)
  }

  theme_name = 'dark_mode'

  toggleSearch: boolean = false;

  corrigirCaracteres(texto) {
    return decodeURIComponent(escape(texto));
  }

  darkMode() {

    if (this.theme_name == 'light_mode') {
      document.querySelector("html").classList.replace('dark_mode', 'light_mode');
      this.theme_name = 'dark_mode'

    } else if (this.theme_name == 'dark_mode') {
      document.querySelector("html").classList.replace('light_mode', 'dark_mode');
      this.theme_name = 'light_mode'

    }
    return this.theme_name;
  }

  getSideBarSate() {
    return this.sidebarservice.getSidebarState();
  }


  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }


  appIcon: AppIcon[] = [
    { src: 'assets/images/app/apple.png', name: 'Apple' },
    { src: 'assets/images/app/behance.png', name: 'Behance' },
    { src: 'assets/images/app/slack.png', name: 'Slack' },
    { src: 'assets/images/app/bootstrap.png', name: 'Bootstrap' },
    { src: 'assets/images/app/google-drive.png', name: 'Drive' },
    { src: 'assets/images/app/outlook.png', name: 'Outlook' },
    { src: 'assets/images/app/github.png', name: 'GitHub' },
    { src: 'assets/images/app/stack-overflow.png', name: 'Overflow' },
    { src: 'assets/images/app/figma.png', name: 'Figma' },
    { src: 'assets/images/app/twitter.png', name: 'Twitter' },
    { src: 'assets/images/app/google-calendar.png', name: 'Calendar' },
    { src: 'assets/images/app/spotify.png', name: 'Spotify' },
    { src: 'assets/images/app/google-photos.png', name: 'Photos' },
    { src: 'assets/images/app/pinterest.png', name: 'Pinterest' },
    { src: 'assets/images/app/linkedin.png', name: 'linkedin' },
    { src: 'assets/images/app/dribble.png', name: 'Dribbble' },
    { src: 'assets/images/app/youtube.png', name: 'YouTube' },
    { src: 'assets/images/app/google.png', name: 'News' },
    { src: 'assets/images/app/envato.png', name: 'Envato' },
    { src: 'assets/images/app/safari.png', name: 'Safari' },


  ];


  ngOnInit() {


  }

  sair() {
    localStorage.clear()
    this.router.navigate(['auth/sign-in'])
  }

}
