import { useState } from 'react';
import type { ResultadoEvaluacion } from './evaluation/types';
import { evaluarSinPatron } from './evaluation/evaluarSinPatron';

function Devolucion({ resultado }: { resultado: ResultadoEvaluacion | null }) {
  return <div aria-live="polite" className="devolucion">{resultado && <>
    <strong>{resultado.correcta ? 'Respuesta correcta' : 'Respuesta incorrecta'}</strong>
    <p>{resultado.explicacion}</p>
  </>}</div>;
}

export function App() {
  const [seleccion, setSeleccion] = useState('');
  const [patrimonio, setPatrimonio] = useState('');
  const [opcionResultado, setOpcionResultado] = useState<ResultadoEvaluacion | null>(null);
  const [ecuacionResultado, setEcuacionResultado] = useState<ResultadoEvaluacion | null>(null);
  return <main>
    <header><span className="etiqueta">UTN · Metodología de Sistemas II · TP2</span>
      <h1>Edu App Contable</h1><p>Dos actividades para practicar y entender la devolución.</p></header>
    <div className="actividades">
      <section aria-labelledby="opcion-titulo"><h2 id="opcion-titulo">Documentos comerciales</h2>
        <form onSubmit={event => { event.preventDefault(); setOpcionResultado(evaluarSinPatron({ tipo: 'opcion', seleccion })); }}>
          <fieldset><legend>¿Qué documento deja constancia de una compraventa?</legend>
          {['factura', 'recibo', 'remito'].map(opcion => <label key={opcion} className="opcion">
            <input type="radio" name="documento" value={opcion} checked={seleccion === opcion}
              onChange={() => { setSeleccion(opcion); setOpcionResultado(null); }} />
            {opcion[0].toUpperCase() + opcion.slice(1)}</label>)}
          </fieldset><button type="submit">Evaluar opción</button>
        </form><Devolucion resultado={opcionResultado} />
      </section>
      <section aria-labelledby="ecuacion-titulo"><h2 id="ecuacion-titulo">Ecuación contable</h2>
        <p>Una organización tiene un Activo de 1200 y un Pasivo de 450. ¿Cuál es su Patrimonio Neto?</p>
        <p className="formula">Activo = Pasivo + Patrimonio Neto</p>
        <form onSubmit={event => { event.preventDefault(); setEcuacionResultado(evaluarSinPatron({ tipo: 'ecuacion', patrimonioNeto: patrimonio })); }}>
          <label htmlFor="patrimonio">Patrimonio Neto</label>
          <input id="patrimonio" type="text" inputMode="decimal" value={patrimonio}
            onChange={event => { setPatrimonio(event.target.value); setEcuacionResultado(null); }} aria-describedby="ayuda" />
          <small id="ayuda">Usá coma o punto decimal, sin separadores de miles. Tolerancia: 0,005.</small>
          <button type="submit">Evaluar ecuación</button>
        </form><Devolucion resultado={ecuacionResultado} />
      </section>
    </div><footer>Rubén E. Albarracín · Ejemplos educativos originales · Sin backend</footer>
  </main>;
}
