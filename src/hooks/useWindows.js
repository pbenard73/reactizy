import React from "react"

import useReactizy from "./useReactizy"

import Api from "./../pages/Api"
import Combined from "./../pages/Combined"
import GetStarted from "./../pages/GetStarted"
import Install from "./../pages/Install"
import Autobind from "./../pages/Autobind"
import MultiState from "./../pages/MultiState"

const useWindow = () => {
    const _ = useReactizy()

    const showFuncTools = () => {
        _.addWindow({
            uuid: "funcools",
            title: "Functionnal Components Tools",
            component: <MultiState />,
            center: true,
            options: {
                size: [600, 485],
                minSize: [600, 485],
            },
        })
    }

    const showClassTools = () => {
        _.addWindow({
            uuid: "classtools",
            title: "Class Components Tools",
            component: <Autobind />,
            center: true,
            options: {
                size: [600, 485],
                minSize: [600, 485],
            },
        })
    }

    const showInstall = () => {
        _.addWindow({
            uuid: "install",
            title: "Installation",
            component: <Install />,
            center: true,
            options: {
                size: [400, 185],
                minSize: [400, 185],
                resizable: false,
            },
        })
    }

    const showGetStartedHook = () => {
        _.addWindow({
            uuid: "get_started_hook",
            title: "Get Started with hook",
            component: <GetStarted />,
            center: true,
            options: {
                size: [600, 350],
                minSize: [600, 350],
            },
        })
    }

    const showGetStarted = () => {
        _.addWindow({
            uuid: "get_started",
            title: "Get Started with HOC",
            component: <GetStarted />,
            center: true,
            options: {
                size: [600, 350],
                minSize: [600, 350],
            },
        })
    }

    const showApi = () => {
        _.addWindow({
            uuid: "api",
            title: "Api",
            component: <Api />,
            options: {
                size: [600, 350],
                minSize: [600, 350],
            },
        })
    }

    const showCombined = () => {
        _.addWindow({
            uuid: "combined",
            title: "Combined Reduxer",
            component: <Combined />,
            options: {
                size: [600, 350],
                minSize: [600, 350],
            },
        })
    }

    return {
        showApi,
        showClassTools,
        showCombined,
        showFuncTools,
        showGetStarted,
        showGetStartedHook,
        showInstall,
    }
}

export default useWindow
