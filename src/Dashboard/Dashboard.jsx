import React, { useState, useEffect } from 'react';
import { Day, Main, Nav, Throw, Me } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { week } from '../utils.js';
import capitalize from 'capitalize';

export default function Dashboard() {

  const [day, setDay] = useState('profile');

  const avatar = useSelector(state => state.avatar);
  console.log(avatar);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!avatar.name) history.push('/');
  });

  function handleDayClick(event, day) {
    event.preventDefault();
    setDay(day)
  };

  function handleSeeMyProfile(event) {
    event.preventDefault();
    setDay('profile')
  };

  function handleLogout(event) {
    event.preventDefault();
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };

  return (
    <Main>
      <Throw onClick={e => history.push("/add-liana")}><div>+</div></Throw>
      <Me onClick={handleSeeMyProfile}><img src={avatar.path} /></Me>
      <Nav position={day}>
        {week.map(currentDay => {
          return (
            <Day key={currentDay.key} onClick={event => handleDayClick(event, currentDay.key)} active={day === currentDay.key}>
              {day === currentDay.key ? currentDay.cap : currentDay.short}
            </Day>
          )
        })}
      </Nav>
      <div>
        {day === 'profile' ? (
          <div style={{ textAlign: "center", marginTop: "25px" }}>
            Hello <span style={{ fontSize: "20px", fontWeight: "600" }}>{avatar.name}</span>
            <div>
              <img src={avatar.path} height="150px" />
            </div>
            {!avatar.registered ?
              <div>If you want to save your avatar<Link to="/sign-in/signup" style={{ fontSize: "20px", fontWeight: "600" }}> Sign Up!</Link></div> :
              <div style={{ fontSize: "20px", fontWeight: "600" }} onClick={handleLogout}>Logout</div>}
          </div>
        ) :
          (<h1 style={{ display: 'flex' }}>{capitalize(day)}</h1>)}
      </div>
    </Main>)
};
