export default `import React from "react";
import Hoc from "./hocs/Hoc";

class MyComponent extends React.Component {
    onClickBindThis() {
        this.props.restaurant.setTables(window.prompt('Number of Tables ?'))
    }

    render {
        return (
            <div className="App">
                <button onClick={this.onClick}>Change Tables Number</button>

                <p> There are {this.props.restaurant.tables} tables. </p>
            </div>
        )
    }
}     

export default Hoc('restaurant')(MyComponent)`
