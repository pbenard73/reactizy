import React from "react"
import hocBuilder from "./../src/hocBuilder"
import hocCreator from "./../src/hocCreator"

test("HocCreator should return a function", () => {
    const HocFilled = hocBuilder({
        customs: {
            method: type => alert(type),
            another: [test => alert(test), ["state"], ["action"]],
        },
    })

    const MyComponent = props => <div></div>

    const Compo = HocFilled("method")(MyComponent)

    expect(typeof Compo).toBe("function")
})
