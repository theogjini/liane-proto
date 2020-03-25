import React, { useState } from 'react';
import Find from './Find/Find.jsx';
import Throw from './Throw/Throw.jsx';
import { PageTitle, Underline } from './style';

export default function AddLiana() {
    const [driver, setDriver] = useState(true);
    // const [passenger, setPassenger] = useState(true);

    function changePage(event, page) {
        event.preventDefault();
        const whitchPage = page === 'driver' ? true : false;
        setDriver(whitchPage);
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ marginBottom: '50px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <PageTitle active={driver} onClick={event => changePage(event, 'driver')}>Driver</PageTitle>
                <PageTitle active={!driver} onClick={changePage}>Passenger</PageTitle>
                <Underline active={driver} />
            </div>
            {driver && (<Throw active={driver} />)}
            {!driver && (<Find active={!driver} />)}
        </div >
    )
};
