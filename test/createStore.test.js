import createStore from './../src/createStore'

test('createStore', () => {
    const oneStore = new (class {
        state = {
            one: 1
        }

        actions = {}
    })()

    const twoStore = new (class {
        state = {
            two: 2
        }

        actions = {}
    })()

    const store = createStore([oneStore, twoStore])
        

    expect(typeof store).toBe('object')
    expect(typeof store.getState).toBe('function')
});

