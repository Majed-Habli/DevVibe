import React, {useState,useEffect} from "react";
import styles from './editform.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import CustomInput from "../../custom input/custominput";
import CustomButton from "../../custom button/custombutton";
import { localStorageAction } from "../../../utils/functions/localStorage";
import { sendRequest } from "../../../utils/functions/axios";
import { requestMethods } from "../../../utils/functions/requestMethods.";
import Select from 'react-select';

const EditForm = ({isOpen, data}) =>{
    const userType = localStorageAction('user_type');

    const [selectedGender, setSelectedGender] = useState(null);
    
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    
    const [userSkills,setUserSkills] = useState([]);
    const [selected, setSelected] = useState([]);
    
    const [skills, setSkills] = useState([]);
    console.log("selected are",selected)
    
    const [inputs, setInputs] = useState({});
    
    const onChangeGenderHandel = (selectedOption) =>{
        setSelectedGender(selectedOption);
    }
    
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const options = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    ];


    console.log("inputs",inputs)

    useEffect(()=>{
        getSkills();
        getUserSkills();
        if(userType == 3){

            setInputs({user_name : data.user_name,description : data.rec_details.description, company_name : data.rec_details.company_name});
        }else{
            setInputs({
                user_name : data.user_name,
                description : data.dev_details && data.dev_details.description? data.dev_details.description : "no description yet",
                gender : data.dev_details && data.dev_details.gender ?data.dev_details.gender : "gender",
                github_url : data.dev_details && data.dev_details.github_url ?data.dev_details.github_url : "add your github",
                linkedin_url : data.dev_details && data.dev_details.linkedin_url ?data.dev_details.linkedin_url : "add your linkedin",
            });
        }
    },[search, userType]);

    const inputChange = (event) => {
        setSearch(event.target.value);
        getSkills()
    };

    const onChangeHandler = id => () => {
      selected.includes(id)
        ? setSelected(selected.filter(x => x !== id))
        : setSelected([...selected, id]);
    };
        
    const filtering = (id) =>{
        const filtered = userSkills.filter(row => row.skill.id !== id)
        setUserSkills(filtered)
    }

    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    const getSkills = async () => {
        const token = localStorageAction("token");

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

    const addUserSkills = async () =>{
        const mySkills = JSON.stringify(selected);

        try {
            if(!selected){
                setError('no skills to add');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "/user/developer/add_skills",
                    method: requestMethods.POST,
                    body:{user_skills: mySkills}
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    console.log("successfully add")
                }else{
                    setError("failed to add!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("bad request. failed:", error);
          }
    }

    const removeUserSkills = async (id) =>{
        const removeSkill = JSON.stringify([id]);

        try {
            const response = await sendRequest({
                route: "/user/developer/remove_skills",
                method: requestMethods.POST,
                body:{user_skills: removeSkill}
            });
            const data = response;
            const token = " ";

            if(data.status == 'successfully deleted skills'){
                filtering(id)
            }else{
                setError("failed to add!");
                console.log(error);
            }
            
          } catch (error) {
            console.error("bad request. failed:", error);
          }
    }

    const updateUserInfo = async () =>{

        try {
            if(!inputs){
                setError('nothing to change');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "user/developer/update-details",
                    method: requestMethods.POST,
                    body:{user_name: inputs.user_name,
                        description: inputs.description,
                        gender: inputs.gender,
                        company_name: inputs.company_name,
                        github_url: inputs.github_url,
                        linkedin_url: inputs.linkedin_url,
                    }
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    console.log("successfully updated")
                    hideModel()
                }else{
                    setError("failed to update!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("bad request. failed:", error);
          }
    }
    console.log("my user skills are", userSkills)

    const save = async () =>{
        try{
            await updateUserInfo();
            await addUserSkills();
        }catch (error){
            console.log('faled to save', error);
        }
    }

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>Edit profile</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel} cursor={'pointer'}/>
            </div>
            <div className={styles.popup_body}>
                <div className={styles.group_row}>
                    <CustomInput label={"Name"} name={'user_name'} placeholder={data.user_name} value={inputs.user_name} handleChange={handleChange} width={225} height={38}/>
                    {userType == 3  ?(<CustomInput label={"Company Name"} name={'company_name'} placeholder={data.rec_details.company_name} value={inputs.company_name} handleChange={handleChange} width={275} height={35}/>):(
                    <Select
                        value={selectedGender}
                        onChange={onChangeGenderHandel}
                        options={options}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                width: '225px',
                                height: '35px',
                                borderColor: '#9F8484'
                            }),
                            menu: (provided, state) => ({
                                ...provided,
                                width: '225px',
                                borderColor: state.isFocused ? 'black' : 'grey'
                            }),
                            }}
                    />
                    )}
                </div>
                {userType == 2 && (
                    <div>
                        <div className={styles.group_row}>
                        <CustomInput label={"Github"} name={'github_url'} value={inputs.github_url} placeholder={data.github_url} handleChange={handleChange} width={225} height={38}/>
                        <CustomInput label={"Linked in"} name={'linkedin_url'} value={inputs.linkedin_url} placeholder={data.linkedin_url} handleChange={handleChange} width={225} height={38}/>
                        </div>
                    </div>
                )}
                {userType == 3 ?(
                    <div>
                        <CustomInput label={"Company Name"} name={'company_name'} placeholder={data.rec_details.company_name} value={inputs.company_name} handleChange={handleChange} width={275} height={35}/>
                        <CustomInput label={"Description"} name={'description'} placeholder={data.rec_details.description} value={inputs.description} handleChange={handleChange} width={'100%'} textArea={true} height={135}/>
                    </div>
                    
                ):(
                    <div>
                        <CustomInput label={"Description"} name={'description'} placeholder={data.description} value={inputs.description} handleChange={handleChange} width={'100%'} textArea={true} height={135}/>
                    </div>
                    
                )}
                
                <div className={styles.skill_container}>
                    <div className={styles.header}>Skills</div>
                    <div className={styles.scrollable_container}>
                    {userSkills && userSkills.map((skill)=>(
                        <CustomImageButton key={skill.skill_id} text={`${skill.skill.name}`} image_name={'Close.png'} display={'flex'} flexDirection={'row-reverse'} alignItems={'center'} backgroundColor={'#C2D0FF'} padding={'0.6rem 1rem'} borderRadius={8} image_height={18} image_width={18} width={'fit-content'} cursor={'pointer'} onClick={()=> removeUserSkills(skill.skill.id)}/>
                    ))}
                    {!userSkills ?(
                        <div>Starting adding skills to you profile</div>
                    ):(
                        <div></div>
                    )}
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
                <CustomButton title={'save'} backgroundColor={'#E7B54F'} width={90} height={30} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} onClick={() => save()}/>
            </div>
        </div>
    )
}

export default EditForm;