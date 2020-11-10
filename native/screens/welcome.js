import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View, Button, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';

const image = { uri: "https://cdn.pixabay.com/photo/2016/05/22/20/13/background-1409125_960_720.png" };

function Welcome({navigation}) {
const onPressLogin = () => {navigation.navigate('Login');}
const onPressRegister = () => {navigation.navigate('Register');}
const onPressFAQ = () => {navigation.navigate('FAQ');}


return (
<View style={styles.container}>
<ImageBackground source={image} style={styles.image}>
<Text style={{
  backgroundColor: 'transparent',
  fontSize: 100,
  color: '#fff',
  fontWeight: 'bold',
}}>HBank</Text>

   <Text
     style={{
       backgroundColor: 'transparent',
       fontSize: 30,
       color: '#fff'
     }}>
     <View style={styles.buttonContainer}>
  <TouchableOpacity onPress={onPressLogin}>
    <View style={styles.button}>
      <Text>Ingresar</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={onPressRegister}>
    <View style={styles.button}>
      <Text>Registrarse</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={onPressFAQ}>
    <View>
      <Text  style={{
         backgroundColor: 'transparent',
         fontSize: 20,
         color: 'grey',
         marginTop:10,
       }}>Necesitas ayuda?</Text>
    </View>
  </TouchableOpacity>
    </View>
     </Text>
   </ImageBackground>
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3448',
    },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems:"center"
    },
  buttonContainer: {
      flex: 1,
      justifyContent:"center",
    },
  button: {
      borderWidth:0.1,
      borderColor: 'grey',
      flex: 1,
      backgroundColor: "#422C63",
      marginTop:10,
    },
});

export default Welcome;
