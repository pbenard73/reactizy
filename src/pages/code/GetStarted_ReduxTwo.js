export default `/* src/reduxers/receipe.js */
class ReceipeReducer {
    state = {
        receipeToCook: 0
    }

    actions = {
        increment: state => ({ ...state, receipeToCook: state.receipeToCook + 1}),
        decrement: state => ({ ...state, receipeToCook: state.receipeToCook - 1}),
        addToCook: (state, number) => ({ ...state, receipeToCook: state.receipeToCook + number})
    }
}

export default new ReceipeReducer()`
