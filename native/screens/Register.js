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

import * as Yup from "yup";

import { useDispatch } from "react-redux";

import { createUser } from "../store/actions/userActions";

const Register = ({ id, name, email, password,passwordConfirmation }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.loginContainer}>
      <Formik
        initialValues={{
          name,
          email,
          password,
          passwordConfirmation
        }}

        onSubmit={async (values, { setSubmitting, resetForm }) => {
          dispatch(createUser(values)).then((response) => {
            resetForm();
            setSubmitting(false);
          });
        }}
      >
        {({ handleChange, handleSubmit, values, handleBlur, errors }) => (
          <View>
            <TextInput
              name="name"
              placeholder="name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              style={styles.textInput}
              value={values.name}
              keyboardType="text"
            />
            {errors.name && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.name}</Text>
            )}
            <TextInput
              name="email"
              placeholder="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={styles.textInput}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
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
              onBlur={handleBlur("passwordConfirmation")}
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
