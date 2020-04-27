import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChatroomContainer, Messages, MessageForm, Input, Wrapper, Me, Button, InputContainer, TravelInfos, BoldSpan, Launch } from './style';
import SendSvg from './SendSvg.jsx';
import { week } from '../utils.js';
import { format, parseISO } from 'date-fns';
import Popup from './Popup.jsx';
import MessagesContainer from './MessagesContainer.jsx';


export default function Chatroom(props) {

    const roomId = props.id;

    const travel = useSelector(state => state.travels.find(trvl => trvl._chatroomId === roomId));

    const avatar = useSelector(state => state.avatar);

    const dispatch = useDispatch();

    const chatMessages = useSelector(state => state.chatrooms[roomId]);

    let driver;

    if (travel) driver = travel.driver === avatar.registered;

    const history = useHistory();

    const [content, setContent] = useState('');

    const [popup, setPopup] = useState();

    const placeholder = content ? "" : "Enter message";

    useEffect(() => {
        if (!travel) history.push('/');
        async function getMessages() {
            const data = new FormData();
            data.append('chatroomId', roomId);
            const req = await fetch('/get-messages', { method: 'POST', body: data });
            const parsed = await req.json();
            if (parsed.success) {
                if (parsed.messages.length === chatMessages.length) return;
                dispatch({ type: 'UPDATING_CHATROOM', messages: parsed.messages, _id: roomId });
            };
        }
        const interval = setInterval(getMessages, 300);
        return () => clearInterval(interval);
    }, [chatMessages]);

    async function handleSendMessage(event) {
        event.preventDefault();
        if (content === '') return;
        const timestamp = Date.now();
        const data = new FormData();
        data.append('chatroomId', roomId);
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

    function handleLaunchTravel(event) {
        event.preventDefault();
        setPopup(!popup)
    }

    return (
        <ChatroomContainer>
            {popup && (<Popup url={'/road/' + travel.start + '/' + travel.end} handleClose={handleLaunchTravel} />)}
            {travel && (<Wrapper>
                <Messages color={travel.day}>
                    <MessagesContainer userId={avatar.registered} messages={chatMessages} day={travel.day} />
                    <MessageForm onSubmit={handleSendMessage}>
                        <InputContainer>
                            <Input rows="1" color={travel.day} type="text" onKeyDown={enterIsPressed} onChange={event => setContent(event.target.value)} value={content} placeholder={placeholder} />
                            <Button type="submit" color={travel.day} disabled={!content}>
                                <SendSvg />
                            </Button>
                        </InputContainer>
                        <Me onClick={handleReturnToDashboard}><img src={avatar.path} /></Me>
                    </MessageForm>
                </Messages>
                <TravelInfos>
                    {driver && <Launch>
                        <img onClick={handleLaunchTravel} src="/assets/icons/rocket.svg" />
                    </Launch>}
                    {travel.goDate ?
                        (<div><BoldSpan>{format(new Date(parseISO(travel.goDate)), 'iiii, d MMMM yyyy')}</BoldSpan></div>) :
                        (<div><BoldSpan>Every {week[travel.day].cap}</BoldSpan></div>)}
                    <div>Start from <BoldSpan>{travel.start}</BoldSpan> at <BoldSpan>{travel.goTime}</BoldSpan></div>
                    {travel.returnTime && (<div>Return at <BoldSpan>{travel.returnTime}</BoldSpan> from <BoldSpan>{travel.end}</BoldSpan></div>)}
                </TravelInfos>
            </Wrapper>)
            }
        </ChatroomContainer >
    );
};
