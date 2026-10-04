export interface ResultadoEvaluacion {
  correcta: boolean;
  explicacion: string;
}

export type SolicitudSimple =
  | { tipo: 'opcion'; seleccion: string }
  | { tipo: 'ecuacion'; patrimonioNeto: string };
