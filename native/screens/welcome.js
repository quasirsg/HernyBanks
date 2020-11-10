import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Button, Text, ScrollView, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const image = { uri: 'https://cdn.pixabay.com/photo/2016/05/22/20/13/background-1409125_960_720.png' };

function Welcome({ navigation }) {
	const onPressLogin = () => {
		navigation.navigate('Login');
	};
	const onPressRegister = () => {
		navigation.navigate('Register');
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={image} style={styles.image}>
				<Text
					style={{
						backgroundColor: 'transparent',
						fontSize: 100,
						color: '#fff',
						padding: 35,
					}}
				>
					HBank
				</Text>

				<Text
					style={{
						backgroundColor: 'transparent',
						fontSize: 30,
						color: '#fff',
						padding: 40,
					}}
				>
					<TouchableHighlight onPress={onPressLogin}>
						<View style={styles.button}>
							<Text>Ingresar</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight onPress={onPressRegister}>
						<View style={styles.button}>
							<Text>Registrarse</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight>
						<View>
							<Text
								style={{
									backgroundColor: 'transparent',
									fontSize: 20,
									color: 'grey',
									padding: 30,
								}}
							>
								Necesitas ayuda?
							</Text>
						</View>
					</TouchableHighlight>
				</Text>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1D3448',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	button: {
		borderWidth: 0.1,
		alignItems: 'center',
		backgroundColor: 'purple',
		padding: 50,
		borderRadius: 20,
	},
});

export default Welcome;
