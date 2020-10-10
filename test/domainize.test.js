import domainize from './../src/domainize'

test('domainize should add domain key to each given pool objects', () => {
    const pool = {
        one: {name:'one'},
        two: {name:'two'}
    }

    const newPool = domainize('mydomain', pool)

    expect(typeof newPool.one).toBe('object')
    expect(typeof newPool.two).toBe('object')
    expect(newPool.one.domain).toBe('mydomain')
    expect(newPool.two.domain).toBe('mydomain')
    expect(newPool.one.name).toBe('one')
    expect(newPool.two.name).toBe('two')
});

