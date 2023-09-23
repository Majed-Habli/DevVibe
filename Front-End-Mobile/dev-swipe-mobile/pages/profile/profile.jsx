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
                        <View style={styles.container_header}>
                            <Text style={styles.category_header}>Skills</Text> 
                            <View style={styles.model_button}>
                                <Text>Edit</Text>
                                <Image source={require("../../assets/Edit-icon.png")}/>
                            </View>
                        </View>
                        <ScrollView style={styles.scrollable} horizontal={true}>
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
                                <View style={styles.pill}>
                                    <Text style={styles.pill_name}>Html</Text>
                                </View>
                                <View style={styles.pill}>
                                    <Text style={styles.pill_name}>Typescript</Text>
                                </View>
                                <View style={styles.pill}>
                                    <Text style={styles.pill_name}>Html</Text>
                                </View>
                                <View style={styles.pill}>
                                    <Text style={styles.pill_name}>Typescript</Text>
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
                    <View style={styles.bio_container}>
                        <View style={styles.container_header}>
                            <Text style={styles.category_header}>Biography</Text> 
                            <View style={styles.model_button}>
                                <Text>Edit</Text>
                                <Image source={require("../../assets/Edit-icon.png")}/>
                            </View>
                        </View>
                        <View style={styles.pill_container}>
                            <Text style={styles.pill_name}>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
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
        gap: 5
    },
    body_header: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
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
        height: 90,
        // backgroundColor: 'lightblue',
        paddingHorizontal: 15,
    },
    container_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    model_button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollable: {
        flex: 1,
        maxHeight: 40,
    },
    category_header: {
        fontSize: 20,
        fontWeight: '500',
    },
    pill_container: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        flexWrap: 'wrap',
        columnGap: 5,
        backgroundColor: 'yellow',
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
    },
    bio_container: {
        width: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
    }
    });