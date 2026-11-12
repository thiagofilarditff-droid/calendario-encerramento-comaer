// Shared by the standalone export and the optional Joomla template file.
export const searchScript = `(function(){
'use strict';
if(window.__direfCalendarSearchInstalled)return;
window.__direfCalendarSearchInstalled=true;
var seen=new WeakSet();
function normalize(value){return value.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/\\s+/g,' ').trim();}
function setup(){
 document.querySelectorAll('[data-diref-calendar]').forEach(function(root){
  if(seen.has(root))return;
  var input=root.querySelector('[data-search-input]'), controls=root.querySelector('[data-search-controls]'), status=root.querySelector('[data-search-status]'), empty=root.querySelector('[data-search-empty]'), clear=root.querySelector('[data-search-clear]');
  if(!input||!controls||!status||!empty||!clear)return;
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
