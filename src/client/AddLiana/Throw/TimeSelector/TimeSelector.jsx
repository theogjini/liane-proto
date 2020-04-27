import React, { useState } from 'react';
import { LightBox, Button, DropdownMenu, TimeSelectorContainer } from './style';

export default function TimeSelector(props) {

    const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);

    const selectorType = props.go ? 'Go' : 'Return';

    let defaultTimeState = selectorType;

    if (props.default) {
        defaultTimeState = props.default
    };

    const [selectedTime, setSelectedTime] = useState(defaultTimeState);

    const isATimeSelected = selectedTime !== selectorType;

    const chevronPath = isDropdownDisplayed ? "/assets/icons/up-chevron.svg" : "/assets/icons/down-chevron.svg";

    function displayDropdown(event) {
        event.preventDefault();
        setIsDropdownDisplayed(!isDropdownDisplayed);
    };

    function handleSelectTime(event) {
        event.preventDefault();
        props.onChangeProp(event);
        setSelectedTime(event.currentTarget.value);
    };

    const time = [];

    for (let i = 0; i < 24; i++) {
        let toString = i.toString();
        let timeToPush = toString.length === 2 ? toString : ('0' + toString);
        time.push(timeToPush + ':00');
    };

    return (<TimeSelectorContainer value={selectedTime} >
        {isDropdownDisplayed && <LightBox onClick={displayDropdown}></LightBox>}
        <Button type="button" selector={selectorType} onClick={displayDropdown} active={isATimeSelected}>
            {selectedTime}
            <img src={chevronPath} height="16" />
            <DropdownMenu selector={selectorType} active={isDropdownDisplayed}>
                {time.map(hour => <option key={hour} value={hour} onClick={handleSelectTime}>{hour + "h"}</option>)}
            </DropdownMenu>
        </Button>

    </TimeSelectorContainer>)
};
