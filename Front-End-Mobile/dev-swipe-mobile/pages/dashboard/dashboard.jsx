import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, Button} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import CardSwiperComponent from '../../components/swiper/cardSwiper';
import Swiper from '../../components/swiper/cardSwiper';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

// import {navig}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    // const [loggedin, setLoggedin] = useState({});
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

    useEffect(()=>{
        const getUsers = async () =>{
            try {
              const response = await axios.get("https://674b-78-40-183-51.ngrok-free.app/api/user/developer/display_users",{
                headers: {
                'Authorization': `Bearer ${token}`
                }}
              );
        
              const data = response.data;
              console.log("my response1", data)
        
                if(data.status == 'success'){
                        setUsers(data.compare.data)
                    console.log("yayy1")
                }else{
                    setError("no success1!");
                    console.log(error);
                }
              } catch (error) {
                console.error("get users failed1:", error);
              }
        }

        if(token != ''){
            getUsers();
        }
    },[token])

    console.log(token)
    console.log("the users 1                                              ",users)
  
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.dashboard_container}>
                <View style={styles.swiper_container}>
                    {users? <Swiper users={users}/>: (<Text>nothing to see here</Text>)}
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