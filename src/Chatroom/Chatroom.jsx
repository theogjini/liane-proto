import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatroomContainer } from './style';

export default function Chatroom(props) {

    const travel = useSelector(state => state.travels);

    console.log('travel of the chatroom', travel);

    return (
        <ChatroomContainer>
            Welcome to this chatroom: {}
            {/* {props.location.state.map(attendee => <div>{attendee}</div>)} */}
        </ChatroomContainer>
    );
};
