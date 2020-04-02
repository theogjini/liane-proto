import React, { useState } from 'react';
import { FindComponent, Input, InputContainer, Button, ListElem, Results } from './style';
import { useDispatch } from 'react-redux';
import { formatInput, checkZipFormat, notification } from '../../utils.js';

export default function Find(props) {

    const dispatch = useDispatch();

    const [end, setEnd] = useState("J4G-1R7");

    const [start, setStart] = useState("H2J-3Z4");

    const [results, setResults] = useState([]);

    const disableValidation = end === "" || start === "";

    const checkZipFormatting = checkZipFormat(end) && checkZipFormat(start);

    async function handleSubmit(event) {
        event.preventDefault();
        if (disableValidation) return notification("error", "Please enter start and arrival", dispatch);
        const data = new FormData();
        data.append("start", start);
        data.append("end", end);
        let req = await fetch('/find', { method: 'POST', body: data });
        let parsed = await req.json();
        if (parsed.success)
            console.log('results: ', results)
        setResults(parsed.results);
    }
    function changeValue(event, setState) {
        let formattedInput = formatInput(event.target.value);
        setState(formattedInput);
    }
    return (<FindComponent active={props.active}>
        <form onSubmit={handleSubmit}>
            <InputContainer validZip={!checkZipFormat(start) && start.length === 7}>From
                <Input type="text" onChange={event => changeValue(event, setStart)}
                    value={start} placeholder="Postal code" spellCheck="false" />
            </InputContainer>
            <InputContainer validZip={!checkZipFormat(end) && end.length === 7}>To
                <Input type="text" onChange={event => changeValue(event, setEnd)}
                    value={end} placeholder="Postal code" spellCheck="false" />
            </InputContainer>
            <div><Button disabled={!checkZipFormatting}>Find a liana</Button></div>
        </form>
        <Results>
            <ul style={{ paddingInlineStart: '0', scrollSnapType: 'x mandatory' }}>
                {results.map(travel => <ListElem key={travel._id}>
                    <div>
                        {travel.start} <img src="assets/icons/round-trip.svg" /> {travel.end}
                    </div>
                </ListElem>)}
            </ul>
        </Results>
    </FindComponent >)
}