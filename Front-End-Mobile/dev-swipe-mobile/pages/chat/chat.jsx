import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, TextInput, Pressable, ScrollView, KeyboardAvoidingView} from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';
import Message from '../../components/message/message';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
  
const Chat = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [messages,setMessages] = useState([]);
    const [input,setInput] = useState('');
    const [token, setToken] = useState('')

    const goBack = () => {
        navigation.navigate('Matches');
    };

    const handleTextChanges = (text) => {
        setInput(text)
    }

    const apiURL= 'https://api.openai.com/v1/engines/text-davinci-002/completions';
    const apiKey = '';

    const handleUserInput = async () => {
        setMessages(prev => {
                return [...prev,{ id: 1, content: input }]
            })
        try{
            const userInput = input;
            const response = await axios.post(apiURL,{
                prompt: `You: ${userInput}\nAI:`,
                temperature: 0,
                max_tokens: 20,
                top_p:1.0,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
                stop: ['You:'],
            },{
                headers: {
                    'content-type': 'application/json',
                    'Authorrization': `Bearer ${apiKey}`
                }
            });
            setMessages([ ...messages,{ id: 0, content: response.data.choices[0].text }]);
        }catch(error){
            console.log(error);
        }
            setInput('');
    }
    
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
                {messages && messages.map((message,index)=>(
                    <Message key={index} isLeft={message.user !== user.current} message={message.content}/>
                ))}
            </ScrollView>

            <KeyboardAvoidingView>
                <View style={styles.input_field}>
                    <TextInput style={styles.input_area} placeholder='type here...' onChangeText={handleTextChanges}></TextInput>
                    <Pressable style={styles.button_container} onPress={handleUserInput}>
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