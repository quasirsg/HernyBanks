import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { verifySession, logoutUser } from '../../store/actions/jwtUsersActions';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Drawer } from 'react-native-paper';

// Enlaces
import { EnlacesMenuLateral } from './EnlacesMenu';

export default function CustomDrawerContent(props) {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
	useEffect(() => {
		dispatch(verifySession());
	}, []);

	// console.log('soy el user logeado', session);

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
				{/* Informacion del Ususario */}
				<View style={styles.userInfoContainer}>
					<View>
						<View style={styles.avatarContainer}></View>
					</View>
					<View style={styles.userNameContainer}>
						<Text>User Name Here</Text>
					</View>
				</View>
				{/* .map de las secciones */}
				{EnlacesMenuLateral ? (
					EnlacesMenuLateral.map((seccion) => (
						<View style={styles.sectionTitlesContainer}>
							<Text style={styles.text_sectionTitle}>{seccion.sectionTitle}</Text>
							{seccion.links.map((enlace) => (
								<DrawerItem icon={() => <Ionicons name={enlace.icon} color='indigo' size={20} style={{ marginHorizontal: 0 }}></Ionicons>} label={enlace.label} onPress={() => props.navigation.navigate(`${enlace.screen}`)} />
							))}
						</View>
					))
				) : (
					<Text>Hubo algun problema (probablemente en EnalcesMenu.js)</Text>
				)}
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
		marginTop: 15,
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
