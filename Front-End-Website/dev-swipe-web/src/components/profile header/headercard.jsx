import React, { useState } from "react";
import styles from './headercard.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";
import EditForm from "../models/edit form/editform";

const HeaderComp = ({data}) =>{

    const [showModel, setShowModel] = useState(false);

    const ViewModel = () =>{
        setShowModel(true);
    }

    const goTo = (url) =>{
        window.location.href = url
    }

    return(
        <div className={styles.container}>
            <div className={styles.top_row}>
                <CustomButton title={'Edit'} onClick={ViewModel}/>
            </div>
            <div className={styles.middle_row}>
                <div className={styles.middle_left}>
                    <div className={styles.image_container}>
                        <img src="/Profileimage.png" alt="user profile image" />
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
                {!data.user_type_id == 3 && (
                    <div className={styles.flex}>
                        <CustomImageButton image_name={'Uploadfile.png'} image_width={36} image_height={36} onClick={() => goTo(data.rec_details.linkedin_url)} />
                        <CustomImageButton image_name={'Github.png'} image_width={36} image_height={36} onClick={() => goTo(data.rec_details.github_url)} />
                    </div>
                )}
                <CustomImageButton image_name={'Linkedin.png'} image_width={36} image_height={36} onClick={() => goTo(data.rec_details.linkedin_url)}/>
            </div>
            {showModel && (
                <div className={styles.popup_background}>
                    <EditForm isOpen={setShowModel}/>
                </div>
            )}
        </div>
    )
}

export default HeaderComp;