import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image ,Pressable} from 'react-native'
 
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  wrapper: {},
//   slide1: {
//     width: '80%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#9DD6EB'
//   },
//   slide2: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#97CAE5'
//   },
//   slide3: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#92BBD9'
//   },
//   text: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold'
//   },
//   icons: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover'
//   }
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
  },
  buttonText: {
    position: 'absolute',
    bottom: 0
  }
})
 
const DashboardCards = ({users})=> {
    const navigation = useNavigation();

    const handleClicked = (cardId) => {
        console.log(`got clicked ${cardId}`)
        navigation.navigate('Profile', { cardId });
    }
//   render() {
    return (
      <Swiper loop={false} showsButtons={true} style={styles.wrapper} dotStyle={{display: 'none'}}
      nextButton={<Text style={styles.buttonText}>next</Text>} buttonWrapperStyle={{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center'}}>
        {users.map((user)=>(
            // <View style={styles.slide1}>
            //     <Text>{user.user_name}</Text>
            // <Image style={styles.icons} source={require("../../assets/Profileimage.png")}/>
            // </View>

            <View style={styles.card}>
                <Image style={styles.user_image} source={require("../../assets/Profileimage.png")}/>
                <Pressable style={styles.pressable_btn} onPress={()=>handleClicked(user.id)}>
                <Image style={styles.icons} source={require("../../assets/profile-btn.png")}/>
                </Pressable>
                <View style={styles.statements}>
                <Text style={styles.user_name}>{user.user_name}</Text>
                <Text style={styles.text}>
                    {user.country}
                </Text>
                </View>
            </View>
        ))}
        {/* <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View> */}
      </Swiper>
    )
//   }
}

export default DashboardCards;
 
AppRegistry.registerComponent('myproject', () => SwiperComponent)