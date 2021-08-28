import React from "react"
import "./../styles/Decor.scss"

const Decor = () => (
    <>
        {new Array(25).fill(0).map((_, i) => (
            <div key={i} id={`move${i}`} className='move'></div>
        ))}
        <div id='secondFloor' style={{ backgroundImage: "url(/reactizy/bg1.png)" }}>
        </div>
        <div id='thirdFloor' style={{ backgroundImage: "url(/reactizy/bg2.png)" }}>
        </div>
    </>
)

export default Decor
