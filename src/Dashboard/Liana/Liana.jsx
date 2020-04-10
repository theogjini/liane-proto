import React from 'react';
import { Link } from 'react-router-dom';
import { BoldSpan, TravelDetails, Seats, MonkeyHead, LianaContainer, ChatroomLink } from './style.js'

export default function Liana(props) {

    const travel = props.travel;

    return (
        <LianaContainer>
            <TravelDetails>
                <div>From <BoldSpan>{travel.start}</BoldSpan> To <BoldSpan>{travel.start}</BoldSpan></div>
                <div><BoldSpan>{travel.goTime}</BoldSpan></div>
                <div><BoldSpan>{travel.returnTime}</BoldSpan></div>
            </TravelDetails>
            <ChatroomLink>
                <Link to={'/chatroom/' + travel._chatroomId}>
                    <Seats onClick={event => handleRemoveSeat(event, idx)}>
                        {travel.attendees && (
                            travel.attendees.map(attendee => <MonkeyHead key={attendee} added={true}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>)
                        )}
                    </Seats >
                    <img src="/assets/icons/message.svg" height="20px" />
                </Link>
            </ChatroomLink>
        </LianaContainer>
    );
}