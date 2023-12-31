import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const UserCard = () =>{
    const [user, setLoggedinID] = useState('');
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
      const getData = async () => {
          try {
            const value = await AsyncStorage.getItem("user");
            const user= JSON.parse(value)
              setLoggedinID(user.user.id)
              setUserName(user.user.user_name)
              setProfileImage(user.user.profile_image_url)
          } catch (error) {
            console.log("retrieving data2");
          }
        };
      getData();
    });

  const handleClicked = (cardId) => {
    navigation.navigate('Profile', { cardId });
  }

    return(
        <View style={styles.container}>
          <Pressable style={styles.press_container} onPress={()=>handleClicked(user)}>
            {profileImage.length > 0 ?(
            <Image
                style={styles.profile_image}
                source={{uri: profileImage}}
            />):(
            <Image
                style={styles.profile_image}
                source={require('../../assets/default-user.png')}
            />
            )}
            {userName ? (<Text style={styles.input_header}>{userName}</Text>):(<Text style={styles.input_header}>user name</Text>)}
          </Pressable>
        </View>
    )
}

export default UserCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginLeft: 10
    },
    press_container: {
      display: 'flex',
      flexDirection: 'row',
      columnGap: 20,
      alignItems: 'center',
    },
    input_header: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    profile_image: {
        width: 45,
        height: 45,
        borderRadius: 120,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'black'
    }
    });