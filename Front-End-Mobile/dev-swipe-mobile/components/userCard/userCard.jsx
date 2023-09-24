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

    const profile_image = user.user.profile_image_url;
    console.log("my profile image", profile_image)
    return(
        <View style={styles.container}>
            {profile_image !=  '' ?(
            <Image
                style={styles.profile_image}
                source={{uri: 'https://674b-78-40-183-51.ngrok-free.app/storage/users/2/profile_pic/w8Vg1nGRC1.png'}}
            />):(
            <Image
                style={styles.profile_image}
                source={require('../../assets/default-user.png')}
            />
            )}
            {user?.user?.user_name ? (<Text style={styles.input_header}>{user.user.user_name}</Text>):(<Text style={styles.input_header}>user name</Text>)}
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
        width: 50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 120,
        resizeMode: 'cover',
        borderWidth: 1,
        // borderColor: '#FCC860'
        borderColor: 'black'
    }
    });