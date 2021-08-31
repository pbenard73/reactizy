import src_autobind from "./autobind"
import src_fusion from "./fusion"
import highOrderComponent from "./highOrderComponent"
import src_hocBuilder from './hocBuilder'

export const reactizy = function (...args) {
    src_fusion.call(this, ...args)
    src_autobind.call(this)
}

export const hocBuilder = src_hocBuilder

export const autobind = src_autobind

export const fusion = src_fusion

export const withReactizy = highOrderComponent

