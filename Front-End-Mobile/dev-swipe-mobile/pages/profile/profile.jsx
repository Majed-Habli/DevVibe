import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, ScrollView, Pressable} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwiperComponent from '../../components/swiper/swiper';
import { useRoute } from '@react-navigation/native';
import axios from 'react-native-axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Profile = ({navigation}) => {
    const route = useRoute();
    const [user, setUser] = useState([]);
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState('');
    const [details, setDetails] = useState([]);
    const [loggedinID, setLoggedinID] = useState('');
    const [showButtons, setShowButtons] = useState(false);
    const [token, setToken] = useState('');
    let cardId = route.params?.cardId || loggedinID;

    const goBack = () => {
        cardId = loggedinID;
        navigation.navigate('Dashboard');
        console.log('hey')
        console.log(cardId)
      };

    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem("user");
              const user= JSON.parse(value)
                setToken(user.user.token)
                setLoggedinID(user.user.id)
            } catch (error) {
              console.log("retrieving data2");
            }
          };
        getData();
    });

    useEffect(()=>{
        console.log('before getting data', cardId)

        const getUserProfile = async () =>{
            try {
              const response = await axios.get(`https://674b-78-40-183-51.ngrok-free.app/api/user/developer/profile/${cardId}`,{
                headers: {
                'Authorization': `Bearer ${token}`
                }}
              );
        
              const data = response.data;
        
                if(data.status == 'success'){
                    setUser(data.data[0])
                    console.log("yayy2")
                }else{
                    setError("no success2!");
                    console.log(error);
                }
              } catch (error) {
                console.error("get users failed2:", error);
              }
        }

        const getSkills = async () =>{
            try {
                const response = await axios.get(`https://674b-78-40-183-51.ngrok-free.app/api/user/developer/view_user_skills/${cardId}`,{
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }}
                  );
                const data = response;
                // console.log('user skills response ',data.data.data)
    
                if(data.data.status == 'success'){
                    if(data.data.data == ''){
                        setErrorSkills(`user has no skills yet.`)
                    }

                    const obj = data.data.data;
                    // console.log('skillssssssssssss     ', obj)
                    setSkills(obj);
                }else{
                    setError("something went wrong");
                    console.log(error);
                }
                
              } catch (error) {
                console.error("Fetching skills failed:", error);
              }
        }
        if(token != '' ){
            getUserProfile();
            getSkills();
        }
    },[cardId, token
    ])
    
    useEffect(()=>{
        console.log('before setting details ',user)
        if(user){
        if(user.user_type_id == 3){
            setDetails({github_url : user.rec_details && user.rec_details.github_url ?user.rec_details.github_url : "",linkedin_url : user.rec_details && user.rec_details.linkedin_url ?user.rec_details.linkedin_url : "",description : user.rec_details && user.rec_details.description ?user.rec_details.description : ""
        })
        }else{
            setDetails({github_url : user.dev_details && user.dev_details.github_url ?user.dev_details.github_url : "",linkedin_url : user.dev_details && user.dev_details.linkedin_url ?user.dev_details.linkedin_url : "",resume : user.dev_details && user.dev_details.resume ?user.dev_details.resume : "",description : user.dev_details && user.dev_details.description ?user.dev_details.description : ""
        })
        }}
    },[user]);

    useEffect(()=>{
        if(cardId === loggedinID){
            setShowButtons(true);
        }else{
            setShowButtons(false);
        }
    },[])

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.page_header}>
                <Pressable onPress={() => goBack()}>
                    <Image
                        style={{ width: 30, height: 30, margin: 20 }}
                        source={require("../../assets/backArrow.png")}
                    />
                </Pressable>
                <View style={styles.header_title}>
                    <Text style={{fontSize: 20}}>{user?.user_name}'s Profile</Text>
                </View>
                <Image
                style={{ width: 28, height: 28, margin: 20 }}
                source={require("../../assets/Notify-button.png")}
                />
            </View>
            <ScrollView style={styles.Scroll_view}>
                <View style={styles.images_container}>
                    <SwiperComponent/>
                </View>
                <View style={styles.profile_body}>
                    <View style={styles.body_header}>
                        <Text style={styles.user_name}>{user?.user_name}</Text>
                        <Text style={styles.user_location}>{user.country}</Text>
                        <View style={styles.image_group}>
                            <View style={styles.image_button}>
                                <Image style={styles.icons} source={require("../../assets/Send.png")}/>
                            </View>
                            <View style={styles.image_button}>
                                <Image style={styles.icons} source={require("../../assets/Mail.png")}/>
                            </View>
                            {details?.github_url && <View style={styles.image_button}>
                                <Image style={styles.icons} source={require("../../assets/Github.png")}/>
                            </View>}
                            {details?.linkedin_url && <View style={styles.image_button}>
                                <Image style={styles.icons} source={require("../../assets/LinkedIn.png")}/>
                            </View>}
                        </View>
                    </View>
                    {/* add company name here */}
                    <View style={styles.skill_container}>
                        <View style={styles.container_header}>
                            <Text style={styles.category_header}>Skills</Text> 
                            {showButtons && <View style={styles.model_button}>
                                <Text>Edit</Text>
                                <Image source={require("../../assets/Edit-icon.png")}/>
                            </View>}
                        </View>
                        <ScrollView style={styles.scrollable} horizontal={true}>
                            <View style={styles.pill_container}>
                                {skills != '' ? (skills.map((skill)=>(
                                    <View style={styles.pill}>
                                        <Text style={styles.pill_name}>{skill.skill.name}</Text>
                                    </View>
                                ))):(
                                    <Text>no Skills to display</Text>
                                )}
                                {/* <View style={styles.pill}>
                                    <Text style={styles.pill_name}>Typescript</Text>
                                </View> */}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.bio_container}>
                        <View style={styles.container_header}>
                            <Text style={styles.category_header}>Biography</Text> 
                            {showButtons && <View style={styles.model_button}>
                                <Text>Edit</Text>
                                <Image source={require("../../assets/Edit-icon.png")}/>
                            </View>}
                        </View>
                        <View style={styles.pill_container}>
                            {details?.description ?(<Text style={styles.description}>{details.description}</Text>):(<Text>No description yet.</Text>)}
                        </View>
                    </View>

                    <View style={styles.bio_container}>
                        <View style={styles.container_header}>
                            <Text style={styles.category_header}>Details</Text> 
                            {showButtons && <View style={styles.model_button}>
                                <Text>Edit</Text>
                                <Image source={require("../../assets/Edit-icon.png")}/>
                            </View>}
                        </View>
                        <View style={styles.detail_container}>
                            <View style={styles.row}>
                                <Text style={styles.statement}>{user.email}</Text>
                                {details?.gender && <Text style={styles.statement}>{details.gender}</Text>}
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.statement}>{user.country}</Text>
                                <Text style={styles.statement}>12/2/2023</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
} 

export default Profile;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    },
    Scroll_view: {
        flex: 1
    },
    images_container: {
        height: 280
    },
    profile_body: {
        height: '100%',
        gap: 5
    },
    body_header: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    user_name: {
        fontSize: 27,
        fontWeight: '600'
    },
    user_location: {
        fontSize: 18
    },
    image_group: {
        width: '100%',
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        columnGap: 15
    },
    image_button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#E8E8E8',
    },
    icons: {
        width: 30,
        height: 30,
    },
    skill_container: {
        width: '100%',
        height: 90,
        paddingHorizontal: 15,
    },
    container_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    model_button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollable: {
        flex: 1,
        maxHeight: 40,
    },
    category_header: {
        fontSize: 20,
        fontWeight: '500',
    },
    pill_container: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        flexWrap: 'wrap',
        columnGap: 5,
        gap: 10,
    },
    pill: {
        alignSelf: "flex-start",
        padding: 6,
        borderRadius: 8,
        backgroundColor: '#FCC860',
    },
    pill_name:{
        fontSize: 16,
        fontWeight: '600'
    },
    bio_container: {
        width: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
    },
    detail_container: {
        width: '100%',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        fontWeight: '400'
    },
    row: {
        height: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statement: {
        fontSize: 16
    },
    page_header: {
        width: windowWidth,
        height: 50,
        marginTop: 50,
        alignItems: 'center',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: "#c7c7c7",
    },
    header_title: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
    });