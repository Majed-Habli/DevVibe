import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, Button, TextInput, Pressable, ScrollView, KeyboardAvoidingView} from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';
import Message from '../../components/message/message';
import { useNavigation } from '@react-navigation/native';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import { useCollectionData } from "react-firebase-hooks/firestore";

const windowWidth = Dimensions.get('window').width;
// const firestore = firebase.firestore();

const Chat = () => {
    const route = useRoute();
    const navigation = useNavigation();
    // const messagesRef = firestore.collection('messages');
    // const query = messagesRef.orderBy('createdAt').limit(25);
    // const [messages] = useCollectionData(query, {idField: 'id'});

    // const [users, setUsers] = useState([]);
    // const [loggedin, setLoggedin] = useState({});
    let chatId = route.params?.id;
    const [token, setToken] = useState('')

    const goBack = () => {
        navigation.navigate('Matches');
      };
    
    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem("user");
              const user= JSON.parse(value)
                setToken(user.user.token)
            } catch (error) {
              console.log("retrieving data1");
            }
          };
        getData();
    },[]);

    const [messages, setMessages] = useState([
        {
            user:0,
            time:"10:00",
            content: "hey"
        },
        {
            user:1,
            time:"10:50",
            content: "dont talk to me"
        },
        {
            user:0,
            time:"12:00",
            content: "fine"
        },
        {
            user:1,
            time:"12:02",
            content: "bye"
        },
        {
            user:0,
            time:"12:00",
            content: "fine"
        },
        {
            user:1,
            time:"12:02",
            content: "bye"
        },
        {
            user:0,
            time:"12:00",
            content: "fine"
        },
        {
            user:1,
            time:"12:02",
            content: "bye"
        },

        {
            user:0,
            time:"12:00",
            content: "fine"
        },
        {
            user:1,
            time:"12:02",
            content: "bye"
        },
        {
            user:0,
            time:"12:00",
            content: "fine"
        },
        {
            user:1,
            time:"12:02",
            content: "bye"
        },
        {
            user:0,
            time:"12:00",
            content: "fine"
        },
        {
            user:1,
            time:"12:02",
            content: "bye"
        },
        {
            user:0,
            time:"12:00",
            content: "fine"
        },
        {
            user:1,
            time:"12:02",
            content: "bye"
        },
        {
            user:0,
            time:"12:00",
            content: "fine"
        },
        {
            user:1,
            time:"12:02",
            content: "bye"
        },
    ])
    const user = useRef(0);
    const scrollView = useRef();

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

            <ScrollView style={styles.scrollable_area} ref={ref => scrollView.current = ref} onContentChange={()=>{
                scrollView.current.scrollToEnd({animated: true})
            }}> 
                {messages && messages.map((message)=>(
                    <Message key={message.id} time={message.time} isLeft={message.user !== user.current} message={message}/>
                ))}
            </ScrollView>

            <KeyboardAvoidingView>
                <View style={styles.input_field}>
                    <TextInput style={styles.input_area} placeholder='type here...'></TextInput>
                    <Pressable style={styles.button_container}>
                        <Image
                        style={{ width: 28, height: 28, margin: 20 }}
                        source={require("../../assets/Send.png")}
                        />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
} 

export default Chat;

const styles = StyleSheet.create({
    container: {
    flex:1
    },
    page_header: {
        width: windowWidth,
        height: 50,
        marginTop: 50,
        alignItems: 'center',
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderBottomColor: "#c7c7c7",
    },
    header_title: {
        alignItems: "center",
        justifyContent: "flex-start",
    },
    message_list: {
        flex:1,
        backgroundColor: 'red'
    },
    scrollable_area: {
        width: '100%',
        flex:1,
    },
    input_field: {
        width: windowWidth,
        height: 66,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap:10,
        paddingHorizontal: 10,
        backgroundColor: 'white'
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