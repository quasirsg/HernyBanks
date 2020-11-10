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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Yup from "yup";

import { useDispatch } from "react-redux";

import { createUser } from "../store/actions/userActions";

import Background from "../components/Background";
import Logo from '../components/Logo';
import Header from '../components/Header';

const Register = ({
  id,
  userName,
  email,
  password,
  passwordConfirmation,
  isValid,
  navigation
}) => {
  const dispatch = useDispatch();

  return (
    <Background>

       <Logo />

      <View style={styles.loginContainer}>
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={Yup.object({
            userName: Yup.string()
              .min(4, "Debe tener al menos 4 caracteres")
              .max(50, "Debe tener 50 caracteres o menos")
              .required("Debes completar este campo"),
            email: Yup.string()
              .email("Introduzca un email valido por favor")
              .required("Debes completar este campo"),
            password: Yup.string()
              .required("Please Enter your password")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
            passwordConfirmation: Yup.string()
              .oneOf([Yup.ref("password"), null], "La contraseña no coincide")
              .required("Password confirm is required"),
          })}
          onSubmit={(values, action) => {
            action.resetForm();
            dispatch(createUser(values));
            navigation.navigate('RegisterModal');
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View>
              <TextInput
                placeholder="userName"
                onChangeText={handleChange("userName")}
                style={styles.textInput}
                value={values.userName}
              />
              {errors.name && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.name}
                </Text>
              )}
              <TextInput
                name="email"
                placeholder="email"
                onChangeText={handleChange("email")}
                style={styles.textInput}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.email}
                </Text>
              )}
              <TextInput
                name="password"
                placeholder="Password"
                onChangeText={handleChange("password")}
                style={styles.textInput}
                value={values.password}
                secureTextEntry={true}
              />
              {errors.password && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              )}
              <TextInput
                name="passwordConfirmation"
                placeholder="Confirm password"
                onChangeText={handleChange("passwordConfirmation")}
                style={styles.textInput}
                value={values.passwordConfirmation}
                secureTextEntry={true}
              />
              {errors.passwordConfirmation && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.passwordConfirmation}
                </Text>
              )}
              <Button
                secureTextEntry={true}
                title="Register"
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});

export default Register;
