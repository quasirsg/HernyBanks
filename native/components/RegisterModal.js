import React, {useState} from 'react';
import {Button, Text, View, TextInput, Modal} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {userUp} from '../store/actions/userUpActions'
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

  console.log(modalVal)

    return (
      <View style={{flex: 1, justifyContent:"start"}}>

        <Modal visible={isModalVisible}>
        <Text >Copia el codigo Aqui  que enviamos a tu Email!</Text>
        <TextInput
                placeholder="Code"
                onChangeText={(value) => handleChangeModal("code", value)}
               
              />
        <Button
                title="Validar"
                onPress={handleSubmit}
        />
        </Modal>
      </View>
    );
}

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

