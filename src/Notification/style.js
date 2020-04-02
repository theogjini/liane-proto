import styled from 'styled-components';

const typeColors = {
    error: '#ff0000a3',
    success: '#8bc34aa3',
    neutral: '#03a9f4a3'
};

const NotificationContainer = styled.div`
    position: relative;
    top: 0vh;
    display: flex;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;

`

const Message = styled.div`
    -webkit-tap-highlight-color: transparent;
    position: absolute;
    overflow: auto;
    z-index: 10000;
    top: 0;
    padding-right: 5px;
    padding-left: 5px;
    min-width: 200px;
    height: ${props => props.active ? '50px' : '0'};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${ props => typeColors[props.category]}; 
    transition: 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    color: white;
    font-family: 'Baloo', sans-serif;
    font-size: ${props => props.active ? '18px' : '0'};
    font-weight: 600;
`

export { NotificationContainer, Message }