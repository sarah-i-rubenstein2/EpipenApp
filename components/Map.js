import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity,  Platform, Dimensions} from 'react-native'
import { CustomInput } from './CustomInput';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from "react-native-maps"
import { Button, ButtonGroup } from '@rneui/themed';
import {FAB, Title} from 'react-native-paper'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const getPoints=(users) => {
  if(users){
    points = []
    users.forEach((user) => points.push({
      latitude: parseFloat(user.latitude),
      longitude: parseFloat(user.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }))
  
    return points
  }
  return null
}

const updateUser=(userId, location) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      id: userId,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      emerg: 1
    })
};
fetch('http://10.140.76.34:8080/updateUser', requestOptions)

setTimeout(() => { removeEmergency(userId, location) }, 10000);
}

const removeEmergency=(userId, location) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      id: userId,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      emerg: 0
    })
};
fetch('http://10.140.76.34:8080/updateUser', requestOptions)
}

const Map = (props) => {
  let users = props.users
  points = getPoints(users)
    
  return (
    // <Button title="Emergency" onPress={emergency}></Button>
    <SafeAreaView style={styles.container}>
    {
    props.extraData ?
    <>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={{latitude: props.extraData.coords.latitude, longitude: props.extraData.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}} showsUserLocation={true} >
          { points ? points.map((point) => { 
            return <Marker coordinate={point} key={Math.random()} />
          }) : null }
      </MapView>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.button}>
            <Button 
            buttonStyle={{
                width: Dimensions.get('window').width - 50,
                height: Dimensions.get('window').height - 780,
                backgroundColor: 'rgba(235, 20, 20, 1)',
                borderRadius: 10,
                padding: 15,
            }} 
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
            containerStyle={{
                width: Dimensions.get('window').width - 50,
                height: Dimensions.get('window').height - 780,
                justifyContent: 'center',
                flex: 1,
                padding: 0,
            }}  onPress={() => updateUser(props.userId, props.extraData)} >Emergency</Button>
        </View>
      </TouchableOpacity>
      </>
      : <Text style={styles.headline}>Please wait</Text>
    }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '105%',
    },
    headline: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 300,
      width: Dimensions.get('window').width,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
      },
      button: {
        padding: 10,
        borderRadius: 5,
      },
  });


export default Map;
