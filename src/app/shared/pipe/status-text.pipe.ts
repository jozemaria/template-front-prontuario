import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusText',
  standalone: true
})
export class StatusTextPipe implements PipeTransform {

  transform(status: string): string {
    switch (status) {
      case 'apto':
        return 'apto';
      case 'inapto':
        return 'baixado';
      default:
        return 'externo/outro';
    }
  }
}
