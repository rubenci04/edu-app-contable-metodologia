import { describe, expect, it } from 'vitest';
import { Evaluador } from './Evaluador';
import { OpcionMultiple } from './OpcionMultiple';
import { EcuacionContable } from './EcuacionContable';
import type { EstrategiaEvaluacion } from './EstrategiaEvaluacion';
import { evaluarSinPatron } from './evaluarSinPatron';
import { evaluadorOpcion, evaluadorEcuacion } from './seleccion';

describe('Opción múltiple', () => {
  const estrategia = new OpcionMultiple('factura', 'Explicación educativa.');
  it('acepta la opción correcta con explicación', () => {
    expect(estrategia.evaluar('factura')).toEqual({ correcta: true, explicacion: 'Explicación educativa.' });
  });
  it.each(['recibo', 'remito', 'desconocida'])('rechaza %s', valor => {
    expect(estrategia.evaluar(valor).correcta).toBe(false);
  });
  it('indica que falta seleccionar', () => {
    expect(estrategia.evaluar(' ').explicacion).toContain('Seleccioná');
  });
});

describe('Ecuación contable', () => {
  const estrategia = new EcuacionContable(1200, 450);
  it.each(['750', '750.00', '750,00', ' 750 '])('acepta %s', patrimonioNeto => {
    expect(estrategia.evaluar({ patrimonioNeto }).correcta).toBe(true);
  });
  it('rechaza una respuesta numérica incorrecta y explica el cálculo', () => {
    expect(estrategia.evaluar({ patrimonioNeto: '700' })).toEqual({ correcta: false,
      explicacion: 'Patrimonio Neto = Activo - Pasivo = 1200 - 450 = 750.' });
  });
  it.each(['', ' ', 'abc', 'NaN', 'Infinity', '-10', '1e3', '750abc', '750,0.0', '7.50.0', '9'.repeat(400)])('rechaza entrada inválida %s', patrimonioNeto => {
    expect(estrategia.evaluar({ patrimonioNeto }).explicacion).toContain('Ingresá un número');
  });
  it('tolera el error de representación decimal 0.3 - 0.1', () => {
    expect(new EcuacionContable(0.3, 0.1).evaluar({ patrimonioNeto: '0.2' }).correcta).toBe(true);
  });
  it('acepta dentro de la tolerancia y rechaza fuera de ella', () => {
    expect(estrategia.evaluar({ patrimonioNeto: '750.004' }).correcta).toBe(true);
    expect(estrategia.evaluar({ patrimonioNeto: '750.006' }).correcta).toBe(false);
  });
  it('acepta un valor exactamente en el límite representable', () => {
    expect(new EcuacionContable(0, 0).evaluar({ patrimonioNeto: '0.005' }).correcta).toBe(true);
  });
  it('valida los datos del ejemplo', () => {
    expect(() => new EcuacionContable(Infinity, 0)).toThrow();
    expect(() => new EcuacionContable(10, 20)).toThrow();
  });
});

it('el contexto delega la respuesta y conserva el resultado de la estrategia recibida', () => {
  const llamadas: string[] = [];
  const resultado = { correcta: true, explicacion: 'Devolución de prueba' };
  const estrategia: EstrategiaEvaluacion<string> = { evaluar: respuesta => {
    llamadas.push(respuesta); return resultado;
  } };
  expect(new Evaluador(estrategia).evaluar('dato')).toBe(resultado);
  expect(llamadas).toEqual(['dato']);
});

it('conserva el comportamiento de la alternativa simple para ambos ejercicios', () => {
  for (const seleccion of ['', 'factura', 'recibo']) {
    expect(evaluadorOpcion.evaluar(seleccion)).toEqual(evaluarSinPatron({ tipo: 'opcion', seleccion }));
  }
  for (const patrimonioNeto of ['', '750', '700', '750,004', '750.006', 'abc']) {
    expect(evaluadorEcuacion.evaluar({ patrimonioNeto })).toEqual(evaluarSinPatron({ tipo: 'ecuacion', patrimonioNeto }));
  }
});
