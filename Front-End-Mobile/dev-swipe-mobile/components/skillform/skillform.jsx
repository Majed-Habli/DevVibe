import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, ScrollView, Pressable, TextInput, Button} from 'react-native';
import axios from 'react-native-axios';
import CheckBox from "@react-native-community/checkbox";
import CustomInput from '../custom input/customInput';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SkillForm = ({isOpen, userSkills ,setting}) => {
    // const [userName, setUserName] = useState(user.user_name);
    const [token, setToken] = useState('');
    // let cardId = user.id;

    // const [newDetail, setNewDetails] = useState({...details})
    const navigation = useNavigation();

    const handleTextChanges = (text, key) => {
        setNewDetails(prev => {
            return {...prev, [key]: text}
        })
    }

    console.log("inner skills",userSkills)


    const [search, setSearch] = useState('');
    // const [skills, setSkills] = useState([])
    // const [selected, setSelected] = useState([]);
    // const [userSkills,setUserSkills] = useState([]); //user skill

    const handleSearchChange = (text) => {
        setSearch(text)
    };

    const hideModel = () =>{
        isOpen(prev => !prev);
    }

    // const handleUserNameChange = (text) => {
    //     setUserName(text)
    // };

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

    // const onChangeHandler = id => () => {
    //     selected.includes(id)
    //       ? setSelected(selected.filter(x => x !== id))
    //       : setSelected([...selected, id]);
    //   };

    // const getSkills = async () =>{
    //     try {
    //       const response = await axios.get(`https://899d-78-40-183-51.ngrok-free.app/api/user/developer/view_all_skills/${search}`,{
    //         headers: {
    //         'Authorization': `Bearer ${token}`
    //         }}
    //       );
    
    //       const data = response.data;
    
    //         if(data.status == 'success'){
    //             const obj = data.data;
    //             console.log("skills being called from db are: " , obj)
    //             setSkills(obj);

    //         }else{
    //             setError("failed to get user data!");
    //             console.log(error);
    //         }
    //       } catch (error) {
    //         console.error("get users failed2:", error);
    //       }
    // }

    // useEffect(()=>{
    //     getSkills();
    // },[])

    // const addUserSkills = async () =>{
    //     const mySkills = JSON.stringify(selected);

    //     try {
    //         if(!selected){
    //             setError('no skills to add');
    //             console.log(error);
    //         }else{
    //             const response = await axios.post(`https://899d-78-40-183-51.ngrok-free.app/api/user/developer/add_skills`,{
    //                 user_skills: mySkills
    //             },{
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }}
    //             );

    //             const data = response;
    //             console.log("res of adding skills", response)
    //             const token = " ";
    
    //             if(data.status == 'success'){
    //                 console.log("successfully add")
    //             }else{
    //                 setError("failed to add!");
    //                 console.log(error);
    //             }
    //         }
            
    //       } catch (error) {
    //         console.error("bad request. failed:", error);
    //       }
    // }

    const save = async () =>{
        try{
            // await updateUserInfo();
        }catch (error){
            console.log('faled to save', error);
        }
    }

    const filtering = (id) =>{
        const filtered = userSkills.filter((userSkill)=>{
            return userSkill.id != id
        })
        setting(filtered);
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

                    <View>
                        <Text style={styles.input_header}>Skills</Text>

                        <View style={styles.my_skills}>
                            {userSkills.map((skill)=>(
                                <View key={skill.skill.id} style={styles.pill}>
                                    <Text style={styles.skill_text}>{skill.skill.name}</Text>
                                    <Pressable style={styles.image_container} onPress={()=>filtering(skill.id)}>
                                        <Image style={styles.pill_icons} source={require("../../assets/Close.png")}/>
                                    </Pressable>
                                </View>
                            ))}
                        </View>

                    <View style={styles.searchbar_container}>
                        <View style={styles.searchbar}>
                            <Image
                                style={styles.search_icon}
                                source={require('../../assets/Search.png')}
                            />
                            <TextInput style={styles.searcbar_input} placeholder='search here' onChangeText={handleSearchChange} defaultValue={search}/>
                        </View>
                    </View>
                    {/* <View className={styles.skill_display}>
                        {skills.map((skill)=>(
                            <View key={skill.id} className={styles.box}>
                                <CheckBox id={`${skill.id}`} name={`${skill.name}`} checked={selected.includes(skill.id)}
                                    onChange={onChangeHandler(skill.id)}/>
                                <label htmlFor={`${skill.id}`}> {skill.name}</label>
                            </View>
                        ))}
                    </View> */}
                    
                    </View>
                    <View style={styles.button_container}>
                        <Button title="Save" onPress={()=>save()}></Button>
                    </View>
                </ScrollView>
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
        height: windowHeight/1.3,
        backgroundColor: 'white',
        borderColor: 'black',
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
        borderBottomColor: 'black'
    },
    image_container: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 17
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
        fontSize: 14,
        fontWeight: 'bold'
    },
    input: {
        width: 250,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#9F8484',
        paddingLeft: 12
    },
    searchbar_container: {
        width: 250,
        height: 60,
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
        width: 28,
        height: 19,
        objectFit: 'contain'
    },
    searcbar_input: {
        height: '100%',
        width: 250,
        paddingLeft: 10,
    },
    my_skills: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        columnGap: 7,
        marginTop: 5
    },
    pill: {
        width: 'auto',
        flexDirection: 'row',
        columnGap: 7,
        padding: 5,
        backgroundColor: '#FCC860',
        borderRadius: 4,
        alignItems: 'center'
    },
    skill_text: {
        fontSize: 14,
        color: 'white'
    },
    pill_icons: {
        width: 20,
        height: 20
    }
});


export default SkillForm;