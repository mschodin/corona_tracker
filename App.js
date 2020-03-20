import React from "react";
import { StyleSheet, View, Dimensions, SafeAreaView } from "react-native";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';

import FetchLocation from './FetchLocation';
import TrackLocation from './TrackLocation';
import CrossFeed from './CrossFeed';
import ErrorBoundary from './ErrorBoundary';

const height15 = ((Dimensions.get('window').height)*.15);
const height20 = ((Dimensions.get('window').height)*.20);
const width80 = ((Dimensions.get('window').width)*.80);
const LOCATION_TASK = 'background_location_tracking';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      trackingEnabled: false,
      location: {},
    }
  }

  componentDidMount() {
    this._getLocation();
  }

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if(status !== 'granted') {
      console.log('PERMISSION NOT GRANTED');
    } else {
      console.log('PERMISSION GRANTED!');
      this.setState({
        trackingEnabled: true,
      })
    }

    const userLocation = await Location.getCurrentPositionAsync();

    this.setState({
      location: userLocation
    })
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
    }, err => console.log(err));
  }

  toggleTracking = (value) => {
    console.log('Setting switch to: ' + value);
    this.setState({trackingEnabled: value}, () => {
      this.updateTracking(); 
    });
  }

  userComprimised = async () => {
    console.log("User Comprimised Button Pressed");
    console.log("Is task registered: ", (await TaskManager.getRegisteredTasksAsync()));
  }

  updateTracking = () => {
    if(this.state.trackingEnabled == true){
      console.log("Tracking is enabled");
      this.beginTracking();
    } else {
      console.log("Tracking is disabled");
      this.stopTracking();
    }
  }

  beginTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK, {
      accuracy: Location.Accuracy.Highest,
    });
  };

  stopTracking = async () => {
    TaskManager.unregisterTaskAsync(LOCATION_TASK);
  }

  render() {
    return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: height15}}>
        <TrackLocation toggleTracking = {this.toggleTracking} trackingEnabled = {this.state.trackingEnabled} />
      </View>
      <View style={{width: width80, marginTop: height20, marginBottom: height20}}>
        <ErrorBoundary>
          <CrossFeed />
        </ErrorBoundary>
      </View>
      <View style={{ width: width80, marginBottom: height15 }}>
        <FetchLocation sickButtonPressed={this.userComprimised}/>
      </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "space-around"
  },
  switchText: {
    fontSize: 20,
  }
});


TaskManager.defineTask(LOCATION_TASK, ({ data, error }) => {
  if (error) {
    console.log("BACKGROUND TASK ERROR");
    console.log(error.message);
  }
  if (data) {
    const { locations } = data;
    console.log("locations", locations);
  }
});