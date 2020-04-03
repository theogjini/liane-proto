import styled from 'styled-components';

const colors = {
    monday: '#58da58',
    tuesday: '#674bf5',
    wednesday: '#e20404',
    thursday: '#3db1c5',
    friday: '#FF9800',
    saturday: '#1757a5',
    sunday: '#d4b230',
};


const FindComponent = styled.div`
    text-align: center;
`
const Button = styled.button`
    background-color: transparent;
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

const DateSelector = styled.input`
    border: none;
    font-family: 'Baloo';
    border-bottom: 2px solid #cccccc;
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
        font-weight: 600;
        transition: 0.2s ease-out;
        color: lightgray;
    }
    
    :focus {
        outline: none;
        box-shadow: 0px 0px 15px -4px rgba(40,247,56,1);        
        ::placeholder {
            opacity: 0;
        }
    }
`

const ListElem = styled.li`
    list-style-type: none;
    display: grid;
    scroll-snap-align: start;
    grid-template-areas: "a b b b b b b b"
                         "a c c c c c c c";    
`

const Results = styled.div`
    max-height: 350px;
    overflow: auto;
    -webkit-scroll-behavior: smooth;
    -moz-scroll-behavior: smooth;
    -ms-scroll-behavior: smooth;
    scroll-behavior: smooth;
    margin-top: 25px;
`

export { FindComponent, Input, InputContainer, DateSelector, Button, ListElem, Results };
