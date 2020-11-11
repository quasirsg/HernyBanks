import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Yup from 'yup';

import { loguinUser } from '../store/actions/jwtUsersActions';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ id, email, password, isValid, navigation }) => {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);

	return (
		<Background>
			<Logo />

			<Header>Login</Header>

			<View style={styles.loginContainer}>
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					validationSchema={Yup.object({
						email: Yup.string().email('Introduzca un email valido por favor').required('Debes completar este campo'),
						password: Yup.string().required('Please Enter your password'),
					})}
					onSubmit={(values, action) => {
						try {
							let user = { ...values };

							//To lower case (wtf?)
							user.email = user.email.toLowerCase();

							action.resetForm();
							dispatch(loguinUser(user.email, user.password));
							setTimeout(function () {
								navigation.navigate('RechargeScreen');
							}, 2000);
						} catch {
							alert('error');
						}
						// navigation.navigate("RegisterModal");
					}}
				>
					{({ handleChange, handleSubmit, values, errors, touched }) => (
						<View>
							<CustomInput label='Email' name='email' returnKeyType='next' onChangeText={handleChange('email')} value={values.email} autoCapitalize='none' autoCompleteType='email' textContentType='emailAddress' keyboardType='email-address' />

							{errors.email && <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>}
							{/*  */}

							<CustomInput label='Password' name='password' returnKeyType='done' onChangeText={handleChange('password')} value={values.password} secureTextEntry={true} />

							{errors.password && <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>}
							{/*  */}

							<Button mode='contained' secureTextEntry={true} title='Register' style={styles.button} onPress={handleSubmit}>
								Login
							</Button>

							{/*  */}

							<View style={styles.row}>
								<Text style={styles.label}>Don’t have an account? </Text>
								<TouchableOpacity onPress={() => navigation.navigate('Register')}>
									<Text style={styles.link}>Sign up</Text>
								</TouchableOpacity>
							</View>
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
});

export default Login;
