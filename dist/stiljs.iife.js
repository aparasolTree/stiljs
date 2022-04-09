var I=Object.defineProperty;var $=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var B=(v,d,a)=>d in v?I(v,d,{enumerable:!0,configurable:!0,writable:!0,value:a}):v[d]=a,W=(v,d)=>{for(var a in d||(d={}))K.call(d,a)&&B(v,a,d[a]);if($)for(var a of $(d))Q.call(d,a)&&B(v,a,d[a]);return v};(function(){"use strict";const v=function(){const e=[],n=document.querySelectorAll("link");for(let i=0;i<n.length;i++){let o=n[i];o.getAttribute("rel")==="stylesheet"&&e.push({prev:o.previousElementSibling,el:o,href:o.getAttribute("href")})}return e}();async function d(t,e){const n=t.pop();if(!n)return e&&e();const i=await fetch(n.href).then(s=>s.text()),o=document.createElement("style");o.setAttribute("typs","text/css"),o.textContent=i,document.head.appendChild(o),n.el.remove(),t.length===0?e&&e():d(t,e)}function a(t,e){const n=t.style;for(const[i,o]of Object.entries(e))o&&n.setProperty(i,String(o));return t}const Y=t=>Object.prototype.toString.call(t)==="[object Object]";function b(t,e){const n=document.createElement(t.tag);for(let[i,o]of Object.entries(t.props))o&&(Y(o)&&(o=Object.entries(o).map(s=>s.join(":")).join(";")),n.setAttribute(i,o));return t.children&&(typeof t.children=="string"?n.textContent=t.children:Array.isArray(t.children)&&t.children.forEach(i=>{b(i,n)})),e.appendChild(n),n}const j=document.body,_=document.head;b({tag:"style",props:{},children:`.box {
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
}`},_);const E=b({tag:"div",props:{class:"box"}},j),x=b({tag:"div",props:{class:"plane"},children:[{tag:"pre",props:{class:"pre"}}]},j);let m=null;const k=new Map,S=[];function P(t){return!!(t&&t._isRef===!0)}function p(t){const e=Symbol();return{get value(){return X(e),t},set value(n){t!==n&&(t=n,H(e))},_isRef:!0}}function O(t){return P(t)?t.value:t}function X(t){if(!m)return;let e=k.get(t);e||k.set(t,e=new Set),e.add(m),m.deps.push(e)}function H(t){const e=k.get(t);if(!e)return;const n=new Set;e&&e.forEach(i=>{i!==m&&n.add(i)}),n.forEach(i=>{var o;return i((o=i.fn)==null?void 0:o.call(i))})}function A(t){for(let e=0;e<t.deps;e++)t.deps[e].delete(t)}function L(t,e,n={}){const{immediate:i=!0}=n;function o(){A(e),m=e,S.push(e),t(),S.pop(),m=S[S.length-1]}return i&&e(),e.deps=[],e.fn=t,o(),()=>A(e)}function g(t){return O(t)}function M(t,e,n={}){const i=Boolean(window&&"ResizeObserver"in window);let o;const s=()=>{o&&(o.disconnect(),o=void 0)},l=L(()=>g(t),c=>{s(),i&&window&&c&&(o=new ResizeObserver(e),o.observe(c,n))},{immediate:!0});return{isSupported:i,stop:()=>{s(),l()}}}function N(t){const e=p(0),n=p(0),i=p(0),o=p(0),s=p(0),l=p(0),u=p(0),c=p(0);function f(){const h=g(t);if(!h){e.value=0,l.value=0,i.value=0,o.value=0,s.value=0,n.value=0,u.value=0,c.value=0;return}const r=h.getBoundingClientRect();e.value=r.height,l.value=r.bottom,i.value=r.left,o.value=r.right,s.value=r.top,n.value=r.width,u.value=r.x,c.value=r.y}return window.addEventListener("scroll",f,!0),M(t,f),L(()=>g(t),()=>{f()}),{height:e,bottom:l,top:s,left:i,right:o,width:n,x:u,y:c,updateSize:f}}function q(t,e={}){const n=p(!1),i=()=>{!n.value||(t(),window.requestAnimationFrame(i))},o=()=>{n.value||(n.value=!0,i())},s=()=>n.value=!1;return e.immediate&&o(),{isActive:n,pause:s,resume:o}}function D(t){const e=p(null),{x:n,y:i}=t,o=q(()=>{const s=document.elementFromPoint(O(n),O(i));if(s){if(["BODY","HTML"].includes(s.nodeName))return;e.value=s}},{immediate:!1});return W({element:e},o)}const R={left:!0,top:!0,right:!0,bottom:!0};function J(t){const e=g(t);let n=document.styleSheets;const i={},o=window.getComputedStyle(e);for(let l in n){let u=n[l].cssRules;for(let c in u){let f=u[c],h=f.style;if(e.matches(f.selectorText))for(let r=0;r<h.length;r++){if(h[r].startsWith("--"))continue;let y=o.getPropertyValue(h[r]);if(h[r].startsWith("border")){const C=h[r].match(/-([a-z]+)-/);if(C){let T=C[1];if(parseFloat(y)==0&&(R[T]=!1),!R[T])continue}}y.endsWith("px")&&parseFloat(y)==0||(i[h[r]]=y)}}}const s=e==null?void 0:e.getAttribute("style");if(s){const l=s.split(";");for(let u=0;u<l.length;u++){const[c,f]=l[u].split(":");c&&f&&(i[c.trim()]=f.trim())}}return i}function V(t={}){const{initialValue:e={x:0,y:0},type:n="page",touch:i=!0,resetOnTouochEnd:o=!0}=t,s=p(0),l=p(0),u=p(null),c=r=>{n==="page"?(s.value=r.pageX,l.value=r.pageY):n==="client"&&(s.value=r.clientX,l.value=r.clientY),u.value="mouse"},f=()=>{l.value=e.x,s.value=e.y},h=r=>{if(r.touches.length>0){const y=r.touches[0];n==="page"?(s.value=y.pageX,l.value=y.pageY):n==="client"&&(s.value=y.clientX,l.value=y.clientY),u.value="touch"}};return window&&(window.addEventListener("mousemove",c,{passive:!0}),window.addEventListener("dragover",c,{passive:!0}),i&&(window.addEventListener("touchstart",h,{passive:!0}),window.addEventListener("touchmove",h,{passive:!0}),o&&window.addEventListener("touchend",f,{passive:!0}))),{x:s,y:l,sourceType:u}}let w="";document.addEventListener("mouseleave",()=>{x.style.display="none",a(E,{display:"none"})});const z={start({copy:t=!0}={}){d(v,()=>{const{x:e,y:n}=V({type:"client"}),{element:i,pause:o,resume:s}=D({x:e,y:n}),l=N(i);document.addEventListener("keydown",u=>{u.key==="a"&&s()}),document.addEventListener("keyup",u=>{u.key==="a"&&(o(),i.value=null)}),t&&z.copy(),L(()=>g(i),u=>{if(u){a(E,{display:"block",left:`${l.left.value}px`,top:`${l.top.value}px`,width:`${l.width.value}px`,height:`${l.height.value}px`});const c=J(u);w=JSON.stringify(c,null,2),x.style.display="block",x.children[0].innerText=w}else x.style.display="none",a(E,{display:"none"})})})},copy(){window.addEventListener("keydown",async t=>{if(t.key==="c"&&w&&w!=="{}")try{await navigator.clipboard.writeText(G(JSON.parse(w))),alert("\u{1F197}")}catch(e){console.log(e)}})}};function G(t){let e=`{
`;return Object.entries(t).map(([n,i])=>{e+=`    ${n}: ${i};
`}),e+"}"}z.start()})();
