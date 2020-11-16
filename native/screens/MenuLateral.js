import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifySession, logoutUser } from '../store/actions/jwtUsersActions';

export default function MenuLateral() {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
	useEffect(() => {
		dispatch(verifySession());
	}, []);
	console.log('soy el user logeado', session);
	const logoutHandler = () => {
		dispatch(logoutUser());
		navigation.navigate('welcome');
		alert('funciona');
		return;
	};
	return (
		<View style={{ flex: 1, backgroundColor: 'cyan', justifyContent: 'center', alignItems: 'center' }}>
			<TouchableOpacity
				onPress={() => {
					alert('Log Out');
					logoutHandler();
				}}
			>
				<Text>Log Out</Text>
			</TouchableOpacity>
		</View>
	);
}
