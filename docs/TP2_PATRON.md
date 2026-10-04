# TP2: evaluación de actividades con Strategy

**Proyecto:** Edu App Contable.\
**Autor:** Rubén E. Albarracín.\
**Materia:** Metodología de Sistemas II, Tecnicatura en Programación, UTN.\
**Implementación real:** 04/10/2026.\
**Rama:** `tp2-patron-strategy`.

## Contexto y problema

El repositorio tenía solo la estructura del TP1 (`9576cbd`). No había código de evaluación ni duplicación que corregir.

Se implementaron dos ejercicios originales: elegir la factura como documento de compraventa y calcular Patrimonio Neto con Activo = 1200 y Pasivo = 450. El primero compara una opción. El segundo valida un número y lo compara con 750. El problema de diseño es dónde ubicar esas reglas diferentes.

Es una evaluación educativa. No emite facturas reales ni aplica reglas fiscales de ARCA.

## Alternativa sin patrón

Primero se implementó `evaluarSinPatron` y se conectó a los formularios, en el commit `e2a3ba8`. Su código completo sigue en `src/evaluation/evaluarSinPatron.ts`.

```ts
import type { ResultadoEvaluacion, SolicitudSimple } from './types';

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
```

Con dos ejercicios, esta solución funciona y es más corta. Si se agregan otros tipos, habría que sumar casos a la misma función. Strategy permite separar esas reglas. Se eligió para practicar el patrón sobre dos formas reales de corregir; no porque la versión simple ya fuera inutilizable ni por un problema de rendimiento.

## Decisión arquitectónica

Se separaron tres responsabilidades:

- `src/App.tsx`: recibe respuestas y muestra la devolución.
- `src/data/actividades.ts`: guarda los datos de los ejercicios.
- `src/evaluation/`: corrige las respuestas.

Así, las reglas no dependen de React y se pueden probar sin abrir la interfaz. Cada regla tiene una tarea concreta. El evaluador depende del contrato común, no de una clase específica. Se mantiene una aplicación cliente sencilla, sin backend.

## Patrón elegido

**Strategy:** cada tipo de ejercicio tiene una forma de corregirse; el evaluador utiliza la estrategia que recibe.

| Participante | Código | Qué hace |
| --- | --- | --- |
| Contrato | `EstrategiaEvaluacion.ts` | Define cómo evaluar una respuesta y devolver el resultado. |
| Estrategia | `OpcionMultiple.ts` | Compara la opción elegida con la correcta. |
| Estrategia | `EcuacionContable.ts` | Valida el número y compara el Patrimonio Neto. |
| Contexto | `Evaluador.ts` | Recibe una estrategia y llama a su método `evaluar`. |
| Selección | `seleccion.ts` | Elige y configura cada estrategia fuera del evaluador. |
| Interfaz | `src/App.tsx` | Usa los evaluadores al enviar los formularios. |

Los primeros cinco archivos están en `src/evaluation/`. El tipo genérico `T` permite conservar el tipo de respuesta: texto para la opción y un objeto con `patrimonioNeto` para la ecuación. No se usa `any` ni conversiones forzadas. Las estrategias pueden reemplazarse por otras que acepten el mismo tipo de respuesta.

## Por qué Strategy y no otras alternativas

- **Función simple:** sigue siendo suficiente hoy. Tiene menos archivos, pero reúne ambas reglas en una función.
- **Strategy:** separa formas de corregir y permite probar o cambiar una sin tocar las demás.
- **Factory Method:** se ocupa de crear objetos. Aquí alcanza con construir las dos estrategias directamente.
- **Observer:** sirve para avisar a varios receptores cuando ocurre un evento. Aquí se necesita una devolución al formulario, sin suscriptores.

Solo se implementó Strategy. La documentación reconoce el costo académico de aplicarlo a un ejemplo pequeño.

## Consecuencias y límites

Las reglas quedan separadas y el evaluador solo delega. A cambio, hay más archivos y la selección de la estrategia debe hacerse en otro lugar. Agregar una actividad también requiere preparar sus datos y su formulario.

El ejercicio numérico acepta coma o punto decimal y rechaza vacío, texto, infinito, negativos, exponentes y separadores de miles. La tolerancia es `0.005` unidades. Por ejemplo, acepta 750,004 y rechaza 750,006. También evita rechazar 0,2 por la diferencia de representación de 0,3 - 0,1.

El ejemplo se limita a Activo y Pasivo no negativos, con Activo >= Pasivo. No representa todos los casos contables. Quiz completo y localStorage siguen pendientes.

## Ejecución y verificaciones

Se usa npm y un único `package-lock.json`. Los pasos para habilitar el npm local de esta computadora están en el [README](../README.md).

```powershell
npm ci
npm run dev
npm run typecheck
npm test
npm run build
```

Comprobaciones del asistente el 04/10/2026:

- La implementación inicial compiló con TypeScript y Vite. El primer intento detectó que faltaban tipos para importar CSS; se agregó `vite-env.d.ts` y pasó.
- En el ajuste a npm se verificaron instalación limpia con `npm ci`, chequeo de tipos, pruebas y build.
- Las **27 pruebas** cubren respuestas correctas e incorrectas, números inválidos, tolerancia decimal, delegación y equivalencia con la versión simple.
- En la implementación inicial se probaron **9 casos de interfaz** en Chrome headless: opción vacía, recibo, factura y seis entradas del ejercicio numérico. Se revisaron capturas de escritorio y móvil, sin errores JavaScript ni desborde horizontal a 390 px. Ese chequeo no se repitió en este ajuste de documentación y gestor.

Estas comprobaciones las hizo el asistente. La revisión personal del estudiante sigue pendiente.

## Referencia

Dossier de Metodología de Sistemas II, UTN FRT, edición 2026: Unidad 4, pp. 25-37 (Strategy, pp. 33-34); Unidad 5, pp. 38-40; TP2, pp. 41-42 del PDF. Los ejemplos de esta entrega son originales.

La entrada de bitácora usa la fecha PE indicada, 14/09/2026. La implementación real fue el 04/10/2026. No se cambiaron fechas de Git. El trabajo se entrega en el PR #1 hacia `main`, sin fusión automática.
