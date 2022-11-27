import React,{useState,useEffect} from 'react';
import {StyleSheet,View, Text,Image,ScrollView,Button } from 'react-native';
<<<<<<< HEAD
const url= "https://4873-181-164-170-247.sa.ngrok.io";
=======
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
>>>>>>> 003f73fb48c5a3b9a32dd535441dafa96f64d491
const AutoComp = (props) =>
{
    return(
    <View style={styles.auto}>
        <Image source={require('../src/3d-car.png')} style={[{width: 50, height: 50, margin: 5}]}/>
        <Text style={styles.nombre}>{props.nombre + " ("+(props.distancia/1000).toFixed(2)+" km.)"}</Text> 
        <Button stlye={styles.boton} color='#F2D388' title={"Alquilar"} onPress={() => props.navigation.navigate('compra',{id:props.id,idUser:props.iduser})}></Button>
    </View>
    )
}

const Lista = (props) => 
{   
    ////////////
    const [usersData,setUsersData]=useState([])
    const addDistance = (data) =>
    {
            
            for (var i = 0; i<data.length;i++)
            {
                data[i].distance= getDistance({latitude:props.location.coords.latitude,longitude:props.location.coords.longitude},{latitude: data[i].lat, longitude: data[i].long})                
                data.sort((a,b)=>a.distance-b.distance)
                
            }
            setUsersData(data)
    }
    const getData=()=>{
<<<<<<< HEAD
    fetch(url + '/api/autos/')
=======
    fetch('https://4873-181-164-170-247.sa.ngrok.io/api/autos/')
>>>>>>> 003f73fb48c5a3b9a32dd535441dafa96f64d491
        .then(response=>response.json())
        .then(data=>addDistance(data))
        
    }
   
    useEffect(() => {
        getData()
     }, [])
     //////////
  
    return(
    <View style={styles.lista}>
        {usersData.map((elemento,index)=> (<AutoComp key={index} distancia={elemento.distance} nombre={elemento.modelo} id={elemento.id} iduser={props.id} navigation={props.navigation}></AutoComp>))}
    </View>
    )
}
const styles = StyleSheet.create(
    {
        lista:{
            height: '100%',
            width: '100%',

        },
        auto:{
        
            alignItems: 'center',
            justifyContent:'center',
            flexDirection: 'row',
            height: '20%',
            width: '100%',
            borderBottomWidth:2,
            borderColor: '#592438',
            
        },
        nombre:{
            marginHorizontal:5,
            fontSize: 15
        },
        boton:{
            margin:5

        }

        
    }
)
export default Lista