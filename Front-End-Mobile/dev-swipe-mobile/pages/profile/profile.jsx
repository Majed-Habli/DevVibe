import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import SwiperComponent from '../../components/swiper/swiper';
// import {navig}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Profile = () => {

    return(
        <SafeAreaView style={styles.container}>
            {/* <Text>Profile</Text> */}
            <SwiperComponent/>
        </SafeAreaView>
    )
} 

export default Profile;

const styles = StyleSheet.create({
    container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    },
    });