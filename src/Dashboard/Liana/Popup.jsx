import React, { useEffect, useState, useRef } from 'react';
import { PopupBackground, PopupContainer, RequestsContainer, Request, Buttons, Accept, Reject, Next, Previous } from './style.js'

export default function Popup(props) {

    const requests = ["5e933378f7f9612bb42df575", "5e9325afbb3c71275c25e849", "5e94bf8d7a028e3e3d3f266b", "5e94bfd9021c38442b70f47f"];

    const [usersRequests, setUsersRequests] = useState([]);

    function handleClose(event) {
        event.preventDefault();
        props.handleSeeRequests(event)
    };

    useEffect(() => {
        async function getUserFromRequests() {
            const data = new FormData();
            data.append('requestsId', JSON.stringify(requests))
            const req = await fetch('/get-users-from-requests', { method: 'POST', body: data })
            const parsed = await req.json();
            if (parsed.success) {
                console.log('usersRequests', parsed.usersRequests)
                setUsersRequests(parsed.usersRequests)
            }; 1
            if (!parsed.success) {
                console.log('error', parsed.desc)
            };
        };
        getUserFromRequests();
    }, [])

    return (
        <PopupContainer>
            <RequestsContainer>
                {usersRequests.map((user, idx) => {
                    return (
                        <Request key={user.registered}>
                            {console.log('idx', idx)}
                            {console.log('idx moins un', requests[idx - 1])}
                            {console.log('idx plus un', requests[idx + 1])}
                            {requests[idx - 1] && (<Previous />)}
                            {requests[idx + 1] && (<Next />)}
                            <div>
                                <h2>{user.name}</h2>
                            </div>
                            <img src={user.path} height="75px" />
                            <h3>Rating</h3>
                            <Buttons>
                                <Accept>Accept</Accept>
                                <Reject>Reject</Reject>
                            </Buttons>
                        </Request>)
                })}
            </RequestsContainer>
            <PopupBackground onClick={handleClose}></PopupBackground>
        </PopupContainer >
    )
}