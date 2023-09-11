import React from "react";
import styles from './profile.module.css';
import HeaderComp from "../../components/profile header/headercard";

const Profile = () =>{

    return(
        <div className={styles.page_container}>
            <div className={styles.page_header}>
                <HeaderComp/>
            </div>
            <div className={styles.component_container}>
            </div>
        </div>
    )
}

export default Profile;