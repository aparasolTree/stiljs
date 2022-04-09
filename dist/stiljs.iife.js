var G=Object.defineProperty;var $=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var F=(y,p,c)=>p in y?G(y,p,{enumerable:!0,configurable:!0,writable:!0,value:c}):y[p]=c,W=(y,p)=>{for(var c in p||(p={}))K.call(p,c)&&F(y,c,p[c]);if($)for(var c of $(p))Q.call(p,c)&&F(y,c,p[c]);return y};(function(){"use strict";const y=function(){const t=[],n=document.querySelectorAll("link");for(let o=0;o<n.length;o++){let s=n[o];s.getAttribute("rel")==="stylesheet"&&t.push({prev:s.previousElementSibling,el:s,href:s.getAttribute("href")})}return t}();async function p(e,t){const n=e.pop();if(!n)return t&&t();const o=await fetch(n.href).then(i=>i.text()),s=document.createElement("style");s.setAttribute("typs","text/css"),s.textContent=o,document.head.appendChild(s),n.el.remove(),e.length===0?t&&t():p(e,t)}function c(e,t){const n=e.style;for(const[o,s]of Object.entries(t))s&&n.setProperty(o,String(s));return e}const X=e=>Object.prototype.toString.call(e)==="[object Object]";function g(e,t){const n=document.createElement(e.tag);for(let[o,s]of Object.entries(e.props))s&&(X(s)&&(s=Object.entries(s).map(i=>i.join(":")).join(";")),n.setAttribute(o,s));return e.children&&(typeof e.children=="string"?n.textContent=e.children:Array.isArray(e.children)&&e.children.forEach(o=>{g(o,n)})),t.appendChild(n),n}const k=document.body,Y=document.head;g({tag:"style",props:{},children:`.box {
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
    max-width: 80vw;
}

.pre {
    overflow: hidden;
    text-overflow: ellipsis;
}

.tips {
    position: fixed;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: #f1f5f8;
    color: #333;
    border-radius: 6px;
    z-index: 999;
    transition: all 0.5s ease-in-out;
}`},Y);const O=g({tag:"div",props:{class:"box"}},k),S=g({tag:"div",props:{class:"plane"},children:[{tag:"pre",props:{class:"pre"}}]},k),w=g({tag:"div",props:{class:"tips"}},k);let m=null;const L=new Map,E=[];function _(e){return!!(e&&e._isRef===!0)}function d(e){const t=Symbol();return{get value(){return P(t),e},set value(n){e!==n&&(e=n,H(t))},_isRef:!0}}function j(e){return _(e)?e.value:e}function P(e){if(!m)return;let t=L.get(e);t||L.set(e,t=new Set),t.add(m),m.deps.push(t)}function H(e){const t=L.get(e);if(!t)return;const n=new Set;t&&t.forEach(o=>{o!==m&&n.add(o)}),n.forEach(o=>{var s;return o((s=o.fn)==null?void 0:s.call(o))})}function R(e){for(let t=0;t<e.deps;t++)e.deps[t].delete(e)}function A(e,t,n={}){const{immediate:o=!0}=n;function s(){R(t),m=t,E.push(t),e(),E.pop(),m=E[E.length-1]}return o&&t(),t.deps=[],t.fn=e,s(),()=>R(t)}function x(e){return j(e)}function M(e,t,n={}){const o=Boolean(window&&"ResizeObserver"in window);let s;const i=()=>{s&&(s.disconnect(),s=void 0)},l=A(()=>x(e),a=>{i(),o&&window&&a&&(s=new ResizeObserver(t),s.observe(a,n))},{immediate:!0});return{isSupported:o,stop:()=>{i(),l()}}}function N(e){const t=d(0),n=d(0),o=d(0),s=d(0),i=d(0),l=d(0),u=d(0),a=d(0);function f(){const h=x(e);if(!h){t.value=0,l.value=0,o.value=0,s.value=0,i.value=0,n.value=0,u.value=0,a.value=0;return}const r=h.getBoundingClientRect();t.value=r.height,l.value=r.bottom,o.value=r.left,s.value=r.right,i.value=r.top,n.value=r.width,u.value=r.x,a.value=r.y}return window.addEventListener("scroll",f,!0),M(e,f),A(()=>x(e),()=>{f()}),{height:t,bottom:l,top:i,left:o,right:s,width:n,x:u,y:a,updateSize:f}}function q(e,t={}){const n=d(!1),o=()=>{!n.value||(e(),window.requestAnimationFrame(o))},s=()=>{n.value||(n.value=!0,o())},i=()=>n.value=!1;return t.immediate&&s(),{isActive:n,pause:i,resume:s}}function D(e){const t=d(null),{x:n,y:o}=e,s=q(()=>{const i=document.elementFromPoint(j(n),j(o));if(i){if(["BODY","HTML"].includes(i.nodeName))return;t.value=i}},{immediate:!1});return W({element:t},s)}const z={left:!0,top:!0,right:!0,bottom:!0};function J(e){const t=x(e);let n=document.styleSheets;const o={},s=window.getComputedStyle(t);for(let l in n){let u=n[l].cssRules;for(let a in u){let f=u[a],h=f.style;if(t.matches(f.selectorText))for(let r=0;r<h.length;r++){if(h[r].startsWith("--"))continue;let v=s.getPropertyValue(h[r]);if(h[r].startsWith("border")){const B=h[r].match(/-([a-z]+)-/);if(B){let T=B[1];if(parseFloat(v)==0&&(z[T]=!1),!z[T])continue}}v.endsWith("px")&&parseFloat(v)==0||(o[h[r]]=v)}}}const i=t==null?void 0:t.getAttribute("style");if(i){const l=i.split(";");for(let u=0;u<l.length;u++){const[a,f]=l[u].split(":");a&&f&&(o[a.trim()]=f.trim())}}return o}function V(e={}){const{initialValue:t={x:0,y:0},type:n="page",touch:o=!0,resetOnTouochEnd:s=!0}=e,i=d(0),l=d(0),u=d(null),a=r=>{n==="page"?(i.value=r.pageX,l.value=r.pageY):n==="client"&&(i.value=r.clientX,l.value=r.clientY),u.value="mouse"},f=()=>{l.value=t.x,i.value=t.y},h=r=>{if(r.touches.length>0){const v=r.touches[0];n==="page"?(i.value=v.pageX,l.value=v.pageY):n==="client"&&(i.value=v.clientX,l.value=v.clientY),u.value="touch"}};return window&&(window.addEventListener("mousemove",a,{passive:!0}),window.addEventListener("dragover",a,{passive:!0}),o&&(window.addEventListener("touchstart",h,{passive:!0}),window.addEventListener("touchmove",h,{passive:!0}),s&&window.addEventListener("touchend",f,{passive:!0}))),{x:i,y:l,sourceType:u}}let b="";document.addEventListener("mouseleave",()=>{S.style.display="none",c(O,{display:"none"})});const C={start({copy:e=!0}={}){p(y,()=>{const{x:t,y:n}=V({type:"client"}),{element:o,pause:s,resume:i}=D({x:t,y:n}),l=N(o);document.addEventListener("keydown",u=>{u.key==="a"&&i()}),document.addEventListener("keyup",u=>{u.key==="a"&&(s(),o.value=null)}),e&&C.copy(),A(()=>x(o),u=>{if(u){c(O,{display:"block",left:`${l.left.value}px`,top:`${l.top.value}px`,width:`${l.width.value}px`,height:`${l.height.value}px`});const a=J(u);b=JSON.stringify(a,null,2),S.style.display="block",S.children[0].innerText=b}else S.style.display="none",c(O,{display:"none"})})})},copy(){window.addEventListener("keydown",async e=>{if(e.key==="c"&&b&&b!=="{}")try{await navigator.clipboard.writeText(I(JSON.parse(b))),w.textContent="copy success!!! \u{1F604}",w.style.top="20px"}catch{w.textContent="copy error!!! (\u3002\u30FB\uFF3F\u30FB\u3002)\uFF89I\u2019m sorry~",w.style.top="20px"}finally{setTimeout(()=>{w.style.top="-100%"},2e3)}})}};function I(e){let t=`{
`;return Object.entries(e).map(([n,o])=>{t+=`    ${n}: ${o};
`}),t+"}"}C.start()})();
