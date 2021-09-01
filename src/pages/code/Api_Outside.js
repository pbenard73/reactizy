export default `// reduxers/main.js'
import { Api, staty } from 'reactizy'
import apiPool from './../apis/main'

const mainReduxer = {
  state: {
    data: null
  },
  actions: staty('data'),
  thunks: {
    callData: async (dispatch, getState) => {
      const data = await Api.call(apiPool.myRoute)
      dispatch('setData', data)
    }
  }
}
`
