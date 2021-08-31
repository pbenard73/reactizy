export default `import React from 'react'
import useReactizy from './../hooks/useReactizy'

const Compo = props => {
    const _ = useReactizy()

    let [apiCalling, apiData, apiError] = _.useApi('mainRoute')

    if (apiCalling === true) {
        return <div>Api calling</div>
    }

    if (apiError) {
      return <div>An error occured</div>
    }

    return (
        <div className="my-compo">
            {apiData}
        </div>
    )
}

export default Compo`
