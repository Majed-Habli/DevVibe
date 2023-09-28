import React, { Component, useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import SwipeCards from "react-native-swipe-cards-deck";
import axios from 'react-native-axios';


const Card = (props) => {
  const navigation = useNavigation();

  const handleClicked = (cardId) => {
    console.log(`got clicked ${cardId}`)
    navigation.navigate('Profile', { cardId });
  }

  return (
    <View style={styles.card}>
    <Image style={styles.user_image} source={require("../../assets/Profileimage.png")}/>
    <Pressable style={styles.pressable_btn} onPress={()=>handleClicked(props.id)}>
      <Image style={styles.icons} source={require("../../assets/profile-btn.png")}/>
    </Pressable>
    <View style={styles.statements}>
      <Text style={styles.user_name}>{props.user_name}</Text>
      <Text style={styles.text}>
        {props.country}
      </Text>
    </View>
  </View>
  )
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

const CardSwiper = ({users, remove}) => {
  const [token, setToken] = useState('');
    
  useEffect(() => {
      const getData = async () => {
          try {
            const value = await AsyncStorage.getItem("user");
            const user= JSON.parse(value)
              setToken(user.user.token)
          } catch (error) {
            console.log("retrieving data1");
          }
        };
      getData();
  },[]);

  const handleYup = async (card) => {
    remove(card.id)
    try {
      const response = await axios.post("https://d79e-78-40-183-51.ngrok-free.app/api/user/developer/swipe",
        {
          swiped_user_id: card.id,
          is_liked: 1
        },{
        headers: {
        'Authorization': `Bearer ${token}`
        }}
      );
    } catch (error) {
      console.error("Swipe like users api failed", error);
    }
    return true;
  }

  const handleNope = async (card) =>{
    remove(card.id)
    try {
      const response = await axios.post("https://d79e-78-40-183-51.ngrok-free.app/api/user/developer/swipe",
        {
          swiped_user_id: card.id,
          is_liked: 0
        },{
        headers: {
        'Authorization': `Bearer ${token}`
        }}
      );
    } catch (error) {
      console.error("Swipe hate users api failed", error);
    }
    return true;
  }

    return (
      <SwipeCards
        cards={users}
        renderCard={(cardData) => <Card {...cardData} />}
        keyExtractor={(cardData) => String(cardData.id)}
        renderNoMoreCards={() => <NoMoreCards />}

        stack={true}
        stackOffsetX={0}
        actions={{
          nope: { onAction: handleNope },
          yup: { onAction: handleYup },
        }}
      />
    )

}

export default CardSwiper;

const styles = StyleSheet.create({
  card: {
    width: 340,
    height: 450,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "transparent"
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  statements: {
    bottom:30,
    left:20,
    position: 'absolute',
  },
  user_name: {
    fontSize: 25,
    color: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    backgroundColor: "transparent"
  },
  user_image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 54
  },
  pressable_btn: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    left: 20
  },
  icons:{
    width: 55,
    height: 55,
    borderRadius: 120
  }

})