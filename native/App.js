import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';//instalar
import { createStackNavigator } from '@react-navigation/stack'//instalar
import Estatistics from './screens/Estatistics';
import Login from './screens/Login';
import PosConsolidada from './screens/PosConsolidada';
import RechargeScreen from './screens/RechargeScreen';
import Register from './screens/Register';
import SendMonyScreen from './screens/SendMonyScreen';
import Transactions from './screens/Transactions';
const Stack = createStackNavigator()//contiene la navegacion
//stack.screen contiene la pantalla
function MyStack(){
  return (
    <Stack.Navigator>
<<<<<<< HEAD
      <Stack.Screen name="Register" component={Register}/>
=======
>>>>>>> 9ac71ba3b43bbf6efc9c2e975909ba707b34e638
      <Stack.Screen name="Estatistics" component={Estatistics}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="PosConsolidada" component={PosConsolidada}/>
      <Stack.Screen name="RechargeScreen" component={RechargeScreen}/>
<<<<<<< HEAD
=======
      <Stack.Screen name="Register" component={Register}/>
>>>>>>> 9ac71ba3b43bbf6efc9c2e975909ba707b34e638
      <Stack.Screen name="SendMonyScreen" component={SendMonyScreen}/>
      <Stack.Screen name="Transactions" component={Transactions}/>
    </Stack.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <MyStack/>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
