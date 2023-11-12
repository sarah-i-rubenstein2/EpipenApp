import React,{useState} from 'react'
import {View, Text, StyleSheet, Button, ImageBackground, Dimensions, Switch, Platform} from 'react-native'
import { CustomInput } from './CustomInput';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Login = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () =>{
    setIsEnabled(previousState => !previousState);
  }

  const pressHandler=() => {
    if (password.length<8){
      alert("Password should contain at least 8 letters");
    }
    else{
      navigation.navigate('Map')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>EpiPal</Text>
        <View style = {styles.box}>
          <CustomInput placeholder="Username" value={username} setValue={setUsername} secureBoolean={false}></CustomInput>
          <CustomInput placeholder="Password" value={password} setValue={setPassword} secureBoolean={true} ></CustomInput>
        </View>
        <View style={styles.buttonContainer}> 
          <Button  title="Sign in" onPress={pressHandler}></Button>
        </View>
        <View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Text style = {styles.switch}>
          Carrying Epipen?
        </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  switch:{
    color:'white',
    fontWeight:'bold',
    fontSize: 20,
  },
  box:{
    width:'50%',
    marginLeft: '50%',
  },
  container:{
    flex: 1, 
    alignItems:'center',
    textAlign: 'center',
    display:'flex',
    width:'100%',
    justifyContent:'center',
    alignSelf:'center',
    flexWrap:'wrap',
    gap:10,
    backgroundColor:'#007FFF',
  },
  text:{
    fontSize:50,
    fontWeight:'bold',
    color:'white',
    width:'50%',
    textAlign: 'center'
  },
  buttonContainer:{
    display:'flex',
    borderWidth:1,
    backgroundColor:'white',
    borderRadius:10,
    color:'white',
}


})

export default Login;
