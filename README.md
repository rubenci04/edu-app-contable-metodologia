# Edu App Contable

- **Materia:** Metodología de Sistemas II.
- **Carrera:** Tecnicatura en Programación, UTN.
- **Autor:** Rubén E. Albarracín.

Aplicación web educativa para estudiantes secundarios. Busca ayudar a estudiar documentos comerciales y practicar conceptos contables.

## Alcance

El TP1 creó el repositorio y las carpetas iniciales. El TP2 agrega dos ejercicios: una pregunta de opción múltiple y un cálculo de Patrimonio Neto. Ambos muestran si la respuesta es correcta y explican la solución.

El proyecto usa React, TypeScript y Vite. Más adelante se prevén teoría, otras prácticas, quiz y progreso en localStorage. Esas funciones todavía no están implementadas en este repositorio. No hay backend.

## Ejecutar con npm

Requisitos: Node.js 22.12 o superior y npm. El único archivo de dependencias fijadas es `package-lock.json`.

Si `node` y `npm` ya funcionan en PowerShell:

```powershell
cd C:\Users\rea_0\Documents\ChatGPT\edu-app-contable-metodologia
npm ci
npm run dev
```

Abrir la dirección que indique Vite, normalmente `http://127.0.0.1:5173/`. Para detenerlo, presionar Ctrl+C.

### En esta computadora: npm fuera del PATH

El asistente encontró Node.js 24.19.0 en el entorno de Codex y npm 12.1.0 en una caché local. No encontró `npm` en el PATH ni una instalación en `C:\Program Files\nodejs`. El `pnpm` interno de Codex tampoco garantiza que el comando exista en una terminal abierta por el estudiante.

Este bloque usa las copias locales encontradas. No instala herramientas ni cambia el PATH de forma permanente. Pegarlo en PowerShell antes de los comandos anteriores:

```powershell
$nodeExe = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$npmCli = (Get-ChildItem -Path "$env:LOCALAPPDATA\pnpm\store\v11\links\@\npm\12.1.0\*\node_modules\npm\bin\npm-cli.js" | Select-Object -First 1).FullName
if (!(Test-Path -LiteralPath $nodeExe) -or !$npmCli) { throw 'No se encontraron las copias locales de Node.js y npm.' }
$env:Path = "$(Split-Path -Parent $nodeExe);$env:Path"
function npm { & $nodeExe $npmCli @args }
node --version
npm --version
```

La función `npm` dura solo en esa sesión. La ruta de caché contiene el nombre pnpm, pero se ejecuta npm directamente: no hace falta invocar ni instalar pnpm. Si esas copias se borran, se necesitará una instalación normal de Node.js con npm.

## Verificar

En la carpeta del proyecto y con npm disponible:

```powershell
npm run typecheck
npm test
npm run build
```

## Carpetas y archivos

- `docs/`: decisiones, bitácora y futura documentación de la materia.
- `public/`: recursos estáticos.
- `src/components/` y `src/pages/`: espacios reservados para componentes y páginas.
- `src/data/`: datos originales de las actividades.
- `src/styles/`: estilos de la interfaz.
- `src/evaluation/`: contrato, estrategias, evaluador, selección y pruebas.
- `src/App.tsx`: formularios y devoluciones.
- `src/main.tsx`: inicio de React.

Los `.gitkeep` conservan las carpetas que siguen vacías.

## Strategy en el TP2

Cada tipo de ejercicio tiene una forma de corregirse. El evaluador usa la estrategia que recibe. Con dos ejercicios, una función simple también funciona. Separar las reglas ayuda a cambiarlas y probarlas por separado cuando se agreguen más actividades, a cambio de tener más archivos.

- [Decisión y verificaciones](docs/TP2_PATRON.md).
- [Bitácora y reflexión de IA para revisar](docs/BITACORA.md).
- [PR #1](https://github.com/rubenci04/edu-app-contable-metodologia/pull/1).

El TP2 está en `tp2-patron-strategy`. La aplicación original y el material docente no se copiaron al repositorio.
