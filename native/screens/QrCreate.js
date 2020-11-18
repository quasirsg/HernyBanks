// Generation of QR Code in React Native
// https://aboutreact.com/generation-of-qr-code-in-react-native/

// import React in our code
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../core/theme';
import QRCode from 'react-native-qrcode-svg';

const Qrnative = () => {
  const session = useSelector((state) => state.session.userDetail);
  const cvuV = session.cvu
  const [inputText, setInputText] = useState({
    cvu: cvuV,
    monto : '',
    type: 'codigo QR'
  });
  const [qrvalue, setQrvalue] = useState('');


  console.log(inputText);

  return (
  
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          Recarga dinero a tu cuenta desde cualquier punto de todo pago, presentando el codigo.
        </Text>
        <QRCode
          //QR code value
          value={qrvalue ? JSON.stringify(qrvalue)  : 'NA'}
          //size of QR Code
          size={250}
          //Color of the QR Code (Optional)
          color="black"
          //Background Color of the QR Code (Optional)
          backgroundColor="white"
          //Logo of in the center of QR Code (Optional)
            // logo={{
            //   url:
            //     '',
            // }}
          //Center Logo size  (Optional)
          logoSize={30}
          //Center Logo margin (Optional)
          logoMargin={2}
          //Center Logo radius (Optional)
          logoBorderRadius={15}
          //Center Logo background (Optional)
          logoBackgroundColor="yellow"
        /> 
        <Text style={styles.textStyle}>
          Por favor inserta el monto a recargar
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setInputText({...inputText, monto:text})
          }
          placeholder="Enter Any Value"
          value={inputText.monto}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setQrvalue(inputText)}>
          <Text style={styles.buttonTextStyle}>
            Generar codigo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Qrnative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 50,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});