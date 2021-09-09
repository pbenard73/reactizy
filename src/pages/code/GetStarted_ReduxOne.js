export default `/* src/reduxers/login.js */
class LoginReducer {
    state = {
        user: null
    }

    actions = {
        login: (state, user) => { state.user = user },
        loginFull: (state, lastname, firstname) => { state.user = \`$\{lastname} $\{firstname}\`},
        logout: state => { state.user = null }),
    }

    thunks = {
        loginAsync: (dispatch, getState, username) => {
          setTimeout(() => {
            dispatch('login', username)
          }, 1000)
        }
    }
}

export default new LoginReducer()`
