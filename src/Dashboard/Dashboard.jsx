import React, { useState, useEffect } from 'react';
import { Day, Main, Nav, Throw, Me, DashContent, Profile, BoldSpan, Lianas, NoTravels } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { week, notification } from '../utils.js';
import Liana from './Liana/Liana.jsx';

export default function Dashboard() {

  const [day, setDay] = useState('profile');

  const [idx, setIdx] = useState(-1);

  const [travels, setTravels] = useState([]);

  const travelsOfCurrentDay = travels.filter(trvl => trvl.day === idx);
  const uniqueTravelsToDisplay = travelsOfCurrentDay.filter(trvl => trvl.goDate);
  const recurrentTravelsToDisplay = travelsOfCurrentDay.filter(trvl => !trvl.goDate);

  const noTravels = travelsOfCurrentDay.length === 0;

  const avatar = useSelector(state => state.avatar);
  console.log(avatar);

  const history = useHistory();

  const dispatch = useDispatch();

  console.log('currentDay', day);
  console.log('current idx', idx);
  console.log('current travels', travelsOfCurrentDay);

  useEffect(() => {
    if (!avatar.name) history.push('/');
    async function getUsertravels() {
      const req = await fetch('/get-travels');
      const parsed = await req.json();
      if (parsed.success) {
        console.log('parsed travels:', parsed.travels)
        dispatch({ type: 'GET_TRAVELS', travels: parsed.travels });
        setTravels(parsed.travels);
      };
    };
    getUsertravels();
  }, []);

  function handleDayClick(event, day, idx) {
    event.preventDefault();
    setIdx(idx);
    setDay(day);
  };

  function handleSeeMyProfile(event) {
    event.preventDefault();
    setIdx(-1);
    setDay('profile');
  };

  function handleLogout(event) {
    event.preventDefault();
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    return notification('success', 'See you soon!', dispatch);
  };

  return (
    <Main>
      <Throw onClick={e => history.push("/add-liana")}><div>+</div></Throw>
      {day !== 'profile' && (<Me onClick={handleSeeMyProfile}><img src={avatar.path} /></Me>)}
      <Nav position={day}>
        {week.map((currentDay, idx) => {
          return (
            <Day key={currentDay.key} onClick={event => handleDayClick(event, currentDay.key, idx)} active={day === currentDay.key}>
              {day === currentDay.key ? currentDay.cap : currentDay.short}
            </Day>
          )
        })}
      </Nav>
      <DashContent>
        {day === 'profile' ? (
          <Profile >
            Hello <BoldSpan>{avatar.name}</BoldSpan>
            <div>
              <img src={avatar.path} height="150px" />
            </div>
            {!avatar.registered ?
              <div>If you want to save your avatar<BoldSpan><Link to="/sign-in/signup"> Sign Up!</Link></BoldSpan></div> :
              <BoldSpan onClick={handleLogout} > Logout</BoldSpan>}
          </Profile>
        ) :
          (<Lianas >
            {noTravels && (<NoTravels>No lianas...</NoTravels>)}
            {recurrentTravelsToDisplay.map(trvl => <Liana key={trvl._id} travel={trvl} />)}
            {uniqueTravelsToDisplay.map(trvl => <Liana key={trvl._id} travel={trvl} />)}
          </Lianas>)}
      </DashContent>
    </Main >)
};
