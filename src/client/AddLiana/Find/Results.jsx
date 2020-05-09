import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    ResultsContainer, TravelDetails, BoldSpan, TimeDiv, ButtonRequest, LowContainer, SeatsDiv, BoldSpanDate
} from './style';
import { notification, week } from '../../utils.js';
import { format, parseISO } from 'date-fns';

export default function Results(props) {

    const dispatch = useDispatch();

    const userId = useSelector(state => state.avatar.registered);

    const resultsFiltered = props.results.filter(travel => travel.driver !== userId);

    const noResults = props.results.length === 0;

    async function handleSendRequest(event, travelId) {
        event.preventDefault();
        if (!userId) return notification("yellow", "Please signup before!", dispatch);
        const data = new FormData();
        data.append('travelId', travelId);
        const req = await fetch('/travel/select-travel', { method: 'POST', body: data });
        const parsed = await req.json();
        if (parsed.success) {
            notification("success", parsed.desc, props.dispatch)
        };
        if (!parsed.success) {
            notification("error", parsed.desc, props.dispatch)
        };
    };
    return (
        <ResultsContainer>
            {noResults === 0 && (<BoldSpan>No liana founds</BoldSpan>)}
            {props.results && resultsFiltered.map(travel => {
                const availability = travel.seatsAvailable - travel.attendees.length;
                return (
                    <TravelDetails key={travel._id} day={travel.day}>
                        {travel.goDate && (<BoldSpanDate day={travel.day}>{format(new Date(parseISO(travel.goDate)), 'iiii, dd MMMM yyyy')}</BoldSpanDate>)}
                        {!travel.goDate && (<BoldSpanDate day={travel.day}>Every {week[travel.day].cap}</BoldSpanDate>)}
                        <div>From <BoldSpan>{travel.start}</BoldSpan> To <BoldSpan>{travel.end}</BoldSpan></div>
                        <LowContainer>
                            <div>
                                <TimeDiv><img src="/assets/icons/go-arrow.svg" /><BoldSpan>{travel.goTime}</BoldSpan></TimeDiv>
                                {travel.returnTime && (<TimeDiv><img src="/assets/icons/back-arrow.svg" /><BoldSpan>{travel.returnTime}</BoldSpan></TimeDiv>)}
                            </div>
                            <SeatsDiv day={travel.day}>Seats available: {availability}</SeatsDiv>
                        </LowContainer>
                        <ButtonRequest disabled={availability === 0} onClick={event => handleSendRequest(event, travel._id)}>Hang!</ButtonRequest>
                    </TravelDetails>
                )
            })}
        </ResultsContainer >
    )
};
