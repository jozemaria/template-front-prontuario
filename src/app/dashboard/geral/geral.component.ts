import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';

@Component({
  selector: 'app-geral',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './geral.component.html',
  styleUrl: './geral.component.scss'
})
export class GeralComponent {

}
