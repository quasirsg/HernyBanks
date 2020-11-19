import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Link } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from "../../core/theme";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from "../../components/Button";
import { Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const ModalSelector = ({ show, control, setter }) => {
    return (

        <View>
            <Modal
                visible={show}
                animated
                animationType='fade'
                transparent={true}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => {setter({selected: 'pesos'}); control(false)}}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>Cuenta en pesos</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {setter({selected: 'dólares'}); control(false)}}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>Cuenta en dólares</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default function SelectContact({ navigation }) {
    const accounts = useSelector((state) => state.acoount.account);
    const accountP = accounts[0];
	const accountD = accounts[1];
	const balancP = accountP && accountP.balance;
    const balancD = accountD && accountD.balance;
    console.log("***balance para contact***")
    console.log(balancP)
    const [showModal, setShowModal] = React.useState(false);
    const [currency, setCurrency] = React.useState({
        selected: 'pesos'
    })

    const [currentBalance, setCurrentBalance] = React.useState({
        pesos: balancP,
        dollars: balancD
    })

    return (
        <ScrollView backgroundColor={'white'}>
            <View>

                <View style={styles.header}>

                    <Link to="/SelectContact">
                        <View style={styles.rowI}>
                            <Icon name="arrow-left" color={'white'} size={25} />
                            <Text style={styles.back}> Volver </Text>
                        </View>
                    </Link>

                    <View style={styles.rowII}>
                        <Icon name="money" color={'white'} size={30} />
                        <Text style={styles.title}> Transferir dinero </Text>
                    </View>

                    <Text style={styles.instruction}> Por último completa esta información </Text>
                </View>

                <View style={styles.card}>

                    <Text style={styles.balaceTitle}> Tu balance actual </Text>
                    <View style={styles.totalContainer}>

                        <View style={styles.balance}>
                            <Text style={styles.pesosTitle}> Pesos </Text>
                            <Text style={styles.pesosValue}>$ {balancP}</Text>
                        </View>

                        <View style={styles.balance}>
                            <Text style={styles.dollarsTitle}> Dólares </Text>
                            <Text style={styles.dollarsValue}>USD {balancD}</Text>
                        </View>

                    </View>
                </View>

                <View style={styles.main}>

                    <Text style={styles.from}> Selecciona desde dónde quieres transferir</Text>

                    <View style={styles.formContainer}>

                        <Formik
                            initialValues={{
                                ammount: '',
                                type: '',
                            }}

                            onSubmit={(values, action) => {
                                action.resetForm();
                                dispatch(createUser(values, () => navigation.navigate('CodeVerification')));
                            }}
                        >
                            <View style={styles.main}>

                                <View style={styles.summary}>
                                    <TouchableOpacity onPress={() => setShowModal(true)}>
                                        <View style={styles.modalshut}>
                                            <Text style={{ textAlign: 'center' }}>Desde mi cuenta en {currency.selected}</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <CustomInput
                                        label='Valor'
                                        name='ammount'
                                        keyboardType={'phone-pad'}
                                        style={styles.input}
                                    />

                                    <CustomInput
                                        label='Descripción'
                                        name='description'
                                        style={styles.input}
                                    />

                                    <Text style={styles.description}>Se trasferirán x valor/moneda a tu contacto x</Text>
                                    <Text style={styles.foot}>Presiona enviar para finalizar la transacción</Text>
                                </View>
                                <Button
                                    mode="contained"
                                    secureTextEntry={true}
                                    style={styles.button}
                                //onPress={() => navigation.navigate('FinishSend')}
                                > Enviar
                                </Button>

                            </View>
                        </Formik>

                        <ModalSelector show={showModal} control={setShowModal} setter={setCurrency}/>

                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: theme.colors.primary,
        paddingTop: 40,
        paddingLeft: 15
    },
    rowI: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowII: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 40,
        justifyContent: 'center',
    },
    back: {
        color: 'white',
        alignItems: 'center',
        marginLeft: 5,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 5
    },
    instruction: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        paddingBottom: 15,
    },
    input: {
        height: 40,
        backgroundColor: 'white',
    },
    card: {
        margin: 10,
        borderWidth: .3,
        borderColor: theme.colors.secondary,
        borderRadius: 5
    },
    balaceTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.secondary,
        padding: 14,
    },
    totalContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pesosTitle: {
        textAlign: 'center',
        color: theme.colors.secondary,
        fontWeight: 'bold',
        fontSize: 20,
    },
    pesosValue: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold',
        fontSize: 15,
    },
    dollarsTitle: {
        textAlign: 'center',
        color: theme.colors.secondary,
        fontWeight: 'bold',
        fontSize: 20,
    },
    dollarsValue: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold',
        fontSize: 15,
    },
    balance: {
        paddingBottom: 20
    },
    from: {
        color: theme.colors.secondary,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 7
    },
    button: {
        marginTop: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
        width: width * .5,
    },
    main: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        width: '80%'
    },
    modal: {
        flex: 1,
        backgroundColor: 'red'
    },
    modalContent: {
        marginLeft: width * .05,
        marginRight: width * .05,
        marginTop: height * .40,
        height: height * .2,
        width: width * .9,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .3,
        borderRadius: 5
    },
    ammountSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    inputAmmount: {
        width: width * .7,
        height: 40,
        backgroundColor: 'white',
    },
    modalshut: {
        marginTop: 5,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        borderWidth: .3,
        borderRadius: 5,
        borderColor: '#669',
    },
    summary: {
        marginTop: 5,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        borderWidth: .3,
        borderRadius: 5,
        borderColor: theme.colors.secondary,
        width: width * .95,
        height: height * .32
    },
    item: {
        backgroundColor: 'transparent', 
        width: width*.9,
        marginTop: 10,
    },
    itemText: {
        fontSize: 20, 
        textAlign: 'center',
        color: theme.colors.secondary,
    },
    description: {
        paddingTop: 20,
        color: theme.colors.secondary,
        textAlign: 'center'
    },
    foot: {
        color: theme.colors.secondary,
        textAlign: 'center'
    }

})




