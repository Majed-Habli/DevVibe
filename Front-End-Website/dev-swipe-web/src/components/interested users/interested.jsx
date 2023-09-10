import React from "react";
import styles from './interested.module.css'
import CustomButton from "../custom button/custombutton";

const InterestedTable = () => {

    return(
        <div className={styles.table_container}>
            <div className={styles.table_header}>
                <div>People interested in me</div>
                <CustomButton title={'view all'}/>
            </div>
            <div className={styles.table_body}></div>
        </div>
    )
}

export default InterestedTable;