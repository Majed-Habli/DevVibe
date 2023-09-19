import React, { useEffect, useState } from "react";
import styles from './viewall.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import PopUpCard from "../../popup card/popupcard";

const ViewAllPopUp = ({isOpen ,users}) =>{
    console.log("the users",users)
    const [userData, setUserData] = useState([]);
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    const filtering = (id) =>{
        const filtered = userData.filter((user)=>{
            return user.id != id
        })
        setUserData(filtered);
    }

    useEffect(()=>{
        setUserData(users);
        console.log(users[0].id)
    },[users])

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>People interested in me</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel} cursor={'pointer'}/>
            </div>
            <div className={styles.popup_body}>
                {userData.map((user)=>(
                    <PopUpCard key={user.id} user={user} fun={filtering}/>
                ))}
            </div>
        </div>
    )
}

export default ViewAllPopUp;