import styled from 'styled-components';

const dayColor = {
    monday: '#58da58',
    tuesday: '#674bf5',
    wednesday: '#e20404',
    thursday: '#3db1c5',
    friday: '#FF9800',
    saturday: '#1757a5',
    sunday: '#d4b230',
};

const ThrowComponent = styled.div`
    font-family: 'Open Sans';
    text-align: center;
`

const DayTable = styled.div`
    margin: auto;
    display: block;
    max-width: 290px;
    margin-top: 25px;
    margin-bottom: 25px;
`

const Button = styled.button`
    background-color: white;
    font-family: 'Open Sans';
    font-size: 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    border: 2px solid black;
    color: black;
    cursor: pointer;
    margin-bottom: 5px;
    :disabled {
        border: 2px solid #c2c2c2c2;
        color: #c2c2c2c2;
        cursor: default;
    }
`

const Day = styled.div`
    border: ${props => props.active ? '2px solid black' : '2px solid #cccccc'};
    padding: 5px;
    width: 55px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? dayColor[props.currentDay] : 'white'};
    color: ${props => !props.active ? dayColor[props.currentDay] : 'white'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.2s ease-in-out;
`

export { ThrowComponent, DayTable, Day, Button };
