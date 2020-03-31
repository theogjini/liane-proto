import React, { useState } from 'react';
import { FormContainer, Input, InputContainer, Button } from './style';
import { useDispatch } from 'react-redux';

export default function Login() {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const disableValidation = username === "" || password === "";

    async function handleSubmit(event) {
        event.preventDefault();
        // const data = new FormData();
        // data.append("start", start);
        // data.append("end", end);
        // let req = await fetch('/find', { method: 'POST', body: data });
        // let parsed = await req.json();
        // if (parsed.success)
        //     console.log('results: ', results)
        console.log('Login: loginHandle')
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
