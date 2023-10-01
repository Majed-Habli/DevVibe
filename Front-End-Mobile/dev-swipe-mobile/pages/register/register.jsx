import React, {useState, useMemo} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, ScrollView, Pressable} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioGroup from 'react-native-radio-buttons-group';
import axios from 'react-native-axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Register = ({navigation}) => {
    const [user, setUser] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const [isPressed, setIsPressed] = useState();

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Developer',
            value: '2'
        },
        {
            id: '2',
            label: 'Recruiter',
            value: '3'
        }
    ]), []);

    const handleTextChanges = (text, key) => {
        setUser(prev => {
            return {...prev, [key]: text}
        })
    }

    const handlePasswordChange = (text) => {
        setConfirmPassword(text)
    };

    const goToPage = () => {
        navigation.navigate('Home');
    }

    const onRegister = async () =>{

        try {
            if(!user.email || !user.password || !user.name || !user.country){
                setError('All fields required');
                console.log(error);
            }else{
                if( user.password != confirmPassword){
                    setError('Passwords dont match')
                }else{

                    const response = await axios.post("https://d79e-78-40-183-51.ngrok-free.app/api/guest/register", {
                            user_name: user.name,
                            email: user.email,
                            password: user.password,
                            country: user.country,
                            user_type_id: isPressed
                        }, {
                            headers: {'Content-Type': 'application/json'}
                        }
                    );
    
                    const data = response.data;
        
                    if(data.status == 'success'){
    
                        try {
                            await AsyncStorage.setItem("user", JSON.stringify(data), (err)=> {
                                if(err){
                                    console.log("an error");
                                    throw err;
                                }
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
                <ScrollView style={styles.Scroll_view} showsVerticalScrollIndicator={false}>
                    <View style={styles.logo_container}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/logo1-0.png')}
                        />
                    </View>
                    <View style={styles.form}>
                        <CustomInput label={'Name'} value={user.name} handleChange={(text)=>handleTextChanges(text, 'name')}/>
                        <CustomInput label={'Email'} value={user.email} handleChange={(text)=>handleTextChanges(text, 'email')}/>
                        <CustomInput label={'Country'} value={user.counrty} handleChange={(text)=>handleTextChanges(text, 'country')}/>
                        <CustomInput label={'Password'} value={user.password} handleChange={(text)=>handleTextChanges(text, 'password')}/>
                        <CustomInput label={'Confirm Password'} value={confirmPassword} handleChange={handlePasswordChange}/>
                    </View>
                    <View style={styles.user_type_btns}>
                        <RadioGroup layout='row'
                            radioButtons={radioButtons} 
                            onPress={setIsPressed}
                            selectedId={isPressed}
                        />
                    </View>
                    <View style={styles.button_container}>
                        <CustomButton title='Sign up' route='main_navigation' onPress={onRegister}/>
                        <View style={styles.line}></View>
                        <View style={styles.statement}>
                            <Pressable style={styles.centered} onPress={goToPage}>
                                <Text style={styles.text_content}>Already have an account?</Text>
                                <Text style={styles.text_content_span}> Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
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
        height: windowHeight/1.3,
        paddingTop: 30,
        display: 'flex',
        rowGap: 40,
    },
    Scroll_view: {
        flex: 1,
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
        alignItems: 'center',
        marginTop: 20
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
    },
    centered: {
        flexDirection: 'row'
    },
    user_type_btns: {
        height: 70,
        marginTop: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    btn: {
        paddingVertical:10,
        paddingHorizontal:14,
        borderWidth: 1,
        borderColor: 'black'
    },
    btnText: {
        fontSize: 18
    }
    });