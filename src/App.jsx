import React, { } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home/Home.jsx';
import AddLiana from './AddLiana/AddLiana.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Signin from './Signin/Signin.jsx';
import Road from './Road/Road.jsx';
import Notification from './Notification/Notification.jsx';
import Chatroom from './Chatroom/Chatroom.jsx';
import { week } from './utils.js';

export default function App() {
    return (<BrowserRouter>
        <Notification />
        <Route exact={true} path="/" render={() => <Home />} />
        <Route exact={true} path="/dashboard" render={() => <Dashboard />} />
        <Route exact={true} path="/add-liana" render={() => <AddLiana />} />
        <Route exact={true} path="/sign-in/login" render={() => <Signin login={true} />} />
        <Route exact={true} path="/sign-in/signup" render={() => <Signin login={false} />} />
        <Route exact={true} path="/road/:start/:end" render={routerData => <Road start={routerData.match.params.start} end={routerData.match.params.end} />} />
        <Route exact={true} path="/chatroom/:chatroomId" render={routerData => <Chatroom id={routerData.match.params.chatroomId} />} />
        {week.map(day => {
            <Route exact={true} path={"/dashboard/" + day} render={() => <Dashboard day={day} />} />
        }
        )}
    </BrowserRouter>)
};
