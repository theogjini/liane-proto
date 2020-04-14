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
        _id,
        goDate,
        _chatroomId,
        attendees,
        end,
        start,
        returnTime,
        goTime,
        requests,
        driver,
    } = props.travel;

    const isUserDriver = driver === userId;
    console.log('isUserDriver', isUserDriver);

    let requestAccepted = true;

    if (!isUserDriver) requestAccepted = attendees.includes(userId);
    console.log('areyouacceptedinthis', requestAccepted);

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
            {popup && (<Popup requests={requests} handleSeeRequests={handleSeeRequests} travelId={_id} />)}
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
            <ChatroomLink active={requestAccepted}>
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