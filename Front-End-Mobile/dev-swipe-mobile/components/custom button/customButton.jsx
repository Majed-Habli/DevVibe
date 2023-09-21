import React from 'react';
import { StyleSheet, Text, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomButton = ({title, route}) =>{
    const navigation = useNavigation();

    const goToPage = () =>{
        navigation.navigate(`${route}`)
    }

    return(
        <Pressable style={({pressed}) =>[ styles.container, pressed && {opacity: 0.8}]} onPress={goToPage}>
            <Text style={styles.statement}>{title}</Text>
        </Pressable>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    container: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCC860',
    borderRadius: 4
    },
    statement: {
        fontWeight: 'bold',
        fontSize: 18
    }
    });