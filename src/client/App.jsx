import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

    const [ws, setWs] = useState(new WebSocket('ws://192.168.2.69:4000/init'));

    const webSocket = useSelector(state => state.isSocketSessionActive);

    useEffect(() => {
        if (webSocket) {
            console.log("I ACTIVATEED THE CONNECTION")
            ws.onopen = () => {
                // on connecting, do nothing but log it to the console
                console.log('connected to socket');
                ws.send('message', { method: 'GET', body: "hello server!!!" });
            };

            ws.onmessage = event => {
                // on receiving a message, add it to the list of messages
                const message = JSON.parse(event.data)
                notification("yellow", "Hit me baby one more time", dispatch)
                console.log('received message', message)
            };

            ws.onclose = () => {
                console.log('disconnected')
                // automatically try to reconnect on connection loss
                setWs(new WebSocket('ws://localhost:4000/init'))
            };
        };

        if (!webSocket) {
            console.log("I DESACTIVATED THE SOCKET CONNECTION")
        };

    }, [webSocket])

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
