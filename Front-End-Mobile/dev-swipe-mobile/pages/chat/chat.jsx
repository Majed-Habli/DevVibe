import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, Button, TextInput, Pressable} from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Chat = () => {
    const route = useRoute();
    // const [users, setUsers] = useState([]);
    // const [loggedin, setLoggedin] = useState({});
    let chatId = route.params?.id;
    const [token, setToken] = useState('')

    
    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem("user");
              const user= JSON.parse(value)
                setToken(user.user.token)
            } catch (error) {
              // Error retrieving data
              console.log("retrieving data1");
            }
          };
        getData();
    },[]);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.page_header}>
                <Pressable onPress={() => goBack()}>
                    <Image
                        style={{ width: 30, height: 30, margin: 20 }}
                        source={require("../../assets/backArrow.png")}
                    />
                </Pressable>
                <View style={styles.header_title}>
                    <Text style={{fontSize: 20}}>ali's Profile</Text>
                </View>
            </View>

            <View style={styles.body_container}>
                <View style={styles.swiper_container}> 
                {/* messages go here */}
                    {/* {users? <Swiper users={users}/>: (<Text>nothing to see here</Text>)} */}
                </View>
                <View style={styles.input_field}>
                    <TextInput style={styles.input_area} placeholder='type here...'></TextInput>
                    <Pressable style={styles.button_container}>
                        <Image
                        style={{ width: 28, height: 28, margin: 20 }}
                        source={require("../../assets/Send.png")}
                        />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
} 

export default Chat;

const styles = StyleSheet.create({
    container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    // justifyContent: 'center',
    },
    page_header: {
        width: windowWidth,
        height: 50,
        marginTop: 50,
        alignItems: 'center',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: "#c7c7c7",
    },
    header_title: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    body_container: {
        flex:1,
        backgroundColor: 'lightblue'
    },
    input_field: {
        width: windowWidth,
        height: 66,
        backgroundColor:'yellow',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap:10,
        paddingHorizontal: 10
    },
    input_area: {
        height: 45,
        flex: 1,
        paddingLeft: 20,
        backgroundColor: '#EEF1F4',
        borderRadius: 14
    },
    button_container: {
        width: 45,
        height: 45,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        backgroundColor: '#FCC860'
    }
    });