import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SignInContainer, PageTitle, Underline, LinkContainer, SigninToggleContainer, ToggleWrapper } from './style';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export default function Signin(props) {

    const [changeSignType, setchangeSignType] = useState(props.login);

    const avatar = useSelector(state => state.avatar);

    function handleChangeSignType(event) {
        event.preventDefault();
        const switchTo = !changeSignType;
        setchangeSignType(switchTo);
    };

    return (
        <SignInContainer >
            <SigninToggleContainer>
                <ToggleWrapper >
                    <PageTitle active={changeSignType} onClick={handleChangeSignType}>Login</PageTitle>
                    <PageTitle active={!changeSignType} onClick={handleChangeSignType}>Sign up</PageTitle>
                    <Underline active={changeSignType} />
                </ToggleWrapper>
            </SigninToggleContainer>
            {changeSignType && (<Login />)}
            {!changeSignType && (<Signup />)}
            <LinkContainer>
                <Link to="/dashboard"><img src={avatar.path} /></Link>
            </LinkContainer>
        </SignInContainer >
    )
};
