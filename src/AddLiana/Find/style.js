import styled from 'styled-components';

const colors = {
    0: '#58da58',
    1: '#674bf5',
    2: '#e20404',
    3: '#3db1c5',
    4: '#FF9800',
    5: '#1757a5',
    6: '#d4b230',
};

const FindComponent = styled.div`
    text-align: center;
`

const Button = styled.button`
    -webkit-tap-highlight-color: transparent;
    background-color: ${props => !props.search ? '#8bc34a' : '#ff0000'};
    font-size: 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    color: white;
    height: 40px;
    width: ${props => !props.search ? '120px' : '30px'};
    padding: 7px;
    cursor: pointer;
    margin-top: 15px;
    border: none;
    transition: 0.3s ease-out;
    position: relative;

    :focus {
        outline: none;
    }
    
    :disabled {
        background-color: #c2c2c2c2;
        cursor: default;
    }
`

const ButtonRequest = styled.button`
    border: none;
    -webkit-tap-highlight-color: transparent;
    background-color: #8bc34a;
    font-size: 1rem;
    border-radius: 5px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    margin-top: 5px;
    transition: 0.2s ease-in-out;

    :focus {
        outline: none;
    }

    :disabled {
        background-color: #c2c2c2c2;
        cursor: default;
    }

    :active {
        animation: bulb 0.2s ease-out;
        @keyframes bulb {
            0% {transform: rotate(0deg)}
            25% {transform: rotate(10deg)}
            50% {transform: rotate(-10deg)}
            75% {transform: rotate(0deg)}
        }
    }
`

const DateSelector = styled.input`
    border: none;
    font-family: 'Baloo';
    border-bottom: 2px solid #cccccc;
`

const InputContainer = styled.div`
    position: relative;
    display: flex;
    max-width: 290px;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;

    ::after {
        position: absolute;
        content: 'Zipcode format: A1A-1A1';
        color: red;
        opacity: ${props => props.validZip ? '1' : '0'};
        right: 80px;
        top: 0px;
        font-family: 'Baloo', sans-serif;
        font-size: 10px;
        -webkit-transition: 0.2s ease-in-out;
        transition: 0.2s ease-in-out;
    }
`

const Input = styled.input`
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    transition: 0.2s ease-in-out;

    ::placeholder {
        font-weight: 600;
        transition: 0.2s ease-out;
        color: lightgray;
    }
    
    :focus {
        outline: none;
        box-shadow: 0px 0px 15px -4px rgba(40,247,56,1);        
        ::placeholder {
            opacity: 1;
        }
    }
`

const Filters = styled.div`
    position: relative;
    max-width: 150px;
    margin-top: 20px;
`

const FiltersContainer = styled.div`
    display: flex;
    margin: auto;
    max-width: 320px;
`

const Filter = styled.div`
    background-color: ${props => props.active ? colors[props.day] : "#c2c2c2c2"};
    font-weight: 600;
    color: white;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    transition: 0.2s ease-in-out;
`

const ResultsContainer = styled.div`
    text-align: center;
    margin: 20px 0 10px 25px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 350px;
    min-width: 250px;
`

const BoldSpan = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: ${props => colors[props.day]};
`

const BoldSpanDate = styled.div`
    font-size: 15px;
    text-align: start;
    font-weight: 600;
    color: ${props => colors[props.day]};
    padding-bottom: 10px;
`

const TravelDetails = styled.div`
    position: relative;
    margin-bottom: 15px;
    left: 10px;
    height: 120px;
    ::before {
        position: absolute;
        content: '';
        height: 100%;
        width: 5px;
        background-color: ${props => colors[props.day]};
        border-radius: 5px;
        left: -10px;
    }
`

const LowContainer = styled.div`
    display: flex;
    align-items: center;
`

const TimeDiv = styled.div`
    display: flex;
    align-items: center;
    img {
        height: 25px;
    }
`

const SeatsDiv = styled.div`
    width: 85px;
    text-align: initial;
    margin-left: 40px;
    color: #c2c2c2;
    font-style: italic;
`

export {
    FindComponent,
    Input,
    InputContainer,
    DateSelector,
    Button,
    ResultsContainer,
    TravelDetails,
    BoldSpan,
    TimeDiv,
    Filters,
    Filter,
    ButtonRequest,
    LowContainer,
    SeatsDiv,
    BoldSpanDate,
    FiltersContainer
};
