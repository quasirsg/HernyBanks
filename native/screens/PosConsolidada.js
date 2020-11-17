import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { verifySession, logoutUser } from '../store/actions/jwtUsersActions';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuLateral from './MenuLateral';

// Dimensions
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// Background Image
const background1 = require('../assets/background1.png');

// BORRAR
const session = true;
// BORRAR

export default function PosConsolidada({ navigation }) {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
	const bal = session.balance;
	useEffect(() => {
		dispatch(verifySession());
	}, []);
	console.log('soy el user logeado', session);
	const logoutHandler = () => {
		dispatch(logoutUser());
		navigation.navigate('welcome');
		return;
	};

	const menu = <MenuLateral></MenuLateral>;

	// console.log(showMenu);
	return (
		<View style={styles.containerPrin}>
			{/* Imagen de fondo */}
			<Image source={require('../assets/background2.png')} style={{ position: 'absolute' }} />
			{session && (
				<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
					<Ionicons
						name='ios-menu'
						color='white'
						size={30}
						style={{ marginHorizontal: 15, marginVertical: 5, alignSelf: 'flex-start' }}
						onPress={() => {
							alert('menu lateral');
						}}
					></Ionicons>
					{/* Container de SALDO de la cuenta */}
					<View style={styles.saldoContainer}>
						<Text style={styles.text_saldoCuentaTitle}> Saldo de la cuenta</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={styles.text_saldoCuenta}> $ {bal}</Text>
							<TouchableOpacity
								onPress={() => {
									alert('Editar perfil');
								}}
							>
								<Ionicons name='md-person' color='white' size={38} style={styles.avatar}></Ionicons>
							</TouchableOpacity>
						</View>
					</View>
					{/* scrollview HORIZONTAL de balances de cuentas */}
					<View
						style={{
							maxHeight: deviceHeight * 0.4,
							minHeight: 200,
							marginVertical: 0,
							// backgroundColor: 'blue',
						}}
					>
						<ScrollView
							horizontal={true}
							decelerationRate={0}
							snapToInterval={deviceWidth} //your element width
							snapToAlignment={'center'}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.balance_horizontalScrollview}
						>
							{/* Container de BALANCE de la cuenta */}
							<View style={styles.balanceContainer}>
								<Text style={styles.textTitle}>Balance</Text>
								<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
									<View style={{ alignItems: 'center' }}>
										<Text style={styles.text_ingresosEgresos}> Ingresos</Text>
										<Text style={styles.text_ingresos}>$ 1.587</Text>
									</View>
									{/* Separador Vertical */}
									<View style={{ borderRightColor: 'grey', borderRightWidth: 1 }} />
									<View style={{ alignItems: 'center' }}>
										<Text style={styles.text_ingresosEgresos}> Egresos</Text>
										<Text style={styles.text_egresos}>$ 20.319</Text>
									</View>
								</View>
								{/* Separador Vertical */}
								<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginVertical: 5 }} />
								<Text style={styles.text_body}>El balance de su cuenta en los ultimos "7 dias" fue de $3.326 a favor.</Text>
								<TouchableOpacity
									style={{ alignItems: 'flex-end', marginTop: 0 }}
									onPress={() => {
										alert('Ver el detalle');
									}}
								>
									<Text style={styles.text_link}>Ver el detalle</Text>
								</TouchableOpacity>
							</View>

							{/* Container de BALANCE de la cuenta */}
							<View style={styles.balanceContainer}>
								<Text style={styles.textTitle}>Balance</Text>
								<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
									<View style={{ alignItems: 'center' }}>
										<Text style={styles.text_ingresosEgresos}> Ingresos</Text>
										<Text style={styles.text_ingresos}>$ 1.587</Text>
									</View>
									{/* Separador Vertical */}
									<View style={{ borderRightColor: 'grey', borderRightWidth: 1 }} />
									<View style={{ alignItems: 'center' }}>
										<Text style={styles.text_ingresosEgresos}> Egresos</Text>
										<Text style={styles.text_egresos}>$ 20.319</Text>
									</View>
								</View>
								{/* Separador Vertical */}
								<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginVertical: 10 }} />
								<Text style={styles.text_body}>El balance de su cuenta en los ultimos "7 dias" fue de $3.326 a favor.</Text>
								<TouchableOpacity
									style={{ alignItems: 'flex-end', marginTop: 0 }}
									onPress={() => {
										navigation.navigate('Recharge');
									}}
								>
									<Text style={styles.text_link}>Ver el detalle</Text>
								</TouchableOpacity>
							</View>

							{/* Container de BALANCE de la cuenta */}
							<View style={styles.balanceContainer}>
								<Text style={styles.textTitle}>Balance</Text>
								<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
									<View style={{ alignItems: 'center' }}>
										<Text style={styles.text_ingresosEgresos}> Ingresos</Text>
										<Text style={styles.text_ingresos}>$ 1.587</Text>
									</View>
									{/* Separador Vertical */}
									<View style={{ borderRightColor: 'grey', borderRightWidth: 1 }} />
									<View style={{ alignItems: 'center' }}>
										<Text style={styles.text_ingresosEgresos}> Egresos</Text>
										<Text style={styles.text_egresos}>$ 20.319</Text>
									</View>
								</View>
								{/* Separador Vertical */}
								<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginVertical: 10 }} />
								<Text style={styles.text_body}>El balance de su cuenta en los ultimos "7 dias" fue de $3.326 a favor.</Text>
								<TouchableOpacity
									style={{ alignItems: 'flex-end', marginTop: 0 }}
									onPress={() => {
										alert('Ver el detalle');
									}}
								>
									<Text style={styles.text_link}>Ver el detalle</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
					</View>

					{/* ACCIONES */}
					<View style={styles.accionesContainer}>
						<Text style={styles.textTitle}>Acciones</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<TouchableOpacity
								onPress={() => {
									alert('Recargar dinero');
								}}
								style={{ width: '30%' }}
							>
								<View style={{ alignItems: 'center' }}>
									<View style={styles.mainActionIconContainer}>
										<Ionicons name='ios-wallet' color='indigo' size={35}></Ionicons>
									</View>
									<Text style={styles.text_acciones}>Recargar Dinero</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									alert('Mandar dinero');
								}}
								style={{ width: '30%' }}
							>
								<View style={{ alignItems: 'center' }}>
									<View style={styles.mainActionIconContainer}>
										<Ionicons name='ios-swap' color='indigo' size={35}></Ionicons>
									</View>
									<Text style={styles.text_acciones}>Mandar Dinero</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									alert('Pagar');
								}}
								style={{ width: '30%' }}
							>
								<View style={{ alignItems: 'center' }}>
									<View style={styles.mainActionIconContainer}>
										<Ionicons name='ios-cart' color='indigo' size={35}></Ionicons>
									</View>
									<Text style={styles.text_acciones}>Pagar</Text>
								</View>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={{ alignItems: 'flex-end', alignSelf: 'flex-end', marginTop: 10, paddingVertical: 10, marginRight: 5, maxWidth: '50%' }}
							onPress={() => {
								alert('Ver todas las acciones');
							}}
						>
							<Text style={styles.text_link}>Ver todas las acciones</Text>
						</TouchableOpacity>
					</View>

					{/* Container de ULTIMOS MOVIMIENTOS de la cuenta */}
					<View style={{ marginVertical: 30 }}>
						<View style={styles.ultimosMovimientosContainer}>
							<Text style={styles.textTitle_ultimosMovimientos}>Úlitmos movimientos</Text>

							{/* fila de ULTIMO MOVIMIENTO */}
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={styles.shopBrandLogosContainer}>
										<Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ height: 30, width: 30 }}></Image>
									</View>
									<View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
										<Text style={styles.text_shopUltimosMovimientos}>Negocio o Usuario</Text>
										<Text style={styles.text_detailUltimosMovimientos}>Detalle de la transaccion</Text>
									</View>
								</View>
								<View style={{ alignItems: 'center' }}>
									<Text style={styles.text_ingresosUltimosMovimientos}> $ 415, 00</Text>
								</View>
							</View>
							{/* Separador Horizontal */}
							<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginVertical: 10 }} />

							{/* fila de ULTIMO MOVIMIENTO */}
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={styles.shopBrandLogosContainer}>
										<Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ height: 30, width: 30 }}></Image>
									</View>
									<View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
										<Text style={styles.text_shopUltimosMovimientos}>Negocio o Usuario</Text>
										<Text style={styles.text_detailUltimosMovimientos}>Detalle de la transaccion</Text>
									</View>
								</View>
								<View style={{ alignItems: 'center' }}>
									<Text style={styles.text_ingresosUltimosMovimientos}> $ 174.319, 21</Text>
								</View>
							</View>
							{/* Separador Horizontal */}
							<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginVertical: 10 }} />

							{/* fila de ULTIMO MOVIMIENTO */}
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={styles.shopBrandLogosContainer}>
										<Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ height: 30, width: 30 }}></Image>
									</View>
									<View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
										<Text style={styles.text_shopUltimosMovimientos}>Negocio o Usuario</Text>
										<Text style={styles.text_detailUltimosMovimientos}>Detalle de la transaccion</Text>
									</View>
								</View>
								<View style={{ alignItems: 'center' }}>
									<Text style={styles.text_egresosUltimosMovimientos}> - $ 4.821, 94</Text>
								</View>
							</View>
							{/* Separador Horizontal */}
							<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginVertical: 10 }} />

							{/* fila de ULTIMO MOVIMIENTO */}
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={styles.shopBrandLogosContainer}>
										<Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ height: 30, width: 30 }}></Image>
									</View>
									<View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
										<Text style={styles.text_shopUltimosMovimientos}>Negocio o Usuario</Text>
										<Text style={styles.text_detailUltimosMovimientos}>Detalle de la transaccion</Text>
									</View>
								</View>
								<View style={{ alignItems: 'center' }}>
									<Text style={styles.text_egresosUltimosMovimientos}> - $ 12.127, 00</Text>
								</View>
							</View>
							{/* Separador Horizontal */}
							<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginVertical: 10 }} />

							{/* fila de ULTIMO MOVIMIENTO */}
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={styles.shopBrandLogosContainer}>
										<Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ height: 30, width: 30 }}></Image>
									</View>
									<View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
										<Text style={styles.text_shopUltimosMovimientos}>Negocio o Usuario</Text>
										<Text style={styles.text_detailUltimosMovimientos}>Detalle de la transaccion</Text>
									</View>
								</View>
								<View style={{ alignItems: 'center' }}>
									<Text style={styles.text_egresosUltimosMovimientos}> - $ 17, 53</Text>
								</View>
							</View>
							<TouchableOpacity
								style={{ alignItems: 'flex-end', marginTop: 30 }}
								onPress={() => {
									alert('Ver mas movimientos');
								}}
							>
								<Text style={styles.text_link}>Ver mas movimientos</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			)}
		</View>
	);
}
// <---------------------------- ESTILOS ---------------------------->

const styles = StyleSheet.create({
	containerPrin: {
		backgroundColor: 'white',
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-start',
		height: vh(100),
		width: deviceWidth,
		alignItems: 'center',
		paddingTop: 2,
	},
	saldoContainer: {
		width: 0.9 * deviceWidth,
		// backgroundColor: 'cyan',
		borderRadius: 20,
		// minHeight: 100,
		padding: 0,
		marginBottom: 10,
	},
	balance_horizontalScrollview: {
		paddingVertical: 0,
		// alignItems: 'center',
		// backgroundColor: 'gold',
	},
	balanceContainer: {
		width: deviceWidth * 0.9,
		height: '90%',
		backgroundColor: 'white',
		borderRadius: 15,
		paddingVertical: 10,
		paddingHorizontal: 15,
		// marginVertical: 10,
		marginHorizontal: deviceWidth * 0.05,
		shadowColor: '#000', // iOS
		shadowOffset: { width: 0, height: 5 }, // iOS
		shadowOpacity: 0.36, // iOS
		shadowRadius: 6.68, // iOS
		elevation: 11, // Android
	},
	accionesContainer: {
		width: deviceWidth * 0.9,
		marginHorizontal: deviceWidth * 0.05,
	},
	mainActionIconContainer: {
		width: vw(15),
		aspectRatio: 1,
		borderRadius: 15,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 5,
		shadowColor: '#000', // iOS
		shadowOffset: { width: 0, height: 5 }, // iOS
		shadowOpacity: 0.36, // iOS
		shadowRadius: 6.68, // iOS
		elevation: 11, // Android
	},
	ultimosMovimientosContainer: {
		width: deviceWidth * 0.9,
		marginHorizontal: deviceWidth * 0.05,
		height: 'auto',
		backgroundColor: 'white',
		borderRadius: 15,
		minHeight: 100,
		padding: 15,
		shadowColor: '#000', // iOS
		shadowOffset: { width: 0, height: 5 }, // iOS
		shadowOpacity: 0.36, // iOS
		shadowRadius: 6.68, // iOS
		elevation: 11, // Android
	},
	shopBrandLogosContainer: {
		height: 30,
		width: 30,
		// backgroundColor: 'indigo',
		borderColor: 'indigo',
		borderWidth: 1,
		borderRadius: 10,
		overflow: 'hidden',
	},

	// <-------> Avatar <------->
	avatar: {
		marginRight: vh(7),
	},
	// <-------> Avatar <------->
	// <-------> Text <------->
	text_saldoCuentaTitle: {
		color: 'white',
		fontSize: 16,
		// fontWeight: 'bold',
	},
	text_saldoCuenta: {
		color: 'white',
		fontSize: 36,
		// fontWeight: 'bold',
	},
	textTitle: {
		color: 'rgb(30,30,30)',
		fontSize: 18,
		marginBottom: 5,
	},
	text_ingresosEgresos: {
		color: 'black',
		fontSize: 16,
	},
	text_ingresos: {
		color: 'darkgreen',
		fontSize: 24,
	},
	text_egresos: {
		color: 'firebrick',
		fontSize: 24,
	},
	text_body: {
		color: 'rgb(30,30,30)', // Negro
		fontSize: 14,
		lineHeight: 22,
	},
	text_acciones: {
		color: 'rgb(30,30,30)', // Negro
		fontSize: 14,
		// lineHeight: 22,
		textAlign: 'center',
	},
	text_link: {
		color: 'steelblue',
		fontSize: 14,
	},
	textTitle_ultimosMovimientos: {
		color: 'rgb(30,30,30)',
		fontSize: 18,
		marginBottom: 12,
	},
	text_shopUltimosMovimientos: {
		fontSize: 14,
		color: 'black',
	},
	text_detailUltimosMovimientos: {
		fontSize: 12,
		color: 'darkgrey',
	},
	text_ingresosUltimosMovimientos: {
		color: 'darkgreen',
		fontSize: 14,
	},
	text_egresosUltimosMovimientos: {
		color: 'firebrick',
		fontSize: 14,
	},
	// <-------> Text <------->
});
// <---------------------------- ESTILOS ---------------------------->
