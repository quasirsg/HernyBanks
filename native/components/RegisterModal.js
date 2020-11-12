import React, {useState} from 'react';
import {Button, Text, View, TextInput, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import { Link } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { State } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {userUp} from '../store/actions/userUpActions';
import { theme } from "../core/theme";


// import Modal from 'react-native-modal';

function RegisterModal({userUpP, navigation}) {
  const [isModalVisible, setModalVisible] = useState(true);
  const [modalVal,setMmodalVal] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubmit = () => {
    userUpP(modalVal)
    return navigation.navigate('AltaUSer');
  }

  const handleChangeModal= (name, value) => {
    setMmodalVal(value)
  }

    return (
      <View >
                      <View>
                      <Link to="/Welcome">
                      <Icon name="angle-left" color="#422C63" size={50} /></Link>
                      </View>
      <View style={styles.container}>
        <Modal visible={isModalVisible} animationType={'slide'} >
        <View >
        <Text style={styles.text}>Copia aqui el codigo que enviamos a tu Email!</Text>
        </View>
        <View>
        <TextInput style={styles.textInput}
                placeholder="Code"
                onChangeText={(value) => handleChangeModal("code", value)}
              /></View>
        <View>
        <TouchableOpacity
                title="Validar"
                onPress={handleSubmit}>
        <Text style={styles.textBotton}>VALIDAR</Text>
        </TouchableOpacity>

        </View>
        </Modal>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor:'white'
  },
  text: {
    fontSize: 30,
    fontWeight:'bold',
    color: 'purple',
    textAlign:'center',
  },
  textInput: {
    height: 60,
    borderColor: 'grey',
    borderWidth: 2,
    textAlign:'center',
    borderRadius:10
  },
  textBotton:{
    backgroundColor: 'purple',
    fontSize: 30,
    fontWeight:'bold',
    textAlign:'center',
    color: 'white',
    borderRadius:10
  }

});
const mapStateToProps = state => {
  return {

  }
}



function mapDispatchToProps(dispatch){
  return {
      userUpP: (code) => dispatch(userUp(code)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(RegisterModal)
