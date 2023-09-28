import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Register = ({navigation}) => {
    const [user, setUser] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleTextChanges = (text, key) => {
        setNewDetails(prev => {
            return {...prev, [key]: text}
        })
    }

    const handlePasswordChange = (text) => {
        setConfirmPassword(text)
    };

    const onRegister = async () =>{
        // event.preventDefault();

        try {
            if(!email || !password){
                setError('All fields required');
                console.log(error);
            }else{

                const response = await axios.post("https://d79e-78-40-183-51.ngrok-free.app/api/guest/register", {
                        user_name: user.name,
                        email: user.email,
                        password: user.password,
                        country: user.country,
                        user_type_id: user.userType
                    }, {
                        headers: {'Content-Type': 'application/json'}
                    }
                );

                const data = response.data;
                console.log("res", data)
    
                if(data.status == 'success'){

                    try {
                        await AsyncStorage.setItem("user", JSON.stringify(data), (err)=> {
                            if(err){
                                console.log("an error");
                                throw err;
                            }
                            // console.log("success saving");
                            // navigation.navigate('main_navigation')
                        }).catch((err)=> {
                            console.log("error is: " + err);
                        });
                    }catch (error){
                        console.log("didnt save in storage ",error)
                    }

                }else{
                    setError("Email Doesn't exists!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Login failed:", error);
          }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <Image
                    style={styles.background_image}
                    source={require('../../assets/bg-image.png')}
                />
            </View>
            <View style={styles.page_body}>
                <View style={styles.logo_container}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo1-0.png')}
                    />
                </View>
                <View style={styles.form}>

                    <CustomInput label={'Email'} value={email} handleChange={handleTextChange}/>
                        <CustomInput label={'Password'} value={password} handleChange={handlePasswordChange}/>
                        <CustomInput label={'Comfirm Password'} value={password} handleChange={handlePasswordChange}/>
                </View>
                <View style={styles.button_container}>
                    <CustomButton title='Sign up' route='main_navigation' onPress={onRegister}/>
                    <View style={styles.line}></View>
                    <View style={styles.statement}>
                        <Text>
                            <Text style={styles.text_content}>Dont have an account?</Text>
                            <Text style={styles.text_content_span}> Register now</Text>
                        </Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
} 

export default Register;

const styles = StyleSheet.create({
    container: {
    width: windowWidth,
    height: windowHeight,
    marginTop:30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    },
    background:{
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    background_image:{
        width: 190,
        height: 182,
        objectFit: 'fill',
        position: 'absolute',
        top: 0,
        left:0
    },
    logo:{
        objectFit: 'contain'
    },
    page_body:{
        width: '75%',
        height: windowHeight/1.5,
        paddingTop: 20,
        display: 'flex',
        rowGap: 40,
    },
    logo_container:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form:{
        rowGap: 20,
    },
    cto: {
        color: '#FFAA00',
        fontSize: 14
    },
    button_container: {
        rowGap: 30,
        alignItems: 'center'
    },
    line: {
        width: '80%',
        height: 1,
        backgroundColor: 'black'
    },
    statement: {
        width: '100%',
        justifyContent: 'flex-start'
    },
    text_content: {
        fontSize: 14,
    },
    text_content_span: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FCC860',
    }
    });