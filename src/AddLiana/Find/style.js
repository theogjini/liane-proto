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
    background-color: transparent;
    font-size: 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    border: 2px solid #f50057;
    color: #f50057;
    cursor: pointer;
    margin-top: 25px;
    transition: 0.2s ease-in-out;
    
    :disabled {
        border: 2px solid #c2c2c2c2;
        color: #c2c2c2c2;
        cursor: default;
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

const FilterContainer = styled.div`
    position: relative;
`

const Filters = styled.div`
    position: absolute;
    left: 8%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 25px;
`

const Filter = styled.div`
    background-color: ${props => props.active ? colors[props.day] : "#c2c2c2c2"};
    font-weight: 600;
    color: white;
    min-width: 60px;
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
    margin: 20px;
    overflow: auto;
    max-height: 350px;
`

const BoldSpan = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: ${props => colors[props.day]};
`

const TravelDetails = styled.div`
    display: inline-block;
    margin-bottom: 15px;
    position: relative;
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

const TimeDiv = styled.div`
    display: flex;
    align-items: center;
    img {
        height: 25px;
    }
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
    FilterContainer
};
