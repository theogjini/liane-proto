import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Throw() {
    const [end, setEnd] = useState("")
    const [start, setStart] = useState("")
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
        // event.target.setCustomValidity("Valid Canadian zip code should follow A0A 0A0")
        let formattedString = event.target.value.toUpperCase()
        setState(formattedString)
    }
    return (<div>
        <h1>Driver</h1>
        <form onSubmit={handleSubmit}>
            <div>From
                <input type="text" onChange={event => changeValue(event, start, setStart)}
                    value={start} placeholder="Postal code to start"
                />
            </div>
            <div>To<input type="text" onChange={event => changeValue(event, end, setEnd)}
                value={end} placeholder="Postal code to arrival" /></div>
            <button>Set a liana</button>
        </form>
        <Link to="/dashboard">Dashboard</Link>
    </div >)
}