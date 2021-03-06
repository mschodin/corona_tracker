import React from "react";
import { StyleSheet, Text, View, Button, Dimensions, SafeAreaView, ScrollView, FlatList } from "react-native";

import FetchLocation from './FetchLocation';
import TrackLocation from './TrackLocation';
import CrossFeed from './CrossFeed';
import ErrorBoundary from './ErrorBoundary';

const height15 = ((Dimensions.get('window').height)*.15);
const height20 = ((Dimensions.get('window').height)*.20);
const width80 = ((Dimensions.get('window').width)*.80);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      trackingEnabled: false,
    }
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

  userComprimised = () => {
    console.log("User Comprimised Button Pressed");
  }

  updateTracking = () => {
    if(this.state.trackingEnabled == true){
      console.log("Tracking is enabled");
      // navigator.geolocation.getCurrentPosition(position => {
      //   console.log(JSON.stringify(position));
      // }, err => console.log(err));

      var watchID = navigator.geolocation.watchPosition((position) => {
        console.log(JSON.stringify(position));
      }, err => console.log(err));
      console.log("Watch ID = " + watchID);

    } else {
      console.log("Tracking is disabled");
    }
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