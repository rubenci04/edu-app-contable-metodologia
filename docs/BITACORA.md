# Bitácora de Edu App Contable

## PE. 14/09/2026 - Patrón

**Fecha PE de la consigna:** 14/09/2026.\
**Fecha real de implementación y ajuste:** 04/10/2026.\
**Autor del proyecto:** Rubén E. Albarracín.\
**Registro preparado con IA; pendiente de revisión personal del estudiante.**

### Contexto

El TP1 solo tenía carpetas y documentación (`9576cbd`). Se agregaron dos ejercicios originales: opción múltiple y cálculo de Patrimonio Neto. Cada uno necesita una regla de corrección diferente. No había código previo con duplicación.

### Alternativas consideradas

Una función con los dos casos, Strategy para separar las reglas, Factory Method para crear objetos y Observer para avisar a varios receptores. Los dos últimos no resuelven el problema de corrección.

### Decisión

Separar formularios, datos y evaluación. Usar Strategy: el evaluador recibe una estrategia y le pide corregir. Con dos ejercicios, la función simple también funciona. Se conservó en `evaluarSinPatron.ts` para comparar con la versión final.

### Consecuencias

Cada regla se puede cambiar y probar por separado. Hay más archivos y se debe elegir la estrategia fuera del evaluador. El beneficio puede crecer al agregar actividades, pero hoy la alternativa simple sigue siendo válida.

### Comprobaciones del asistente

Se ejecutaron compilación TypeScript/Vite y 27 pruebas aprobadas. En la implementación inicial se probaron 9 casos de interfaz en Chrome y se revisaron capturas de escritorio y móvil. El error inicial al importar CSS se corrigió agregando `vite-env.d.ts`.

En este ajuste se encontró Node.js 24.19.0 del entorno de Codex y npm 12.1.0 en una caché local, fuera del PATH. Se pasó a npm, se generó `package-lock.json` y se retiró el lockfile y la configuración de pnpm. Se comprobaron `npm ci`, tipos, las 27 pruebas y build. Se simplificaron los textos sin cambiar las actividades. No se repitió la prueba de navegador en este ajuste.

### Reflexión de IA: borrador de 6 líneas para revisar

Problema: se pidió corregir dos tipos de ejercicios y después resolver la ejecución en PowerShell.\
Propuesta de IA: el asistente hizo una versión simple, aplicó Strategy y ajustó el proyecto para usar npm.\
Análisis: se comparó Strategy con otras opciones y se reconoció que una función simple alcanza para dos ejercicios.\
Verificación: el asistente comprobó instalación con npm, tipos, build y 27 pruebas; antes había probado 9 casos de interfaz.\
Corrección: se agregó el tipo faltante para CSS y se reemplazó pnpm por npm, con comandos para usar la copia local encontrada.\
Justificación: separar las reglas facilita cambiarlas por separado; queda pendiente mi revisión y decidir si esta solución cumple la consigna.

El borrador cuenta las comprobaciones del asistente. El estudiante todavía debe ejecutar la aplicación, revisar el código y ajustar la reflexión a lo que haya comprobado personalmente.
