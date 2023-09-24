import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Hero = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleTextChange = (text) => {
        setEmail(text)
    };

    const handlePasswordChange = (text) => {
        setPassword(text)
    };
    
    // console.log(email)
    // console.log(password)
    const goToPage = () => {
        window.location.href = '/register';
    }

    const onLogin = async () =>{
        // event.preventDefault();

        try {
            if(!email || !password){
                setError('All fields required');
                console.log(error);
            }else{

                const response = await axios.post("https://674b-78-40-183-51.ngrok-free.app/api/guest/login", {
                    
                        email: email,
                        password: password
                    }, {
                        headers: {'Content-Type': 'application/json'}
                    }
                );

                const data = response.data;
                // console.log("res", data)
    
                if(data.status == 'success'){
                    const token = data.user.token;
                    const id = data.user.id;
                    const userName = data.user.user_name;
                    const profileImageUrl = data.user.profile_image_url;
                    const user_type = data.user.user_type_id;
                    // console.log("token is ", token)

                    try {
                        await AsyncStorage.setItem("user", JSON.stringify(data), (err)=> {
                            if(err){
                                console.log("an error");
                                throw err;
                            }
                            // console.log("success saving");
                            navigation.navigate('main_navigation')
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
                    {/* <CustomInput name={'email'} label='Email' placeholder='Enter your email' onChange={handleChange} value={inputs.email}/> */}
                    <CustomInput label={'Email'} value={email} handleChange={handleTextChange}/>
                    <View style={styles.password_container}>
                        <CustomInput label={'Password'} value={password} handleChange={handlePasswordChange}/>

                        {/* <CustomInput label='Password' name={'password'} placeholder='Password' onChange={handleChange} value={inputs.password}/> */}
                        <Text style={styles.cto}>Forgot password?</Text>
                    </View>
                </View>
                <View style={styles.button_container}>
                    <CustomButton title='Sign in' route='main_navigation' onPress={onLogin}/>
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

export default Hero;

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
    password_container: {
        rowGap: 10,
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