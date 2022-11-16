import React from 'react';
import {StyleSheet, Icon,Image } from 'react-native';
import MapView from 'react-native-maps';
import Autos from '../Objetos/database.js'
import GeoLocation from 'react-native-geolocation-service';


const Marcador = (props) =>{
    return(
        <MapView.Marker
        coordinate={{latitude: props.lat, 
        longitude: props.long}}
        
        title={"Auto"}
        onPress={() =>
          props.navigation.navigate('compra')
        }
        description={"Disponible"}
        >
        <Image source={require('../src/auto.png')} style={{width: 26, height: 28}} resizeMode="contain"/>
      </MapView.Marker>    
    )
}


const Map = (props) => {
  
    
 
    
    return(      
        
        <MapView style={styles.mapa} region={{
            latitude: -34.91778356671745,
            longitude: -57.94973707248004,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}>
        {/*
          Geolocation.getCurrentPosition(
            (position) => {
              console.log(position.longitude);
            },
            (error) => {
              reject(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 5,
            },
          )
          */}       
        {        
        Autos.map((elemento)=> (<Marcador lat={elemento.latitud} long={elemento.longitud} navigation={props.navigation} ></Marcador>))
        }
             
        </MapView>
          
              
    );
  };
const styles = StyleSheet.create(
    {

        mapa: {
            height: '100%'
            
          },
    }
)
export default Map;