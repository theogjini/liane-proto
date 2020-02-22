import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Driver from './Throw.jsx/index.js'
import Pedestrian from './Pedestrian.jsx'


export default function App() {
    return (<BrowserRouter>
        <Route exact={true} path="/" render={routerData => <Home />} />
        <Route exact={true} path="/dashboard" render={routerData => <Dashboard />} />
        <Route exact={true} path="/find-liana" render={routerData => <Find />} />
        <Route exact={true} path="/throw-liana" render={routerData => <Throw />} />
    </BrowserRouter>)
}

