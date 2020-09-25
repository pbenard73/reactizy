import each from './each'

export default (domain, apiPool) => {
    let pool = {}

    _.each(Object.keys(apiPool), item => {
        pool[item] = {...apiPool[item], domain}
    })

    return pool
}
