import React, { useState, useEffect } from 'react';
import { HomeComponent, Button, Title, Span, Bounce, LinkContainer, AvatarContainer } from './style';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './particles.css';
import Particles from 'react-particles-js';
import { particlesParams } from './particlesParams';
import { notification } from '../utils.js';


export default function Home() {

    const dispatch = useDispatch();

    const history = useHistory();

    const [tempAvatar, setTempAvatar] = useState({});

    useEffect(() => {
        async function getUserAvatar() {
            const req = await fetch('/recall-avatar');
            const parsed = await req.json();
            if (parsed.success) {
                console.log('parsedAvatar:', parsed.avatar)
                setTempAvatar(parsed.avatar);
            };
            return;
        };
        getUserAvatar();
    }, []);

    async function pop() {
        let request = await fetch('/pop-avatar', { method: "POST" })
        let parsed = await request.json()
        if (parsed.success) {
            setTempAvatar(parsed.avatar);
            console.log(parsed.avatar)
        };
    };

    async function handleSelectAvatar(event) {
        event.preventDefault();
        console.log('avatar selected:', tempAvatar)
        const data = new FormData()
        data.append('avatar', JSON.stringify(tempAvatar))
        let req = await fetch('/select-avatar', { method: "POST", body: data });
        let parsed = await req.json();
        if (parsed.success) {
            console.log(parsed);
            dispatch({ type: "GET_AVATAR", avatar: tempAvatar });
            history.push('/dashboard');
            return notification('neutral', 'Welcome!', dispatch)
        };
    };

    function handleLoginDirect(event) {
        event.preventDefault();
        if (!tempAvatar) {
            history.push('/sign-in/login');
        };
        if (tempAvatar.registered) {
            dispatch({ type: "GET_AVATAR", avatar: tempAvatar })
            history.push('/dashboard')
            return notification('success', 'Welcome back!', dispatch)
        };
        if (!tempAvatar.registered) {
            dispatch({ type: "GET_AVATAR", avatar: tempAvatar })
            history.push('/sign-in/signup')
        };
    };

    return (
        <div>
            <Particles zIndex={0} className="particles" params={particlesParams} />
            <HomeComponent>
                <div>
                    <Title>Liane</Title>
                </div>
                <AvatarContainer >
                    {!tempAvatar.name && (<h4 style={{ textAlign: "center" }}>Welcome!! It seems that it's your first time coming! Let's start by choosing an avatar!</h4>)}
                    {tempAvatar.name && (<div onClick={handleSelectAvatar} style={{ cursor: "pointer" }}>
                        <h3 style={{ fontStyle: "italic" }}>{tempAvatar.name}</h3>
                        <Bounce><Span ><img src={tempAvatar.path} height="100px" /></Span></Bounce>
                        {/* {tempAvatar.name && (<div to='/dashboard'><Love>I love it!!</Love></div>)} */}
                    </div>
                    )}
                </AvatarContainer>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={pop}>Pop it</Button>
                </div>
                <LinkContainer>
                    <span onClick={handleLoginDirect} >Sign in</span>
                </LinkContainer>
            </HomeComponent>
        </div>)
};
