import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, SafeAreaView } from 'react-native';
import { Formik, Form, Field } from 'formik';
import { Link } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useDispatch, useSelector } from 'react-redux';

import { completeUserRegister } from '../store/actions/userActions';

const AltaUser = ({ name, lastname, dni, phone, address, dob, navigation }) => {
	const dispatch = useDispatch();
	const stateUser = useSelector((state) => state.userUp);
	console.log('*************userUp***************');
	console.log(stateUser.userUp);
	const userUp = stateUser.userUp;
	//const userId = useSelector(state => state.users[0]._id);

	return (
		<View>
			{Object.keys(userUp).length === 0 ? (
				<View>
					<View>
						<Link to='/RegisterModal'>
							<Icon name='angle-left' color='#422C63' size={50} />
						</Link>
					</View>
					<Text
						style={{
							fontSize: 30,
							fontWeight: 'bold',
							// color: 'purple',
							textAlign: 'center'
						}}
					>
						{' '}
						Tu código es incorrecto. Vuelve atrás e inténtalo nuevamente.{' '}
					</Text>
				</View>
			) : (
				<Formik
					initialValues={{
						name,
						lastname,
						dni,
						phone,
						address,
            dob,
            _id:userUp._id
					}}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						dispatch(completeUserRegister(values));
						navigation.navigate('Login');
						resetForm();
						setSubmitting(false);
					}}
				>
					{({ handleChange, handleSubmit, values }) => (
						<View>
							<TextInput placeholder='Nombre' onChangeText={handleChange('name')} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={values.name} />
							<TextInput placeholder='Apellido' onChangeText={handleChange('lastname')} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={values.lastname} />
							<TextInput placeholder='Documento de identidad' onChangeText={handleChange('dni')} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={values.dni} />
							<TextInput placeholder='Dirección' onChangeText={handleChange('address')} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={values.address} />
							<TextInput placeholder='Teléfono' onChangeText={handleChange('phone')} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={values.password} />
							<TextInput placeholder='Fecha de nacimiento' onChangeText={handleChange('dob')} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={values.dob} />
							<Button secureTextEntry={true} title='Register' color='#841584' onPress={handleSubmit} />
						</View>
					)}
				</Formik>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
	},
	scrollView: {
		backgroundColor: 'white',
		marginHorizontal: 20,
	},
	text: {
		fontSize: 42,
	},
});

export default AltaUser;
