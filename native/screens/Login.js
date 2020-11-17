import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { loguinUser } from "../store/actions/jwtUsersActions";
import Button from "../components/Button";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import { theme } from "../core/theme";
import Logo from "../components/Logo";

export default function Login({ id, email, password, isValid, navigation }) {
  const [hidePassword, setHidePassword] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.userDetail);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {/* <Logo /> */}
        <Text style={styles.title}>Iniciar sesión</Text>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Introduzca un email valido por favor")
              .required("Ingresa tu correo"),
            password: Yup.string().required("Ingresa tu contraseña"),
          })}
          onSubmit={(values, action) => {
            let user = { ...values };

            //To lower case (wtf?)
            user.email = user.email.toLowerCase();

            action.resetForm();
            dispatch(
              loguinUser(user.email, user.password, () =>
                navigation.navigate("PosConsolidada")
              )
            );

            // navigation.navigate("RegisterModal");
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              <CustomInput
                label="Correo"
                name="email"
                returnKeyType="next"
                onChangeText={handleChange("email")}
                value={values.email}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                style={styles.input}
              />

              {errors.email ? (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.email}
                </Text>
              ) : (
                  <Text style={{ fontSize: 10 }}></Text>
                )}

              <CustomInput
                label="Contraseña"
                name="password"
                returnKeyType="done"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                style={styles.input}
              />

              {errors.password ? (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              ) : (
                  <Text style={{ fontSize: 10 }}></Text>
                )}

              <Button
                mode="contained"
                secureTextEntry={true}
                title="Register"
                style={styles.button}
                onPress={handleSubmit}
              >
                Ingresar
              </Button>

              <View style={styles.down}>
                <View style={styles.row}>
                  <Text style={styles.label}>¿Aún no tienes una cuenta? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.link}>Regístrate aquí</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.forgotPassword}>
                      ¿Olvidaste tu contraseña?
                  </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    paddingTop: 200,
    fontSize: 30,
    paddingBottom: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  label: {
    color: theme.colors.secondary,
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
    borderColor: "#fff",
  },
  forgotPassword: {
    color: theme.colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 11,
    color: theme.colors.primary,
  },
  down: {
    alignItems: 'center',
  }
});
