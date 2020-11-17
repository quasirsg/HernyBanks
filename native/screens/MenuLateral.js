import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifySession, logoutUser } from '../store/actions/jwtUsersActions';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
		<View style={{ flex: 1, backgroundColor: 'gainsboro', justifyContent: 'space-between', alignItems: 'center' }}>
			<View style={{ alignSelf: 'flex-start' }}>
				<Ionicons
					name='ios-close'
					color='black'
					size={30}
					style={{ marginHorizontal: 15 }}
					onPress={() => {
						// alert('menu lateral');
						setShowMenu(false);
					}}
				></Ionicons>
			</View>
			<TouchableOpacity
				onPress={logoutHandler}
			>
				<View style={{ marginVertical: 20 }}>
					<Text>Log Out</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
