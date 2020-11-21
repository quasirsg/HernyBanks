import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { Searchbar } from 'react-native-paper';
import {getContact} from '../../store/actions/contactsAction'

//Lista Contactos usuarios de HenryBanks Agregados
//un boton agregar contacto
//Buscador sobre los contactos
//lista de usuarios
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ContactList = ({ navigation }) => {
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
	const [contacts, setContacts] = useState([
		{
			name: 'Carlos',
			email: 'carlos@gmail.com',
			cvu: '0001234567891011121311',
			phone: '3011234561',
		},
		{
			name: 'Juan',
			email: 'juanito@gmail.com',
			cvu: '0001234567891011121312',
			phone: '3011234562',
		},
		{
			name: 'Camilo',
			email: 'cami@gmail.com',
			cvu: '0001234567891011121313',
			phone: '3011234563',
		},
		{
			name: 'Olivert',
			email: 'oli@gmail.com',
			cvu: '0001234567891011121314',
			phone: '3011234564',
		},
		{
			name: 'Gabriela',
			email: 'gabi@gmail.com',
			cvu: '0001234567891011121315',
			phone: '3011234565',
		},
		{
			name: 'Sebastian',
			email: 'sebas@gmail.com',
			cvu: '0001234567891011121316',
			phone: '3011234566',
		},
		{
			name: 'Cecilia',
			email: 'ceci@gmail.com',
			cvu: '0001234567891011121317',
			phone: '3011234567',
		},
		{
			name: 'Alexis',
			email: 'alex@gmail.com',
			cvu: '0001234567891011121318',
			phone: '3011234568',
		},
		{
			name: 'Pedro',
			email: 'pedro@gmail.com',
			cvu: '0001234567891011121319',
			phone: '3011234569',
		},
		{
			name: 'Ana',
			email: 'ana@gmail.com',
			cvu: '0001234567891011121311',
			phone: '3011234510',
		},
		{
			name: 'Maria',
			email: 'maria@gmail.com',
			cvu: '0001234567891011121312',
			phone: '3011234511',
		},
	]);

	const [results, setResults] = useState([]);

	useEffect(() => {

	}, []);

	const searchContacts = (value) => {
		if (!value) {
			setContacts(contacts);
		} else {
			const filteredContacts = contacts.filter((contact) => {
				let contactLowercase = contact.name.toLowerCase();
				let searchTermLowercase = value.toLowerCase();
				return contactLowercase.indexOf(searchTermLowercase) > -1;
			});
			setResults(filteredContacts);
		}
	};

	const renderItem = ({ item }) => (
		<View>
			<Link to='/ContactCard'>
				<View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
					<View style={styles.circle}>
						<Text style={{ color: 'white' }}>
							{item.name && item.name.charAt(0).toUpperCase()}
							{item.email && item.email.charAt(0).toUpperCase()}
						</Text>
					</View>
					<View style={{ flexDirection: 'column' }}>
						<Text style={styles.items}>
							{item.name && item.name + ' '}
							{item.email && item.email + ' '}
						</Text>
						<Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 16 }}>{item && item.cvu && item.cvu}</Text>
					</View>
				</View>
			</Link>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['indigo', 'indigo', 'white']} style={{ flex: 1 }}>
				{/* header */}
				<SafeAreaView />
				<View style={styles.header}>
					<Link to='/Login'>
						<Icon name='angle-left' color='white' size={30} />
					</Link>
					<Text style={{ color: 'white', fontSize: 16 }}>Tus contactos Henry</Text>
					<Icon name='home' color='indigo' size={30} />
				</View>

				{/* input y agregar contacto */}
				<View style={styles.box}>
					<View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<TextInput placeholder='     Ingresa un nombre     ' placeholderTextColor='grey' style={styles.input} onChangeText={(value) => searchContacts(value)} />
						<View style={{ alignItems: 'center' }}>
							{/* agregar contacto */}
							<Link to='/SearchBar'>
								<Icon name='user-plus' color='white' size={30} />
							</Link>

							<Text style={{ fontSize: 10, color: 'white' }}>Agregar contacto</Text>
						</View>
					</View>

					{/* renderizar resultados de busqueda */}
					<View style={styles.flatList}>
						<FlatList
							data={results.length === 0 ? contacts : results}
							renderItem={renderItem}
							keyExtractor={(item, index) => index.toString()}
							ListEmptyComponent={() => (
								<View>
									<Text style={styles.items}>No tienes contactos Henry's</Text>
								</View>
							)}
						/>
					</View>
				</View>
			</LinearGradient>
		</View>
	);
};
export default ContactList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	box: {
		margin: 20,
		flex: 1,
		height: 100,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		height: 60,
		justifyContent: 'space-between',
		backgroundColor: 'indigo',
	},
	input: {
		textAlign: 'center',
		height: 50,
		fontSize: 16,
		color: 'grey',
		borderRadius: 20,
		borderColor: '#9932CC',
		borderWidth: 5,
	},
	items: {
		color: '#0c222f',
		fontSize: 16,
	},
	circle: {
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
		marginRight: 10,
		width: 44,
		height: 44,
		borderRadius: 44 / 2,
		backgroundColor: 'red',
	},
	flatList: {
		backgroundColor: 'white',
		marginTop: 10,
		opacity: 0.5,
		borderRadius: 20,
		height: height / 3,
	},
});
