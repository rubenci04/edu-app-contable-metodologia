import type { ResultadoEvaluacion } from './types';

// T mantiene compatible cada estrategia con los datos que acepta.
export interface EstrategiaEvaluacion<T> {
  readonly evaluar: (respuesta: T) => ResultadoEvaluacion;
}
