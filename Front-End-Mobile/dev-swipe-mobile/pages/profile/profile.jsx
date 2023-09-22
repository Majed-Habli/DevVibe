import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, ScrollView} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import SwiperComponent from '../../components/swiper/swiper';
// import {navig}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Profile = () => {

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.Scroll_view}>
                <View style={styles.images_container}>
                    <SwiperComponent/>
                </View>
                <View style={styles.profile_body}>
                    <View style={styles.body_header}>
                        <Text style={styles.user_name}>Majed habli</Text>
                        <Text style={styles.user_location}>Saida,Lebanon</Text>
                        <View style={styles.image_group}>
                            <View style={styles.image_button}>
                                <Image style={styles.icons}></Image>
                            </View>
                            <View style={styles.image_button}>
                                <Image style={styles.icons}></Image>
                            </View>
                            <View style={styles.image_button}>
                                <Image style={styles.icons}></Image>
                            </View>
                            <View style={styles.image_button}>
                                <Image style={styles.icons}></Image>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
} 

export default Profile;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    },
    Scroll_view: {
        flex: 1
    },
    images_container: {
        height: 250
    },
    profile_body: {
        height: '100%',
        backgroundColor: 'pink'
    },
    body_header: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        // rowGap: 30,
        backgroundColor: 'lightyellow'
    },
    user_name: {
        fontSize: 28,
    },
    image_group: {
        width: '100%',
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        columnGap: 10
    },
    image_button: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: 'grey'
    }
    });