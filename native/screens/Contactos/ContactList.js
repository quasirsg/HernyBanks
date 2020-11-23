import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { Link } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { Searchbar } from "react-native-paper";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

//Actions
import { getAccount } from "../../store/actions/acountActions";
import { verifySession, logoutUser } from "../../store/actions/jwtUsersActions";
import { getContacts } from "../../store/actions/contactsAction";

// Dimensions
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

//Functions
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
const ContactList = ({ navigation }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.userDetail);
  const accounts = useSelector((state) => state.acoount.account);
  const contacts = useSelector((state) => state.contacts.contacts);
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  //Vars
  const bal = session.balance;
  const id = session._id;
  console.log("renderizando");
  //Hooks functs
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
      dispatch(getContacts(id ? id : null));
    });
  }, [refreshing]);

  //Redux
  useEffect(() => {
    dispatch(getContacts(id ? id : null));
  }, []);
  //Logs
  console.log(session);
  console.log(accounts);
  console.log("soy contactos", contacts);

  //
  const searchContacts = (value) => {
    if (!value) {
      setContacts(contacts);
    } else {
      const filteredContacts = contacts.filter((contact) => {
        let contactLowercase = contact.name.toLowerCase();
        let searchTermLowercase = value.toLowerCase();
        return contactLowercase.indexOf(searchTermLowercase) > -1;
      });
      setResults(filteredContacts);
    }
  };

  const renderItem = ({ item }) => (
    <Animatable.View animation="fadeInUpBig" duration={1800} delay={1000}>
      <View style={{ marginVertical: 10 }}>
        <View>
          {/* fila de ULTIMO MOVIMIENTO */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.text_contactsInfo}>
                {item.name.charAt(0).toUpperCase()}
                {item.email.charAt(0).toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate("ContactCard", {
                  item: item,
                })
              }
            >
              <View style={{ alignItems: "flex-start", marginLeft: 0 }} on>
                <Text style={styles.text_contactsInfo}>{item.name}</Text>

                <Text style={styles.text_contactsInfo}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Separador Horizontal */}
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
          />
        </View>
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.containerPrin}>
      <Image
        source={require("../../assets/background2.png")}
        style={{ position: "absolute" }}
      />

      {/* header */}
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            marginVertical: 0,
            marginTop: 10,
            // backgroundColor: 'blue',
            // paddingVertical: accounts.length > 1 ? 0 : 20, // Pone padding solo si hay mas de una cuenta
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={styles.searchContainer}>
              {/*Buscar en mis contactos */}
              <View>
                <TextInput
                  placeholder="     Ingresa un nombre     "
                  placeholderTextColor="grey"
                  style={styles.textTitle}
                  onChangeText={(value) => searchContacts(value)}
                />
              </View>
            </View>

            {/* agregar contacto */}
            <View>
              <Link to="/SearchBar">
                <Icon name="user-plus" color="black" size={30} />
              </Link>
            </View>
          </View>

          {/* Container de CONTACTOS de la cuenta */}
          <Animatable.View animation="fadeInUpBig" duration={1800} delay={1000}>
            <View style={{ marginVertical: 30 }}>
              <View style={styles.ultimosMovimientosContainer}>
                <Text style={styles.textTitle_ultimosMovimientos}>
                  Mis contactos
                </Text>
                <FlatList
                  data={results.length === 0 ? contacts : results}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={() => (
                    <View>
                      <Text style={styles.items}>
                        No tienes contactos Henry's
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </Animatable.View>
        </View>

        {/* renderizar resultados de busqueda */}
        {/* <View style={styles.flatList}>
            
          </View> */}
      </ScrollView>
    </View>
  );
};
export default ContactList;

const styles = StyleSheet.create({
  containerPrin: {
    backgroundColor: "white",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    height: vh(100),
    width: deviceWidth,
    alignItems: "center",
    paddingTop: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 60,
    justifyContent: "space-between",
    backgroundColor: "indigo",
  },
  saldoContainer: {
    width: 0.9 * deviceWidth,
    // backgroundColor: 'cyan',
    borderRadius: 20,
    // minHeight: 100,
    padding: 0,
    marginBottom: 10,
  },
  balance_horizontalScrollview: {
    paddingVertical: 0,
    // alignItems: 'center',
    // backgroundColor: 'gold',
  },
  searchContainer: {
    width: deviceWidth * 0.8,
    // height: '90%',
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: deviceWidth * 0.05,
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 5 }, // iOS
    shadowOpacity: 0.36, // iOS
    shadowRadius: 6.68, // iOS
    elevation: 11, // Android
  },
  accionesContainer: {
    width: deviceWidth * 0.9,
    marginHorizontal: deviceWidth * 0.05,
  },
  mainActionIconContainer: {
    width: vw(15),
    aspectRatio: 1,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 5 }, // iOS
    shadowOpacity: 0.36, // iOS
    shadowRadius: 6.68, // iOS
    elevation: 11, // Android
  },
  ultimosMovimientosContainer: {
    width: deviceWidth * 0.9,
    marginHorizontal: deviceWidth * 0.05,
    height: "auto",
    backgroundColor: "white",
    borderRadius: 15,
    minHeight: 100,
    padding: 15,
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 5 }, // iOS
    shadowOpacity: 0.36, // iOS
    shadowRadius: 6.68, // iOS
    elevation: 11, // Android
  },
  shopBrandLogosContainer: {
    height: 30,
    width: 30,
    // backgroundColor: 'indigo',
    borderColor: "indigo",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },

  // <-------> Avatar <------->
  avatar: {
    marginRight: vh(7),
  },
  // <-------> Avatar <------->
  // <-------> Text <------->
  text_saldoCuentaTitle: {
    color: "white",
    fontSize: 16,
    // fontWeight: 'bold',
  },
  text_saldoCuenta: {
    color: "white",
    fontSize: 36,
    // fontWeight: 'bold',
  },
  text_saldoCuenta2: {
    color: "rgb(30,30,30)",
    fontSize: 36,
    // fontWeight: 'bold',
  },
  textTitle: {
    color: "rgb(30,30,30)",
    fontSize: 18,
    marginBottom: 5,
  },
  text_ingresosEgresos: {
    color: "black",
    fontSize: 16,
  },
  text_ingresos: {
    color: "darkgreen",
    fontSize: 24,
  },
  text_egresos: {
    color: "firebrick",
    fontSize: 24,
  },
  text_body: {
    color: "rgb(30,30,30)", // Negro
    fontSize: 14,
    lineHeight: 22,
  },
  text_acciones: {
    color: "rgb(30,30,30)", // Negro
    fontSize: 14,
    // lineHeight: 22,
    textAlign: "center",
  },
  text_link: {
    color: "steelblue",
    fontSize: 14,
  },
  textTitle_ultimosMovimientos: {
    color: "rgb(30,30,30)",
    fontSize: 18,
    marginBottom: 12,
  },
  text_contactsInfo: {
    fontSize: 14,
    color: "black",
  },
  text_detailUltimosMovimientos: {
    fontSize: 12,
    color: "darkgrey",
  },
  text_ingresosUltimosMovimientos: {
    color: "darkgreen",
    fontSize: 14,
  },
  text_egresosUltimosMovimientos: {
    color: "firebrick",
    fontSize: 14,
  },
  // <-------> Text <------->
});
