import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, Button} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import CardSwiperComponent from '../../components/swiper/cardSwiper';
import Swiper from '../../components/swiper/cardSwiper';
// import {navig}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Dashboard = () => {

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.dashboard_container}>
                <View style={styles.swiper_container}>
                    <Swiper/>
                </View>
                {/* <View style={styles.swiper_buttons}>
                    <Text>hi</Text>
                </View> */}
            </View>
        </SafeAreaView>
    )
} 

export default Dashboard;

const styles = StyleSheet.create({
    container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    },
    dashboard_container: {
        width: '100%',
        height: '100%',
        // paddingVertical: 30
    },
    swiper_container: {
        height: 530
    },
    swiper_buttons: {
        width: '100%',
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink'
    }
    });