import { createStore } from 'redux'

const reducer = (state, action) => {
    return state
}

const store = createStore(
    reducer, {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export default store