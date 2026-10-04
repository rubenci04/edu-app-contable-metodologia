import type { EstrategiaEvaluacion } from './EstrategiaEvaluacion';
import type { ResultadoEvaluacion } from './types';

export class OpcionMultiple implements EstrategiaEvaluacion<string> {
  private readonly correcta: string;
  private readonly explicacion: string;

  constructor(correcta: string, explicacion: string) {
    this.correcta = correcta;
    this.explicacion = explicacion;
  }

  readonly evaluar = (seleccion: string): ResultadoEvaluacion => {
    if (seleccion.trim() === '') {
      return { correcta: false, explicacion: 'Seleccioná una opción antes de evaluar.' };
    }
    return { correcta: seleccion === this.correcta, explicacion: this.explicacion };
  };
}
