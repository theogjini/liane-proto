import React, { useState } from 'react'
import { ThrowComponent, DayTable, Monday, Tuesday, Wednesday, Thursday, Friday } from './style';
import { Link, useHistory } from 'react-router-dom'

export default function Throw() {

    const [end, setEnd] = useState("")

    const [start, setStart] = useState("")

    const [recurrence, setReccurrence] = useState(true)

    const [days, setDays] = useState([false, false, false, false, false])


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
        event.preventDefault()
        let selectedDays = days.slice()
        selectedDays[day] = !days[day]
        console.log('selected Days:', selectedDays)
        setDays(selectedDays)
    }
    return (<ThrowComponent>
        <h1>Driver</h1>
        <form onSubmit={handleSubmit}>
            <div>From
                <input type="text" onChange={event => changeValue(event, start, setStart)}
                    value={start} placeholder="Postal code to start"
                />
            </div>
            <div>To<input type="text" onChange={event => changeValue(event, end, setEnd)}
                value={end} placeholder="Postal code to arrival" /></div>
            {recurrence ?
                (<DayTable>
                    <Monday onClick={event => addDay(event, 0)} active={days[0]}>Mon.</Monday>
                    <Tuesday onClick={event => addDay(event, 1)} active={days[1]}>Tues.</Tuesday>
                    <Wednesday onClick={event => addDay(event, 2)} active={days[2]}>Wed.</Wednesday>
                    <Thursday onClick={event => addDay(event, 3)} active={days[3]}>Thu.</Thursday>
                    <Friday onClick={event => addDay(event, 4)} active={days[4]}>Fri.</Friday>
                </DayTable>) : (<div></div>)}

            <div><button onClick={changeRecurrence}>{recurrence ? 'Unique travel' : 'Reccurent travel'}</button></div>

            <div><button>Set a liana</button></div>
        </form>
        <div>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    </ThrowComponent >)
}