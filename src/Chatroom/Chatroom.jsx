import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChatroomContainer, Messages, MessageForm, Input, Wrapper, Me, Button, InputContainer, TravelInfos, BoldSpan, Launch } from './style';
import SendSvg from './SendSvg.jsx';
import { week } from '../utils.js';
import { format } from 'date-fns';


import MessagesContainer from './MessagesContainer.jsx'

export default function Chatroom(props) {

    const travel = useSelector(state => state.travels.find(trvl => trvl._chatroomId === props.id));

    const avatar = useSelector(state => state.avatar);

    const driver = travel.driver === avatar.registered;

    const history = useHistory();

    const [content, setContent] = useState('');

    const [chatMessages, setChatMessages] = useState([]);

    const placeholder = content ? "" : "Enter message";

    useEffect(() => {
        console.log('useEffectCalled');
        if (!travel) history.push('/');
        async function getMessages() {
            const data = new FormData();
            data.append('chatroomId', props.id);
            const req = await fetch('/get-messages', { method: 'POST', body: data });
            const parsed = await req.json();
            if (parsed.success) {
                if (parsed.messages.length === chatMessages.length) return
                setChatMessages(parsed.messages)
            };
        }
        const interval = setInterval(getMessages, 300);
        return () => clearInterval(interval);
    }, [{}]);

    async function handleSendMessage(event) {
        event.preventDefault();
        if (content === '') return;
        const timestamp = Date.now();
        const data = new FormData();
        data.append('chatroomId', props.id);
        data.append('content', content);
        data.append('timestamp', timestamp);
        const req = await fetch('/send-message', { method: 'POST', body: data });
        const parsed = await req.json();
        if (parsed.success) {
            console.log('messages sent!:');
            setContent('');
        };
    };

    function handleReturnToDashboard() {
        history.goBack();
    };

    function enterIsPressed(event) {
        if (event.keyCode === 13) {
            return handleSendMessage(event)
        };
    }

    return (
        <ChatroomContainer>
            {travel && (<Wrapper>
                <Messages color={travel.day}>
                    <MessagesContainer userId={avatar.registered} messages={chatMessages} day={travel.day} />
                    <MessageForm onSubmit={handleSendMessage}>
                        <InputContainer>
                            <Input autoFocus rows="1" color={travel.day} type="text" onKeyDown={enterIsPressed} onChange={event => setContent(event.target.value)} value={content} placeholder={placeholder} />
                            <Button type="submit" color={travel.day} disabled={!content}>
                                <SendSvg />
                            </Button>
                        </InputContainer>
                        <Me onClick={handleReturnToDashboard}><img src={avatar.path} /></Me>
                    </MessageForm>
                </Messages>
                <TravelInfos>
                    {driver && <Launch>
                        <img src="/assets/icons/rocket.svg" />
                    </Launch>}
                    {travel.goDate ?
                        (<div><BoldSpan>{format(new Date(travel.goDate), 'iiii, MMMM yyyy')}</BoldSpan></div>) :
                        (<div><BoldSpan>Every {week[travel.day].key}</BoldSpan></div>)}
                    <div>Start from <BoldSpan>{travel.start}</BoldSpan> at <BoldSpan>{travel.goTime}</BoldSpan></div>
                    {travel.returnTime && (<div>Return at <BoldSpan>{travel.returnTime}</BoldSpan> from <BoldSpan>{travel.end}</BoldSpan></div>)}
                </TravelInfos>
            </Wrapper>)
            }
        </ChatroomContainer >
    );
};
