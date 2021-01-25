export default `import React from 'react'

import { autobind } from 'reactizy'

class Page extends React.Component {
    constructor(props) {
        this.state = { foo: 'bar' }

        autobind.call(this)
    }

    onClickBindThis() {
        // do some stuff
    }

    onSubmitBindThis(e) {
        // do some stuff
    }

    render() {
        return (
            <section className="page">
                <form onSubmit={this.onSubmit}>
                    // rest of the form
                </form>

                <button onClick={this.onClick}>Click me<button>
            </section>
        )
    }
}

export default Page`
