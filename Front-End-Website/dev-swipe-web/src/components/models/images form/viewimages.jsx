import React, { useEffect } from "react";
import styles from './viewimages.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import PopUpCard from "../../popup card/popupcard";

const ViewImages = ({isOpen ,imgs}) =>{
    console.log("the users",imgs)
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    // useEffect

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>My images</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel}/>
            </div>
            <div className={styles.popup_body}>
                {imgs.map((img)=>(
                    <div className={styles.image_container}>
                        <input key={img.id} type="checkbox"/>
                        <img src={`${img.image_url}`} alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewImages;