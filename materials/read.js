'use strict';
(() => {
 const docs={solar:{title:'Demo solar',path:'../demos/solar/starter/BRIEF.md'},earthquakes:{title:'Alternativa USGS',path:'../demos/earthquakes/starter/BRIEF.md'},instructor:{title:'Guía del instructor',path:'../cohorts/01/sessions/01/instructor-guide.md'},sources:{title:'Fuentes y documentación',path:'../docs/sources.md'},'demo-options':{title:'Opciones de demo',path:'../docs/demo-options.md'}};
 const key=new URLSearchParams(location.search).get('doc')||'solar',doc=docs[key];
 const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function inline(s){let codes=[];s=s.replace(/`([^`]+)`/g,(_,code)=>'\u0000'+(codes.push('<code>'+escape(code)+'</code>')-1)+'\u0000');s=escape(s);s=s.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g,(_,label,url)=>{if(!/^https?:\/\//i.test(url))return label;return '<a href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+'</a>';}).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');return s.replace(/\u0000(\d+)\u0000/g,(_,i)=>codes[Number(i)]);}
 function render(markdown){const lines=markdown.replace(/\r/g,'').split('\n');let html='',i=0;
  const tableCells=s=>s.trim().replace(/^\||\|$/g,'').split('|').map(s=>s.trim());
  const boundary=s=>!s.trim()||/^#{1,6}\s|^>|^```|^\s*[-*]\s|^\d+\.\s/.test(s);
  while(i<lines.length){let line=lines[i];if(!line.trim()){i++;continue;}
   if(/^```/.test(line)){const code=[];i++;while(i<lines.length&&!/^```/.test(lines[i]))code.push(lines[i++]);i++;html+='<pre><code>'+escape(code.join('\n'))+'</code></pre>';continue;}
   const heading=line.match(/^(#{1,6})\s+(.*)$/);if(heading){const n=heading[1].length;html+='<h'+n+'>'+inline(heading[2])+'</h'+n+'>';i++;continue;}
   if(line.startsWith('|')&&/^\|?[\s:|-]+\|?\s*$/.test(lines[i+1]||'')){const headers=tableCells(line);i+=2;const rows=[];while(i<lines.length&&lines[i].trim().startsWith('|'))rows.push(tableCells(lines[i++]));html+='<div class="table-scroll"><table><thead><tr>'+headers.map(c=>'<th>'+inline(c)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';continue;}
   if(/^>/.test(line)){const block=[];while(i<lines.length&&/^>/.test(lines[i]))block.push(lines[i++].replace(/^>\s?/,''));html+='<blockquote><p>'+inline(block.join(' '))+'</p></blockquote>';continue;}
   if(/^\s*[-*]\s|^\d+\.\s/.test(line)){const ordered=/^\d+\.\s/.test(line),tag=ordered?'ol':'ul',pattern=ordered?/^\d+\.\s/:/^\s*[-*]\s/;html+='<'+tag+'>';while(i<lines.length&&pattern.test(lines[i]))html+='<li>'+inline(lines[i++].replace(pattern,''))+'</li>';html+='</'+tag+'>';continue;}
   const paragraph=[line];i++;while(i<lines.length&&!boundary(lines[i])&&!lines[i].startsWith('|'))paragraph.push(lines[i++]);html+='<p>'+inline(paragraph.join(' '))+'</p>';
  }return html;
 }
 const body=document.querySelector('#document');if(!doc){body.innerHTML='<h1>Guía no encontrada</h1><p>Elige una de las guías del menú.</p>';return;}
 document.title=doc.title+' · DeepSkill';document.querySelector('#doc-label').textContent=doc.title;document.querySelector('#doc-source').href=doc.path;document.querySelector('[data-doc="'+key+'"]').setAttribute('aria-current','page');
 fetch(doc.path,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Source not available');return r.text();}).then(text=>body.innerHTML=render(text)).catch(()=>body.innerHTML='<h1>'+doc.title+'</h1><p>No se pudo cargar esta guía. Puedes descargar la fuente o volver a Materiales.</p>');
})();
