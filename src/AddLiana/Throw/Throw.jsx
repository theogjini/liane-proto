import React, { useState, useEffect } from 'react';
import { ThrowComponent, DayTable, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } from './style';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import TimeSelector from './TimeSelector/TimeSelector.jsx';

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

    const [end, setEnd] = useState("")

    const [start, setStart] = useState("")

    const [recurrence, setReccurrence] = useState(true)

    const [days, setDays] = useState(defaultDaysState)

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
            {recurrence ?
                (<div>
                    <DayTable>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Monday onClick={event => addDay(event, 0)} active={days[0]}>Mon.</Monday>
                            {days[0] && (<div>
                                <div><TimeSelector go={true} onChangeProp={event => handleGoTimeChange(event, 0)} default={days[0] ? days[0].goTime : none} /></div>
                                <div><TimeSelector go={false} onChangeProp={event => handleReturnTimeChange(event, 0)} /></div>
                            </div>)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <Tuesday onClick={event => addDay(event, 1)} active={days[1]}>Tues.</Tuesday>
                            {days[1] && (<div>
                                <div><TimeSelector go={true} onChangeProp={event => handleGoTimeChange(event, 1)} default={days[1] ? days[1].goTime : none} /></div>
                                <div><TimeSelector go={false} onChangeProp={event => handleReturnTimeChange(event, 1)} /></div>
                            </div>)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Wednesday onClick={event => addDay(event, 2)} active={days[2]}>Wed.</Wednesday>
                            {days[2] && (<div>
                                <div><TimeSelector go={true} onChangeProp={event => handleGoTimeChange(event, 2)} default={days[2] ? days[2].goTime : none} /></div>
                                <div><TimeSelector go={false} onChangeProp={event => handleReturnTimeChange(event, 2)} /></div>
                            </div>)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Thursday onClick={event => addDay(event, 3)} active={days[3]}>Thu.</Thursday>
                            {days[3] && (<div>
                                <div><TimeSelector go={true} onChangeProp={event => handleGoTimeChange(event, 3)} default={days[3] ? days[3].goTime : none} /></div>
                                <div><TimeSelector go={false} onChangeProp={event => handleReturnTimeChange(event, 3)} /></div>
                            </div>)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Friday onClick={event => addDay(event, 4)} active={days[4]}>Fri.</Friday>
                            {days[4] && (<div>
                                <div><TimeSelector go={true} onChangeProp={event => handleGoTimeChange(event, 4)} default={days[4] ? days[4].goTime : none} /></div>
                                <div><TimeSelector go={false} onChangeProp={event => handleReturnTimeChange(event, 4)} /></div>
                            </div>)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Saturday onClick={event => addDay(event, 5)} active={days[5]}>Sat.</Saturday>
                            {days[5] && (<div>
                                <div><TimeSelector go={true} onChangeProp={event => handleGoTimeChange(event, 5)} default={days[5] ? days[5].goTime : none} /></div>
                                <div><TimeSelector go={false} onChangeProp={event => handleReturnTimeChange(event, 5)} /></div>
                            </div>)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Sunday onClick={event => addDay(event, 6)} active={days[6]}>Sun.</Sunday>
                            {days[6] && (<div>
                                <div><TimeSelector go={true} onChangeProp={event => handleGoTimeChange(event, 6)} default={days[6] ? days[6].goTime : none} /></div>
                                <div><TimeSelector go={false} onChangeProp={event => handleReturnTimeChange(event, 6)} /></div>
                            </div>)}
                        </div>
                    </DayTable>
                </div>) : (
                    <div>
                        <input type="date" name="date" onChange={handleTimeChange}></input>
                        <input type="time" name="date" onChange={handleDateChange}></input>
                    </div>
                )}
            <div><button>Set a liana</button></div>
        </form>
        <div>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    </ThrowComponent >);
};
