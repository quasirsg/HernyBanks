import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Button, ActivityIndicator, Image, Alert, Dimensions } from 'react-native';
import { theme } from '../../core/theme';

// Dimensions
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ContactCard = (props) => {
	/*  console.log(props.route.params.userId); */
	const [user, setUser] = useState({
		id: '',
		name: 'Gabriela',
		email: '',
		phone: '',
	});

	const [loading, setLoading] = useState(true);

	const getUserById = async (id) => {
		/* const dbRef = firebase.db.collection("users").doc(id);
   const doc = await dbRef.get();
   const user = doc.data(); */
		setUser({
			...user,
			id: doc.id,
		});
		setLoading(false);
	};

	useEffect(() => {
		/* getUserById(props.route.params.userId) */
	}, []);

	const handleChangeText = (name, value) => {
		setUser({ ...user, [name]: value });
	};

	const deleteUser = async () => {
		/* const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
   /*  await dbRef.delete() */
		/*  props.navigation.navigate('User List') */
	};

	const updateUser = async () => {
		/*  const dbRef = firebase.db.collection('users').doc(user.id); */
		await dbRef.set({
			name: user.name,
		});
		setUser(inicialState);
		props.navigation.navigate('User List');
	};
	const openConfirmationAlert = () => {
		Alert.alert('Remove The User', 'Are you sure?', [
			{ text: 'Yes', onPress: () => deleteUser() },
			{ text: 'No', onPress: () => console.log('Cancelado') },
		]);
	};

	/* if (loading) {
     return (
       <View>
         <ActivityIndicator size="large" color="#9E9E9E" />
       </View>
     );
   }  */

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View>
				<View style={styles.circle}>
					<Text
						style={{
							color: theme.colors.primary,
							fontSize: 100,
							textAlign: 'center',
						}}
					>
						{user.name.charAt(0).toUpperCase()}
					</Text>
				</View>
				<Text style={styles.title}>Detalles Contacto</Text>
				<View>
					<TextInput placeholder='Nombre' value={user.name} onChangeText={(value) => handleChangeText('name', value)} style={styles.input} />
				</View>
				<View style={styles.inputGroup}>
					<TextInput placeholder='Email' value={user.email} style={styles.input} onChangeText={(value) => handleChangeText('email', value)} />
					<Text
						style={{
							// font: 3,
							color: '#cdcdcd',
						}}
					>
						no editable
					</Text>
				</View>
				<View style={styles.inputGroup}>
					<TextInput placeholder='Telefono' value={user.phone} style={styles.input} onChangeText={(value) => handleChangeText('phone', value)} />
					<Text
						style={{
							// font: 3,
							color: '#cdcdcd',
						}}
					>
						no editable
					</Text>
				</View>
				<View
					style={{
						marginTop: 4,
					}}
				>
					<View>
						<Button title='Actualizar' onPress={() => updateUser()}></Button>
					</View>
					<View
						style={{
							marginTop: 10,
						}}
					>
						<Button title='Borrar' style={styles.buttonDel} onPress={() => openConfirmationAlert()}></Button>
					</View>
					<View
						style={{
							marginTop: 10,
						}}
					>
						<Button title='Transferir Dinero' onPress={() => navigation.navigate('FinishSend')}></Button>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	title: {
		textAlign: 'center',
		paddingTop: 20,
		fontSize: 30,
		paddingBottom: 20,
		fontWeight: 'bold',
		color: theme.colors.primary,
	},
	label: {
		color: theme.colors.secondary,
	},
	button: {
		marginTop: 50,
		marginBottom: 30,
		backgroundColor: theme.colors.primary,
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
		backgroundColor: 'white',
		borderColor: '#fff',
	},
	forgotPassword: {
		color: theme.colors.secondary,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 11,
		color: theme.colors.primary,
	},
	down: {
		alignItems: 'center',
	},
});

export default ContactCard;
