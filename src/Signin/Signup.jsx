import React, { useState } from 'react';
import { FormContainer, Input, InputContainer, Button } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { notification } from '../utils.js';

export default function Signup() {

    const dispatch = useDispatch();

    const avatar = useSelector(state => state.avatar);

    const history = useHistory();

    const [messageError, setMessageError] = useState("")

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [passwordRepeat, setPasswordRepeat] = useState("");

    const disableValidation = username === "" || password === "" || password !== passwordRepeat || passwordRepeat === "";

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('Signup: SignupHandle')
        if (!avatar.name) return notification("neutral", "Start by choosing an avatar!", dispatch);
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        data.append("avatar", JSON.stringify(avatar))
        let req = await fetch('/signup', { method: 'POST', body: data });
        let parsed = await req.json();
        if (parsed.success) {
            dispatch({ type: 'GET_AVATAR', avatar: parsed.avatar });
            notification("success", parsed.desc, dispatch);;
            console.log('Signup success', parsed.avatar);
            history.push('/dashboard');
        };
        if (!parsed.success) {
            console.log('Signup error', parsed.desc);
            setMessageError(parsed.desc);
            notification("error", parsed.desc, dispatch);;
        };
    };

    function handleChangeUsername(event) {
        let input = event.target.value;
        setUsername(input);
    };

    function handleChangePassword(event) {
        let input = event.target.value;
        setPassword(input);
    };

    function handleRepeatPassword(event) {
        let input = event.target.value;
        setPasswordRepeat(input);
    }

    return (<FormContainer >
        <form onSubmit={handleSubmit} autoComplete='off'>
            <InputContainer error={messageError}>Username
                <Input type="text" onChange={handleChangeUsername}
                    value={username} placeholder="Username" autoComplete='off' spellCheck="false"
                />
            </InputContainer>
            <InputContainer>Password
                <Input type="password" onChange={handleChangePassword}
                    value={password} placeholder="Password" autoComplete='new-password' spellCheck="false" />
            </InputContainer>
            <InputContainer>Repeat
                <Input type="password" onChange={handleRepeatPassword}
                    value={passwordRepeat} placeholder="Repeat Password" autoComplete='new-password' spellCheck="false" />
            </InputContainer>
            <div><Button disabled={disableValidation}>Sign up!</Button></div>
        </form>
        {(avatar.name && !avatar.registered) && (<div style={{ marginTop: "25px" }}>
            You will register:<h3> {avatar.name}</h3>
            <div><img src={avatar.path} height="75px" /></div>
            <div>You want to change your avatar? <Link to="/" style={{ fontSize: "20px", fontWeight: "600" }}> Click here!</Link></div>
        </div>)}
        {!avatar.name && (<div style={{ marginTop: "25px" }}>
            Begin by choosing an<Link to="/" style={{ fontSize: "20px", fontWeight: "600" }}> avatar!</Link>
        </div>)}
        {avatar.registered && (<div style={{ marginTop: "25px" }}>
            Already registered!<Link to="/dashboard" style={{ fontSize: "20px", fontWeight: "600" }}> Dashboard!</Link>
        </div>)}
    </FormContainer >)
};
