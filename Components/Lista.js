import React,{useState,useEffect} from 'react';
import {StyleSheet,View, Text,Image,ScrollView,Button } from 'react-native';
const AutoComp = (props) =>
{
    return(
    <View style={styles.auto}>
        <Image source={require('../src/3d-car.png')} style={[{width: 50, height: 50, margin: 5}]}/>
        <Text style={styles.nombre}>{props.nombre}</Text> 
        <Button stlye={styles.boton} color='#F2D388' title={"Alquilar"} onPress={() => props.navigation.navigate('compra',{id:props.id,idUser:props.iduser})}></Button>
    </View>
    )
}

const Lista = (props) => 
{
    const [usersData,setUsersData]=useState([])
    const getData=()=>{
    fetch('https://8173-181-164-169-185.sa.ngrok.io/api/autos/?format=json')
        .then(response=>response.json())
        .then(data=>setUsersData(data))
        
    }
    useEffect(() => {
        getData()
     }, [])

    return(
    <View style={styles.lista}>
        {usersData.map((elemento,index)=> (<AutoComp key={index} nombre={elemento.modelo} id={elemento.id} iduser={props.id} navigation={props.navigation}></AutoComp>))}
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
            fontSize: 20
        },
        boton:{
            margin:5

        }

        
    }
)
export default Lista