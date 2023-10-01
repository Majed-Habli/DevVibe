import React, { useEffect, useState } from "react";
import styles from '../../styles/headercard.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";
import SyncLoader from "react-spinners/ClipLoader";

const HeaderComp = ({data, stats}) =>{
    const [blocked, setBlocked] =useState(false)

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

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
        if(!data){
            setLoading(true)
        }else{
            setLoading(false)
        }
    },[data])

    useEffect(()=>{
        if(data.user_type_id == 3){
            setUser({github_url : data.rec_details && data.rec_details.github_url ?data.rec_details.github_url : "",linkedin_url : data.rec_details && data.rec_details.linkedin_url ?data.rec_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }else{
            setUser({github_url : data.dev_details && data.dev_details.github_url ?data.dev_details.github_url : "",linkedin_url : data.dev_details && data.dev_details.linkedin_url ?data.dev_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }

        isBlocked()
    },[data,blocked]);

    return(
        <div className={`${!loading ? styles.body_container: styles.transparent_container}`}>
            <div className={styles.carousel_container}>
                {!loadingImages ? (<CarouselComp value={images} issue={errorImages}/>):
                (<div className={styles.loading_container}>
                    <SyncLoader color="#FCC860" />
                </div>)}
            </div>
            <div className={styles.skill_section}>
                {!loading && <div className={styles.section_title}>Skills</div>}
                <div className={styles.skills_list}>
                    {!loading ? (skills.map((skill)=>(
                            <CustomImageButton key={skill.skill_id} text={`${skill.skill.name}`} width={'fit-content'} height={36} display={'flex'} alignItems={'center'} backgroundColor={'#FCC860'} padding={'0.5rem .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                            ))):(<div className={styles.loading_container}> <SyncLoader color="#FCC860" /></div>)}
                        {errorSkills &&(<div className={styles.loading_container}>{errorSkills}</div>)}
                </div>
            </div>
            <div className={styles.description_text}>
                {!loading &&<div className={styles.section_title}>Biography</div>}
                <div className={styles.description}>{userData.description}</div>
            </div>
        </div>
    )
}

export default HeaderComp;