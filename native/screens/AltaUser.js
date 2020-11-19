import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Picker,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

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
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import Spinner from "react-native-loading-spinner-overlay";
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
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(
    departamentos[0]
  );
  const [localidades, setLocalidades] = useState([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState(localidades[0]);

  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  //const userId = useSelector(state => state.users[0]._id);

  useEffect(() => {
    getProvinces();
  }, []);

  const getProvinces = () => {
    axios
      .get(
        "https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&max=30"
      )
      .then((res) => {
        setProvinces(res.data.provincias);
        setSelectedProvince(res.data.provincias[0].nombre);
        getDepartamentos(res.data.provincias[0].nombre);
      });
  };

  const getDepartamentos = (province) => {
    axios
      .get(
        `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${province}&max=1000&orden=nombre`
      )
      .then((res) => {
        setDepartamentos(res.data.departamentos);
        setSelectedDepartamento(res.data.departamentos[0].nombre);
        getLocalidades(province, res.data.departamentos[0].nombre);
      });
  };

  const getLocalidades = (province, departamento) => {
    console.log("DEPARTAMENTO", departamento);
    axios
      .get(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${province}&departamento=${departamento}&max=1000&orden=nombre`
      )
      .then((res) => {
        setLocalidades(res.data.localidades);
        setSelectedLocalidad(res.data.localidades[0].nombre);
      });
  };

  async function handleAddress(add) {
    var result = await axios
      .get(
        `https://apis.datos.gob.ar/georef/api/calles?provincia=${selectedProvince}&departamento=${selectedDepartamento}&localidad_censal=${selectedLocalidad}&nombre=${add} `
      )
      .then((res) => {
        //console.log('res',res)
        if (res.data.calles[0]) {
          if (res.data.calles[0].nombre) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });

    return result;
  }

  return (
    <ScrollView>
      <Background>
        <View style={styles.altauser}>
          <View>
            {Object.keys(userUp).length === 0 ? (
              <View>
                <View>
                  <Link to="/AltaUser">
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
                    Tu código es incorrecto. Vuelve atrás e inténtalo
                    nuevamente.
                  </Header>
                </Text>
              </View>
            ) : (
              <Formik
                initialValues={{
                  name: "",
                  lastname: "",
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
                  phone: Yup.string()
                    .required("Please Enter your Phone Number")
                    .matches(
                      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                      "Phone number is not valid"
                    ),
                  address: Yup.string()
                    .min(6, "Debe tener al menos 6 caracteres")
                    .max(50, "Debe tener 50 caracteres o menos")
                    .required("Debes completar este campo")
                    .test(
                      "verifyAddress",
                      "Domicilio inexistente en esa Provincia, Departamento o localidad",
                      (address) => {
                        return handleAddress(address);
                      }
                    ),
                  // dob: Yup.string()
                  //   .min(4, "Debe tener al menos 4 caracteres")
                  //   .max(50, "Debe tener 50 caracteres o menos")
                  //   .required("Debes completar este campo"),
                })}
                onSubmit={async (values, action) => {
                  action.resetForm();
                  values.address =
                    values.address +
                    ", " +
                    selectedProvince +
                    ", " +
                    selectedDepartamento +
                    ", " +
                    selectedLocalidad;
                  //console.log('VALORES SUBMIT',values)
                  startLoading();
                  dispatch(
                    completeUserRegister(values, () =>
                      navigation.navigate("Login")
                    )
                  );
                }}
              >
                {({ handleChange, handleSubmit, values, errors }) => (
                  <View>
                    <Spinner
                      //visibility of Overlay Loading Spinner
                      visible={loading}
                      //Text with the Spinner
                      textContent={"Loading..."}
                      //Text style of the Spinner Text
                      textStyle={styles.spinnerTextStyle}
                    />
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

                    <Text>Provincias</Text>
                    {provinces && (
                      <Picker
                        style={styles.picker}
                        selectedValue={selectedProvince}
                        onValueChange={(itemValue, itemIndex) => {
                          setSelectedProvince(itemValue);
                          console.log(itemValue);
                          getDepartamentos(itemValue);
                        }}
                      >
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
                    <Text>Departamentos</Text>
                    {departamentos && (
                      <Picker
                        style={styles.picker}
                        selectedValue={selectedDepartamento}
                        onValueChange={(itemValue, itemIndex) => {
                          setSelectedDepartamento(itemValue);
                          getLocalidades(selectedProvince, itemValue);
                        }}
                      >
                        {departamentos &&
                          departamentos.map((departamento, i) => {
                            return (
                              <Picker.Item
                                key={i}
                                label={departamento.nombre}
                                value={departamento.nombre}
                              ></Picker.Item>
                            );
                          })}
                      </Picker>
                    )}
                    <Text>localidades</Text>
                    {localidades && (
                      <Picker
                        style={styles.picker}
                        selectedValue={selectedLocalidad}
                        onValueChange={(itemValue, itemIndex) => {
                          setSelectedLocalidad(itemValue);
                          console.log(selectedLocalidad);
                        }}
                      >
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
    //borderColor: 'darkorchid',
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    color: "darkorchid",
    marginTop: 0,
  },
  /* picker: {
    backgroundColor: 'black',
  }, */
  altauser: {
    width: vw(60),
    height: vh(100),
    justifyContent: "space-evenly",
    alignItems: "stretch",
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
