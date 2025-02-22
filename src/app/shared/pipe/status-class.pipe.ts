import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusClass',
  standalone: true
})
export class StatusClassPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'apto':
        return 'mat-light-bg-green';
      case 'inapto':
        return 'mat-light-bg-purple';
      default:
        return 'mat-light-bg-teal';
    }
  }

}
