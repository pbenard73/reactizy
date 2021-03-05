export default `/* src/reduxers/restaurant.js */
import { staty } from 'reactizy'

class RestaurantReducer {
    state = {
        places: 0,
        tables: 0,
        chairs: 0
    }

    actions = staty('places', 'tables', 'chairs')

    thunks = {
        asyncPlaces: number => dispatch => setTimeout(() => dispatch('restaurant.setPlaces', number), 2000)
    }
}

export default new RestaurantReducer()`
