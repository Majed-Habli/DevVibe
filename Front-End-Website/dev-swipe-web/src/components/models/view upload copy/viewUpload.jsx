import React, { useEffect, useRef } from "react";
import styles from './viewUpload.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import { requestMethods } from "../../../utils/functions/requestMethods.";
import { sendRequest } from "../../../utils/functions/axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../../custom button/custombutton";
import { localStorageAction } from "../../../utils/functions/localStorage";

const ViewUploadResume = ({isOpen ,type}) =>{
    const [uploadResume, setUploadResume] = useState('');
    const [tempView, setTempView] = useState('');
    const userId = localStorageAction("user_id");
    const params = useParams();

    const postResume = async () =>{

        try {
            const response = await sendRequest({
                route: '/user/developer/upload_user_resume',
                method: requestMethods.POST,
                body:{image: uploadResume,
                    type:"pdf",
                    }
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
                const resumeFile = data.view.resume;
                localStorageAction("resume", resumeFile);
                hideModel()
                window.location.href = `/dashboard/profile/${params.id}`;
            }
            
          } catch (error) {
            console.error("api calling failed:", error);
          }
    }

    const fileRef = useRef(null);
    const handleInput = (e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setTempView(selectedFile.name)

            function getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            }
            getBase64(e.target.files[0]).then((data) => {
                const refStringArray = data.split(",");
                refStringArray.shift();
                const result = refStringArray.join('');
                setUploadResume(result);
            });
        }
    };
    
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    return(
        <div className={`${styles.popup_container} ${styles.container_two}`}>
            <div className={styles.popup_header}>
                <div>Upload a resume</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel} cursor={'pointer'}/>
            </div>
            <div className={styles.popup_body}>
                <div className={styles.message_container}>
                    {tempView ?(<div>{tempView}</div>) : (
                        <div>Choose an file</div>
                    )}
                </div>

                <div className={styles.upload_button}>
                    <input ref={fileRef} type="file" name="upload_file[]" id="upload_file" onChange ={handleInput} />
                    <label class="upload_label" htmlFor="upload_file">
                    </label>
                    <CustomButton title={'upload'} width={90} height={33} backgroundColor={'#FCC860'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} onClick={()=>{postResume()}}/>
                </div>
            </div>
        </div>
    )
}

export default ViewUploadResume;