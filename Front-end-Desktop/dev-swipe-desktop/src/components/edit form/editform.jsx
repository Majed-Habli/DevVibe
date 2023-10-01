import React, {useState,useEffect} from "react";
import styles from '../../styles/editform.module.css';
import CustomImageButton from "../custom button/customImageButton";
import CustomInput from "../custom input/custominput";

const EditForm = ({isOpen, data}) =>{
    console.log(data)
    const [userDetails, setUserDetails] = useState([]);
    
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    useEffect(()=>{
        if(data.user_type_id == 3){
            setUserDetails({description : data.rec_details && data.rec_details.description ?data.rec_details.description : "",company_name : data.rec_details && data.rec_details.company_name ?data.rec_details.company_name : ""
        })
        }else{
            setUserDetails({gender : data.dev_details && data.dev_details.gender ?data.dev_details.gender : "",description : data.dev_details && data.dev_details.description ?data.dev_details.description : ""
        })
        }
    },[data]);

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>User Info</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel} cursor={'pointer'}/>
            </div>
            <div className={styles.popup_body}>
                <div className={styles.row}>
                    <CustomInput label={"Name"} name={'user_name'} placeholder={data.user_name} width={225} height={35} disabled={'disabled'}/>
                    {data.user_type_id == 2 ?(
                        <CustomInput label={"Gender"} name={'gender'} placeholder={userDetails.gender } width={225} height={35} disabled={'disabled'}/>
                    ):(
                    <CustomInput label={"Company Name"} name={'company_name'} placeholder={userDetails.company_name} width={225} height={35} disabled={'disabled'}/>
                    )}
                </div>
                <div className={styles.row}>
                    <CustomInput label={"Email"} name={'email'} placeholder={data.email } width={225} height={35} disabled={'disabled'}/>
                    <CustomInput label={"Country"} name={'country'} placeholder={data.country} width={225} height={35} disabled={'disabled'}/>
                </div>
                <CustomInput label={"Description"} name={'description'} placeholder={data.description} width={'100%'} textArea={true} height={340} disabled={'disabled'}/>
            </div>
        </div>
    )
}

export default EditForm;