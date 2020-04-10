import styled from 'styled-components';

const BoldSpan = styled.span`
    font-size: 15px;
    font-weight: 600;
`

const TravelDetails = styled.div`
    margin-right: 30px;
`

const LianaContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
`

const Seats = styled.div`
    -webkit-tap-highlight-color: transparent;
    height: 50px; 
    width: 50px; 
    cursor: pointer;
    background-image: url('/assets/icons/liane.svg'); 
    background-repeat: no-repeat;
    background-size: 50px 50px;
    display: grid;
    grid-template-areas: "a a"
                         "a a";
`

const MonkeyHead = styled.div`
    img {
        user-select: none;
        width: ${props => props.added ? '23px' : '0'};
        height: ${props => props.added ? '23px' : '0'};
        transition-duration: 0.2s;
        transition-property: width height;
        transition-timing-function:  cubic-bezier(0.175, 0.885, 0.32, 1.275);;
    }
`

const ChatroomLink = styled.div`
    a {
        display: flex;
        align-items: center;
    }
`

const TimeDiv = styled.div`
    display: flex;
    align-items: center;
    img {
        height: 25px;
    }
`

export { BoldSpan, TravelDetails, Seats, MonkeyHead, LianaContainer, ChatroomLink, TimeDiv };