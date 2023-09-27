import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Button, Pressable} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

import axios from 'react-native-axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Menu = ({isOpen,tokenkey}) =>{
    const navigation = useNavigation();

    const hideModel = () =>{
        isOpen(prev => !prev);
    }
    const onLogout = async () =>{
        try {
            const response = await axios.get(`https://899d-78-40-183-51.ngrok-free.app/api/guest/logout`,{
                headers: {
                'Authorization': `Bearer ${tokenkey}`
                }}
              );
            const data = response.data;

            if(data.status == 'success'){
                console.log(data.status)
                hideModel()
                navigation.navigate('Home')
            }else{
                setError("something went wrong");
            }
            
          } catch (error) {
            console.error("Fetching skills failed:", error);
          }
    }

    return(
        <View style={styles.container}>
            <View style={styles.form_container}>
                <Pressable style={styles.button_container} onPress={()=>onLogout()}>
                    <Text style={styles.txt}>Logout</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        width:200,
        height: 90,
        position: 'absolute',
        right: 0,
        top: 60
    },
    form_container: {
        width:200,
        height: 90,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button_container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#343A40',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 18,
        color: '#FCC860'
    }
})