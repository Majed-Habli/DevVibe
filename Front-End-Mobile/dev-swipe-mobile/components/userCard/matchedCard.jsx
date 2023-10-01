import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MatchedCard = ({user, index}) => {
    const navigation = useNavigation();
    
    const goToPage = (cardId) => {
        navigation.navigate('Profile', { cardId });
    };

    return(
        <Pressable onPress={()=>goToPage(user.id)}>
            <View style={styles.container}>
                {user.matched_with.profile_image_url !=  null ?(
                    <View style={[styles.image_container, index % 2 === 0 ? styles.even_profile_image : styles.odd_profile_image]}>
                        <Image
                            style={styles.profile_image}
                            source={{uri:user.matched_with.profile_image_url}}
                        />
                    </View>):(
                    <View style={[styles.image_container, index % 2 === 0 ? styles.image_container : styles.odd_profile_image]}>
                        <Image
                            style={styles.profile_image}
                            source={require('../../assets/default-user.png')}
                        />
                    </View>
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
    odd_profile_image: {
        width: 45,
        height: 45,
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center0',
        borderWidth: 1,
        borderColor: 'black'
    },
    image_container: {
        width: 45,
        height: 45,
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center0',
        borderWidth: 1,
        borderColor: '#FCC860'
    },
    profile_image: {
        width: '100%',
        height: '100%',
        borderRadius: 120,
        resizeMode: 'contain'
    }
    });