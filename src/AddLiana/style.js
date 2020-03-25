import styled from 'styled-components';

const PageTitle = styled.h1`
    position: relative; 
    display: inline-block;
    margin: 15px;
    font-family: 'Open Sans';
    font-size: 1.5rem;
    color: ${props => props.active ? 'black' : 'lightGray'};
    transition: 0.2s ease-in-out;
    /* border-bottom: ${props => props.active ? '3px solid #61a60d' : 'none'};  */
`

const Underline = styled.div`
    position: absolute;
    content: '';
    height: 5px;
    width: ${props => props.active ? '70px' : '115px'};
    background-color: ${props => props.active ? '#28f738' : '#ac6dff'};
    top: 50px;
    left: ${props => props.active ? '24.3vw' : '48.5vw'};
    transition: 0.3s ease-out;
    border-radius: 5px;
`

export { PageTitle, Underline };
