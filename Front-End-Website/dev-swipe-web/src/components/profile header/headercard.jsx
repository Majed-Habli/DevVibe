import React, { useEffect, useState, useRef } from "react";
import styles from './headercard.module.css';
import CustomImageButton from "../custom button/customImageButton";
import EditForm from "../models/edit form/editform";
import { localStorageAction } from "../../utils/functions/localStorage";
import ViewUpload from "../models/view upload/viewUpload";
import SyncLoader from "react-spinners/ClipLoader";
import ViewImages from "../../components/models/images form/viewimages";
import ViewUploadResume from "../../components/models/view upload copy/viewUpload";

const HeaderComp = ({data, images}) =>{
    const userType = localStorageAction('user_type');
    const [showButtons, setShowButtons] = useState(false);
    const userId = localStorageAction("user_id")
    
    const [showModel, setShowModel] = useState(false);    
    const [showUploadModel, setShowUploadModel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModelImages, setShowModelImages] = useState(false);
    const [showUploadImages, setShowUploadImagesModel] = useState(false);
    const [showUploadResume, setShowUploadResume] = useState(false);
    
    const showUploadImagesModel = async() =>{
        setShowUploadImagesModel(true)
    }
    
    const [user, setUser] = useState({});

    const ViewModelImages = () =>{
        setShowModelImages(true);
    }

    const goTo = (url) =>{
        if(!url == ''){
            window.location.href = url
        }
    }

    const downloadPdf = (url) => {
        const pdfName = url.split('/').pop();
        const alink = document.createElement('a');
        alink.href = url;
        alink.setAttribute("download", pdfName);
        document.body.appendChild(alink);
        alink.click();
        alink.remove();
    }

    const viewModel = async() =>{
        setShowModel(true)
    }
    const viewModelUpload = async() =>{
        setShowUploadModel(true)
    }
    const viewModelUploadResume = async() =>{
        setShowUploadResume(true)
    }

    useEffect(()=>{
        if(data){
            setUser({github_url: data.rec_details?.github_url  || data.dev_details?.github_url ,
            linkedin_url: data.rec_details?.linkedin_url  || data.dev_details?.linkedin_url,
            description: data?.dev_details?.description || data?.rec_details?.description,
            resume: userType === 2 && data.dev_details?.resume })
        }
    },[data]);

    console.log(data.rec_details)


    useEffect(()=>{
        if(`${data.id}` === userId){
            setShowButtons(true);
        }else{
            setShowButtons(false);
        }
    },[data])

    useEffect(()=>{
        if(data.length <= 0){
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }else{
            setLoading(false)
        }
    },[data])

    return(
        <>
        <div className={styles.container}>
            {!loading ?(<div className={styles.container_body}>
                <div className={styles.image_container}>
                    <div className={styles.inner_container}>
                        <CustomImageButton image_width={20} image_height={20} cursor={'hover'} image_name={'profile-upload.png'} onClick={()=>viewModelUpload()}/>
                    </div>
                    {!data.profile_image_url ? (
                        <img src="/default-user.png" alt="user profile image" />
                    ):(
                        <img src={`${data.profile_image_url}`} alt="recipe img" />
                    )}
                </div>
                <div className={styles.details}>
                    <div className={styles.detail_group_one}>
                        <div className={styles.user_name}>{data.user_name}</div>
                        <div className={styles.user_email}>{data.email}</div>
                    </div>
                    {data.rec_details?.company_name ? (
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Works at:</div>
                        <div className={styles.company_name}>{user.company_name} {data.country}</div>
                    </div>
                    ):(data.country &&(
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Lives in:</div>
                        <div className={styles.company_name}>{data.country}</div>
                    </div>
                    ))
                    }
                </div>
                <div className={styles.socials_container}>
                {user && userType == 2 && (
                    <div>
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
                {showButtons && <div className={styles.button_container}>
                    <CustomImageButton text={'Edit Profile'} width={'100%'} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Add-icon.png"} image_height={16} image_width={16} backgroundColor={'black'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'} color={'white'} onClick={()=>viewModel()} cursor={'pointer'}/>

                    <CustomImageButton text={'View Images'} width={'100%'} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Add-icon.png"} image_height={16} image_width={16} backgroundColor={'black'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'} color={'white'} onClick={()=>ViewModelImages()} cursor={'pointer'}/>

                    <CustomImageButton text={'Upload New Image'} width={'100%'} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Add-icon.png"} image_height={16} image_width={16} backgroundColor={'black'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'} color={'white'} onClick={()=>showUploadImagesModel()} cursor={'pointer'}/>

                
                    <CustomImageButton text={'Upload New Resume'} width={'100%'} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Add-icon.png"} image_height={14} image_width={14} backgroundColor={'black'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'} color={'white'} cursor={'pointer'} onClick={()=>viewModelUploadResume()}/>
                </div>}
            </div>):(<div className={styles.loading}>
                <div>
                    <SyncLoader color="#FCC860" />
                </div>
            </div>)}
            {showModel && (
                <div className={styles.popup_background}>
                    <EditForm isOpen={setShowModel} data={user} user={data}/>
                </div>
            )}
            {showUploadModel && (
                <div className={styles.popup_background}>
                    <ViewUpload isOpen={setShowUploadModel} type={'1'}/>
                </div>
            )}
            {showModelImages && (
                <div className={styles.popup_background}>
                    <ViewImages isOpen={setShowModelImages} imgs={images}/>
                </div>
            )}

            {showUploadImages && (
                <div className={styles.popup_background}>
                    <ViewUpload isOpen={setShowUploadImagesModel} type={'2'} />
                </div>
            )}

            {showUploadResume && (
                <div className={styles.popup_background}>
                    <ViewUploadResume isOpen={setShowUploadResume}/>
                </div>
            )}
        </div>
        </>
    )
}

export default HeaderComp;