import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Link } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from "../../core/theme";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from "../../components/Button";
import { Formik } from 'formik';
import CustomInput from '../../components/CustomInput';

const { width, height } = Dimensions.get('window');

const SummaryItem = ({ keyName, value }) => {
    return (
        <View style={styles.summary}>
            <Text style={styles.summaryKey}>{keyName}: </Text>
            <Text style={styles.summaryValue}>{value}</Text>
        </View>
    )
}

export default function SelectContact({ navigation }) {

    const [currentBalance, setCurrentBalance] = React.useState({
        pesos: 3000000,
        dollars: 500
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
                            <Text style={styles.pesosValue}>$ {currentBalance.pesos}</Text>
                        </View>

                        <View style={styles.balance}>
                            <Text style={styles.dollarsTitle}> Dólares </Text>
                            <Text style={styles.dollarsValue}>USD {currentBalance.dollars}</Text>
                        </View>

                    </View>
                </View>

                <Text style={styles.from}> Elije desde dónde quieres transferir</Text>

                <View style={{alignItems: 'center'}}>
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
                        <View style={styles.inputContainer}>
                            <CustomInput
                                label='Selección de cuenta'
                                name='username'
                                style={styles.input}
                            />

                            <CustomInput
                                label='Monto'
                                name='ammount'
                                keyboardType={'phone-pad'}
                                style={styles.input}
                            />
                        </View>
                    </Formik>

                    <Button
                        mode="contained"
                        secureTextEntry={true}
                        style={styles.button}
                    //onPress={() => navigation.navigate('FinishSend')}
                    >
                        Enviar
                    </Button>

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
        textAlign: 'center'
    },
    inputContainer: {
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    button: {
        marginTop: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
        width: width * .5,
    },

})




