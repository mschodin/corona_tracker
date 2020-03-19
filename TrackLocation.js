import React from 'react';
import { View, Dimensions } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

export default TrackLocation = (props) => {
    return (
        <View>
            <ToggleSwitch 
                isOn={props.trackingEnabled} 
                onColor="green"
                offColor="red"
                label="Track Location"
                labelStyle={{ color: "black", fontWeight: "bold", fontSize: Dimensions.get('window').width * .09}}
                size="large"
                onToggle={props.toggleTracking} />
        </View>
    );
}