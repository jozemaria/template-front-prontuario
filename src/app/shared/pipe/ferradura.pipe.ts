import { Pipe, PipeTransform } from '@angular/core';
import { addMonths, differenceInCalendarDays, parseISO, startOfDay } from 'date-fns';

@Pipe({
  name: 'ferradura',
  standalone: true
})
export class FerraduraPipe implements PipeTransform {

  transform(
    shoeDate: string | Date | null | undefined,
    exchangeMonths: number | null | undefined = 3
  ): string {
    if (!shoeDate) {
      return 'Sem ferradura registrada';
    }

    const dataFerradura = startOfDay(
      typeof shoeDate === 'string' ? parseISO(shoeDate) : shoeDate
    );
    const meses = exchangeMonths && exchangeMonths > 0 ? exchangeMonths : 3;
    const dataProximaTroca = startOfDay(addMonths(dataFerradura, meses));
    const hoje = startOfDay(new Date());
    const diasRestantes = differenceInCalendarDays(dataProximaTroca, hoje);

    if (diasRestantes < 0) {
      const diasVencido = Math.abs(diasRestantes);
      return diasVencido === 1
        ? 'Troca vencida há 1 dia'
        : `Troca vencida há ${diasVencido} dias`;
    }

    if (diasRestantes === 0) {
      return 'Trocar ferradura hoje';
    }

    return diasRestantes === 1
      ? 'Falta 1 dia para trocar'
      : `Faltam ${diasRestantes} dias para trocar`;
  }
}
