import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

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
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo1-0.png')}
                    />
                </View>
                {/* <Text>hello from hero</Text> */}

            </View>
            

        </SafeAreaView>
    )
} 

export default Hero;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
    },
    background:{
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    background_image:{
        width: '55%',
        height: '25%',
        objectFit: 'fill',
        position: 'absolute',
        top: 0,
        left:0
    },
    logo:{
        width: 160,
        height: 55,
        objectFit: 'contain'
    },
    page_body:{
        width: '75%',
        height: windowHeight/1.5,
        backgroundColor: '#ababab',
        paddingTop: 23,
    },
    logo_container:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    },
    form:{
        
    }
    // button: {
    // backgroundColor: '#007AFF',
    // paddingHorizontal: 16,
    // paddingVertical: 8,
    // borderRadius: 8,
    // },
    // buttonText: {
    // color: '#FFF',
    // fontSize: 18,
    // },
    });