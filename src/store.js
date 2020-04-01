import { createStore } from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case "GET_AVATAR": {
            { state.avatar = action.avatar };
            break
        };
        case "DISPLAY_POPUP": {
            { state.profilePopup = action.displayPopup };
            break;
        };
        case "LOGOUT": {
            { state.avatar = {} };
        };
    }
    return state
}

const store = createStore(
    reducer, { avatar: {}, profilePopup: false },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
