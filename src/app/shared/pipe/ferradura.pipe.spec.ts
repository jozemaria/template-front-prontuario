import { addMonths, subDays } from 'date-fns';
import { FerraduraPipe } from './ferradura.pipe';

describe('FerraduraPipe', () => {
  let pipe: FerraduraPipe;

  beforeEach(() => {
    pipe = new FerraduraPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('retorna mensagem quando não há ferradura registrada', () => {
    expect(pipe.transform(null)).toBe('Sem ferradura registrada');
    expect(pipe.transform(undefined)).toBe('Sem ferradura registrada');
    expect(pipe.transform('')).toBe('Sem ferradura registrada');
  });

  it('usa 3 meses por padrão', () => {
    const dataFerradura = addMonths(subDays(new Date(), 30), -3);
    const resultado = pipe.transform(dataFerradura.toISOString());
    expect(resultado).toMatch(/^Faltam 3\d dias para trocar$/);
  });

  it('usa o tempo de troca informado', () => {
    const dataFerradura = addMonths(subDays(new Date(), -30), -2);
    const resultado = pipe.transform(dataFerradura.toISOString(), 2);
    expect(resultado).toMatch(/^Faltam 3\d dias para trocar$/);
  });

  it('retorna que deve trocar hoje quando a data de troca é hoje', () => {
    const dataFerradura = addMonths(new Date(), -3);
    expect(pipe.transform(dataFerradura.toISOString(), 3)).toBe(
      'Trocar ferradura hoje'
    );
  });

  it('retorna troca vencida quando a data já passou', () => {
    const dataFerradura = addMonths(subDays(new Date(), 5), -3);
    const resultado = pipe.transform(dataFerradura.toISOString(), 3);
    expect(resultado).toMatch(/^Troca vencida há \d+ dias$/);
  });
});
