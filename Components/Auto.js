import React from 'react';
import {StyleSheet, Icon,Image } from 'react-native';
import MapView from 'react-native-maps';
const Auto = (props) =>{

    return(
        <View style={styles.contenedor}>
            <Image source={require('./src/auto.png')}/>
            <Text>{props.nombre}</Text>
        </View> 
    )
}
const styles = StyleSheet.create(
    {
        contenedor:{
            flexDirection: 'row'
        }
    }
)