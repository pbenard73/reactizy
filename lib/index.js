import src_api from "./Api"
import SrcStore from "./Store"
import src_domainize from "./domainize"
import src_reduxer from "./reduxer"
import store from "./createStore"
import simplyState from "./simplyState"
import src_hocCreator from "./hocCreator"
import src_createCombine from "./createCombine"
import src_useMultiState from './useMultiState'

export const Api = src_api

export const staty = simplyState

export const domainize = src_domainize

export const reduxer = src_reduxer

export const Store = SrcStore

export const createStore = store

export const hocCreator = src_hocCreator

export const combine = src_createCombine

export const useMultiState = src_useMultiState
