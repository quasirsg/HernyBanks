import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Yup from 'yup';

import { userUp } from '../store/actions/userUpActions';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterModal = ({ code, navigation }) => {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);

	return (
		<Background>
			{/* <Logo /> */}

			<Header>Validacion Codigo</Header>

			<View style={styles.loginContainer}>
				<Formik
					initialValues={{
            			code:""
					}}

					onSubmit={(values, action) => {
						console.log('******VALUES*******')
						
						const { code } = values
						console.log(code)
						dispatch(userUp(code, () => navigation.navigate("Login")))
									//navigation.navigate("Login");
					}}
				>
					{({ handleChange, handleSubmit, values, errors, touched }) => (
						<View>
							<CustomInput 
								label='code' 
								name='code' 
								returnKeyType='next' 
								onChangeText={handleChange('code')} 
								value={values.code} 
								autoCapitalize='none' 
								style={styles.input} 
							/>


							<Button mode='contained' secureTextEntry={true} title='Register' style={styles.button} onPress={handleSubmit}>
								Validar
							</Button>

							{/*  */}

						</View>
					)}
				</Formik>
			</View>
		</Background>
	);
};

const styles = StyleSheet.create({
	label: {
		color: theme.colors.secondary,
	},
	button: {
		marginTop: 24,
	},
	row: {
		flexDirection: 'row',
		marginTop: 4,
	},
	link: {
		fontWeight: 'bold',
		color: theme.colors.primary,
	},
	input: {
		height: 40,
		width:100,
		backgroundColor: 'white'
	}
});

export default RegisterModal;