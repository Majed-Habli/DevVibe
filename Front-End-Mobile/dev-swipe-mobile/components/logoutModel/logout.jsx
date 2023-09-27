import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, ScrollView, Pressable, RefreshControl} from 'react-native';
import CustomButton from '../../components/custom button/customButton';
import axios from 'react-native-axios';

const Menu = ({isOpen,uID}) =>{

    return(
        <View style={styles.container}>
            <View>
                <Text></Text>
            </View>
        </View>
    )
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        width:200,
        height: 150,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
})