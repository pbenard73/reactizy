!function(t,e){for(var r in e)t[r]=e[r]}(exports,function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e){t.exports=require("react-redux")},function(t,e){t.exports=require("redux")},function(t,e){t.exports=require("react")},function(t,e,r){"use strict";r.r(e),r.d(e,"reactizy",(function(){return l})),r.d(e,"autobind",(function(){return p})),r.d(e,"fusion",(function(){return O})),r.d(e,"withReactizy",(function(){return _})),r.d(e,"reduxer",(function(){return b})),r.d(e,"Store",(function(){return y})),r.d(e,"createStore",(function(){return x}));var n=r(2),o=r.n(n),i=r(1),c=(t,e)=>{for(var r=0,n=t.length;r<n;r++)e(t[r],r)},u=function(...t){let e={},r={};return c(t,t=>{void 0!==t.state&&(e={...e,...t.state}),void 0!==t.actions&&(r={...r,...t.actions})}),(t=e,n)=>{const o=r[n.type];return void 0===o?{...t}:o(t,n.payload)}},s=(...t)=>!0===t[t.length-1]?(t.pop(),Object(i.createStore)(u(...t),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())):Object(i.createStore)(u(...t)),a=r(0),d=function(){const t=Object.getOwnPropertyNames(this).concat(Object.getOwnPropertyNames(this.__proto__));c(t,t=>{const e=t.length-"BindThis".length;if(t.indexOf("BindThis")===e&&e>0){this[t.replace("BindThis","")]=this[t].bind(this)}})},f=function(...t){var e=this;c(t,t=>{const r=Object.getOwnPropertyNames(t).concat(Object.getOwnPropertyNames(t.__proto__));c(r,r=>{if("constructor"!==r&&"reduxers"!==r)if("state"!==r)"function"==typeof t[r]?e[r]=t[r].bind(e):e[r]=t[r];else{const r=t.state;e.state={...e.state,...r}}})})};const l=function(...t){f.call(this,...t),d.call(this)},p=d,O=f,_=function(t,...e){let r=t.reduxers;r=void 0===r?[[],[]]:r,void 0===r[1]&&(r=[r[0],[]]);let n=[];n=n.concat(r[0]);let o=[];o=o.concat(r[1]);let i={},u={};c(e,t=>{const e=Object.getOwnPropertyNames(t).concat(Object.getOwnPropertyNames(t.__proto__));if(void 0!==t.reduxers){let e=t.reduxers[0];e=void 0===e?[]:e,e=e.filter(t=>-1===n.indexOf(t)),n=[...n,...e];let r=t.reduxers[1];r=void 0===r?[]:r,r=r.filter(t=>-1===o.indexOf(t)),o=[...o,...r]}c(e,e=>{if("constructor"!==e&&"reduxers"!==e)if("state"!==e)u[e]=t[e];else{const e=t.state;i={...i,...e}}})});let s=t;0===t.toString().indexOf("class")&&(s=class extends t{constructor(t){super(t),this.state=void 0===this.state?i:{...this.state,...i},c(Object.keys(u),t=>{this[t]=u[t]}),d.call(this)}});const f={};return c(o,t=>{f[t]=e=>({type:t,payload:e})}),Object(a.connect)(t=>{let e={};return c(n,r=>{e[r]=t[r]}),e},f)(s)},b=u,y=t=>o.a.createElement(a.Provider,{store:s(...t.reduxers)},t.children),x=s}]));