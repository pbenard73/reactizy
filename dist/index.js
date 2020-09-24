!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("redux")},function(e,t,r){"use strict";r.r(t),r.d(t,"reactizy",(function(){return h})),r.d(t,"autobind",(function(){return _})),r.d(t,"fusion",(function(){return b})),r.d(t,"withReactizy",(function(){return x})),r.d(t,"reduxer",(function(){return m})),r.d(t,"Store",(function(){return j})),r.d(t,"createStore",(function(){return g}));var n=r(0),o=r.n(n),c=r(2),i=(e,t)=>{for(var r=0,n=e.length;r<n;r++)t(e[r],r)},a=function(...e){let t={},r={};let n={};return i(e,e=>{void 0!==e.state&&(t={...t,...e.state});let o={};void 0!==e.actions&&(i(Object.keys(e.actions),t=>{let r=t.indexOf("Async");!1===(r<1||r!==t.length-"Async".length)?(n[t]=e.actions[t],o[t]=(e,t)=>(t=-1===[null,void 0].indexOf(t)||"object"!=typeof t?{}:t,{...e,...t})):o[t]=e.actions[t]}),r={...r,...o})}),!0===e[e.length-1]?n:(e=t,n)=>{const o=r[n.type];return void 0===o?{...e}:o(e,n.payload)}},s=(...e)=>!0===e[e.length-1]?(e.pop(),Object(c.createStore)(a(...e),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())):Object(c.createStore)(a(...e)),u=r(1);var l=Object(n.createContext)(),d=e=>o.a.createElement(l.Provider,{value:e.value},e.children);var f=Object(n.createContext)(),p=e=>o.a.createElement(f.Provider,{value:e.value},e.children),O=function(e=[]){const t=Object.getOwnPropertyNames(this).concat(Object.getOwnPropertyNames(this.__proto__)).concat(e);i(t,e=>{const t=e.length-"BindThis".length;if(e.indexOf("BindThis")===t&&t>0){this[e.replace("BindThis","")]=this[e].bind(this)}})},v=function(...e){var t=this;i(e,e=>{const r=Object.getOwnPropertyNames(e).concat(Object.getOwnPropertyNames(e.__proto__));i(r,r=>{if("constructor"!==r&&"reduxers"!==r)if("state"!==r)"function"==typeof e[r]?t[r]=e[r].bind(t):t[r]=e[r];else{const r=e.state;t.state={...t.state,...r}}})})};function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}const h=function(...e){v.call(this,...e),O.call(this)},_=O,b=v,x=function(e,...t){let r=void 0!==e.prototype&&void 0!==e.prototype.componentDidMount;const n=void 0===e.prototype?[]:Object.getOwnPropertyNames(e.prototype),c=Object.getOwnPropertyNames(e).concat(Object.getOwnPropertyNames(e.__proto__)).concat(n);let a=e.reduxers;const s=e=>-1===[null,void 0].indexOf(a)&&"array"===a.constructor.name.toLowerCase();a=!1===s()||0===a.length?[[],[]]:a;let d={wantedStateProperties:!1===s(a[0])?[]:a[0],wantedActions:a.length>1&&!0===s(a[1])?a[1]:[]},p={},v={};i(t,e=>{if(void 0!==e.reduxers&&i(["wantedStateProperties","wantedActions"],(t,r)=>{let n=e.reduxers[r];n=void 0===n?[]:n.filter(e=>-1===d[t].indexOf(e)),d[t]=[...d[t],...n]}),!0===r){const t=Object.getOwnPropertyNames(e).concat(Object.getOwnPropertyNames(e.__proto__));i(t,t=>{-1===["constructor","reduxers"].indexOf(t)&&("state"!==t?v[t]=e[t]:p={...p,...e.state})})}});let h=e;!0===r&&(h=class extends e{constructor(e){super(e),this.state=void 0===this.state?p:{...this.state,...p},i(Object.keys(v),e=>{this[e]=v[e]}),O.call(this,c)}});const _={};i(d.wantedActions,e=>{const t=e.indexOf("Async");_[t<1?e:e+"_inner_redux"]=t=>({type:e,payload:t})});let b=(x=h,class extends o.a.Component{constructor(e){super(e)}render(){return o.a.createElement(f.Consumer,null,e=>{let t={};return i(Object.keys(e),r=>{-1!==d.wantedActions.indexOf(r)&&(t[r]=(...t)=>new Promise((n,o)=>{e[r](...t).then(e=>{const t=r+"_inner_redux";this.props[t](e),n(!0)}).catch(e=>o(e))}))}),o.a.createElement(x,y({},this.props,t))})}});var x;if(b=Object(u.connect)(e=>{let t={};return i(d.wantedStateProperties,r=>{t[r]=e[r]}),t},_)(b),void 0!==e.use){return(()=>{const t=(t,r)=>o.a.createElement(l.Consumer,null,n=>(i(e.use,e=>{const t=n[e];void 0!==t&&(b=t(b))}),o.a.createElement(b,y({},t,{ref:r}))));return o.a.forwardRef(t)})(b)}return b},m=a,j=e=>{const t=a(...e.reduxers,!0);return void 0===e.uses?o.a.createElement(u.Provider,{store:s(...e.reduxers)},o.a.createElement(p,{value:t},e.children)):o.a.createElement(u.Provider,{store:s(...e.reduxers)},o.a.createElement(d,{value:e.uses},o.a.createElement(p,{value:t},e.children)))},g=s}]));