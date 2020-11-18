import React, {useState} from 'react';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const Card = () => {
    const session = useSelector((state) => state.session.userDetail);
    const cvuV = session.cvu
    const [inputText, setInputText] = useState({
        cvu: cvuV,
        monto : '',
        type: 'Tarjeta'
      });

    const onChange = (formData) => {
        console.log(formData)
    }

    const onFocus = (field) => console.log("focus", field)

    return (
        <View style={{ flex: 1, alignItems: 'center', }}>
        <View style={{ width: '100%', height: '30%', marginTop: 60 }}>
          <CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            cardScale={0.9}
            allowScroll={true}
            labelStyle={styles.label}
            inputStyle={styles.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            placeholders={{ number: "1234 5678 1234 5678", name: "NOMBRE COMPLETO", expiry: "MM/YY", cvc: "CVC" }}
            labels={{ number: "NÚMERO TARJETA", expiry: "EXPIRA", name: "NOMBRE COMPLETO", cvc: "CVC/CCV" }}
            onFocus={onFocus}
            onChange={onChange}
          />
        </View>
        <View style={{
          width: 680,
          marginTop: 90,
          marginBottom: 20,
          backgroundColor: '#B71C1C',
          borderRadius: 60
        }}>
          <TouchableOpacity onPress>
            <Text style={{
              textAlign: 'center',
              fontSize: 17,
              color: 'white',
              paddingVertical: 15,
            }}>Asociar Tarjeta</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({

    container: {
      alignItems: 'center',
      marginTop: 60,
    },
    label: {
      color: "black",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
      color: "black",
    },
  });

  export default Card