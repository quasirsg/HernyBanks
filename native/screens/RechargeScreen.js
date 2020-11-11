import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { View, Text } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { verifySession } from "../store/actions/jwtUsersActions";


export default function RechargeScreen(navigation) {
    const dispatch = useDispatch();
    const session = useSelector((state) => state.session.userDetail);
    useEffect(() => {
        dispatch(verifySession());
      }, []);
    console.log("soy el user logeado",session);
    return (
        <View>
            {session &&(
                <Text>Esta pagina recargara y redirigira a posicion consilidada señor : {session.username}</Text>
            )
            }
            
        </View>
    )
}
