import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps"

const testPoint = {
  latitude: 43.07162,
  longitude: -89.39543,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

import * as Location from 'expo-location';

const Map = ()=>{

    
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  
    return (
     
    // <View style={styles.container}>
    //   {location && <Text>{typeof(location.coords.latitude)}</Text>}
    <MapView style={{flex: 1}} region={{latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}} showsUserLocation={true} >
    <Marker coordinate={testPoint} />
  </MapView>
//    <StatusBar style="auto" />
// </View>



    )
  
};

export default Map;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });