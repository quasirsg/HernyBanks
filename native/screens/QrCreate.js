import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native'

const QrCreate = () => {
    const [state, setState] = useState('http://facebook.github.io/react-native/')
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setState({text: text})}
          value={state}
        />
        <QRCode
          value={state}
          size={200}
          bgColor='purple'
          fgColor='white'/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});


export default QrCreate;
 