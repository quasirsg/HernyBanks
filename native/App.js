import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //instalar
import { createStackNavigator } from '@react-navigation/stack'; //instalar
import Register from './screens/Register';
import { Provider } from 'react-redux';
import { st } from './store/store';
import Estatistics from './screens/Estatistics';
import Login from './screens/Login';
import PosConsolidada from './screens/PosConsolidada';
import welcome from './screens/welcome';
import SendMonyScreen from './screens/SendMonyScreen';
import Transactions from './screens/Transactions';
import RegisterModal from './components/RegisterModal';
import AltaUSer from './screens/AltaUser';
import FAQ from './screens/FAQ';
import Toast from 'react-native-toast-message';
import SideMenu from 'react-native-side-menu-updated';
import MenuLateral from './screens/MenuLateral';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator(); //contiene la navegacion

function MainStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Welcome' component={welcome} options={{ headerShown: false }} />

			<Stack.Screen name='Login' component={Login} options={{ title: 'Iniciar sesión' }} options={{ headerShown: false }} />

			<Stack.Screen name='CodeVerification' component={CodeVerification} options={{ headerShown: false }} />

			<Stack.Screen name='AltaUser' component={AltaUSer} />

			<Stack.Screen
				name='PosConsolidada'
				component={PosConsolidada}
				options={{
					headerShown: true,
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: 'indigo', shadowColor: 'indigo', elevation: 0 },
					headerTitleStyle: { color: 'white', fontSize: 16 },
					headerLeft: () => <Ionicons name='ios-menu' color='white' size={30} style={{ marginHorizontal: 15 }}></Ionicons>,
					headerRight: () => <Ionicons name='ios-log-out' color='white' size={30} style={{ marginHorizontal: 15 }}></Ionicons>,
				}}
			/>

			<Stack.Screen name='Estatistics' component={Estatistics} />
			<Stack.Screen name='SendMonyScreen' component={SendMonyScreen} />
			<Stack.Screen name='Transactions' component={Transactions} />

			<Stack.Screen name='Estatistics' component={Estatistics} />
			<Stack.Screen name='SendMonyScreen' component={SendMonyScreen} />
			<Stack.Screen name='Transactions' component={Transactions} />
			<Stack.Screen name='AltaUSer' component={AltaUSer} />

			<Stack.Screen name='FAQ' component={FAQ} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}
export default function App() {
	const menu = <MenuLateral></MenuLateral>;

	return (
		<Provider store={st}>
			<SideMenu isOpen={false} autoClosing={true} menu={menu}>
				<NavigationContainer style={styles.container}>
					<MainStack />
					<Toast ref={(ref) => Toast.setRef(ref)} />
				</NavigationContainer>
			</SideMenu>
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
