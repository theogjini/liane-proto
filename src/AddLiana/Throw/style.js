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
    text-align: center;
`

const DayTable = styled.div`
    margin: 0px auto;
    display: block;
    max-width: 290px;
`

const Button = styled.button`
    background-color: white;
    font-size: 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    border: 2px solid #f50057;
    color: #f50057;
    cursor: pointer;
    margin-top: 25px;
    transition: 0.2s ease-in-out;
    :disabled {
        border: 2px solid #c2c2c2c2;
        color: #c2c2c2c2;
        cursor: default;
    }
`

const Day = styled.div`
    border: ${props => props.active ? '2px solid black' : '2px solid #cccccc'};
    padding: 3px;
    width: 55px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 5px;
    background-color: ${props => props.active ? dayColor[props.currentDay] : 'white'};
    color: ${props => !props.active ? dayColor[props.currentDay] : 'white'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.2s ease-in-out;
`

const DateSelector = styled.input`
    border: none;
    font-family: 'Baloo';
    border-bottom: 2px solid #cccccc;
    :focus {
        outline: none;
    }
`

const InputContainer = styled.div`
    display: flex;
    max-width: 290px;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
`

const Input = styled.input`
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    transition: 0.2s ease-in-out;

    ::placeholder {
        font: 400 16px 'Baloo';
        transition: 0.2s ease-out;
        color: #444;
    }
    
    :focus {
        outline: none;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        ::placeholder {
            opacity: 0;
        }
    }
`

export { ThrowComponent, DayTable, Day, Button, DateSelector, Input, InputContainer };
