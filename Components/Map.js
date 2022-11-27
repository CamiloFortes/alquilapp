import React, { useState, PropTypes,useEffect } from 'react';
import {StyleSheet, Icon,Image,Text,View } from 'react-native';
import MapView from 'react-native-maps';
import Autos from '../Objetos/database.js'
import GeoLocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';


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
  const [usersData,setUsersData]=useState([])
    const getData=()=>{
    fetch('https://4873-181-164-170-247.sa.ngrok.io/api/autos/')
        .then(response=>response.json())
        .then(data=>setUsersData(data))
        
    }
    useEffect(() => {
        getData()
     }, [])
  
    
 
    
    
    return(      
        
        <MapView style={styles.mapa} region={{
            latitude: props.location.coords.latitude,
            longitude: props.location.coords.longitude,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}>
        <MapView.Marker coordinate={{latitude: props.location.coords.latitude, longitude: props.location.coords.longitude}}><Image source={require('../src/person.png')} style={{width: 26, height: 28}} resizeMode="contain"/></MapView.Marker> 
        {            
        usersData.map((elemento,index)=> (<Marcador key={index} lat={elemento.lat} long={elemento.long} navigation={props.navigation} ></Marcador>))
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