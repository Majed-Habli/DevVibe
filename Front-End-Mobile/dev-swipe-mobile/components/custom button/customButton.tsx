import React from 'react';
import { StyleSheet, View, Button, Text, Pressable} from 'react-native';

interface CustomInputProps{
    title: string;
    route: string;
}

const CustomButton : React.FC<CustomInputProps> =({title, route}: CustomInputProps) =>{
    const goToPage = () =>{
        window.location.href = `${route}`
    }
    return(
        <Pressable style={({pressed}) =>[ styles.container, pressed && {opacity: 0.8}]} onPress={()=>goToPage()}>
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