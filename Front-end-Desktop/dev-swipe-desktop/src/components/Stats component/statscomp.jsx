import React, { useEffect, useState } from "react";
import styles from '../../styles/headercard.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";
import SyncLoader from "react-spinners/ClipLoader";

const StatsComp = ({data, stats}) =>{
    const [blocked, setBlocked] =useState(false)

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const userID = data.id;
    // const userId = localStorageAction("user_id")

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
        if(data.user_type_id == 3){
            setUser({github_url : data.rec_details && data.rec_details.github_url ?data.rec_details.github_url : "",linkedin_url : data.rec_details && data.rec_details.linkedin_url ?data.rec_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }else{
            setUser({github_url : data.dev_details && data.dev_details.github_url ?data.dev_details.github_url : "",linkedin_url : data.dev_details && data.dev_details.linkedin_url ?data.dev_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }

        isBlocked()
    },[data,blocked]);

    // useEffect(()=>{
    //     if(`${data.id}` === userId){
    //         setShowButtons(true);
    //     }else{
    //         setShowButtons(false);
    //     }
    // },[data])

    return(           
        <>
        <div className={styles.container}>
            {!loading ?(
            <div className={styles.container_body}>
                <div className={styles.top_section}>
                    <div className={styles.section_header}>Stats</div>
                    <div className={styles.body_section}>
                        <div className={styles.user_details}>
                            <div>Likes</div>
                            <div>{stats.liked_count}</div>
                        </div>
                        <div className={styles.user_details}>
                            <div>Matches</div>
                            <div>{stats.matched_count}</div>
                        </div>
                        <div className={styles.user_details}>
                            <div>Views</div>
                            <div>{stats.view_count}</div>
                        </div>
                        <div className={styles.user_details}>
                            <div>Skips</div>
                            <div>{stats.skipped_count}</div>
                        </div>
                        <div className={styles.line}></div>
                    </div>
                </div>

                <div className={styles.bottom_section}>
                    <div className={styles.section_header}>Skills</div>
                    <div className={styles.skills_container}>
                        {data.map((skill)=>(
                            <div key={skill.id} className={styles.box}>
                                <div key={skill.id}> {skill.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>):(<div className={styles.loading}>
                <div>
                    <SyncLoader color="#FCC860" />
                </div>
            </div>)}
        </div>
        </>
    )
}

export default StatsComp;