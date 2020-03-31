import React, { useState } from 'react';
import { ThrowComponent, DayTable, Day, Button, DateSelector, Input, InputContainer, Seats, MonkeyHead, Plus, UniqueTravel } from './style';
import { format } from 'date-fns';
import TimeSelector from './TimeSelector/TimeSelector.jsx';
import { week, formatInput, checkZipFormat } from '../../utils.js';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';

class DayTravel {
    constructor(goTime, returnTime, goDate) {
        this.goTime = goTime;
        this.returnTime = returnTime;
        this.goDate = goDate;
        this.seatsAvailable = 0;
        this.attendees = [];
    };
    isSelected() {
        return this.goTime || this.returnTime
    };
};

export default function Throw(props) {

    const [end, setEnd] = useState("");

    const [start, setStart] = useState("");

    const [recurrence, setRecurrence] = useState(true);

    const avatar = useSelector(state => state.avatar);

    const history = useHistory();

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

    async function handleSubmit(event) {
        event.preventDefault();
        // if (!avatar.registered) return history.push('/sign-in');
        if (disableValidation) return alert("Please enter start and arrival");
        const schedule = recurrence ? days : uniqueTravel;
        const data = new FormData();
        data.append("start", start);
        data.append("end", end);
        data.append("schedule", JSON.stringify(schedule));
        console.log('sent data', data)
        let req = await fetch('/throw', { method: 'POST', body: data })
        let parsed = await req.json()
        if (parsed.success)
            alert("your travel has been added")
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
        console.log('selected Days:', selectedDays);
        setDays(selectedDays);
    };

    function handleRecurrenceChange() {
        setRecurrence(!recurrence);
    };

    function handleUniqueTimeChange(event) {
        event.preventDefault();
        let newDaysArray = uniqueTravel.slice();
        newDaysArray[0].goTime = event.currentTarget.value;
        console.log('GoTimeSelected:', newDaysArray)
        setUniqueTravel(newDaysArray);
    };

    function handleChangeUniqueTravelDate(event) {
        event.preventDefault();
        let newDaysArray = uniqueTravel.slice();
        newDaysArray[0].goDate = event.target.value;
        console.log('GoTimeSelected:', newDaysArray)
        setUniqueTravel(newDaysArray);
    };

    function handleUniqueAddSeat(event) {
        event.preventDefault();
        let newDaysArray = uniqueTravel.slice();
        if (newDaysArray[0].seatsAvailable === 4) return
        newDaysArray[0].seatsAvailable += 1;
        console.log('RetunrSeatsSelected:', newDaysArray[0])
        setDays(newDaysArray)
    };

    function handleUniqueRemoveSeat(event, day) {
        event.preventDefault();
        let newDaysArray = uniqueTravel.slice();
        if (newDaysArray[0].seatsAvailable === 0) return
        newDaysArray[0].seatsAvailable -= 1;
        console.log('RetunrSeatsSelected:', newDaysArray[0])
        setDays(newDaysArray)
    };

    function handleGoTimeChange(event, day) {
        let newDaysArray = days.slice();
        newDaysArray[day].goTime = event.currentTarget.value;
        console.log('GoTimeSelected:', newDaysArray)
        setDays(newDaysArray);
    };

    function handleReturnTimeChange(event, day) {
        let newDaysArray = days.slice();
        newDaysArray[day].returnTime = event.currentTarget.value;
        console.log('RetunrTimeSelected:', newDaysArray)
        setDays(newDaysArray);
    };

    function handleAddSeat(event, day) {
        event.preventDefault();
        let newDaysArray = days.slice();
        if (newDaysArray[day].seatsAvailable === 4) return
        newDaysArray[day].seatsAvailable += 1;
        console.log('RetunrSeatsSelected:', newDaysArray[day])
        setDays(newDaysArray)
    };

    function handleRemoveSeat(event, day) {
        event.preventDefault();
        let newDaysArray = days.slice();
        if (newDaysArray[day].seatsAvailable === 0) return
        newDaysArray[day].seatsAvailable -= 1;
        console.log('RetunrSeatsSelected:', newDaysArray[day])
        setDays(newDaysArray)
    };

    return (<ThrowComponent active={props.active}>
        <form onSubmit={handleSubmit}>
            <InputContainer validZip={!checkZipFormat(start) && start.length === 7} > From
                <Input type="text" onChange={event => changeValue(event, setStart)}
                    value={start} placeholder="Postal code" spellCheck="false" />
            </InputContainer>
            <InputContainer validZip={!checkZipFormat(end) && end.length === 7}>To
                <Input type="text" onChange={event => changeValue(event, setEnd)}
                    value={end} placeholder="Postal code" spellCheck="false" />
            </InputContainer>
            <label style={{ display: 'flex', maxWidth: '290px', margin: 'auto', alignItems: 'center', justifyContent: 'space-between' }}>
                <Switch onClick={handleRecurrenceChange} checked={recurrence} />
                <h3>{recurrence ? 'Recurrent travel' : 'Unique travel'}</h3>
            </label>
            {recurrence ?
                (<div>
                    <DayTable>
                        {week.map((day, idx) => {
                            return (<div key={day.key} style={{ display: 'flex', alignItems: 'center' }}>
                                <Day currentDay={day.key} onClick={event => addDay(event, idx)} active={days[idx]}>{day.short}</Day>
                                {days[idx] && (<div style={{ display: 'flex', alignItems: 'center' }}>
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
                                </div>)}
                            </div>)
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
