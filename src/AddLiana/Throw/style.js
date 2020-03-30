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
    max-width: 340px;
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
    display: block;
    border: none;
    border-bottom: 1px solid #cccccc;
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

const Seats = styled.div`
    -webkit-tap-highlight-color: transparent;
    height: 50px; 
    width: 50px; 
    cursor: pointer;
    background-image: url('/assets/icons/liane.svg'); 
    background-repeat: no-repeat;
    background-size: 50px 50px;
    display: grid;
    grid-template-areas: "a a"
                         "a a";
`

const MonkeyHead = styled.div`
    img {
        user-select: none;
        width: ${props => props.added ? '23px' : '0'};
        height: ${props => props.added ? '23px' : '0'};
        transition-duration: 0.2s;
        transition-property: width height;
        transition-timing-function:  cubic-bezier(0.175, 0.885, 0.32, 1.275);;
    }
`

const Input = styled.input`
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    transition: 0.2s ease-in-out;

    ::placeholder {
        font-weight: 600;
        transition: 0.2s ease-out;
        color: lightgray;
    }
    
    :focus {
        outline: none;
        box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.2);
        ::placeholder {
            opacity: 0;
        }
    }
`

const Plus = styled.div`
    -webkit-tap-highlight-color: transparent;
    display: inline-block;
    font-size: 30px; 
    margin-left: 5px; 
    cursor: pointer;
    font-weight: 600;
    color: green;
    user-select: none;
`

const UniqueTravel = styled.div`
    display: flex;
    max-width: 340px;
    align-items: center;
    justify-content: center;
    margin: auto;
`

export { ThrowComponent, DayTable, Day, Button, DateSelector, Input, InputContainer, Seats, MonkeyHead, Plus, UniqueTravel };
