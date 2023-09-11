import React from "react";
import styles from './profile.module.css';
import HeaderComp from "../../components/profile header/headercard";
import CustomImageButton from "../../components/custom button/customImageButton";

const Profile = () =>{

    return(
        <div className={styles.page_container}>
            <div className={styles.page_header}>
                <HeaderComp/>
            </div>
            <div className={styles.component_container}>
                <div className={styles.button_container}>
                    <CustomImageButton text={'upload new image'} width={190} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Vector.png"} image_height={16} image_width={16} backgroundColor={'white'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                    <CustomImageButton text={'upload new resume'} width={190} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Vector.png"} image_height={16} image_width={16} backgroundColor={'white'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                </div>

                <div className={styles.componenet_body}>
                    <div className={styles.left_container}>
                        <div className={styles.title}>Skills: </div>
                        <div className={styles.skill_cotainer}>
                            {/* loop here */}
                            <CustomImageButton text={'Blender'} width={213} height={56} display={'flex'} alignItems={'center'} columnGap={'1rem'} backgroundColor={'#FCC860'} padding={'0.5rem .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                        </div>
                    </div>
                    <div className={styles.right_container}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;