import React from 'react';
import { Link } from 'react-router-dom';
import { PopupBackground, PopupContainer, PopupContent } from './style.js';

export default function Popup(props) {

    const url = props.url;

    function handleClose(event) {
        event.preventDefault();
        props.handleClose(event);
    };

    return (
        <PopupContainer>
            <PopupContent>
                <h3>Ready to go? click on this one!</h3>
                <section>
                    <Link to={url}><img src="/assets/monkeys/waitingMonkey.gif" height="150px" /></Link></section>
            </PopupContent>
            <PopupBackground onClick={handleClose}>Hello Popup</PopupBackground>
        </PopupContainer >
    )
}