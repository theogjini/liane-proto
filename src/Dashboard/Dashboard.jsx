import React, { useState, useEffect } from 'react';
import { Day, Main, Nav, Throw, Me } from './style';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { week } from '../utils.js';

export default function Dashboard() {

  const [day, setDay] = useState('profile');

  const avatar = useSelector(state => state.avatar);
  console.log(avatar);

  const history = useHistory();

  useEffect(() => {
    if (!avatar.name) history.push('/');
  })

  function handleDayClick(event, day) {
    event.preventDefault();
    setDay(day)
  }

  function handleSeeMyProfile(event) {
    event.preventDefault();
    setDay('profile')
  }

  return (
    <Main>
      <Throw onClick={e => history.push("/add-liana")}><div>+</div></Throw>
      <Me onClick={handleSeeMyProfile}><img src={avatar.path} /></Me>
      <Nav position={day}>
        {week.map(currentDay => {
          return (
            <Day onClick={event => handleDayClick(event, currentDay.key)} active={day === currentDay.key}>
              {day === currentDay.key ? currentDay.cap : currentDay.short}
            </Day>
          )
        })}
      </Nav>
      <div>
        {day === 'profile' ? (
          <div style={{ textAlign: 'center', fontFamily: 'Open Sans' }}>
            Hello {avatar.name}
            <div>
              <img src={avatar.path} height="150px" />
            </div>
          </div>
        ) :
          (<div>{day}</div>)}
      </div>
    </Main>)
}