import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PopupBackground, PopupContainer, RequestsContainer, Request, Buttons, Accept, Reject, Next, Previous } from './style.js';
import { notification, getUserTravels } from '../../utils.js';

export default function Popup(props) {

    const requests = props.requests;

    const [usersRequests, setUsersRequests] = useState([]);

    const dispatch = useDispatch();

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
                setUsersRequests(parsed.usersRequests)
            }; 1
            if (!parsed.success) {
                console.log('error', parsed.desc)
            };
        };
        getUserFromRequests();
    }, [requests])

    const requestContainer = useRef(null)

    function handleScrollPrevious(event) {
        event.preventDefault();
        requestContainer.current.scrollLeft -= 300;
    };

    function handleScrollNext(event) {
        event.preventDefault();
        requestContainer.current.scrollLeft += 300;
    };

    async function handleAcceptRequest(event, travellerId) {
        event.preventDefault();
        const data = new FormData();
        data.append('travellerId', travellerId);
        data.append('travelId', props.travelId);
        const req = await fetch('/accept-request', { method: 'POST', body: data });
        const parsed = await req.json();
        if (parsed.success) {
            notification('success', parsed.desc, dispatch);
            getUserTravels(dispatch);
        };
        if (!parsed.success) {
            notification('error', parsed.desc, dispatch);
        };
    };

    async function handleRejectRequest(event, travellerId) {
        event.preventDefault();
        const data = new FormData();
        data.append('travellerId', travellerId);
        data.append('travelId', props.travelId);
        const req = await fetch('/reject-request', { method: 'POST', body: data });
        const parsed = await req.json();
        if (parsed.success) {
            notification('yellow', parsed.desc, dispatch);
            getUserTravels(dispatch);
        };
        if (!parsed.success) {
            notification('error', parsed.desc, dispatch);
        };
    };

    return (
        <PopupContainer>
            <RequestsContainer ref={requestContainer}>
                {usersRequests.length === 0 && (<section>No more requests...</section>)}
                {usersRequests.map((user, idx) => {
                    const previous = requests[idx - 1] != undefined;
                    const next = requests[idx + 1] != undefined;
                    return (
                        <Request key={user.registered}>
                            {previous && (<Previous onClick={handleScrollPrevious} />)}
                            {next && (<Next onClick={handleScrollNext} />)}
                            <div>
                                <h2>{user.name}</h2>
                            </div>
                            <img src={user.path} height="75px" />
                            <h3>Rating</h3>
                            <Buttons>
                                <Accept onClick={event => handleAcceptRequest(event, user.registered)}>Accept</Accept>
                                <Reject onClick={event => handleRejectRequest(event, user.registered)}>Reject</Reject>
                            </Buttons>
                        </Request>)
                })}
            </RequestsContainer>
            <PopupBackground onClick={handleClose}></PopupBackground>
        </PopupContainer >
    )
}