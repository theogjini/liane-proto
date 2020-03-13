import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Driver() {
    const [start, setStart] = useState("")
    const [arrival, setArrival] = useState("")
    function handleSubmit(event) {
        event.preventDefault()
        if (start === "" || arrival === "") return alert("Please enter start and arrival")
        alert("your travel has been added")
    }
    function changeValue(event, state, setState) {
        event.target.setCustomValidity("Valid Canadian zip code should follow A0A 0A0")
        let formattedString = event.target.value.toUpperCase()
        setState(formattedString)
    }
    return (<div>
        <form onSubmit={handleSubmit}>
            <div>From
                <input type="text" onChange={event => changeValue(event, start, setStart)}
                    pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" value={start} placeholder="Postal code to start"
                />
            </div>
            <div>To<input type="text" onChange={event => changeValue(event, arrival, setArrival)}
                pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" value={arrival} placeholder="Postal code to arrival" /></div>
            <button>Find lianas!</button>
        </form>
        <Link to="/dashboard">Dashboard</Link>
    </div >)
}