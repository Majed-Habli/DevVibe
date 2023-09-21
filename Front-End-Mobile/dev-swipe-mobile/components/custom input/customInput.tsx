import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, TextInput} from 'react-native';

interface CustomInputProps{
    label : string;
    name: string;
    placeholder : string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput : React.FC<CustomInputProps> =({name, label, placeholder, onChange ,value}: CustomInputProps) =>{

    return(
        <View style={styles.container}>
            <Text style={styles.input_header}>{label}</Text>
            <TextInput name={name} style={styles.input} placeholder={placeholder} onChange={onChange} defaultValue={value}></TextInput>
        </View>
    )
}

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        rowGap: 12
    },
    input_header: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        height: 45,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#9F8484',
        paddingLeft: 12
    }
    });