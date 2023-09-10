import React from "react";
import styles from './viewall.module.css';

const ViewAllPopUp = () =>{

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>People interested in me</div>
                <img src="/Close.png" alt="close image" />
            </div>
            <div className={styles.popup_body}>
                
            </div>
        </div>
    )
}

export default ViewAllPopUp;