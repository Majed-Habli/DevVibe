import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

const UserCard = ({label}) =>{
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
            <Text style={styles.input_header}>{label}</Text>
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
        alignItems: 'center'
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