import SrcStore from "./Store"
import src_autobind from "./autobind"
import src_domainize from "./domainize"
import src_fusion from "./fusion"
import highOrderComponent from "./highOrderComponent"
import src_reduxer from "./reduxer"
import store from "./createStore"
import src_hocBuilder from "./hocBuilder"
import src_hookBuilder from "./hookBuilder"
import simplyState from "./simplyState"
import src_hocCreator from "./hocCreator"
import src_createCombine from "./createCombine"
import src_useMultiState from './useMultiState'

export const reactizy = function (...args) {
    src_fusion.call(this, ...args)
    src_autobind.call(this)
}

export const staty = simplyState

export const autobind = src_autobind

export const domainize = src_domainize

export const fusion = src_fusion

export const withReactizy = highOrderComponent

export const reduxer = src_reduxer

export const Store = SrcStore

export const createStore = store

export const hocBuilder = src_hocBuilder

export const hookBuilder = src_hookBuilder

export const hocCreator = src_hocCreator

export const combine = src_createCombine

export const useMultiState = src_useMultiState
