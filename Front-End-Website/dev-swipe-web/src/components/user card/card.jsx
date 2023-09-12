import React from "react";
import styles from './card.module.css';
import CustomButton from "../custom button/custombutton";

const Card = ({button, data}) =>{

    return(
        <div>
            {data.map((dat)=>(
            <div key={dat.id} className={styles.card_container}>
                <div className={styles.container_left}>
                    <div className={styles.profile_image_container}>
                        {dat.profile_image_url ? (
                            <img src={`${dat.profile_image_url}`} alt="profile image" />
                        ):(
                            <img src='/testuser.png' alt="profile image" />
                        )}
                    </div>
                    <div className={styles.user_name}>{dat.user_name}</div>
                </div>
                {button &&(
                    <CustomButton title={"view profile"}/>
                )}
            </div>
            ))}
        </div>
        

    )
}

export default Card;