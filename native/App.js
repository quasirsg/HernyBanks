import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //instalar
import { createStackNavigator } from '@react-navigation/stack'; //instalar
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import MenuLateral from './screens/MenuLateral';
import Recharge from './screens/Recharge';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator(); //contiene la navegacion
const Drawer = createDrawerNavigator(); // Menu lateral

function RootStack() {
	return (
		<Stack.Navigator initialRouteName='Login'>
			<Stack.Screen name='Login' component={LoginStack} options={{ headerShown: false }} />
			<Stack.Screen name='Mains' component={MainStack} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

function LoginStack() {
	return (
		<Stack.Navigator
			initialRouteName='Welcome'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Welcome' component={welcome} options={{ headerShown: false }} />
			<Stack.Screen name='Login' component={Login} options={{ title: 'Iniciar sesión' }} options={{ headerShown: false }} />
			<Stack.Screen name='CodeVerification' component={CodeVerification} options={{ headerShown: false }} />
			<Stack.Screen name='Register' component={Register} options={{ title: 'Registrarse' }} options={{ headerShown: false }} />
			<Stack.Screen name='AltaUser' component={AltaUser} />
		</Stack.Navigator>
	);
}

function MainStack() {
	return (
		<Drawer.Navigator
			initialRouteName='PosConsolidada'
			screenOptions={{
				headerShown: true,
				headerTitleAlign: 'center',
				headerStyle: { backgroundColor: 'indigo', shadowColor: 'indigo', elevation: 0 },
				headerTitleStyle: { color: 'white', fontSize: 16 },
				headerRight: () => <Ionicons name='ios-log-out' color='white' size={30} style={{ marginHorizontal: 15 }}></Ionicons>,
			}}
		>
			<Drawer.Screen name='PosConsolidada' component={PosConsolidada} />
			<Drawer.Screen name='Estatistics' component={Estatistics} />
			<Drawer.Screen name='SendMonyScreen' component={SendMonyScreen} />
			<Drawer.Screen name='Transactions' component={Transactions} />
			<Drawer.Screen name='FAQ' component={FAQ} />
			<Drawer.Screen name='Recharge' component={Recharge} />
		</Drawer.Navigator>
	);
}

export default function App() {
	return (
		<Provider store={st}>
			<NavigationContainer style={styles.container}>
				<RootStack />
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
