import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Hero = () => {

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
                    <CustomInput label='Email' placeholder='Enter your email'/>
                    <View style={styles.password_container}>
                        <CustomInput label='Password' placeholder='Password'/>
                        <Text style={styles.cto}>Forgot password?</Text>
                    </View>
                </View>
                <View>
                    <CustomButton title='Sign in'/>
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
        width: 230,
        height: 222,
        objectFit: 'fill',
        position: 'absolute',
        top: 0,
        left:0
    },
    logo:{
        // width: 160,
        // height: 55,
        objectFit: 'contain'
    },
    page_body:{
        width: '75%',
        height: windowHeight/1.5,
        marginTop: 60,
        paddingTop: 28,
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
    }
    });