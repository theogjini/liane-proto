import { createStore } from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case "ACTIVATE_SOCKET": {
            {
                state.isSocketSessionActive = true;
            };
            break
        };
        case "GET_AVATAR": {
            {
                state.avatar = action.avatar;
            };
            break
        };
        case "GET_TRAVELS": {
            {
                state.travels = action.travels;
            };
            break
        };
        case "GET_CHATROOMS": {
            {
                state.chatrooms = action.chatrooms;
            };
            break
        };
        case "UPDATING_CHATROOM": {
            {
                state.chatrooms[action._id] = action.messages;
            };
            break
        };
        case "LOGOUT": {
            {
                state.avatar = {};
                state.isSocketSessionActive = false;
            };
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
            {
                state.UI.profilePopup = action.displayPopup;
            };
            break;
        };
    }
    return state
};

const store = createStore(
    reducer, {
    isSocketSessionActive: false,
    avatar: {},
    travels: [],
    chatrooms: [],
    UI: {
        socketNotif: [],
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
