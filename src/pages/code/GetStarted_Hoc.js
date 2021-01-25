export default `/* src/hocs/Hoc.js */
import { hocBuilder } from 'reactizy'
import { withRouter } from 'react-dom-router'
import { withAlert } from 'react-alert'
import login from './../reduxers/login'
import receipe from './../reduxers/receipe'
import api from './../api/main.js'

export default hocBuilder({
    apis: [api],
    reduxers: [login, receipe],
    hocs: {
        alert: withAlert(),
        router: withRouter
    },
    thunks: {
        complexLogin: user => (dispatch, getState, user) => {
            setTimeout(() => dispatch('login', user), 2000)
        }
    },
    customs: {
        sayHello: function(name) {
            window.alert(\`Hello $\{name}\`)
        }
    }
)`
