import React from "react"

import GetAppIcon from "@material-ui/icons/GetApp"
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet"
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import SchoolIcon from "@material-ui/icons/School"
import BuildIcon from "@material-ui/icons/Build"
import GavelIcon from "@material-ui/icons/Gavel"

import useWindows from "./../hooks/useWindows"
import Icon from "./../components/DashboardIcon"

import "./../styles/Dashboard.scss"

const Dashboard = () => {
    const windowManager = useWindows()

    return (
        <div className='dashboard'>
            <div className='hero'>
                <h1>Reactizy</h1>
                <h2>blabla</h2>
                <small>v7.0.0</small>
            </div>
            <div className='icon_board'>
                <Icon icon={GetAppIcon} label={"Installation"} onClick={windowManager.showInstall} />
                <Icon icon={SchoolIcon} label={"Get Started Hook"} onClick={windowManager.showGetStartedHook} />
                <Icon icon={SchoolIcon} label={"Get Started HOC"} onClick={windowManager.showGetStarted} />
                <Icon icon={SettingsEthernetIcon} label={"Api"} onClick={windowManager.showApi} />
                <Icon icon={AccountTreeIcon} label={"Combined Reduxer"} onClick={windowManager.showCombined} />
                <Icon icon={GavelIcon} label={"Class component utils"} onClick={windowManager.showClassTools} />
                <Icon icon={BuildIcon} label={"Functionnal component tools"} onClick={windowManager.showFuncTools} />
            </div>
        </div>
    )
}

export default Dashboard
