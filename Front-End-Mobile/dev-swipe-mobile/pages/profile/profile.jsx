import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, ScrollView, Pressable, RefreshControl} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileSwiper from '../../components/swiper/swiper';
import { useRoute } from '@react-navigation/native';
import axios from 'react-native-axios';
import EditForm from '../../components/editform/editform';
import { Modal } from 'react-native';
import Menu from '../../components/logoutModel/logout';
import SkillForm from '../../components/skillform/skillform';

const windowWidth = Dimensions.get('window').width;

const Profile = ({navigation}) => {
    const route = useRoute();
    const [user, setUser] = useState([]);
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [skills, setSkills] = useState([]);
    const [details, setDetails] = useState([]);
    const [loggedinID, setLoggedinID] = useState('');
    const [showButtons, setShowButtons] = useState(false);
    const [showEditModel, setShowEditModel] = useState(false);
    const [showSkillModel, setShowSkillModel] = useState(false);
    const [showMenuModel, setShowMenu] = useState(false);
    const [refresh, setRefresh] = useState(false);
    let cardId = route.params?.cardId || loggedinID;

    const goBack = () => {
        cardId = loggedinID;
        navigation.navigate('Dashboard');
    };

    const showSkillsModel =async () => {
        setShowSkillModel(true)
    }
    const showEditingModel =async () => {
        setShowEditModel(true)
    }
    
    const showMenu =async () => {
        setShowMenu((current) => !current)
    }

    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem("user");
              const user= JSON.parse(value)
                setToken(user.user.token)
                setLoggedinID(user.user.id)
            } catch (error) {
              console.log("retrieving data");
            }
          };
        getData();
    });

    const getUserProfile = async () =>{
        try {
          const response = await axios.get(`https://d79e-78-40-183-51.ngrok-free.app/api/user/developer/profile/${cardId}`,{
            headers: {
            'Authorization': `Bearer ${token}`
            }}
          );
    
          const data = response.data;
    
            if(data.status == 'success'){
                setUser(data.data[0])
            }else{
                setError("no success!");
                console.log(error);
            }
          } catch (error) {
            console.error("get users failed:", error);
          }
    }
    
    useEffect(()=>{
        const getSkills = async () =>{
            try {
                const response = await axios.get(`https://d79e-78-40-183-51.ngrok-free.app/api/user/developer/view_user_skills/${cardId}`,{
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }}
                  );
                const data = response;
    
                if(data.data.status == 'success'){
                    const obj = data.data.data;
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
    },[cardId, token, refresh
    ])
    
    useEffect(()=>{
        if(user){
        if(user.user_type_id == 3){
            setDetails({github_url : user.rec_details && user.rec_details.github_url ?user.rec_details.github_url : "field is empty",linkedin_url : user.rec_details && user.rec_details.linkedin_url ?user.rec_details.linkedin_url : "field is empty",description : user.rec_details && user.rec_details.description ?user.rec_details.description : "field is empty", company_name : user.rec_details && user.rec_details.company_name? user.rec_details.company_name  : "field is empty"
        })
        }else{
            setDetails({github_url : user.dev_details && user.dev_details.github_url ?user.dev_details.github_url : "field is empty",linkedin_url : user.dev_details && user.dev_details.linkedin_url ?user.dev_details.linkedin_url : "field is empty",resume : user.dev_details && user.dev_details.resume ?user.dev_details.resume : "field is empty",description : user.dev_details && user.dev_details.description ?user.dev_details.description : "field is empty"
        })
        }}
    },[user]);

    useEffect(()=>{
        if(cardId === loggedinID){
            setShowButtons(true);
        }else{
            setShowButtons(false);
        }
    },[cardId])
    
    const reload = () => {
        setRefresh(true)
        getUserProfile()

        setTimeout(()=>{
            setRefresh(false)
        },4000)
    }
    useEffect(()=>{
        console.log(showMenuModel)
    },[showMenuModel])

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
                    {user?.user_name && <Text style={{fontSize: 20}}>{user?.user_name}'s Profile</Text>}
                </View>
                <Pressable onPress={()=>showMenu()}>
                    <Image
                    style={{ width: 28, height: 28, margin: 20 }}
                    source={require("../../assets/menu.png")}
                    />
                </Pressable>
            </View>
            <ScrollView style={styles.Scroll_view} refreshControl={ <RefreshControl refreshing={refresh} onRefresh={()=>reload()}/>}>
                <View style={styles.images_container}>
                    {cardId && <ProfileSwiper userID={cardId} token={token}/>}
                </View>
                <View style={styles.profile_body}>
                    <View style={styles.body_header}>
                        <Text style={styles.user_name}>{user?.user_name}</Text>
                        <Text style={styles.user_location}>{user.country}</Text>
                        <View style={styles.image_group}>
                            {details?.github_url && <View style={styles.image_button}>
                                <Image style={styles.icons} source={require("../../assets/Github.png")}/>
                            </View>}
                            {details?.linkedin_url && <View style={styles.image_button}>
                                <Image style={styles.icons} source={require("../../assets/LinkedIn.png")}/>
                            </View>}
                        </View>
                    </View>
                    {details?.company_name && <View style={styles.work_container}>
                        <Text style={styles.category_header}>Works At</Text>
                        <Text style={styles.statement}>{details.company_name}</Text>
                    </View>}
                    <View style={styles.skill_container}>
                        <View style={styles.container_header}>
                            <Text style={styles.category_header}>Skills</Text> 
                            {showButtons && <Pressable style={styles.model_button} onPress={()=>showSkillsModel()}>
                                <Text>Edit</Text>
                                <Image source={require("../../assets/Edit-icon.png")}/>
                            </Pressable>}
                        </View>
                        <ScrollView style={styles.scrollable} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.pill_container}>
                                {skills.length > 0 ? (skills.map((skill)=>(
                                    <View key={skill.skill.id} style={styles.pill}>
                                        <Text style={styles.pill_name}>{skill.skill.name}</Text>
                                    </View>
                                ))):(
                                    <Text>no Skills to display</Text>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.bio_container}>
                        <View style={styles.container_header}>
                            <Text style={styles.category_header}>Biography</Text> 
                            {showButtons && <Pressable style={styles.model_button} onPress={()=>showEditingModel()}>
                                <Text>Edit</Text>
                                <Image source={require("../../assets/Edit-icon.png")}/>
                            </Pressable>}
                        </View>
                        <View style={styles.pill_container}>
                            {details?.description ?(<Text style={styles.description}>{details.description}</Text>):(<Text>No description yet.</Text>)}
                        </View>
                    </View>

                    <View style={styles.bio_container}>
                        <View style={styles.container_header}>
                            <Text style={styles.category_header}>Details</Text> 
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
            {showEditModel && 
                <Modal transparent={true} visible={true}>
                    <EditForm isOpen={setShowEditModel} user={user} details={details}/>
                </Modal>
            }
            {showSkillModel && 
                <Modal transparent={true} visible={true}>
                    <SkillForm isOpen={setShowSkillModel} userSkills={skills} setting={setSkills}/>
                </Modal>
            }
            {showMenuModel && 
            <View style={styles.show_menu}>
                <Menu isOpen={setShowMenu} tokenkey={token}/>
            </View>
            }
        </SafeAreaView>
    )
} 

export default Profile;

const styles = StyleSheet.create({
    container: {
        width:windowWidth,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    work_container: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        gap: 10
    },
    Scroll_view: {
        flex: 1,
        width:windowWidth
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
        zIndex:0
    },
    header_title: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    popup_container: {
    },
    show_menu:{
        width: 200,
        height: 60,
        position: 'absolute',
        top: 100,
        right: 0,
        zIndex: 3
    }
});