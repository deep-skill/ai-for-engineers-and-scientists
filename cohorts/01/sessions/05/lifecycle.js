'use strict';

// Editable teaching model. These controls never call an agent or a system tool.
const LIFECYCLE = Object.freeze({
  phases: [
    {id:'requirements', title:'Requisitos', artifact:'Criterios', question:'¿Qué necesita la persona?', output:'Un resultado que podamos comprobar', slide:2, core:true},
    {id:'design', title:'Análisis y diseño', artifact:'Decisiones', question:'¿Qué reglas y responsabilidades hay?', output:'Una solución explicada antes de implementarla', slide:3, core:true},
    {id:'code', title:'Programación', artifact:'Implementación', question:'¿Cómo expresamos esas decisiones?', output:'Funciones y datos que podamos entender', slide:4, core:true},
    {id:'test', title:'Pruebas', artifact:'Evidencia', question:'¿Cumple lo que acordamos?', output:'Casos con resultados esperados', slide:5, core:true},
    {id:'delivery', title:'Entrega', artifact:'Versión', question:'¿Otra persona puede usarlo?', output:'Una versión con instrucciones y comprobaciones', slide:6, core:true},
    {id:'operations', title:'Operación y mantenimiento', artifact:'Aprendizaje', question:'¿Qué ocurre durante el uso?', output:'Señales que orientan la siguiente mejora', slide:7, core:false}
  ],
  // The map shows the five development stages; operation is the return path.
});

function phaseRail(active) {
  return '<nav class="phase-rail" aria-label="Etapas del ciclo de vida">'+LIFECYCLE.phases.map((phase,i)=>'<a href="#s-'+phase.slide+'" '+(phase.id===active?'aria-current="step"':'')+'><span>'+(phase.core?String(i+1).padStart(2,'0'):'↩')+'</span>'+phase.title+'</a>').join('')+'</nav>';
}

function lifecycleTrack() {
  const stages=LIFECYCLE.phases.filter(phase=>phase.core);
  return stages.map((phase,i)=>'<a class="cycle-stage" href="#s-'+phase.slide+'"><span>'+String(i+1).padStart(2,'0')+'</span><strong>'+phase.title+'</strong><small>'+phase.artifact+'</small></a>'+(i<stages.length-1?'<span class="cycle-arrow" aria-hidden="true">→</span>':'')).join('');
}

function flowDiagram(nodes, key) {
  return '<div class="editable-flow" aria-label="'+nodes.map(node=>node.title).join(' → ')+'">'+nodes.map((node,i)=>'<div class="flow-step"><span>'+node.label+'</span><strong>'+node.title+'</strong><small>'+node.detail+'</small></div>'+(i<nodes.length-1?'<span class="flow-arrow" aria-hidden="true">→</span>':'')).join('')+'</div>';
}
