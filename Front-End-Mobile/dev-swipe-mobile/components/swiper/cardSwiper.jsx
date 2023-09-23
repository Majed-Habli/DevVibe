import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, Button } from 'react-native'
 
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
      cards: [...range(1,50)],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
    };
  }


  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>
          {card} - {index}
        </Text>
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
        cardVerticalMargin={80}
        renderCard={this.renderCard}
        onSwipedAll={this.onSwipedAllCards}
        stackSize={3}
        stackSeparation={15}
        overlayLabels={{
          bottom: {
            title: 'Bleah',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          },
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
          top: {
            title: 'Super LIKE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }
          }
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
        >
          <Button onPress={()=>this.swiper.swipeBack()} title='swipeBack'></Button>

        </Swiper>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
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