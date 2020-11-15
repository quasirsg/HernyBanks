import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; //instalar
import { createStackNavigator } from "@react-navigation/stack"; //instalar
import Register from "./screens/Register";
import { Provider } from "react-redux";
import { st } from "./store/store";
import Estatistics from "./screens/Estatistics";
import Login from "./screens/Login";
import PosConsolidada from "./screens/PosConsolidada";
import Welcome from "./screens/Welcome";
import SendMonyScreen from "./screens/SendMonyScreen";
import Transactions from "./screens/Transactions";
import RegisterModal from "./components/RegisterModal";
import AltaUSer from "./screens/AltaUser";
import FAQ from "./screens/FAQ";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator(); //contiene la navegacion

function MainStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Iniciar sesión" }}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Registrarse" }}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RegisterModal"
        component={RegisterModal}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Estatistics" component={Estatistics} />

      <Stack.Screen
        name="PosConsolidada"
        component={PosConsolidada}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="SendMonyScreen" component={SendMonyScreen} />
      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen name="AltaUSer" component={AltaUSer} />
      <Stack.Screen name="FAQ" component={FAQ} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <Provider store={st}>
      <NavigationContainer style={styles.container}>

        <MainStack />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
