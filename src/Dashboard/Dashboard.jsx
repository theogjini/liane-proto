import React, { useState, useEffect } from 'react';
import { Day, Main, Nav, Search, Me, DashContent, Profile, BoldSpan, Lianas, NoTravels } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { week, notification, getUserChatrooms, getUserTravels } from '../utils.js';
import Liana from './Liana/Liana.jsx';

export default function Dashboard() {

  const [ws, setWs] = useState(new WebSocket('ws://localhost:4000/init'));

  const [day, setDay] = useState('profile');

  const [idx, setIdx] = useState(-1);

  const travels = useSelector(state => state.travels);

  const travelsOfCurrentDay = travels.filter(trvl => trvl.day === idx);
  const uniqueTravelsToDisplay = travelsOfCurrentDay.filter(trvl => trvl.goDate);
  const recurrentTravelsToDisplay = travelsOfCurrentDay.filter(trvl => !trvl.goDate);
  console.log('travelsOfCurrentDay', travelsOfCurrentDay);

  const noTravels = travelsOfCurrentDay.length === 0;

  const avatar = useSelector(state => state.avatar);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!avatar.name) history.push('/');
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected to socket');
    };

    ws.onmessage = event => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(event.data)
      console.log('received message', message)
    };

    ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      setWs(new WebSocket('ws://localhost:4000/init'))
    };

    getUserTravels(dispatch);
    getUserChatrooms(dispatch);
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
      <Search onClick={e => history.push("/add-liana")}><div>+</div></Search>
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
