!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("axios")},function(e,t,r){"use strict";r.r(t),r.d(t,"reactizy",(function(){return je})),r.d(t,"autobind",(function(){return me})),r.d(t,"domainize",(function(){return we})),r.d(t,"fusion",(function(){return Pe})),r.d(t,"withReactizy",(function(){return Se})),r.d(t,"reduxer",(function(){return _e})),r.d(t,"Store",(function(){return xe})),r.d(t,"createStore",(function(){return Ee})),r.d(t,"hocBuilder",(function(){return Ae})),r.d(t,"hocCreator",(function(){return De}));var n=r(0),o=r.n(n),i=r(2),c=function(e,t){for(var r=0,n=e.length;r<n;r++)t(e[r],r)};function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var p=function(){for(var e={},t={},r="Async",n={},o=arguments.length,i=new Array(o),u=0;u<o;u++)i[u]=arguments[u];return c(i,(function(o){void 0!==o.state&&(e=f(f({},e),o.state));var i={};void 0!==o.actions&&(c(Object.keys(o.actions),(function(e){var t=e.indexOf(r);!1===(t<1||t!==e.length-r.length)?(n[e]=o.actions[e],i[e]=function(e,t){return t=-1===[null,void 0].indexOf(t)||"object"!==a(t)?{}:t,f(f({},e),t)}):i[e]=o.actions[e]})),t=f(f({},t),i))})),!0===i[i.length-1]?n:function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,n=arguments.length>1?arguments[1]:void 0,o=t[n.type];return void 0===o?f({},r):o(r,n.payload)}},s=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!0===t[t.length-1]?(t.pop(),Object(i.createStore)(p.apply(void 0,t),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())):Object(i.createStore)(p.apply(void 0,t))},y=r(3),b=r(1),d=r.n(b),v=Object(n.createContext)();function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var j=function(e){var t={};return c(void 0!==e.apis?e.apis:[],(function(e){t=h(h({},t),e)})),o.a.createElement(v.Provider,{value:{api:t}},e.children)};j.propTypes={apis:d.a.array,children:d.a.oneOfType([d.a.array,d.a.object])};var m=j,w=Object(n.createContext)(),P=function(e){return o.a.createElement(w.Provider,{value:e.value},e.children)};P.propTypes={value:d.a.object,children:d.a.oneOfType([d.a.array,d.a.object])};var S=P;function _(e){return function(e){if(Array.isArray(e))return x(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return x(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return x(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var E=function(e){var t=p.apply(void 0,_(e.reduxers).concat([!0]));return void 0===e.apis?o.a.createElement(y.Provider,{store:s.apply(void 0,_(e.reduxers))},o.a.createElement(S,{value:t},e.children)):o.a.createElement(y.Provider,{store:s.apply(void 0,_(e.reduxers))},o.a.createElement(m,{apis:e.apis},o.a.createElement(S,{value:t},e.children)))};E.propTypes={reduxers:d.a.array,apis:d.a.array,children:d.a.oneOfType([d.a.array,d.a.object])};var A=E,D=function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=Object.getOwnPropertyNames(this).concat(Object.getOwnPropertyNames(this.__proto__)).concat(t);c(r,(function(t){var r=t.length-"BindThis".length;if(t.indexOf("BindThis")===r&&r>0){var n=t.replace("BindThis","");e[n]=e[t].bind(e)}}))};function T(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?T(Object(r),!0).forEach((function(t){C(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function N(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?I(Object(r),!0).forEach((function(t){R(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var B=function(){for(var e=this,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];c(r,(function(t){var r=Object.getOwnPropertyNames(t).concat(Object.getOwnPropertyNames(t.__proto__));c(r,(function(r){if("constructor"!==r&&"reduxers"!==r)if("state"!==r)"function"==typeof t[r]?e[r]=t[r].bind(e):e[r]=t[r];else{var n=t.state;e.state=N(N({},e.state),n)}}))}))},M=r(4),q=r.n(M);function L(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function X(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){z(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function z(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var $=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"==typeof e)return e;for(var r=(void 0!==e.domain?e.domain:"")+e.path,n=Object.keys(t),o=[],i=n.length-1;i>=0;i--)-1!==r.indexOf(n[i])?r=r.replace(":"+n[i],t[n[i]]):o.push("".concat(n[i],"=").concat(t[n[i]].toString()));return o.length>0&&(r+="?".concat(o.join("&"))),r},V=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=$(e,t),i=Object.assign(void 0!==e.body?e.body:{},r);void 0!==r.constructor&&"FormData"===r.constructor.name&&(i=r);var c=X({},n),a={},u=void 0!==e.method?e.method.toLowerCase():"get";return-1===["post","put","delete"].indexOf(u)&&(a["Content-Type"]="application/x-www-form-urlencoded"),void 0!==n.headers&&(a=X(X({},a),n.headers),delete c.headers),X({url:o,method:u,headers:a,data:i,withCredentials:!0},c)},F=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,n;return t=e,(r=[{key:"url",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return $(e,t)}},{key:"call",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return new Promise((function(o,i){return q.a.request(V(e,t,r,n)).then((function(e){return-1===[200,201].indexOf(e.status)?(e.message=e.data.status,i(e)):o(e.data)})).catch((function(e){return i(e)}))}))}}])&&L(t.prototype,r),n&&L(t,n),e}(),G=new F;function H(e){return(H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function J(){return(J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function K(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function Q(e,t,r){return t&&K(e.prototype,t),r&&K(e,r),e}function W(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Y(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Z(e,t)}function Z(e,t){return(Z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ee(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=ne(e);if(t){var o=ne(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return te(this,r)}}function te(e,t){return!t||"object"!==H(t)&&"function"!=typeof t?re(e):t}function re(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ne(e){return(ne=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function oe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ie(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(r),!0).forEach((function(t){ce(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):oe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ce(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ae(e){return function(e){if(Array.isArray(e))return ue(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return ue(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return ue(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ue(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function fe(e){var t=void 0!==e.prototype&&void 0!==e.prototype.__proto__&&void 0!==e.prototype.__proto__.isReactComponent;!1===t&&(t=0===e.toString().indexOf("class"));var r=void 0===e.prototype?[]:Object.getOwnPropertyNames(e.prototype),n=Object.getOwnPropertyNames(e).concat(Object.getOwnPropertyNames(e.__proto__)).concat(r),i=e.reduxers,a=function(e){return-1===[null,void 0].indexOf(e)&&"array"===e.constructor.name.toLowerCase()};i=!1===a(i)||0===i.length?[[],[]]:i;for(var u={wantedStateProperties:!1===a(i[0])?[]:i[0],wantedActions:i.length>1&&!0===a(i[1])?i[1]:[]},f={},l={},p=arguments.length,s=new Array(p>1?p-1:0),b=1;b<p;b++)s[b-1]=arguments[b];c(s,(function(e){if(void 0!==e.reduxers&&c(["wantedStateProperties","wantedActions"],(function(t,r){var n=e.reduxers[r];n=void 0===n?[]:n.filter((function(e){return-1===u[t].indexOf(e)})),u[t]=[].concat(ae(u[t]),ae(n))})),!0===t){var r=Object.getOwnPropertyNames(e).concat(Object.getOwnPropertyNames(e.__proto__));c(r,(function(t){-1===["constructor","reduxers"].indexOf(t)&&("state"!==t?l[t]=e[t]:f=ie(ie({},f),e.state))}))}}));var d=e;!0===t&&(d=function(e){Y(r,e);var t=ee(r);function r(e){var o;return W(this,r),(o=t.call(this,e)).state=void 0===o.state?f:ie(ie({},o.state),f),c(Object.keys(l),(function(e){o[e]=l[e]})),D.call(re(o),n),o}return r}(e));var O=function(e){var t={};return c(u.wantedStateProperties,(function(r){t[r]=e[r]})),t},h={},g="Async";c(u.wantedActions,(function(e){var t=e.indexOf(g)<1?e:"".concat(e,"_inner_redux");h[t]=function(t){return{type:e,payload:t}}}));var j=function(e){return function(t){Y(n,t);var r=ee(n);function n(e){var t;return W(this,n),(t=r.call(this,e)).bindProps={},c(Object.keys(e),(function(e){var r=e.length-"BindThis".length;if(e.indexOf("BindThis")===r&&r>0){var n=e.replace("BindThis","");t.bindProps[n]=function(){for(var r,n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(r=t.props[e]).call.apply(r,[re(t)].concat(o))}}})),t}return Q(n,[{key:"render",value:function(){var t=this;return o.a.createElement(w.Consumer,null,(function(r){var n={};return c(Object.keys(r),(function(e){-1!==u.wantedActions.indexOf(e)&&(n[e]=function(){for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return new Promise((function(n,i){r[e].apply(r,o).then((function(r){var o="".concat(e,"_inner_redux");t.props[o](r),n(!0)})).catch((function(e){return i(e)}))}))})})),o.a.createElement(e,J({},t.props,t.bindProps,n))}))}}]),n}(o.a.Component)},m=j(d);m=Object(y.connect)(O,h)(m);var P=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return function(r){var n=e.api[r];if(void 0===n)return new Error("Api route ".concat(r," is not registered"));for(var o=arguments.length,i=new Array(o>1?o-1:0),c=1;c<o;c++)i[c-1]=arguments[c];return!1===t?G.call.apply(G,[n].concat(i)):G.url.apply(G,[n].concat(i))}},S=function(){var e=function(e,t){return o.a.createElement(v.Consumer,null,(function(r){var n={};return-1===[null,void 0].indexOf(r)&&0!==r.api.length&&(n={api:{call:P(r),url:P(r,!0)}}),o.a.createElement(m,J({},e,n,{ref:t}))}))};return o.a.forwardRef(e)};return S(m)}var le=function(e,t){for(var r=[],n=0,o=e.length;n<o;n++){var i=t(e[n],n);-1===[null,void 0].indexOf(i)&&r.push(i)}return r};function pe(){return(pe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var se=function(e,t){return function(r){return function(n){return o.a.createElement(r,pe({},(i={},c="".concat(e,"BindThis"),a=t,c in i?Object.defineProperty(i,c,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[c]=a,i),n));var i,c,a}}};function ye(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return r}(e,t)||de(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function be(e){return function(e){if(Array.isArray(e))return ve(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||de(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function de(e,t){if(e){if("string"==typeof e)return ve(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ve(e,t):void 0}}function ve(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Oe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function he(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Oe(Object(r),!0).forEach((function(t){ge(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Oe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ge(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var je=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];B.call.apply(B,[this].concat(t)),D.call(this)},me=D,we=function(e,t){var r={};return c(Object.keys(t),(function(n){r[n]=k(k({},t[n]),{},{domain:e})})),r},Pe=B,Se=fe,_e=p,xe=A,Ee=s,Ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(){for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];var c=Object.keys(he(he({},e),t));return function(r){for(var o=arguments.length,a=new Array(o>1?o-1:0),u=1;u<o;u++)a[u-1]=arguments[u];if(0===n.length)return fe.apply(void 0,[r].concat(a));var f=-1!==c.indexOf(n[0][0]),l=function(e){return"array"===e.constructor.name.toLowerCase()},p=function(e){return!0===l(e[0])&&!0===l(e[0][0])?e[0]:be(e)},s=[[],[]],y=function(e,t){return e.reduxers=[[].concat(be(t[0]),be(s[0])),void 0!==t[1]?[].concat(be(t[1]),be(s[1])):s[1]],fe.apply(void 0,[e].concat(a))},b=[],d=function(r){return le(n,(function(r){if(void 0!==e[r])return e[r];if(void 0!==t[r]){var n=t[r];if(b.push(r),!1===l(n))return se(r,t[r]);var o=ye(n,3),i=o[0],c=o[1],a=void 0===c?[]:c,u=o[2],f=void 0===u?[]:u;return s=[[].concat(be(s[0]),be(a)),[].concat(be(s[1]),be(f))],se(r,i)}return null}))},v=function(e){return e.binders=b,e};if(!0===f&&1===n.length)return i.compose.apply(void 0,be(d(n)))(fe.apply(void 0,[v(r)].concat(a)));if(!0===f&&n.length>1){var O=n[0],h=n.slice(1);return i.compose.apply(void 0,be(d(O)))(y(v(r),p(h)))}return y(r,p(n))}}},De=se}]));