import each from "./each"

export default (domain, apiPool) =>  Object.fromEntries(Object.keys(apiPool).map(item => [item, {...apiPool[item], domain}]))

