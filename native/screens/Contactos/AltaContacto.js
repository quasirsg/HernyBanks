import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet,Text } from "react-native";


const AltaContacto = (props) => {
  const inicialState={ 
    name: "", 
    email: "", 
    phone: "" 

  }
  const [state, setState] = useState(inicialState);

  

const handleChangeText = (name, value)=>{
    setState({...state, [name]:value})
}
 
const SaveNewContact = ()=>{
  if(!state.name||!state.email ||!state.phone){
  alert('Por favor complete todos los datos')}
  else{//try
    props.navigation.navigate('SendMonyScreen')
   }
}
   return (
    <ScrollView >
      <View></View>
      <Text >Agregar Contacto</Text>
      <View>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText("name", value)}
          
        />
      </View>
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View>
        <TextInput
          placeholder="Telefono"
          onChangeText={(value) => handleChangeText("phone", value)}
          
        />
      </View>
      <View>
        <Button title="Guardar" onPress={() => SaveNewContact()}></Button>
      </View>
    </ScrollView>
  );
};



export default AltaContacto;
