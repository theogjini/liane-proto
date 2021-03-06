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

const SigninToggleContainer = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
`

const ToggleWrapper = styled.div`
    position: relative;
    display: inline-block;
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

const InputContainer = styled.div`
    position: relative;
    display: flex;
    max-width: 290px;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;

    ::after {
        position: absolute;
        content: ${props => `${props.error}`};
        color: red;
        opacity: ${props => props.error ? '1' : '0'};
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
            opacity: 1;
        }
    }
`

export { SignInContainer, Input, InputContainer, Button, PageTitle, Underline, LinkContainer, FormContainer, SigninToggleContainer, ToggleWrapper };
