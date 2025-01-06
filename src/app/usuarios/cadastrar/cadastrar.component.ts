import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss'
})
export class CadastrarComponent {
  readonly router = inject(Router)
  hide = true;

  botaoVoltar() {
    this.router.navigateByUrl('usuarios/listar')
  }
}
