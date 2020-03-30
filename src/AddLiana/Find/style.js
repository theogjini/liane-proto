import styled from 'styled-components';


const FindComponent = styled.div`
    text-align: center;
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

const DateSelector = styled.input`
    border: none;
    font-family: 'Baloo';
    border-bottom: 2px solid #cccccc;
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

export { FindComponent, Input, InputContainer, DateSelector, Button };
