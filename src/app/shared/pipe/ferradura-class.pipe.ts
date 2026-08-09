import { Pipe, PipeTransform } from '@angular/core';
import { addMonths, differenceInCalendarDays, parseISO, startOfDay } from 'date-fns';

@Pipe({
  name: 'ferraduraClass',
  standalone: true
})
export class FerraduraClassPipe implements PipeTransform {

  transform(
    shoeDate: string | Date | null | undefined,
    exchangeMonths: number | null | undefined = 3
  ): string {
    if (!shoeDate) {
      return 'mat-light-bg-dark';
    }

    const dataFerradura = startOfDay(
      typeof shoeDate === 'string' ? parseISO(shoeDate) : shoeDate
    );
    const meses = exchangeMonths && exchangeMonths > 0 ? exchangeMonths : 3;
    const dataProximaTroca = startOfDay(addMonths(dataFerradura, meses));
    const hoje = startOfDay(new Date());
    const diasRestantes = differenceInCalendarDays(dataProximaTroca, hoje);

    if (diasRestantes < 0) {
      return 'mat-light-bg-red';
    }

    if (diasRestantes <= 15) {
      return 'mat-light-bg-yellow';
    }

    return 'mat-light-bg-green';
  }
}
