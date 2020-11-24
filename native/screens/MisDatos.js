import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, Platform, Button } from 'react-native'
import { Avatar } from 'react-native-image-avatars'
import { color } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default function MisDatos(props) {

	const dispatch = useDispatch();
    const session = useSelector((state) => state.session.userDetail);
    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const {status}= await ImagePicker.requestCameraPermissionsAsync(Permissions.CAMERA);
          //const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const pickImage = async () => {
        /* let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }); */
    
         let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    return (
        <View style={styles.avatar}>
        {/* Imagen de fondo */}
			<Image source={require('../assets/background2.png')} style={{ position: 'absolute' }} />
            {session.image ? <Image source={session.image} style={{ height: 50, width: 50 }}></Image> : <Ionicons color='indigo'  style={{ left:10 }}><Avatar
						imageUrl = { image }
						size="medium"
						borderColor = "#f2f2f2"
						shadow
						/></Ionicons>} 
                        <View style={styles.upload}>
                            <Text style={styles.plus}><Ionicons name="ios-brush" size={30} onPress={pickImage}></Ionicons></Text>
                        </View> 
                <View style={styles.text}>
                    <Text style={styles.nombre}>{session.name.replace(/\b\w/g, l => l.toUpperCase())} {session.lastname.replace(/\b\w/g, l => l.toUpperCase())}</Text>
                    <Text style={styles.usuario}>@{session.username}</Text>

                </View>  


            <View style={{                
                borderBottomColor: 'black', 
                borderBottomWidth: 2, 
                width:  250,
                marginBottom: 25,
                alignItems:'center'}}>
                <Text style={styles.datos}>Datos Personales</Text>
            </View>
            <View style={styles.divider}>  
                <View>
                 <Text style={styles.datosEntry}>Provincia:  {session.province.replace(/\b\w/g, l => l.toUpperCase())}</Text>
                </View>          

            </View>

            <View style={styles.divider}>
                <Text style={styles.datosEntry}>Ciudad:   {session.city.replace(/\b\w/g, l => l.toUpperCase())}</Text>
            </View>
            <View style={styles.divider}>
                <Text style={styles.datosEntry}>Direccion:   {session.address.replace(/\b\w/g, l => l.toUpperCase())}</Text>
            </View>
            <View style={styles.divider}>  
                <Text style={styles.datosEntry}>Telefono:   {session.phone}</Text>             
            </View>
            <View style={styles.divider}>  
            <Text style={styles.datosEntry}>DNI:   {session.dni}</Text>               
            </View> 
           
               
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {              
        top: 0,        
        alignItems:'center'
    },
    upload: {   
        marginTop: -50,
        borderRadius: 30,
        width:50,
        height:50,
        color: 'red',
        left: 65,
        marginBottom: 3,
        backgroundColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    plus: {
        fontStyle: 'italic',
        marginTop: 10,
        borderRadius: 10,
        color: 'white',
        left: 12,
        marginBottom: -10,

    },
    nombre: {   
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    usuario: {
        color: 'white',
        fontSize: 15,
        fontStyle: 'italic'
    },
    datos: {      
        marginTop: 20,
        color: 'indigo',
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic', 
        alignItems:'center'
    },
    datosEntry: {  
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic', 
        alignItems:'center'
    },
    divider: {
        height:50,
        width:"80%",
        backgroundColor:"white",
        borderRadius:15,
        padding:10,
        elevation:15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5, 
        marginBottom: 10,
        alignItems:'center',
        backgroundColor: 'indigo',
        opacity: 0.8
    }
})
