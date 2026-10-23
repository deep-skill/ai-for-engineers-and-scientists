'use strict';

// Teaching diagrams only. No model calls or project operations.
const WORKFLOW = Object.freeze({
  lifecycle: ['Requisitos', 'Análisis y diseño', 'Programación', 'Pruebas', 'Entrega'],
  iteration: [
    {title:'Planear', detail:'Cambio acotado', artifact:'Criterio antes de actuar'},
    {title:'Ejecutar', detail:'Acción y observación', artifact:'Cambios revisables'},
    {title:'Verificar', detail:'Esperado frente a observado', artifact:'Evidencia de cumplimiento'}
  ]
});

function stepFlow(steps, className='') {
  return '<div class="step-flow '+className+'">'+steps.map((step,index)=>
    '<div class="step"><span class="step-number">'+String(index+1).padStart(2,'0')+'</span><strong>'+step.title+'</strong><p>'+step.detail+'</p>'+(step.artifact?'<small>'+step.artifact+'</small>':'')+'</div>'+
    (index<steps.length-1?'<span class="flow-arrow" aria-hidden="true">→</span>':'')
  ).join('')+'</div>';
}

function lifecycleStrip() {
  return '<div class="lifecycle-strip" aria-label="Etapas de desarrollo">'+WORKFLOW.lifecycle.map((title,index)=>
    '<span>'+title+'</span>'+(index<WORKFLOW.lifecycle.length-1?'<b aria-hidden="true">→</b>':'')
  ).join('')+'</div>';
}
