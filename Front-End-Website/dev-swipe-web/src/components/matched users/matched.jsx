import React, { useEffect, useState } from "react";
import styles from './matched.module.css';
import CustomButton from "../custom button/custombutton";
import Card from "../user card/card";
import CustomImageButton from "../custom button/customImageButton";
import { localStorageAction } from "../../utils/functions/localStorage";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";

const MatchedTable = () =>{
    const [users, setUsers] = useState([]);
    const [error,setError] = useState('')

    const getMatched = async () =>{
        const token = localStorageAction("token");
        const userId = localStorageAction("user_id");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "/user/developer/view_matches",
                    method: requestMethods.GET,
                });
                const data = response;
                console.log("hello there", response)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data;
                    console.log("here is the onj",obj)
                    setUsers(obj);

                }else{
                    setError("failed to get user data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    useEffect(()=>{
        getMatched();
    },[]);
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
                        {users.map((user)=>(
                            <div key={user.id} className={styles.inner_table_row}>
                                <div className={styles.index}>1</div>
                                <div className={styles.user_card}>
                                    <div className={styles.card_container}>
                                        <div className={styles.container_left}>
                                            <div className={styles.profile_image_container}>
                                                {!user.profile_image_url ? (
                                                    <img src={`${user.matched_with.profileImageUrl}`} alt="profile image" /> 
                                                ):(
                                                    <img src="/testuser.png" alt="profile image" />
                                                )}
                                            </div>
                                            <div className={styles.user_name}>{user.matched_with.user_name}</div>
                                        </div>
                                    </div>
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
                                    <CustomImageButton image_name={'Profile.png'} width={37} height={37} image_width={27} image_height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} backgroundColor={"#EEEEEE"}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchedTable;