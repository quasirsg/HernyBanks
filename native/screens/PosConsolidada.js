import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

// Background Image
const image = { uri: 'https://cdn.pixabay.com/photo/2016/05/22/20/13/background-1409125_960_720.png' };

export default function PosConsolidada() {
	return (
		<ImageBackground source={image} style={styles.backgroundImage}>
			<View style={styles.containerPrin}>
				<View
					style={{
						flex: 1,
						justifyContent: 'space-evenly',
						margin: 18,
						backgroundColor: 'rgba(30, 30, 30, 0.2)',
						borderRadius: 20,
						overflow: 'hidden',
					}}
				>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							alignItems: 'center',
						}}
					>
						<View style={styles.avatarContainer}>
							<Image source={{ uri: 'https://avatars.dicebear.com/api/avataaars/:seed.svg' }} style={{ width: 60, height: 60, alignSelf: 'center' }}></Image>
						</View>
						<View>
							<Text style={styles.textBalance}>$ 12.000.000,23</Text>
							<Text style={styles.text}>Saldo Actual</Text>
						</View>
					</View>

					<View
						style={{
							justifyContent: 'center',
							alignContent: 'center',
							backgroundColor: 'rgba(30, 30, 30, 0.5)',
						}}
					>
						<Text style={styles.textTitle}>General</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-evenly',
								alignItems: 'center',
							}}
						>
							<View
								style={{
									flex: 1,
									backgroundColor: 'darkorchid',
									height: 70,
									justifyContent: 'space-evenly',
								}}
							>
								<Text style={styles.text}>Ingresos</Text>
								<Text style={styles.textTitle}>$ 12345.23</Text>
							</View>
							<View
								style={{
									flex: 1,
									backgroundColor: 'indigo',
									height: 70,
									justifyContent: 'space-evenly',
								}}
							>
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
							<View style={styles.iconPlaceholderLarge}></View>
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
							<View style={styles.iconPlaceholderLarge}></View>
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
							<View style={styles.iconPlaceholderSmall}></View>
							<Text style={styles.textMini}>Transacciones</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainerDark}>
						<TouchableOpacity
							onPress={() => {
								alert('Estadisticas');
							}}
						>
							<View style={styles.iconPlaceholderSmall}></View>
							<Text style={styles.textMini}>Estadisticas</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainerLight}>
						<TouchableOpacity
							onPress={() => {
								alert('Mis Productos');
							}}
						>
							<View style={styles.iconPlaceholderSmall}></View>
							<Text style={styles.textMini}>Mis Productos</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainerDark}>
						<TouchableOpacity
							onPress={() => {
								alert('Mis Datos');
							}}
						>
							<View style={styles.iconPlaceholderSmall}></View>
							<Text style={styles.textMini}>Mis Datos</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ImageBackground>
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
		width: '100vw',
		height: '100vh',
		justifyContent: 'space-evenly',
		alignItems: 'stretch',
		// paddingHorizontal: 4,
		// borderColor: 'black',
		// borderWidth: 1,
	},
	avatarContainer: {
		backgroundColor: 'white',
		borderRadius: 1000,
		overflow: 'hidden',
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
