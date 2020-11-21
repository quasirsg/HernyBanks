import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { theme } from "../core/theme";
import Button from "../components/Button";
import * as Animatable from "react-native-animatable";
const image = {
  uri:
    "https://cdn.pixabay.com/photo/2016/05/22/20/13/background-1409125_960_720.png",
};

const { width, height } = Dimensions.get("window");

function Welcome({ navigation }) {
  const onPressLogin = () => {
    navigation.navigate("Login");
  };
  const onPressRegister = () => {
    navigation.navigate("Register");
  };
  const onPressFAQ = () => {
    navigation.navigate("FAQ");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.title}>HBank</Text>
        <Animatable.View animation="bounceInDown" duration={1500}>
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 30,
              color: "#fff",
            }}
          >
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                secureTextEntry={true}
                style={styles.button}
                onPress={onPressLogin}
              >
                Iniciar Sesión
              </Button>

              <Button
                mode="contained"
                secureTextEntry={true}
                style={styles.button}
                onPress={onPressRegister}
              >
                Registrarse
              </Button>
              <TouchableOpacity onPress={onPressFAQ}>
                <View>
                  <Text style={styles.help}>¿Necesitas ayuda?</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Text>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D3448",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    backgroundColor: "transparent",
    fontSize: 100,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  signInButton: {
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    width: width * 0.5,
  },
  signUpButton: {
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    width: width * 0.5,
  },
  help: {
    backgroundColor: "transparent",
    fontSize: 20,
    color: "grey",
    marginTop: 50,
    color: "#ffffff",
  },
});
export default Welcome;
