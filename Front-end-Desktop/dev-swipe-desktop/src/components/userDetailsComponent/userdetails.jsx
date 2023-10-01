import React, { useEffect, useState } from "react";
import styles from '../../styles/userdetails.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";
import SyncLoader from "react-spinners/ClipLoader";

const UserDetails = ({data, images, issue}) =>{

    const [loading, setLoading] = useState(false);
    const [loadingImages, setLoadingImages] = useState(false);

    useEffect(()=>{
        if(!data){
            setLoading(true)
        }else{
            setLoading(false)
        }
        if(!images){
            setLoadingImages(true)
        }else{
            setLoadingImages(false)
        }
    },[data,images])

    return(
        <div className={`${!loading ? styles.body_container: styles.transparent_container}`}>
            <div className={styles.carousel_container}>
                {!loadingImages ? (<CarouselComp value={images} issue={issue}/>):
                (<div className={styles.loading_container}>
                    <SyncLoader color="#FCC860" />
                </div>)}
            </div>
            <div className={styles.description_text}>
                {!loading &&<div className={styles.section_title}>Biography</div>}
                <div className={styles.description}>{data.description}</div>
            </div>
        </div>
    )
}

export default UserDetails;