# Bitácora de Edu App Contable

## PE. 14/09/2026 - Patrón

**Fecha PE indicada por la consigna:** 14/09/2026.  
**Fecha real de implementación y verificación:** 04/10/2026.  
**Autor del proyecto:** Rubén E. Albarracín.  
**Registro elaborado con asistencia de IA, pendiente de revisión personal del estudiante.**

### Contexto

El repositorio académico tenía únicamente la estructura del TP1 (`9576cbd`), sin evaluadores ni bitácora. Se agregaron dos actividades originales y una primera evaluación simple (`e2a3ba8`). El problema analizado es la organización de dos reglas educativas distintas, no una duplicación encontrada en código previo. La aplicación original permanece ajena a esta entrega.

### Alternativas consideradas

Función discriminada sin patrón (suficiente para estos dos casos), Strategy para encapsular cada regla, Factory Method para creación y Observer para reacciones. Los dos últimos no responden a la variación de corrección existente.

### Decisión

Separar UI, datos y evaluación; implementar únicamente Strategy con un contrato genérico, dos estrategias y un contexto que delega. La selección se realiza fuera del contexto. Se acepta como aplicación académica acotada y no como necesidad inevitable de un producto pequeño. La justificación completa y las referencias al dossier están en `TP2_PATRON.md`.

### Consecuencias

Las reglas se prueban por separado y el contexto desconoce la lógica concreta. Aumentan los archivos y la indirección; se conserva la alternativa simple para contrastar. Se documenta el alcance introductorio y la tolerancia decimal. No se implementan facturación real, reglas ARCA, backend, persistencia ni el resto de la aplicación.

### Verificación y corrección

Se ejecutaron compilación TypeScript/Vite y 27 pruebas automatizadas aprobadas. Se comprobó la interfaz con 9 casos en Chrome headless, se inspeccionaron capturas de escritorio/móvil y no se observaron errores JavaScript ni desborde horizontal a 390 px. El primer chequeo detectó la falta de tipos de Vite para el CSS: se agregó `vite-env.d.ts` y la compilación pasó. No se modificaron fechas de Git para simular trabajo el 14/09.

### Reflexión sobre IA (borrador de 6 líneas para revisión del estudiante)

Problema: se pidió evaluar dos actividades en un repositorio que solo contenía la estructura inicial.  
Propuesta de IA: el asistente implementó primero una alternativa simple y luego Strategy para separar las reglas.  
Análisis: se reconoció que dos casos no obligan a usar el patrón y se comparó con Factory Method y Observer.  
Verificación: el asistente ejecutó compilación, 27 pruebas de reglas/delegación y 9 casos de interfaz en Chrome.  
Corrección: se agregó la declaración de tipos de Vite tras el error de importación CSS y se mantuvo el alcance sin otros patrones.  
Justificación: se propone aceptar la separación por su valor académico y la variación real; queda pendiente que el estudiante la revise y pueda defenderla.

Este borrador relata el trabajo del asistente. Antes de entregar, el estudiante debe probar la aplicación, contrastar la decisión con la consigna y ajustar la reflexión a lo que haya revisado personalmente.
