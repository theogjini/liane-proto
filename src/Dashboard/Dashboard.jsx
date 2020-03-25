import React, { useState } from 'react';
import { Day, Find, Main, Nav, Throw } from './style';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

export default function Dashboard() {
  const [day, setDay] = useState("");
  const avatar = useSelector(state => state.avatar);
  const history = useHistory();

  function handleDayClick(event, day) {
    event.preventDefault();
    setDay(day)
  }

  return (
    <Main>
      <Throw onClick={e => history.push("/add-liana")}><span>+</span></Throw>
      <Nav position={day}>
        <Day onClick={event => handleDayClick(event, 'monday')} active={day === 'monday'}>Mon.</Day>
        <Day onClick={event => handleDayClick(event, 'tuesday')} active={day === 'tuesday'}>Tue.</Day>
        <Day onClick={event => handleDayClick(event, 'wednesday')} active={day === 'wednesday'}>Wed.</Day>
        <Day onClick={event => handleDayClick(event, 'thursday')} active={day === 'thursday'}>Thu.</Day>
        <Day onClick={event => handleDayClick(event, 'friday')} active={day === 'friday'}>Fri.</Day>
        <Day onClick={event => handleDayClick(event, 'saturday')} active={day === 'saturday'}>Sat.</Day>
        <Day onClick={event => handleDayClick(event, 'sunday')} active={day === 'sunday'}>Sun.</Day>
      </Nav>
      <div>
        {!day ? (<div style={{ textAlign: 'center', fontFamily: 'Open Sans' }}>Hello {avatar.name}</div>) :
          (<div>{day}</div>)}
      </div>
    </Main>)
}