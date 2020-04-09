import React, { useState, useEffect } from 'react';
import { Day, Main, Nav, Throw, Me, DashContent, Profile, BoldSpan, Lianas } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { week, notification } from '../utils.js';
import LianaLink from './LianaLink/LianaLink.jsx';

export default function Dashboard() {

  const [day, setDay] = useState('profile');

  const [idx, setIdx] = useState(-1);

  const [travels, setTravels] = useState([]);

  const travelsToDisplay = travels.filter(trvl => trvl.day === idx);

  const avatar = useSelector(state => state.avatar);
  console.log(avatar);

  const history = useHistory();

  const dispatch = useDispatch();

  console.log('currentDay', day);
  console.log('current idx', idx);
  console.log('current travels', travelsToDisplay);

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
            {travelsToDisplay.map(trvl => <LianaLink key={trvl._id} travel={trvl} />)}
          </Lianas>)}
      </DashContent>
    </Main >)
};
