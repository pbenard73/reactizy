(this.webpackJsonpreactizy_doc=this.webpackJsonpreactizy_doc||[]).push([[0],{329:function(e,n,t){},330:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(10),o=t.n(l),c=(t(86),t(349)),i=t(357),m=t(37),s=t(68),u=(t(89),t(90),[["/","Home"],["/get-started","Get Started"],["/redux-and-reduxers","Redux and Reduxers"],["/splitter","Splitter"],["/autobind","Autobind"]]),p=function(){return r.a.createElement("div",{className:"sidebar"},r.a.createElement(c.a,null,u.map((function(e){return r.a.createElement(i.a,null,r.a.createElement(m.b,{to:e[0]},r.a.createElement(s.AwesomeButton,null,e[1])))}))))},d=t(358),E=t(351),h=t(352),f=t(355),b=t(353),x=t(73),A=t.n(x),g=(t(93),function(){return r.a.createElement(d.a,{className:"topbar",position:"fixed"},r.a.createElement(E.a,null,r.a.createElement(h.a,{variant:"h5",noWrap:!0},"Reactizy"),r.a.createElement("div",null,r.a.createElement(f.a,{title:"Show on Github",placement:"bottom"},r.a.createElement("a",{href:"https://github.com/pbenard73/reactizy"},r.a.createElement(b.a,null,r.a.createElement(A.a,null)))))))}),R=t(6),N=(t(95),function(){return r.a.createElement("section",{name:"homepage"},r.a.createElement("h1",null,"Reactizy"),r.a.createElement("p",null,r.a.createElement("b",null,"Reactizy")," is a toolkit allowing to simplify to use of ",r.a.createElement("b",null,"react-redux")," and permitting to split react component in order to have a better readability, with some usefull utilities"))}),w=t(356),y=t(354),v=function(e){return r.a.createElement(w.a,{language:"javascript",style:y.a},e.children)},S=function(){return r.a.createElement("section",{name:"get started",className:"get_started"},r.a.createElement("h2",null,"Prerequisites"),r.a.createElement("h2",null,"Installation"),r.a.createElement(v,null,"npm install --save reactizy"))},P=function(){return r.a.createElement("section",{name:"get started",className:"get_started"},r.a.createElement("h1",null,"Redux and Reduxers"),r.a.createElement("h2",null,"Reduxers Creation"),r.a.createElement(v,null,"/* src/reduxers/people.js*/\nclass PeopleReducer {\n    state = {\n        peopleNumber: 0\n    }\n\n    actions: {\n        addPerson: state => { return { ...state, peopleNumber: state.peopleNumber + 1 }},\n        setPeopleNumber: (state, peopleNumber) => return { ...state, peopleNumber}}\n    }\n}\n\nexport default new PeopleReducer()"),r.a.createElement(v,null,"// src/reduxers/animal.js\nclass AnimalReducer {\n    state = {\n        animals: []\n    }\n\n    actions: {\n        addAnimal: (state, animal) => { return { ...state, animals: [...animals, animal] }},\n    }\n}\n\nexport default new AnimalReducer()"),r.a.createElement("h2",null,"Store Creation"),r.a.createElement(v,null,"// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\nimport * as serviceWorker from './serviceWorker';\n\nimport { Store } from 'reactizy'\n\nimport people from './reduxers/people'\nimport animals from './reduxers/animals'\n\nReactDOM.render(\n  <React.StrictMode>\n    <Store reduxers={[people, animal]} >\n    <App />\n    </Store>\n  </React.StrictMode>,\n  document.getElementById('root')\n);"),r.a.createElement("h2",null,"Usage in Components"),r.a.createElement(v,null,'import React from "react";\n\nimport { withReactizy } from "reactizy";\n\nfunction App(props) {\n    return (\n        <div className="App">\n            <p> There are {props.peopleNumber} people </p>\n            <button onClick={props.addPerson}>Add people</button>\n        </div>\n    );  \n}     \n    \nApp.reduxers = [ ["peopleNumber"], ["addPerson"] ]\n\nexport default withReactizy(App);'))},z=function(){return r.a.createElement("section",{name:"autobind",className:"autobind"},r.a.createElement("h1",null,"Autobind"),r.a.createElement("h2",null,"Introduction"),r.a.createElement("h2",null,"Usage"),r.a.createElement(v,null,"import React from 'react'\n\nimport { autobind } from 'reactizy'\n\nclass Page extends React.Component {\n    constructor(props) {\n        this.state = { foo: 'bar' }\n\n        autobind.call(this)\n    }\n\n    onClickBindThis() {\n        // do some stuff\n    }\n\n    onSubmitBindThis(e) {\n        // do some stuff\n    }\n\n    render() {\n        return (\n            <section className=\"page\">\n                <form onSubmit={this.onSubmit}>\n                    // rest of the form\n                </form>\n\n                <button onClick={this.onClick}>Click me<button>\n            </section>\n        )\n    }\n}\n\nexport default Page"))},k=function(){return r.a.createElement("section",{name:"splitter",className:"splitter"},r.a.createElement("h1",null,"Splitter"),r.a.createElement("h2",null,"Introduction"),r.a.createElement(v,null,"// src/partials/SubPage.js\n\nclass SubPage {\n    state = { currentAnimal: null  }\n\n    reduxers = [ ['animals'], ['addAnimal'] ]\n\n    // See the autobind tool\n    addAnimalBindThis(animal) {\n        this.props.addAnimal(animal)\n    }\n\n    renderAnimal() {\n        return (\n            <section className=\"my_animals\">\n                <button onClick={() => this.addAnimal(window.prompt())}>\n                    Add Animal\n                </button>\n                <ul>\n                    {this.props.animals.map(animal => <li>{ animal }</li>}\n                </ul>\n            </section>\n        )\n    }\n}\n\nexport default new SubPage()"),r.a.createElement(v,null,'// src/App.js\n\nimport React from "react";\n\nimport SubPage from \'./partials/SubPage\'\n\nimport { withReactizy } from "reactizy";\n\nclass App extends React.Component {\n    constructor(props) {\n        super(props)\n\n        this.state = { foo: \'bar\' }\n    }\n\n    render() {\n        return (\n            <div className="App">\n                <p> There are {props.peopleNumber} people </p>\n                <button onClick={props.addPerson}>Add people</button>\n                { this.renderAnimal()  }\n            </div>\n        );\n    }\n}\n\nApp.reduxers = [ ["peopleNumber"], ["addPeople"] ]\n\nexport default withReactizy(App, SubPage);'))};t(329);var C=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(g,null),r.a.createElement(m.a,null,r.a.createElement("div",{className:"wrapper"},r.a.createElement(p,null),r.a.createElement("div",{className:"content"},r.a.createElement(R.c,null,r.a.createElement(R.a,{path:"/",exact:!0,component:N}),r.a.createElement(R.a,{path:"/get-started",exact:!0,component:S}),r.a.createElement(R.a,{path:"/redux-and-reduxers",exact:!0,component:P}),r.a.createElement(R.a,{path:"/splitter",exact:!0,component:k}),r.a.createElement(R.a,{path:"/autobind",exact:!0,component:z}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},81:function(e,n,t){e.exports=t(330)},86:function(e,n,t){},90:function(e,n,t){},93:function(e,n,t){},95:function(e,n,t){}},[[81,1,2]]]);
//# sourceMappingURL=main.3c21c1f2.chunk.js.map