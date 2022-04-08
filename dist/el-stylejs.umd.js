var K=Object.defineProperty;var z=Object.getOwnPropertySymbols;var V=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var A=(a,f,u)=>f in a?K(a,f,{enumerable:!0,configurable:!0,writable:!0,value:u}):a[f]=u,T=(a,f)=>{for(var u in f||(f={}))V.call(f,u)&&A(a,u,f[u]);if(z)for(var u of z(f))W.call(f,u)&&A(a,u,f[u]);return a};(function(a){typeof define=="function"&&define.amd?define(a):a()})(function(){"use strict";function a(e,t){const n=e.style;for(const[o,i]of Object.entries(t))i&&n.setProperty(o,String(i));return e}const f=e=>Object.prototype.toString.call(e)==="[object Object]";function u(e,t){const n=document.createElement(e.tag);for(let[o,i]of Object.entries(e.props))i&&(f(i)&&(i=Object.entries(i).map(s=>s.join(":")).join(";")),n.setAttribute(o,i));return e.children&&(typeof e.children=="string"?n.textContent=e.children:Array.isArray(e.children)&&e.children.forEach(o=>{u(o,n)})),t.appendChild(n),n}const O=document.body,B=document.head;u({tag:"style",props:{},children:`.box {
    position: fixed;
    background-color: #badc58;
    opacity: .4;
    width: 100px;
    height: 100px;
    transition: all 0.05s linear;
    pointer-events: none;
    z-index: 9999;
}

.point {
    position: fixed;
    pointer-events: none;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
    background-color: #badc58;
    z-index: 9999;
}

.plane {
    position: fixed;
    right: 20px;
    top: 20px;
    pointer-events: none;
    display: inline-block;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    backdrop-filter: blur(3px);
    z-index: 9999;
}`},B);const k=u({tag:"div",props:{class:"box"}},O),b=u({tag:"div",props:{class:"point"}},O),w=u({tag:"div",props:{class:"plane"},children:[{tag:"pre",props:{class:"pre"}}]},O);let h=null;const j=new Map,x=[];function Y(e){return!!(e&&e._isRef===!0)}function d(e){const t=Symbol();return{get value(){return _(t),e},set value(n){e!==n&&(e=n,C(t))},_isRef:!0}}function L(e){return Y(e)?e.value:e}function _(e){if(!h)return;let t=j.get(e);t||j.set(e,t=new Set),t.add(h),h.deps.push(t)}function C(e){const t=j.get(e);if(!t)return;const n=new Set;t&&t.forEach(o=>{o!==h&&n.add(o)}),n.forEach(o=>{var i;return o((i=o.fn)==null?void 0:i.call(o))})}function R(e){for(let t=0;t<e.deps;t++)e.deps[t].delete(e)}function S(e,t,n={}){const{immediate:o=!0}=n;function i(){R(t),h=t,x.push(t),e(),x.pop(),h=x[x.length-1]}return o&&t(),t.deps=[],t.fn=e,i(),()=>R(t)}function m(e){return L(e)}function P(e,t,n={}){const o=Boolean(window&&"ResizeObserver"in window);let i;const s=()=>{i&&(i.disconnect(),i=void 0)},r=S(()=>m(e),p=>{s(),o&&window&&p&&(i=new ResizeObserver(t),i.observe(p,n))},{immediate:!0});return{isSupported:o,stop:()=>{s(),r()}}}function X(e){const t=d(0),n=d(0),o=d(0),i=d(0),s=d(0),r=d(0),c=d(0),p=d(0);function y(){const v=m(e);if(!v){t.value=0,r.value=0,o.value=0,i.value=0,s.value=0,n.value=0,c.value=0,p.value=0;return}const l=v.getBoundingClientRect();t.value=l.height,r.value=l.bottom,o.value=l.left,i.value=l.right,s.value=l.top,n.value=l.width,c.value=l.x,p.value=l.y}return window.addEventListener("scroll",y,!0),P(e,y),S(()=>m(e),()=>{y()}),{height:t,bottom:r,top:s,left:o,right:i,width:n,x:c,y:p,updateSize:y}}function H(e,t={}){const n=d(!1),o=()=>{!n.value||(e(),window.requestAnimationFrame(o))},i=()=>{n.value||(n.value=!0,o())},s=()=>n.value=!1;return t.immediate&&i(),{isActive:n,pause:s,resume:i}}function M(e){const t=d(null),{x:n,y:o}=e,i=H(()=>{const s=document.elementFromPoint(L(n),L(o));if(s){if(["BODY","HTML"].includes(s.nodeName))return;t.value=s}},{immediate:!0});return T({element:t},i)}function N(e){const t=m(e);let n=document.styleSheets;const o={},i=window.getComputedStyle(t);for(let r in n){let c=n[r].cssRules;for(let p in c){let y=c[p],v=y.style;if(t.matches(y.selectorText))for(let l=0;l<v.length;l++)o[v[l]]=i.getPropertyValue(v[l])}}const s=t==null?void 0:t.getAttribute("style");if(s){const r=s.split(";");for(let c=0;c<r.length;c++){const[p,y]=r[c].split(":");p&&y&&(o[p.trim()]=y.trim())}}return o}function D(e={}){const{initialValue:t={x:0,y:0},type:n="page",touch:o=!0,resetOnTouochEnd:i=!0}=e,s=d(0),r=d(0),c=d(null),p=l=>{n==="page"?(s.value=l.pageX,r.value=l.pageY):n==="client"&&(s.value=l.clientX,r.value=l.clientY),c.value="mouse"},y=()=>{r.value=t.x,s.value=t.y},v=l=>{if(l.touches.length>0){const E=l.touches[0];n==="page"?(s.value=E.pageX,r.value=E.pageY):n==="client"&&(s.value=E.clientX,r.value=E.clientY),c.value="touch"}};return window&&(window.addEventListener("mousemove",p,{passive:!0}),window.addEventListener("dragover",p,{passive:!0}),o&&(window.addEventListener("touchstart",v,{passive:!0}),window.addEventListener("touchmove",v,{passive:!0}),i&&window.addEventListener("touchend",y,{passive:!0}))),{x:s,y:r,sourceType:c}}let g="";document.addEventListener("mouseleave",()=>{w.style.display="none",b.style.display="none",a(k,{display:"none"})}),document.addEventListener("mouseenter",()=>{b.style.display="block"});const $={start({copy:e=!0}={}){const{x:t,y:n}=D({type:"client"}),{element:o}=M({x:t,y:n}),i=X(o);e&&$.copy(),S(()=>[t.value,n.value],()=>{b.style.left=`${t.value-2}px`,b.style.top=`${n.value-2}px`}),S(()=>m(o),s=>{if(s){a(k,{display:"block",left:`${i.left.value}px`,top:`${i.top.value}px`,width:`${i.width.value}px`,height:`${i.height.value}px`});const r=N(s);g=JSON.stringify(r,null,2),w.style.display="block",w.children[0].innerText=g}else w.style.display="none",a(k,{display:"none"})})},copy(){window.addEventListener("keydown",async e=>{if(e.ctrlKey&&e.shiftKey&&e.key==="c"&&g&&g!=="{}")try{await navigator.clipboard.writeText(J(JSON.parse(g))),alert("\u{1F197}")}catch(t){console.log(t)}})}};function J(e){let t=`{
`;return Object.entries(e).map(([n,o])=>{t+=`    ${n}: ${o};
`}),t+"}"}var G="";$.start()});
