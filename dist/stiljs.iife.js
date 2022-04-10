/*!
 * Stil.js v1.0.0
 * Copyright (c) 2022 aparasolTree(Xu Le)
 * Released under the MIT License.
*/
var Q=Object.defineProperty;var $=Object.getOwnPropertySymbols;var U=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable;var F=(v,p,c)=>p in v?Q(v,p,{enumerable:!0,configurable:!0,writable:!0,value:c}):v[p]=c,N=(v,p)=>{for(var c in p||(p={}))U.call(p,c)&&F(v,c,p[c]);if($)for(var c of $(p))Z.call(p,c)&&F(v,c,p[c]);return v};(function(){"use strict";const v=function(){const t=[],n=document.querySelectorAll("link");for(let o=0;o<n.length;o++){let s=n[o];s.getAttribute("rel")==="stylesheet"&&t.push({prev:s.previousElementSibling,el:s,href:s.getAttribute("href")})}return t}();async function p(e,t){const n=e.pop();if(!n)return t&&t();const o=await fetch(n.href).then(i=>i.text()),s=document.createElement("style");s.setAttribute("typs","text/css"),s.textContent=o,document.head.appendChild(s),n.el.remove(),e.length===0?t&&t():p(e,t)}function c(e,t){const n=e.style;for(const[o,s]of Object.entries(t))s&&n.setProperty(o,String(s));return e}const W=e=>Object.prototype.toString.call(e)==="[object Object]";function x(e,t){const n=document.createElement(e.tag);for(let[o,s]of Object.entries(e.props))s&&(W(s)&&(s=Object.entries(s).map(i=>i.join(":")).join(";")),n.setAttribute(o,s));return e.children&&(typeof e.children=="string"?n.textContent=e.children:Array.isArray(e.children)&&e.children.forEach(o=>{x(o,n)})),t.appendChild(n),n}const k=document.body,X=document.head;x({tag:"style",props:{},children:`.stiljs-box {
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

.stiljs-plane {
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

.stiljs-pre {
    overflow: hidden;
    text-overflow: ellipsis;
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
    z-index: 999;
    transition: all 0.5s ease-in-out;
    pointer-events: none;
}

.stiljs-tag-name {
    font-weight: 700;
    text-align: center;
    font-size: 16px;
    pointer-events: none;
}`},X);const L=x({tag:"div",props:{class:"stiljs-box"}},k),w=x({tag:"div",props:{class:"stiljs-plane"},children:[{tag:"div",props:{class:"stiljs-tag-name"}},{tag:"pre",props:{class:"stiljs-pre"}}]},k),Y=w.querySelector(".stiljs-pre"),_=w.querySelector(".stiljs-tag-name"),b=x({tag:"div",props:{class:"stiljs-tips"}},k);let m=null;const O=new Map,j=[];function q(e){return!!(e&&e._isRef===!0)}function d(e){const t=Symbol();return{get value(){return P(t),e},set value(n){e!==n&&(e=n,H(t))},_isRef:!0}}function A(e){return q(e)?e.value:e}function P(e){if(!m)return;let t=O.get(e);t||O.set(e,t=new Set),t.add(m),m.deps.push(t)}function H(e){const t=O.get(e);if(!t)return;const n=new Set;t&&t.forEach(o=>{o!==m&&n.add(o)}),n.forEach(o=>{var s;return o((s=o.fn)==null?void 0:s.call(o))})}function z(e){for(let t=0;t<e.deps;t++)e.deps[t].delete(e)}function C(e,t,n={}){const{immediate:o=!0}=n;function s(){z(t),m=t,j.push(t),e(),j.pop(),m=j[j.length-1]}return o&&t(),t.deps=[],t.fn=e,s(),()=>z(t)}function S(e){return A(e)}function M(e,t,n={}){const o=Boolean(window&&"ResizeObserver"in window);let s;const i=()=>{s&&(s.disconnect(),s=void 0)},a=C(()=>S(e),u=>{i(),o&&window&&u&&(s=new ResizeObserver(t),s.observe(u,n))},{immediate:!0});return{isSupported:o,stop:()=>{i(),a()}}}function D(e){const t=d(0),n=d(0),o=d(0),s=d(0),i=d(0),a=d(0),l=d(0),u=d(0);function h(){const y=S(e);if(!y){t.value=0,a.value=0,o.value=0,s.value=0,i.value=0,n.value=0,l.value=0,u.value=0;return}const r=y.getBoundingClientRect();t.value=r.height,a.value=r.bottom,o.value=r.left,s.value=r.right,i.value=r.top,n.value=r.width,l.value=r.x,u.value=r.y}return window.addEventListener("scroll",h,!0),M(e,h),C(()=>S(e),()=>{h()}),{height:t,bottom:a,top:i,left:o,right:s,width:n,x:l,y:u,updateSize:h}}function J(e,t={}){const n=d(!1),o=()=>{!n.value||(e(),window.requestAnimationFrame(o))},s=()=>{n.value||(n.value=!0,o())},i=()=>n.value=!1;return t.immediate&&s(),{isActive:n,pause:i,resume:s}}function V(e){const t=d(null),{x:n,y:o}=e,s=J(()=>{const i=document.elementFromPoint(A(n),A(o));if(i){if(["BODY","HTML"].includes(i.nodeName))return;t.value=i}},{immediate:!1});return N({element:t},s)}function I(e){let t={left:!0,top:!0,right:!0,bottom:!0};const n=S(e);let o=document.styleSheets;const s={},i=window.getComputedStyle(n);for(let l in o){let u=o[l].cssRules;for(let h in u){let y=u[h],r=y.style;if(n.matches(y.selectorText))for(let f=0;f<r.length;f++){if(r[f].startsWith("--"))continue;let E=i.getPropertyValue(r[f]);if(r[f].startsWith("border")){const B=r[f].match(/-([a-z]+)-/);if(B){let T=B[1];if(parseFloat(E)==0&&(t[T]=!1),!t[T])continue}}E.endsWith("px")&&parseFloat(E)==0||(s[r[f]]=E)}}}const a=n==null?void 0:n.getAttribute("style");if(a){const l=a.split(";");for(let u=0;u<l.length;u++){const[h,y]=l[u].split(":");h&&y&&(s[h.trim()]=y.trim())}}return s}function G(e={}){const{initialValue:t={x:0,y:0},type:n="page",touch:o=!0,resetOnTouochEnd:s=!0}=e,i=d(0),a=d(0),l=d(null),u=r=>{n==="page"?(i.value=r.pageX,a.value=r.pageY):n==="client"&&(i.value=r.clientX,a.value=r.clientY),l.value="mouse"},h=()=>{a.value=t.x,i.value=t.y},y=r=>{if(r.touches.length>0){const f=r.touches[0];n==="page"?(i.value=f.pageX,a.value=f.pageY):n==="client"&&(i.value=f.clientX,a.value=f.clientY),l.value="touch"}};return window&&(window.addEventListener("mousemove",u,{passive:!0}),window.addEventListener("dragover",u,{passive:!0}),o&&(window.addEventListener("touchstart",y,{passive:!0}),window.addEventListener("touchmove",y,{passive:!0}),s&&window.addEventListener("touchend",h,{passive:!0}))),{x:i,y:a,sourceType:l}}let g="";document.addEventListener("mouseleave",()=>{w.style.display="none",c(L,{display:"none"})});const R={start({copy:e=!0}={}){p(v,()=>{const{x:t,y:n}=G({type:"client"}),{element:o,pause:s,resume:i}=V({x:t,y:n}),a=D(o);document.addEventListener("keydown",l=>{l.key==="a"&&i()}),document.addEventListener("keyup",l=>{l.key==="a"&&(s(),o.value=null,g="")}),e&&R.copy(),C(()=>S(o),l=>{if(l){c(L,{display:"block",left:`${a.left.value}px`,top:`${a.top.value}px`,width:`${a.width.value}px`,height:`${a.height.value}px`}),w.style.display="block",_.textContent=l.nodeName.toLocaleLowerCase();const u=I(l);g=JSON.stringify(u,null,2),Y.textContent=g}else w.style.display="none",c(L,{display:"none"})})})},copy(){window.addEventListener("keydown",async e=>{if(e.key==="c"&&g&&g!=="{}")try{await navigator.clipboard.writeText(K(JSON.parse(g))),b.textContent="copy success!!! \u{1F604}",b.style.top="20px"}catch{b.textContent="copy error!!! (\u3002\u30FB\uFF3F\u30FB\u3002)\uFF89I\u2019m sorry~",b.style.top="20px"}finally{setTimeout(()=>{b.style.top="-100%"},2e3)}})}};function K(e){let t=`{
`;return Object.entries(e).map(([n,o])=>{t+=`    ${n}: ${o};
`}),t+"}"}var te="";R.start()})();
