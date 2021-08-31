import React from "react"
import { Windows } from "react-windows-dashboard"
import useReactizy from "./../hooks/useReactizy"
import Dashboard from "./Dashboard"

const Screen = () => {
    const _ = useReactizy()

    const dashboard = <Dashboard />

    return (
        <Windows
            order={_.order}
            active={_.active}
            setActive={_.setActive}
            dashboard={dashboard}
            windows={_.windows}
            onClose={_.removeWindow}
        />
    )
}

export default Screen
