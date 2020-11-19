import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Linking, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Link } from '@react-navigation/native';
import { theme } from '../../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getContact } from '../../store/actions/contactsAction'

const { width, height } = Dimensions.get('window');

const testingContacts = [
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
];

const SummaryItem = ({ keyName, value }) => {


	return (
		<View style={styles.summary}>
			<Text style={styles.summaryKey}>{keyName}: </Text>
			<Text style={styles.summaryValue}>{value}</Text>
		</View>
	);
};

export default function SelectContact({ navigation }) {
	const myContacts = testingContacts; // Aquí se debe hacer la consulta a la api para traer los contactos del usuario
	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
	const contacts = useSelector((state) => state.contact.contact);
	const contactArray = contacts && contacts
	console.log(contacts)
	useEffect(() => {
		let id = session._id
		dispatch(getContact(id))
	}, []);
	const [selected, setSelected] = React.useState({
		name: '',
		email: '',
		cvu: '',
		phone: '',
	});

	const handleSelect = (contact) => {
		setSelected(contact);
	};

	return (
		<ScrollView backgroundColor={'white'}>
			<View>
				<View style={styles.header}>
					{/* <Link to="/PosConsolidada">
            <View style={styles.rowI}>
              <Icon name="arrow-left" color={'white'} size={25} />
              <Text style={styles.cancel}> Cancelar </Text>
            </View>
          </Link> */}
					{/* Imagen de fondo */}
					<Image source={require('../../assets/background2.png')} style={{ position: 'absolute' }} />

					<View style={styles.rowII}>
						<Icon name='user' color={'white'} size={30} />
						<Text style={styles.title}> Transferir dinero </Text>
					</View>

					<Text style={styles.instruction}> ¡Empecemos! Primero selecciona al destinatario </Text>
				</View>

				<View style={styles.contactContainer}>
					<Text style={styles.contactTitle}> Selecciona el destinatario </Text>
					<ScrollView>
						{contacts.map((contact, i) => (
							<TouchableOpacity style={styles.contactList} name={contact} onPress={() => handleSelect(contact)} key={i}>
								<Text style={styles.name}>{contact.name}</Text>
								<Text style={styles.complement}>{contact.email}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				<View>
					<Text style={styles.summaryTitle}> Se hará la transeferencia a: </Text>
					<View style={styles.summaryContent}>
						<SummaryItem keyName={'Nombre'} value={selected.name} />
						<SummaryItem keyName={'Correo'} value={selected.email} />
						{/* <SummaryItem keyName={'CVU'} value={selected.accounts.pesos} /> */}
						<SummaryItem keyName={'Teléfono'} value={selected.phone} />
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<Button mode='contained' secureTextEntry={true} style={styles.button} onPress={() => navigation.navigate('FinishSend')}>
						Siguiente
					</Button>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	header: {
		width: '100%',
		// backgroundColor: theme.colors.primary,
		paddingTop: 40,
		paddingLeft: 15,
	},
	rowI: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rowII: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 40,
		paddingVertical: 60,
		justifyContent: 'center',
	},
	cancel: {
		color: 'white',
		alignItems: 'center',
		marginLeft: 5,
	},
	title: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		paddingLeft: 5,
	},
	instruction: {
		textAlign: 'center',
		fontSize: 12,
		color: 'white',
		paddingBottom: 15,
	},
	contactContainer: {
		padding: 20,
		borderBottomWidth: 0.2,
		borderBottomColor: theme.colors.secondary,
		height: parseInt(height * 0.35),
	},
	contactTitle: {
		textAlign: 'center',
		fontSize: 12,
		color: theme.colors.secondary,
		paddingBottom: 15,
		fontWeight: 'bold',
	},
	contactList: {
		fontSize: 15,
		paddingTop: 12,
		paddingBottom: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	name: {
		color: theme.colors.secondary,
		fontWeight: 'bold',
	},
	complement: {
		color: theme.colors.secondary,
		fontSize: 12,
	},
	summaryTitle: {
		color: theme.colors.secondary,
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 17,
		padding: 10,
	},
	summaryContent: {
		margin: 5,
		padding: 20,
		borderWidth: 0.2,
		borderColor: theme.colors.primary,
		borderRadius: 5,
	},
	summary: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	summaryKey: {
		color: theme.colors.secondary,
		fontWeight: 'bold',
	},
	summaryValue: {
		color: theme.colors.secondary,
	},
	button: {
		marginTop: 20,
		marginBottom: 30,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		backgroundColor: theme.colors.primary,
		width: width * 0.5,
	},
	buttonContainer: {
		alignItems: 'center',
	},
});
