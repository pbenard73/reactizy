export default `import React from 'react'
import { withReactizy } from 'reactizy/core/class'

const Compo = props => {
    const click = () => {
        props.api.call('mainRoute')
        .then(response => {})
        .catch(error => console.log(error))
    }

    return (
        <div className="my-compo">
            <button onClick={click}>my api trigger</button>
        </div>
    )
}

export default withReactizy(Compo)`
