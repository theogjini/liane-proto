import React, { useState } from 'react';
import { ThrowComponent, DayTable, Day, Button, DateSelector, Input, InputContainer, Seats, MonkeyHead, Plus, UniqueTravel, Label, FlexDiv } from './style';
import { format } from 'date-fns';
import TimeSelector from './TimeSelector/TimeSelector.jsx';
import { week, formatInput, checkZipFormat, notification, DayTravel } from '../../utils.js';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';

export default function Throw(props) {

    const [end, setEnd] = useState("");

    const [start, setStart] = useState("");

    const [recurrence, setRecurrence] = useState(true);

    const avatar = useSelector(state => state.avatar);

    const history = useHistory();

    const dispatch = useDispatch();

    const defaultDaysState = () => {
        let date = new Date().getDay();
        let day = date === 0 ? 6 : date - 1;
        let currentHour = format(new Date(), 'HH');
        let nextHour = parseInt(currentHour) + 1 + ':00';
        let days = [null, null, null, null, null, null, null];
        days[day] = new DayTravel(nextHour, '');
        return days;
    };

    const defaultDayState = () => {
        let currentDate = format(new Date(), 'yyyy-MM-dd');
        let currentHour = format(new Date(), 'HH');
        let nextHour = parseInt(currentHour) + 1 + ':00';
        let day = [new DayTravel(nextHour, '', currentDate)];
        return day;
    };

    const [days, setDays] = useState(defaultDaysState);

    const [uniqueTravel, setUniqueTravel] = useState(defaultDayState);

    const disableValidation = end === "" || start === "";

    const checkZipFormatting = checkZipFormat(end) && checkZipFormat(start);

    const placeholderStart = start ? "" : "Postal code";
    const placeholderEnd = end ? "" : "Postal code";

    async function handleSubmit(event) {
        event.preventDefault();
        if (!avatar.registered) {
            notification("error", "You must register before throwing a liana", dispatch);
            return history.push('/sign-in')
        };
        if (disableValidation) return notification("error", "Please enter start and arrival", dispatch);
        const schedule = recurrence ? days : uniqueTravel;
        const data = new FormData();
        data.append("start", start);
        data.append("end", end);
        data.append("schedule", JSON.stringify(schedule));
        console.log('sent data', data)
        let req = await fetch('/throw', { method: 'POST', body: data })
        let parsed = await req.json()
        if (parsed.success) {
            notification("success", "Travel added", dispatch);
            history.push("/dashboard");
        };
        if (!parsed.success) {
            notification("success", "Something went wrong...", dispatch);
        };
    };

    function changeValue(event, setState) {
        let formattedInput = formatInput(event.target.value);
        setState(formattedInput);
    };

    function addDay(event, day) {
        event.preventDefault();
        let selectedDays = days.slice();
        let dayToAdd = new DayTravel;
        selectedDays[day] = !days[day] ? dayToAdd : null;
        setDays(selectedDays);
    };

    function handleRecurrenceChange() {
        setRecurrence(!recurrence);
    };

    function handleUniqueTimeChange(event) {
        event.preventDefault();
        let newDaysArray = uniqueTravel.slice();
        newDaysArray[0].goTime = event.currentTarget.value;
        setUniqueTravel(newDaysArray);
    };

    function handleChangeUniqueTravelDate(event) {
        event.preventDefault();
        let newDaysArray = uniqueTravel.slice();
        newDaysArray[0].goDate = event.target.value;
        setUniqueTravel(newDaysArray);
    };

    function handleUniqueAddSeat(event) {
        event.preventDefault();
        let newDaysArray = uniqueTravel.slice();
        if (newDaysArray[0].seatsAvailable === 4) return
        newDaysArray[0].seatsAvailable += 1;
        setDays(newDaysArray)
    };

    function handleUniqueRemoveSeat(event, day) {
        event.preventDefault();
        let newDaysArray = uniqueTravel.slice();
        if (newDaysArray[0].seatsAvailable === 0) return;
        newDaysArray[0].seatsAvailable -= 1;
        setDays(newDaysArray);
    };

    function handleGoTimeChange(event, day) {
        let newDaysArray = days.slice();
        newDaysArray[day].goTime = event.currentTarget.value;
        setDays(newDaysArray);
    };

    function handleReturnTimeChange(event, day) {
        let newDaysArray = days.slice();
        newDaysArray[day].returnTime = event.currentTarget.value;
        setDays(newDaysArray);
    };

    function handleAddSeat(event, day) {
        event.preventDefault();
        let newDaysArray = days.slice();
        if (newDaysArray[day].seatsAvailable === 4) return;
        newDaysArray[day].seatsAvailable += 1;
        setDays(newDaysArray);
    };

    function handleRemoveSeat(event, day) {
        event.preventDefault();
        let newDaysArray = days.slice();
        if (newDaysArray[day].seatsAvailable === 0) return;
        newDaysArray[day].seatsAvailable -= 1;
        setDays(newDaysArray);
    };

    return (<ThrowComponent active={props.active}>
        <form onSubmit={handleSubmit}>
            <InputContainer validZip={!checkZipFormat(start) && start.length === 7} > From
                <Input type="text" onChange={event => changeValue(event, setStart)}
                    value={start} placeholder={placeholderStart} spellCheck="false" />
            </InputContainer>
            <InputContainer validZip={!checkZipFormat(end) && end.length === 7}>To
                <Input type="text" onChange={event => changeValue(event, setEnd)}
                    value={end} placeholder={placeholderEnd} spellCheck="false" />
            </InputContainer>
            <Label >
                <Switch color="default" onClick={handleRecurrenceChange} checked={recurrence} />
                <h3>{recurrence ? 'Recurrent travel' : 'Unique travel'}</h3>
            </Label>
            {recurrence ?
                (<div>
                    <DayTable>
                        {week.map((day, idx) => {
                            return (<FlexDiv key={day.key}>
                                <Day currentDay={day.key} onClick={event => addDay(event, idx)} active={days[idx]}>{day.short}</Day>
                                {days[idx] && (<FlexDiv>
                                    <div >
                                        <TimeSelector go={true} onChangeProp={event => handleGoTimeChange(event, idx)} default={days[idx] ? days[idx].goTime : none} />
                                        <TimeSelector go={false} onChangeProp={event => handleReturnTimeChange(event, idx)} />
                                    </div>
                                    <Seats onClick={event => handleRemoveSeat(event, idx)}>
                                        <MonkeyHead added={days[idx].seatsAvailable >= 1}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>
                                        <MonkeyHead added={days[idx].seatsAvailable >= 2}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>
                                        <MonkeyHead added={days[idx].seatsAvailable >= 3}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>
                                        <MonkeyHead added={days[idx].seatsAvailable >= 4}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>
                                    </Seats >
                                    <Plus onClick={event => handleAddSeat(event, idx)}>+</Plus>
                                </FlexDiv>)}
                            </FlexDiv>)
                        })}
                    </DayTable>
                </div>) : (
                    <UniqueTravel>
                        <div>
                            <DateSelector type="date" value={uniqueTravel[0].goDate} onChange={handleChangeUniqueTravelDate} />
                            <TimeSelector go={true} default={uniqueTravel[0].goTime} onChangeProp={handleUniqueTimeChange} />
                        </div>
                        <Seats onClick={handleUniqueRemoveSeat}>
                            <MonkeyHead added={uniqueTravel[0].seatsAvailable >= 1}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>
                            <MonkeyHead added={uniqueTravel[0].seatsAvailable >= 2}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>
                            <MonkeyHead added={uniqueTravel[0].seatsAvailable >= 3}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>
                            <MonkeyHead added={uniqueTravel[0].seatsAvailable >= 4}><img src='assets/icons/happy-monkey.svg' /></MonkeyHead>
                        </Seats >
                        <Plus onClick={handleUniqueAddSeat}>+</Plus>
                    </UniqueTravel>
                )}
            <div><Button type="submit" disabled={!checkZipFormatting}>Set a liana</Button></div>
        </form>
    </ThrowComponent >);
};
