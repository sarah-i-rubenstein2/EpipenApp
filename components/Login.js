import React,{useState} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import { CustomInput } from './CustomInput';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const pressHandler=() => {
    if (password.length<8){
      alert("make a password of at least 8");
    }
    else{
      alert("Successfully logged in")
      {/* route to map!*/}
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
    
alignItems:'center',
display:'flex',
width:'50%',
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