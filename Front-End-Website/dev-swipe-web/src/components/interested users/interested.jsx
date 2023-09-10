import React from "react";
import styles from './interested.module.css'
import CustomButton from "../custom button/custombutton";
import Card from "../user card/card";

const InterestedTable = () => {

    return(
        <div className={styles.table_container}>
            <div className={styles.table_header}>
                <div>People interested in me</div>
                <CustomButton title={'view all'}/>
            </div>
            <div className={styles.table_body}>
                <Card/>
            </div>
        </div>
    )
}

export default InterestedTable;