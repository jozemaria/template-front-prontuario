import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cavalo-nao-encontrado',
  standalone: true,
  imports: [CommonModule, MatModule, RouterModule],
  templateUrl: './cavalo-nao-encontrado.component.html',
  styleUrl: './cavalo-nao-encontrado.component.scss'
})
export class CavaloNaoEncontradoComponent {}
