import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //instalar
import { createStackNavigator } from '@react-navigation/stack'; //instalar
import Register from './screens/Register';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { st } from './store/store';
import Estatistics from './screens/Estatistics';
import Login from './screens/Login';
import PosConsolidada from './screens/PosConsolidada';
import welcome from './screens/welcome';
import SendMonyScreen from './screens/SendMonyScreen';
import Transactions from './screens/Transactions';
import CodeVerification from './screens/CodeVerification';
import AltaUser from './screens/AltaUser';
import FAQ from './screens/FAQ';
import Toast from 'react-native-toast-message';
import SideMenu from 'react-native-side-menu-updated';
import MenuLateral from './screens/MenuLateral';
import Recharge from './screens/Recharge';


// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator(); //contiene la navegacion

function MainStack() {
	return (
		<Stack.Navigator>
    	
		<Stack.Screen name='Welcome' component={welcome} options={{ headerShown: false }} />
        <Stack.Screen name='AltaUser' component={AltaUser} />
		<Stack.Screen name='Login' component={Login} options={{ title: 'Iniciar sesión' }} options={{ headerShown: false }} />

	    <Stack.Screen name='CodeVerification' component={CodeVerification} options={{ headerShown: false }} />
        <Stack.Screen name='MenuLateral' component={MenuLateral} />
			<Stack.Screen
				name='PosConsolidada'
				component={PosConsolidada}
				options={{
					headerShown: true,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: 'indigo', shadowColor: 'indigo', elevation: 0 },
					headerTitleStyle: { color: 'white', fontSize: 16 },
					headerRight: () => <Ionicons name='ios-log-out' color='white' size={30} style={{ marginHorizontal: 15 }}></Ionicons>,
				}}
			/>
        <Stack.Screen name='Recharge' component={Recharge} />
			<Stack.Screen name='Register' component={Register} options={{ title: 'Registrarse' }} options={{ headerShown: false }} />
      

			<Stack.Screen name='Estatistics' component={Estatistics} />
			<Stack.Screen name='SendMonyScreen' component={SendMonyScreen} />
			<Stack.Screen name='Transactions' component={Transactions} />

      
		

			<Stack.Screen name='FAQ' component={FAQ} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}
export default function App() {
	// const showMenu = useSelector((state) => state.menuLateral.showMenu);
	// const showMenu = useSelector((state) => state.menuLateral);
	// console.log(showMenu);
	return (
		<Provider store={st}>
			<NavigationContainer style={styles.container}>
				<MainStack />
				<Toast ref={(ref) => Toast.setRef(ref)} />
			</NavigationContainer>
		</Provider>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
