import React, { useState } from 'react';
import { FindComponent, Input, InputContainer, Button } from './style';
import { useDispatch } from 'react-redux';
import { formatInput } from '../../utils.js';

export default function Find(props) {

    const dispatch = useDispatch();

    const [end, setEnd] = useState("");

    const [start, setStart] = useState("");

    const [results, setResults] = useState([]);

    const disableValidation = end === "" || start === "";

    async function handleSubmit(event) {
        event.preventDefault();
        if (disableValidation) return alert("Please enter start and arrival");
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
            <InputContainer>From
                <Input type="text" onChange={event => changeValue(event, setStart)}
                    value={start} placeholder="Postal code"
                />
            </InputContainer>
            <InputContainer>To<Input type="text" onChange={event => changeValue(event, setEnd)}
                value={end} placeholder="Postal code" /></InputContainer>
            <div><Button disabled={disableValidation}>Find a liana</Button></div>
        </form>
        <div>
            <ul>
                {results.map(travel => <li key={travel._id}>
                    start: {travel.start}, end: {travel.end}, id: {travel._id}
                </li>)}
            </ul>
        </div>
    </FindComponent >)
}