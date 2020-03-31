import styled from 'styled-components';

const PageTitle = styled.h1`
    cursor: pointer;
    position: relative; 
    display: inline-block;
    margin: 15px;
    font-size: 1.5rem;
    color: ${props => props.active ? 'black' : 'lightGray'};
    transition: 0.2s ease-in-out;
`

const Underline = styled.div`
    position: absolute;
    content: '';
    height: 5px;
    width: ${props => props.active ? '31%' : '41%'};
    background-color: ${props => props.active ? '#28f738' : '#ac6dff'};
    top: 50px;
    margin-left: ${props => props.active ? '7.5%' : '52%'};
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 5px;
`

const LinkContainer = styled.div`
    cursor: pointer;
    position: absolute;
    right: 50px;
    bottom: 20px;
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        height: 50px;
    }
`

const SignInContainer = styled.div`
    position: relative;
    height: 95vh;
`

const FormContainer = styled.div`
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

export { SignInContainer, Input, InputContainer, Button, PageTitle, Underline, LinkContainer, FormContainer };
