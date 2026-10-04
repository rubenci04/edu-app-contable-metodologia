import type { ResultadoEvaluacion, SolicitudSimple } from './types';

// Primera alternativa funcional: dos reglas en una función discriminada.
export function evaluarSinPatron(solicitud: SolicitudSimple): ResultadoEvaluacion {
  if (solicitud.tipo === 'opcion') {
    const correcta = solicitud.seleccion === 'factura';
    return { correcta, explicacion: solicitud.seleccion === ''
      ? 'Seleccioná una opción antes de evaluar.'
      : 'La factura documenta una compraventa; el recibo acredita un pago.' };
  }
  const texto = solicitud.patrimonioNeto.trim();
  const numero = Number(texto.replace(',', '.'));
  if (!/^\d+(?:[.,]\d+)?$/.test(texto) || !Number.isFinite(numero)) {
    return { correcta: false, explicacion: 'Ingresá un número no negativo, sin separadores de miles.' };
  }
  return { correcta: Math.abs(numero - (1200 - 450)) <= 0.005,
    explicacion: 'Patrimonio Neto = Activo - Pasivo = 1200 - 450 = 750.' };
}
