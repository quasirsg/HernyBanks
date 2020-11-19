// import React, {useState} from 'react';
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
// import { useDispatch, useSelector } from 'react-redux';
// import { theme } from '../core/theme';
// import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
// import {rechargeByCard} from '../store/actions/acountActions'
// import CustomInput from "../components/CustomInput";



// const Card = ({navigation}) => {
//     const dispatch = useDispatch();
//     const session = useSelector((state) => state.session.userDetail);
//     const accounts = useSelector((state) => state.acoount.account);
//     const account = accounts[0]
//     const cvuV = account && account.cvu
//     const [show, setShow] = useState(false)
//     const [inputText, setInputText] = useState({
//       cvu: "",
//       amount : '',
//     });

//     const onChange = (formData) => {
//         return
//     }
//     const handleChange = (value) => {
//         console.log(value);
//         return setInputText({...inputText, amount:value})
//     }

//     const onFocus = (field) => console.log("focus", field)

//     const handlerSubmit = () => {
//         dispatch(rechargeByCard({...inputText, cvu:cvuV}, ))
//         return
//     }

//     return (
//         <>
//     <View style={styles.container}>
//         <Text style={styles.titleStyle}>Recarga dinero con una tarjeta de credito o debito</Text>
//           <CreditCardInput
//             autoFocus
//             requiresName
//             requiresCVC
//             cardScale={1.5}
//             allowScroll={true}
//             labelStyle={styles.label}
//             inputStyle={styles.input}
//             validColor={"black"}
//             invalidColor={"red"}
//             placeholderColor={"darkgray"}
//             placeholders={{ number: "1234 5678 1234 5678", name: "NOMBRE COMPLETO", expiry: "MM/YY", cvc: "CVC" }}
//             labels={{ number: "NÚMERO TARJETA", expiry: "EXPIRA", name: "NOMBRE COMPLETO", cvc: "CVC" }}
//             onFocus={onFocus}
//             onChange={onChange}
//           />
//                 <CustomInput
//                 label="Cantidad de dinero:"
//                 name="Cantidad"
//                 returnKeyType="done"
//                 onChangeText={(value)=>handleChange(value)}
//                 style={styles.input}
//                 />
//         <TouchableOpacity
//           style={styles.buttonStyle}
//           onPress={handlerSubmit}
//           >
//           <Text style={styles.buttonTextStyle}>
//             Recargar
//           </Text>
//         </TouchableOpacity>
//         </View>

//     </>
//     )
// }

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         justifyContent: 'center',
//         textAlign: 'center',
//         paddingVertical: 100,
//       },
//     label: {
//       color: "black",
//       fontSize: 16,
//     },
//     input: {
//       fontSize: 18,
//       color: "black",
//     },
//     buttonStyle: {
//         backgroundColor: theme.colors.primary,
//         borderWidth: 0,
//         color: '#FFFFFF',
//         borderColor: '#51D8C7',
//         alignItems: 'center',
//         borderRadius: 5,
//         marginTop: 10,
//         marginBottom:100,
//         padding: 10,
//         width:"100%"
//       },
//       buttonTextStyle: {
//         color: '#FFFFFF',
//         paddingVertical: 10,
//         fontSize: 16,
//       },
//       input: {
//         height: 40,
//         backgroundColor: "white",
//         borderColor: "#fff",
//       },
//       textInputStyle: {
//         flexDirection: 'row',
//         height: 40,
//         width:"70%",
//         margin: "auto",
//         justifyContent: 'center',
//         textAlign: 'center',
//       },

//   });

//   export default Card