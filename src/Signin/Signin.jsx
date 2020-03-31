import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SignInContainer, PageTitle, Underline, LinkContainer } from './style';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export default function Signin() {

    const [changeSignType, setchangeSignType] = useState(true);

    const avatar = useSelector(state => state.avatar);

    function handleChangeSignType(event) {
        event.preventDefault();
        const switchTo = !changeSignType;
        setchangeSignType(switchTo);
    };

    return (
        <SignInContainer >
            <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'inline-block', position: 'relative' }}>
                    <PageTitle active={changeSignType} onClick={handleChangeSignType}>Login</PageTitle>
                    <PageTitle active={!changeSignType} onClick={handleChangeSignType}>Sign up</PageTitle>
                    <Underline active={changeSignType} />
                </div>
            </div>
            {changeSignType && (<Login />)}
            {!changeSignType && (<Signup />)}
            <LinkContainer>
                <Link to="/dashboard"><img src={avatar.path} /></Link>
            </LinkContainer>
        </SignInContainer >
    )
};
