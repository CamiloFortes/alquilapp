import Slider from '@react-native-community/slider';
import { ScrollView,Alert,SafeAreaView, StyleSheet,Platform,  ToastAndroid, StatusBar,TextInput, Button, Text, View, Image,PermissionsAndroid, Pressable, ImageStore} from 'react-native';
import { NavigationContainer, useNavigationState} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './Components/Map.js'
import Lista from './Components/Lista.js'
import React, { useState, PropTypes,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik'
import * as yup from 'yup'
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
import { AppRegistry } from 'react-native';
import CountDown from 'react-native-countdown-component';
import * as ImagePicker from 'expo-image-picker'
import BouncyCheckbox from "react-native-bouncy-checkbox";
AppRegistry.registerComponent('main',() => App);
//Variables aldi
const max = 2022;
const url = "https://4873-181-164-170-247.sa.ngrok.io";
const minday = 11;
const minmonth = 11;
const minyear = 2004;

const yytar= 2022;
const mmtar= 11;
const vencm = new Date(yytar,mmtar);
const cargarAutoSchema= yup.object().shape ({
  modelo: yup
  .string()
  .required('este campo es requerido'),
  baul: yup
  .string()
  .required('este campo es requerido'),
  latitud: yup
  .number()
  .required(),
  longitud: yup
  .number()
  .required(),
  combustible: yup
  .number()
  .required(),
  combustiblemax: yup
  .number()
  .required(),
  patente: yup
  .string()
  .required(),
})
const cargarMultaSchema= yup.object().shape ({
  dni: yup
  .number()
  .required(),
  monto: yup
  .number()
  .required(),
})
const tarjetaSchema= yup.object().shape({
  monto: yup
  .number().required('Indique monto'),
  tarjeta: yup
  .string()
  .min(16, 'debe tener 16 caracteres')
  .max(16, 'debe tener 16 caracteres' )
  .required('indique numero de tarjeta'),
  nombre: yup
  .string()
  .required('nombre requerido'),
  cvv: yup 
  .string()
  .min(3, 'debe tener 3 caracteres')
  .max(3, 'debe tener 3 caracteres' )
  .required('indique numero de tarjeta'),
  vencimiento: yup
  .date()
  .default(new Date(yytar, mmtar))
  .min(vencm,`La fecha debe ser como minimo ${yytar+ '-' +mmtar} `)
  .required('End Date required'),
})

const iniciarSesionSchema = yup.object().shape({

  dni: yup
  .number().required('Dni obligatorio'),
  password: yup
  .string()
  .required('contraseña obligatoria'),
})
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .required('Password is required'),
  dni: yup
  .number().required('dni is required'),
  confirmPassword: yup
  .string()
  .oneOf([yup.ref('password')], 'Passwords do not match')
  .required('Confirm password is required'),
name: yup
.string()
.required('name is required'),
lastname: yup
.string().required('last name is required'),
address: yup
.string()
.required('address is required'),
date: yup
.date()
.default(new Date(minyear,minmonth,minday))
.max(minyear, `La fecha debe ser como maximo ${minyear + '/' +minmonth+'/'+minday }`)
.required('End Date required'),
fechadni: yup
.date()
.default(new Date(max, minmonth,minday))
.min(max, `La fecha debe ser como minimo ${max+ '/' +minmonth+'/'+minday}`)
.required('End Date required'),
fechalic: yup
.date()
.default(new Date(max, minmonth,minday))
.min(max, `La fecha debe ser como minimo ${max+ '/' +minmonth+'/'+minday}`)
.required('End Date required'),
})


const Stack = createNativeStackNavigator();

const TopB = (props) =>
{
  return(
    <View style={styles.topView}>
      <View style={styles.topViewA}>
        <Image source={require('./src/auto.png')} style={[{width: 50, height: 50, margin: 25},styles.titulo]} />
        <Text style={styles.titulo}>Alquilapp</Text>    
      </View>  
      
    </View>    
  );
}
const Top = (props) =>
{
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('usuario', value)
    } catch (e) {
      // saving error
    }
  }
 
  return(
    <View style={styles.topView}>
      <View style={styles.topViewA}>
        <Image source={require('./src/auto.png')} style={[{width: 50, height: 50, margin: 25},styles.titulo]} />
        <Text style={styles.titulo}>Alquilapp</Text>    
      </View>
      <View style={styles.topViewB}>
        <Pressable style={styles.botonesTop} onPress={()=>  props.navigation.navigate('mostrarMonto',{id:props.id})}>
          <Image source={require('./src/profile.png')} style={[{width: 30, height: 30, margin: 5}]} />
        </Pressable>    
        <Pressable style={styles.botonesTop} onPress={() => props.navigation.navigate('billetera',{id:props.id})}>
          <Image source={require('./src/wallet.png')} style={[{width: 30, height: 30, margin: 5}]} />
        </Pressable>
      </View>   
      
    </View>    
  );
}
const Middle = (props) =>
{
  return(
    <View style={styles.middle}>
    <Map navigation={props.navigation} location={props.location} id={props.id}></Map>
    </View>    
  );
}
const Bottom = (props) =>
{
  return(
    <View style={styles.bottom}>
    <Lista id={props.id} navigation={props.navigation} location={props.location}></Lista> 
    </View>    
  );
}
const AdmCoches = ({navigation}) =>
{  
  return(
    <View style={{height:'100%'}}>
        <View style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
          <Button title='Agregar Auto' color = "#F2D388" onPress={() =>navigation.navigate('cargarcoche')}></Button>
        </View>
           
        <View style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
          <Button title='Eliminar Auto' color = "#F2D388" onPress={()=>{}}></Button>
        </View>  
        <View style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
        <Button title='Volver' color = "#F2D388" onPress={()=>{}}></Button>
        </View>         
    </View>
  )
}
const AdmSupervisores = ({navigation}) =>
{  
  return(
    <View style={{height:'100%'}}>
        <View style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
          <Button title='Registrar Supervisor' color = "#F2D388" onPress={()=>{}}></Button>
        </View>
           
        <View style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
          <Button title='Eliminar Supervisor' color = "#F2D388" onPress={()=>{}}></Button>
        </View>  
        <View style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
        <Button title='Volver' color = "#F2D388" onPress={()=>{}}></Button>
        </View>         
    </View>
  )
}
const MenuAdministrador = ({navigation}) =>
{  
  return(
    <View style={{height:'100%'}}>
        <View style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
          <Button title='Administrar Autos' color = "#F2D388" onPress={() =>navigation.navigate('administrarautos')}></Button>
        </View>
           
        <View style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
          <Button title='Administrar Supervisores' color = "#F2D388" onPress={() =>navigation.navigate('administrarsupervisores')}></Button>
        </View>  
        <View style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
        <Button title='' color = "#F2D388" onPress={()=>{}}></Button>
        </View>         
    </View>
  )
}
const MenuPrincipal = ({route, navigation }) =>
{
  const {id} = route.params
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  if (location != null)
  {
    return(
      <View>
          <Top  navigation={navigation} id={id}/>   
          <Middle location={location} id={id} navigation={navigation}/>               
          <Bottom location={location} id={id} navigation={navigation}/>        
      </View>
    )
  }
  else
  {
    <View>
          <Top navigation={navigation} id={id}/> 
    </View>   
  }
  
}
const ConfigurarUsuario = ({navigation}) =>
{    
  return(
    <View>
        <Text>A VER SI AHORA FUNCIONAN LOS CAMBIOS</Text>
        <Text>testing cosas</Text> 
        <Text>Partido comunista</Text>
        <Text>Conf usuario </Text> 
        <Text>Probando cambios </Text>  
        <Text>Hola bb </Text>  
        <Text>Salu2 Aldi </Text>                              
    </View>
  )
}
const MostrarMonto = ({route,navigation}) =>
{
  const {adv,idUser} = route.params
  
  const {id} = route.params
  const [usuario,setUsuario]=useState([])
  const getDataUser=()=>{
    
  fetch(url + '/api/usuarios/'+id+'/')
      .then(response=>response.json())
      .then(data=>setUsuario(data))    
  }
  useEffect(() => {
    getDataUser()
  }, []);
 
    
  


return (
  
<View style={styles.monto}>
  <Text style={{fontSize:45, marginBottom:'20%'}}> {"Saldo: $"+usuario.saldo} </Text>
<Button color = "#F2D388" title='cerrar sesion' onPress={() => navigation.navigate('sinloguear') }></Button>
</View>
)
}

const IniciarSesion = ({navigation}) =>

{ 
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('usuario', )
      } catch (e) {
        // saving error
      }
    }
    const [usuarios,setUsuarios]=useState([])
    const validarUsuario = (data,values) => {
      var b = false
      for(var i=0; i<data.length;i++)
      {
        if (data[i].dni == values.dni)
        {
          b=true
          if (data[i].password == values.password)
          {
            storeData(data[i].id.toString)
            if (data[i].modo == 0)
            {
            navigation.navigate('menu',{id:data[i].id})
            }
            else
            {
              if (data[i].modo == 1)
            {
              navigation.navigate('menuAdmin',{id:data[i].id})
            }
            else
            {
              navigation.navigate('menuAdmin',{id:data[i].id})
            }
          }
          }
          else
          {
            setUsuarios('Contraseña Incorrecta')
          }
        }
      }
      if (!b)
      {
        setUsuarios('Usuario no encontrado')
      }


    }
    
    const getDataB=(values)=>{    
    
      fetch(url + '/api/usuarios/')
        .then(response=>response.json())
        .then(data=>validarUsuario(data,values)) 
          
    } 
  
  return (
    <View style={styles.scroll}>
      <TopB navigation={navigation}/>
      <View style={styles.loginContainer}>
          <Text style={{fontSize:25}}>Iniciar Sesión</Text>
          <Formik
   validationSchema={iniciarSesionSchema}
   initialValues={{ dni: '',password: '',}}
   onSubmit={ values => 
      getDataB(values)
   }
    
    
 >
   {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
   }) => (
     <>
     
     <TextInput
         name="dni"
         placeholder="dni"
         style={styles.textInput}
         onChangeText={handleChange('dni')}
         onBlur={handleBlur('dni')}
         value={values.dni}
         keyboardType="numeric"
       />
       {errors.dni &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.dni}</Text>
       }
       <TextInput
         name="password"
         placeholder="Password"
         style={styles.textInput}
         onChangeText={handleChange('password')}
         onBlur={handleBlur('password')}
         value={values.password}
         secureTextEntry
       />
       <Text>{usuarios}</Text>
       {errors.password&&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
       }
   
       <Button
         onPress={handleSubmit}
         color = "#F2D388"
         title="Iniciar"
         disabled={!isValid}
       />
     </>
   )}
 </Formik>
        </View>
    </View>
    
  )

}
const Registrar = ({navigation}) =>
{ 
  const [error,setError]=useState([])
  const [usuarios,setUsuarios]=useState([])
  const manageData = (data,values) =>
  {

    var b =false;    
    
   
    for (var i = 0; i<data.length;i++)
    {
      if (data[i].dni == values.dni)
      {
        b=true
        setError('Dni ya esta registrado')
      }
    }

    if(!b)
    {
      fetch(url + '/api/usuarios/', 
      {
        method: 'POST',
        headers: 
        {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify
        ({ 
          nombre: values.name,
          apellido: values.lastname,
          email: values.email,
          dni: values.dni,
          password: values.password,
          fecha_nacimiento: values.date,
          fecha_vencimiento_dni: values.fechadni,
          fecha_vencimiento_licencia: values.fechalic,
          estado: 'Online',
          modo: '0'
        })
      }
      )
      navigation.navigate('sinloguear')
    }
  }
 

  const getData=(values)=>{
  fetch(url + '/api/usuarios/') 
      .then(response=>response.json())
      .then(data=>manageData(data,values))
        
    }
  
  
  return(
    <ScrollView style={styles.scroll}>
      <TopB navigation={navigation}/>
      
      <View style={styles.loginContainer}>
          <Text style={{fontSize:25}}>Registrarse</Text>
          <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ email: '', password: '',dni: '',confirmPassword:'',name: '',lastname:'', address: '', date: '',fechadni:'', fechalic:''}}
              onSubmit={ values => {
                
                getData(values)
                
              
                
              
              }}
 >
   {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
   }) => (
     <>
        <TextInput
         name="dni"
         placeholder="dni"
         style={styles.textInput}
         onChangeText={handleChange('dni')}
         onBlur={handleBlur('dni')}
         value={values.dni}
         keyboardType="numeric"
       />
       {
          errors.dni && <Text style={{ fontSize: 10, color: 'red' }}>{errors.dni}</Text>
       }
       <TextInput
         name="name"
         placeholder="Nombres"
         style={styles.textInput}
         onChangeText={handleChange('name')}
         onBlur={handleBlur('name')}
         value={values.name}         
       />
       {
          errors.name && <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
       }
       <TextInput
         name="lastname"
         placeholder="Apellido"
         style={styles.textInput}
         onChangeText={handleChange('lastname')}
         onBlur={handleBlur('lastname')}
         value={values.lastname}         
       />
       {
        errors.lastname && <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastname}</Text>
       }
       <TextInput
         name="email"
         placeholder="Dirección de correo"
         style={styles.textInput}
         onChangeText={handleChange('email')}
         onBlur={handleBlur('email')}
         value={values.email}
         keyboardType="email-address"
       />
       {
          errors.email && <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
       }
       <TextInput
         name="fecha de nacimiento"
         placeholder="fecha de nacimiento YYYY-MM-DD"
         style={styles.textInput}
         onChangeText={handleChange('date')}
         onBlur={handleBlur('date')}
         value={values.date}
       />
       {
          errors.date && <Text style={{ fontSize: 10, color: 'red' }}>{errors.date}</Text>
       }        
         <TextInput
         name="address"
         placeholder="Direccion"
         style={styles.textInput}
         onChangeText={handleChange('address')}
         onBlur={handleBlur('address')}
         value={values.address}         
       />
       {
          errors.address && <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
       }
       <TextInput
         name="password"
         placeholder="Contraseña"
         style={styles.textInput}
         onChangeText={handleChange('password')}
         onBlur={handleBlur('password')}
         value={values.password}
         secureTextEntry
       />
       {
          errors.password && <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
       }
        <TextInput
         name="Confirm password"
         placeholder="Confirmar Contraseña"
         style={styles.textInput}
         onChangeText={handleChange('confirmPassword')}
         onBlur={handleBlur('confirmPassword')}
         value={values.confirmPassword}
         secureTextEntry
       />
       {
          errors.confirmPassword && <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmPassword}</Text>
       }
       
        <TextInput
         name="fecha de vencimiento de dni"
         placeholder="fecha de vencimiento de dni YYYY-MM-DD"
         style={styles.textInput}
         onChangeText={handleChange('fechadni')}
         onBlur={handleBlur('fechadni')}
         value={values.fechadni}
        />
       {
          errors.fechadni && <Text style={{ fontSize: 10, color: 'red' }}>{errors.fechadni}</Text>
       }
        <TextInput name="fecha de vencimiento de licencia"
         placeholder="fecha de vencimiento de licencia de conducir YYYY-MM-DD"
         style={styles.textInput}
         onChangeText={handleChange('fechalic')}
         onBlur={handleBlur('fechalic')}
         value={values.fechalic}
       />
       {
          errors.fechalic && <Text style={{ fontSize: 10, color: 'red' }}>{errors.fechalic}</Text>
       }
       <Text>{error}</Text>
       <Button
          color="#F2D388"
         onPress={handleSubmit}
         title="REGISTRARSE"
         disabled={!isValid}
       />
     </>
   )}
    
 </Formik>
        </View>
    </ScrollView>
  )
}
const SinLoguear = ({navigation}) =>
{ 
  //LOCATION TEST
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    
      console.debug(location)

    
  }
  return(
    <View style={styles.sinloguear}>
        <View style={styles.sinloguearc}>
          <Image source={require('./src/auto.png')} style={[{width: 60, height: 60, margin: 25},styles.titulo]} />
          <Text style={styles.titulo2}>Alquilapp</Text>
        </View>
        <View style={{padding: '5%', height: '20%'}}>
          <Button onPress={() => navigation.navigate('iniciarsesion')} title="INICIAR SESIÓN" color="#F2D388"></Button>
        </View>
        <View style={{height: '20%'}}>
          <Button onPress={() => navigation.navigate('registrar')} title="REGISTRARSE" color="#F2D388"></Button>  
        </View>
        
              
    </View>
  )
}
const CargarBilletera = ({route, navigation}) =>
{  
  const {id} = route.params
  const [user,setUser]=useState([])
  const getData=()=>{
  fetch(url + '/api/usuarios/'+id+'/') 
      .then(response=>response.json())
      .then(data=>setUser(data))
        
    }
    useEffect(() => {
        getData()
     }, [])

  

  return (
    <View style={styles.scroll}>
      <TopB navigation={navigation}/>
      <View style={styles.loginContainer}>
          <Text style={{fontSize:25}}>Cargar Billetera</Text>
          <Formik
    
    validationSchema={tarjetaSchema}
    initialValues={{ monto: '',tarjeta: '', nombre:'',vencimiento:'',cvv:''}}
    onSubmit={ values => {
      navigation.navigate('advertencia',{adv:'Pago realizado con éxito.',idUser:id})  
      getData()
      fetch(url + '/api/usuarios/'+id+'/', {
      method: 'PATCH',
      body: JSON.stringify({
        saldo: parseInt(user.saldo) + parseInt(values.monto),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      
    }

    )
      .then((response) => response.json())
      .then((json) => console.log(json));
    }}
 >
   {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
   }) => (
     <>
     
     <TextInput
         name="monto"
         placeholder="Monto"
         style={styles.textInput}
         onChangeText={handleChange('monto')}
         onBlur={handleBlur('monto')}
         value={values.monto}
         keyboardType="numeric"
       />
       {
          errors.monto && <Text style={{ fontSize: 10, color: 'red' }}>{errors.monto}</Text>
       }
      <TextInput
         name="tarjeta"
         placeholder="Numero de tarjeta"
         style={styles.textInput}
         onChangeText={handleChange('tarjeta')}
         onBlur={handleBlur('tarjeta')}
         value={values.tarjeta}
         keyboardType="numeric"
       />
        {
          errors.tarjeta && <Text style={{ fontSize: 10, color: 'red' }}>{errors.tarjeta}</Text>
       }
       <TextInput
         name="nombre"
         placeholder="Nombre completo como aparece en la tarjeta"
          style={styles.textInput}
          onChangeText={handleChange('nombre')}
          onBlur={handleBlur('nombre')}
          value={values.nombre}
        />
         {
          errors.nombre && <Text style={{ fontSize: 10, color: 'red' }}>{errors.nombre}</Text>
       }
        <View style={styles.viewwallet}>
        <View style={{width:'50%',justifyContent:"center",alignItems:"center"}}>
        <TextInput
         name="vencimiento"
         placeholder="Vencimiento YYYY-MM"
          style={styles.textInput2}
          onChangeText={handleChange('vencimiento')}
          onBlur={handleBlur('vencimiento')}
          value={values.vencimiento}
          
        />
           {
          errors.vencimiento && <Text style={{ fontSize:10, color: 'red' }}>{errors.vencimiento}</Text>
       }
        </View>
        <View style={{width:'50%',justifyContent:"center",alignItems:"center"}}>
        <TextInput
          name="cvv"
          placeholder="C.V.V."
          style={styles.textInput2}
          onChangeText={handleChange('cvv')}
          onBlur={handleBlur('cvv')}
          value={values.cvv}
          secureTextEntry
        />
         {
          errors.cvv && <Text style={{ fontSize:10, color: 'red' }}>{errors.cvv}</Text>
       }
        </View>
        
        </View>
        
    
        <Button
          color="#F2D388"
          onPress={handleSubmit}
          title="PAGAR"
          disabled={!isValid}
        />
      </>
    )}
  </Formik>
        </View>
    </View>
    
  )
}
const AlquilandoAuto = ({route, navigation}) =>
{
  const [overflow,setOverflow]=useState(false)
  const {id,time,idAuto} = route.params
  useEffect(() => {
  Alert.alert(
    "Advertencia!",
    "Se cobrará un cargo adicional si no se finaliza el servicio dentro del rango de tiempo o si deja el vehículo fuera del casco de la ciudad.",
    [
      { text: "OK" }
    ]
  );
 }, [])
  

  const admservicios = (data) =>
  {
    var b = false
    const hoy = new Date()
    
    for (var i=0;i<data.length;i++)
    {
     // console.log(data[i].usuario +' '+id+' '+data[i].estado)
      if ((data[i].usuario == id) && (data[i].estado==1))
      {

        fetch(url + '/api/servicios/'+data[i].id+'/', {
          method: 'PATCH',
          body: JSON.stringify({
            estado: 0,
            fecha_fin: hoy.toJSON()
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
       getData()
      }

    }
    
    
  }
    const setAuto = (data) =>
    {
      const distancia = getDistance({latitude:-34.92134316756183,longitude:-57.95451348835805},{latitude:data.lat,longitude:data.long})
      if (distancia > 4000)
      {
        Alert.alert(
          "Advertencia!",
          "Usted recibirá una multa por dejar el coche fuera del casco.",
          [
            { text: "OK" ,onPress: () => {
              fetch(url + '/api/usuarios/'+id+'/', {
                method: 'PATCH',
                body: JSON.stringify({
                  saldo: parseInt(usuario.saldo) - 500,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },                
              }          
              )
                .then((response) => response.json())
                .then((json) => console.log(json));

            }}
          ]
        );
        if (overflow)
        {
          Alert.alert(
            "Advertencia!",
            "Usted recibirá una multa por no cumplir el plazo de tiempo.",
            [
              { text: "OK" ,onPress: () => {
                fetch(url + '/api/usuarios/'+id+'/', {
                  method: 'PATCH',
                  body: JSON.stringify({
                    saldo: parseInt(usuario.saldo) - 500,
                  }),
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },                
                }          
                )
                  .then((response) => response.json())
                  .then((json) => console.log(json));
  
              }}
            ]
          );
        }
        navigation.navigate('menu',{id:id})
      }
      else
      {
        Alert.alert(
          "Muchas Gracias!",
          "Viaje finalizado con éxito.",
          [
            { text: "OK",onPress: () => {
               if (overflow)
              {
                Alert.alert(
                  "Advertencia!",
                  "Usted recibirá una multa por no cumplir el plazo de tiempo.",
                  [
                    { text: "OK" ,onPress: () => {
                      fetch(url + '/api/usuarios/'+id+'/', {
                        method: 'PATCH',
                        body: JSON.stringify({
                          saldo: parseInt(usuario.saldo) - 500,
                        }),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },                
                      }          
                      )
                        .then((response) => response.json())
                        .then((json) => console.log(json));
        
                    }}
                  ]
                );
              }
              navigation.navigate('menu',{id:id})
            }}
          ]
        );
      }
    }
    const getData=()=>{
    fetch(url + '/api/autos/'+idAuto+'/')
        .then(response=>response.json())
        .then(data=>setAuto(data))
        
    }
    const [usuario,setUsuario]=useState([])
    const getDataUser=()=>{
    fetch(url + '/api/usuarios/'+id+'/')
        .then(response=>response.json())
        .then(data=>setUsuario(data))
        
    }
    useEffect(() => {
        getDataUser()
     }, [])
  const finalizarServicio = () => 
  {
    fetch(url + '/api/servicios/')
        .then(response=>response.json())
        .then(data=>admservicios(data))
    
  }
  
  return(
      <View style={{ backgroundColor:'#874C62', justifyContent:'center',height:'100%',alignItems:'center'}}>
          
          <CountDown
            until={time}
            onFinish={() => setOverflow(true)}
            onPress={() => alert('hello')}
            size={20}
          />
          
          
          <Button color="#F2D388" title='finalizar servicio' onPress={() => finalizarServicio()}></Button>
      </View>
  )
}
const AlquilarAuto = ({route, navigation}) =>
{
  const {id,idUser} = route.params
  const [error,setError]=useState([])
  const iralmenu = () => navigation.navigate('advertencia',{adv:'Vehiculo alquilado recientemente',idUser:idUser})
  
  const pagar = (a) =>
  {
    
    var currentDateObj = new Date();
    var numberOfMlSeconds = currentDateObj.getTime();
    var addMlSeconds = value * 60 * 60000;
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
   // console.log(newDateObj)
    fetch(url + '/api/servicios/', 
      {
        method: 'POST',
        headers: 
        {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify
        ({
          fecha_fin: newDateObj.toJSON(),
          usuario: usuario.id,
          auto: auto.id,
          costo: a
        })
      }
      )
      fetch(url + '/api/usuarios/'+idUser+'/', {
        method: 'PATCH',
        body: JSON.stringify({
          saldo: parseInt(usuario.saldo) - a,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
     
      if (value == 24 ){
        navigation.navigate('alquilando',{id:idUser,time:15,idAuto:id});
      }  
      else
      {
      navigation.navigate('alquilando',{id:idUser,time:value*3600,idAuto:id});
      }
  }
  const admservicios = (data) =>
  {
    var b = false
    
    for (var i=0;i<data.length;i++)
    {
      
      if ((data[i].auto == id))
      {
        if (data[i].estado==1)
        {
          navigation.navigate('advertencia',{adv:'Auto ya en alquiler.',idUser:idUser})
          b=true
        }

        const fecha = new Date(data[i].fecha_fin)
        const fecha1 = new Date()
        const diffecha= Math.floor((fecha1 - fecha)/(1000))
        console.log(("tipo de dato"+ typeof( diffecha)  ))
        console.log(("diferencia: " +diffecha))
        if ((diffecha < 10800) && (data[i].usuario == idUser))
        {
          b=true
          iralmenu()
          console.log(("entre" ))
        }
      }

    }   
    if (!b) 
    {
    if (usuario.saldo<value*200)
    {
        setError('Saldo insuficiente')
    }
    else
    {
      pagar(value*200)
    }
    
  }
  }
  
    const getDataB=()=>{
    fetch(url + '/api/servicios/')
        .then(response=>response.json())
        .then(data=>admservicios(data))
        
    }
    const [usuario,setUsuario]=useState([])
    const getDataUser=()=>{
    fetch(url + '/api/usuarios/'+idUser+'/')
        .then(response=>response.json())
        .then(data=>setUsuario(data))
        
    }
    useEffect(() => {
        getDataUser()
     }, [])
 
    const [auto,setAuto]=useState([])
    const getData=()=>{
    fetch(url + '/api/autos/'+id+'/')
        .then(response=>response.json())
        .then(data=>setAuto(data))
        
    }
    useEffect(() => {
        getData()
     }, [])

  

  const [value,setValue] = useState(true)
  return(
    <View>
    <Top navigation={navigation} id={id}/>  
    <View style={styles.alquilar}>
      <View style={{height:'20%',justifyContent:'center'}}>
        <Text style={{textAlign:'center',fontSize:60,alignSelf:'center'}}>{auto.modelo}</Text>
      </View>     
         
      <View style={{height:'20%',justifyContent:'center'}} >
        <Slider value={1} minimumTrackTintColor={"#F2D388"} thumbTintColor={"#F2D388"} minimumValue={1} maximumValue={24} step={1} onValueChange={(value) => setValue(value)}/>
        <Text style={{fontSize:20,marginTop:15,alignSelf:'center'}}>Horas: {value} hs. ${value*200}</Text>  
      </View>
      <View style={{height:'20%',justifyContent:'center'}} >
        <Text style={{fontSize:20,alignSelf:'center'}}>Aire: {auto.aire ? 'Si' : 'No'}</Text>  
        <Text style={{fontSize:20,marginTop:15,alignSelf:'center'}}>Baúl: {auto.baul ? 'Si' : 'No'}</Text> 
        <Text style={{fontSize:20,alignSelf:'center'}}>{error}</Text> 
      </View>      
      <View style={{height:'20%',width:'100%', alignself:'center', alignItems:'center',marginBottom:15,justifyContent:'center'}}>
        <Button color="#F2D388" onPress={() =>getDataB()} title="Alquilar"/>
      </View>     
      
    </View>
    </View>
  )
}
const Advertencia = ({route,navigation}) =>
{
  const {adv,idUser} = route.params
  return(
    <View style={{height:'100%',backgroundColor: '#874C62',justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:40, marginBottom:'20%',textAlign:'center'}}>{adv}</Text>
      <Button color = "#F2D388" title='Volver al menú principal' onPress={() => navigation.navigate('menu',{id:idUser})}></Button>


    </View>

  )
}
const PantallaDeCarga = ({ navigation}) =>
{
  const [usuario,setUsuario]=useState([])
  
  const getData = async (value) => {
    try {
      const value = await AsyncStorage.getItem('usuario')
      setUsuario(value)
      if(usuario != null) {
        if (usuario.length == 0) 
        {
          
          navigation.navigate('sinloguear')
        } 
        else
        {
          
          navigation.navigate('menu',{id:value})
        }  
     }
     else
     {
       
     }
      
    } catch (e) {
      
    }
  }
  useEffect(() => {
    getData()
  }, [])
  
    
  return(
    <View style={styles.sinloguear}>
        <View style={styles.sinloguearc}>
          <Image source={require('./src/auto.png')} style={[{width: 60, height: 60, margin: 25},styles.titulo]} />
          <Text style={styles.titulo2}>Alquilapp</Text>
        </View>
        <View style={{padding: '5%', height: '20%'}}>
        </View>
        <View style={{height: '20%'}}>
        </View>              
    </View>

  )
}
const PantallaImagepicker = ({ navigation}) =>
{
  const [image, setImage] = useState(null);
  const [localUri, setUri] = useState('./src/auto.png');
  //var Data={
   // image:image,
    //namefoto: `photo.${namefoto}`,
    //type: `image/${Type}`
  
 //  };  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
    /*   //setType(result.uri.substring(result.uri.lastIndexOf(".") + 1));
      //setImage(result.uri);
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
        // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`; 
      console.log(type)
      // Upload the image using the fetch and FormData APIs
  const formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  formData.append('file', { uri: localUri, name: filename, type });
  return await fetch("https://e0db-181-164-170-247.sa.ngrok.io/api/upload/", {
    method: 'POST',
    body: formData,
    headers: {
      'content-type': 'multipart/form-data',
    },
  
  }
  )
  .then((response) => response.json())
  .then((json) => console.log(json));
 */
  setUri(result.assets[0].uri);
  console.log("URL: " + localUri)
  let filename = localUri.split('/').pop();
    // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`; 
  // Upload the image using the fetch and FormData APIs
const form = new FormData();
form.append("image", localUri);
form.append("name", "juan");

const options = {
method: 'POST',
headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'}
};

options.body = form;
console.log(form)
console.log(options)
fetch("https://e0db-181-164-170-247.sa.ngrok.io/api/upload/", options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
    }
    
  };
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button title="Pick an image from camera roll" onPress={() =>pickImage} />
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    <Image source={{uri: localUri}} style={[{width: 300, height: 160, margin: 25}]} />
  </View>
  )
  }
const CargarCoche = ({route, navigation}) =>
{  
  aire= false
  baul =false
  return (
    <View style={styles.scroll}>
      <TopB navigation={navigation}/>
      <View style={styles.loginContainer}>
          <Text style={{fontSize:25}}>Cargar coche</Text>
          <Formik
    
    validationSchema={cargarAutoSchema}
    initialValues={{ modelo: '',baul: false, latitud:'',longitud:'',combustible:'', combustiblemax: '',aire:false,patente:''}}
    onSubmit={ values => {
      fetch(url + '/api/autos/', {
      method: 'POST',
      headers: 
      {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        patente: values.patente,
        lat: values.latitud,
        long: values.longitud,
        modelo: values.modelo,
        fuel: values.combustible,
        fuelMax: values.combustiblemax,
        aire: values.aire,
        baul: values.baul,
      }),
 
      
    }

    )
      .then((response) => response.json())
      .then((json) => console.log(json));
    }}
 >
   {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
   }) => (
     <>
     <TextInput
         name="patente"
         placeholder="patente"
         style={styles.textInput}
         onChangeText={handleChange('patente')}
         onBlur={handleBlur('patente')}
         value={values.patente}
       />
       {
          errors.patente && <Text style={{ fontSize: 10, color: 'red' }}>{errors.patente}</Text>
       }
     <TextInput
         name="modelo"
         placeholder="modelo"
         style={styles.textInput}
         onChangeText={handleChange('modelo')}
         onBlur={handleBlur('modelo')}
         value={values.modelo}
       />
       {
          errors.modelo && <Text style={{ fontSize: 10, color: 'red' }}>{errors.modelo}</Text>
       }
      
        <TextInput
         name="latitud"
         placeholder="latitud"
          style={styles.textInput}
          onChangeText={handleChange('latitud')}
          onBlur={handleBlur('latitud')}
          value={values.latitud}
          keyboardType="numeric"
        />
        {
          errors.latitud && <Text style={{ fontSize:10, color: 'red' }}>{errors.latitud}</Text>
       }
       
        <TextInput
          name="longitud"
          placeholder="longitud"
          style={styles.textInput}
          onChangeText={handleChange('longitud')}
          onBlur={handleBlur('longitud')}
          value={values.longitud}
          keyboardType="numeric"
        />
         {
          errors.longitud && <Text style={{ fontSize:10, color: 'red' }}>{errors.longitud}</Text>
       }
 
        
        <TextInput
         name="combustiblemax"
         placeholder="combustiblemax"
         style={styles.textInput}
         onChangeText={handleChange('combustiblemax')}
         onBlur={handleBlur('combustiblemax')}
         value={values.combustiblemax}
       />
      {
        errors.combustiblemax  && <Text style={{ fontSize: 10, color: 'red' }}>{errors.combustiblemax}</Text>
      }
        
        <View style={styles.viewwallet}>
        
        <BouncyCheckbox
          size={25}
          fillColor="#F2D388"
          unfillColor="#FFFFFF"
          textStyle={{
            textDecorationLine: "none",
          }}
          iconStyle={{ borderColor: "black" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={() => {
            values.aire = !values.aire
            console.log(values.aire)
          }}
        />
        <Text> Aire acondicionado </Text>
        </View>
        <View style={styles.viewwallet}>        
        <BouncyCheckbox
          size={25}
          fillColor="#F2D388"
          unfillColor="#FFFFFF"
          textStyle={{
            textDecorationLine: "none",
          }}
          iconStyle={{ borderColor: "black" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={() => {
            values.aire = !values.aire
            console.log(values.aire)
          }}
        />
        <Text> Baúl </Text>
        </View>
        
        <Button
          color="#F2D388"
          onPress={handleSubmit}
          title="Cargar"
          disabled={!isValid}
        />
      </>
    )}
  </Formik>
        </View>
    </View>
    
  )
}

const CargarMulta= ({route, navigation}) =>
{
  const manageData = (data,values) =>
  {
    
    for (var i = 0; i<data.length;i++)
    {
    {
      if (data[i].dni == values.dni)
    {
      fetch(url + '/api/usuarios/', 
      {
        method: 'PATCH',
        body: JSON.stringify({
          saldo: parseInt(user.saldo) - parseInt(values.monto),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      )
    }
  }
}
}
  const getData=(values)=>{
  fetch(url + '/api/usuarios/') 
      .then(response=>response.json())
      .then(data=>manageData(data,values))
        
    }
  return(
    
      <View style={styles.loginContainer}>
          <Text style={{fontSize:25}}>Cargar multa</Text>
          <Formik
  
            validationSchema={cargarMultaSchema}
            initialValues={{ dni: '',monto: ''}}
            onSubmit={ values => {
            getData(values)
            }
            }       
          >
   {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
   }) => (
     <>
     <TextInput
         name="dni"
         placeholder="dni"
         style={styles.textInput}
         onChangeText={handleChange('dni')}
         onBlur={handleBlur('dni')}
         value={values.dni}
       />
       {
          errors.dni && <Text style={{ fontSize: 10, color: 'red' }}>{errors.dni}</Text>
       }
     <TextInput
         name="monto"
         placeholder="monto"
         style={styles.textInput}
         onChangeText={handleChange('monto')}
         onBlur={handleBlur('monto')}
         value={values.monto}
       />
        <Button
          color="#F2D388"
          onPress={handleSubmit}
          title="Cargar"
          disabled={!isValid}
        />
      </>
    )}
  </Formik>
        </View>
   
   

  )

}
export default function App() {
  
  return (  
    <NavigationContainer>        
      <Stack.Navigator screenOptions={{headerShown: false}}>
    
        {/*<Stack.Screen name="PantallaImagepicker" component={PantallaImagepicker}></Stack.Screen>*/}
        <Stack.Screen name="pantallacarga" component={PantallaDeCarga}></Stack.Screen>
        <Stack.Screen name="cargarcoche" component={CargarCoche}></Stack.Screen>
        <Stack.Screen name="cargarmulta" component={CargarMulta}></Stack.Screen>
        <Stack.Screen name="menu" component={MenuPrincipal}></Stack.Screen> 
        <Stack.Screen name="administrarautos" component={AdmCoches}></Stack.Screen> 
        <Stack.Screen name="administrarsupervisores" component={AdmSupervisores}></Stack.Screen> 
        <Stack.Screen name="menuAdmin" component={MenuAdministrador}></Stack.Screen> 
        <Stack.Screen name="advertencia" component={Advertencia}></Stack.Screen>
        <Stack.Screen name="sinloguear" component={SinLoguear}></Stack.Screen>                        
        <Stack.Screen name="registrar" component={Registrar}></Stack.Screen> 
        <Stack.Screen name="iniciarsesion" component={IniciarSesion}></Stack.Screen> 
        <Stack.Screen name="mostrarMonto" component={MostrarMonto}></Stack.Screen> 
        <Stack.Screen name="configurar" component={ConfigurarUsuario}></Stack.Screen> 
        <Stack.Screen name="billetera" component={CargarBilletera}></Stack.Screen>        
        <Stack.Screen name="compra" component={AlquilarAuto}></Stack.Screen>
        <Stack.Screen name="alquilando" component={AlquilandoAuto}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>       
  );
}

const styles = StyleSheet.create(
{
  scroll:
  {
    backgroundColor: '#874C62',
    height: '100%'
  },
  monto:
  {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#874C62',
    padding: 10,
    elevation: 10,
    width: '100%',
    height: '100%'
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#874C62',
    padding: 10,
    elevation: 10
  },
  textInput2: {
    height: 40,
    width: '45%',
    margin: 10,
    backgroundColor: '#F2D388',
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: '#F2D388',
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
  },
  map: {
    height: '100%'
  },
//TOP STYLES
  botonesTop: {    
    fontSize: 30,
    margin: 5    
  },
  topView: {
    flexDirection: 'row',
    backgroundColor: '#F2D388',
    borderStyle:'solid',
    height: '10%'
  },
  topViewA: {
    alignItems: 'center',
    justifyContent: 'flex-start', 
    flexDirection: 'row',
    backgroundColor: '#F2D388',
    borderStyle:'solid',
    paddingHorizontal: 15,
    height: '100%',
    width: '70%'   
    
  },
  topViewB: {
    alignItems: 'center',
    justifyContent: 'flex-end', 
    flexDirection: 'row',       
    backgroundColor: '#F2D388',
    borderStyle:'solid',
    paddingHorizontal: 15,
    height: '100%',
    width: '30%'   
  },
  titulo: {    
    fontSize: 30,
    margin: 5    
  },
  titulo2: {    
    fontSize: 60,
    margin: 5    
  },
  //
  middle: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    backgroundColor: '#C98474',
    borderStyle:'solid',
    height: '45%'
  },
  bottom: {
    
    backgroundColor: '#874C62',
    borderStyle:'solid',
    height: '45%'
  },
  //Alquilar styles
  alquilar:
  {    
    width:'100%',
    height:'100%',
    backgroundColor: '#874C62'
  },
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
  sinloguear:{
    backgroundColor: '#874C62',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center'

  },
  
  sinloguearc: {
    flexDirection: 'row',
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewwallet: {
    flexDirection: 'row',
    borderStyle:'solid',
    
  }
});
