import React, { useEffect, useRef } from "react";
import styles from './viewUpload.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import { requestMethods } from "../../../utils/functions/requestMethods.";
import { sendRequest } from "../../../utils/functions/axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../../custom button/custombutton";
import { localStorageAction } from "../../../utils/functions/localStorage";

const ViewUpload = ({isOpen ,type}) =>{
    const [uploadImage, setUploadImage] = useState('');
    const [route, setRoute] = useState('');
    const [tempView, setTempView] = useState('');
    const userId = localStorageAction("user_id");
    const params = useParams();

    const postImage = async () =>{

        try {
            const response = await sendRequest({
                route: route,
                method: requestMethods.POST,
                body:{user_id: userId,
                    image: uploadImage,
                    type:"png",
                    }
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
                const profileImageUrl = data.view.profile_image_url;
                localStorageAction("profile_image", profileImageUrl);
                window.location.href = `/dashboard/profile/${params.id}`;
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
    
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    useEffect(()=>{
        if(type == '1'){
            setRoute("/user/developer/upload_profile_pic/")
        }else{
            setRoute("/user/developer/upload_user_images")
        }
    },[type])

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>Upload an image</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel} cursor={'pointer'}/>
            </div>
            <div className={styles.popup_body}>
                <div className={styles.image_container}>
                    {tempView ?(<img src={tempView} alt="" />) : (
                        <div>Choose an image</div>
                    )}
                </div>

                <div className={styles.upload_button}>
                    <input ref={fileRef} type="file" name="upload_file[]" id="upload_file" onChange ={handleInput} />
                    <label class="upload_label" htmlFor="upload_file">
                    </label>
                    <CustomButton title={'save'} width={90} height={33} backgroundColor={'#FCC860'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} onClick={()=>{postImage()}}/>
                </div>
            </div>
        </div>
    )
}

export default ViewUpload;