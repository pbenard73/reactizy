import SrcStore from "./Store"
import src_autobind from "./autobind"
import src_fusion from "./fusion"
import highOrderComponent from "./highOrderComponent"
import src_reduxer from "./reduxer"
import store from "./store"

export const reactizy = function(...args) { src_fusion.call(this, ...args); src_autobind.call(this)}

export const autobind = src_autobind

export const fusion = src_fusion

export const withReactizy = highOrderComponent

export const reduxer = src_reduxer

export const Store = SrcStore

export const createStore = store
