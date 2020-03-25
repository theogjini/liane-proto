import React, { useState, useEffect } from 'react'
import { ThrowComponent, DayTable, Monday, Tuesday, Wednesday, Thursday, Friday } from './style';
import { Link, useHistory } from 'react-router-dom'

class DayTravel {
    constructor(goTime, returnTime) {
        this.goTime = goTime
        this.returnTime = returnTime
    };
    isSelected() {
        return this.goTime || this.returnTime
    }
}

export default function Throw(props) {

    const [end, setEnd] = useState("")

    const [start, setStart] = useState("")

    const [recurrence, setReccurrence] = useState(true)

    const [days, setDays] = useState([null, null, null, null, null])

    const [date, setDate] = useState('')

    const [time, setTime] = useState('')

    useEffect(() => {
        let now = new Date()
        console.log(now)
    })

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
    }
    function changeValue(event, state, setState) {
        let formattedString = event.target.value.toUpperCase()
        setState(formattedString)
    }
    function changeRecurrence(event) {
        event.preventDefault()
        setReccurrence(!recurrence)
    }
    function addDay(event, day) {
        event.preventDefault();
        let selectedDays = days.slice();
        let dayToAdd = new DayTravel
        selectedDays[day] = !days[day] ? dayToAdd : null;
        console.log('selected Days:', selectedDays);
        setDays(selectedDays);
    }
    function handleDateChange(event) {
        event.preventDefault();
        setDate(event.target.value);
    }
    function handleTimeChange(event) {
        event.preventDefault();
        setTime(event.target.value);
    }
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
                        <div>
                            <Monday onClick={event => addDay(event, 0)} active={days[0]}>Mon.</Monday>
                            {days[0] && (<div>
                                <div><input type="time" /></div>
                                <div><input type="time" /></div>
                            </div>)}
                        </div>
                        <div>
                            <Tuesday onClick={event => addDay(event, 1)} active={days[1]}>Tues.</Tuesday>
                            {days[1] && (<div>
                                <div><input type="time" /></div>
                                <div><input type="time" /></div>
                            </div>)}
                        </div>
                        <div>
                            <Wednesday onClick={event => addDay(event, 2)} active={days[2]}>Wed.</Wednesday>
                            {days[2] && (<div>
                                <div><input type="time" /></div>
                                <div><input type="time" /></div>
                            </div>)}
                        </div>
                        <div>
                            <Thursday onClick={event => addDay(event, 3)} active={days[3]}>Thu.</Thursday>
                            {days[3] && (<div>
                                <div><input type="time" /></div>
                                <div><input type="time" /></div>
                            </div>)}
                        </div>
                        <div>
                            <Friday onClick={event => addDay(event, 4)} active={days[4]}>Fri.</Friday>
                            {days[4] && (<div>
                                <div><input type="time" /></div>
                                <div><input type="time" /></div>
                            </div>)}
                        </div>
                    </DayTable>
                </div>) : (
                    <div>
                        <input type="date" name="date" onChange={handleTimeChange}></input>
                        <input type="time" name="date" onChange={handleDateChange}></input>
                    </div>
                )}

            <div><button onClick={changeRecurrence}>{recurrence ? 'Unique travel' : 'Reccurent travel'}</button></div>

            <div><button>Set a liana</button></div>
        </form>
        <div>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    </ThrowComponent >)
}