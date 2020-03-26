import styled from 'styled-components';


const ThrowComponent = styled.div`
    font-family: 'Open Sans';
    text-align: center;
`

const DayTable = styled.div`
    margin: auto;
    display: block;
    max-width: 290px;
    margin-top: 25px;
    margin-bottom: 25px;
`

const Monday = styled.div`
    border: 2px solid #cccccc;
    padding: 5px;
    width: 55px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#58da58' : 'white'};
    color: ${props => !props.active ? '#58da58' : 'white'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.2s ease-in-out;
`

const Tuesday = styled.div`
    border: 2px solid #cccccc;
    padding: 5px;
    width: 55px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#674bf5' : 'white'};
    color: ${props => !props.active ? '#674bf5' : 'white'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.2s ease-in-out;
`

const Wednesday = styled.div`
    border: 2px solid #cccccc;
    padding: 5px;
    width: 55px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#e20404' : 'white'};
    color: ${props => !props.active ? '#e20404' : 'white'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.2s ease-in-out;
`

const Thursday = styled.div`
    border: 2px solid #cccccc;
    padding: 5px;
    width: 55px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#3db1c5' : 'white'};
    color: ${props => !props.active ? '#3db1c5' : 'white'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.2s ease-in-out;    
`

const Friday = styled.div`
    border: 2px solid #cccccc;
    padding: 5px;
    width: 55px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#FF9800' : 'white'};
    color: ${props => !props.active ? '#FF9800' : 'white'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.2s ease-in-out;
`

const Saturday = styled.div`
    border: 2px solid #cccccc;
    padding: 5px;
    width: 55px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#092649' : 'white'};
    color: ${props => !props.active ? '#092649' : 'white'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.2s ease-in-out;
`

const Sunday = styled.div`
    border: 2px solid #cccccc;
    padding: 5px;
    width: 55px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${props => props.active ? '#FFEB3B' : 'white'};
    color: ${props => !props.active ? '#FFEB3B' : 'white'};
    font-weight: bold;
    font-size: ${props => props.active ? '18px' : '14px'};
    transition: 0.2s ease-in-out;
`

export { ThrowComponent, DayTable, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday };
