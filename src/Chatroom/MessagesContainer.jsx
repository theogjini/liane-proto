import React, { useEffect, useRef } from 'react';
import { Msg, MsgWrapper, RefDiv, MessagesDisplay, MsgWriter } from './style';

export default function MessagesContainer(props) {

    const messages = props.messages;

    const userId = props.userId

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'start' })
    }

    useEffect(scrollToBottom, [{}]);

    function seeMessageDetails(event, idx) {
        event.preventDefault();
        messages[idx];
    };

    return (
        <MessagesDisplay>
            {messages && (messages.map((msg, idx) => {
                const mine = msg.user.registered === userId;
                let sameUser = true;
                if (idx >= 1) sameUser = msg.user.registered !== messages[idx - 1].user.registered;
                return (
                    <MsgWrapper key={idx} mine={mine} onClick={event => seeMessageDetails(event, idx)}>
                        <Msg sameUser={sameUser} mine={mine} color={props.day}>
                            {sameUser && (< MsgWriter >
                                <img src={msg.user.path} /> {msg.user.name}
                            </MsgWriter>)}
                            <div>{msg.content}</div>
                        </Msg>
                    </MsgWrapper>
                )
            }))}
            <RefDiv ref={messagesEndRef} />
        </MessagesDisplay >
    );
};
