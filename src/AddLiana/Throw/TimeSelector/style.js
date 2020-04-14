import styled from 'styled-components';

const typeColor = {
    Go: 'linear-gradient(to right, #f7f7f7, #dadada)',
    Return: 'linear-gradient(to left, #f7f7f7, #dadada)',
}

const TimeSelectorContainer = styled.div`
    background-color: none;
    border: none;
    display: inline-block;
    margin-right: 5px;
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
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    width: 90px;
    padding: 3px;
    background: ${props => props.active ? typeColor[props.selector] : 'white'};
    border: 1px solid #cccccc;
    margin: 5px auto;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    :focus {
        outline: none;
        /* background: ${props => typeColor[props.selector]}; */
    }
    img {
        margin-left: 20px; 
    }
`

const DropdownMenu = styled.div`
    cursor: pointer;
    position: absolute;
    -webkit-tap-highlight-color: transparent;
    top: 23px;
    left: -1px;
    z-index: 120;
    background-image: ${props => typeColor[props.selector]};
    width: 90px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);;
    height: ${props => props.active ? '108px' : '0'};
    overflow: auto;
    option {
        margin: 3px;
        text-align: left;
        transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);;
        display: ${props => props.active ? 'block' : 'none'};
        border-bottom: 2px solid white; 
    }
`

export { LightBox, Button, DropdownMenu, TimeSelectorContainer };