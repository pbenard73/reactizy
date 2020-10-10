import fusion from './../src/fusion'

test('fusion should merge 2 classes', () => {
    class Sub {
        state = {
            sub: true
        }

        param = true

        reduxers = []

        methodSub() {}
    }

    const sub = new Sub()

    class Main {
        constructor() {
            this.state = {one:true}
            fusion.call(this, sub)
        }

        methodOne() {}
    }

    const main = new Main()

    expect(main.state.sub).toBe(true)
    expect(main.reduxers).toBe(undefined)
    expect(typeof main.methodSub).toBe('function')
    expect(main.param).toBe(true)
});

