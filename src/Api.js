import axios from "axios"

class Api {
    url(route, options = {}) {
        if (typeof route === 'string') {
            return route
        }

        let routePath = (route.domain !== undefined ? route.domain : "") + route.path

        const optionKeys = Object.keys(options)
        let queryParams = []

        for (var i = optionKeys.length - 1; i >= 0; i--) {
            if (routePath.indexOf(optionKeys[i]) !== -1) {
                routePath = routePath.replace(":" + optionKeys[i], options[optionKeys[i]])
            } else {
                queryParams.push(`${optionKeys[i]}=${options[optionKeys[i]].toString()}`)
            }
        }

        if (queryParams.length > 0) {
            routePath += `?${queryParams.join("&")}`
        }

        return routePath
    }

    call(route, options = {}, body = {}, givenExtraOptions = {}) {
        return new Promise((resolve, reject) => {
            const url = this.url(route, options)

            var data = Object.assign(route.body !== undefined ? route.body : {}, body)

            if (body.constructor !== undefined && body.constructor.name === "FormData") {
                data = body
            }

            var extraOptions = { ...givenExtraOptions }
            var headers = {}
            var method = route.method !== undefined ? route.method.toLowerCase() : "get"

            if (["post", "put", "delete"].indexOf(method) === -1) {
                headers["Content-Type"] = "application/x-www-form-urlencoded"
            }

            if (givenExtraOptions.headers !== undefined) {
                headers = { ...headers, ...givenExtraOptions.headers }
                extraOptions.headers = undefined
            }

            const requestData = {
                url,
                method,
                headers,
                data,
                withCredentials: true,
                ...extraOptions,
            }

            return axios
                .request(requestData)
                .then(response => {
                    if ([200, 201].indexOf(response.status) === -1) {
                        response.message = response.data.status

                        return reject(response)
                    }

                    return resolve(response.data)
                })
                .catch(error => reject(error))
        })
    }
}

export default new Api()
