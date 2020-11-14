import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { verifySession, logoutUser } from '../store/actions/jwtUsersActions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWallet, faMoneyBillWaveAlt, faUser, faChartLine, faExchangeAlt, faCubes, faSignOutAlt, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// Background Image
const image = { uri: 'https://cdn.pixabay.com/photo/2016/05/22/20/13/background-1409125_960_720.png' };

export default function RechargeScreen({navigation}) {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
	useEffect(() => {
		dispatch(verifySession());
	}, []);
    console.log('soy el user logeado', session);
    const logoutHandler = () => {
        // dispatch(logoutUser())
        // navigation.navigate('welcome');
		// return
		alert('funciona')
    }
	return (
		<View>
			{session && (
				<ImageBackground source={image} style={styles.backgroundImage}>
					<View style={styles.containerPrin}>
						{/* <TouchableOpacity
							onPress={() => {
								alert('Logout');
							}}
						> */}
							<View style={styles.containerNameLogout}>
								<TouchableOpacity onPress={logoutHandler}>
								<FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'darkorchid', alignSelf: 'center', marginLeft: 10 }} size={18}  />
								</TouchableOpacity>
								<Text style={styles.text}>Salir</Text>
							</View>
						{/* </TouchableOpacity> */}
						<Text style={styles.textBalance}>Hola {session.username || 'Usuario'}!</Text>
						<View style={styles.containerInfoGeneral}>
							<View style={styles.contAvatarSaldo}>
								<View style={styles.avatarContainer}>
									<Image source={{ uri: 'https://avatars.dicebear.com/api/avataaars/:seed.svg' }} style={{ width: 60, height: 60, alignSelf: 'center' }}></Image>
								</View>
								<View>
									<Text style={styles.textBalance}>$ 12.000.000,23</Text>
									<Text style={styles.text}>Saldo Actual</Text>
								</View>
							</View>

							<View style={styles.containerGeneral}>
								<Text style={styles.textTitle}>General</Text>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-evenly',
										alignItems: 'center',
									}}
								>
									<View style={styles.containerIngresos}>
										<Text style={styles.text}>Ingresos</Text>
										<Text style={styles.textTitle}>$ 12345.23</Text>
									</View>
									<View style={styles.containerEngresos}>
										<Text style={styles.text}>Egresos</Text>
										<Text style={styles.textTitle}>$ 975.70</Text>
									</View>
								</View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-evenly',
										alignItems: 'center',
										height: 30,
									}}
								>
									<Text style={styles.textMini}>1 dia</Text>
									<Text style={styles.textMini}>7 dias</Text>
									<Text style={styles.textMini}>1 mes</Text>
									<Text style={styles.textMini}>6 meses</Text>
								</View>
							</View>
						</View>

						<View style={styles.mainActionsContainer}>
							<View>
								<TouchableOpacity
									onPress={() => {
										alert('Recargar Dinero');
									}}
									style={styles.largeButtonContainer}
								>
									<FontAwesomeIcon icon={faWallet} style={{ color: 'white' }} size={44} />
									<Text style={styles.text}>Recargar Dinero</Text>
								</TouchableOpacity>
							</View>

							<View>
								<TouchableOpacity
									onPress={() => {
										alert('Mandar Dinero');
									}}
									style={styles.largeButtonContainer}
								>
									<FontAwesomeIcon icon={faMoneyBillWaveAlt} style={{ color: 'white' }} size={44} />
									<Text style={styles.text}>Mandar Dinero</Text>
								</TouchableOpacity>
							</View>
						</View>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-evenly',
								flexWrap: 'wrap',
							}}
						>
							<View style={styles.buttonContainerLight}>
								<TouchableOpacity
									onPress={() => {
										alert('Transacciones');
									}}
								>
									<FontAwesomeIcon icon={faExchangeAlt} style={{ color: 'darkorchid', alignSelf: 'center' }} size={22} />
									<Text style={styles.textMini}>Transacciones</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.buttonContainerDark}>
								<TouchableOpacity
									onPress={() => {
										alert('Estadisticas');
									}}
								>
									<FontAwesomeIcon icon={faChartLine} style={{ color: 'darkorchid', alignSelf: 'center' }} size={22} />
									<Text style={styles.textMini}>Estadisticas</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.buttonContainerLight}>
								<TouchableOpacity
									onPress={() => {
										alert('Mis Productos');
									}}
								>
									<FontAwesomeIcon icon={faCubes} style={{ color: 'darkorchid', alignSelf: 'center' }} size={22} />
									<Text style={styles.textMini}>Mis Productos</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.buttonContainerDark}>
								<TouchableOpacity
									onPress={() => {
										alert('Mis Datos');
									}}
								>
									<FontAwesomeIcon icon={faUser} style={{ color: 'darkorchid', alignSelf: 'center' }} size={22} />
									<Text style={styles.textMini}>Mis Datos</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ImageBackground>
			)}
		</View>
	);
}
// <---------------------------- ESTILOS ---------------------------->
const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		// justifyContent: 'center',
	},
	containerPrin: {
		width: vw(100),
		height: vh(100),
		justifyContent: 'space-evenly',
		alignItems: 'stretch',
		paddingTop:80
		// paddingHorizontal: 4,
		// borderColor: 'black',
		// borderWidth: 1,
	},
	containerNameLogout: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		marginHorizontal: 20,
		marginTop: 15,
	},
	containerInfoGeneral: {
		flex: 1,
		justifyContent: 'space-evenly',
		margin: 18,
		backgroundColor: 'rgba(30, 30, 30, 0.2)',
		borderRadius: 20,
		overflow: 'hidden',
	},
	contAvatarSaldo: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	avatarContainer: {
		backgroundColor: 'white',
		borderRadius: 1000,
		overflow: 'hidden',
	},
	containerGeneral: {
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: 'rgba(30, 30, 30, 0.5)',
	},
	containerIngresos: {
		flex: 1,
		backgroundColor: 'darkorchid',
		height: 70,
		justifyContent: 'space-evenly',
	},
	containerEngresos: {
		flex: 1,
		backgroundColor: 'indigo',
		height: 70,
		justifyContent: 'space-evenly',
	},
	mainActionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginBottom: 30,
		marginTop: 20,
	},
	largeButtonContainer: {
		width: '100%',
		height: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 80,
	},
	buttonContainerLight: {
		backgroundColor: 'rgb(30,30,30)',
		height: 50,
		width: '25%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainerDark: {
		backgroundColor: 'rgb(20,20,20)',
		height: 50,
		width: '25%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconPlaceholderSmall: {
		height: 20,
		width: 20,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: 'white',
		// backgroundColor: 'white',
		alignSelf: 'center',
	},
	iconPlaceholderLarge: {
		height: 50,
		width: 50,
		borderRadius: 1000,
		borderWidth: 2,
		borderColor: 'white',
		// backgroundColor: 'white',
		alignSelf: 'center',
	},
	// <-------> Text <------->
	text: {
		color: 'white',
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'trebuchet ms',
	},
	textTitle: {
		color: 'white',
		fontSize: 18,
		lineHeight: 32,
		textAlign: 'center',
		fontFamily: 'trebuchet ms',
	},
	textMini: {
		color: 'white',
		fontSize: 10,
		marginTop: 5,
		textAlign: 'center',
		fontFamily: 'trebuchet ms',
	},
	textBalance: {
		color: 'white',
		fontSize: 20,
		lineHeight: 32,
		textAlign: 'center',
		fontFamily: 'trebuchet ms',
	},
	// <-------> Text <------->
});
// <---------------------------- ESTILOS ---------------------------->
