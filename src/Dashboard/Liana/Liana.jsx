import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BoldSpan, TravelDetails, Seats, MonkeyHead, LianaContainer, ChatroomLink, TimeDiv } from './style.js';
import { format, parseISO } from 'date-fns';
import { notification } from '../../utils.js';
import Popup from './Popup.jsx';

export default function Liana(props) {

    const dispatch = useDispatch();

    const history = useHistory();

    const userId = useSelector(state => state.avatar.registered);

    const [popup, setPopup] = useState(false);

    const {
        goDate,
        _chatroomId,
        attendees,
        end,
        start,
        returnTime,
        goTime,
        // requests,
        driver,
    } = props.travel;

    const requests = ["5e933378f7f9612bb42df575", "5e9325afbb3c71275c25e849", "5e94bf8d7a028e3e3d3f266b", "5e94bfd9021c38442b70f47f"];

    const isUserDriver = driver === userId;
    console.log('isUserDriver', isUserDriver);

    let requestAccepted = true;

    if (!isUserDriver) requestAccepted = attendees.includes(id => id === userId);

    function handleGoToChatroom(event) {
        event.preventDefault();
        if (!requestAccepted) {
            return notification("yellow", "Request still not accepted", dispatch);
        };
        history.push('/chatroom/' + _chatroomId)
    };

    function handleSeeRequests(event) {
        event.preventDefault();
        setPopup(!popup);
    };

    return (
        <LianaContainer>
            {popup && (<Popup requests={requests} handleSeeRequests={handleSeeRequests} />)}
            <TravelDetails driver={isUserDriver}>
                {goDate && (<div><BoldSpan>{format(new Date(parseISO(goDate)), 'iiii, dd MMMM yyyy')}</BoldSpan></div>)}
                <div>From <BoldSpan>{start}</BoldSpan> To <BoldSpan>{end}</BoldSpan></div>
                <div>
                    <TimeDiv><img src="/assets/icons/go-arrow.svg" /><BoldSpan>{goTime}</BoldSpan></TimeDiv>
                    {returnTime && (<TimeDiv><img src="/assets/icons/back-arrow.svg" /><BoldSpan>{returnTime}</BoldSpan></TimeDiv>)}
                    {requests[0] && isUserDriver && (
                        <div>They want to hang! {requests.map((request, idx) => {
                            if (idx < 3) {
                                console.log('request', request);
                                return (<img onClick={handleSeeRequests} key={request} src="/assets/icons/monkey.svg" height="23px" />)
                            };
                            return (<BoldSpan key={request} >...</BoldSpan>)
                        })}
                        </div>
                    )}
                </div>
            </TravelDetails>
            <ChatroomLink requestAccepted={!requestAccepted}>
                {!requestAccepted && (<div></div>)}
                <section onClick={handleGoToChatroom}>
                    <Seats>
                        {attendees && (
                            attendees.map(attendee => <MonkeyHead key={attendee} added={true}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>)
                        )}
                    </Seats >
                    <img src="/assets/icons/message.svg" height="20px" />
                </section>
            </ChatroomLink>
        </LianaContainer>
    );
}