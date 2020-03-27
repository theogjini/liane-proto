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
    width: ${props => props.active ? '70px' : '120px'};
    background-color: ${props => props.active ? '#28f738' : '#ac6dff'};
    top: 50px;
    margin-left: ${props => props.active ? '15px' : '115px'};
    transition: 0.3s ease-out;
    border-radius: 5px;
`

const LinkContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 0;
    display: flex;
    margin: auto;
    justify-content: center;
    width: 100%;
`

export { PageTitle, Underline, LinkContainer };
