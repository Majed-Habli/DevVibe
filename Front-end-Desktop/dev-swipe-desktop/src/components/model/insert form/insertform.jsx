import React, {useState} from "react";
import styles from '../../../styles/editform.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import CustomInput from "../../custom input/custominput";
import CustomButton from "../../custom button/custombutton";
import { sendRequest } from "../../../utils/functions/axios";
import { requestMethods } from "../../../utils/functions/requestMethods.";

const AddSkill = ({isOpen}) =>{
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const insertSkill = async () =>{

        try {
            if(!inputs){
                setError('nothing to change');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "user/admin/insert_skill",
                    method: requestMethods.POST,
                    body:{name: inputs.name}
                });
                const data = response;
                console.log("res of updating", response)
                const token = " ";
    
                if(data.status == 'success'){
                    console.log("successfully updated")
                    hideModel()
                    window.location.href = '/dashboard/skills';
                    
                }else{
                    setError("failed to update!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("bad request. failed:", error);
          }
    }
    
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    return(
        <div className={`${styles.popup_container} ${styles.skill_container}`}>
            <div className={styles.popup_header}>
                <div>Add Skill</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel} cursor={'pointer'}/>
            </div>
            <div className={`${styles.popup_body } ${styles.skill_body}`}>
                <div className={styles.group}>
                    <CustomInput name={'name'} placeholder='skill name' value={inputs.name} width={300} height={35} handleChange={handleChange}/>
                    <CustomButton title={'save'} backgroundColor={'#E7B54F'} width={90} height={35} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} onClick={() => insertSkill()}/>
                </div>
            </div>
        </div>
    )
}

export default AddSkill;