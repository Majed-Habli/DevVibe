import React, { useState } from "react";
import styles from './interested.module.css'
import CustomButton from "../custom button/custombutton";
import Card from "../user card/card";
import PopUpCard from "../popup card/popupcard";

const InterestedTable = () => {
    const [showModel, setShowModel] = useState(false);

    const veiwAll = async () =>{
        setShowModel(true);
    }

    return(
        <div className={styles.table_container}>
            <div className={styles.table_header}>
                <div>People interested in me</div>
                <CustomButton title={'view all'} onClick={veiwAll}/>
            </div>
            <div className={styles.table_body}>
                <Card button={true}/>
            </div>
            {showModel && (
                <PopUpCard isOpen={setShowModel}/>
            )}
        </div>
    )
}

export default InterestedTable;