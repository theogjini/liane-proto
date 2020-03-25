import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home/Home.jsx'
import AddLiana from './AddLiana/AddLiana.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'


export default function App() {
    return (<BrowserRouter>
        <Route exact={true} path="/" render={routerData => <Home />} />
        <Route exact={true} path="/dashboard" render={routerData => <Dashboard />} />
        <Route exact={true} path="/add-liana" render={routerData => <AddLiana />} />
        {/* <Route exact={true} path="/chatroom/:chatroomId" render={routerData => <Throw />} /> */}
    </BrowserRouter>)
}

