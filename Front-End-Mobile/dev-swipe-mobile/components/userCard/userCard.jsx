import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const UserCard = () =>{
    const [user, setLoggedinID] = useState({});
    const [profileImage, setProfileImage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
      const getData = async () => {
          try {
            const value = await AsyncStorage.getItem("user");
            const user= JSON.parse(value)
              setLoggedinID(user.user.id)
              setProfileImage(user.user.profile_image_url)
          } catch (error) {
            console.log("retrieving data2");
          }
        };
      getData();
    });

  console.log('the user object is ',user)

  const handleClicked = (cardId) => {
    console.log(`got clicked ${cardId}`)
    navigation.navigate('Profile', { cardId });
  }

    return(
        <View style={styles.container}>
          <Pressable style={styles.press_container} onPress={()=>handleClicked(user)}>
            {profileImage !=  '' ?(
            <Image
                style={styles.profile_image}
                source={{uri:`${profileImage}`}}
            />):(
            <Image
                style={styles.profile_image}
                source={require('../../assets/default-user.png')}
            />
            )}
            {user?.user?.user_name ? (<Text style={styles.input_header}>{user.user.user_name}</Text>):(<Text style={styles.input_header}>user name</Text>)}
          </Pressable>
        </View>
    )
}

export default UserCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginLeft: 10
    },press_container: {
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
        width: 50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 120,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'black'
    }
    });