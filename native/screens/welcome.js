import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
const image = {
  uri:
    "https://cdn.pixabay.com/photo/2016/05/22/20/13/background-1409125_960_720.png",
};

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
		  <Animatable.View animation="bounceInDown" duration={2000}>
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 30,
              color: "#fff",
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onPressLogin}>
                <View style={styles.signInButton}>
                  <Text>INICIAR SESIÓN</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={onPressRegister}>
                <View style={styles.signUpButton}>
                  <Text>REGISTRARSE</Text>
                </View>
              </TouchableOpacity>

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
    alignItems: "center",
    backgroundColor: "#7d00f1",
    padding: 15,
    margin: 10,
    fontSize: 15,
    borderRadius: 30,
    fontWeight: "bold",
  },
  signUpButton: {
    alignItems: "center",
    backgroundColor: "#7f18c3",
    padding: 15,
    margin: 10,
    fontSize: 15,
    borderRadius: 30,
    fontWeight: "bold",
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
