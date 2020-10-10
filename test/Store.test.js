import React from "react"
import Store from "./../src/Store"

test("Should return Store", () => {
    const SimpleStore = <Store reduxers={[]} apis={[]} />
    expect(typeof SimpleStore).toBe("object")

    const NoApiStore = <Store reduxers={[]} />
    expect(typeof NoApiStore).toBe("object")
})
