import React, { useEffect, useRef } from "react";
import styles from './viewUpload.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import { requestMethods } from "../../../utils/functions/requestMethods.";
import { sendRequest } from "../../../utils/functions/axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../../custom button/custombutton";

const ViewUpload = ({isOpen }) =>{
    const [uploadImage, setUploadImage] = useState('');
    console.log(uploadImage)
    const [tempView, setTempView] = useState('');
    const params = useParams();
    console.log(params.id)

    const postImage = async () =>{

        try {
            const response = await sendRequest({
                route: "/user/developer/upload_user_images",
                method: requestMethods.POST,
                body:{image_url: uploadImage,
                    type:"png",
                    }
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
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

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>Upload an image</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel}/>
            </div>
            <div className={styles.popup_body}>
                <div className={styles.upload_button}>
                    <input ref={fileRef} type="file" name="upload_file[]" id="upload_file" className="{styles.form_control}"  onChange ={handleInput} hidden/>
                    <label class="upload_label" htmlFor="upload_file">hi
                    </label>
                    <CustomButton title={'save'} width={90} height={33} backgroundColor={'#FCC860'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} onClick={()=>{postImage()}}/>
                </div>

                <div className={styles.image_container}>
                    <img src={tempView} alt="" />
                </div>
                
            </div>
        </div>
    )
}

export default ViewUpload;