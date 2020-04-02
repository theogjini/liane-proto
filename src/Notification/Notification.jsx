import React from 'react';
import { useSelector } from 'react-redux';
import { NotificationContainer, Message } from './style';

export default function Notification() {
    const isActive = useSelector(state => state.UI.notification.active);
    const category = useSelector(state => state.UI.notification.category);
    const message = useSelector(state => state.UI.notification.message);

    return (<NotificationContainer>
        <Message active={isActive} category={category}>{message}</Message>
    </NotificationContainer >)
};
