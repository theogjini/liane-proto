import React from 'react';
import { Link } from 'react-router-dom';
import { BoldSpan, TravelDetails, Seats, MonkeyHead, LianaContainer, ChatroomLink, TimeDiv } from './style.js';
import { format, parseISO } from 'date-fns';

export default function Liana(props) {

    const travel = props.travel;

    return (
        <LianaContainer>
            <TravelDetails>
                {travel.goDate && (<div><BoldSpan>{format(new Date(parseISO(travel.goDate)), 'iiii, dd MMMM yyyy')}</BoldSpan></div>)}
                <div>From <BoldSpan>{travel.start}</BoldSpan> To <BoldSpan>{travel.end}</BoldSpan></div>
                <TimeDiv><img src="/assets/icons/go-arrow.svg" /><BoldSpan>{travel.goTime}</BoldSpan></TimeDiv>
                {travel.returnTime && (<TimeDiv><img src="/assets/icons/back-arrow.svg" /><BoldSpan>{travel.returnTime}</BoldSpan></TimeDiv>)}
            </TravelDetails>
            <ChatroomLink>
                <Link to={'/chatroom/' + travel._chatroomId}>
                    <Seats>
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