import Api, { getOptions } from './../src/Api'

const routeOne = 'myurl'
const routeTwo = {path:'/url'}
const routeThree = {path: '/url', domain:'domain'}
const routeFour = {path: '/url/:param', domain:'domain'}

test('Api url(string) should return given string', () => {
    const url = Api.url('mystring')

    expect(url).toBe('mystring')
});

test('Api url route object without domain and no query to be its path', () => {
    const url = Api.url(routeTwo)

    expect(url).toBe(routeTwo.path)
});

test('Api url route object with domain and no query to be its path', () => {
    const url = Api.url(routeThree)

    expect(url).toBe(routeThree.domain + routeThree.path)
});

test('Api url route object without domain and query to fit its params', () => {
    const url = Api.url(routeFour, {param: 'one', query:'two', other:'third'})

    expect(url).toBe('domain/url/one?other=third&query=two')
});

test('Route with full feature should return the given Feature', () => {
    const options = [
        {path: '/myPath/:param', domain:'myDomain', method: 'post', body:{bo:'dy'}},
        {param: 'myParam', query: 'urlquery'},
        {form:'mydata'},
        {
            headers: {'token': 'mytoken'},
            extraToken: 'extraToken'
        }
    ]

    const requestOptions = getOptions(...options)

    expect(typeof requestOptions).toBe('object')
    expect(requestOptions.headers !== undefined).toBe(true)
    expect(requestOptions.headers['token']).toBe('mytoken')
    expect(requestOptions.method).toBe('post')
    expect(requestOptions.extraToken).toBe('extraToken')
    expect(requestOptions.url).toBe('myDomain/myPath/myParam?query=urlquery')
    expect(requestOptions.data.bo).toBe('dy')
    expect(requestOptions.data.form).toBe('mydata')
})


test('Api call shoudl return a promise', () => {
    Api.call('/')
    .finally(() => {
    expect(Api.call).toHaveBeenCalled()
    })
})

test('Api call shoudl return a promise', () => {
    Api.call('https://jsonplaceholder.typicode.com/todos/1')
    .finally(() => {
    expect(Api.call).toHaveBeenCalled()
    })
})


