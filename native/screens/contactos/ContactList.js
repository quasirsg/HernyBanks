import React, { useState, useEffect } from "react";
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
} from "react-native";
import { Link } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { Searchbar } from "react-native-paper";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

//Lista Contactos usuarios de HenryBanks Agregados
//un boton agregar contacto
//Buscador sobre los contactos
//lista de usuarios

// Dimensions
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([
    {
      name: "Carlos",
      email: "carlos@gmail.com",
      cvu: "0001234567891011121311",
      phone: "3011234561",
    },
    {
      name: "Juan",
      email: "juanito@gmail.com",
      cvu: "0001234567891011121312",
      phone: "3011234562",
    },
    {
      name: "Camilo",
      email: "cami@gmail.com",
      cvu: "0001234567891011121313",
      phone: "3011234563",
    },
    {
      name: "Olivert",
      email: "oli@gmail.com",
      cvu: "0001234567891011121314",
      phone: "3011234564",
    },
    {
      name: "Gabriela",
      email: "gabi@gmail.com",
      cvu: "0001234567891011121315",
      phone: "3011234565",
    },
    {
      name: "Sebastian",
      email: "sebas@gmail.com",
      cvu: "0001234567891011121316",
      phone: "3011234566",
    },
    {
      name: "Cecilia",
      email: "ceci@gmail.com",
      cvu: "0001234567891011121317",
      phone: "3011234567",
    },
    {
      name: "Alexis",
      email: "alex@gmail.com",
      cvu: "0001234567891011121318",
      phone: "3011234568",
    },
    {
      name: "Pedro",
      email: "pedro@gmail.com",
      cvu: "0001234567891011121319",
      phone: "3011234569",
    },
    {
      name: "Ana",
      email: "ana@gmail.com",
      cvu: "0001234567891011121311",
      phone: "3011234510",
    },
    {
      name: "Maria",
      email: "maria@gmail.com",
      cvu: "0001234567891011121312",
      phone: "3011234511",
    },
  ]);

  const [results, setResults] = useState([]);

  useEffect(() => {}, []);

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

            <View style={{ alignItems: "flex-start", marginLeft: 0 }}>
              <Text style={styles.text_contactsInfo}>
                {item.name}
              </Text>

              <Text style={styles.text_contactsInfo}>
                {item.email}
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={styles.text_ingresosUltimosMovimientos}>1</Text>
            </View>
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
    // <View>
    //   <Link to="/ContactCard">
    //     <View
    //       style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
    //     >
    //       <View style={styles.circle}>
    //         <Text style={{ color: "white" }}>
    //           {item.name && item.name.charAt(0).toUpperCase()}
    //           {item.email && item.email.charAt(0).toUpperCase()}
    //         </Text>
    //       </View>
    //       <View style={{ flexDirection: "column" }}>

    //         <Text style={{ color: "blue", fontWeight: "bold", fontSize: 16 }}>
    //           {item && item.cvu && item.cvu}
    //         </Text>
    //       </View>
    //     </View>
    //   </Link>
    // </View>
  );

  return (
    <View style={styles.containerPrin}>
      <Image
        source={require("../../assets/background2.png")}
        style={{ position: "absolute" }}
      />
      {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.text_saldoCuenta2}>
                  {" "}
                  {cuenta.type == "Pesos"
                    ? "$ " + cuenta.balance || 0
                    : "u$d " + cuenta.balance || 0}
                </Text>
              </View> */}
      {/* header */}
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
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
                  // onChangeText={(value) => searchContacts(value)}
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

          {/* Container de ULTIMOS MOVIMIENTOS de la cuenta */}
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

                <TouchableOpacity
                  style={{ alignItems: "flex-end", marginTop: 30 }}
                  onPress={() => {
                    alert("Ver mas movimientos");
                  }}
                >
                  <Text style={styles.text_link}>Ver mas movimientos</Text>
                </TouchableOpacity>
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
