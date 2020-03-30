import React, { useState, useEffect } from 'react';
import { HomeComponent, Button, Title, Span, Bounce } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './particles.css';
import Particles from 'react-particles-js';
import { particlesParams } from './particlesParams';


export default function Home() {

    const dispatch = useDispatch();

    const avatar = useSelector(state => state.avatar);

    const history = useHistory();

    useEffect(() => {
        async function getUserAvatar() {
            const req = await fetch('/recall-avatar');
            const parsed = await req.json();
            if (parsed.success) {
                console.log('parsedAvatar:', parsed.avatar)
                dispatch({ type: "GET_AVATAR", avatar: parsed.avatar });
            };
            return;
        };
        getUserAvatar();
    }, []);

    async function pop() {
        let request = await fetch('/pop-avatar', { method: "POST" })
        let parse = await request.json()
        if (parse.success) {
            console.log(parse.uniqueMonkey)
            dispatch({ type: "GET_AVATAR", avatar: parse.uniqueMonkey })
        }
    };

    async function handleSelectAvatar(event) {
        event.preventDefault();
        console.log('avatar selected:', avatar)
        const data = new FormData()
        data.append('avatar', JSON.stringify(avatar))
        let req = await fetch('/select-avatar', { method: "POST", body: data });
        let parse = await req.json();
        if (parse.success) {
            console.log(parse)
            history.push('/dashboard')
        };
    };

    return (
        <div>
            <Particles zIndex={0} className="particles" params={particlesParams} />
            <HomeComponent>
                <div>
                    <Title>Liane</Title>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {!avatar.name && (<h4 style={{ textAlign: "center" }}>Welcome!! It seems that it's your first time coming! Let's start by choosing an avatar!</h4>)}
                    {avatar.name && (<div onClick={handleSelectAvatar} style={{ cursor: "pointer" }}>
                        <h3 style={{ fontStyle: "italic" }}>{avatar.name}</h3>
                        <Bounce><Span ><img src={avatar.path} height="100px" /></Span></Bounce>
                        {/* {avatar.name && (<div to='/dashboard'><Love>I love it!!</Love></div>)} */}
                    </div>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={pop}>Pop it</Button>
                </div>
            </HomeComponent >
        </div>)
}

// style={{ backgroundColor: avatar.original.split("_")[1] }}
