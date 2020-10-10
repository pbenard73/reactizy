import each from './../src/each'

test('each should loop over given array', () => {
    let count = 0

    each([1,2,null, undefined], item => count++)

    expect(count).toBe(4)
});

