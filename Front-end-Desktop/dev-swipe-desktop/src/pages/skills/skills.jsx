import React, {useState, useEffect} from "react";
import styles from '../../styles/users.module.css';
import UserCard from "../../components/user card/userCard";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";
import CustomButton from "../../components/custom button/custombutton";

const Skills = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [skills, setSkills] = useState([]);

    const inputChange = (event) => {
        setSearch(event.target.value);
    };

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
    
    useEffect(()=>{
        getSkills();
    },[search]);

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>Skills</span>
            </div>
            <div className={styles.searchable}>
                <div className={styles.top_bar}>
                    <input type="text" placeholder="Search users here..." value={search} onChange={inputChange}/>
                    <CustomButton title={'add skill'} width={70} height={27} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={12} fontWeight={600} backgroundColor={'#FCC860'}/>
                </div>
                <div className={styles.users_container}>
                    {skills.map((skill)=>(
                        <div key={skill.id} className={styles.box}>
                            <div key={skill.id}> {skill.name}</div>
                            <div className={styles.btn_container}>
                                <CustomButton title={'remove'} width={70} height={27} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={12} fontWeight={600} backgroundColor={'#FCC860'}/>
                                <CustomButton title={'edit'} width={70} height={27} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={12} fontWeight={600} backgroundColor={'#FCC860'}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Skills;