(this.webpackJsonpreactizy_doc=this.webpackJsonpreactizy_doc||[]).push([[0],{331:function(e,t,n){},332:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),l=n.n(o),c=(n(87),n(21)),i=n(350),s=n(359),u=n(18),m=n(71),p=(n(90),n(91),[["/","Home"],["/get-started","Get Started"],["/redux-and-reduxers","Redux and Reduxers"],["/hoc-builder","Hoc Builder"],["/splitter","Splitter"],["/api","Api"],["/autobind","Autobind"]]),d=function(e){return r.a.createElement("div",{className:"sidebar ".concat(!0===e.open?"open":"")},r.a.createElement(i.a,null,p.map((function(t){return r.a.createElement(s.a,null,r.a.createElement(u.b,{to:t[0],onClick:e.closeMenu},r.a.createElement(m.AwesomeButton,null,t[1])))}))))},h=n(360),E=n(352),f=n(353),g=n(357),b=n(354),C=n(355),y=n(74),x=n.n(y),k=(n(94),function(e){return r.a.createElement(h.a,{className:"topbar",position:"fixed"},r.a.createElement(E.a,null,r.a.createElement(f.a,{variant:"h5",noWrap:!0},"Reactizy"),r.a.createElement("div",null,r.a.createElement(g.a,{title:"Show on Github",placement:"bottom"},r.a.createElement("a",{href:"https://github.com/pbenard73/reactizy"},r.a.createElement(b.a,null,r.a.createElement(x.a,null)))),r.a.createElement(g.a,{title:"Menu",placement:"bottom"},r.a.createElement(C.a,{onClick:e.toggleMenu,id:"top_menu"},"Menu")))))}),w=n(6),R=(n(96),n(358)),A=n(356),S=(n(97),function(e){return r.a.createElement(R.a,{language:"javascript",style:A.a,className:"code_wrapper"},e.children)}),H=function(){return r.a.createElement("section",{name:"homepage"},r.a.createElement("h1",null,"Reactizy"),r.a.createElement("p",null,r.a.createElement("small",null,"v3.1.0")),r.a.createElement("p",null,r.a.createElement("b",null,"Reactizy")," is a ",r.a.createElement("b",null,"React High Order Component")," and a toolkit allowing"),r.a.createElement("p",null,r.a.createElement("ul",null,r.a.createElement("li",null,"Simplify to use of ",r.a.createElement("b",null,"react-redux")),r.a.createElement("li",null,r.a.createElement("b",null,"Split react components")," in order to have a better readability"),r.a.createElement("li",null,"Providing ",r.a.createElement("b",null,"asynchronous reducers")),r.a.createElement("li",null,"Call api with simply library"),r.a.createElement("li",null,"... and some usefull utilities."))),r.a.createElement(S,null,"npm install reactizy"))},T="/* src/api/main.js*/\nexport default {\n    mainRoute: {path:'/my_main_route'},\n    postRoute: {path:'/my_post_route'},\n    customDomain: {path:'/my_other_route', domain:'http://mydomain.com'},\n    paramRoute: {path:'/my_other_route/:myParam', domain:'http://mydomain.com'},\n}",v="/* src/reduxers/login.js */\nclass LoginReducer {\n    state = {\n        user: null\n    }\n\n    actions = {\n        login: (state, user) => ({ ...state, user: user }),\n        logout: state => ({ ...state, user: null }),\n    }\n}\n\nexport default new LoginReducer()",j="/* src/reduxers/receipe.js */\nclass ReceipeReducer {\n    state = {\n        receipeToCook: 0\n    }\n\n    actions = {\n        increment: state => ({ ...state, receipeToCook: state.receipeToCook + 1}),\n        decrement: state => ({ ...state, receipeToCook: state.receipeToCook - 1}),\n        addToCook: (state, number) => ({ ...state, receipeToCook: state.receipeToCook + number})\n    }\n}\n\nexport default new ReceipeReducer()",B="/* src/index.js */\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nimport { Store } from 'reactizy'\nimport mainApi from './api/main'\nimport login from './reduxers/login'\nimport receipe from './reduxers/receipe'\n\nReactDOM.render(\n  <React.StrictMode>\n    <Store reduxers={[login, receipe]} apis={[mainApi]}>\n       <App />\n    </Store>\n  </React.StrictMode>,\n  document.getElementById('root')\n)",O="import React from \"react\";\nimport Hoc from \"./hocs/Hoc\";\n\nclass MyComponent extends React.Component {\n    askLoginBindThis(username) {\n        this.props.login({name: window.prompt('Username')})\n        setTimeout(() => this.props.sayHello(this.props.user), 1000)\n    }\n\n    performLogoutBindThis() {\n        this.props.logout()\n        this.props.alert.info('Logout')\n    }\n\n    asyncLoginBindThis() {\n        this.props.call('complexLogin', {user: window.prompt('New Username')})\n    }\n\n    addReceipesBindThis() {\n        this.props.addToCook(5)\n    }\n\n    callApiBindThis() {\n        this.props.api.call('mainRoute')\n        .then(data => this.props.alert.success('Success'))\n        .catch(error => this.props.alert.error('Error occured'))\n    }\n\n    render {\n        return (\n            <div className=\"App\">\n                {this.props.user === null ? (\n                    <>\n                        <button onClick={this.askLogin}>Login</button>\n                        <button onClick={this.asyncLogin}>Login</button>\n                    </>\n                ) : (\n                    <button onClick={this.performLogout}>Logout</button>\n                )}\n\n                <button onClick={this.callApi}>Call Api</button>\n\n                <p> There are {this.props.receipeToCook} receipes </p>\n\n                <button onClick={this.addReceipes}>Add receipes</button>\n            </div>\n        )\n    }\n}     \n\nconst uses = ['alert', 'sayHello']\nconst state = ['user', 'receipeToCook']\nconst actions = ['login', 'logout', 'addToCook', 'complexLogin'] \n\nexport default Hoc(uses, state, actions)(App)",z=(n(331),[["/api",function(){return r.a.createElement("section",{name:"api",className:"api"},r.a.createElement("h1",null,"Api"),r.a.createElement("h2",null,"Introduction"),r.a.createElement("p",null,"The ",r.a.createElement("b",null,"Api")," permits to easily call Api routes, in using the `Axios` node package"),r.a.createElement("h2",null,"Registration"),r.a.createElement("p",null,"First, create the api routes objects"),r.a.createElement(S,null,T),r.a.createElement(S,null,"/* src/api/ext.js*/\nexport default {\n    extRoute: {path:'/my_main_route'},\n    extPostRoute: {path:'/my_post_route'},\n}"),r.a.createElement("p",null,"After, register it in the ",r.a.createElement("code",null,"index.js")," file"),r.a.createElement("p",null,r.a.createElement("i",null,"You can use the ",r.a.createElement("code",null,"domainize")," utility to set a custom domain for an api pool")),r.a.createElement(S,null,"/* src/index.js*/\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nimport { Store, domainize } from 'reactizy'\nimport mainApi from './api/main'\nimport extApi from './api/ext'\n\nimport main from './reduxers/main'\n\nReactDOM.render(\n  <React.StrictMode>\n    <Store reduxers={[main]} apis={[mainApi, domainize('https://myDomain.com', extApi)]}>\n        <App />\n    </Store>\n  </React.StrictMode>,\n  document.getElementById('root')\n)"),r.a.createElement("h3",null,"Usage"),r.a.createElement(S,null,"import React from 'react'\nimport { withReactizy } from 'reactizy'\n\nconst Compo = props => {\n    const click = () => {\n        props.api.call('mainRoute')\n        .then(response => {})\n        .catch(error => console.log(error))\n    }\n\n    return (\n        <div className=\"my-compo\">\n            <button onClick={click}>my api trigger</button>\n        </div>\n    )\n}\n\nexport default withReactizy(Compo)"),r.a.createElement("h3",null,"Methods"),r.a.createElement(S,null,"props.api.call(routeName, urlParams = {}, body = {}, extraOptions = {})\n\nprops.api.url(routeName, urlParams = {})\n\nprops.api.call(stringUrl, urlParams = {}, body = {})\n"))}],["/hoc-builder",function(){return r.a.createElement("section",{name:"hoc builder",className:"hoc_builder"},r.a.createElement("h1",null,"Hoc Builder"),r.a.createElement("p",null,"The Hoc Builder permits to :",r.a.createElement("ul",null,r.a.createElement("li",null,"create the main High Order Component"),r.a.createElement("li",null,"register the third part HOCs"),r.a.createElement("li",null,"create your owns simple HOC"),r.a.createElement("li",null,"link a splitted component to every React Component (they must be designed as class form)"))),r.a.createElement("h2",null,"Create your High Order Component"),r.a.createElement(S,null,"// hoc/Hoc.js\nimport { hocBuilder } from 'reactizy'\n\nimport { withRouter\xa0}\xa0from 'react-dom-router'\nimport { withAlert }\xa0from 'react-alert'\n\nimport SplittedCompo from './../partial/SplittedCompo\n\nexport default hocBuilder({\n    hocs: {\n        alert: withAlert(),\n        router: withRouter\n    },\n    customs: {\n        showSomething: function(text) {\n            alert(text)\n        }\n    },\n    thunks: {\n        complexLogin: user => (dispatch, getState, user) => {\n            setTimeout(() => dispatch('login', user), 2000)\n        }\n    },\n    fusion: [\n        {\n            uses: ['alert'],\n            state: ['user'],\n            actions: [],\n            component: () => SplittedCompo\n        }\n    ],\n    options: {\n        name: 'execute' // default 'call'\n    }\n})\n"),r.a.createElement("p",null,"The HocBuilder takes as argument an object with following keys :",r.a.createElement("dl",null,r.a.createElement("dt",null,r.a.createElement("b",null,"hocs")),r.a.createElement("dd",null,"object : the shortname as key and third HOC as value"),r.a.createElement("dt",null,r.a.createElement("b",null,"customs")),r.a.createElement("dd",null,"object : the shortname as key and function transformed as HOC as value"),r.a.createElement("dt",null,r.a.createElement("b",null,"thunks")),r.a.createElement("dd",null,"object : shortname as key and function transformed as redux-thunk thunks"),r.a.createElement("dt",null,r.a.createElement("b",null,"fusion")),r.a.createElement("dd",null,"array : An array of object representing all splitted that will be merge into each component"),r.a.createElement("dt",null,r.a.createElement("b",null,"options")),r.a.createElement("dd",null,"object : options object to configure the HOC"))),r.a.createElement("h3",null,"Thunks"),r.a.createElement("p",null,"All the thunks are functions, each arguments must be passes in the returning callback."),r.a.createElement("p",null,"In component, the call the the thunk is made vi ",r.a.createElement("code",null,"this.props.call('thunkShortname', ...args)")),r.a.createElement("p",null,"If the options ",r.a.createElement("code",null,"{name: 'dispatch'}")," for exemple is given then the call will be ",r.a.createElement("code",null,"this.props.dispatch('thunkShortname', ...args)")),r.a.createElement("h3",null,"Fusion"),r.a.createElement("p",null,"Fusion is an array of piece of component that will be merge in every class Component using the HOC"),r.a.createElement("p",null,"The ",r.a.createElement("code",null,"component")," key, is a function returning a ",r.a.createElement(u.b,{to:"/splitter"},"Splitted class")),r.a.createElement("p",null,"The ",r.a.createElement("code",null,"uses"),", ",r.a.createElement("code",null,"state"),", ",r.a.createElement("code",null,"actions"),", are partials HOC arguments that will be passed in complement of main Component arguments."),r.a.createElement("h3",null,"Options"),r.a.createElement("p",null,"Actually the options takes the ",r.a.createElement("code",null,"name")," key representing the property name to call the thunks actions and generic redux actions."),r.a.createElement("h2",null,"Usage in component"),r.a.createElement(S,null,"/*\n   uses: an array of hocs shortname to link\n   state: an array of redux state to link\n   actions: array of redux action or thunks, if true provided, all methods will be linked\n*/\n\nexport default Hoc(uses, state, actions)(Component)\n\nexport default Hoc(uses, actions)(Component)\n\nexport default Hoc(state, actions)(Component)\n\nexport default Hoc(state, true)(Component)\n\n// The hoc fusion can be disabled in setting the argument as false, preceding the Component\nexport default Hoc(uses, state, actions)(false, Component)\n\nexport default Hoc()(Component, Splitted, OtherSplitted)\n"))}],["/get-started",function(){return r.a.createElement("section",{name:"get started",className:"get_started"},r.a.createElement("h1",null,"Get Started"),r.a.createElement("h2",null,"Create your High Order Component"),r.a.createElement("p",null,"Register here your wanted HOC with their shortname. Be careful of unicity of the shortnames. It shouldn't be present in the reduxers pool and actions. ",r.a.createElement(u.b,{to:"/hoc-builder"},"Full details about the provided features")),r.a.createElement("p",null,"Here is an example with ",r.a.createElement("code",null,"withRouter")," from ",r.a.createElement("code",null,"react-router-dom")," and ",r.a.createElement("code",null,"withAlert")," from ",r.a.createElement("code",null,"react-alert")," packages"),r.a.createElement(S,null,"/* src/hocs/Hoc.js */\nimport { hocBuilder }\xa0from 'reactizy'\n\nimport { withRouter\xa0}\xa0from 'react-dom-router'\nimport { withAlert }\xa0from 'react-alert'\n\nexport default hocBuilder({\n    hocs: {\n        alert: withAlert(),\n        router: withRouter\n    },\n    thunks: {\n        complexLogin: user => (dispatch, getState, user) => {\n            setTimeout(() => dispatch('login', user), 2000)\n        }\n    },\n    customs: {\n        sayHello: function(name) {\n            window.alert(`Hello ${name}`)\n        }\n    }\n)"),r.a.createElement("h2",null,"Create the reduxers"),r.a.createElement("p",null,"Register the reduxers you need to use"),r.a.createElement(S,null,v),r.a.createElement(S,null,j),r.a.createElement("h2",null,"Create your Api routing files"),r.a.createElement(S,null,T),r.a.createElement("h2",null,"Implement your application"),r.a.createElement(S,null,B),r.a.createElement("h2",null,"Use in Component"),r.a.createElement(S,null,O))}],["/redux-and-reduxers",function(){return r.a.createElement("section",{name:"get started",className:"get_started"},r.a.createElement("h1",null,"Redux and Reduxers"),r.a.createElement("h2",null,"Reduxers Creation"),r.a.createElement("h3",null,"Introduction"),r.a.createElement("p",null,"Each reducer is composed by an state object that will be merged into a global state object, and an actions that references all the methods. The method's name is the key, the method is the value."),r.a.createElement("p",null,"For the asynchronous methods, refer to the ",r.a.createElement(u.b,{to:"/hoc-builder"},"Hoc Builder")," documentation."),r.a.createElement("h3",null,"Usage"),r.a.createElement(S,null,v),r.a.createElement(S,null,j),r.a.createElement("h2",null,"Store Creation"),r.a.createElement(S,null,B),r.a.createElement("h2",null,"Usage in Components"),r.a.createElement(S,null,O))}],["/splitter",function(){return r.a.createElement("section",{name:"splitter",className:"splitter"},r.a.createElement("h1",null,"Splitter"),r.a.createElement("h2",null,"Introduction"),r.a.createElement("p",null,"The Splitter behaviour permits to merge many Classes to the current Component"),r.a.createElement("p",null,"All the methods will be merged into the components."),r.a.createElement("p",null,"If a ",r.a.createElement("code",null,"state")," object is defined, it will be merged into the state of the main component"),r.a.createElement("p",null,"If a reduxers array is provided (",r.a.createElement("code",null,"[stateArray, actionsArray]"),"), it will be merged to inside the HOC arguments of the main Components"),r.a.createElement("h2",null,"Usage"),r.a.createElement("p",null,"The following code result in a state corresponding to :"),r.a.createElement("p",null,r.a.createElement("code",null,"state = {foo: 'bar', partCount: 0}")),r.a.createElement("p",null,"And the export Hoc will correspond to : "),r.a.createElement("p",null,r.a.createElement("code",null,'export default Hoc(["user", "receipeToCook"], ["login", "decrement", "logout"])(App, SubPage);')),r.a.createElement("p",null,"All the parts methods will be merged inside the main component."),r.a.createElement("hr",null),r.a.createElement(S,null,"// src/partials/SubPage.js\n\nclass SubPage {\n    state = { partCount: 0  }\n\n    reduxers = [ ['receipeToCook'], ['decrement', 'logout'] ]\n\n    incrementPartCountBindThis() {\n        this.setState({partCount: this.state.partCount + 1})\n    }\n\n    renderSubArea() {\n        return (\n            <section>\n                <button onClick={this.incrementPartCount}>Increment {this.state.partCount}</button>\n    \n                <button onClick={this.props.decrement}>\n                    Decrement Receipes   \n                </button>\n            </section>\n        )\n    }\n}\n\nexport default new SubPage()"),r.a.createElement(S,null,'/* src/App.js */\n\nimport React from "react";\n\nimport SubPage from \'./partials/SubPage\'\n\nimport Hoc from "./hocs/Hoc";\n\nclass App extends React.Component {\n    constructor(props) {\n        super(props)\n\n        this.state = { foo: \'bar\' }\n    }\n\n    render() {\n        return (\n            <div className="App">\n                <p> There are {this.props.receipeToCook} receipes</p>\n                {this.props.user === null ? (\n                    <button onClick={this.props.login}>Login</button>\n                ) : (\n                    <p onClick={this.props.logout}>Logout</p>\n                )}\n                { this.renderSubArea()  }\n            </div>\n        )\n    }\n}\n\nexport default Hoc(["user"], ["login"])(App, SubPage);'))}],["/autobind",function(){return r.a.createElement("section",{name:"autobind",className:"autobind"},r.a.createElement("h1",null,"Autobind"),r.a.createElement("h2",null,"Introduction"),r.a.createElement("p",null,r.a.createElement("b",null,"Autobind")," is a feature for ",r.a.createElement("i",null,"lazy")," developpers \ud83d\ude0b, to avoid the ",r.a.createElement("code",null,"method.bind(this)")," declaration in the component constructor."),r.a.createElement("h2",null,"Usage"),r.a.createElement(S,null,"import React from 'react'\n\nimport { autobind } from 'reactizy'\n\nclass Page extends React.Component {\n    constructor(props) {\n        this.state = { foo: 'bar' }\n\n        autobind.call(this)\n    }\n\n    onClickBindThis() {\n        // do some stuff\n    }\n\n    onSubmitBindThis(e) {\n        // do some stuff\n    }\n\n    render() {\n        return (\n            <section className=\"page\">\n                <form onSubmit={this.onSubmit}>\n                    // rest of the form\n                </form>\n\n                <button onClick={this.onClick}>Click me<button>\n            </section>\n        )\n    }\n}\n\nexport default Page"))}]]),N=function(){var e=Object(a.useState)(!1),t=Object(c.a)(e,2),n=t[0],o=t[1];return r.a.createElement("div",{className:"App"},r.a.createElement(k,{toggleMenu:function(){return o(!n)}}),r.a.createElement("div",{className:"wrapper"},r.a.createElement(d,{open:n,closeMenu:function(){return o(!1)}}),r.a.createElement("div",{className:"content"},r.a.createElement(w.c,null,z.map((function(e){return r.a.createElement(w.a,{path:e[0],component:e[1]})})),r.a.createElement(w.a,{component:H})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u.a,null,r.a.createElement(N,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},82:function(e,t,n){e.exports=n(332)},87:function(e,t,n){},91:function(e,t,n){},94:function(e,t,n){},96:function(e,t,n){},97:function(e,t,n){}},[[82,1,2]]]);
//# sourceMappingURL=main.860be50d.chunk.js.map