'use strict';
// Conceptual commit graphs. Letters are teaching IDs, never real hashes.
const GIT_GRAPH=Object.freeze({
 nodes:{A:{x:90,y:175,label:'Datos'},B:{x:310,y:175,label:'CSV'},C:{x:540,y:70,label:'Filtro'},D:{x:540,y:275,label:'Documentación'},M:{x:800,y:175,label:'Integración'}},
 parents:{A:[],B:['A'],C:['B'],D:['B'],M:['D','C']},
 phases:{chain:['A','B'],fork:['A','B','C','D'],merge:['A','B','C','D','M']}
});
function commitGraph(ids,key,refs=[],linear=false){
 const mobile=typeof matchMedia==='function'&&matchMedia('(max-width:760px)').matches;
 const compact={A:{x:195,y:80},B:{x:195,y:230},C:{x:85,y:405},D:{x:305,y:405},M:{x:195,y:580}};
 const points=Object.fromEntries(ids.map(id=>[id,{...GIT_GRAPH.nodes[id],...(mobile?compact[id]:{}),...(linear&&id==='C'?(mobile?{x:195}:{y:175}):{})}]));
 const edges=ids.flatMap(id=>GIT_GRAPH.parents[id].filter(parent=>ids.includes(parent)).map(parent=>{
  const from=points[id],to=points[parent],length=Math.hypot(to.x-from.x,to.y-from.y),dx=(to.x-from.x)/length,dy=(to.y-from.y)/length;
  return '<line x1="'+(from.x+dx*35)+'" y1="'+(from.y+dy*35)+'" x2="'+(to.x-dx*39)+'" y2="'+(to.y-dy*39)+'" marker-end="url(#arrow-'+key+')"/>';
 })).join('');
 const labels=refs.map((ref,i)=>{const p=points[ref.at],offset=refs.slice(0,i).filter(r=>r.at===ref.at).length*27;return '<text class="graph-ref '+(ref.kind||'')+'" x="'+p.x+'" y="'+(p.y+72+offset)+'">'+ref.name+'</text>';}).join('');
 const nodes=ids.map(id=>{const p=points[id];return '<g class="graph-node '+(id==='M'?'merged':'')+'"><circle cx="'+p.x+'" cy="'+p.y+'" r="34"/><text class="graph-id" x="'+p.x+'" y="'+(p.y+9)+'">'+id+'</text><text class="graph-description" x="'+p.x+'" y="'+(p.y-53)+'">'+p.label+'</text></g>';}).join('');
 const viewBox=mobile?'0 0 390 '+(Math.max(...Object.values(points).map(p=>p.y))+140):'0 0 900 390';
 const relationships=ids.flatMap(id=>GIT_GRAPH.parents[id].filter(p=>ids.includes(p)).map(p=>id+' → '+p)).join('; ');
 const referenceText=refs.map(ref=>ref.name+' en '+ref.at).join('; ');
 return '<svg class="commit-graph" viewBox="'+viewBox+'" role="img" aria-label="Grafo ilustrativo de commits '+ids.join(', ')+'. Flechas del commit hacia su padre: '+relationships+'. '+referenceText+'"><defs><marker id="arrow-'+key+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 1 L 9 5 L 0 9"/></marker></defs><g class="graph-edges">'+edges+'</g>'+nodes+labels+'</svg>';
}
