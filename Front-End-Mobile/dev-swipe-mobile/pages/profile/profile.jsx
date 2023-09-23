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
                                <Image style={styles.icons} source={require("../../assets/Send.png")}/>
                            </View>
                            <View style={styles.image_button}>
                                <Image style={styles.icons} source={require("../../assets/Mail.png")}/>
                            </View>
                            <View style={styles.image_button}>
                                <Image style={styles.icons} source={require("../../assets/Github.png")}/>
                            </View>
                            <View style={styles.image_button}>
                                <Image style={styles.icons} source={require("../../assets/LinkedIn.png")}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.skill_container}>
                        <Text style={styles.category_header}>Skills</Text> 
                        <ScrollView style={styles.scrollable} >
                            <View style={styles.pill_container}>
                                <View style={styles.pill}>
                                    <Text style={styles.pill_name}>blender</Text>
                                </View>
                                <View style={styles.pill}>
                                    <Text style={styles.pill_name}>Javascript</Text>
                                </View>
                                <View style={styles.pill}>
                                    <Text style={styles.pill_name}>CSS</Text>
                                </View>
                                <View style={styles.pill}>
                                    <Text style={styles.pill_name}>Html</Text>
                                </View>
                                <View style={styles.pill}>
                                    <Text style={styles.pill_name}>Typescript</Text>
                                </View>
                            </View>
                        </ScrollView>
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
    },
    body_header: {
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 6,
    },
    user_name: {
        fontSize: 28,
        fontWeight: '600'
    },
    user_location: {
        fontSize: 18
    },
    image_group: {
        width: '100%',
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        columnGap: 10
    },
    image_button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#E8E8E8',
    },
    icons: {
        width: 30,
        height: 30,
    },
    skill_container: {
        width: '100%',
        height: 120,
        paddingHorizontal: 15,
    },
    scrollable: {
        flex: 1
    },
    category_header: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10
    },
    pill_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        columnGap: 5,
        gap: 10,
    },
    pill: {
        alignSelf: "flex-start",
        padding: 6,
        borderRadius: 8,
        backgroundColor: '#FCC860',
    },
    pill_name:{
        fontSize: 16,
        fontWeight: '600'
    }
    });