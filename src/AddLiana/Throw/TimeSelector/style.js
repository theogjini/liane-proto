import styled from 'styled-components';

const typeColor = {
    Return: 'linear-gradient(to right, #fcfff5, #cccccc)',
    Go: 'linear-gradient(to left, #fcfff5, #cccccc)',
}

const TimeSelectorContainer = styled.div`
    background-color: none;
    border: none;
    :focus {
        outline: none;
    }
`

const LightBox = styled.div`
    position: fixed;
    z-index: 100;
    top: -100vh;
    left: 0;
    height: 300vh;
    width: 100vw;
`

const Button = styled.button`
    position: relative;
    width: 90px;
    padding: 3px;
    background: ${props => props.active ? typeColor[props.type] : 'white'};
    border: 1px solid #cccccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    :focus {
        outline: none;
    }
    img {
        margin-left: 20px; 
    }
`

const DropdownMenu = styled.div`
    position: absolute;
    top: 23px;
    left: -1px;
    z-index: 120;
    background-image: ${props => typeColor[props.type]};
    width: 90px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    transition: 0.2s ease-in-out;
    height: ${props => props.active ? '108px' : '0'};
    overflow: auto;
    option {
        margin: 3px;
        text-align: left;
        transition: 0.2s ease-in-out;
        display: ${props => props.active ? 'block' : 'none'};
        border-bottom: 2px solid white; 
    }
`

export { LightBox, Button, DropdownMenu, TimeSelectorContainer };