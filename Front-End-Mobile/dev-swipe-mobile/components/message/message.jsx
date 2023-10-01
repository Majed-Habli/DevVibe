import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Message = ({time, isLeft, message}) => {
    const isOnLeft = type =>{
        if(isLeft === true && type === 'message_container'){
            return{
                alignSelf: 'flex-start',
                backgroundColor: '#FCC860',
                borderTopLeftRadius: 0
            }
        }else if (isLeft === true && type === 'message'){
            return{
                color: '#fff'
            };
        }
        else if (isLeft === true && type === 'time'){
            return {
                color: 'black'
            }
        }else {
            return {
                borderTopRightRadius: 0
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style={[styles.message_container, isOnLeft('message_container')]}>
                <View style={styles.message_view}>
                    <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
                </View>
                <View style={styles.time_view}>
                    <Text style={[styles.time, isOnLeft('time')]}>{time}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        marginVertical: 5
    },
    message_container: {
        backgroundColor: '#E5E4E4',
        maxWidth: '80%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10
    },
    message_view: {
        backgroundColor: 'transparent',
        maxWidth: '80%'
    },
    time_view: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        paddingLeft: 10
    },
    message: {
        color: 'black',
        alignSelf: 'flex-start',
        fontSize: 15
    },
    time: {
        color: 'darkgray',
        alignSelf: 'flex-start',
        fontSize: 10
    }
})

export default Message;