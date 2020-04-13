import styled from 'styled-components';

const BoldSpan = styled.span`
    font-size: 15px;
    font-weight: 600;
`

const TravelDetails = styled.div`
    margin-right: 30px;
    position: relative;
    ::before {
        position: absolute;
        content: '';
        height: 100%;
        width: 5px;
        background-color: ${props => props.driver ? '#28f738' : '#ac6dff'};
        border-radius: 5px;
        left: -10px;
    }
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
    filter: ${props => !props.requestAccepted ? 'none' : 'blur(3px) grayscale(0.5)'};
    section {
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

const PopupBackground = styled.div`
    position: fixed;
    z-index: 100;
    top: -100vh;
    left: 0;
    background-color: #444;
    opacity: 0.3;
    height: 300vh;
    width: 100vh;
`

const PopupContainer = styled.div`
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 95vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const RequestsContainer = styled.div`
    position: relative;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1000;
    height: 300px;
    width: 250px;
    display: flex;
    overflow-x: auto;
    background-color: white;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scroll-snap-points-x: repeat(100%);
`

const Request = styled.div`
    text-align: center;
    min-width: 100%;
    scroll-snap-align: center;
    scroll-margin: 50%;
`

const Buttons = styled.div`
    display: flex;
    width: 80%;
    margin: auto;
    justify-content: space-between;
`

const Accept = styled.h2`
    padding: 5px;
    color: white;
    background-color: #8bc34a;
`

const Reject = styled.h2`
    padding: 5px;
    color: white;
    background-color: #ff0000;
`

const Next = styled.div`
    position: absolute;
    z-index: 2000;
    width: 20px;
    height: 20px;
    right: 2%;
    top: 45%;
    background-image: url('/assets/icons/right-chevron.svg');
    background-repeat: no-repeat;
    animation: bounce 1s ease-in-out infinite;
    @keyframes bounce {
        0% {transform: scale(1)};
        50% {transform: scale(1.3)};
        100% {transform: scale(1)};
    }
`
const Previous = styled.div`
    position: absolute;
    z-index: 2000;
    width: 20px;
    height: 20px;
    left: 2%;
    top: 45%;
    background-image: url('/assets/icons/left-chevron.svg');
    background-repeat: no-repeat;
    animation: bounce 1s ease-out infinite;
    @keyframes bounce {
        0% {transform: scale(1)};
        50% {transform: scale(1.3)};
        100% {transform: scale(1)};
    }
`

export {
    BoldSpan,
    TravelDetails,
    Seats,
    MonkeyHead,
    LianaContainer,
    ChatroomLink,
    TimeDiv,
    PopupBackground,
    PopupContainer,
    RequestsContainer,
    Request,
    Buttons, Accept, Reject, Next, Previous
};