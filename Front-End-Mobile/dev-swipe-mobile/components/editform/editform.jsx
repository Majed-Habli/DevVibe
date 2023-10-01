import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Pressable, TextInput} from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const EditForm = ({isOpen, user, details}) => {
    const [userName, setUserName] = useState(user.user_name);
    const [token, setToken] = useState('');
    let cardId = user.id;

    const [newDetail, setNewDetails] = useState({...details})
    const navigation = useNavigation();

    const handleTextChanges = (text, key) => {
        setNewDetails(prev => {
            return {...prev, [key]: text}
        })
    }

    const hideModel = () =>{
        isOpen(prev => !prev);
    }

    const handleUserNameChange = (text) => {
        setUserName(text)
    };

    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem("user");
              const user= JSON.parse(value)
              console.log("logged in user is :",user)
                setToken(user.user.token)
            } catch (error) {
              console.log("retrieving data2");
            }
          };
        getData();
    },[]);

    const updateUserInfo = async () =>{

        try {
            const response = await axios.post(`https://d79e-78-40-183-51.ngrok-free.app/api/user/developer/update-details`,{
                user_name: userName,
                ...newDetail
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}
            );

            const data = response.data;
            console.log("res of updating", response)

            if(data.status == 'success'){
                console.log("successfully updated")
                hideModel();
                navigation.navigate('Profile', { cardId });
                
            }else{
                setError("failed to update!");
                console.log(error);
            }
            
          } catch (error) {
            console.error("bad request. failed:", error);
          }
    }

    const save = async () =>{
        try{
            await updateUserInfo();
        }catch (error){
            console.log('faled to save', error);
        }
    }

    if(!token)
    return(
        <View>
            <Text>Loading</Text>
        </View>
    )

    return(
        <View style={styles.container}>
            <View style={styles.form_container}>
                <View style={styles.container_header}>
                    <Text style={styles.txt}>Edit details</Text>
                    <Pressable style={styles.image_container} onPress={()=>hideModel()}>
                        <Image style={styles.icons} source={require("../../assets/Close.png")}/>
                    </Pressable>
                </View>
                <ScrollView style={styles.scroll_view}>
                    <View style={styles.text_area}>
                        <Text style={styles.input_header}>User Name</Text>
                        <TextInput style={styles.input} onChangeText={handleUserNameChange} defaultValue={userName}></TextInput>
                    </View>
                    {user?.user?.user_type_id == 2 && <View style={styles.text_area}>
                        <Text style={styles.input_header}>Gender</Text>
                        <TextInput style={styles.input} onChangeText={(text)=>handleTextChanges(text, 'gender')} defaultValue={newDetail.gender}></TextInput>
                    </View>}
                    {user?.user?.user_type_id == 3 && <View style={styles.text_area}>
                        <Text style={styles.input_header}>Company Name</Text>
                        <TextInput style={styles.input} onChangeText={(text)=>handleTextChanges(text, 'company_name')} defaultValue={newDetail.company_name}></TextInput>
                    </View>}
                    <View style={styles.text_area}>
                        <Text style={styles.input_header}>Linkedin</Text>
                        <TextInput style={styles.input} onChangeText={(text)=>handleTextChanges(text, 'linkedin_url')} defaultValue={newDetail.linkedin_url}></TextInput>
                    </View>
                    <View style={styles.text_area}>
                        <Text style={styles.input_header}>Github</Text>
                        <TextInput style={styles.input} onChangeText={(text)=>handleTextChanges(text, 'github_url')} defaultValue={newDetail.github_url}></TextInput>
                    </View>
                    <View style={styles.text_area}>
                        <Text style={styles.input_header}>Description</Text>
                        <TextInput style={styles.text_area_input} onChangeText={(text)=>handleTextChanges(text, 'description')} defaultValue={newDetail.description} multiline={true} numberOfLines={4}></TextInput>
                    </View>
                </ScrollView>
                <View style={styles.button_container}>
                    <Pressable style={styles.btn}  onPress={()=>save()}>
                        <Text style={styles.btn_text}>Save</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 2
    },
    form_container: {
        width: windowWidth/1.2,
        height: windowHeight/1.5,
        backgroundColor: 'white',
        borderColor: '#dedede',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'flex-start',
    },
    container_header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dedede'
    },
    image_container: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 17,
        fontWeight: '600'
    },
    icons: {
        width: 25,
        height: 25
    },
    scroll_view: {
        flex: 1,
        padding: 10,
    },
    text_area: {
        width: '100%',
        rowGap: 12,
        marginBottom: 10
    },
    input_header: {
        fontSize: 15,
        fontWeight: '500'
    },
    input: {
        width: 270,
        height:35,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#9F8484',
        paddingLeft: 12
    },
    text_area_input: {
        width: 270,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#9F8484',
        paddingLeft: 12
    },
    searchbar_container: {
        width: 250,
        height: 70,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    searchbar: {
        width: 250,
        height: 42,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#9F8484',
        alignItems: 'center',
        flexDirection: 'row'
    },
    search_icon: {
        width: 32,
        height: 23,
        objectFit: 'contain'
    },
    searcbar_input: {
        height: '100%',
        width: 250,
        paddingLeft: 10,
    },
    button_container: {
        width: '100%',
        marginVertical: 10,
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
        right: 10
    },
    btn: {
        width: 80,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCC860',
        borderRadius: 4
    },
    btn_text: {
        color: 'black',
        fontSize: 17,
        fontWeight: '500'
    }
});


export default EditForm;