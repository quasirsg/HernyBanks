import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  Picker,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList
  
} from "react-native";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';

import { useDispatch, useSelector } from "react-redux";

import { completeUserRegister } from "../store/actions/userActions";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import { theme } from "../core/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const AltaUser = ({
  id,
  name,
  lastname,
  dni,
  phone,
  address,
  dob,
  navigation,
}) => {
  const dispatch = useDispatch();
  const stateUser = useSelector((state) => state.userUp);
  console.log("*************userUp***************");
  console.log(stateUser.userUp);
  const userUp = stateUser.userUp;
  const [provinces,setProvinces] =useState([]);
  const [selectedProvince,setSelectedProvinces] =useState(provinces[0]);
  const [localidades,setLocalidades] =useState([]);
  const [selectedLocalidad,setSelectedLocalidad] =useState(localidades[0]);
  //const userId = useSelector(state => state.users[0]._id);

  useEffect(()=>{
    getProvinces();
  },[]);

  useEffect(()=>{
    getLocalidades();
  },[])

  

  let getProvinces=()=>{
    axios.get('https://apis.datos.gob.ar/georef/api/provincias')
    .then(res=>{
      setProvinces(res.data.provincias);
    })
  }

  let getLocalidades=(selectedProvince)=>{
    axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${selectedProvince}&campos=id,nombre&max=5000`)
    .then(res=>{
      setLocalidades(res.data.municipios);
    })
  }

  return (
    <Background>
    <View style={styles.altauser}> 
      <View>
        {1 === 0 ? (
          <View>
            <View>
              <Link to="/RegisterModal">
                <Icon name="angle-left" color="#422C63" size={50} />
              </Link>
            </View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "purple",
                textAlign: "center",
              }}
            >
              <Header>
                Tu código es incorrecto. Vuelve atrás e inténtalo nuevamente.
              </Header>
            </Text>
          </View>
        ) : (
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              dni: "",
              phone: "",
              address: "",
              // dob: "",
              _id: userUp._id,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(4, "Debe tener al menos 4 caracteres")
                .max(50, "Debe tener 50 caracteres o menos")
                .required("Debes completar este campo"),
              lastname: Yup.string()
                .min(4, "Debe tener al menos 4 caracteres")
                .max(50, "Debe tener 50 caracteres o menos")
                .required("Debes completar este campo"),
              dni: Yup.string()
                .min(4, "Debe tener al menos 4 caracteres")
                .max(50, "Debe tener 50 caracteres o menos")
                .required("Debes completar este campo"),
              phone: Yup.string()
                .required("Please Enter your Phone Number")
                .matches(
                  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                  "Phone number is not valid"
                ),
              address: Yup.string()
                .min(6, "Debe tener al menos 6 caracteres")
                .max(50, "Debe tener 50 caracteres o menos")
                .required("Debes completar este campo"),
              // dob: Yup.string()
              //   .min(4, "Debe tener al menos 4 caracteres")
              //   .max(50, "Debe tener 50 caracteres o menos")
              //   .required("Debes completar este campo"),
            })}
            onSubmit={async (values, action) => {
              action.resetForm();
              dispatch(
                completeUserRegister(values, () => navigation.navigate("Login"))
              );
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <View>
                <Text style={styles.header}>Darse de alta</Text>

                <CustomInput
                  label="Nombre"
                  name="name"
                  onChangeText={handleChange("name")}
                  value={values.name}
                  style={styles.input}
                />

                {values.name.length >= 4 && !errors.name && (
                  <Icon name="check" size={40} color="green" />
                )}

                {errors.name && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.name}
                  </Text>
                )}

                {/*  */}
                <CustomInput
                  label="Apellido"
                  name="lastname"
                  onChangeText={handleChange("lastname")}
                  value={values.lastname}
                  style={styles.input}
                />

                {values.lastname.length >= 4 && !errors.lastname && (
                  <Icon name="check" size={40} color="green" />
                )}

                {errors.lastname && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.lastname}
                  </Text>
                )}

                {/*  */}
                <CustomInput
                  label="Documento de identidad"
                  name="dni"
                  onChangeText={handleChange("dni")}
                  value={values.dni}
                  style={styles.input}
                />

                {values.dni.length >= 4 && !errors.dni && (
                  <Icon name="check" size={40} color="green" />
                )}

                {errors.dni && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.dni}
                  </Text>
                )}

                {/*  */}
                <CustomInput
                  label="Dirección"
                  name="address"
                  onChangeText={handleChange("address")}
                  value={values.address}
                  style={styles.input}
                />

                {values.address.length >= 4 && !errors.address && (
                  <Icon name="check" size={40} color="green" />
                )}

                {errors.address && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.address}
                  </Text>
                )}
                {/*  */}
                <CustomInput
                  placeholder="Teléfono"
                  name="phone"
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                  style={styles.input}
                />

                {values.phone.length >= 4 && !errors.phone && (
                  <Icon name="check" size={40} color="green" />
                )}

                {errors.phone && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.phone}
                  </Text>
                )}
                {/*  */}
                {provinces && (
                  <Picker 
                  style={styles.picker}
                  selectedValue={selectedProvince} 
                  onValueChange={(itemValue,itemIndex) => {setSelectedProvinces(itemValue);
                  console.log(selectedProvince);
                  getLocalidades(selectedProvince);
                  }}>
                    {provinces &&
                      provinces.map((province, i) => {
                        return (
                          <Picker.Item
                            key={i}
                            label={province.nombre}
                            value={province.nombre}
                          ></Picker.Item>
                        );
                      })}
                  </Picker>
                )}
                {localidades && (
                  <Picker 
                  style={styles.picker}
                  selectedValue={selectedLocalidad} 
                  onValueChange={(itemValue,itemIndex) => {setSelectedLocalidad(itemValue) 
                  console.log(selectedLocalidad)}}>
                    {localidades &&
                      localidades.map((localidad, i) => {
                        return (
                          <Picker.Item
                            key={i}
                            label={localidad.nombre}
                            value={localidad.nombre}
                          ></Picker.Item>
                        );
                      })}
                  </Picker>
                )}

                {/* <CustomInput
                  placeholder="Fecha de nacimiento"
                  name="dob"
                  onChangeText={handleChange("dob")}
                  value={values.dob}
                  style={styles.input}
                />

                {values.dob.length >= 4 && !errors.phone && (
                  <Icon name="check" size={40} color="green" />
                )}

                {errors.dob && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.dob}
                  </Text>
                )} */}
                {/*  */}

                <Button
                  mode="contained"
                  secureTextEntry={true}
                  title="Register"
                  style={styles.createButton}
                  onPress={handleSubmit}
                >
                  Enviar
                </Button>
              </View>
            )}
          </Formik>
        )}
      </View>
     </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
    //borderColor: 'darkorchid',
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    color: 'darkorchid',
    marginTop: 0
  },
  picker: {
    backgroundColor: 'black',
  },
  altauser: {
    width: vw(60),
		height: vh(100),
		justifyContent: 'space-evenly',
		alignItems: 'stretch',
  },
  button: {
    marginTop: 24,
    borderRadius: 90,
    
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  input: {
    height: 40,
    backgroundColor: "white",
  },
});

export default AltaUser;
