import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from "react-native-swipe-cards-deck";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
      <Image style={styles.icons} source={require("../../assets/Profileimage.png")}/>
      {/* <View > */}
        <Image style={styles.pressable_btn} source={require("../../assets/profile-btn.png")}/>
      {/* </View> */}
      <View style={styles.statements}>
        <Text style={styles.user_name}>{this.props.user_name}</Text>
        <Text style={styles.text}>
          {this.props.country}
        </Text>
      </View>
    </View>
    )
  }
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

export default class extends React.Component {

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
    return true;
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
    return true;
  }

  handleClicked (card) {
    console.log(`got clicked ${card.id}`)
    return true
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.users}
        renderCard={(cardData) => <Card {...cardData} />}
        keyExtractor={(cardData) => String(cardData.text)}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        onClickHandler={()=>handleClicked()}
        stack={true}
        stackOffsetX={0}
      />
    )
  }
}

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
  icons: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 54
  },
  pressable_btn: {
    width: 55,
    height: 55,
    position: 'absolute',
    top: 30,
    left: 20
  }
})