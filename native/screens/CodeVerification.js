import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { userUp } from "../store/actions/userUpActions";
import Button from "../components/Button";
import { theme } from "../core/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../components/Logo";
import Spinner from "react-native-loading-spinner-overlay";

const SingleNumInput = ({ changed, id }) => {
  return (
    <TextInput
      style={styles.numInput}
      keyboardType={"phone-pad"}
      onChangeText={(value) => changed(value, id)}
    />
  );
};

export default function CodeVerification({ navigation }) {
  const dispatch = useDispatch();
  const [codeIn, setCodeIn] = React.useState({
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
  });

  const handleInputChange = (value, id) => {
    console.log("ID: ", id, "value: ", value);
    setCodeIn({ ...codeIn, [id]: value });
  };

  const verification_code = parseInt(
    codeIn.A + codeIn.B + codeIn.C + codeIn.D + codeIn.E
  );
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {/* <Logo /> */}
        <Text style={styles.title}>Validación de cuenta</Text>

        <Formik
          initialValues={{
            code: "",
          }}
          onSubmit={(values) => {
            const { code } = values;
            startLoading();
            dispatch(
              userUp(verification_code, () => navigation.navigate("AltaUser"))
            );
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.containerII}>
              <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                textContent={"Loading..."}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
              />
              <Text style={styles.instruction}>
                Ingresa el código que hemos enviado a tu correo
              </Text>

              <View style={styles.row}>
                <SingleNumInput changed={handleInputChange} id={"A"} />
                <SingleNumInput changed={handleInputChange} id={"B"} />
                <SingleNumInput changed={handleInputChange} id={"C"} />
                <SingleNumInput changed={handleInputChange} id={"D"} />
                <SingleNumInput changed={handleInputChange} id={"E"} />
              </View>

              <Button
                mode="contained"
                secureTextEntry={true}
                title="Register"
                style={styles.button}
                onPress={handleSubmit}
              >
                Validar
              </Button>

              <View style={styles.row}>
                <Text style={styles.label}>¿No te ha llegado el código? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.link}>Reenviar código</Text>
                </TouchableOpacity>
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
    paddingTop: 230,
    fontSize: 30,
    paddingBottom: 5,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  label: {
    color: theme.colors.secondary,
    textAlign: "center",
    paddingBottom: 10,
  },
  instruction: {
    color: theme.colors.secondary,
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 11,
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: theme.colors.primary,
  },
  row: {
    flexDirection: "row",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  input: {
    height: 40,
    backgroundColor: "white",
  },
  numInput: {
    height: 45,
    width: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
    fontSize: 25,
  },
  containerII: {
    alignItems: "center",
  },
});
