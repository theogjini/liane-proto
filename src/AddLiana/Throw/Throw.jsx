import React, { useState, useEffect } from 'react';
import { ThrowComponent, DayTable, Day, Button } from './style';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import TimeSelector from './TimeSelector/TimeSelector.jsx';
import { week } from '../../utils.js';
import { useSelector } from 'react-redux';

class DayTravel {
    constructor(goTime, returnTime) {
        this.goTime = goTime
        this.returnTime = returnTime
        this.unique = null
    };
    isSelected() {
        return this.goTime || this.returnTime
    };
}

export default function Throw(props) {

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

    const history = useHistory();

    const avatar = useSelector(state => state.avatar);

    useEffect(() => {
        if (!avatar.name) history.push('/');
    })

    const [end, setEnd] = useState("");

    const [start, setStart] = useState("");

    const [days, setDays] = useState(defaultDaysState);

    const disableValidation = end === "" || start === "";

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

    function handleDateChange(event) {
        event.preventDefault();
        setDate(event.target.value);
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
            <div>From
                <input type="text" onChange={event => changeValue(event, start, setStart)}
                    value={start} placeholder="Postal code to start"
                />
            </div>
            <div>To<input type="text" onChange={event => changeValue(event, end, setEnd)}
                value={end} placeholder="Postal code to arrival" /></div>
            <div>
                <DayTable>
                    {week.map((day, idx) => {
                        return (<div key={day.key} style={{ display: 'flex', alignItems: 'center' }}>
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
            </div>
            <div><Button disabled={disableValidation}>Set a liana</Button></div>
        </form>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link to="/dashboard"><img src={avatar.path} height="30px" />Dashboard</Link>
        </div>
    </ThrowComponent >);
};
