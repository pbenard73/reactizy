export default `/* src/hocs/Hoc.js */
import { hocBuilder } from 'reactizy/core/class'
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
    customs: {
        sayHello: function(name) {
            window.alert(\`Hello $\{name}\`)
        }
    },

    /**
     * This options can be given
     */
    /*
    options: {
      bindAll: true // Will bind every thing to the hoc, no need to pass args,
      name: 'call' // The dispatch function name provided by the hoc
    }
    */
)

`
