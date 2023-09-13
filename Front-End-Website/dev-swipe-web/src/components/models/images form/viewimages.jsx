import React, { useEffect, useState } from "react";
import styles from './viewimages.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import PopUpCard from "../../popup card/popupcard";
import CustomButton from "../../custom button/custombutton";
import { sendRequest } from "../../../utils/functions/axios";
import { requestMethods } from "../../../utils/functions/requestMethods.";

const ViewImages = ({isOpen ,imgs}) =>{
    console.log("the users",imgs)
    const [error, setError] = useState('');
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    // useEffect
    const [selected, setSelected] = useState([]); //add
    const onChangeHandler = id => () => {
          selected.includes(id)
            ? setSelected(selected.filter(x => x !== id))
            : setSelected([...selected, id]);
        };
    console.log('deleted images are ', selected);
    // 

    const removeImages = async () =>{
        const mySkills = JSON.stringify(selected);

        try {
            if(!selected){
                setError('no images to remove');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "/user/developer/delete_user_image",
                    method: requestMethods.POST,
                    body:{image_id: selected}
                });
                const data = response;
                console.log("res of removing skills", response)
                const token = " ";
    
                if(data.status == 'success'){
                    console.log("successfully removed images")
                }else{
                    setError("failed to remove!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("bad request. failed:", error);
          }
    }

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>My images</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel}/>
            </div>
            <div className={styles.popup_body}>
                <div className={styles.statment}>
                    Select the images you wish to delete
                    <CustomButton title={'delete'} width={90} height={33} backgroundColor={'#FCC860'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} onClick={()=>{removeImages()}}/>
                </div>
                <div className={styles.overflow_container}>
                    {imgs.map((img)=>(
                        <div key={img.id} className={styles.image_container}>
                            <input id={`${img.id}`} type="checkbox" onChange={onChangeHandler(img.id)} checked={selected.includes(img.id)}/>
                            <img src={`${img.image_url}`} alt="user image" />
                        </div>
                    ))}
                    {/* {skills.map((skill)=>(
                        <div key={skill.id} className={styles.box}>
                            <input id={`${skill.id}`} type="checkbox" name={`${skill.name}`}checked={selected.includes(skill.id)}
                                onChange={onChangeHandler(skill.id)}/>
                            <label htmlFor={`${skill.id}`}> {skill.name}</label>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    )
}

export default ViewImages;