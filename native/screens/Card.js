import React, { useState } from 'react';
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../core/theme';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Modal, ScrollView } from 'react-native';
import { rechargeByCard } from '../store/actions/acountActions';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';

const { width, height } = Dimensions.get('window');


const Card = () => {
	const [showModal, setShowModal] = React.useState(false);
	const [currency, setCurrency] = React.useState({
		selected: 'pesos',
	});

	const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
	const accounts = useSelector((state) => state.acoount.account);
	const account = accounts[0];
	const cvuV = account && account.cvu;
	const [show, setShow] = useState(false);
	const [inputText, setInputText] = useState({
		cvu: cvuV,
		amount: '',
	});


	const onChange = (formData) => {
		return;
	};


	const onFocus = (field) => console.log('focus', field);

	const handlerSubmit = () => {
		dispatch(rechargeByCard(inputText));
		return;
	};


	const ModalSelector = ({ show, control, setter }) => {
		return (
			<View>
				<Modal visible={show} animated animationType='fade' transparent={true}>
					<View style={styles.modalContent}>
						<TouchableOpacity
							onPress={() => {
								setter({ selected: 'pesos' });
								control(false);
							}}
						>
							<View style={styles.item}>
								<Text style={styles.itemText}>Cuenta en pesos</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								setter({ selected: 'dólares' });
								control(false);
							}}
						>
							<View style={styles.item}>
								<Text style={styles.itemText}>Cuenta en dólares</Text>
							</View>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	};

	return (
		<ScrollView>
			{/* Imagen de fondo */}
			<Image source={require('../assets/background2.png')} style={{ position: 'absolute', backgroundColor: 'white' }} />
			<View style={styles.containerPrincipal}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						padding: 40,
						paddingVertical: 60,
						justifyContent: 'center',
					}}
				>
					<Text style={styles.titleStyle}>Recarga dinero con una tarjeta de credito o debito</Text>
				</View>
				<View>
					<CreditCardInput autoFocus requiresName requiresCVC cardScale={1.1} allowScroll={true} labelStyle={styles.label} inputStyle={styles.input} validColor={'black'} invalidColor={'red'} placeholderColor={'darkgray'} placeholders={{ number: '1234 5678 1234 5678', name: 'NOMBRE COMPLETO', expiry: 'MM/YY', cvc: 'CVC' }} labels={{ number: 'NÚMERO TARJETA', expiry: 'EXPIRA', name: 'NOMBRE COMPLETO', cvc: 'CVC' }} onFocus={onFocus} onChange={onChange} />
				</View>
				<View>
					<CustomInput
						label='Cantidad de dinero:'
						name='Cantidad'
						returnKeyType='done'
						// onChangeText={handleChange("password")}
						style={styles.inputCantidadDinero}
					/>
				</View>
				<View style={styles.textSeleccionarContainer}>
					<Text>Selecciona una cuenta desde la que transferir:</Text>
				</View>
				<View>
					<TouchableOpacity onPress={() => setShowModal(true)}>
						<View style={styles.modalshut}>
							<Text style={{ textAlign: 'center' }}>Desde mi cuenta en {currency.selected}</Text>
							<ModalSelector show={showModal} control={setShowModal} setter={setCurrency} />
						</View>
					</TouchableOpacity>
					{/* <TouchableOpacity style={styles.buttonStyle} onPress={handlerSubmit}>
						<Text style={styles.buttonTextStyle}>Recargar</Text>
					</TouchableOpacity> */}
					<Button mode='contained' secureTextEntry={true} style={styles.buttonStyle} onPress={handlerSubmit}>
						Recargar
					</Button>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	containerPrincipal: {
		flexDirection: 'column',
		// height: height,
		// flex: 1,
		// backgroundColor: 'white',
		justifyContent: 'center',
		textAlign: 'center',
		// alignItems: 'center',
		// marginVertical: 80,
	},
	label: {
		color: 'black',
		fontSize: 16,
	},
	input: {
		fontSize: 18,
		color: 'black',
	},
	buttonStyle: {
		marginTop: 20,
		marginBottom: 30,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		backgroundColor: theme.colors.primary,
		width: width * 0.5,
		alignSelf: 'center',
	},
	buttonTextStyle: {
		color: '#FFFFFF',
		paddingVertical: 10,
		fontSize: 16,
	},
	input: {
		height: 40,
		backgroundColor: 'white',
		borderColor: '#fff',
	},
	inputCantidadDinero: {
		height: 40,
		backgroundColor: 'white',
		borderColor: '#fff',
		width: width * 0.5,
		alignSelf: 'center',
		marginTop: 20,
	},
	// Text
	titleStyle: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		paddingLeft: 5,
	},
	textInputStyle: {
		flexDirection: 'row',
		height: 40,
		width: '70%',
		margin: 'auto',
		justifyContent: 'center',
		textAlign: 'center',
	},
	modalshut: {
		marginTop: 10,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderWidth: 0.3,
		borderRadius: 5,
		borderColor: '#669',
		width: width * 0.5,
		alignSelf: 'center',
	},
	modal: {
		flex: 1,
		backgroundColor: 'red',
	},
	modalContent: {
		marginLeft: width * 0.05,
		marginRight: width * 0.05,
		marginTop: height * 0.4,
		height: height * 0.2,
		width: width * 0.9,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.3,
		borderRadius: 5,
	},
	itemText: {
		fontSize: 20,
		textAlign: 'center',
		color: theme.colors.secondary,
	},
	textSeleccionarContainer: {
		// width: width * 0.5,
		alignSelf: 'center',
		textAlign: 'center',
		marginVertical: 10,
	},
});

export default Card;
