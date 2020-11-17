import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifySession, logoutUser } from '../store/actions/jwtUsersActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

// Dimensions
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function MenuLateral({ showMenu, setShowMenu, navigation }) {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
	useEffect(() => {
		dispatch(verifySession());
	}, []);
	console.log('soy el user logeado', session);
	const logoutHandler = () => {
		dispatch(logoutUser());
		navigation.navigate('Welcome')
		return;
	};
	return (
		<View style={{ flex: 1, backgroundColor: 'gainsboro', alignItems: 'center' }}>
			<View style={styles.containerPrin}>
				<Ionicons
					name='ios-close'
					color='indigo'
					size={30}
					style={{ marginHorizontal: 15 }}
					onPress={() => {
						// alert('menu lateral');
						setShowMenu(false);
					}}
				></Ionicons>
				<Ionicons name='ios-cog' color='indigo' size={30} style={{ marginHorizontal: 15 }}></Ionicons>
			</View>
			{/* <View>
				<Text style={styles.text_saldoCuentaTitle}>Saldo de la cuenta</Text>
				<Text style={styles.text_saldoCuenta}>$ 4.856</Text>
			</View> */}

			{/* Grupo RESUMEN DE LA CUENTA */}
			<View style={styles.containerGrupoOpciones}>
				<Text style={styles.textTitle}>Resumen de la cuenta</Text>
				{/* Separador INDIGO */}
				<View style={{ borderBottomColor: 'indigo', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Estado de la cuenta</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Ultimos Movimientos</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Estadisticas</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
			</View>

			{/* Grupo ACCIONES */}
			<View style={styles.containerGrupoOpciones}>
				<Text style={styles.textTitle}>Acciones</Text>
				{/* Separador INDIGO */}
				<View style={{ borderBottomColor: 'indigo', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Recargar dinero</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Mandar dinero</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Pagar en un local</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Pagar un servicio</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Gestionar debitos automaticos</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
			</View>

			{/* Grupo TARJETAS */}
			<View style={styles.containerGrupoOpciones}>
				<Text style={styles.textTitle}>Tarjetas</Text>
				{/* Separador INDIGO */}
				<View style={{ borderBottomColor: 'indigo', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Ver mi resumen</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
				<Text style={styles.text_body}>Gestionar tarjetas</Text>
				{/* Separador GRIS */}
				<View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>
			</View>

			<TouchableOpacity
				onPress={logoutHandler}
			>
				<View style={{ marginVertical: 40 }}>
					<Text style={styles.text_logout}>Salir de la cuenta</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

// <---------------------------- ESTILOS ---------------------------->

const styles = StyleSheet.create({
	containerPrin: {
		alignSelf: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginVertical: 5,
	},
	containerGrupoOpciones: {
		marginTop: 20,
		width: '90%',
	},
	// <-------> Text <------->
	text_saldoCuentaTitle: {
		color: 'rgb(30,30,30)',
		fontSize: 16,
		// fontWeight: 'bold',
	},
	text_saldoCuenta: {
		color: 'indigo',
		fontSize: 36,
		// fontWeight: 'bold',
	},
	textTitle: {
		color: 'indigo',
		fontSize: 20,
		marginVertical: 10,
	},
	text_body: {
		color: 'rgb(30,30,30)', // Negro
		fontSize: 16,
		lineHeight: 22,
		paddingVertical: 10,
	},
	text_logout: {
		color: 'steelblue',
		fontSize: 16,
	},

	// <-------> Text <------->
});
// <---------------------------- ESTILOS ---------------------------->
