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
                        <div>
                            {skills.map((skill)=>(
                                <CustomImageButton key={skill.skill_id} text={`${skill.skill.name}`} width={'fit-content'} height={56} display={'flex'} alignItems={'center'} padding={'0.5rem 1rem'} backgroundColor={'#FCC860'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                            ))}
                        </div>
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