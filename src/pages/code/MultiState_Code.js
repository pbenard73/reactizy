export default `import React from 'react'

import { useMultiState } from 'reactizy'

const Page = () => {
    const [person, setPerson, tableCount, setTableCount] = useMultiState(0, 5)
    
    return (
          <section className="page">
            <p>xxxx</p>
          </section>
      )
}

export default Page`
