import React, { useEffect, useState, useRef } from "react";
import styles from './headercard.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";
import EditForm from "../models/edit form/editform";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";
import ViewUpload from "../models/view upload/viewUpload";
import SyncLoader from "react-spinners/ClipLoader";

const HeaderComp = ({data}) =>{
    const userType = localStorageAction('user_type');
    const [showButtons, setShowButtons] = useState(false);
    const userId = localStorageAction("user_id")
    
    const [showModel, setShowModel] = useState(false);    
    const [showUploadModel, setShowUploadModel] = useState(false);
    const [loading, setLoading] = useState(false);

    const viewModelUpload = async() =>{
            setShowUploadModel(true)
        }

    const [user, setUser] = useState({});

    const [uploadImage, setUploadImage] = useState('');
    const [tempView, setTempView] = useState('');

    const ViewModel = () =>{
        setShowModel(true);
    }

    const goTo = (url) =>{
        if(!url == ''){
            window.location.href = url
        }
    }

    const downloadPdf = (url) => {
        console.log(url)
        const pdfName = url.split('/').pop();
        const alink = document.createElement('a');
        alink.href = url;
        alink.setAttribute("download", pdfName);
        document.body.appendChild(alink);
        alink.click();
        alink.remove();
    }

    useEffect(()=>{

        setUser({description: userType === 3 ? (data.rec_details?.description || "") : (data.dev_details?.description || ""),
        github_url: userType === 3 ? (data.rec_details?.github_url || "") : (data.dev_details?.github_url || ""),
        linkedin_url: userType === 3 ? (data.rec_details?.linkedin_url || "") : (data.dev_details?.linkedin_url || ""),
        resume: userType === 3 ? data.dev_details?.linkedin_url : "",
        profile_image_url: data.profile_image_url})
    },[data]);

    useEffect(()=>{
        if(`${data.id}` === userId){
            setShowButtons(true);
        }else{
            setShowButtons(false);
        }
    })

    useEffect(()=>{
        if(data.length <= 0){
            setLoading(true)
        }else{
            setLoading(false)
        }
    },[data])

    return(
        <>
        {loading ?(<div className={styles.container}>
            <div className={styles.loading_container}>
                <SyncLoader color="#36d7b7" />
            </div>
        </div>):
        (<div className={styles.container}>
            <div className={styles.top_row}>
                {showButtons && <CustomButton title={'Edit'} image_url={'/Edit.png'} image_width={24} image_height={24} onClick={ViewModel}/>}
            </div>
            <div className={styles.middle_row}>
                <div className={styles.middle_left}>
                    <div className={styles.image_container}>
                        <div className={styles.inner_container}>
                            <CustomImageButton image_width={20} image_height={20} image_name={'profile-upload.png'} onClick={()=>viewModelUpload()}/>
                        </div>
                        

                        {!user.profile_image_url ? (
                            <img src="/default-user.png" alt="user profile image" />
                        ):(
                            <img src={`${user.profile_image_url}`} alt="recipe img" />
                        )}
                    </div>
                    <div className={styles.details}>
                        <div className={styles.user_name}>{data.user_name}</div>
                        <div className={styles.user_email}>{data.email}</div>
                    </div>
                </div>
                <div className={styles.middle_right}>
                    {user.description ?(
                        <div className={styles.description}>{user.description}</div>
                    ):(
                        <div className={styles.description}>"Writing something catchy can help get you noticed"</div>
                    )}
                    
                </div>
            </div>
            <div className={styles.bottom_row}>
                {data.rec_details?.company_name ? (
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Works at:</div>
                        <div className={styles.company_name}>{user.company_name} {data.country}</div>
                    </div>
                ):(
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Lives in:</div>
                        <div className={styles.company_name}>{data.country}</div>
                    </div>
                )}
                {user && userType == 2 && (
                    <div className={styles.flex}>
                        {user.resume && (
                            <CustomImageButton image_name={'Uploadfile.png'} image_width={36} image_height={36} cursor={'pointer'} onClick={()=>{downloadPdf(user.resume)}}/>
                        )}
                        {user.github_url && (
                            <CustomImageButton image_name={'Github.png'} image_width={36} image_height={36} onClick={() => goTo(user.github_url)} cursor={'pointer'}/>
                        )}
                    </div>
                )}
                {user.linkedin_url &&(
                    <CustomImageButton image_name={'Linkedin.png'} image_width={36} image_height={36} onClick={() => goTo(user.linkedin_url)} cursor={'pointer'}/>
                )}
            </div>
            {showModel && (
                <div className={styles.popup_background}>
                    <EditForm isOpen={setShowModel} data={data}/>
                </div>
            )}
            {showUploadModel && (
                <div className={styles.popup_background}>hey
                    <ViewUpload isOpen={setShowUploadModel} type={'1'}/>
                </div>
            )}
        </div>)}
        </>
    )
}

export default HeaderComp;