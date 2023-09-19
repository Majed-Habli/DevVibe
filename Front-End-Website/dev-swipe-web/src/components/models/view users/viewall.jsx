import React, { useEffect, useState } from "react";
import styles from './viewall.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import PopUpCard from "../../popup card/popupcard";

const ViewAllPopUp = ({isOpen ,users}) =>{
    console.log("the users",users)
    // const [userData, setUserData] = useState([]);
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    // useEffect(()=>{
    //     setUserData(users);
    // },[users])

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>People interested in me</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel} cursor={'pointer'}/>
            </div>
            <div className={styles.popup_body}>
                {users.map((user)=>(
                    <PopUpCard key={user.id} user={user}/>
                ))}
            </div>
        </div>
    )
}

export default ViewAllPopUp;