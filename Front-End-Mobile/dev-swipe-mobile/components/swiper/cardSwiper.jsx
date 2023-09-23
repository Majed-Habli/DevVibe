import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height;
 
import Swiper from 'react-native-deck-swiper'
function* range(start,end){
  for (let i= start ; i<= end; i++){
    yield i;
  }
}

export default class CardSwiperComponent extends Component {
  constructor(props){
    super (props);
    this.state = {
      // cards: [...range(1,50)],
      cards:['Saida, Lebanon', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY'],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
    };
  }


  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Image style={styles.icons} source={require("../../assets/Profileimage.png")}/>
        {/* <View > */}
          <Image style={styles.pressable_btn} source={require("../../assets/profile-btn.png")}/>
        {/* </View> */}
        <View style={styles.statements}>
          <Text style={styles.user_name}>Majed Habli</Text>
          <Text style={styles.text}>
            {card} - {index}
          </Text>
        </View>
      </View>
    )
  };

  onSwiped = type => {
    console.log(`on swiped ${type}`);
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
    });
  };

  SwipeLeft = () => {
    this.swiper.swipeLeft();
  };

  render(){
    return (
      <View style={styles.container}>
        <Swiper ref={swiper => {
          this.swiper = swiper;
        }}
        onSwiped={()=> this.onSwiped('general')}
        onSwipedLeft={()=> this.onSwiped('Left')}
        onSwipedRight={()=> this.onSwiped('right')}
        onSwipedTop={()=> this.onSwiped('top')}
        onSwipedBottom={()=> this.onSwiped('bottom')}
        onTapCard={this.swipeLeft}
        cards={this.state.cards}
        cardIndex={this.state.cardIndex}
        cardVerticalMargin={50}
        renderCard={this.renderCard}
        onSwipedAll={this.onSwipedAllCards}
        stackSize={3}
        disableBottomSwipe
        disableTopSwipe
        stackSeparation={2}
        containerStyle={{ height: windowHeight, backgroundColor:"white", overflow: 'hidden'}}
        
        overlayLabels={{
          // bottom: {
          //   title: 'Bleah',
          //   style: {
          //     label: {
          //       backgroundColor: 'black',
          //       borderColor: 'black',
          //       color: 'white',
          //       borderWidth: 1
          //     },
          //     wrapper: {
          //       flexDirection: 'column',
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //     },
          //   },
          // },
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30,
              },
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: +30,
              },
            }
          },
          // top: {
          //   title: 'Super LIKE',
          //   style: {
          //     label: {
          //       backgroundColor: 'black',
          //       borderColor: 'black',
          //       color: 'white',
          //       borderWidth: 1,
          //     },
          //     wrapper: {
          //       flexDirection: 'column',
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //     },
          //   }
          // }
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
        >
          {/* <Button onPress={()=>this.swiper.swipeBack()} title='swipeBack'></Button> */}

        </Swiper>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: '100%',
    height: 450,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "#FCC860"
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
});
 
// export default class CardSwiperComponent extends Component {
//   render () {
//     <View style={styles.container}>
//         <Swiper
//             cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
//             renderCard={(card) => {
//                 return (
//                     <View style={styles.card}>
//                         <Text style={styles.text}>{card}</Text>
//                     </View>
//                 )
//             }}
//             onSwiped={(cardIndex) => {console.log(cardIndex)}}
//             onSwipedAll={() => {console.log('onSwipedAll')}}
//             cardIndex={0}
//             backgroundColor={'#4FD0E9'}
//             stackSize= {3}>
//             <Button
//                 onPress={() => {console.log('oulala')}}
//                 title="Press me">
//                 You can press me
//             </Button>
//         </Swiper>
//     </View>
// }
// }
 
AppRegistry.registerComponent('myproject', () => CardSwiperComponent)