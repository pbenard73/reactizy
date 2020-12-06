import React from "react"
import Store from "./../src/Store"

test("Should return Store", () => {
    const SimpleStore = <Store />
    expect(typeof SimpleStore).toBe("object")
})
