# Edu App Contable

## Datos académicos

- **Materia:** Metodología de Sistemas.
- **Carrera:** Tecnicatura en Programación de la Universidad Tecnológica Nacional (UTN).
- **Autor:** Rubén E. Albarracín.

## Descripción y objetivo

Edu App Contable es un proyecto de aplicación web educativa destinado a estudiantes secundarios. Su objetivo es acompañar el aprendizaje de conceptos contables mediante contenidos de estudio, ejercicios y actividades interactivas.

## Funcionalidades previstas

- Estudiar documentos comerciales.
- Practicar ejercicios contables.
- Resolver actividades de patrimonio.
- Jugar un quiz para repasar conocimientos.
- Guardar el progreso localmente en el navegador.

## Tecnologías previstas

- React para construir la interfaz.
- TypeScript para desarrollar el código con tipado estático.
- Vite como herramienta de desarrollo y construcción.
- localStorage para persistir el progreso en el navegador, sin backend.

## Estructura inicial del TP1

```text
edu-app-contable-metodologia/
├── docs/
│   └── README.md
├── public/
│   └── .gitkeep
├── src/
│   ├── components/
│   │   └── .gitkeep
│   ├── pages/
│   │   └── .gitkeep
│   ├── data/
│   │   └── .gitkeep
│   └── styles/
│       └── .gitkeep
├── .gitignore
└── README.md
```

- **docs/:** requisitos, diagramas y documentación elaborados durante la materia.
- **public/:** recursos estáticos públicos de la futura aplicación.
- **src/:** código fuente de la futura aplicación.
- **src/components/:** componentes reutilizables de la interfaz.
- **src/pages/:** páginas o vistas de la aplicación.
- **src/data/:** contenidos educativos, preguntas y datos de las actividades.
- **src/styles/:** estilos de la interfaz.

Los archivos `.gitkeep` permiten conservar en Git las carpetas que todavía no tienen contenido.

## Alcance de la entrega TP1

Esta primera entrega comprende la creación del repositorio Git y su estructura inicial de carpetas, junto con la documentación introductoria. No incluye implementación de funcionalidades, instalación de dependencias ni una aplicación ejecutable. Las tecnologías y funcionalidades mencionadas están previstas para etapas posteriores.

## TP2: evaluación educativa con Strategy

Materia de esta etapa: **Metodología de Sistemas II**. La rama `tp2-patron-strategy` incorpora una aplicación mínima funcional con React, Vite y TypeScript: opción múltiple y cálculo de Patrimonio Neto. Cada formulario usa una estrategia de evaluación y muestra si la respuesta es correcta junto con una explicación. No incluye backend ni persistencia; localStorage continúa previsto para etapas posteriores.

### Instalar, ejecutar y verificar

Requisitos: Node.js >= 22.12.0 y pnpm 10.30.3.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm test
pnpm build
```

Abrir la URL local indicada por Vite. Como alternativa se pueden usar `npm install`, `npm run dev`, `npm run typecheck`, `npm test` y `npm run build`. Para reproducir el lockfile incluido se recomienda pnpm.

- `src/evaluation/`: contrato, estrategias, contexto, selección, pruebas y alternativa simple de comparación.
- `src/data/actividades.ts`: datos originales de los dos ejercicios.
- `src/App.tsx`: formularios y devoluciones; `src/main.tsx`: entrada React.
- `src/styles/app.css`: estilos adaptables a escritorio y móvil.
- [Decisión y verificación del TP2](docs/TP2_PATRON.md).
- [Bitácora y borrador de reflexión de IA](docs/BITACORA.md).

El patrón se aplica con finalidad académica sobre dos reglas realmente distintas. La alternativa sin patrón todavía es suficiente para este tamaño; sus costos y esta limitación se documentan explícitamente. No se copiaron archivos de la aplicación original ni material docente.
