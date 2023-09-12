import React, { useEffect, useState } from "react";
import styles from './profile.module.css';
import HeaderComp from "../../components/profile header/headercard";
import CustomImageButton from "../../components/custom button/customImageButton";
import CarouselComp from "../../components/carousel/carousel";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";

const Profile = () =>{
    const [error, setError] = useState('');
    const [skills, setSkills] = useState([]);
    const [user, setUser] = useState([]);

    const getSkills = async () =>{
        const token = localStorageAction("token");
        const userId = localStorageAction("user_id");
        // console.log("user id ", userId)

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/view_user_skills/${userId}`,
                    method: requestMethods.GET,
                });
                const data = response;
                console.log("res", response)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data;
                    setSkills(obj);

                }else{
                    setError("no skills exist!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Fetching skills failed:", error);
          }
    }

    const getUser = async () =>{
        const token = localStorageAction("token");
        const userId = localStorageAction("user_id");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/profile/${userId}`,
                    method: requestMethods.GET,
                });
                const data = response;
                console.log("hello ther", response)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data[0];
                    console.log("her is the onj",obj)
                    setUser(obj);

                }else{
                    setError("failed to get user data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    useEffect(()=>{
        getSkills();
        getUser();
    },[]);

    return(
        <div className={styles.page_container}>
            <div className={styles.page_header}></div>
            <div className={styles.header_comp}>
                <div className={styles.button_container}>
                    
                </div>
                <div className={styles.head}>
                    <HeaderComp data={user}/>
                </div>
                <div className={styles.button_container}>
                    <CustomImageButton text={'upload new image'} width={190} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Vector.png"} image_height={16} image_width={16} backgroundColor={'white'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                    <CustomImageButton text={'upload new resume'} width={190} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Vector.png"} image_height={16} image_width={16} backgroundColor={'white'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                </div>
            </div>
            <div className={styles.component_container}>
                <div className={styles.componenet_body}>
                    <div className={styles.left_container}>
                        <div className={styles.title}>Skills: </div>
                        <div className={styles.skill_cotainer}>
                            {skills.map((skill)=>(
                                <CustomImageButton key={skill.skill_id} text={`${skill.skill.name}`} width={213} height={56} display={'flex'} alignItems={'center'} columnGap={'1rem'} backgroundColor={'#FCC860'} padding={'0.5rem .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                            ))}
                        </div>
                    </div>
                    <div className={styles.right_container}>
                        <CarouselComp/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;