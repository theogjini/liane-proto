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
    width: ${props => props.active ? '29%' : '48%'};
    background-color: ${props => props.active ? '#28f738' : '#ac6dff'};
    top: 50px;
    margin-left: ${props => props.active ? '6%' : '46%'};
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
