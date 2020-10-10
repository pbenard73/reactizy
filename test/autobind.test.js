import autobind from "./../src/autobind"

test("autobind shoudl convert *BindThis methods to cleaned methods", () => {
    class MyTest {
        constructor() {
            autobind.call(this)
        }

        getMyNumberBindThis() {
            return 5
        }
    }

    const tester = new MyTest()

    expect(tester.getMyNumber !== undefined).toBe(true)

    expect(tester.getMyNumber?.() || undefined).toBe(5)
})
