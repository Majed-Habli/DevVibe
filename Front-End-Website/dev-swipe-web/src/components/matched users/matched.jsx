import React from "react";
import styles from './matched.module.css';
import CustomButton from "../custom button/custombutton";
import Card from "../user card/card";
import CustomImageButton from "../custom button/customImageButton";

const MatchedTable = () =>{

    return(
        <div className={styles.matched_container}>
            <div className={styles.table_header}>Matched with</div>
            <div className={styles.table_body}>
                <div className={styles.inner_table_container}>
                    <div className={styles.inner_table_header}>
                        <div className={styles.space}></div>
                        <div className={`${styles.cell} ${styles.width_username}`}>Developer</div>
                        <div className={`${styles.cell} ${styles.width_skill}`}>Skills</div>
                        <div className={`${styles.cell} ${styles.width_profile}`}>Profile</div>
                    </div>
                    <div className={styles.inner_table_body}>
                        <div className={styles.inner_table_row}>
                            <div className={styles.index}>1</div>
                            <div className={styles.user_card}>
                                <Card button={false}/>
                            </div>
                            <div className={styles.skills_container}>
                                <div className={styles.content}>
                                    <div className={styles.pill}>blender</div>
                                    <div className={styles.pill}>blender</div>
                                    <div className={styles.pill}>blender</div>
                                    <div className={styles.pill}>blender</div>
                                    <div className={styles.pill}>blender</div>
                                </div>
                            </div>
                            <div className={styles.profile_button}>
                                <CustomImageButton image_name={'Profile.png'} width={37} height={37} image_width={27} image_hieght={27} display={"flex"} alignItems={"center"} justifyContent={"center"} backgroundColor={"#EEEEEE"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchedTable;