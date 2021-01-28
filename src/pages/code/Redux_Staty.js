export default `/* src/reduxers/ecolo.js */
import { staty } from 'reactizy'

class EcoloReducer {
    state = {
        fruit: 'apple',
        tree: 'oak',
        vegetable: 'salade',
    }

    actions = {
	    ...staty('fruit', 'tree'),
	    vegetable: staty('vegetable')
    }
}

export default new EcoloReducer()


/* This Will generate */

actions = {
    setFruit: (state, fruit) => ({...state, fruit}),
    setTree: (state, tree) => ({...state, tree}),
    setVegetable: (state, vegetable) => ({...state, vegetable})
}`
