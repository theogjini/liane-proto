import React, { useState } from 'react';
import { FormContainer, Input, InputContainer, Button } from './style';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { notification } from '../utils.js';

export default function Login() {

    const dispatch = useDispatch();

    const history = useHistory();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const disableValidation = username === "" || password === "";

    const placeholderUsername = username ? "" : "Username";
    const placeholderPassword = password ? "" : "Password";

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        let req = await fetch('/auth/login', { method: 'POST', body: data });
        let parsed = await req.json();
        if (parsed.success) {
            console.log('parsed:', parsed);
            dispatch({ type: 'GET_AVATAR', avatar: parsed.avatar })
            history.push('/dashboard')
            return notification('success', parsed.desc, dispatch);
        };
        if (!parsed.success) {
            console.log('error sent back is:', parsed)
            return notification('error', parsed.desc, dispatch);
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

    return (<FormContainer >
        <form onSubmit={handleSubmit}>
            <InputContainer>Username
                <Input type="text" onChange={handleChangeUsername}
                    value={username} placeholder={placeholderUsername} spellCheck="false"
                />
            </InputContainer>
            <InputContainer>Password<Input type="password" onChange={handleChangePassword}
                value={password} placeholder={placeholderPassword} spellCheck="false" /></InputContainer>
            <div><Button disabled={disableValidation}>Login!</Button></div>
        </form>
    </FormContainer >)
};
