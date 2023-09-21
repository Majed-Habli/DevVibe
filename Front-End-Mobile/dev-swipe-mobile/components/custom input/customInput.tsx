import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, TextInput} from 'react-native';

interface CustomInputProps{
    label : string;
    placeholder : string
}

const CustomInput : React.FC<CustomInputProps> =({label, placeholder}: CustomInputProps) =>{

    return(
        <View>
            <Text>{label}</Text>
            <TextInput></TextInput>
        </View>
    )
}

export default CustomInput;