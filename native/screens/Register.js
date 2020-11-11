import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Formik, Form, Field } from "formik";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as Yup from "yup";

import { useDispatch } from "react-redux";

import { createUser } from "../store/actions/userActions";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import { theme } from "../core/theme";

const Register = ({
  id,
  username,
  email,
  password,
  passwordConfirmation,
  isValid,
  navigation,
}) => {
  const dispatch = useDispatch();

  return (
    <Background>
      <Logo />

      <Header>Create Account</Header>

      <View style={styles.loginContainer}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string()
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
            navigation.navigate("RegisterModal");
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View>
              <CustomInput
                label="Username"
                name="username"
                onChangeText={handleChange("username")}
                value={values.userName}
              />
              {errors.name && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.name}
                </Text>
              )}
              <CustomInput
                label="Email"
                name="email"
                returnKeyType="next"
                onChangeText={handleChange("email")}
                value={values.email}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.email}
                </Text>
              )}
              <CustomInput
                label="Password"
                name="password"
                returnKeyType="done"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
              />
              {errors.password && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              )}
              <CustomInput
                label="Confirm Password"
                name="passwordConfirmation"

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
                mode="contained"
                secureTextEntry={true}
                title="Register"
                style={styles.button}
                onPress={handleSubmit}
              >
                Sign Up
              </Button>

              <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default Register;
