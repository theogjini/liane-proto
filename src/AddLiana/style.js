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
    width: ${props => props.active ? '70px' : '125px'};
    background-color: ${props => props.active ? '#28f738' : '#ac6dff'};
    top: 50px;
    margin-left: ${props => props.active ? '15px' : '43%'};
    transition: 0.3s ease-out;
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

const AddLianaContainer = styled.div`
    position: relative;
    height: 95vh;
`

export { PageTitle, Underline, LinkContainer, AddLianaContainer };
