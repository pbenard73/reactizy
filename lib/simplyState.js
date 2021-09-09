import each from './each'

const simplyState = (...stateKeys) => {
    if (stateKeys.length === 2 && stateKeys[stateKeys.length - 1] === true) {
        return (state, value) => { state[stateKey[0]] = value}
    }

    return Object.fromEntries(stateKeys.map(stateKey => [`set${stateKey[0].toUpperCase()}${stateKey.substr(1)}`, (state, value) => { state[stateKey] = value}]))
}

export default simplyState
