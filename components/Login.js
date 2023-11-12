import React,{useState} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import { CustomInput } from './CustomInput';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Login = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const pressHandler=() => {
    if (password.length<8){
      alert("make a password of at least 8");
    }
    else{
      navigation.navigate('Map')
    }
  }
  return (
    <View style={styles.container}>
      
        <Text style={styles.text}>Epipen</Text>
        <CustomInput placeholder="Username" value={username} setValue={setUsername} secureBoolean={false}></CustomInput>
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureBoolean={true} ></CustomInput>
       
       <View style={styles.buttonContainer}> 
        <Button  title="Sign in" onPress={pressHandler}></Button>
        </View>
    </View>
    
  )
};

const styles = StyleSheet.create({

  container:{
    flex: 1, 
    alignItems:'center',
    textAlign: 'center',
    display:'flex',
    width:'50%',
    marginLeft: '25%',
    marginTop: '25%',
    gap:10
      },
      text:{
        fontSize:50,
      },
    buttonContainer:{
    display:'flex',
    borderColor:'blue',
    borderWidth:1,
    backgroundColor:'white',
    borderRadius:10,
    color:'white',
}


})

export default Login;