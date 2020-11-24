import React, { useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Formik} from "formik";
import * as Yup from "yup";
import * as Animatable from "react-native-animatable";

import { useDispatch, useSelector } from "react-redux";

import { completeUserRegister } from "../store/actions/userActions";

import Button from "../components/Button";
import CustomInput from "../components/CustomInput";
import { theme } from "../core/theme";
import axios from "axios";

import Spinner from "react-native-loading-spinner-overlay";
const AltaUser = ({
  id,
  name,
  lastname,
  dni,
  phone,
  address,
  dob,
  province,
  city,
  navigation,
}) => {
  const dispatch = useDispatch();
  const stateUser = useSelector((state) => state.userUp);
  console.log("*************userUp***************");
  console.log(stateUser.userUp);
  const userUp = stateUser.userUp;
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity,setSelectedCity] =useState("");
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };


 async function handleProvince  (province){
    var result = await axios
      .get(
        `https://apis.datos.gob.ar/georef/api/provincias?nombre=${province}`
      )
      .then((res) => {
        if (res.data.provincias[0]) {
          if (res.data.provincias[0].nombre) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });

      if(result) setSelectedProvince(province);

      return result
  };

  async function handleCity (city,province){

    console.log("PROVINCIA",province,"CIUDAD",city)
    var result;
    if(!province){
      return false
    }else{
     result = await axios
      .get(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${province}&nombre=${city}`
      )
      .then((res) => {
        //console.log(res.data.localidades)
        if (res.data.localidades[0]) {
          if (res.data.localidades[0].nombre) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    }

    if(result) setSelectedCity(city);

      return result
  };

  async function handleAddress(address) {
   
    var result;
    if(!address){
      return false
    }else{
      var addressWithNoDigits = address.replace(/[0-9]/g, '');
      result = await axios
      .get(
        `https://apis.datos.gob.ar/georef/api/calles?provincia=${selectedProvince}&localidad_censal=${selectedCity}&nombre=${addressWithNoDigits} `
      )
      .then((res) => {
        console.log('res',res.data.calles)
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
    }

    return result;
  }

  return (
    <ScrollView backgroundColor={"white"}>

        <View style={styles.container}>
          <Text style={styles.title}>Darse de alta</Text>
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              phone: "",
              address: "",
              province:"",
              city:"",
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
                  "Domicilio inexistente en esas Localidad",
                  (address) => {
                    return handleAddress(address);
                  }
                ),
                province: Yup.string()
                .min(4, "Debe tener al menos 4 caracteres")
                .max(50, "Debe tener 50 caracteres o menos")
                .required("Debes completar este campo")
                .test(
                  "verifyProvince",
                  "Provincia inexistente en el pais",
                  (province) => {
                    return handleProvince(province);
                  }
                ),
                city: Yup.string()
                .min(4, "Debe tener al menos 4 caracteres")
                .max(50, "Debe tener 50 caracteres o menos")
                .required("Debes completar este campo")
                .test(
                  "verifyCity",
                  "Ciudad inexistente en esa Provincia",
                  (city) => {
                    return handleCity(city,selectedProvince);
                  }
                ),
              // dob: Yup.string()
              //   .min(4, "Debe tener al menos 4 caracteres")
              //   .max(50, "Debe tener 50 caracteres o menos")
              //   .required("Debes completar este campo"),
            })}
            onSubmit={async (values, action) => {
              action.resetForm();
              console.log('VALORES SUBMIT',values)
              startLoading();
              dispatch(
                completeUserRegister(values, () => navigation.navigate("Login"))
              );
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <View style={styles.form_container}>
                <Spinner
                  //visibility of Overlay Loading Spinner
                  visible={loading}
                  //Text with the Spinner
                  textContent={"Loading..."}
                  //Text style of the Spinner Text
                  textStyle={styles.spinnerTextStyle}
                />

                <Animatable.View animation="bounceInUp" delay={500}>
                  <CustomInput
                    label="Nombre"
                    name="name"
                    onChangeText={handleChange("name")}
                    value={values.name}
                    style={styles.input}
                  />
                  {errors.name ? (
                    <Text style={styles.error}>{errors.name}</Text>
                  ) : values.name.length >= 4 ? (
                    <Text style={{ fontSize: 10, color: "green" }}>
                      Correcto
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 10 }}></Text>
                  )}

                  {/*  */}
                  <CustomInput
                    label="Apellido"
                    name="lastname"
                    onChangeText={handleChange("lastname")}
                    value={values.lastname}
                    style={styles.input}
                  />

                  {errors.lastname ? (
                    <Text style={styles.error}>{errors.lastname}</Text>
                  ) : values.lastname.length >= 4 ? (
                    <Text style={{ fontSize: 10, color: "green" }}>
                      Correcto
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 10 }}></Text>
                  )}

                  {/*  */}

                  <CustomInput
                    placeholder="Teléfono"
                    name="phone"
                    onChangeText={handleChange("phone")}
                    value={values.phone}
                    style={styles.input}
                    keyboardType={"phone-pad"}
                  />

                  {errors.phone ? (
                    <Text style={styles.error}>{errors.phone}</Text>
                  ) : values.phone.length >= 4 ? (
                    <Text style={{ fontSize: 10, color: "green" }}>
                      Correcto
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 10 }}></Text>
                  )}
                  {/*  */}


                  <CustomInput
                    placeholder="Provincia"
                    name="province"
                    onChangeText={handleChange("province")}
                    value={values.province}
                    style={styles.input}
                  />

                {errors.province ? (
                  <Text style={styles.error}>{errors.province}</Text>
                ) : values.province.length >= 4 ? (
                  <Text style={{ fontSize: 10, color: "green" }}>
                    Correcto
                  </Text>
                ) : (
                      <Text style={{ fontSize: 10 }}></Text>
                    )}

                    {/*  */}

                <CustomInput
                  placeholder="Ciudad"
                  name="city"
                  onChangeText={handleChange("city")}
                  value={values.city}
                  style={styles.input}
                />

                {errors.city ? (
                  <Text style={styles.error}>{errors.city}</Text>
                ) : values.city.length >= 4 ? (
                  <Text style={{ fontSize: 10, color: "green" }}>
                    Correcto
                  </Text>
                ) : (
                      <Text style={{ fontSize: 10 }}></Text>
                    )}


                    {/*  */}

                 
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

                  {errors.address ? (
                    <Text style={styles.error}>{errors.address}</Text>
                  ) : values.address.length >= 4 ? (
                    <Text style={{ fontSize: 10, color: "green" }}>
                      Correcto
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 10 }}></Text>
                  )}
                  {/*  */}

                  <Button
                    mode="contained"
                    secureTextEntry={true}
                    title="Register"
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    Enviar
                  </Button>
                </Animatable.View>
              </View>
            )}
          </Formik>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    paddingTop: 120,
    fontSize: 30,
    paddingBottom: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  label: {
    color: theme.colors.secondary,
  },
  form_container: {
    width: "70%",
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: theme.colors.primary,
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
  error: {
    fontSize: 10,
    color: "red",
  },
});

export default AltaUser;
