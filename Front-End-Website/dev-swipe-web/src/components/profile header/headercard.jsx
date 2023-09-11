import React from "react";
import styles from './headercard.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";

const HeaderComp = () =>{

    return(
        <div className={styles.container}>
            <div className={styles.top_row}>
                <CustomButton title={'Edit'}/>
            </div>
            <div className={styles.middle_row}>
                <div className={styles.middle_left}>
                    <div className={styles.image_container}>
                        <img src="/Profileimage.png" alt="user profile image" />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.user_name}>Majed habli</div>
                        <div className={styles.user_email}>majedHabli@gmail.com</div>
                    </div>
                </div>
                <div className={styles.middle_right}>
                    <div className={styles.description}>"An over all well rounded developer, with expertise in all phases of development"</div>
                    
                </div>
            </div>
            <div className={styles.bottom_row}>
                <CustomImageButton image_name={'Uploadfile.png'} image_width={36} image_height={36}/>
                <CustomImageButton image_name={'Google.png'} image_width={36} image_height={36}/>
                <CustomImageButton image_name={'Github.png'} image_width={36} image_height={36}/>
                <CustomImageButton image_name={'Linkedin.png'} image_width={36} image_height={36}/>
            </div>
        </div>
    )
}

export default HeaderComp;