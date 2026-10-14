'use strict';
(() => {
 const $=selector=>document.querySelector(selector);
 let dagPhase='chain',branchPhase='create';
 function buttons(kind,value){document.querySelectorAll('[data-'+kind+']').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset[kind]===value)));}
 function dag(phase){dagPhase=phase;buttons('dag',phase);$('#dag-view').innerHTML=commitGraph(GIT_GRAPH.phases[phase],'dag');}
 document.querySelectorAll('[data-dag]').forEach(button=>button.onclick=()=>dag(button.dataset.dag));dag('chain');
 const branchStates={
  create:{ids:['A','B'],refs:[{at:'B',name:'main'},{at:'B',name:'mejora',kind:'feature'},{at:'B',name:'HEAD → mejora',kind:'head'}],caption:'main y mejora apuntan al mismo commit B.'},
  advance:{ids:['A','B','C','D'],refs:[{at:'D',name:'main'},{at:'C',name:'mejora',kind:'feature'},{at:'C',name:'HEAD → mejora',kind:'head'}],caption:'Las ramas avanzan a C y D desde el ancestro común B.'},
  merge:{ids:['A','B','C','D','M'],refs:[{at:'M',name:'main'},{at:'C',name:'mejora',kind:'feature'},{at:'M',name:'HEAD → main',kind:'head'}],caption:'M conserva dos padres: D y C. main avanza a M.'},
  ff:{ids:['A','B','C'],refs:[{at:'C',name:'main'},{at:'C',name:'mejora',kind:'feature'},{at:'C',name:'HEAD → main',kind:'head'}],linear:true,caption:'main avanza de B a C sin divergencia. No se crea un commit de merge.'}
 };
 function branch(state){branchPhase=state;buttons('branch',state);const value=branchStates[state];$('#branch-view').innerHTML=commitGraph(value.ids,'branches',value.refs,value.linear);$('#branch-caption').textContent=value.caption;}
 document.querySelectorAll('[data-branch]').forEach(button=>button.onclick=()=>branch(button.dataset.branch));branch('create');
 const zoneStates={edit:{work:5,index:4.5,repo:4.5,caption:'La edición cambia el archivo de trabajo.'},add:{work:5,index:5,repo:4.5,caption:'git add prepara el contenido actual: min_mag = 5.'},again:{work:6,index:5,repo:4.5,caption:'Otra edición cambia el trabajo a 6. El índice conserva 5.'},commit:{work:6,index:5,repo:5,caption:'El commit registra 5. La edición con 6 sigue pendiente.'}};
 function zone(state){buttons('zone',state);const value=zoneStates[state];for(const kind of ['work','index','repo'])$('#'+kind+'-value').textContent='min_mag = '+value[kind];$('#zone-caption').textContent=value.caption;}
 document.querySelectorAll('[data-zone]').forEach(button=>button.onclick=()=>zone(button.dataset.zone));zone('edit');
 addEventListener('resize',()=>{dag(dagPhase);branch(branchPhase);});
})();
