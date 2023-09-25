import React from "react";
import { View, StyleSheet } from "react-native";
import { styles } from "react-native-swipe-cards-deck/Styles";

const Message = () => {

    return(
        <View style={styles.container}>
            <View style={styles.message_container}>
                <View style={styles.message_view}>
                    <Text style={styles.message}>{message}</Text>
                </View>
                <View style={styles.time_view}>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create){
    container: {
        
    }
}

export default Message;