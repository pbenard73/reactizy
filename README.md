# Reactizy

## Description

**Reactizy** is a toolkit allowing to simplify to use of *react-redux* and permitting to split *react component* in order to have a better readability, with some usefull utilities

## Summary

* [Using Redux and Reducers](#using-redux-and-reducers)
    * [Store and Reduxers Creation](#store-and-reduxers-creation)
        * [Reducers Creation](#reducers-creation)
        * [Store Creation](#store-creation)
        * [Usage in Component](#usage-in-component)
    * [Custom Store with Reactizy Reduxers](#custom-store-with-reactizy-reduxers)
* [React Component Spliting](#react-component-spliting)
* [Autobind React Methods](#autobind-react-methods)

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
    
const reduxers = [ ["peopleNumber"], ["addPeople"] ]

export default withReactizy(App, reduxers);
```

```js
import React from "react";

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
            </div>
        );  
    }
}     
    
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

*The two methods need to be called at the end of the main component's constructor with : `fusion.call(this, // OnePartialComponent, AnotherOne, AndAnotherOne)`*

*Let's create a partial component *

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

import { withReactizy, reactizy } from "reactizy";

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


