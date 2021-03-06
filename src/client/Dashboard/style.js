import styled from 'styled-components';

const positions = {
    monday: '#58da58',
    tuesday: '#674bf5',
    wednesday: '#e20404',
    thursday: '#3db1c5',
    friday: '#FF9800',
    saturday: '#1757a5',
    sunday: '#d4b230',
    profile: '#a0a0a0',
};

const Main = styled.div`
position: relative;
height: 95vh;
`
const Nav = styled.div`
    background-color: ${props => positions[props.position]};
    height: 150px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    transition: 0.6s ease-in-out;
`
const Search = styled.div`
    cursor: pointer;
    position: absolute;
    right: 50px;
    bottom: 30px;
    width: 50px;
    height: 50px;
    font-size: 30px;
    font-weight: 600;
    color: #249429;
    background-image: url('/assets/icons/liane.svg');
    background-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
        margin-left: -1px;
        margin-top: -1px;
    }
`
const Me = styled.div`
    cursor: pointer;
    position: absolute;
    left: 50px;
    bottom: 30px;
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        height: 50px;
    }
`

const Day = styled.div`
    -webkit-tap-highlight-color: transparent;
    position: relative;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    top: ${props => props.active ? '35%' : '0'};
    font-size: ${props => props.active ? '25px' : '18px'};
    font-weight: ${props => props.active ? 600 : 500};
    transition: 0.1s ease-out;
`

const DashContent = styled.div``

const Profile = styled.div`
    text-align: center;
    margin-top: 25px;
`

const BoldSpan = styled.span`
    font-size: 20px;
    font-weight: 600;
`

const Lianas = styled.div`
`

const NoTravels = styled.div`
    margin: 25px 20px;
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    color: #e2e2e2e2;
`

export { Main, Nav, Day, Search, Me, DashContent, Profile, BoldSpan, Lianas, NoTravels };