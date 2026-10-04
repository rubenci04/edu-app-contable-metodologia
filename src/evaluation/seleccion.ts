import { preguntaDocumento, ejercicioPatrimonio } from '../data/actividades';
import { Evaluador } from './Evaluador';
import { OpcionMultiple } from './OpcionMultiple';
import { EcuacionContable } from './EcuacionContable';

// Cliente del patrón: elige las estrategias fuera del contexto Evaluador.
export const evaluadorOpcion = new Evaluador(new OpcionMultiple(
  preguntaDocumento.correcta, preguntaDocumento.explicacion,
));
export const evaluadorEcuacion = new Evaluador(new EcuacionContable(
  ejercicioPatrimonio.activo, ejercicioPatrimonio.pasivo,
));
