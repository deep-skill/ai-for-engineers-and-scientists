'use strict';
(() => {
  const $=selector=>document.querySelector(selector);

  const designModes={
    analysis:{nodes:[{label:'Entidades',title:'Modelo',detail:'Qué existe y cómo se relaciona'},{label:'Reglas',title:'Restricciones',detail:'Qué debe cumplirse siempre'},{label:'Límites',title:'Alcance',detail:'Qué queda fuera y por qué'}],caption:'Análisis: describir el problema, sus reglas y sus límites.'},
    design:{nodes:[{label:'Responsabilidades',title:'Separar',detail:'Cada parte con una razón'},{label:'Contratos',title:'Acordar',detail:'Entradas, salidas y errores'},{label:'Datos',title:'Organizar',detail:'Estructura y persistencia'}],caption:'Diseño: repartir responsabilidades y definir contratos.'},
    plan:{nodes:[{label:'Pasos',title:'Ordenar',detail:'Cambios pequeños y revisables'},{label:'Riesgos',title:'Anticipar',detail:'Qué puede fallar'},{label:'Evidencia',title:'Comprobar',detail:'Cómo sabremos que funciona'}],caption:'Plan: ordenar cambios, riesgos y comprobaciones.'}
  };
  function design(mode){
    document.querySelectorAll('[data-design]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.design===mode)));
    $('#design-flow').innerHTML=flowDiagram(designModes[mode].nodes,'design');
    $('#design-caption').textContent=designModes[mode].caption;
  }
  document.querySelectorAll('[data-design]').forEach(button=>button.addEventListener('click',()=>design(button.dataset.design)));design('design');

  function delivery(mode){
    document.querySelectorAll('[data-delivery]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.delivery===mode)));
    $('#delivery-caption').textContent=mode==='delivery'?'La versión queda lista; una persona decide cuándo desplegarla en producción.':'La versión se despliega automáticamente en producción tras superar las comprobaciones.';
  }
  document.querySelectorAll('[data-delivery]').forEach(button=>button.addEventListener('click',()=>delivery(button.dataset.delivery)));delivery('delivery');
})();
