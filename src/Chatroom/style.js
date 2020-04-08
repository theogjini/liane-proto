import styled from 'styled-components';

const colors = {
    0: '#58da58',
    1: '#674bf5',
    2: '#e20404',
    3: '#3db1c5',
    4: '#FF9800',
    5: '#1757a5',
    6: '#d4b230',
};

const ChatroomContainer = styled.div`
    height: 95vh;
`

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`
const Me = styled.div`
    cursor: pointer;
    z-index: 100;
    right: 50px;
    bottom: 30px;
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        height: 50px;
    }
`

const Messages = styled.div`
    border: ${ props => '5px solid ' + colors[props.color]};
    background-color: ${ props => colors[props.color] + '14'};
    margin: 10px 20px 40px 20px;
    height: 75vh;
    border-radius: 5px;
`

const Button = styled.button`
    border: none;
    background-color: transparent;
    margin-left: 5px;

    :focus {
        outline: none;
    }
    
    svg {
        height: 20px;
        width: 20px;
        path {
            transition: fill 0.2s ease-in-out;
            fill: ${props => colors[props.color]};        
        }
    }

    :disabled {
        svg {
            height: 20px;
            width: 20px;
            path {
                transition: fill 0.2s ease-in-out;
                fill: #cccccc;        
            }
        }   
    }
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`

const MessageForm = styled.form`
    position: absolute;
    display: flex;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
    margin-bottom: 30px;
    width: 90%;
    background-color: white;
`

const Input = styled.input`
    padding: 10px;
    border: 2px solid #cccccc;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;

    ::placeholder {
        font-weight: 600;
        color: lightgray;
    }
    
    :focus {
        outline: 0;
        border-color: ${props => colors[props.color]};        
        ::placeholder {
            opacity: 1;
        }
    }
`

export { ChatroomContainer, Messages, MessageForm, Input, Wrapper, Me, Button, InputContainer };