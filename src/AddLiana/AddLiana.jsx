import React, { useState, useEffect } from 'react';
import Find from './Find/Find.jsx';
import Throw from './Throw/Throw.jsx';
import { Link, useHistory } from 'react-router-dom';
import { PageTitle, Underline, LinkContainer, AddLianaContainer } from './style';
import { useSelector } from 'react-redux';
import './style.css'



export default function AddLiana() {
    const [driver, setDriver] = useState(true);

    const avatar = useSelector(state => state.avatar);

    const history = useHistory();

    useEffect(() => {
        if (!avatar.name) history.push('/');
    }, []);

    function changePage(event, page) {
        event.preventDefault();
        const whitchPage = page === 'driver' ? true : false;
        setDriver(whitchPage);
    };

    return (
        <AddLianaContainer >
            <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'inline-block', position: 'relative' }}>
                    <PageTitle active={driver} onClick={event => changePage(event, 'driver')}>Driver</PageTitle>
                    <PageTitle active={!driver} onClick={changePage}>Passenger</PageTitle>
                    <Underline active={driver} />
                </div>
            </div>
            {driver && (<Throw active={driver} />)}
            {!driver && (<Find active={!driver} />)}
            <LinkContainer>
                <Link to="/dashboard"><img src={avatar.path} /></Link>
            </LinkContainer>
        </AddLianaContainer >
    )
};
