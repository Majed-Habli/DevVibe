import React, { useEffect, useRef } from "react";
import styles from '../../../styles/viewSkill.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import { requestMethods } from "../../../utils/functions/requestMethods.";
import { sendRequest } from "../../../utils/functions/axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../../custom button/custombutton";
import { localStorageAction } from "../../../utils/functions/localStorage";

const ViewSkills = ({isOpen, skills}) =>{

    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>User's skill set</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel} cursor={'pointer'}/>
            </div>
            <div className={styles.popup_body}>
                <div className={styles.body_container}>
                    {skills ?(
                        <div></div>
                    ) : (
                        <div>no skills to show yet</div>
                    )}
                </div>

                <div className={styles.upload_button}>
                    
                </div>
            </div>
        </div>
    )
}

export default ViewSkills;