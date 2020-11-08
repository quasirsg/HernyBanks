import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, SafeAreaView } from 'react-native';
import {connect} from 'react-redux';
import {createUser} from '../store/actions/userActions'


const Register = ({createUSerP, userP}) => {

    console.log(userP)
    const [user, setUser] = useState({
        email: "",
        name: "",
        password: ""
    })

    const handlerInput = (name, value)=>{
        return setUser({...user, [name]: value})
    }

    const handlerSubmit = () => {
        createUSerP(user)
    }

    

        return (
            <>
            <h1>Register</h1>
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                    <View>
                        <TextInput placeholder='name'onChangeText={(value)=> handlerInput('name', value)}/>
                    </View>
                    <View>
                        <TextInput placeholder='email'onChangeText={(value)=> handlerInput('email', value)}/>
                    </View>
                    <View>
                        <TextInput placeholder='password'  onChangeText={(value)=> handlerInput('password', value)}/>
                    </View>
                    <View>
                        <Button secureTextEntry={true} title="Register" color="#841584" onPress={handlerSubmit}/>
                    </View>
                    <View>         
                        {userP.map((x, index) => {
                        return <p key={index}>{x.name}</p>
                        })}
                    </View>
                    
              </ScrollView>
            </SafeAreaView>
            </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });

  function mapStateToProps(state){
    return {
        userP : state.users,
    }
}

function mapDispatchToProps(dispatch){
    return {
       createUSerP : (user) => dispatch(createUser(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);

