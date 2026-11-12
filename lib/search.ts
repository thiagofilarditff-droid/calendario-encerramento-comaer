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
  var dateSel=root.querySelector('[data-search-date]');
  seen.add(root);
  var rows=Array.from(root.querySelectorAll('tbody > tr'));
  var ranges=rows.map(function(row){return [row.getAttribute('data-start')||'',row.getAttribute('data-end')||''];});
  var texts=rows.map(function(row){return normalize(row.textContent||'');});
  function filter(){
   var words=normalize(input.value).split(' ').filter(Boolean), day=dateSel?dateSel.value:'', count=0;
   rows.forEach(function(row,i){var match=words.every(function(word){return texts[i].includes(word);})&&(!day||(ranges[i][0]!==''&&ranges[i][0]<=day&&day<=(ranges[i][1]||ranges[i][0])));row.style.setProperty('display',match?'table-row':'none','important');if(match)count++;});
   status.textContent='';
   empty.style.setProperty('display',count?'none':'block','important');
  }
  input.addEventListener('input',filter);
  if(dateSel)dateSel.addEventListener('change',filter);
  clear.addEventListener('click',function(){input.value='';if(dateSel)dateSel.value='';filter();input.focus();});
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
