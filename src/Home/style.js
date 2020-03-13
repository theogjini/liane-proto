import styled from 'styled-components';

const Button = styled.button`
    width: 50%;
    bottom: 50%;
    margin: auto;
    font-family: 'Open Sans';
    font-weight: 700;
    font-size: 26px;
    padding: 10px;
    background-color: transparent;
    border:  2px solid white;
    color: white;
    cursor: pointer;
`;

const HomeComponent = styled.div`
    position: relative;
    display: grid;
    font-family: 'Open Sans';
    grid-template-rows: 33% 33% 33%;
    height: 100vh;
    color: white;
    z-index: 100;
`;

const Title = styled.div`
    font-family: 'Caveat';
    text-align: center;
    width:100%;
    margin-top: 20px;
    font-size: 150px;
    color: #009688;
    font-weight: 700;
`;

const Span = styled.div`
    text-align: center;
    width: 100px;
    margin: auto;
    height: 100px;
    animation: chimp 1s ease-in-out infinite alternate;
    @keyframes chimp {
    from {transform: translateY(0);}
    to   {transform: translateY(-10px);}
        }
    border-radius: 50%;
`;

const Love = styled.div`
    text-align: center;
    font-family: 'material-icons';
    background-color: pink;
    display: inline-block;
    animation: heart 1s ease-in-out infinite alternate;
    @keyframes heart {
    from {transform: translateY(0);}
    to   {transform: translateY(-10px);}
        }
`

export { Button, HomeComponent, Title, Span, Love };