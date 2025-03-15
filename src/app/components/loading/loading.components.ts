import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@Component({
  selector: 'pm-componente-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `<mat-spinner></mat-spinner>`
})
export class LoadingComponent {
  retrying: boolean = false
  constructor() { }
}
