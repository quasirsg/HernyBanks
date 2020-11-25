import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { theme } from "../../core/theme";
import { deleteContact } from "../../store/actions/contactsAction";
// Dimensions
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function ContactCard({ props, route, navigation }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.userDetail);

  if (route.params) {
    console.log("dame los params wacho");
    var user = route.params.item;
  }
  console.log("dame los params wacho");
  useEffect(() => {
    /* getUserById(props.route.params.userId) */
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.title}>{user.email}</Text>
        <Text style={styles.title}>{user.name}</Text>

        <View
          style={{
            marginTop: 4,
          }}
        >
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Button
              title="Borrar contacto"
              color="red"
              onPress={() => {
                console.log(user);
              }}
            ></Button>
            <Text></Text>
            <Button
              title="Transferir Dinero"
              onPress={() => navigation.navigate("FinishSend")}
            ></Button>
          </View>
        </View>
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
    paddingTop: 20,
    fontSize: 30,
    paddingBottom: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 50,
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
    alignItems: "center",
  },
});
