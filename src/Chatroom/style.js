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
    overflow-y: hidden;
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
    margin-right: 10px;
    img {
        height: 50px;
    }
`

const Messages = styled.div`
    position: relative;
    z-index: 1000;
    border: 5px solid #e2e2e2;
    background-color: ${ props => colors[props.color] + '70'};
    margin: 10px 20px 20px 20px;
    height: 75vh;
    border-radius: 5px;
`

const MessagesDisplay = styled.div`
    position: relative;
    background-image: url('/assets/chatBackground.png');
    background-size: 100%;
    background-position: top;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100% - 52px);
`

const MsgWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${ props => props.mine ? 'flex-end' : 'flex-start'};
`

const Msg = styled.div`
    padding: 5px 10px;
    overflow-x: hidden;
    text-overflow: clip;
    border-radius: ${ props => props.mine ? '12px 0px 12px 12px' : '0px 12px 12px 12px'};
    background-color: white;
    margin: ${ props => props.sameUser ? '5px 10px' : '-3px 10px 5px 10px'};
    width: fit-content;
    max-width: 50%;
    border: 2px solid ${ props => props.mine ? colors[props.color] : '#cccccc'};
`

const MsgWriter = styled.div`
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-style: italic;
    font-weight: 600;
    img {
        height: 20px;
        margin-right: 5px;
    }
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
    position: relative;
    display: flex;
    border-top: 2px solid #e2e2e2;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: white;
`

const Input = styled.textarea`
    resize: none;
    font-family: 'Baloo', sans-serif;
    margin-left: 10px;
    font-size: 15px;
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

const RefDiv = styled.div`
`

const TravelInfos = styled.div`
    position: relative;
    margin: 0 20px;
`

const BoldSpan = styled.span`
    font-size: 20px;
    font-weight: 600;
`
const Launch = styled.button`
    position: absolute;
    right: 0;
    border: none;
    background-color: transparent;
    margin-left: 20px;

    :focus {
        outline: none;
    }
    
    img {
        height: 50px;
        width: 50px;
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

const PopupBackground = styled.div`
    position: fixed;
    z-index: 1000;
    top: -100vh;
    left: 0;
    background-color: #444;
    opacity: 0.3;
    height: 300vh;
    width: 100vh;
`

const PopupContainer = styled.div`
    position: absolute;
    z-index: 2000;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 95vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const PopupContent = styled.div`
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    position: relative;
    z-index: 10000;
    height: 300px;
    width: 250px;
    background-color: white;
    h3 {
        text-align: center;
    }
    section {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`


export {
    ChatroomContainer,
    Messages, MessageForm, Input,
    Wrapper, Me, Button, InputContainer,
    Msg, MsgWrapper, MessagesDisplay,
    RefDiv, MsgWriter, TravelInfos,
    BoldSpan, Launch, PopupBackground, PopupContainer, PopupContent
};