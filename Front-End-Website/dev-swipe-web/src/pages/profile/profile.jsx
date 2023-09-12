import React, { useEffect, useRef, useState } from "react";
import styles from './profile.module.css';
import HeaderComp from "../../components/profile header/headercard";
import CustomImageButton from "../../components/custom button/customImageButton";
import CarouselComp from "../../components/carousel/carousel";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";
import CustomInput from "../../components/custom input/custominput";

const Profile = () =>{
    const [error, setError] = useState('');
    const [skills, setSkills] = useState([]);
    const [user, setUser] = useState([]);
    const [images, setImages] = useState([]);
    const [input, setInput] = useState([]);
    const [uploadImage, setUploadImage] = useState('');

    const getSkills = async () =>{
        const token = localStorageAction("token");
        const userId = localStorageAction("user_id");
        // console.log("user id ", userId)

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/view_user_skills/${userId}`,
                    method: requestMethods.GET,
                });
                const data = response;
                // console.log("res", response)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data;
                    setSkills(obj);

                }else{
                    setError("no skills exist!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Fetching skills failed:", error);
          }
    }

    const getUser = async () =>{
        const token = localStorageAction("token");
        const userId = localStorageAction("user_id");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/profile/${userId}`,
                    method: requestMethods.GET,
                });
                const data = response;
                // console.log("hello ther", response)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data[0];
                    // console.log("her is the onj",obj)
                    setUser(obj);

                }else{
                    setError("failed to get user data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    const getImages = async () =>{
        const token = localStorageAction("token");
        const userId = localStorageAction("user_id");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/retrieve_user_images/${userId}`,
                    method: requestMethods.GET,
                });
                const data = response;
                // console.log("these are my images", response)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data;
                    // console.log("her is the onj",obj)
                    setImages(obj);

                }else{
                    setError("failed to get user data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    // const handleFileRead = async (event) => {
    //     const file = event.target.files[0]
    //     const base64 = await convertBase64(file)
    //     console.log(base64)
    //   }

    //  const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //       const fileReader = new FileReader();
    //       fileReader.readAsDataURL(file)
    //       fileReader.onload = () => {
    //         resolve(fileReader.result);
    //       }
    //       fileReader.onerror = (error) => {
    //         reject(error);
    //       }
    //     })
    //   }

    // const handleImageChange = async (e) => {
    //     const file = e.target.files;
    //     console.log(file);
    //     const base64 = await convertBase64(file);
    //     console.log(base64);
    //     setUploadImage(base64)
    // };
    // const convertBase64 = (file)=>{
    //     return new Promise((resolve,reject)=>{
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onLoad=()=>{
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror=(error)=>{
    //             reject(error);
    //         };
    //     });
    // }
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
            // setInput(e.target.files[0])
            getBase64(e.target.files[0]).then((data) => {
                // console.log("base shabsdbhasbda",data)
                setUploadImage(data);
            });

            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     // setUploadImage(reader.result);
            //     console.log(reader.result)
            // };
            // reader.readAsDataURL(e.target.files[0]);
        }
    };
    console.log("this is the images",uploadImage)
 

    useEffect(()=>{
        getSkills();
        getImages();
        getUser();
    },[]);

    return(
        <div className={styles.page_container}>
            <div className={styles.page_header}></div>
            <div className={styles.header_comp}>
                <div className={styles.button_container}>
                    
                </div>
                <div className={styles.head}>
                    <HeaderComp data={user}/>
                </div>
                <div className={styles.button_container}>
                    <input type="file" name="upload_file[]" id="upload_file" multiple="multiple" class="form-control" hidden/>
                    <label class="upload_label" for="upload_file">
                        <CustomImageButton text={'upload new image'} width={190} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Vector.png"} image_height={16} image_width={16} backgroundColor={'white'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                    </label>

                    <input ref={fileRef} type="file" name="upload_file[]" id="upload_file" class="form-control"  onChange ={handleInput}/>
                    <label class="upload_label" for="upload_file">
                        <CustomImageButton text={'upload new resume'} width={190} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Vector.png"} image_height={16} image_width={16} backgroundColor={'white'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                    </label>
                </div>
            </div>
            <div className={styles.component_container}>
                <div className={styles.componenet_body}>
                    <div className={styles.left_container}>
                        <div className={styles.title}>Skills: </div>
                        <div className={styles.skill_cotainer}>
                            {skills.map((skill)=>(
                                <CustomImageButton key={skill.skill_id} text={`${skill.skill.name}`} width={213} height={56} display={'flex'} alignItems={'center'} columnGap={'1rem'} backgroundColor={'#FCC860'} padding={'0.5rem .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'}/>
                            ))}
                        </div>
                    </div>
                    <div className={styles.right_container}>
                        <CarouselComp value={images}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;