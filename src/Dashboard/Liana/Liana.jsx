import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BoldSpan, TravelDetails, Seats, MonkeyHead, LianaContainer, ChatroomLink, TimeDiv } from './style.js';
import { format, parseISO } from 'date-fns';
import { notification } from '../../utils.js';

export default function Liana(props) {

    const dispatch = useDispatch();

    const history = useHistory();

    const userId = useSelector(state => state.avatar.registered);

    const {
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

    let requestAccepted = true;

    if (!isUserDriver) requestAccepted = attendees.includes(id => id === userId);

    function handleGoToChatroom(event) {
        event.preventDefault();
        if (!requestAccepted) {
            return notification("yellow", "Request still not accepted", dispatch);
        };
        history.push('/chatroom/' + _chatroomId)
    }

    return (
        <LianaContainer>
            <TravelDetails driver={isUserDriver}>
                {goDate && (<div><BoldSpan>{format(new Date(parseISO(goDate)), 'iiii, dd MMMM yyyy')}</BoldSpan></div>)}
                <div>From <BoldSpan>{start}</BoldSpan> To <BoldSpan>{end}</BoldSpan></div>
                <div>
                    <TimeDiv><img src="/assets/icons/go-arrow.svg" /><BoldSpan>{goTime}</BoldSpan></TimeDiv>
                    {returnTime && (<TimeDiv><img src="/assets/icons/back-arrow.svg" /><BoldSpan>{returnTime}</BoldSpan></TimeDiv>)}
                    {requests && isUserDriver && (
                        <div>They want to hang!
                            <div>{requests.map((request, idx) => {
                                if (idx <= 3) {
                                    console.log('request', request);
                                    return (<img key={request} src="/assets/icons/monkey.svg" height="23px" />)
                                };
                                return (<div>.</div>)
                            })}</div>
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