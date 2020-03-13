import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home/Home.jsx'
import Throw from './Throw/Throw.jsx'
import Find from './Find/Find.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'


export default function App() {
    return (<BrowserRouter>
        <Route exact={true} path="/" render={routerData => <Home />} />
        <Route exact={true} path="/dashboard" render={routerData => <Dashboard />} />
        <Route exact={true} path="/find-liana" render={routerData => <Find />} />
        <Route exact={true} path="/throw-liana" render={routerData => <Throw />} />
        {/* <Route exact={true} path="/chatroom/:chatroomId" render={routerData => <Throw />} /> */}
    </BrowserRouter>)
}

