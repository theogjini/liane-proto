import { createStore } from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case "GET_AVATAR": {
            { state.avatar = action.avatar };
            break
        };
        case "GET_TRAVELS": {
            { state.travels = action.travels };
            break
        };
        case "LOGOUT": {
            { state.avatar = {} };
        };
        case "NOTIFY": {
            {
                state.UI.notification.category = action.category;
                state.UI.notification.message = action.message;
                state.UI.notification.active = true;
            };
            break;
        };
        case "STOP_NOTIFY": {
            {
                state.UI.notification.active = false;
            };
            break;
        };
        case "DISPLAY_POPUP": {
            { state.UI.profilePopup = action.displayPopup };
            break;
        };
    }
    return state
};

const store = createStore(
    reducer, {
    avatar: {},
    travels: [],
    UI: {
        profilePopup: false,
        notification: {
            active: false,
            category: '',
            message: ''
        }
    }
},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
