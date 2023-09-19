import React, { useEffect, useState } from "react";
import styles from './headercard.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";
import EditForm from "../models/edit form/editform";
import { localStorageAction } from "../../utils/functions/localStorage";

const HeaderComp = ({data}) =>{
    const userType = localStorageAction('user_type');
    const [showButtons, setShowButtons] = useState(false);
    const userId = localStorageAction("user_id")
    
    const [showModel, setShowModel] = useState(false);
    const [user, setUser] = useState({});

    const ViewModel = () =>{
        setShowModel(true);
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
    },[data]);

    useEffect(()=>{
        if(`${data.id}` === userId){
            setShowButtons(true);
        }else{
            setShowButtons(false);
        }
    })

    return(
        <div className={styles.container}>
            <div className={styles.top_row}>
                {showButtons && <CustomButton title={'Edit'} onClick={ViewModel}/>}
            </div>
            <div className={styles.middle_row}>
                <div className={styles.middle_left}>
                    <div className={styles.image_container}>
                        {!user.profile_image_url ? (
                            <img src="/default-user.png" alt="user profile image" />
                        ):(
                            <img src={`${user.profile_image_url}`} alt="recipe img" />
                        )}
                    </div>
                    <div className={styles.details}>
                        <div className={styles.user_name}>{data.user_name}</div>
                        <div className={styles.user_email}>{data.email}</div>
                    </div>
                </div>
                <div className={styles.middle_right}>
                    {data.rec_details ?(
                        <div className={styles.description}>{data.rec_details.description}</div>
                    ):(
                        <div className={styles.description}>"Writing something catchy can help get you noticed"</div>
                    )}
                    
                </div>
            </div>
            <div className={styles.bottom_row}>
                {data.rec_details?.company_name ? (
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Works at:</div>
                        <div className={styles.company_name}>{data.rec_details.company_name} ,{data.country}</div>
                    </div>
                ):(
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Lives in:</div>
                        <div className={styles.company_name}>{data.country}</div>
                    </div>
                )}
                {user && userType == 2 && (
                    <div className={styles.flex}>
                        {/* {user.resume && (
                            <CustomImageButton image_name={'Uploadfile.png'} image_width={36} image_height={36} onClick={() => goTo(user.linkedin_url)} />
                        )} */}
                        {user.github_url && (
                            <CustomImageButton image_name={'Github.png'} image_width={36} image_height={36} onClick={() => goTo(user.github_url)} />
                        )}
                    </div>
                )}
                {user.linkedin_url &&(
                    <CustomImageButton image_name={'Linkedin.png'} image_width={36} image_height={36} onClick={() => goTo(user.linkedin_url)}/>
                )}
            </div>
            {showModel && (
                <div className={styles.popup_background}>
                    <EditForm isOpen={setShowModel} data={data}/>
                </div>
            )}
        </div>
    )
}

export default HeaderComp;