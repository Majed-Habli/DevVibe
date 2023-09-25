import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, TextInput, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MatchedCard = ({user}) => {
    const navigation = useNavigation();

    const goToPage = (id) => {
        navigation.navigate('Chat',{id})
    };

    return(
        <Pressable onPress={()=>goToPage(user.id)}>
            <View style={styles.container}>
                {user.matched_with.profile_image_url !=  null ?(
                <Image
                    style={styles.profile_image}
                    source={{uri:`${user.profile_image_url}`}}
                />):(
                <Image
                    style={styles.profile_image}
                    source={require('../../assets/default-user.png')}
                />
                )}
                <View style={styles.user_info}>
                    <Text style={styles.header}>{user.matched_with.user_name}</Text>
                </View>
            </View>
        </Pressable>
    )
} 

export default MatchedCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        columnGap: 20,
        alignItems: 'center',
        paddingVertical: 5
    },
    header: {
        fontSize: 16,
        fontWeight: '500'
    },
    date: {
        fontSize: 12,
        color: '#adadad'
    },
    profile_image: {
        width: 45,
        height: 45,
        backgroundColor: 'red',
        borderRadius: 120
    }
    });