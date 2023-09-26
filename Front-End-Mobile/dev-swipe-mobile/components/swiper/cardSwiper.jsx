import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeCards from "react-native-swipe-cards-deck";


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
  
  const handleYup = (card) => {
    remove(card.id)
    console.log(`Yup for ${card.id}`)
    return true;
  }
  const handleNope = (card) =>{
    remove(card.id)
    console.log(`Nope for ${card.id}`)
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