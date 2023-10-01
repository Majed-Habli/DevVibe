import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, ScrollView, Pressable, TextInput, Button} from 'react-native';
import axios from 'react-native-axios';
import CheckBox from 'expo-checkbox';
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SkillForm = ({isOpen, userSkills ,setting}) => {
    const [token, setToken] = useState('');

    const [search, setSearch] = useState('');
    const [skills, setSkills] = useState([])
    const [selected, setSelected] = useState([]);
    const [error, setError] = useState('');
    const [unselectedSkills, setUnselectedSkills] = useState([]);

    const handleSearchChange = (text) => {
        setSearch(text)
        getSkills()
    };

    const hideModel = () =>{
        isOpen(prev => !prev);
    }

    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem("user");
              const user= JSON.parse(value)
                setToken(user.user.token)
            } catch (error) {
              console.log("retrieving data2");
            }
          };
        getData();
    },[]);

    // const onChangeHandler = (id) => {
    //     selected.includes(id)
    //       ? setSelected(selected.filter(x => x !== id))
    //       : setSelected([...selected, id]);
    //   };

    const onChangeHandler = (id) => {
    if (selected.includes(id)) {
        setSelected(selected.filter((x) => x !== id));
        setUnselectedSkills((prevIds) => [...prevIds, id]);
    } else {
        setSelected([...selected, id]);
    }
    };

    const getSkills = async () =>{
        try {
          const response = await axios.get(`https://d79e-78-40-183-51.ngrok-free.app/api/user/developer/view_all_skills/${search}`,{
            headers: {
            'Authorization': `Bearer ${token}`
            }}
          );
    
          const data = response.data;
    
            if(data.status == 'success'){
                const obj = data.data;
                setSkills(obj);

            }else{
                setError("failed to get user data!");
                console.log(error);
            }
          } catch (error) {
            console.error("get users failed2:", error);
          }
    }

    const removeSkills = async (id) =>{
        const removeSkills = JSON.stringify(unselectedSkills)
        try {
          const response = await axios.post(`https://d79e-78-40-183-51.ngrok-free.app/api/user/developer/remove_skills`,{
            user_skills: removeSkills
          },{
            headers: {
            'Authorization': `Bearer ${token}`
            }}
          );
    
          const data = response.data;
    
            if(data.status == 'success'){
                console.log("skills were removed from db: ")

            }else{
                setError("failed to get user data!");
                console.log(error);
            }
          } catch (error) {
            console.error("get users failed2:", error);
          }
    }

    useEffect(()=>{
        getSkills();
    },[])

    const addUserSkills = async () =>{
        const mySkills = JSON.stringify(selected);

        try {
            if (!selected.length) {
              setError('no skills to add');
            } else {
              const response = await axios.post(
                'https://d79e-78-40-183-51.ngrok-free.app/api/user/developer/add_skills',
                {
                  user_skills: mySkills,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const data = response.data;
        
              if (data.status === 'success') {
                hideModel();
              } else {
                setError('Failed to add skills to user set');
                console.log(error);
              }
            }
          } catch (error) {
            setError('Failed to call the backend.');
            console.log(error);
          }
        };

    const save = async () =>{
        try{
            addUserSkills();
            removeSkills();
        }catch (error){
            console.log('faled to save', error);
        }
    }

    const filtering = (id, skillID) =>{
        const filtered = userSkills.filter((userSkill)=>{
            return userSkill.id != id
        })
        removeSkills(skillID)
        setting(filtered);
    }

    console.log(selected)
    console.log(unselectedSkills)

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
                    <Text style={styles.txt}>Edit Skills</Text>
                    <Pressable style={styles.image_container} onPress={()=>hideModel()}>
                        <Image style={styles.icons} source={require("../../assets/Close.png")}/>
                    </Pressable>
                </View>
                <ScrollView style={styles.scroll_view}>

                    <View>
                        <Text style={styles.input_header}>Skills</Text>

                        {/* <View style={styles.my_skills}>
                            {userSkills.map((skill)=>(
                                <View key={skill.skill.id} style={styles.pill}>
                                    <Text style={styles.skill_text}>{skill.skill.name}</Text>
                                    <Pressable style={styles.image_container} onPress={()=>filtering(skill.id, skill.skill.id)}>
                                        <Image style={styles.pill_icons} source={require("../../assets/Close.png")}/>
                                    </Pressable>
                                </View>
                            ))}
                        </View> */}

                        <View style={styles.searchbar_container}>
                            <View style={styles.searchbar}>
                                <Image
                                    style={styles.search_icon}
                                    source={require('../../assets/Search.png')}
                                />
                                <TextInput style={styles.searcbar_input} placeholder='search here' onChangeText={(text)=>handleSearchChange(text)} defaultValue={search}/>
                            </View>
                        </View>
                        <View className={styles.skill_display}>
                            {skills.map((skill)=>(
                                <View key={skill.id} style={styles.box}>
                                    <CheckBox id={`${skill.id}`} value={selected.includes(skill.id)}
                                        onValueChange={()=>onChangeHandler(skill.id)} />
                                    <Text id={`${skill.id}`}> {skill.name}</Text>
                                </View>
                            ))}
                        </View>
                    
                    </View>
                    <View></View>
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
        height: windowHeight/1.3,
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
        width: windowWidth/1.2,
        flex: 1,
        padding: 10,
        marginBottomBottom: 10
    },
    text_area: {
        width: '100%',
        rowGap: 12,
        marginBottom: 10
    },
    input_header: {
        fontSize: 16,
        fontWeight: '500'
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
        width: 31,
        height: 19,
        objectFit: 'contain'
    },
    searcbar_input: {
        height: '100%',
        width: 250,
        paddingLeft: 5,
    },
    my_skills: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 7,
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
    },
    skill_display: {
        rowGap: 10,
        marginVertical: 5
    },
    box: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center'
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


export default SkillForm;