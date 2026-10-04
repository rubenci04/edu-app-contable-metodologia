import type { EstrategiaEvaluacion } from './EstrategiaEvaluacion';
import type { ResultadoEvaluacion } from './types';

export class Evaluador<T> {
  private readonly estrategia: EstrategiaEvaluacion<T>;

  constructor(estrategia: EstrategiaEvaluacion<T>) {
    this.estrategia = estrategia;
  }

  evaluar(respuesta: T): ResultadoEvaluacion {
    return this.estrategia.evaluar(respuesta);
  }
}
