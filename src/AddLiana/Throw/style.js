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
    -webkit-tap-highlight-color: transparent;
    background-color: #8bc34a;
    font-size: 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    color: white;
    padding: 7px;
    cursor: pointer;
    margin-top: 15px;
    border: none;
    transition: 0.3s ease-in-out;

    :focus {
        outline: none;
    }

    :disabled {
        background-color: #c2c2c2c2;
        cursor: default;
    }
`

const Day = styled.div`
    border: 2px solid ${props => props.active ? dayColor[props.currentDay] : 'white'};
    padding: 3px;
    width: 55px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 5px;
    background-color: ${props => props.active ? dayColor[props.currentDay] : dayColor[props.currentDay] + '15'};
    color: ${props => props.active ? 'white' : '#c2c2c2'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.2);
`

const DateSelector = styled.input`
    display: block;
    border: none;
    background-color: white;
    border-bottom: 1px solid #cccccc;
    font-family: 'Baloo', sans-serif;
    font-size: 15px;

    :focus {
        outline: none;
    }
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
const InputContainer = styled.div`
    position: relative;
    display: flex;
    max-width: 290px;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;

    ::after {
        position: absolute;
        content: 'Zipcode format: A1A-1A1';
        color: red;
        opacity: ${props => props.validZip ? '1' : '0'};
        right: 80px;
        top: 0px;
        font-family: 'Baloo', sans-serif;
        font-size: 10px;
        -webkit-transition: 0.2s ease-in-out;
        transition: 0.2s ease-in-out;
    }
`

const Input = styled.input`
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    transition: 0.2s ease-in-out;

    ::placeholder {
        font-family: 'Baloo', sans-serif;
        font-weight: 600;
        transition: 0.2s ease-out;
        color: lightgray;
    }
    
    :focus {
        outline: none;
        box-shadow: 0px 0px 15px -4px rgba(40,247,56,1);        
        ::placeholder {
            opacity: 1;
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
