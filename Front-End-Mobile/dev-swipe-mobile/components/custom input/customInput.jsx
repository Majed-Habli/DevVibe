import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

const CustomInput = ({name, label, placeholder, onChange ,value}) =>{

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