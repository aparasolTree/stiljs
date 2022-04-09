var I=Object.defineProperty;var B=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var W=(y,p,a)=>p in y?I(y,p,{enumerable:!0,configurable:!0,writable:!0,value:a}):y[p]=a,Y=(y,p)=>{for(var a in p||(p={}))K.call(p,a)&&W(y,a,p[a]);if(B)for(var a of B(p))Q.call(p,a)&&W(y,a,p[a]);return y};(function(){"use strict";function y(t,e){const n=t.style;for(const[o,i]of Object.entries(e))i&&n.setProperty(o,String(i));return t}const p=t=>Object.prototype.toString.call(t)==="[object Object]";function a(t,e){const n=document.createElement(t.tag);for(let[o,i]of Object.entries(t.props))i&&(p(i)&&(i=Object.entries(i).map(s=>s.join(":")).join(";")),n.setAttribute(o,i));return t.children&&(typeof t.children=="string"?n.textContent=t.children:Array.isArray(t.children)&&t.children.forEach(o=>{a(o,n)})),e.appendChild(n),n}const L=document.body,_=document.head;a({tag:"style",props:{},children:`.box {
    position: fixed;
    background-color: #badc58;
    opacity: .4;
    width: 100px;
    height: 100px;
    transition: all 0.05s linear;
    pointer-events: none;
    z-index: 9999;
    display: none;
}

.plane {
    position: fixed;
    right: 20px;
    top: 20px;
    pointer-events: none;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    backdrop-filter: blur(3px);
    z-index: 9999;
    display: none;
}

.pre {
    max-width: 80vw;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}`},_);const S=a({tag:"div",props:{class:"box"}},L),b=a({tag:"div",props:{class:"plane"},children:[{tag:"pre",props:{class:"pre"}}]},L);let m=null;const E=new Map,x=[];function P(t){return!!(t&&t._isRef===!0)}function d(t){const e=Symbol();return{get value(){return X(e),t},set value(n){t!==n&&(t=n,H(e))},_isRef:!0}}function k(t){return P(t)?t.value:t}function X(t){if(!m)return;let e=E.get(t);e||E.set(t,e=new Set),e.add(m),m.deps.push(e)}function H(t){const e=E.get(t);if(!e)return;const n=new Set;e&&e.forEach(o=>{o!==m&&n.add(o)}),n.forEach(o=>{var i;return o((i=o.fn)==null?void 0:i.call(o))})}function j(t){for(let e=0;e<t.deps;e++)t.deps[e].delete(t)}function O(t,e,n={}){const{immediate:o=!0}=n;function i(){j(e),m=e,x.push(e),t(),x.pop(),m=x[x.length-1]}return o&&e(),e.deps=[],e.fn=t,i(),()=>j(e)}function g(t){return k(t)}function M(t,e,n={}){const o=Boolean(window&&"ResizeObserver"in window);let i;const s=()=>{i&&(i.disconnect(),i=void 0)},l=O(()=>g(t),c=>{s(),o&&window&&c&&(i=new ResizeObserver(e),i.observe(c,n))},{immediate:!0});return{isSupported:o,stop:()=>{s(),l()}}}function N(t){const e=d(0),n=d(0),o=d(0),i=d(0),s=d(0),l=d(0),u=d(0),c=d(0);function f(){const h=g(t);if(!h){e.value=0,l.value=0,o.value=0,i.value=0,s.value=0,n.value=0,u.value=0,c.value=0;return}const r=h.getBoundingClientRect();e.value=r.height,l.value=r.bottom,o.value=r.left,i.value=r.right,s.value=r.top,n.value=r.width,u.value=r.x,c.value=r.y}return window.addEventListener("scroll",f,!0),M(t,f),O(()=>g(t),()=>{f()}),{height:e,bottom:l,top:s,left:o,right:i,width:n,x:u,y:c,updateSize:f}}function q(t,e={}){const n=d(!1),o=()=>{!n.value||(t(),window.requestAnimationFrame(o))},i=()=>{n.value||(n.value=!0,o())},s=()=>n.value=!1;return e.immediate&&i(),{isActive:n,pause:s,resume:i}}function D(t){const e=d(null),{x:n,y:o}=t,i=q(()=>{const s=document.elementFromPoint(k(n),k(o));if(s){if(["BODY","HTML"].includes(s.nodeName))return;e.value=s}},{immediate:!1});return Y({element:e},i)}const A={left:!0,top:!0,right:!0,bottom:!0};function J(t){const e=g(t);let n=document.styleSheets;const o={},i=window.getComputedStyle(e);for(let l in n){let u=n[l].cssRules;for(let c in u){let f=u[c],h=f.style;if(e.matches(f.selectorText))for(let r=0;r<h.length;r++){if(h[r].startsWith("--"))continue;let v=i.getPropertyValue(h[r]);if(h[r].startsWith("border")){const T=h[r].match(/-([a-z]+)-/);if(T){let $=T[1];if(parseFloat(v)==0&&(A[$]=!1),!A[$])continue}}v.endsWith("px")&&parseFloat(v)==0||(o[h[r]]=v)}}}const s=e==null?void 0:e.getAttribute("style");if(s){const l=s.split(";");for(let u=0;u<l.length;u++){const[c,f]=l[u].split(":");c&&f&&(o[c.trim()]=f.trim())}}return o}function V(t={}){const{initialValue:e={x:0,y:0},type:n="page",touch:o=!0,resetOnTouochEnd:i=!0}=t,s=d(0),l=d(0),u=d(null),c=r=>{n==="page"?(s.value=r.pageX,l.value=r.pageY):n==="client"&&(s.value=r.clientX,l.value=r.clientY),u.value="mouse"},f=()=>{l.value=e.x,s.value=e.y},h=r=>{if(r.touches.length>0){const v=r.touches[0];n==="page"?(s.value=v.pageX,l.value=v.pageY):n==="client"&&(s.value=v.clientX,l.value=v.clientY),u.value="touch"}};return window&&(window.addEventListener("mousemove",c,{passive:!0}),window.addEventListener("dragover",c,{passive:!0}),o&&(window.addEventListener("touchstart",h,{passive:!0}),window.addEventListener("touchmove",h,{passive:!0}),i&&window.addEventListener("touchend",f,{passive:!0}))),{x:s,y:l,sourceType:u}}const R=function(){const e=[],n=document.querySelectorAll("link");for(let o=0;o<n.length;o++){let i=n[o];i.getAttribute("rel")==="stylesheet"&&e.push({prev:i.previousElementSibling,el:i,href:i.getAttribute("href")})}return e}();console.log(R);async function z(t,e){const n=t.pop();if(!n)return e&&e();const o=await fetch(n.href).then(s=>s.text()),i=document.createElement("style");i.setAttribute("typs","text/css"),i.textContent=o,document.head.appendChild(i),n.el.remove(),t.length===0?e&&e():z(t,e)}let w="";document.addEventListener("mouseleave",()=>{b.style.display="none",y(S,{display:"none"})});const C={start({copy:t=!0}={}){z(R,()=>{const{x:e,y:n}=V({type:"client"}),{element:o,pause:i,resume:s}=D({x:e,y:n}),l=N(o);document.addEventListener("keydown",u=>{u.key==="a"&&s()}),document.addEventListener("keyup",u=>{u.key==="a"&&(i(),o.value=null)}),t&&C.copy(),O(()=>g(o),u=>{if(u){y(S,{display:"block",left:`${l.left.value}px`,top:`${l.top.value}px`,width:`${l.width.value}px`,height:`${l.height.value}px`});const c=J(u);w=JSON.stringify(c,null,2),b.style.display="block",b.children[0].innerText=w}else b.style.display="none",y(S,{display:"none"})})})},copy(){window.addEventListener("keydown",async t=>{if(t.key==="c"&&w&&w!=="{}")try{await navigator.clipboard.writeText(G(JSON.parse(w))),alert("\u{1F197}")}catch(e){console.log(e)}})}};function G(t){let e=`{
`;return Object.entries(t).map(([n,o])=>{e+=`    ${n}: ${o};
`}),e+"}"}C.start()})();
