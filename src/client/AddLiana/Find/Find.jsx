import React, { useState } from 'react';
import { FindComponent, Input, InputContainer, Button, Filters, Filter, FiltersContainer } from './style';
import { useDispatch } from 'react-redux';
import { formatInput, checkZipFormat, notification, week } from '../../utils.js';
import Results from './Results.jsx';

export default function Find(props) {

    const dispatch = useDispatch();

    const [start, setStart] = useState("H2J-3Z4");

    const [end, setEnd] = useState("J4G-1R7");

    const [results, setResults] = useState([]);

    const [resultsToDisplay, setResultsToDisplay] = useState(results);

    const [search, setSearch] = useState(false);

    const disableValidation = end === "" || start === "";

    const checkZipFormatting = checkZipFormat(end) && checkZipFormat(start);

    const placeholderStart = start ? "" : "Postal code";
    const placeholderEnd = end ? "" : "Postal code";

    const [filters, setFilters] = useState([false, false, false, false, false, false, false]);

    async function handleSubmit(event) {
        event.preventDefault();
        setSearch(true);
        if (disableValidation) return notification("error", "Please enter start and arrival", dispatch);
        const data = new FormData();
        data.append("start", start);
        data.append("end", end);
        let req = await fetch('/travel/find-travel', { method: 'POST', body: data });
        let parsed = await req.json();
        if (parsed.success) {
            setResults(parsed.results);
            setResultsToDisplay(parsed.results)
        };
    };

    function changeValue(event, setState) {
        let formattedInput = formatInput(event.target.value);
        setState(formattedInput);
    };

    function handleResetFind(event) {
        event.preventDefault();
        setSearch(false);
        setStart('');
        setEnd('');
        setResults([]);
        setFilters([false, false, false, false, false, false, false]);
    };

    function handleFilterResults(event, day) {
        event.preventDefault();
        const filtersArr = [false, false, false, false, false, false, false];
        if (filters[day] === true) {
            setResultsToDisplay(results);
            return setFilters(filtersArr);
        };
        const filteredResults = results.filter(travel => travel.day === day);
        filtersArr[day] = true;
        setResultsToDisplay(filteredResults);
        setFilters(filtersArr);
    };

    return (<FindComponent active={props.active}>
        <form onSubmit={handleSubmit}>
            <InputContainer validZip={!checkZipFormat(start) && start.length === 7}>From
                <Input type="text" onChange={event => changeValue(event, setStart)}
                    value={start} placeholder={placeholderStart} spellCheck="false" />
            </InputContainer>
            <InputContainer validZip={!checkZipFormat(end) && end.length === 7}>To
                <Input type="text" onChange={event => changeValue(event, setEnd)}
                    value={end} placeholder={placeholderEnd} spellCheck="false" />
            </InputContainer>
            <div>
                <Button
                    search={search}
                    disabled={search ? false : !checkZipFormatting}
                    onClick={search ? handleResetFind : handleSubmit}>
                    {search ? 'X' : 'Find'}
                </Button>
            </div>
        </form>
        <FiltersContainer>
            {search && (
                <Filters>
                    {week.map((currDay, day) => {
                        return (
                            <Filter key={currDay.cap} active={filters[day]} day={day} onClick={event => handleFilterResults(event, day)}>
                                {currDay.short}
                            </Filter>)
                    })}
                </Filters>
            )}
            {search && (<Results results={resultsToDisplay} dispatch={dispatch} />)}
        </FiltersContainer>
    </FindComponent >)
};
