import map from './../src/map'

test('map result should return an array', () => {
    const result = map([1,2,null, undefined], item => item)

    expect(typeof result).toBe('object')
});

