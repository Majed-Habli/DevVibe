import React, { useState } from "react";
import styles from './popupcard.module.css';
import CustomImageButton from "../custom button/customImageButton";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import Tooltip from '@mui/material/Tooltip';


const PopUpCard = ({user, fun}) =>{
    const date = user.created_at;
    const readableDate = date.toLocaleString().split('T')[0];
    const [message, setMessage] = useState('')
    const swipe = async ({id,value}) =>{
 
        try {
            const response = await sendRequest({
                route: "/user/developer/swipe",
                method: requestMethods.POST,
                body:{swiped_user_id: `${id}`,
                    is_liked: `${value}`,
                    }
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
                setMessage('liked')
                fun(id)
            }else{
                setMessage('disliked');
            }
            
          } catch (error) {
            console.error("swiping failed:", error);
          }


    }
    return(
        <div className={styles.container}>
            <div className={styles.container_left}>
                <div className={styles.user_profile}>
                    {user.profile_image_url ? (<img src={`${user.profile_image_url}`} alt="profile image" />):(
                        <img src="/default-user.png"/>
                    )}
                </div>
                <div className={styles.user_detail}>
                    <div className={styles.user_name}>{user.user_name}</div>
                    <div className={styles.user_date}>{readableDate}</div>
                </div>
            </div>
            <div className={styles.container_right}>
            <Tooltip title="pass" placement="top">
                <div>
                    <CustomImageButton image_name={"arrow-left.png"} width={23} height={23} image_width={20} image_height={20} display={"flex"} alignItems={"center"} justifyContent={"center"} backgroundColor={"#F47878"}onClick={()=>swipe({id:user.id, value: 0})} cursor={'pointer'}/>
                </div>
            </Tooltip>
            <Tooltip title="connect" placement="top">
                <div>
                    <CustomImageButton image_name={"arrow-right.png"} width={23} height={23} image_width={20} image_height={20} display={"flex"} alignItems={"center"} justifyContent={"center"} backgroundColor={"#A7E392"}onClick={()=>swipe({id:user.id, value: 1})} cursor={'pointer'}/>
                </div>
            </Tooltip>
                
            </div>
        </div>
    )
}

export default PopUpCard;