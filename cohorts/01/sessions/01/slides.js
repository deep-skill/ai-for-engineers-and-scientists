'use strict';
const stage=document.querySelector('#stage'),counter=document.querySelector('#counter'),overlay=document.querySelector('#overlay'),reviewPanel=document.querySelector('#review-panel');
let current=0,reviewing=sessionStorage.getItem('course-review')==='1';
slides.forEach((slide,i)=>{
 const section=document.createElement('section');section.className='slide '+slide.className;section.hidden=true;section.setAttribute('aria-label',(i+1)+'. '+slide.title);
 section.innerHTML='<header class="slide-header"><a class="brand" href="https://www.deepskill.space/" target="_blank" rel="noopener noreferrer"><img src="'+ASSETS+'deepskill.png" alt="">DeepSkill</a><span class="chapter">'+slide.chapter+'<b>'+String(i+1).padStart(2,'0')+'</b></span></header>'+slide.html;stage.append(section);
});
function fit(){const rail=reviewing&&innerWidth>700?340:0,available=innerWidth-rail;stage.style.left=available/2+'px';stage.style.setProperty('--scale',Math.max(.1,Math.min(available/1440,(innerHeight-78)/810)));document.querySelector('.controls').style.left=available/2+'px';}
function reviewContent(){const s=slides[current];document.querySelector('#review-title').textContent=(current+1)+'. '+s.title;document.querySelector('#review-idea').textContent=s.review.idea;document.querySelector('#review-interaction').textContent=s.review.interaction;document.querySelector('#review-focus').textContent=s.review.focus;document.querySelector('#review-comments').value=localStorage.getItem('course-feedback-'+s.title)||'';}
function setReview(value){reviewing=value;reviewPanel.hidden=!value;document.querySelector('#review').setAttribute('aria-pressed',String(value));sessionStorage.setItem('course-review',value?'1':'0');reviewContent();fit();}
function show(index,updateHash=true){
 const previous=current;current=Math.max(0,Math.min(slides.length-1,index));[...stage.children].forEach((el,i)=>el.hidden=i!==current);
 counter.textContent=(current+1)+' / '+slides.length;document.title=slides[current].title+' · DeepSkill';
 document.querySelector('#progress').style.width=(current+1)/slides.length*100+'%';document.querySelector('#prev').disabled=current===0;document.querySelector('#next').disabled=current===slides.length-1;
 if(updateHash)history.replaceState(null,'','#s-'+(current+1));
 if(previous!==current&&!matchMedia('(prefers-reduced-motion: reduce)').matches)stage.children[current].animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'ease-out'});
 reviewContent();document.dispatchEvent(new CustomEvent('slidechange',{detail:current}));
}
function fromHash(){const match=location.hash.match(/^#s-(\d+)$/);show(match?Number(match[1])-1:0,false);}
function notes(){const s=slides[current],elapsed=slides.slice(0,current).reduce((sum,s)=>sum+s.minutes,0);document.querySelector('#overlay-content').innerHTML='<h2>'+s.title+'</h2><p class="note-time">'+(s.appendix?'Apéndice opcional':s.minutes+' min, minuto '+elapsed+'–'+(elapsed+s.minutes))+'</p><p>'+s.notes+'</p>'+(s.sources.length?'<h3>Fuentes</h3><ul>'+s.sources.map(url=>'<li>'+link(url,url)+'</li>').join('')+'</ul>':'');overlay.showModal();}
function outline(){document.querySelector('#overlay-content').innerHTML='<h2>Diapositivas</h2><p class="muted">16 principales, 30 minutos. 3 apéndices opcionales.</p>'+slides.map((s,i)=>'<button class="outline-item" data-slide="'+i+'"><span>'+String(i+1).padStart(2,'0')+'. '+s.title+'</span><small>'+(s.appendix?'Apéndice':s.minutes+' min')+'</small></button>').join('');overlay.showModal();}
function fullscreen(){if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(()=>{});}
document.querySelector('#prev').onclick=()=>show(current-1);document.querySelector('#next').onclick=()=>show(current+1);document.querySelector('#notes').onclick=notes;document.querySelector('#outline').onclick=outline;document.querySelector('#fullscreen').onclick=fullscreen;document.querySelector('#review').onclick=()=>setReview(!reviewing);document.querySelector('.review-close').onclick=()=>setReview(false);document.querySelector('#review-comments').addEventListener('input',event=>localStorage.setItem('course-feedback-'+slides[current].title,event.target.value));
overlay.querySelector('.close').onclick=()=>overlay.close();overlay.addEventListener('click',event=>{const target=event.target.closest('[data-slide]');if(target){show(Number(target.dataset.slide));overlay.close();}});
addEventListener('keydown',event=>{
 if(overlay.open||event.metaKey||event.ctrlKey||event.altKey||event.target.matches('input,textarea,select,[contenteditable]'))return;
 const key=event.key.toLowerCase();
 if(key===' '&&event.target.closest('button,a'))return;
 if(['arrowright','arrowdown',' ','pagedown'].includes(key)){event.preventDefault();show(current+1);}
 else if(['arrowleft','arrowup','pageup'].includes(key)){event.preventDefault();show(current-1);}
 else if(key==='home'){event.preventDefault();show(0);}else if(key==='end'){event.preventDefault();show(slides.length-1);}
 else if(key==='p')notes();else if(key==='o')outline();else if(key==='f')fullscreen();else if(key==='r')setReview(!reviewing);
});
addEventListener('hashchange',fromHash);addEventListener('resize',fit);setReview(reviewing);fromHash();
