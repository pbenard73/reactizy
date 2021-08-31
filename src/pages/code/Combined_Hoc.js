export default `/* src/hocs/Hoc.js */
import { combine } from 'reactizy'
import { hocBuilder } from 'reactizy/core/class'
import restaurant from './../reduxers/restaurant'
import receipe from './../reduxers/receipe'
import api from './../api/main.js'

export default hocBuilder({
    apis: [api],
    reduxers: [combine('restaurant', restaurant), receipe],
    hocs: {
        alert: withAlert(),
        router: withRouter
    },
)`
