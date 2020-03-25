import styled from 'styled-components';

const positions = {
    monday: '#58da58',
    tuesday: '#674bf5',
    wednesday: '#e20404',
    thursday: '#3db1c5',
    friday: '#FF9800'
};

const Main = styled.div`
font-family: 'Open Sans';
position: relative;
height: 99vh;
`
const Nav = styled.div`
    background: ${props => {
        let pos = positions[props.position]
        console.log('props:', pos)
        return props.position ? pos : '#d2d2d2'
    }};
    height: 150px;
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    align-items: center;
    transition: 0.6s ease-in-out;
`

const Find = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    >a>img {height: 30px;}
`

const Throw = styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 31px;
    height: 31px;
    font-size: 30px;
    font-weight: 600;
    color: white;
    background-color: red;
    border-radius: 50%;
    span {
        position: absolute;
        top: -5px;
        left: 6px;
    }
`

const Day = styled.div`
    position: relative;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    top: ${props => props.active ? '30%' : '18%'};;
    height: 50%;
    font-size: ${props => props.active ? '30px' : '18px'};
    font-weight: ${props => props.active ? 600 : 500};
    transition: 0.2s ease-in-out;
    /* text-shadow: 2px 2px 7px #000000; */
`

export { Main, Nav, Day, Find, Throw };