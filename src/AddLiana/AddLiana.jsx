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
        <div>
            <div style={{ marginBottom: '50px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'inline-block', position: 'relative' }}>
                    <PageTitle active={driver} onClick={event => changePage(event, 'driver')}>Driver</PageTitle>
                    <PageTitle active={!driver} onClick={changePage}>Passenger</PageTitle>
                    <Underline active={driver} />
                </div>
            </div>
            {driver && (<Throw active={driver} />)}
            {!driver && (<Find active={!driver} />)}
        </div >
    )
};
