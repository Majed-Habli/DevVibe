import React, { useEffect, useState } from "react";
import styles from './profile.module.css';
import HeaderComp from "../../components/profile header/headercard";
import CustomImageButton from "../../components/custom button/customImageButton";
import CarouselComp from "../../components/carousel/user images/carousel";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";
import { useParams } from "react-router-dom";
import ViewImages from "../../components/models/images form/viewimages";
import ViewUpload from "../../components/models/view upload/viewUpload";
import ViewUploadResume from "../../components/models/view upload copy/viewUpload";
import SyncLoader from "react-spinners/ClipLoader";
const Profile = () =>{
    const [errorSkills, setErrorSkills] = useState('');
    const [errorImages, setErrorImages] = useState('');
    
    const [showModel, setShowModel] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [showUploadModel, setShowUploadModel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingImages, setLoadingImages] = useState(false);
    const [showUploadResume, setShowUploadResume] = useState(false);
    const [skills, setSkills] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState([]);
    const [userData, setUserData] = useState([]);
    const params = useParams();
    const userId = localStorageAction("user_id");

    const getSkills = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/view_user_skills/${params.id}`,
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    if(data.data == ''){
                        setErrorSkills(`user, has no skills yet.`)
                    }

                    const obj = data.data;
                    setSkills(obj);
                }else{
                    setError("something went wrong");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Fetching skills failed:", error);
          }
    }

    const getUser = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/profile/${params.id}`,
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data[0];
                    setUser(obj);

                }else{
                    setError("failed to get user data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Api return with a fail:", error);
          }
    }

    const getImages = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/retrieve_user_images/${params.id}`,
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    if(data.data == ''){
                        setErrorImages(`user, has no pics yet.`)
                    }
                    const obj = data.data;
                    setImages(obj);

                }else{
                    setError("something went wrong!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
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
        getUser();
        getSkills();
        getImages();
    },[params.id]);

    useEffect(()=>{
        if(params.id === userId){
            setShowButtons(true);
        }else{
            setShowButtons(false);
        }
    },[params.id])

    useEffect(()=>{
        if(!user.length > 0){
            setLoading(true)
        }else{
            setLoading(false)
        }

        if(images.length <= 0){
            setLoadingImages(true)
        }else{
            setLoadingImages(false)
        }

        if(skills.length <= 0){
            setLoading(true)
        }else{
            setLoading(false)
        }
    },[user,images, skills])

    useEffect(()=>{
        setUserData({description: user.user_type_id === 3 ? (user.rec_details?.description || "") : (user.dev_details?.description || "")})
    },[user]);

    return(
        <div className={styles.page_container}>
            <div className={styles.page_header}></div>
            <div className={styles.component_body}>
                <div className={styles.header}>
                    <HeaderComp data={user} images={images}/>
                </div>
                <div className={styles.body_container}>
                    <div className={styles.carousel_container}>
                        {!loadingImages ? (<CarouselComp value={images} issue={errorImages}/>):
                        (<div className={styles.loading_container}>
                            <SyncLoader color="#36d7b7" />
                        </div>)}
                    </div>
                    <div className={styles.description_text}>
                        <div className={styles.section_title}>Biography</div>
                        <div className={styles.description}>{userData.description}</div>
                    </div>
                </div>
            </div>
            {/* <div className={styles.component_container}>
                <div className={styles.componenet_body}>
                    <div className={styles.left_container}>
                        <div className={styles.title}>Skills: </div>
                        <div className={styles.skill_cotainer}>
                            {!loading ? (skills.map((skill)=>(
                                <CustomImageButton key={skill.skill_id} text={`${skill.skill.name}`} width={213} height={56} display={'flex'} alignItems={'center'} columnGap={'1rem'} backgroundColor={'#FCC860'} padding={'0.5rem .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                            ))):(<div className={styles.loading_container}> <SyncLoader color="#36d7b7" /></div>)}
                            {errorSkills &&(<div className={styles.loading_container}>{errorSkills}</div>)}
                        </div>
                    </div>
                    <div className={styles.right_container}>
                        {!loadingImages ? (<CarouselComp value={images} issue={errorImages}/>):
                        (<div className={styles.loading_container}>
                            <SyncLoader color="#36d7b7" />
                        </div>)}
                    </div>
                </div>
            </div> */}

            {/* {showModel && (
                <div className={styles.popup_background}>
                    <ViewImages isOpen={setShowModel} imgs={images}/>
                </div>
            )}

            {showUploadModel && (
                <div className={styles.popup_background}>
                    <ViewUpload isOpen={setShowUploadModel} type={'2'} />
                </div>
            )}

            {showUploadResume && (
                <div className={styles.popup_background}>
                    <ViewUploadResume isOpen={setShowUploadResume}/>
                </div>
            )} */}
        </div>
    )
}

export default Profile;