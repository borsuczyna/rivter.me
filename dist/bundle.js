(()=>{"use strict";var e={},t={};const n={player:{color:new class{r;g;b;a;constructor(e,t,n,o=255){this.r=e,this.g=t,this.b=n,this.a=o}toDOM(){return`rgba(${this.r}, ${this.g}, ${this.b}, ${this.a/255})`}}(255,50,50),validConnections:["player"]}};var o,i;o={"Player joined":{name:"Player joined",hoverTip:"Event is triggered when player joins server",motionStart:!1,motionNext:!0,inputs:[],outputs:[{name:"Player",hoverTip:"Player that joined server",type:"player"}],isEvent:!0}},e={...e,...o},i=n,t={...t,...i};var d=null,l=null,r=null,s=null,a={width:1280,height:720},c={x:0,y:0},u=1;function y(){let e=window.innerWidth,t=window.innerHeight;a.width=e,a.height=t,d.canvas.width=e,d.canvas.height=t}!function(){if(d&&l&&r&&s)return;let e=document.getElementById("editor-canvas");d=e?.getContext("2d"),l=document.getElementById("editor-window"),r=document.getElementById("editor-canvas"),s=document.querySelector(":root"),y(),addEventListener("resize",y)}();const p="qwsertyuiopasdfghjklzxcvbnbmQWERETYUIOPASDFDGHJKJLZXCXVBNBM123454567890";function m(e=16){let t="";for(;t.length<e;)t+=p.charAt(Math.random()*p.length);return t}const h={x:0,y:0};function v(e){r.style.cursor=e}addEventListener("mousemove",(function(e){h.x=e.clientX,h.y=e.clientY})),addEventListener("mousedown",(e=>{let t=new CustomEvent("mousePressed",{detail:{button:e.button}});window.dispatchEvent(t)})),addEventListener("mouseup",(e=>{let t=new CustomEvent("mouseReleased",{detail:{button:e.button}});window.dispatchEvent(t)}));var k={active:!1,holding:!1,x:0,y:0};function E(e,t){return{x:(e-a.width/2-c.x*u)/u,y:(t-a.height/2-c.y*u)/u}}function b(){if(!k.holding)return;let e=h.x-k.x,t=h.y-k.y;c.x+=e/u,c.y+=t/u,k.x=h.x,k.y=h.y,s.style.setProperty("--board-x",`${c.x}px`),s.style.setProperty("--board-y",`${c.y}px`),requestAnimationFrame(b)}addEventListener("keyPressed",(e=>{" "==e.detail.key&&(v("grab"),k.active=!0)})),addEventListener("keyReleased",(e=>{" "==e.detail.key&&k.active&&(v("default"),k.active=!1)})),addEventListener("mousePressed",(e=>{0==e.detail.button&&k.active&&(k.holding=!0,k.x=h.x,k.y=h.y,requestAnimationFrame(b))})),addEventListener("mouseReleased",(e=>{0==e.detail.button&&k.holding&&(k.holding=!1)})),addEventListener("wheel",(e=>{var t,n;n=u-e.deltaY/400,t=Math.min(Math.max(n,.2),4),u=t,s.style.setProperty("--board-zoom",`${u}`)}));var f=[];function g(e,n){let o=document.createElement("div"),i=document.createElement("div"),d=document.createElement("div"),l=(r=e.type,t[r]);var r;return i.innerText=e.name,o.appendChild("input"==n?d:i),o.appendChild("input"==n?i:d),d.style.backgroundColor=l?.color.toDOM()||"red",d.classList.add("block-ball"),o.classList.add("block-row"),o.classList.add(`block-${n}`),o}function x(t){let n=$(t);if(!n)return;let o=document.getElementById(`block-${n.token}`);return o||(o=function(t){let n=(o=t.type,e[o]);var o;if(!n)return;let i=document.createElement("div");i.classList.add("block-element"),i.id=`block-${t.token}`,l.appendChild(i);let d=document.createElement("div");d.innerText=n.name,d.classList.add("block-title");let r=document.createElement("div");r.classList.add("block-content");let s=document.createElement("div");s.classList.add("block-inputs"),n.inputs.forEach((e=>{let t=g(e,"input");s.appendChild(t)}));let a=document.createElement("div");return a.classList.add("block-outputs"),n.outputs.forEach((e=>{let t=g(e,"output");a.appendChild(t)})),r.appendChild(s),r.appendChild(a),i.appendChild(d),i.appendChild(r),i}(n)),o}function w(e,t,n){t=t||E(h.x,h.y).x,n=n||E(h.x,h.y).y;let o={token:m(),type:e,inputNodes:[],outputNodes:[],x:t,y:n};return f.push(o),function(e){let t=x(e),n=$(e);t&&(t.style.setProperty("--position-x",`${n.x}px`),t.style.setProperty("--position-y",`${n.y}px`))}(o),o}function $(e){return"string"!=typeof e?e:f.find((t=>t.token==e))}function L(e){if(function(e){let t=x(e);t&&t.remove()}(e),"string"==typeof e)return f=f.filter(((t,n)=>t.token!=e)),!0;{const t=f.indexOf(e);if(-1!==t)return f.splice(t,1),!0}return!1}const P={};addEventListener("keydown",(e=>{P[e.key]=!0;let t=new CustomEvent("keyPressed",{detail:{key:e.key}});window.dispatchEvent(t)})),addEventListener("keyup",(e=>{P[e.key]=!1;let t=new CustomEvent("keyReleased",{detail:{key:e.key}});window.dispatchEvent(t)}));var C,j=1;async function T(e,t){if("AsyncFunction"===t.constructor.name){try{await t()?console.log(`✔️ Test ${j} "${e}" passed`):console.log(`❌ Test ${j} "${e}" failed`)}catch(t){console.log(`❌ Test ${j} "${e}" failed: ${t}`)}j++}else{try{t()?console.log(`✔️ Test ${j} "${e}" passed`):console.log(`❌ Test ${j} "${e}" failed`)}catch(t){console.log(`❌ Test ${j} "${e}" failed: ${t}`)}j++}}T("create block",(()=>"Player joined"==(C=w("Player joined")).type)),T("destroy block",(()=>L(C))),T("destroy block via token",(()=>L(C.token))),T("destroy invalid block",(()=>!L(null))),T("create block at 50x50 position",(()=>{let e=50==(C=w("Player joined",50,50)).x&&50==C.y;return L(C),e})),T("created block should create DOM element",(()=>{C=w("Player joined",50,50);let e=document.getElementById(`block-${C.token}`);return L(C),!!e})),T("destroying block should delete DOM element",(()=>{C=w("Player joined",50,50);let e=document.getElementById(`block-${C.token}`);L(C);let t=document.getElementById(`block-${C.token}`);return e&&!t})),T("create block for testing frontend purposes",(()=>!!(C=w("Player joined",50,50))))})();