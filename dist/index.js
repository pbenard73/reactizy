!function(t,e){for(var r in e)t[r]=e[r]}(exports,function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e){t.exports=require("react-redux")},function(t,e){t.exports=require("redux")},function(t,e){t.exports=require("react")},function(t,e,r){"use strict";r.r(e),r.d(e,"reactizy",(function(){return l})),r.d(e,"autobind",(function(){return p})),r.d(e,"fusion",(function(){return O})),r.d(e,"withReactizy",(function(){return _})),r.d(e,"reduxer",(function(){return y})),r.d(e,"Store",(function(){return b})),r.d(e,"createStore",(function(){return h}));var n=r(2),o=r.n(n),c=r(1),i=(t,e)=>{for(var r=0,n=t.length;r<n;r++)e(t[r],r)},s=function(...t){let e={},r={};return i(t,t=>{void 0!==t.state&&(e={...e,...t.state}),void 0!==t.actions&&(r={...r,...t.actions})}),(t=e,n)=>{const o=r[n.type];return void 0===o?{...t}:o(t,n.payload)}},u=(...t)=>!0===t[t.length-1]?(t.pop(),Object(c.createStore)(s(...t),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())):Object(c.createStore)(s(...t)),a=r(0),d=function(t=[]){const e=Object.getOwnPropertyNames(this).concat(Object.getOwnPropertyNames(this.__proto__)).concat(t);i(e,t=>{const e=t.length-"BindThis".length;if(t.indexOf("BindThis")===e&&e>0){this[t.replace("BindThis","")]=this[t].bind(this)}})},f=function(...t){var e=this;i(t,t=>{const r=Object.getOwnPropertyNames(t).concat(Object.getOwnPropertyNames(t.__proto__));i(r,r=>{if("constructor"!==r&&"reduxers"!==r)if("state"!==r)"function"==typeof t[r]?e[r]=t[r].bind(e):e[r]=t[r];else{const r=t.state;e.state={...e.state,...r}}})})};const l=function(...t){f.call(this,...t),d.call(this)},p=d,O=f,_=function(t,...e){const r=0===t.toString().indexOf("class"),n=void 0===t.prototype?[]:Object.getOwnPropertyNames(t.prototype),o=Object.getOwnPropertyNames(t).concat(Object.getOwnPropertyNames(t.__proto__)).concat(n);let c=t.reduxers;const s=t=>-1===[null,void 0].indexOf(c)&&"array"===c.constructor.name.toLowerCase();c=!1===s()||0===c.length?[[],[]]:c;let u={wantedStateProperties:!1===s(c[0])?[]:c[0],wantedActions:c.length>1&&!0===s(c[1])?c[1]:[]},f={},l={};i(e,t=>{if(void 0!==t.reduxers&&i(["wantedStateProperties","wantedActions"],(e,r)=>{let n=t.reduxers[r];n=void 0===n?[]:n.filter(t=>-1===u[e].indexOf(t)),u[e]=[...u[e],...n]}),!0===r){const e=Object.getOwnPropertyNames(t).concat(Object.getOwnPropertyNames(t.__proto__));i(e,e=>{-1===["constructor","reduxers"].indexOf(e)&&("state"!==e?l[e]=t[e]:f={...f,...t.state})})}});let p=t;!0===r&&(p=class extends t{constructor(t){super(t),this.state=void 0===this.state?f:{...this.state,...f},i(Object.keys(l),t=>{this[t]=l[t]}),d.call(this,o)}});const O={};return i(u.wantedActions,t=>{O[t]=e=>({type:t,payload:e})}),Object(a.connect)(t=>{let e={};return i(u.wantedStateProperties,r=>{e[r]=t[r]}),e},O)(p)},y=s,b=t=>o.a.createElement(a.Provider,{store:u(...t.reduxers)},t.children),h=u}]));