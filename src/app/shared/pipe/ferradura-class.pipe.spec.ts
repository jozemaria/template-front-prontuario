import { addMonths, subDays } from 'date-fns';
import { FerraduraClassPipe } from './ferradura-class.pipe';

describe('FerraduraClassPipe', () => {
  let pipe: FerraduraClassPipe;

  beforeEach(() => {
    pipe = new FerraduraClassPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('retorna classe escura quando não há ferradura registrada', () => {
    expect(pipe.transform(null)).toBe('mat-light-bg-dark');
  });

  it('retorna classe verde quando a troca está distante', () => {
    const dataFerradura = addMonths(subDays(new Date(), 60), -3);
    expect(pipe.transform(dataFerradura.toISOString(), 3)).toBe('mat-light-bg-green');
  });

  it('retorna classe amarela quando faltam até 15 dias', () => {
    const dataFerradura = addMonths(subDays(new Date(), 10), -3);
    expect(pipe.transform(dataFerradura.toISOString(), 3)).toBe('mat-light-bg-yellow');
  });

  it('retorna classe vermelha quando a troca está vencida', () => {
    const dataFerradura = addMonths(subDays(new Date(), -5), -3);
    expect(pipe.transform(dataFerradura.toISOString(), 3)).toBe('mat-light-bg-red');
  });
});
