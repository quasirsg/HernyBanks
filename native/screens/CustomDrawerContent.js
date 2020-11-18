import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { verifySession, logoutUser } from '../store/actions/jwtUsersActions';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Drawer } from 'react-native-paper';

export default function CustomDrawerContent(props) {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
	useEffect(() => {
		dispatch(verifySession());
	}, []);

	console.log('soy el user logeado', session);

	const logoutHandler = () => {
		dispatch(logoutUser());
		props.navigation.navigate('Login');
		return;
	};
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.headerContainer}>
					<Ionicons name='ios-menu' color='indigo' size={25} style={{ marginHorizontal: 20 }} onPress={() => props.navigation.closeDrawer()}></Ionicons>
					<Ionicons name='ios-settings' color='indigo' size={25} style={{ marginHorizontal: 20 }} onPress={() => alert('Opciones')}></Ionicons>
				</View>
				<View style={styles.userInfoContainer}>
					<View>
						<View style={styles.avatarContainer}></View>
					</View>
					<View style={styles.userNameContainer}>
						<Text>User Name Here</Text>
					</View>
				</View>
				{/* Seccion de enlaces: RESUMEN DE LA CUENTA */}
				<View style={styles.sectionTitlesContainer}>
					<Text style={styles.text_sectionTitle}>Resumen de la cuenta</Text>
					<DrawerItem icon={() => <Ionicons name='ios-home' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Inicio' onPress={() => props.navigation.navigate('PosConsolidada')} />
					<DrawerItem icon={() => <Ionicons name='ios-swap' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Ultimos movimientos' onPress={() => props.navigation.navigate('Transactions')} />
					<DrawerItem icon={() => <Ionicons name='ios-stats' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Estadisticas' onPress={() => props.navigation.navigate('Estatistics')} />
				</View>
				{/* Seccion de enlaces: ACCIONES */}
				<View style={styles.sectionTitlesContainer}>
					<Text style={styles.text_sectionTitle}>Acciones</Text>
					<DrawerItem icon={() => <Ionicons name='ios-wallet' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Recargar dinero' onPress={() => props.navigation.navigate('Recharge')} />
					<DrawerItem icon={() => <Ionicons name='ios-send' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Mandar dinero' onPress={() => props.navigation.navigate('SelectContact')} />
					{/* <DrawerItem icon={() => <Ionicons name='ios-cart' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Pagar en un local' onPress={() => alert('Pagar en un local')} /> */}
					<DrawerItem icon={() => <Ionicons name='ios-contact' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Contactos' onPress={() => props.navigation.navigate('ContactList')} />
					{/* <DrawerItem icon={() => <Ionicons name='ios-water' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Pagar un servicio' onPress={() => alert('Pagar un servicio')} /> */}
					{/* <DrawerItem icon={() => <Ionicons name='ios-options' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Gestionar debitos automaticos' onPress={() => alert('Gestionar debitos automaticos')} /> */}
				</View>
				{/* Seccion de enlaces: TARJETAS */}
				{/* <View style={styles.sectionTitlesContainer}>
					<Text style={styles.text_sectionTitle}>Tarjetas</Text>
					<DrawerItem icon={() => <Ionicons name='ios-today' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Ver mi resumen' onPress={() => alert('Inicio')} />
					<DrawerItem icon={() => <Ionicons name='ios-card' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Gestionar tarjetas' onPress={() => alert('Inicio')} />
				</View> */}

				{/* Seccion de enlaces: MAS */}
				<View style={styles.sectionTitlesContainer}>
					<Text style={styles.text_sectionTitle}>Mas</Text>
					<DrawerItem icon={() => <Ionicons name='ios-help-circle-outline' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='FAQ' onPress={() => props.navigation.navigate('FAQ')} />
				</View>
				{/* <DrawerItemList {...props} /> */}
			</DrawerContentScrollView>
			<Drawer.Section>
				<View style={styles.logOutContainer}>
					<DrawerItem icon={() => <Ionicons name='ios-log-out' color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label='Salir de la cuenta' onPress={logoutHandler} />
				</View>
			</Drawer.Section>
		</View>
	);
}

// <--------------------- ESTILOS --------------------->
const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	userInfoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	avatarContainer: {
		backgroundColor: 'indigo',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		width: 50,
		aspectRatio: 1,
		borderRadius: 1000,
	},
	userNameContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		overflow: 'hidden',
	},
	sectionTitlesContainer: {
		width: '95%',
		alignSelf: 'center',
	},
	logOutContainer: {
		width: '95%',
		// backgroundColor: 'red',
		alignSelf: 'center',
	},
	// TEXT
	text_sectionTitle: {
		borderBottomColor: 'indigo',
		borderBottomWidth: 1,
		fontSize: 18,
		paddingVertical: 5,
		paddingLeft: 10,
	},
});
