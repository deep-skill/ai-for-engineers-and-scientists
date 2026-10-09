'use strict';
(() => {
 const sessions = [
  {id:'01', date:'6 oct. 2026', title:'¿Qué es realmente un LLM?', description:'Fundamentos, modelos y primeras herramientas.'},
  {id:'02', date:'8 oct. 2026', title:'Del chat al agente', description:'Contexto, herramientas y práctica. RAG al cierre.'}
 ];
 const root = document.querySelector('[data-course-root]')?.dataset.courseRoot || './';
 const current = document.body.dataset.session;
 const url = s => root+'cohorts/01/sessions/'+s.id+'/index.html'+(sessionStorage.getItem('course-slide-'+s.id)||'');
 const library = document.querySelector('#session-library');
 if(library) library.innerHTML=sessions.map(s=>'<article class="session-card"><span class="eyebrow">Clase '+Number(s.id)+' · '+s.date+'</span><h3>'+s.title+'</h3><p>'+s.description+'</p><a class="button '+(s.id==='02'?'primary':'')+'" href="'+url(s)+'">Abrir presentación →</a></article>').join('');
 const controls=document.querySelector('.controls');
 if(!controls||!current)return;
 const button=document.createElement('button');button.id='sessions';button.textContent='Clases';button.title='Cambiar de clase';
 controls.insertBefore(button,document.querySelector('#outline'));
 button.onclick=()=>{
  document.querySelector('#overlay-content').innerHTML='<h2>Presentaciones del curso</h2><p class="muted">Cada clase conserva la última diapositiva visitada en esta pestaña.</p>'+sessions.map(s=>'<a class="session-choice" '+(s.id===current?'aria-current="page" ':'')+'href="'+url(s)+'"><span>Clase '+Number(s.id)+'<small>'+s.date+'</small></span><strong>'+s.title+'</strong><span>'+(s.id===current?'Actual':'Abrir ↗')+'</span></a>').join('');
  document.querySelector('#overlay').showModal();
 };
 function remember(){if(/^#s-\d+$/.test(location.hash))sessionStorage.setItem('course-slide-'+current,location.hash);}
 document.addEventListener('slidechange',remember);addEventListener('hashchange',remember);remember();
})();
