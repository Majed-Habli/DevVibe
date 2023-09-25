import React, { useState,useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, TextInput, ScrollView} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import MatchedCard from '../../components/userCard/matchedCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Matches = () => { 
    const [token, setToken] = useState(''); 
    const [error, setError] = useState(''); 
    const [matches, setMatches] = useState([]);

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
              const response = await axios.get(`https://674b-78-40-183-51.ngrok-free.app/api/user/developer/view_matches`,{
                headers: {
                'Authorization': `Bearer ${token}`
                }}
              );
        
              const data = response.data;
              console.log('matches data', data)
        
                if(data.status == 'success'){
                    setMatches(data.data)
                    console.log("yayy3")
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

    console.log('my matches', matches)
    
    // useEffect(()=>{
    //     console.log('before setting details ',user)
    //     if(user){
    //     if(user.user_type_id == 3){
    //         setDetails({github_url : user.rec_details && user.rec_details.github_url ?user.rec_details.github_url : "",linkedin_url : user.rec_details && user.rec_details.linkedin_url ?user.rec_details.linkedin_url : "",description : user.rec_details && user.rec_details.description ?user.rec_details.description : ""
    //     })
    //     }else{
    //         setDetails({github_url : user.dev_details && user.dev_details.github_url ?user.dev_details.github_url : "",linkedin_url : user.dev_details && user.dev_details.linkedin_url ?user.dev_details.linkedin_url : "",resume : user.dev_details && user.dev_details.resume ?user.dev_details.resume : "",description : user.dev_details && user.dev_details.description ?user.dev_details.description : ""
    //     })
    //     }}
    // },[user]);

    const onChange = (e) => {
        console.log('hey')
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll_view} automaticallyAdjustContentInsets={true} showsVerticalScrollIndicator={false}>

                <View style={styles.searchbar_container}>
                    <View style={styles.searchbar}>
                        <Image
                            style={styles.search_icon}
                            source={require('../../assets/Search.png')}
                        />
                        <TextInput name="{name} "style={styles.searcbar_input} placeholder='{placeholder}' onChange={onChange} defaultValue={"hey there"} />
                    </View>
                </View>
                <View style={styles.page_body}>
                    <View style={styles.header_container}>
                        <Text style={styles.header}>Matches</Text>
                    </View>
                    <View style={styles.cards_container}>
                            {matches ? (matches.map((match)=>(<MatchedCard key={match.id} user={match}/>))):(
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