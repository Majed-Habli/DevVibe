import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserCard = ({label}) =>{
    const [user, setUser] = useState({});

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // We have data!!
        console.log("we hav dattaaa", JSON.parse(value));
        setUser(JSON.parse(value));
        // console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log("retrieving data");
    }
  };

  useEffect(() => {
    getData();
  },[]);
  console.log("My use is ", user);

    const profile_image = ''
    return(
        <View style={styles.container}>
            {profile_image !=  '' ?(
            <Image
                style={styles.profile_image}
                source={require('../../assets/default-user.png')}
            />):(
            <Image
                style={styles.profile_image}
                source={require('../../assets/default-user.png')}
            />
            )}
            <Text style={styles.input_header}>{user?.user?.user_name}</Text>
        </View>
    )
}

export default UserCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        columnGap: 20,
        alignItems: 'center',
        marginLeft: 10
    },
    input_header: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    profile_image: {
        width: 45,
        height: 45,
        backgroundColor: 'red',
        borderRadius: 120
    }
    });