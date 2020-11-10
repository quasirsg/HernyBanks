import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { loginUser } from "../store/actions/userActions";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  SafeAreaView,
  ImageBackground,
} from "react-native";


const image = {
  uri:
    "https://cdn.pixabay.com/photo/2016/05/22/20/13/background-1409125_960_720.png",
};

const Login = (userName, email, password) => {
  const dispatch = useDispatch();

  const onSubmit=(values, action)=>{
    action.resetForm();
    dispatch(loginUser(values)) )}

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Formik
            initialValues= {{
            email: "",
            password: "",
            password:""
          }}
          >{({handleChange, handleSubmit, values, errors}) =>{
              <View>
              <Text htmlFor="email">Email Address</Text>
              <TextInput
                placeholder="email"
                name="email"
                type="email"
                onChange={handleChange("email")}
                value={values.email}
              />

              <Text htmlFor="password">Password</Text>
              <TextInput
                 placeholder="password"
                name="password"
                type="text"
                onChange={handleChange("password")}
                value={values.password}
              />

              <Button
                secureTextEntry={true}
                title="Register"
                color="#841584"
                onPress={handleSubmit}
              />
            </View>
          }}
        </Formik>
      </ImageBackground>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D3448",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  button: {
    borderWidth: 0.1,
    alignItems: "center",
    backgroundColor: "purple",
    padding: 50,
    borderRadius: 20,
  },
});
