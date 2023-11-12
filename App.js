import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import Login from './components/Login';
import Map from './components/Map';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Location from 'expo-location';

const Stack = createNativeStackNavigator();

export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Map">
          {(props) => <Map {...props} extraData={location} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}