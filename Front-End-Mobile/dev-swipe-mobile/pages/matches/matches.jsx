import React, { useState,useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, TextInput, ScrollView, Pressable} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import MatchedCard from '../../components/userCard/matchedCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';
    
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Matches = () => { 
    const [token, setToken] = useState(''); 
    const [error, setError] = useState(''); 
    const [matches, setMatches] = useState([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    console.log("search value", search)

    const goBack = () => {
        navigation.navigate('Dashboard');
      };

    const handleTextChange = (text) => {
        setSearch(text)
    };

    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem("user");
              const user= JSON.parse(value)
                setToken(user.user.token)
                // setLoggedinID(user.user.id)
            } catch (error) {
              console.log("retrieving data2");
            }
          };
        getData();
    });

    useEffect(()=>{

        const getUserMatches = async () =>{
            try {
              const response = await axios.get(`https://39a3-78-40-183-51.ngrok-free.app/api/user/developer/view_matches`,{
                headers: {
                'Authorization': `Bearer ${token}`
                }}
              );
        
              const data = response.data;
        
                if(data.status == 'success'){
                    setMatches(data.data)
                    console.log("yayy3", data.data)
                }else{
                    setError("no success3!");
                    console.log(error);
                }
              } catch (error) {
                console.error("get users failed3:", error);
              }
        }
        
        if(token != '' ){
            getUserMatches();
        }
    },[token])

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
                    <Text style={{fontSize: 20}}>Matches</Text>
                </View>
            </View>

            <ScrollView style={styles.scroll_view} automaticallyAdjustContentInsets={true} showsVerticalScrollIndicator={false}>

                <View style={styles.searchbar_container}>
                    <View style={styles.searchbar}>
                        <Image
                            style={styles.search_icon}
                            source={require('../../assets/Search.png')}
                        />
                        <TextInput name="{name} "style={styles.searcbar_input} placeholder='search here' onChangeText={handleTextChange} defaultValue={search} />
                    </View>
                </View>
                <View style={styles.page_body}>
                    <View style={styles.header_container}>
                        <Text style={styles.header}>Matches</Text>
                    </View>
                    <View style={styles.cards_container}>
                            {matches ? (matches.map((match, index)=>(<MatchedCard key={match.id} user={match} index={index}/>))):(
                                <Text>No matches yet</Text>
                            )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
} 

export default Matches;

const styles = StyleSheet.create({
    container: {
    width: windowWidth,
    // height: windowHeight,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
    searchbar_container: {
        width: '100%',
        height: 100,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchbar: {
        width: '100%',
        height: 42,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'black',
        alignItems: 'center',
        flexDirection: 'row'
    },
    search_icon: {
        width: 43,
        height: 23,
        objectFit: 'contain'
    },
    searcbar_input: {
        height: '100%',
        width: 255,
        paddingLeft: 20,
    },
    page_body: {
        width: '100%',
        height: windowHeight,
    },
    header_container: {
        width: '100%',
        height: 53,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    header: {
        fontSize: 20,
    },
    cards_container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scroll_view: {
        flex: 1,
    }
    });