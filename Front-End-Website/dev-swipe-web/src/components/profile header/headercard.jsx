import React, { useEffect, useState, useRef } from "react";
import styles from './headercard.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";
import EditForm from "../models/edit form/editform";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";

const HeaderComp = ({data}) =>{
    const userType = localStorageAction('user_type');
    const [showButtons, setShowButtons] = useState(false);
    const userId = localStorageAction("user_id")
    
    const [showModel, setShowModel] = useState(false);
    const [user, setUser] = useState({});

    const [uploadImage, setUploadImage] = useState('');
    const [tempView, setTempView] = useState('');

    const postImage = async () =>{

        try {
            const response = await sendRequest({
                route: "/user/developer/upload_profile_pic/",
                method: requestMethods.POST,
                body:{image: uploadImage,
                    type:"png",
                    }
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
                window.location.href = `/dashboard/profile/${data.id}`;
            }
            
          } catch (error) {
            console.error("api calling failed:", error);
          }
    }

    const fileRef = useRef(null);
    const handleInput = (e) => {
        if (e.target.files.length > 0) {
            function getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            }
            getBase64(e.target.files[0]).then((data) => {
                setTempView(data)
                const refStringArray = data.split(",");
                refStringArray.shift();
                const result = refStringArray.join('');
                setUploadImage(result);
            });
        }
    };

    const ViewModel = () =>{
        setShowModel(true);
    }

    const goTo = (url) =>{
        if(!url == ''){
            window.location.href = url
        }
    }

    useEffect(()=>{
        if(userType == 3){
            setUser({github_url : data.rec_details && data.rec_details.github_url ?data.rec_details.github_url : "",linkedin_url : data.rec_details && data.rec_details.linkedin_url ?data.rec_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }else{
            setUser({github_url : data.dev_details && data.dev_details.github_url ?data.dev_details.github_url : "",linkedin_url : data.dev_details && data.dev_details.linkedin_url ?data.dev_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }
    },[data]);

    useEffect(()=>{
        if(`${data.id}` === userId){
            setShowButtons(true);
        }else{
            setShowButtons(false);
        }
    })

    return(
        <div className={styles.container}>
            <div className={styles.top_row}>
                {showButtons && <CustomButton title={'Edit'} onClick={ViewModel}/>}
            </div>
            <div className={styles.middle_row}>
                <div className={styles.middle_left}>
                    <div className={styles.image_container}>
                        <div className={styles.inner_container}>
                            <input ref={fileRef} type="file" name="upload_file[]" id="upload_file" className="{styles.form_control}"  onChange ={handleInput} hidden/>
                            <label className={styles.upload_label} htmlFor="upload_file" > hi
                            </label>
                            <div className={styles.upload} onClick={()=>{postImage()}}> </div>
                            {/* <CustomButton title={''} width={10} height={10} backgroundColor={'#FCC860'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4}/> */}
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
                    {data.rec_details ?(
                        <div className={styles.description}>{data.rec_details.description}</div>
                    ):(
                        <div className={styles.description}>"Writing something catchy can help get you noticed"</div>
                    )}
                    
                </div>
            </div>
            <div className={styles.bottom_row}>
                {data.rec_details?.company_name ? (
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Works at:</div>
                        <div className={styles.company_name}>{data.rec_details.company_name} ,{data.country}</div>
                    </div>
                ):(
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Lives in:</div>
                        <div className={styles.company_name}>{data.country}</div>
                    </div>
                )}
                {user && userType == 2 && (
                    <div className={styles.flex}>
                        {/* {user.resume && (
                            <CustomImageButton image_name={'Uploadfile.png'} image_width={36} image_height={36} onClick={() => goTo(user.linkedin_url)} />
                        )} */}
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
        </div>
    )
}

export default HeaderComp;