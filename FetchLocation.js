import React from 'react';
import { Button } from 'react-native';

const fetchLocation = props => {
    return (
        <Button title="I'm Sick!" onPress={props.sickButtonPressed} />
    );
};

export default fetchLocation;