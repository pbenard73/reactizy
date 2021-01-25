export default `/* src/reduxers/login.js */
class LoginReducer {
    state = {
        user: null
    }

    actions = {
        login: (state, user) => ({ ...state, user: user }),
        logout: state => ({ ...state, user: null }),
    }
}

export default new LoginReducer()`
