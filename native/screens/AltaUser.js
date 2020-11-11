import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import { Formik, Form, Field } from "formik";

import { useDispatch } from "react-redux";

import { createUser } from "../store/actions/userActions";

const AltaUser = ({ name,lastname, dni, phone, address,dob }) => {
  const dispatch = useDispatch();

  return (
    <View>
      <Formik
        initialValues={{
          name,
          lastname,
          dni,
          phone,
          address,
          dob,
        }}
        onSubmit={async(values, { setSubmitting, resetForm }) => {
          dispatch(createUser(values)).then((response) => {
            resetForm();
            setSubmitting(false);
          });
        }}
      >
        {({handleChange, handleSubmit, values }) => (
          <View>
            <TextInput
              placeholder="name"
              onChangeText={handleChange("name")}
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              value={values.name}
            />
            <TextInput
              placeholder="lastname"
              onChangeText={handleChange("lastname")}
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              value={values.lastname}
            />

            <TextInput
              placeholder="password"
              onChangeText={handleChange("password")}
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              value={values.password}
            /> 
            <TextInput
            placeholder="Documento de Identindad"
            onChangeText={handleChange("dni")}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            value={values.dni}
          />
           <TextInput
              placeholder="Direccion"
              onChangeText={handleChange("address")}
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              value={values.address}
            />
             <TextInput
              placeholder="Fecha de Nacimiento"
              onChangeText={handleChange("dob")}
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              value={values.dob}
            />
            <Button
              secureTextEntry={true}
              title="Register"
              color="#841584"
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default AltaUser;
