import React, { useState } from 'react';
import { FormContainer, Input, InputContainer, Button } from './style';
import { useDispatch } from 'react-redux';

export default function Signup() {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [passwordRepeat, setPasswordRepeat] = useState("");

    const disableValidation = username === "" || password === "" || password !== passwordRepeat || passwordRepeat === "";

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.append("start", start);
        data.append("end", end);
        let req = await fetch('/find', { method: 'POST', body: data });
        let parsed = await req.json();
        if (parsed.success)
            console.log('results: ', results)
        console.log('Signup: SignupHandle')
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
            <InputContainer>Username
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
    </FormContainer >)
};
