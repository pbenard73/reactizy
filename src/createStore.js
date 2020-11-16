import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import reduxer from "./reduxer"

export default (...args) => {
    if (args[args.length - 1] === true) {
        args.pop()

        return createStore(reduxer(...args), applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    }

    return createStore(reduxer(...args), applyMiddleware(thunk))
}
