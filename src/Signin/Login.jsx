import React, { useState } from 'react';
import { FormContainer, Input, InputContainer, Button } from './style';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Login() {

    const dispatch = useDispatch();

    const history = useHistory();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const disableValidation = username === "" || password === "";

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('Login: loginHandle')
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        let req = await fetch('/login', { method: 'POST', body: data });
        let parsed = await req.json();
        if (parsed.success) {
            console.log('Login name: ', parsed.avatar)
            dispatch({ type: 'GET_AVATAR', avatar: parsed.avatar })
            history.push('/dashboard')
        };
        if (!parsed.success) {
            console.log('Login Error ', parsed.desc);
            return alert(parsed.desc);
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
                    value={username} placeholder="Username" spellCheck="false"
                />
            </InputContainer>
            <InputContainer>Password<Input type="password" onChange={handleChangePassword}
                value={password} placeholder="Password" spellCheck="false" /></InputContainer>
            <div><Button disabled={disableValidation}>Login!</Button></div>
        </form>
    </FormContainer >)
};
