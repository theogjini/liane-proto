import styled from 'styled-components';

const Button = styled.button`
    -webkit-tap-highlight-color: transparent;
    width: 50%;
    position: relative;
    top: 0px;
    bottom: 50%;
    margin: auto;
    font-weight: 700;
    font-size: 26px;
    padding: 10px;
    background-color: transparent;
    border:  2px solid white;
    color: white;
    transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;

    :focus {
        outline: none;
    }

    :active {
        background-color: #ffffff;
        color: green;
        top: 10px;
    }
`;

const HomeComponent = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 33% 33% 33%;
    height: 100vh;
    color: white;
    z-index: 100;
`;

const Title = styled.div`
    font-family: 'Baloo 2', cursive;
    text-align: center;
    width:100%;
    margin-top: 20px;
    font-size: 150px;
    color: #FFDD55;
    font-weight: 700;
`;

const AvatarContainer = styled.div`
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Bounce = styled.div`
    -webkit-tap-highlight-color: transparent;
    animation: chimp 1s ease-in-out infinite ;
    @keyframes chimp {
    0% {transform: translateY(0);}
    50%   {transform: translateY(-10px);}
    100%   {transform: translateY(0px);}
    }
`;

const Span = styled.div`
    -webkit-tap-highlight-color: transparent;
    text-align: center;
    width: 100px;
    margin: auto;
    border-radius: 50%;
    height: 100px;
    animation: funny 1.5s ease-in-out infinite alternate;
    @keyframes funny {
    0% {transform: rotate(0);}
    20% {transform: rotate(7deg);}
    40% {transform: rotate(-10deg);}
    60% {transform: rotate(12deg);}
    80% {transform: rotate(-10deg);}
    90% {transform: rotate(7deg);}
    100% {transform: rotate(0deg);}
    }
`;

const LinkContainer = styled.div`
    cursor: pointer;
    position: absolute;
    right: 50px;
    bottom: 60px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export { Button, HomeComponent, Title, Span, Bounce, LinkContainer, AvatarContainer };