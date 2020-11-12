import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { createUser } from '../store/actions/userActions';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const Register = ({ id, username, email, password, passwordConfirmation, isValid, navigation }) => {
	const dispatch = useDispatch();

	return (
		<Background>
			{/* <Logo /> */}

			<Header>Crear cuenta</Header>

			<View style={styles.loginContainer}>
				<Formik
					initialValues={{
						username: '',
						email: '',
						password: '',
						passwordConfirmation: '',
					}}
					validationSchema={Yup.object({
						username: Yup.string().min(4, 'Debe tener al menos 4 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Debes completar este campo'),
						email: Yup.string().email('Introduzca un email valido por favor').required('Debes completar este campo'),
						password: Yup.string()
							.required('Please Enter your password')
							.matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'),
						passwordConfirmation: Yup.string()
							.oneOf([Yup.ref('password'), null], 'La contraseña no coincide')
							.required('Password confirm is required'),
					})}
					onSubmit={(values, action) => {
						action.resetForm();
						dispatch(createUser(values));
						navigation.navigate('RegisterModal');
					}}
				>
					{({ handleChange, handleSubmit, values, errors, touched }) => (
						<View>
							<CustomInput 
								label='Username' 
								name='username' 
								onChangeText={handleChange('username')} 
								value={values.userName} 
								style={styles.input}
							/>

							{values.username.length >= 4 && <Icon name='check' size={40} color='green' />}

							{errors.username && <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>}

							{/*  */}

							<CustomInput 
								label='Correo' 
								name='email' 
								returnKeyType='next' 
								onChangeText={handleChange('email')} 
								value={values.email} 
								autoCapitalize='none' 
								autoCompleteType='email' 
								textContentType='emailAddress' 
								keyboardType='email-address' 
								style={styles.input}
							/>

							{values.email.length >= 4 && !errors.email && <Icon name='check' size={40} color='green' />}

							{errors.email && <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>}

							{/*  */}

							<CustomInput 
								label='Contraseña' 
								name='password' 
								returnKeyType='done' 
								onChangeText={handleChange('password')} 
								value={values.password} 
								secureTextEntry={true} 
								style={styles.input}
							/>

							{values.password.length >= 8 && !errors.password && <Icon name='check' size={40} color='green' />}

							{errors.password && <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>}

							{/*  */}

							<CustomInput 
								label='Confirmar contraseña' 
								name='passwordConfirmation' 
								onChangeText={handleChange('passwordConfirmation')} 
								value={values.passwordConfirmation} 
								secureTextEntry={true} 
								style={styles.input}
							/>

							{values.passwordConfirmation.length >= 8 && !errors.passwordConfirmation && <Icon name='check' size={40} color='green' />}

							{errors.passwordConfirmation && <Text style={{ fontSize: 10, color: 'red' }}>{errors.passwordConfirmation}</Text>}

							{/*  */}

							<Button 
								mode='contained' 
								secureTextEntry={true} 
								title='Register' 
								style={styles.createButton} 
								onPress={handleSubmit}
							>
								Crear
							</Button>

							{/*  */}

							<View style={styles.row}>
								<Text style={styles.label}>¿Tienes una cuenta? </Text>
								<TouchableOpacity onPress={() => navigation.navigate('Login')}>
									<Text style={styles.link}>Ingresa aquí</Text>
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
	input: {
		height: 40,
		backgroundColor: 'white'
	}
});

export default Register;
