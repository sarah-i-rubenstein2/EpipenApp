import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity,  Platform} from 'react-native'
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


const testPoint = {
    latitude: 43.07162,
    longitude: -89.39543,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

const getPoints=(users) => {
  points = []
  users.forEach((user) => points.push({
    latitude: user.latitude,
    longitude: user.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }))

  return points
}

const Map = (props) => {
  let users = props.users
  points = getPoints(users)

    const emergency=() => {
        alert("Emergency!");
    }
  return (
    // <Button title="Emergency" onPress={emergency}></Button>
    <SafeAreaView style={styles.container}>
    {
    props.extraData ?
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={{latitude: props.extraData.coords.latitude, longitude: props.extraData.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}} showsUserLocation={true} >
          { points.map((point) => { 
            return <Marker coordinate={point} />
          }) }
          {/* <Button
            title="E"
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={{
            backgroundColor: 'rgba(235, 20, 20, 1)',
            borderRadius: 100,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
            containerStyle={{
            marginHorizontal: 50,
            height: 300,
            width: 300,
            marginVertical: 50,
            position: 'absolute',
            bottom:10
            }}
            onPress={emergency}
        /> */}
        <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.button}>
            
            {/* <FAB 
            icon="bell" 
            styles={styles.fab}
            color={"#333366"}
            onPress={emergency}
                /> */}
            <Button 
            buttonStyle={{
                backgroundColor: 'rgba(235, 20, 20, 1)',
                borderRadius: 10,
                padding: 15
            }} 
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
            containerStyle={{
                width: 300,
                padding: 0,
            }}  onPress={async () => {
                await schedulePushNotification();
              }} >Emergency</Button>
        </View>
      </TouchableOpacity>
      </MapView> : <Text style={styles.headline}>Please wait</Text>
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
      width: 200
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

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⚠️ Epipen needed in 1 mile radius ",
        body: 'PUT ADRESS HERE',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

export default Map;
