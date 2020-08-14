# Reactizy

## Description

**Reactizy** is a toolkit allowing to simplify to use of *react-redux* and permitting to split *react component* in order to have a better readability, with some usefull utilities

## Summary
* [Installation](#installation)
* [Usage](#usage)
    * [Using Redux and Reducers](#using-redux-and-reducers)
        * [Store and Reduxers Creation](#store-and-reduxers-creation)
            * [Reducers Creation](#reducers-creation)
            * [Store Creation](#store-creation)
            * [Usage in Component](#usage-in-component)
        * [Custom Store with Reactizy Reduxers](#custom-store-with-reactizy-reduxers)
    * [React Component Spliting](#react-component-spliting)
        * [Full merge with Reduxers](#full-merge-with-reduxers)
        * [Simple merge without Reduxers](#simple-merge-without-reduxers)
    * [Autobind React Methods](#autobind-react-methods)

## Installation

`npm install reactizy`

## Usage

### Using Redux and Reducers

#### Store and Reduxers Creation

##### Reducers creation

* A reduxer is a simple class with a state property correponding to an initial state, and an actions property correponding to an object as key => value, alias methodName => method*

```js
// src/reduxers/people.js
class PeopleReducer {
    state = {
        peopleNumber: 0
    }

    actions: {
        addPerson: state => { return { ...state, peopleNumber: state.peopleNumber + 1 }},
        setPeopleNumber: (state, peopleNumber) => return { ...state, peopleNumber}}
    }
}

export default new PeopleReducer()
```

```js
// src/reduxers/animal.js
class AnimalReducer {
    state = {
        animals: []
    }

    actions: {
        addAnimal: (state, animal) => { return { ...state, animals: [...animals, animal] }},
    }
}

export default new AnimalReducer()
```

##### Store Creation

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Store } from 'reactizy'

import people from './reduxers/people'
import animals from './reduxers/animals'

ReactDOM.render(
  <React.StrictMode>
    <Store reduxers={[people, animal]} >
    <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

```

##### Usage in Component

*To connect with a component, you've to link an array containing two arrays, the first for the state properties, the second one for the actions*

```js
import React from "react";

import { withReactizy } from "reactizy";

function App(props) {
    return (
        <div className="App">
            <p> There are {props.peopleNumber} people </p>
            <button onClick={props.addPerson}>Add people</button>
        </div>
    );  
}     
    
App.reduxers = [ ["peopleNumber"], ["addPeople"] ]

export default withReactizy(App);
```

```js
import React from "react";

import { withReactizy } from "reactizy";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = { foo: 'bar' }
    }


    render() {
        return (
            <div className="App">
                <p> There are {props.peopleNumber} people </p>
                <button onClick={props.addPerson}>Add people</button>
            </div>
        );  
    }
}    

App.reduxers = [ ["peopleNumber"], ["addPeople"] ]
    
export default withReactizy(App);

```

#### Custom Store with Reactizy Reduxers

```js
// src/store/main.js
import { createStore } from 'react-redux'

import { reduxer } from 'reactizy'

import peopleReducer from './../reduxers/people'
import animalReducer from './../reduxers/animals'

export default createStore(reduxer(peopleReducer, animalReducer))
```

### React Component Spliting

***fusion** and **reactizy** are tools to split a component into different parts and merge them*

***fusion** do the merge of the partial component without the *autobind* utility*

***reactizy** do the merge in addition of *autobind* utility.

*The three methods need to be called at the end of the main component's constructor with : `fusion.call(this, // OnePartialComponent, AnotherOne, AndAnotherOne)`*

In order to merge a full partial component (reduxers, state, methods) you need to use the HOC `withReactizy`

### Full merge with Reduxers

*Let's create a partial component *

*The `state` property will be merge inside the main component state*

*If you need to link an redux property or actions, just use the `reduxers` property, an array with two array inside, the first listing the state properties, the second one, the actions*

```js
// src/partials/SubPage.js

class SubPage {
    state = { currentAnimal: null  }

    reduxers = [ ['animals'], ['addAnimal'] ]

    // See the autobind tool
    addAnimalBindThis(animal) {
        this.props.addAnimal(animal)
    }

    renderAnimal() {
        return (
            <section className="my_animals">
                <button onClick={() => this.addAnimal(window.prompt())}>
                    Add Animal
                </button>
                <ul>
                    {this.props.animals.map(animal => <li>{ animal }</li>}
                </ul>
            </section>
        )
    }
}

export default new SubPage()
```

*And merge it inside the main component*

```js
// src/App.js

import React from "react";

import SubPage from './partials/SubPage'

import { withReactizy } from "reactizy";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = { foo: 'bar' }
    }

    static.reduxers = [ ["peopleNumber"], ["addPeople"] ]

    render() {
        return (
            <div className="App">
                <p> There are {props.peopleNumber} people </p>
                <button onClick={props.addPerson}>Add people</button>
                { this.renderAnimal()  }
            </div>
        );
    }
}

export default withReactizy(App, SubPage);
```

### Simple merge without Reduxers

```js
// src/partials/SubPage.js

class SubPage {
    state = { currentAnimal: null  }

    // See the autobind tool
    addAnimalBindThis(animal) {
        this.props.addAnimal(animal)
    }

    renderAnimal() {
        return (
            <section className="my_animals">
                <button onClick={() => this.addAnimal(window.prompt())}>
                    Add Animal
                </button>
                <ul>
                    {this.props.animals.map(animal => <li>{ animal }</li>}
                </ul>
            </section>
        )
    }
}

export default new SubPage()
```

*And merge it inside the main component*

```js
// src/App.js

import React from "react";

import SubPage from './partials/SubPage'

import { reactizy, withReactizy } from "reactizy";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = { foo: 'bar' }

        reactizy.call(this, SubPage)
    }

    static.reduxers = [ ["peopleNumber"], ["addPeople"] ]

    render() {
        return (
            <div className="App">
                <p> There are {props.peopleNumber} people </p>
                <button onClick={props.addPerson}>Add people</button>
                { this.renderAnimal()  }
            </div>
        );
    }
}

export default withReactizy(App);
```

### Autobind React Methods

*Tool to auto bind the methods*

*The `autobind.call(this)` must be set at the end of the constructor*

*When `reactizy` methods is used, the `autobind` method is automatically enabled*

```js
import React from 'react'

import { autobind } from 'reactizy'

class Page extends React.Component {
    constructor(props) {
        this.state = { foo: 'bar' }

        autobind.call(this)
    }

    onClickBindThis() {
        // do some stuff
    }

    onSubmitBindThis(e) {
        // do some stuff
    }

    render() {
        <section className="page">
            <form onSubmit={this.onSubmit}>
                // rest of the form
            </form>

            <button onClick={this.onClick}>Click me<button>
        </section>
    }
}

```


