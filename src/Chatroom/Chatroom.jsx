import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChatroomContainer, Messages, MessageForm, Input, Wrapper, Me } from './style';

export default function Chatroom(props) {

    const travel = useSelector(state => state.travels.find(trvl => trvl._chatroomId === props.id));

    const avatar = useSelector(state => state.avatar);

    const history = useHistory();

    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log('useEffectCalled')
        if (!travel) history.push('/');
    });

    function handleSendMessage(event) {
        event.preventDefault();
        console.log(`${message}`, Date.now());
        setMessage('');
    };

    function handleReturnToDashboard(event) {
        history.goBack();
    };

    return (
        <ChatroomContainer>
            {travel && (<Wrapper>
                <Me onClick={handleReturnToDashboard}><img src={avatar.path} /></Me>
                <div>Welcome to this chatroom: {props.id}</div>
                <Messages color={travel.day}></Messages>
                <MessageForm onSubmit={handleSendMessage}>
                    <Input color={travel.day} type="text" onChange={event => setMessage(event.target.value)} value={message} placeholder="Enter message" />
                </MessageForm>
            </Wrapper>)}
        </ChatroomContainer>
    );
};
