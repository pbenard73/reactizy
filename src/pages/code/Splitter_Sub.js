export default `// src/partials/SubPage.js

class SubPage {
    state = { partCount: 0  }

    hoc = ['receipeToCook', 'decrement', 'logout'] 

    incrementPartCountBindThis() {
        this.setState({partCount: this.state.partCount + 1})
    }

    renderSubArea() {
        return (
            <section>
                <button onClick={this.incrementPartCount}>Increment {this.state.partCount}</button>
    
                <button onClick={this.props.decrement}>
                    Decrement Receipes   
                </button>
            </section>
        )
    }
}

export default new SubPage()`
