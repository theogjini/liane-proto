import styled from 'styled-components';


const FindComponent = styled.div`
    font-family: 'Open Sans';
    text-align: center;
`

const DayTable = styled.div`
    display:grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    margin-top: 25px;
    margin-bottom: 25px;
`

const Monday = styled.div`
    border: 2px solid black;
    padding: 5px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#58da58' : 'white'};
    color: ${props => !props.active ? '#58da58' : 'white'};
    font-size: 14px;
`

const Tuesday = styled.div`
    border: 2px solid black;
    padding: 5px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#674bf5' : 'white'};
    color: ${props => !props.active ? '#674bf5' : 'white'};
    font-size: 14px;
`

const Wednesday = styled.div`
    border: 2px solid black;
    padding: 5px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#e20404' : 'white'};
    color: ${props => !props.active ? '#e20404' : 'white'};
    font-size: 14px;
`

const Thursday = styled.div`
    border: 2px solid black;
    padding: 5px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#3db1c5' : 'white'};
    color: ${props => !props.active ? '#3db1c5' : 'white'};
    font-size: 14px;    
`

const Friday = styled.div`
    border: 2px solid black;
    padding: 5px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#FF9800' : 'white'};
    color: ${props => !props.active ? '#FF9800' : 'white'};
    font-size: 14px;
`

export { FindComponent, DayTable, Monday, Tuesday, Wednesday, Thursday, Friday };
