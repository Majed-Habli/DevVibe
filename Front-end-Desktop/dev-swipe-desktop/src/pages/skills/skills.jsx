import React, {useState, useEffect} from "react";
import styles from '../../styles/users.module.css';
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";
import CustomButton from "../../components/custom button/custombutton";
import AddSkill from "../../components/model/insert form/insertform";
import CustomImageButton from "../../components/custom button/customImageButton";

const Skills = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [skills, setSkills] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [showModelEdit, setShowModelEdit] = useState(false);
    const [skilllInfo, setSkillInfo] = useState(false);

    const inputChange = (event) => {
        setSearch(event.target.value);
    };

    const toggleModel = () => {
        setShowModel(true);
    }

    const toggleModelEdit = (skillInformation) => {
        setShowModelEdit(true);
        setSkillInfo(skillInformation);
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

    const removeSkill = async (id) =>{

        try {
            const response = await sendRequest({
                route: "user/admin/delete_skill",
                method: requestMethods.POST,
                body:{skill_id: id}
            });
            const data = response;
            console.log("res of updating", response)
            const token = " ";

            if(data.status == 'success'){
                console.log("successfully deleted")
                window.location.href = '/dashboard/skills';
            }else{
                setError("failed to delete!");
                console.log(error);
            }
            }
        catch (error) {
            console.error("bad request. failed:", error);
          }
    }
    
    useEffect(()=>{
        getSkills();
    },[search]);

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>Skills</span>
                <CustomButton title={'add skill'} width={70} height={27} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={12} fontWeight={600} backgroundColor={'#FCC860'} onClick={()=>toggleModel()}/>
            </div>
            <div className={styles.searchable}>
                <div className={styles.top_bar}>
                    <input type="text" placeholder="Search users here..." value={search} onChange={inputChange}/>
                </div>
                <div className={styles.users_container}>
                    {skills.map((skill)=>(
                        <div key={skill.id} className={styles.box}>
                            <div key={skill.id}> {skill.name}</div>
                            <div className={styles.btn_container}>
                                <CustomImageButton image_name={'bin.png'} image_width={20} image_height={20} width={50} height={32} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={12} fontWeight={600} backgroundColor={'#FCC860'} cursor={'pointer'} onClick={()=>removeSkill(skill.id)}/> 
                                <CustomImageButton image_name={'edit.png'} image_width={20} image_height={20} width={50} height={32} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={12} fontWeight={600} backgroundColor={'#FCC860'} cursor={'pointer'} onClick={()=>toggleModelEdit(skill)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModel && (
                <div className={styles.popup_background}>
                    <AddSkill isOpen={setShowModel} type={'add'}/>
                </div>
            )}

            {showModelEdit && (
                <div className={styles.popup_background}>
                    <AddSkill isOpen={setShowModelEdit} type={'edit'} data={skilllInfo}/>
                </div>
            )}
        </div>
    )
}

export default Skills;