import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (<div>
        <h1>Liane</h1>
        <div>
            Choose a random name
            <Link to="/dashboard">Chose your monkey</Link>
        </div>
    </div>)
}

