import React, { useEffect, useState } from "react";
import styles from '../../styles/headercard.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";

const HeaderComp = ({data}) =>{
    const userType = localStorageAction('user_type');
    const [blocked, setBlocked] =useState(false)

    const [user, setUser] = useState({});
    const userID = data.id;

    const BlockPerson = async () =>{

        try {
            const response = await sendRequest({
                route: "/user/admin/deny_access",
                method: requestMethods.POST,
                body:{user_id: userID,
                    }
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
                setBlocked(true);
            }else{
                setBlocked(false);
            }
            
          } catch (error) {
            console.error("failed to call the api:", error);
          }
    }

    const isBlocked = async () =>{

        try {
            const response = await sendRequest({
                route: "/user/admin/is_blocked",
                method: requestMethods.POST,
                body:{id: userID,
                    }
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
                setBlocked(true);
            }else{
                setBlocked(false);
            }
            
          } catch (error) {
            console.error("failed to call the api:", error);
          }
    }

    const goTo = (url) =>{
        if(!url == ''){
            window.location.href = url
        }
    }

    useEffect(()=>{
        if(userType == 3){
            setUser({github_url : data.rec_details && data.rec_details.github_url ?data.rec_details.github_url : "",linkedin_url : data.rec_details && data.rec_details.linkedin_url ?data.rec_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }else{
            setUser({github_url : data.dev_details && data.dev_details.github_url ?data.dev_details.github_url : "",linkedin_url : data.dev_details && data.dev_details.linkedin_url ?data.dev_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }

        isBlocked()
    },[data,blocked]);


    return(
        <div className={styles.container}>
            {/* <div className={styles.middle_row}>
                    <div className={styles.image_container}>
                        {!user.profile_image_url ? (
                            <img src="/default-user.png" alt="user-profile-image" />
                        ):(
                            <img src={`${user.profile_image_url}`} alt="profile-img" />
                        )}
                <div className={styles.middle_right}>
                    {/* {data.rec_details ?(
                        <div className={styles.description}>{data.rec_details.description}</div>
                    ):(
                        <div className={styles.description}>"Writing something catchy can help get you noticed"</div>
                    )} */}

                {/* {user && userType == 2 && ( */}
                    {/* // <div className={styles.flex}> */}
                        {/* {user.resume && (
                            <CustomImageButton image_name={'Uploadfile.png'} image_width={36} image_height={36} onClick={() => goTo(user.linkedin_url)} />
                        )} */}
                        {/* {user.github_url && (
                            <CustomImageButton image_name={'Github.png'} image_width={36} image_height={36} onClick={() => goTo(user.github_url)} />
                        )} */}
                    {/* </div> */}
                {/* )} */}
                {/* {user.linkedin_url &&(
                    <CustomImageButton image_name={'Linkedin.png'} image_width={36} image_height={36} onClick={() => goTo(user.linkedin_url)}/>
                )} */}
            <div className={styles.header_section}>
                {user.profile_image_url ? (<img src={`${data.profile_image_url}`} alt="profile-image" />) : (
                    <div>
                        <img src="/default-user.png" alt="profile-image" />
                    </div>
                )}
                <div className={styles.profile_username}>{data.user_name}</div>
                {user.user_type_id === 2 ? (<div className={styles.profile_role}>Developer</div>):(
                    <div className={styles.profile_role}>Recruiter</div>
                )}
                <div className={styles.body_section}>
                    <div className={styles.user_details}>Email: {data.email}</div>
                    <div className={styles.user_details}>Lives at: {data.country}</div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.button_container}>
                    {blocked ? (
                        <CustomButton title={'Un Block'} backgroundColor={'#DC3545'} color={'white'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} width={108} height={31} fontWeight={'bold'} onClick={()=>BlockPerson()}/>
                    ):(
                        <CustomButton title={'Block'} backgroundColor={'#DC3545'} color={'white'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} width={108} height={31} fontWeight={'bold'} onClick={()=>BlockPerson()}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeaderComp;