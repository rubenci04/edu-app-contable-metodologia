# TP2: decisión de arquitectura y patrón Strategy

**Proyecto:** Edu App Contable.  
**Materia:** Metodología de Sistemas II, Tecnicatura en Programación, UTN.  
**Autor:** Rubén E. Albarracín.  
**Fecha real de implementación:** 04/10/2026.  
**Rama:** `tp2-patron-strategy`.

## Contexto y evidencia inicial

Al comenzar, el repositorio académico solo tenía los ocho archivos de estructura del TP1, registrados en el commit `9576cbd`. No había funciones de evaluación, dependencias, aplicación ejecutable ni bitácora. No se encontró duplicación ni un bloque previo de condicionales: no existía implementación que inspeccionar. No se leyó, modificó ni copió la aplicación original.

Para disponer de un problema concreto se implementaron dos actividades originales: identificar la factura como documento de compraventa y calcular el Patrimonio Neto cuando Activo = 1200 y Pasivo = 450. Ambas necesitan corregir una respuesta y devolver una explicación, pero usan reglas diferentes: igualdad de un identificador y validación/comparación numérica con tolerancia.

Esto es un motor de evaluación educativa, no un sistema de facturación real. No emite comprobantes, no registra operaciones reales ni incluye reglas fiscales de ARCA. Este TP tampoco implementa el quiz completo ni persistencia en localStorage: continúan como funcionalidades previstas del proyecto.

## Alternativa sin patrón: implementada primero

El commit `e2a3ba8` contiene una interfaz funcional que llama a `evaluarSinPatron`, en `src/evaluation/evaluarSinPatron.ts`. Ese archivo se conserva como comparación didáctica; la interfaz final usa Strategy.

Fragmento de la alternativa (la validación y la explicación completas están en el archivo):

```ts
export function evaluarSinPatron(solicitud: SolicitudSimple): ResultadoEvaluacion {
  if (solicitud.tipo === 'opcion') {
    const correcta = solicitud.seleccion === 'factura';
    return { correcta, explicacion: solicitud.seleccion === ''
      ? 'Seleccioná una opción antes de evaluar.'
      : 'La factura documenta una compraventa; el recibo acredita un pago.' };
  }
  // Validar el texto numérico antes de comparar.
  // La segunda regla calcula PN = 1200 - 450 y compara con tolerancia 0.005.
}
```

Este fragmento ilustra la bifurcación; no reemplaza el código completo ejecutable del repositorio.

**Evaluación honesta:** con dos reglas pequeñas, esta función todavía alcanza. Cada nueva categoría exigiría ampliar la unión de solicitudes y modificar esta función; eso concentra distintas reglas en un mismo lugar, pero no es evidencia de un problema de rendimiento ni de un historial de errores. Se acepta Strategy como aplicación académica acotada sobre una variación ya implementada. En un producto con estos dos casos fijos se podría conservar la alternativa simple sin perjuicio. Conviene confirmar con la profesora que este punto de partida satisface el criterio del TP2: el dossier pide un problema presente y advierte que, si la alternativa simple alcanza, el patrón puede ser innecesario.

## Decisión arquitectónica

Separar la presentación React (`src/App.tsx`), los datos originales (`src/data/actividades.ts`) y las reglas educativas (`src/evaluation/`). Es una aplicación cliente organizada por responsabilidades, sin backend ni arquitectura distribuida. Los componentes gestionan formularios y muestran devoluciones; las estrategias no importan React ni conocen el DOM.

- **Acoplamiento:** el contexto depende del contrato, no de estrategias concretas.
- **Cohesión:** cada estrategia reúne una sola regla de corrección.
- **Mantenibilidad:** una regla puede verificarse sin montar componentes.
- **Costo:** se agregan archivos e indirección para un ejemplo que sigue siendo pequeño.

## Patrón elegido y participantes

Strategy es un patrón de comportamiento: encapsula algoritmos alternativos detrás de un contrato común y delega en la alternativa recibida.

| Participante | Archivo / elemento | Responsabilidad |
| --- | --- | --- |
| Contrato | `src/evaluation/EstrategiaEvaluacion.ts`, `EstrategiaEvaluacion<T>` | Define `evaluar(respuesta)` y un resultado común. |
| Estrategia concreta | `src/evaluation/OpcionMultiple.ts`, `OpcionMultiple` | Compara la opción seleccionada y devuelve explicación. |
| Estrategia concreta | `src/evaluation/EcuacionContable.ts`, `EcuacionContable` | Valida la entrada y compara PN con Activo - Pasivo. |
| Contexto | `src/evaluation/Evaluador.ts`, `Evaluador<T>` | Recibe una estrategia por constructor y delega `evaluar`. |
| Cliente / selección | `src/evaluation/seleccion.ts` | Configura la estrategia adecuada para cada actividad fuera del contexto. |
| Uso real | `src/App.tsx`, eventos `onSubmit` | Invoca ambos evaluadores y muestra el resultado. |

El contrato genérico conserva el tipo de respuesta: una opción usa `string`; la ecuación usa `RespuestaEcuacion`. No se emplea `any` ni conversiones forzadas. Las estrategias son intercambiables para respuestas del mismo tipo; no se pretende pasar una respuesta numérica a una estrategia de opciones. El contexto no contiene un `if` por actividad. La elección explícita de dos estrategias no necesita otro patrón.

## Alternativas consideradas y justificación

1. **Función simple discriminada:** menos archivos y lectura más directa para dos casos; sigue siendo válida. Strategy permite estudiar la delegación y modificar/probar reglas separadas, aceptando el costo académico.
2. **Strategy:** coincide con las dos formas reales de corregir una actividad. Es el único patrón implementado.
3. **Factory Method (catálogo de Unidad 4):** trata la creación de objetos. Aquí las dos instancias se pueden construir directamente; el problema relevante es qué regla ejecuta la evaluación, no una creación compleja. No se incorpora una fábrica.
4. **Observer (catálogo de Unidad 4):** desacopla reacciones de varios suscriptores a un evento. Aquí se requiere una devolución síncrona al formulario y no hay múltiples observadores. No resuelve la variación de algoritmos.

## Consecuencias y límites

Las reglas pueden probarse sin la UI y `Evaluador` permanece estable al reemplazar una estrategia compatible. A cambio, hay más piezas que recorrer y alguien debe seleccionar la regla: esa responsabilidad queda en `seleccion.ts`. Agregar una actividad también exige sus datos y su interfaz; Strategy no evita todo cambio ni mejora automáticamente el rendimiento.

El ejercicio numérico se limita a valores no negativos, con Activo >= Pasivo, por su propósito introductorio. No modela todos los escenarios contables. Acepta coma o punto decimal, espacios exteriores y solo dígitos con una parte decimal opcional. Rechaza vacío, texto, infinito, exponentes, números negativos y separadores de miles. La tolerancia absoluta explícita es `TOLERANCIA_DECIMAL = 0.005` unidades del ejercicio; no es una política monetaria de un sistema real. Se usa para absorber pequeñas diferencias decimales, incluida la representación binaria de 0.3 - 0.1.

## Ejecución

Requisitos: Node.js 22.12 o superior y pnpm 10.30.3. El repositorio incluye `pnpm-lock.yaml` para reproducir las dependencias.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm test
pnpm build
```

Abrir la dirección local que indique Vite, normalmente `http://127.0.0.1:5173/`. Si no se cuenta con pnpm, los mismos scripts se pueden ejecutar con `npm install`, `npm run dev`, `npm run typecheck`, `npm test` y `npm run build`; npm generará su propio lockfile, por lo que pnpm es la vía reproducible documentada.

## Verificaciones realmente ejecutadas (04/10/2026)

- `pnpm run build`: TypeScript sin errores y construcción Vite correcta, tanto en la alternativa simple como en la versión Strategy. El primer intento detectó el tipo faltante para importar CSS; se agregó `src/vite-env.d.ts` y se repitió con éxito.
- `pnpm test`: **27 pruebas aprobadas**, un archivo `src/evaluation/evaluacion.test.ts`.
- Casos unitarios: opciones correctas/incorrectas/vacías; PN correcto/incorrecto; entradas inválidas; coma decimal; 0.3 - 0.1; valores dentro/fuera de tolerancia y un límite representable; validación del ejemplo; delegación del contexto; equivalencia con la alternativa simple.
- Interfaz real: Chrome en modo headless mediante Playwright del entorno, **9 casos aprobados**: opción vacía, recibo, factura y PN vacío, texto, 700, 750, 750,004 y 750.006. Se revisaron además las capturas de escritorio (1280 px) y móvil (390 px), sin desborde horizontal ni errores JavaScript. Este chequeo de navegador fue ejecutado como herramienta externa del entorno; no se agrega Playwright como dependencia del TP.
- No se afirma una auditoría de accesibilidad completa, una prueba exhaustiva en todos los navegadores ni una revisión personal del estudiante.

## Base académica y entrega

Referencia consultada: Dossier de Cátedra de Metodología de Sistemas II, UTN FRT, primera edición 2026: Unidad 4 (pp. 25-37; Strategy pp. 33-34), Unidad 5 (pp. 38-40), TP2 del Eje 2 (pp. 41-42). Los números corresponden a las páginas del PDF; el índice ubica algunos títulos una página antes. Se aplica el criterio con redacción y ejemplos originales: el dossier no se copia al repositorio.

La fecha PE `14/09/2026` viene de la consigna comunicada por el estudiante, no de la fecha de implementación. El registro y el borrador de reflexión de IA están en `docs/BITACORA.md`. La rama se entrega mediante revisión hacia `main`, sin fusión automática.
