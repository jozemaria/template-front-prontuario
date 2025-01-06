import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../appModules/mat.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animais',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './animais.component.html',
  styleUrl: './animais.component.scss'
})
export class AnimaisComponent {
  constructor(private router: Router) { }



  criarResenha() {
    this.router.navigateByUrl('animais/resenha')
  }

  verResenha() {
    this.router.navigateByUrl('pages/resenha')
  }

  verProntuario() {
    this.router.navigateByUrl('animais/prontuario')
  }

  editarResenha() {
    this.router.navigateByUrl('animais/resenha')
  }

}
