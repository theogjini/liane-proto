import React from 'react';
import { useSelector } from 'react-redux';
import { ResultsContainer, TravelDetails, BoldSpan, TimeDiv, Button } from './style';
import { notification, week } from '../../utils.js';
import { format, parseISO } from 'date-fns';

export default function Results(props) {

    const userId = useSelector(state => state.avatar.registered);

    const resultsFiltered = props.results.filter(travel => travel.driver !== userId);

    const noResults = props.results.length === 0;

    async function handleSendRequest(event, travelId) {
        event.preventDefault();
        const data = new FormData();
        data.append('travel_id', travelId);
        const req = await fetch('/select-travel', { method: 'POST', body: data });
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
                return (
                    <TravelDetails key={travel._id} day={travel.day}>
                        {travel.goDate && (<div><BoldSpan day={travel.day}>{format(new Date(parseISO(travel.goDate)), 'iiii, dd MMMM yyyy')}</BoldSpan></div>)}
                        {!travel.goDate && (<div><BoldSpan day={travel.day}>Every {week[travel.day].cap}</BoldSpan></div>)}
                        <div>From <BoldSpan>{travel.start}</BoldSpan> To <BoldSpan>{travel.end}</BoldSpan></div>
                        <div>
                            <TimeDiv><img src="/assets/icons/go-arrow.svg" /><BoldSpan>{travel.goTime}</BoldSpan></TimeDiv>
                            {travel.returnTime && (<TimeDiv><img src="/assets/icons/back-arrow.svg" /><BoldSpan>{travel.returnTime}</BoldSpan></TimeDiv>)}
                        </div>
                        <Button onClick={event => handleSendRequest(event, travel._id)}>Send a Request!</Button>
                    </TravelDetails>
                )
            })}
        </ResultsContainer>
    )
};
