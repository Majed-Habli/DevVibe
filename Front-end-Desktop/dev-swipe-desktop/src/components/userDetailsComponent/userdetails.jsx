import React, { useEffect, useState } from "react";
import styles from '../../styles/userdetails.module.css';
import SyncLoader from "react-spinners/ClipLoader";
import CarouselComp from "../carousel/imagescarousel";

const UserDetails = ({data, images, issue}) =>{

    const [loading, setLoading] = useState(false);
    const [userDescription, setDescription] = useState([]);
    const [loadingImages, setLoadingImages] = useState(false);

    useEffect(()=>{
        if(!data){
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }else{
            setLoading(false)
        }
        if(!images){
            setLoadingImages(true)
            setTimeout(() => {
                setLoadingImages(false)
            }, 3000)
        }else{
            setLoadingImages(false)
        }
    },[data,images])

    useEffect(()=>{
        if(data){
            setDescription({description: data?.dev_details?.description || data?.rec_details?.description})
        }
    },[data])

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
                <div className={styles.description}>{userDescription.description}</div>
            </div>
        </div>
    )
}

export default UserDetails;