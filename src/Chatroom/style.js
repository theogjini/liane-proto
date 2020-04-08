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
`

const Wrapper = styled.div`
    position: relative;
    height: 95vh;
`
const Me = styled.div`
    cursor: pointer;
    z-index: 100;
    position: absolute;
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
    margin: 10px 20px;
    height: 75%;
    border-radius: 5px;
`

const MessageForm = styled.form`
    position: absolute;
    display: flex;
    justify-content: left;
    margin-left: 20px;
`

const Input = styled.input`
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    transition: 0.2s ease-in-out;
    margin-bottom: 10px;

    ::placeholder {
        font-weight: 600;
        transition: 0.2s ease-out;
        color: lightgray;
    }
    
    :focus {
        outline: none;
        box-shadow: 0px 0px 15px -4px ${props => colors[props.color]};        
        ::placeholder {
            opacity: 0;
        }
    }
`

export { ChatroomContainer, Messages, MessageForm, Input, Wrapper, Me };