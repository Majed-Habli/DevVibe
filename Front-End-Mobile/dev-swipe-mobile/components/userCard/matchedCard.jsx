import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, TextInput} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
// import {navig}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MatchedCard = () => {
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
            <View style={styles.user_info}>
                <Text style={styles.header}>User name</Text>
                <Text style={styles.date}>date</Text>
            </View>
        </View>
    )
} 

export default MatchedCard;

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