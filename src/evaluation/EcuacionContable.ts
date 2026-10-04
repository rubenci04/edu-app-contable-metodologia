import type { EstrategiaEvaluacion } from './EstrategiaEvaluacion';
import type { ResultadoEvaluacion } from './types';

// Tolerancia absoluta en unidades del ejercicio: medio centavo.
export const TOLERANCIA_DECIMAL = 0.005;
export interface RespuestaEcuacion { patrimonioNeto: string }

export class EcuacionContable implements EstrategiaEvaluacion<RespuestaEcuacion> {
  private readonly activo: number;
  private readonly pasivo: number;

  constructor(activo: number, pasivo: number) {
    if (!Number.isFinite(activo) || !Number.isFinite(pasivo)
      || activo < 0 || pasivo < 0 || pasivo > activo) {
      throw new Error('El ejemplo requiere Activo y Pasivo finitos, no negativos y Activo >= Pasivo.');
    }
    this.activo = activo;
    this.pasivo = pasivo;
  }

  readonly evaluar = ({ patrimonioNeto }: RespuestaEcuacion): ResultadoEvaluacion => {
    const texto = patrimonioNeto.trim();
    const numero = Number(texto.replace(',', '.'));
    if (!/^\d+(?:[.,]\d+)?$/.test(texto) || !Number.isFinite(numero)) {
      return { correcta: false, explicacion: 'Ingresá un número no negativo, sin separadores de miles.' };
    }
    const esperado = this.activo - this.pasivo;
    return {
      correcta: Math.abs(numero - esperado) <= TOLERANCIA_DECIMAL,
      explicacion: `Patrimonio Neto = Activo - Pasivo = ${this.activo} - ${this.pasivo} = ${Number(esperado.toFixed(6))}.`,
    };
  };
}
