import React, { Component, useEffect, useId, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'react-native-axios';
 
 
const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  notify: {
    fontSize: 14
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  icons: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})
 
const ProfileSwiper = ({userID, token}) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const fetchUserImages = async () =>{

        try {
            const response = await axios.get(`https://899d-78-40-183-51.ngrok-free.app/api/user/developer/retrieve_user_images/${userID}`,
              {
              headers: {
              'Authorization': `Bearer ${token}`
              }}
            );
            const data = response.data;
            console.log('user images',data)
            if(data.status == 'success'){
                setImages(data.data)
                console.log('user images round 2',data.data)
            }else{
                setError('status isnt success')
            }
          } catch (error) {
            console.error("Swipe like users api failed", error);
          }
    }

    useEffect(()=>{
        if(userID){
            fetchUserImages();
        }
    },[useId])

    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        {images.length > 0 ? images.map((img)=>(
            <View key={img.id} style={styles.slide}>
                <Image style={styles.icons} source={{uri: img.image_url}}/>
            </View>
        )): (
            <View style={styles.slide}>
                <Text style={styles.notify}>User has no images yet</Text>
            </View>
        )}
      </Swiper>
    )
}
 
export default ProfileSwiper;