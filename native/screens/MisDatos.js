import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { Avatar } from 'react-native-image-avatars'
import { color } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';

var { width, height } = Dimensions.get('window');
export default function MisDatos(props) {

	const dispatch = useDispatch();
    const session = useSelector((state) => state.session.userDetail);
	useEffect(() => {
		
	}, []);
    return (
        <View style={styles.avatar}>
        {/* Imagen de fondo */}
			<Image source={require('../assets/background2.png')} style={{ position: 'absolute' }} />
            {session.image ? <Image source={session.image} style={{ height: 50, width: 50 }}></Image> : <Ionicons color='indigo'  style={{ left:10 }} onPress={() => props.navigation.navigate('MisDatos')}><Avatar
						imageUrl = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
						size="medium"
						borderColor = "#f2f2f2"
						shadow
						/></Ionicons>}  
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
