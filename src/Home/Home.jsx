import React, { useState } from 'react';
import { HomeComponent, Button, Title, Span, Bounce } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './particles.css'

import Particles from 'react-particles-js'
import { particlesParams } from './particlesParams'


export default function Home() {
    const dispatch = useDispatch()
    const avatar = useSelector(state => state.avatar)
    console.log(avatar)
    console.log(particlesParams)
    
    async function pop() {
        let request = await fetch('/pop-avatar', { method: "POST" })
        let parse = await request.json()
        if (parse.success) {
            console.log(parse.uniqueMonkey)
            dispatch({ type: "GET_AVATAR", avatar: parse.uniqueMonkey })
        }
    }
    
    return (
        <div>
            <Particles zIndex={0} className="particles" params={particlesParams} />
            <HomeComponent>
                <div>
                    <Title>Liane</Title>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {!avatar.name && (<h4 style={{ textAlign: "center" }}>Welcome!! It seems that it's your first time coming! Let's start by choosing an avatar!</h4>)}
                    {avatar.name && (<Link to="/dashboard">
                        <h3 style={{ fontStyle: "italic" }}>{avatar.name}</h3>
                        <Bounce><Span ><img src={avatar.path} height="100px" /></Span></Bounce>
                        {/* {avatar.name && (<Link to='/dashboard'><Love>I love it!!</Love></Link>)} */}
                    </Link>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={pop}>Pop it</Button>
                </div>
            </HomeComponent >
        </div>)
}

// style={{ backgroundColor: avatar.original.split("_")[1] }}
