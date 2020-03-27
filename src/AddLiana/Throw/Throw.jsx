import React, { useState, useEffect } from 'react';
import { ThrowComponent, DayTable, Day, Button, DateSelector, Input, InputContainer } from './style';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import TimeSelector from './TimeSelector/TimeSelector.jsx';
import { week } from '../../utils.js';
import { useSelector } from 'react-redux';
import Switch from '@material-ui/core/Switch';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

class DayTravel {
    constructor(goTime, returnTime) {
        this.goTime = goTime
        this.returnTime = returnTime
    };
    isSelected() {
        return this.goTime || this.returnTime
    };
};

class UniqueDayTravel {
    constructor(goTime, goDate) {
        this.goTime = goTime
        this.goDate = goDate
    };
    updateGoTime(newTime) {
        this.state.gotime = newTime
    };
    updateGoDate(newDate) {
        this.state.goDate = newTime
    };
};

export default function Throw(props) {

    const avatar = useSelector(state => state.avatar);

    const [end, setEnd] = useState("");

    const [start, setStart] = useState("");

    const [recurrence, setRecurrence] = useState(true);

    const defaultDaysState = () => {
        let date = new Date().getDay();
        let day = date === 0 ? 6 : date - 1;
        let currentHour = format(new Date(), 'HH');
        let nextHour = parseInt(currentHour) + 1 + ':00'
        let time = new Date().getHours();
        let days = [null, null, null, null, null, null, null];
        days[day] = new DayTravel(nextHour, '');
        return days;
    };

    const [days, setDays] = useState(defaultDaysState);

    const [uniqueTravel, setUniqueTravel] = useState([new UniqueDayTravel('', '')]);

    async function handleSubmit(event) {
        event.preventDefault()
        if (start === "" || end === "") return alert("Please enter start and arrival")
        const data = new FormData()
        data.append("start", start)
        data.append("end", end)
        let req = await fetch('/throw', { method: 'POST', body: data })
        let parsed = await req.json()
        if (parsed.success)
            alert("your travel has been added")
    };

    const disableValidation = end === "" || start === "";

    function changeValue(event, state, setState) {
        let formattedString = event.target.value.toUpperCase();
        setState(formattedString);
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

    return (<ThrowComponent active={props.active}>
        <form onSubmit={handleSubmit}>
            <InputContainer>From
                <Input type="text" onChange={event => changeValue(event, start, setStart)}
                    value={start} placeholder="Postal code to start"
                />
            </InputContainer>
            <InputContainer>To<Input type="text" onChange={event => changeValue(event, end, setEnd)}
                value={end} placeholder="Postal code to arrival" />
            </InputContainer>
            <label style={{ display: 'flex', maxWidth: '290px', margin: 'auto', alignItems: 'center', justifyContent: 'space-between' }}>
                <Switch onClick={handleRecurrenceChange} checked={recurrence} />
                <h3>{recurrence ? 'Recurrent travel' : 'Unique travel'}</h3>
            </label>
            {recurrence ?
                (<div>
                    <DayTable>
                        {week.map((day, idx) => {
                            return (<div key={day.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Day currentDay={day.key} onClick={event => addDay(event, idx)} active={days[idx]}>{day.short}</Day>
                                {days[idx] && (<div>
                                    <div style={{ display: 'inline-block' }}>
                                        <TimeSelector go={true} onChangeProp={event => handleGoTimeChange(event, idx)} default={days[idx] ? days[idx].goTime : none} />
                                        <TimeSelector go={false} onChangeProp={event => handleReturnTimeChange(event, idx)} />
                                    </div>

                                </div>)}
                            </div>)
                        })}
                    </DayTable>
                </div>) : (
                    <div>
                        <DateSelector type="date" value={uniqueTravel[0].goDate ? uniqueTravel[0].goDate : 'Choose a date'} onChange={handleChangeUniqueTravelDate} />
                        <TimeSelector go={true} onChangeProp={handleUniqueTimeChange} />
                    </div>
                )}
            <div><Button disabled={disableValidation}>Set a liana</Button></div>
        </form>
    </ThrowComponent >);
};
