import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, Button} from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardSwiper from '../../components/swiper/cardSwiper';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState('')

    
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

    const getUsers = async () =>{
        try {
          const response = await axios.get("https://d79e-78-40-183-51.ngrok-free.app/api/user/developer/display_users",{
            headers: {
            'Authorization': `Bearer ${token}`
            }}
          );
    
          const data = response.data;
    
            if(data.status == 'success'){
                setUsers(data.compare.data)
            }else{
                setError("no success1!");
                console.log(error);
            }
          } catch (error) {
            console.error("get users failed1:", error);
          }
    }

    useEffect(()=>{
        if(token != ''){
            getUsers();
        }
    },[token])

    const removeUserCard = (id) => {
        setUsers((prev)=>prev.filter(user => user.id != id))
        if(users.length <= 3){
            getUsers();
        }
    }
  
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.dashboard_container}>
                <View style={styles.swiper_container}>
                    {users? <CardSwiper users={users} remove={removeUserCard}/>: (<Text>nothing to see here</Text>)}
                </View>
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
    },
    dashboard_container: {
        width: '100%',
        height: '100%',
    },
    swiper_container: {
        height: windowHeight,
        paddingBottom:100,
    },
    swiper_buttons: {
        width: '100%',
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
    }
    });