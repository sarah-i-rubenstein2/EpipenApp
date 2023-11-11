import React from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
export const CustomInput = ({value, setValue, placeholder, secureBoolean}) => {
  return (
    <View style={styles.container}>

<TextInput 
placeholder={placeholder} 
value={value} 
onChangeText={setValue}
secureTextEntry={secureBoolean}></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({

    container:{
  backgroundColor:'white',
  width:'100%',

  borderColor: 'black',
  borderWidth: 1,
 
  borderRadius:5,
paddingHorizontal:10,
marginVertical:5,
  
    }
    

});
