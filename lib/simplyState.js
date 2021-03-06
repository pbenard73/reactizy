import each from './each'

const simplyState = (...stateKeys) => {
    if (stateKeys.length === 2 && stateKeys[stateKeys.length - 1] === true) {
        return (state, value) => ({...state, [stateKey[0]]: value})
    }

    let pool = {}

    each(stateKeys, stateKey => {
        const name = `set${stateKey[0].toUpperCase()}${stateKey.substr(1)}`
        pool[name] = (state, value) => ({...state, [stateKey]: value})
    })

    return pool
}

export default simplyState
