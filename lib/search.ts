// Shared by the standalone export and the optional Joomla template file.
export const searchScript = `(function(){
'use strict';
if(window.__direfCalendarSearchInstalled)return;
window.__direfCalendarSearchInstalled=true;
var seen=new WeakSet();
function normalize(value){return value.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/\\s+/g,' ').trim();}
function build(root){
 var input=root.querySelector('[data-search-input]'), controls=root.querySelector('[data-search-controls]'), status=root.querySelector('[data-search-status]'), empty=root.querySelector('[data-search-empty]'), clear=root.querySelector('[data-search-clear]');
 if(input&&controls&&status&&empty&&clear)return {input:input,controls:controls,status:status,empty:empty,clear:clear};
 var anchor=root.querySelector('.scroll')||root.querySelector('table');
 if(!anchor||!anchor.parentNode)return null;
 var F='font-family:Arial,Helvetica,sans-serif!important;color:#172c42!important;';
 function el(tag,attrs,style,text){var e=document.createElement(tag);for(var k in attrs)e.setAttribute(k,attrs[k]);e.setAttribute('style',F+style);if(text)e.textContent=text;return e;}
 controls=el('div',{'data-search-controls':'true'},'display:none!important;flex-wrap:wrap;gap:10px;align-items:flex-end;padding:12px!important;background:#edf3f9!important;margin:0 0 12px!important;');
 var label=el('label',{},'font-size:13px!important;display:block!important;margin:0!important;','Pesquisar no calendário');
 input=el('input',{'data-search-input':'true',type:'search',placeholder:'Ex.: GRU, empenho, SUFIN',autocomplete:'off'},'display:block!important;width:250px!important;max-width:100%;height:38px!important;padding:7px 10px!important;margin:5px 0 0!important;font-size:15px!important;background:#fff!important;border:1px solid #aebfd0!important;border-radius:4px;');
 label.appendChild(input);
 clear=el('button',{'data-search-clear':'true',type:'button'},'height:38px!important;padding:7px 14px!important;font-size:14px!important;background:#214f7e!important;color:#fff!important;border:0!important;border-radius:4px;cursor:pointer;','Limpar');
 status=el('span',{'data-search-status':'true',role:'status','aria-live':'polite'},'font-size:14px!important;');
 controls.appendChild(label);controls.appendChild(clear);controls.appendChild(status);
 empty=el('p',{'data-search-empty':'true'},'display:none!important;padding:12px!important;margin:0 0 10px!important;','Nenhum evento encontrado. Altere o termo pesquisado.');
 anchor.parentNode.insertBefore(controls,anchor);anchor.parentNode.insertBefore(empty,anchor);
 return {input:input,controls:controls,status:status,empty:empty,clear:clear};
}
function setup(){
 document.querySelectorAll('[data-diref-calendar]').forEach(function(root){
  if(seen.has(root))return;
  var ui=build(root);
  if(!ui)return;
  var input=ui.input, controls=ui.controls, status=ui.status, empty=ui.empty, clear=ui.clear;
  seen.add(root);
  var rows=Array.from(root.querySelectorAll('tbody > tr'));
  var texts=rows.map(function(row){return normalize(row.textContent||'');});
  function filter(){
   var words=normalize(input.value).split(' ').filter(Boolean), count=0;
   rows.forEach(function(row,i){var match=words.every(function(word){return texts[i].includes(word);});row.style.setProperty('display',match?'table-row':'none','important');if(match)count++;});
   status.textContent=words.length?count+' de '+rows.length+' eventos encontrados.':rows.length+' eventos no calendário.';
   empty.style.setProperty('display',count?'none':'block','important');
  }
  input.addEventListener('input',filter);
  clear.addEventListener('click',function(){input.value='';filter();input.focus();});
  controls.style.setProperty('display','flex','important');
  filter();
 });
}
setup();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);
var pending=false;
new MutationObserver(function(changes){
 if(pending||!changes.some(function(change){return Array.from(change.addedNodes).some(function(node){return node.nodeType===1;});}))return;
 pending=true;setTimeout(function(){pending=false;setup();},0);
}).observe(document.documentElement,{childList:true,subtree:true});
})();`;
