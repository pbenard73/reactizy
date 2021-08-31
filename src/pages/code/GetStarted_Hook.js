export default `/* src/hooks/useReactizy.js */
import hookBuilder from 'reactizy/core/hookBuilder'
import login from './../reduxers/login'
import receipe from './../reduxers/receipe'
import api from './../api/main.js'

const useReactizy = hookBuilder({
    apis: [api],
    reduxers: [login, receipe],

    /**
     * This options can be given
     */
    /*
    options: {
      bindAll: true // Will bind every thing to the hoc, no need to pass args,
      name: 'call' // The dispatch function name provided by the hoc
      apiHook: 'useApi' // The method to instanciate the api hook
    }
    */
})

export default useReactizy`
