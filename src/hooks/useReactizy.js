import hookBuilder from "./../core/hookBuilder"
import mainReduxer from "./../reduxers/main"

const useReactizy = hookBuilder({
    reduxers: [mainReduxer],
    options: {
        bindAll: true,
    },
})

export default useReactizy
