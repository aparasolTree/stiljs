/*!
 * Stil.js v1.0.0
 * Copyright (c) 2022 aparasolTree(Xu Le)
 * Released under the MIT License.
*/
var Z=Object.defineProperty;var $=Object.getOwnPropertySymbols;var ee=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;var H=(g,p,u)=>p in g?Z(g,p,{enumerable:!0,configurable:!0,writable:!0,value:u}):g[p]=u,N=(g,p)=>{for(var u in p||(p={}))ee.call(p,u)&&H(g,u,p[u]);if($)for(var u of $(p))te.call(p,u)&&H(g,u,p[u]);return g};(function(){"use strict";const g=function(){const t=[],n=document.querySelectorAll("link");for(let o=0;o<n.length;o++){let s=n[o];s.getAttribute("rel")==="stylesheet"&&t.push({prev:s.previousElementSibling,el:s,href:s.getAttribute("href")})}return t}();async function p(e,t){const n=e.pop();if(!n)return t&&t();const o=await fetch(n.href).then(i=>i.text()),s=document.createElement("style");s.setAttribute("typs","text/css"),s.textContent=o,document.head.appendChild(s),n.el.remove(),e.length===0?t&&t():p(e,t)}function u(e,t){const n=e.style;for(const[o,s]of Object.entries(t))s&&n.setProperty(o,String(s));return e}const P=e=>Object.prototype.toString.call(e)==="[object Object]";function w(e,t){const n=document.createElement(e.tag);for(let[o,s]of Object.entries(e.props))s&&(P(s)&&(s=Object.entries(s).map(i=>i.join(":")).join(";")),n.setAttribute(o,s));return e.children&&(typeof e.children=="string"?n.textContent=e.children:Array.isArray(e.children)&&e.children.forEach(o=>{w(o,n)})),t.appendChild(n),n}const j=document.body,X=document.head;w({tag:"style",props:{},children:`.stiljs-box {
    position: fixed;
    background-color: #badc58;
    opacity: .4;
    width: 100px;
    height: 100px;
    transition: all 0.05s linear;
    pointer-events: none;
    z-index: 999999;
    display: none;
}

.stiljs-plane {
    position: fixed;
    right: 20px;
    top: 20px;
    pointer-events: none;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    backdrop-filter: blur(3px);
    z-index: 999999;
    display: none;
    max-width: 80vw;
    max-height: 80vh;
    overflow: auto
}

.stiljs-plane::-webkit-scrollbar {
    width:4px;
    height: 4px;
    background-color:#F5F5F5;
}

.stiljs-plane::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius:10px;
    background-color:#f1f5f8;
}

.stiljs-plane::-webkit-scrollbar-thumb {
    border-radius:10px;
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.1);
    background-color:#ccc;
}

.stiljs-pre {
    font-weight: 700;
    font-size: 12px;
    pointer-events: none;
}

.stiljs-tips {
    position: fixed;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: #f1f5f8;
    color: #333;
    border-radius: 6px;
    z-index: 999999;
    transition: all 0.5s ease-in-out;
    pointer-events: none;
}

.stiljs-tag-name {
    font-weight: 700;
    text-align: center;
    font-size: 16px;
    pointer-events: none;
}`},X);const E=w({tag:"div",props:{class:"stiljs-box"}},j),d=w({tag:"div",props:{class:"stiljs-plane"},children:[{tag:"div",props:{class:"stiljs-tag-name"}},{tag:"pre",props:{class:"stiljs-pre"}}]},j),L=d.querySelector(".stiljs-pre"),_=d.querySelector(".stiljs-tag-name"),O=w({tag:"div",props:{class:"stiljs-tips"}},j);function A(e,t){O.textContent=e,O.style.top="20px",setTimeout(()=>{O.style.top="-100%"},t)}let m=null;const z=new Map,S=[];function q(e){return!!(e&&e._isRef===!0)}function f(e){const t=Symbol();return{get value(){return D(t),e},set value(n){e!==n&&(e=n,M(t))},_isRef:!0}}function C(e){return q(e)?e.value:e}function D(e){if(!m)return;let t=z.get(e);t||z.set(e,t=new Set),t.add(m),m.deps.push(t)}function M(e){const t=z.get(e);if(!t)return;const n=new Set;t&&t.forEach(o=>{o!==m&&n.add(o)}),n.forEach(o=>{var s;return o((s=o.fn)==null?void 0:s.call(o))})}function F(e){for(let t=0;t<e.deps;t++)e.deps[t].delete(e)}function T(e,t,n={}){const{immediate:o=!0}=n;function s(){F(t),m=t,S.push(t),e(),S.pop(),m=S[S.length-1]}return o&&t(),t.deps=[],t.fn=e,s(),()=>F(t)}function x(e){return C(e)}function J(e,t,n={}){const o=Boolean(window&&"ResizeObserver"in window);let s;const i=()=>{s&&(s.disconnect(),s=void 0)},a=T(()=>x(e),c=>{i(),o&&window&&c&&(s=new ResizeObserver(t),s.observe(c,n))},{immediate:!0});return{isSupported:o,stop:()=>{i(),a()}}}function V(e){const t=f(0),n=f(0),o=f(0),s=f(0),i=f(0),a=f(0),r=f(0),c=f(0);function y(){const v=x(e);if(!v){t.value=0,a.value=0,o.value=0,s.value=0,i.value=0,n.value=0,r.value=0,c.value=0;return}const l=v.getBoundingClientRect();t.value=l.height,a.value=l.bottom,o.value=l.left,s.value=l.right,i.value=l.top,n.value=l.width,r.value=l.x,c.value=l.y}return window.addEventListener("scroll",y,!0),J(e,y),T(()=>x(e),()=>{y()}),{height:t,bottom:a,top:i,left:o,right:s,width:n,x:r,y:c,updateSize:y}}function I(e,t={}){const n=f(!1),o=()=>{!n.value||(e(),window.requestAnimationFrame(o))},s=()=>{n.value||(n.value=!0,o())},i=()=>n.value=!1;return t.immediate&&s(),{isActive:n,pause:i,resume:s}}function K(e){const t=f(null),{x:n,y:o}=e,s=I(()=>{const i=document.elementFromPoint(C(n),C(o));if(i){if(["BODY","HTML"].includes(i.nodeName))return;t.value=i}},{immediate:!1});return N({element:t},s)}function G(e){let t={left:!0,top:!0,right:!0,bottom:!0};const n=x(e);let o=document.styleSheets;const s={},i=window.getComputedStyle(n);for(let r in o){let c=o[r].cssRules;for(let y in c){let v=c[y],l=v.style;if(n.matches(v.selectorText))for(let h=0;h<l.length;h++){if(l[h].startsWith("--"))continue;let k=i.getPropertyValue(l[h]);if(l[h].startsWith("border")){const B=l[h].match(/-([a-z]+)-/);if(B){let Y=B[1];if(parseFloat(k)==0&&(t[Y]=!1),!t[Y])continue}}k.endsWith("px")&&parseFloat(k)==0||(s[l[h]]=k)}}}const a=n==null?void 0:n.getAttribute("style");if(a){const r=a.split(";");for(let c=0;c<r.length;c++){const[y,v]=r[c].split(":");y&&v&&(s[y.trim()]=v.trim())}}return s}function Q(e={}){const{initialValue:t={x:0,y:0},type:n="page",touch:o=!0,resetOnTouochEnd:s=!0}=e,i=f(0),a=f(0),r=f(null),c=l=>{n==="page"?(i.value=l.pageX,a.value=l.pageY):n==="client"&&(i.value=l.clientX,a.value=l.clientY),r.value="mouse"},y=()=>{a.value=t.x,i.value=t.y},v=l=>{if(l.touches.length>0){const h=l.touches[0];n==="page"?(i.value=h.pageX,a.value=h.pageY):n==="client"&&(i.value=h.clientX,a.value=h.clientY),r.value="touch"}};return window&&(window.addEventListener("mousemove",c,{passive:!0}),window.addEventListener("dragover",c,{passive:!0}),o&&(window.addEventListener("touchstart",v,{passive:!0}),window.addEventListener("touchmove",v,{passive:!0}),s&&window.addEventListener("touchend",y,{passive:!0}))),{x:i,y:a,sourceType:r}}const R=e=>{e.stopPropagation(),e.preventDefault(),(L.scrollHeight>d.clientHeight||L.scrollWidth>d.clientWidth)&&(e.ctrlKey?e.deltaY>0?d.scrollLeft+=20:d.scrollLeft-=20:e.deltaY>0?d.scrollTop+=20:d.scrollTop-=20)};function U(e){let t=`{
`;return Object.entries(e).map(([n,o])=>{t+=`    ${n}: ${o};
`}),t+"}"}let b="";document.addEventListener("mouseleave",()=>{d.style.display="none",u(E,{display:"none"})});const W={start({copy:e=!0}={}){p(g,()=>{A("sheetStyle loaded \u{1F604}",2e3);const{x:t,y:n}=Q({type:"client"}),{element:o,pause:s,resume:i}=K({x:t,y:n}),a=V(o);document.addEventListener("keydown",r=>{r.key==="a"&&(i(),window.addEventListener("wheel",R,{passive:!1}))}),document.addEventListener("keyup",r=>{r.key==="a"&&(window.removeEventListener("wheel",R),s(),o.value=null,b="")}),e&&W.copy(),T(()=>x(o),r=>{if(r){d.scrollTop=0,d.scrollLeft=0,u(E,{display:"block",left:`${a.left.value}px`,top:`${a.top.value}px`,width:`${a.width.value}px`,height:`${a.height.value}px`}),d.style.display="block",_.textContent=r.nodeName.toLocaleLowerCase();const c=G(r);b=JSON.stringify(c,null,2),L.textContent=b}else d.style.display="none",u(E,{display:"none"})})})},copy(){window.addEventListener("keydown",async e=>{if(e.key==="c"&&b&&b!=="{}")try{await navigator.clipboard.writeText(U(JSON.parse(b))),A("copy success!!! \u{1F604}",2e3)}catch{A("copy error!!! (\u3002\u30FB\uFF3F\u30FB\u3002)\uFF89I\u2019m sorry~",2e3)}})}};var se="";W.start()})();
