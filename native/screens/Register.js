import React, { useEffect, useState } from 'react'
import { StyleSheet } from "react-native";
import { View, Text, Form, Item, Label, Input, Picker, Button } from 'native-base'
import * as Font from 'expo-font';
import { useFormik } from 'formik';

function Register() {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    const { values, isSubmitting, setFieldValue, handleSubmit, errors } = useFormik({ //Destructuring de formik
        initialValues: {
          tipoDoc: '', 
          dni: '', 
          name: '',
          lastName: '',          
          email: '',
          phone: '',
          address: '',
         },
         onSubmit: values => {
            //Enviar los valores a la BD
         },
         validate: values => {
             const errors = {};
             if(!values.name || values.name.length < 2) errors.name= "Campo Invalido";
             if(!values.phone || isNaN(values.phone) || values.phone.length < 8) { errors.phone = 'Must be a number!';
              } errors.phone= "Telefono Invalido";
             if (!values.email) { errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
             return errors;
         },
        });

    useEffect(() => {
        if(!fontsLoaded){
            loadFonts();
        }
    });

    const loadFonts = async () => {
        await Font.loadAsync({
            roboto_light: require("../assets/fonts/Roboto-Light.ttf"),
            roboto_medium: require("../assets/fonts/Roboto-Medium.ttf"),             
        });
        setFontsLoaded(true);
    }

    if (!fontsLoaded) {
        return(<View/>)
        
    }
    return (
        <View>
            <Form>
                <Item>
                    <Label>Tipo de Documento</Label>
                    <Picker onValueChange={value => setFieldValue('country', value)} selectedValue={values.country}>
                        <Picker.Item label="DNI" value="DNI"/>
                        <Picker.Item label="Pasaporte" value="Pasaporte"/>
                    </Picker>
                </Item>
                <Item error={errors.name ? true : false}>
                    <Label>Nombre</Label>
                    <Input value={values.name} onChangeText={text => setFieldValue('name', text)}/>
                    <Text>{errors.name ? errors.name : ''}</Text>
                </Item>
                <Item error={errors.name ? true : false}>
                    <Label>Apellidos</Label>
                    <Input value={values.lastName} onChangeText={text => setFieldValue('firstName', text)}/>
                    <Text>{errors.name ? errors.name : ''}</Text>
                </Item>
                <Item error={errors.email ? true : false}>
                    <Label>Email</Label>
                    <Input value={values.email} onChangeText={text => setFieldValue('email', text)}/>
                    <Text>{errors.email ? errors.email : ''}</Text>
                </Item>
                <Item error={errors.phone ? true : false}>
                    <Label>Phone</Label>
                    <Input value={values.phone} onChangeText={text => setFieldValue('phone', text)}/>
                    <Text>{errors.phone ? errors.phone : ''}</Text>
                </Item>
                <Button onPress={handleSubmit}>
                    <Text>Enviar</Text>
                </Button>
            </Form>
        </View>
    )
}

export default Register;
