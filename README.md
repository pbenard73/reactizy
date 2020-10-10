[![Codecov Coverage](https://img.shields.io/codecov/c/github/pbenard73/reactizy.svg?style=flat-square)](https://codecov.io/gh/pbenard73/reactizy/)


# Reactizy

 [Documentation https://pbenard73.github.io/reactizy/](https://pbenard73.github.io/reactizy/)

## Description

**Reactizy**  is a React High Order Component and a toolkit allowing to

* Simplify to use of react-redux
* Providing asynchronous reducers
* Split react components in order to have a better readability
* Call api with simply library
... and some usefull utilities.

## Get Started

### Create your High Order Component

Register here your wanted HOC with their shortname. Be careful of unicity of the shortnames. It shouldn't be present in the reduxers pool and actions.

Here is an example with `withRouter` from `react-router-dom` and `withAlert` from `react-alert` packages.

```js
/* src/hocs/Hoc.js*/
import { hocBuilder } from 'reactizy'

import { withRouter } from 'react-dom-router'
import { withAlert } from 'react-alert'

export default hocBuilder({
    alert: withAlert(),
    router: withRouter
})
```

### Create the reduxers

Register the reduxers you need to use

```js
/* src/reduxers/people.js*/
class PeopleReducer {
    state = {
        peopleNumber: 0
    }

    actions: {
        addPerson: state => { return { ...state, peopleNumber: state.peopleNumber + 1 }},
        setPeopleNumber: (state, peopleNumber) => return { ...state, peopleNumber}},
        updatePeopleAsync: (...args) => new Promise((resolve, reject) => {
            resolve({peopleNumber: 10})
        })        
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

### Create your Api routing files

```js
/* src/api/main.js*/
export default {
    mainRoute: {path:'/my_main_route'},
    postRoute: {path:'/my_post_route'},
    customDomain: {path:'/my_other_route', domain:'http://mydomain.com'}, 
    paramRoute: {path:'/my_other_route/:myParam', domain:'http://mydomain.com'},
}
```

### Implement you application

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Store } from 'reactizy'
import mainApi from './api/main'
import people from './reduxers/people'
import animals from './reduxers/animals'

ReactDOM.render(
  <React.StrictMode>
    <Store reduxers={[people, animal]} apis={[mainApi]}>
    <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Use in Component

```js
import React from "react";

import Hoc from "./hocs/Hoc";

class MyComponent extends React.Component {
    addPersonBindThis() {
        this.props.addPerson()
    }

    addMultiplePeopleBindThis() {
        this.props.updatePeopleAsync()
        .then(() => this.props.alert.success('Update Successfull'))
        .catch(() => this.props.history.push('/'))
    }

    callApiBindThis() {
        this.props.api.call('mainRoute')
        .then(data => this.props.alert.success('Success'))
        .catch(error => this.props.alert.error('Error occured'))
    }

    render {
        return (
            <div className="App">
                <p> There are {this.props.peopleNumber} people </p>
                <button onClick={this.addPerson}>Add people</button>
                <button onClick={this.addMultiplePeople}>Update People</button>
            </div>
        )
    }
}     

const uses = ['alert', 'router']
const reduxers = [ ["peopleNumber"], ["addPerson", "updatePeopleAsync"] ]

export default Hoc(uses, reduxers)(App)
```
