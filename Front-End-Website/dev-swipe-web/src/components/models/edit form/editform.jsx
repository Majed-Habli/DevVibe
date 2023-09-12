import React, {useState,useEffect} from "react";
import styles from './editform.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import PopUpCard from "../../popup card/popupcard";
import CustomInput from "../../custom input/custominput";
import CustomButton from "../../custom button/custombutton";
import { localStorageAction } from "../../../utils/functions/localStorage";
import { sendRequest } from "../../../utils/functions/axios";
import { requestMethods } from "../../../utils/functions/requestMethods.";

const EditForm = ({isOpen, data}) =>{
    const userType = localStorageAction('user_type');

    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const [userSkills,setUserSkills] = useState([]); //user skill
    const [removeSkills,setRemoveSkills] = useState([]); //remove user skill
    const [selected, setSelected] = React.useState([]); //add

    const [skills, setSkills] = useState([]);
    // console.log(skills)
    // console.log(search)

    const [inputs, setInputs] = useState([]);
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(()=>{
        getSkills()
        getUserSkills()
    },[search]);

    const inputChange = (event) => {
        setSearch(event.target.value);
        getSkills()
    };

    const onChangeHandler = id => () => {
      selected.includes(id)
        ? setSelected(selected.filter(x => x !== id))
        : setSelected([...selected, id]);
    };

    // const remove = id => () => {
    //     userSkills.includes(id)
    //       ? setUserSkills(userSkills.filter(x => x !== id))
    //       : setError('skills doesnt exist, cant remove');
    //     };
    //     console.log(userSkills)   onClick={() => remove(skill.skill_id)}

    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    const getSkills = async () => {
        const token = localStorageAction("token");
        const userId = localStorageAction("user_id");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/view_all_skills/${search}`,
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data;
                    setSkills(obj);

                }else{
                    setError("failed to get user data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    const getUserSkills = async () =>{
        const token = localStorageAction("token");
        const userId = localStorageAction("user_id");

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
                console.log("res", response)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data;
                    setUserSkills(obj);

                }else{
                    setError("no skills exist!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Fetching skills failed:", error);
          }
    }

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>Edit profile</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel}/>
            </div>
            <div className={styles.popup_body}>
                <CustomInput label={"Name"} name={'user_name'} placeholder={data.user_name} value={inputs.user_name} handleChange={handleChange} width={275} height={35}/>
                {userType == 3 ?(
                    <CustomInput label={"Company Name"} name={'company_name'} placeholder={data.rec_details.company_name} handleChange={handleChange} width={275} height={35}/>
                ):(
                    <CustomInput label={"Gender"} name={'gender'} placeholder={data.gender} handleChange={handleChange} width={275} height={35}/>
                )}
                <CustomInput label={"Description"} placeholder={data.rec_details.description} width={'100%'} textArea={true} height={135}/>
                <div className={styles.skill_container}>
                    <div className={styles.header}>Skills</div>
                    <div className={styles.scrollable_container}>
                    {userSkills.map((skill)=>(
                        <CustomImageButton key={skill.skill_id} text={`${skill.skill.name}`} image_name={'Close.png'} display={'flex'} flexDirection={'row-reverse'} alignItems={'center'} backgroundColor={'#C2D0FF'} padding={'0.6rem 1rem'} borderRadius={8} image_height={18} image_width={18} width={'fit-content'}/>
                    ))}
                    </div>
                </div>
                <div className={styles.searchable}>
                    <div className={styles.top_bar}>
                        <input type="text" placeholder="Search skills here..." value={search} onChange={inputChange}/>
                    </div>
                    <div className={styles.skill_display}>
                    {skills.map((skill)=>(
                        <div key={skill.id} className={styles.box}>
                            <input id={`${skill.id}`} type="checkbox" name={`${skill.name}`}checked={selected.includes(skill.id)}
                                onChange={onChangeHandler(skill.id)}/>
                            <label htmlFor={`${skill.id}`}> {skill.name}</label>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className={styles.button_container}>
                <CustomButton title={'save'} backgroundColor={'#E7B54F'} width={90} height={30} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4}/>
            </div>
        </div>
    )
}

export default EditForm;