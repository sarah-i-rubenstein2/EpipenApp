import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import Login from './components/Login';
import Map from './components/Map';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import * as Location from 'expo-location';

const Stack = createNativeStackNavigator();

const createUser=(location, setUserId) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      emerg: 0
    })
};
fetch('http://10.140.76.34:8080/users', requestOptions)
    .then(response => response.json())
    .then(data => setUserId(data));
}

const updateUser=(userId, location, emerg) => {
  const requestOptions = {
    method: 'UPDATE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      id: userId,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      emerg: emerg
    })
};
fetch('http://10.140.76.34:8080/updateUser', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
}

const checkForEmergencies = async (allUsers, setAllUsers, noReNotify, setNoReNotify) =>{
  console.log("checking for emergencies")
  users = null;
  await fetch('http://10.140.76.34:8080/users')
    .then(response => response.json())
    .then(function(data) {
      setAllUsers(data);
      users = data;
    })
    .catch(error => console.error(error));

  console.log(users == null)
  if(users){
    console.log("in if statement")
    users.forEach((user) => {
      if(user.emerg == 1 && !noReNotify.includes(user.id)){
        console.log("Emegency")
        schedulePushNotification(user.latitude, user.longitude)
        list = noReNotify
        list.push(user.id)
        setNoReNotify(list)
      }
      // remove user from no-re-notify list
      if(noReNotify.includes(user.id) && user.emerg == 0){
        const index = noReNotify.indexOf(user.id);
        if (index > -1) { // only splice array when item is found
          setNoReNotify(noReNotify.splice(index, 1));
        }
      }
    })
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [userId, setUserId] = useState(null);

  // "Do not notfiy list"
  const [noReNotify, setNoReNotify] = useState([-1]);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if(noReNotify){
      const intervalId = setInterval(() => checkForEmergencies(allUsers, setAllUsers, noReNotify, setNoReNotify), 3000); // 1000 milliseconds = 1 second
    }
  }, []);

  useEffect(() => {
    fetch('http://10.140.76.34:8080/users')
      .then(response => response.json())
      .then(data => setAllUsers(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      if(location){
        createUser(location, setUserId)
      }
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Map">
          {(props) => <Map {...props} extraData={location} users={allUsers} userId={userId}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

async function schedulePushNotification(lat, long) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⚠️ Epipen needed in 1 mile radius ",
      body: String(lat) + " "  + String(long),
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