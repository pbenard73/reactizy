import { useState, useEffect } from "react"

function useMultiState(...defaultValues) {
    const [state, setState] = useState(
        defaultValues
            .map((_, index) => [
                defaultValues[index],
                newValue =>
                    setState(currentState => [...currentState].map((value, i) => (i === index * 2 ? newValue : value))),
            ])
            .flat()
    )

    return state
}

export default useMultiState
