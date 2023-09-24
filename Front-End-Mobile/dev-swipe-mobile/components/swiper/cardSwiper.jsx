import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from "react-native-swipe-cards-deck";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <View key={this.props.id} style={styles.card}>
      //   <Text>{this.props.user_name}</Text>
      // </View>
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     cards: [{"country": "KE", "created_at": "2023-09-19T09:19:54.000000Z", "device_token": null, "email": "ahmad@gmail.com", "has_access": 1, "id": 6, "profile_image_url": "http://127.0.0.1:8000/storage/users/3/profile_pic/z5pvlhbgOU.png", "updated_at": "2023-09-20T21:12:37.000000Z", "user_name": "ahmad", "user_type_id": 3, "view_count": 0}, {"country": "LB", "created_at": "2023-09-19T09:19:54.000000Z", "device_token": null, "email": "ali@gmail.com", "has_access": 1, "id": 7, "profile_image_url": "http://127.0.0.1:8000/storage/users/3/profile_pic/z5pvlhbgOU.png", "updated_at": "2023-09-20T21:12:37.000000Z", "user_name": "ali", "user_type_id": 3, "view_count": 0}]
  //   };
  // }

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
    return true;
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
    return true;
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
    return true;
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.props.users}
        renderCard={(cardData) => <Card {...cardData} />}
        keyExtractor={(cardData) => String(cardData.text)}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        stack={true}
        stackOffsetX={0}
        // hasMaybeAction
      />
    )
  }
}

const styles = StyleSheet.create({
  // card: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: 300,
  //   height: 300,
  // },
  card: {
    width: 340,
    height: 450,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "red"
    // alignItems: 'center',
    // borderRadius: 5,
    // overflow: 'hidden',
    // borderColor: 'grey',
    // backgroundColor: 'red',
    // borderWidth: 4,
    // elevation: 1,
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