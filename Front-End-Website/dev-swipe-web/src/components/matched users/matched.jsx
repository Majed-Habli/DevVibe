import React, { useEffect, useState } from "react";
import styles from './matched.module.css';
import CardCarouselComp from "../carousel/card/card";
import CustomButton from "../custom button/custombutton";
import Card from "../user card/card";
import CustomImageButton from "../custom button/customImageButton";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";
import SyncLoader from "react-spinners/ClipLoader";


const MatchedTable = () =>{
    const [users, setUsers] = useState([]);
    const [error,setError] = useState('');
    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(users.length <= 0){
            setLoading(true)
        }else{
            setLoading(false)
        }
    },[users])

    const getMatched = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "/user/developer/view_matches",
                    method: requestMethods.GET,
                });
                const data = response;
                console.log(data)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data;
                    setUsers(obj);
                    console.log(obj)

                }else{
                    setError("no matches yet!");
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    const viewProfile = ({id}) => {
        window.location.href = `/dashboard/profile/${id}`
    }

    useEffect(()=>{
        getMatched();
    },[]);

    console.log(users)
    return(
        <div className={styles.matched_container}>
            <div className={styles.table_header}>Matched with</div>
            <div className={styles.table_body}>
                {!loading ? (<div className={styles.inner_table_container}>
                    {/* <div className={styles.inner_table_header}>
                        <div className={styles.space}></div>
                        <div className={`${styles.cell} ${styles.width_username}`}>Developer</div>
                        <div className={`${styles.cell} ${styles.width_skill}`}>Skills</div>
                        <div className={`${styles.cell} ${styles.width_profile}`}>Profile</div>
                    </div>
                    {!error? (<div className={styles.inner_table_body}>
                        {users.map((user,index)=>(
                            <div key={user.id} className={styles.inner_table_row}>
                                <div className={styles.index}>{index+1}</div>
                                <div className={styles.user_card}>
                                    <div className={styles.card_container}>
                                        <div className={styles.container_left}>
                                            <div className={styles.profile_image_container}>
                                                {user.matched_with.profile_image_url ? (
                                                    <img src={`${user?.matched_with?.profile_image_url}`} alt="profile image" /> 
                                                ):(
                                                    <img src="/default-user.png" alt="profile image" />
                                                )}
                                            </div>
                                            <div className={styles.user_name}>{user.matched_with.user_name}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.skills_container}>
                                    <div className={styles.content}>
                                        {user.skills.map((use)=>(
                                            <div key={use.id} className={styles.pill}>{use.skill.name}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.profile_button}>
                                    <CustomImageButton key={user.id} image_name={'Profile.png'} width={37} height={37} image_width={27} image_height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} backgroundColor={"#EEEEEE"} onClick={()=>viewProfile({id :user.matched_with.id})} cursor={'pointer'}/>
                                </div>
                            </div>
                        ))}
                    </div>):(
                        <div className={styles.error_message}>{error}</div>
                    )} */}
                    {!error?
                        <CardCarouselComp information={users} issue={error}/>
                        :(<div className={styles.error_message}>{error}</div>)
                    }
                </div>):(
                    <div className={styles.inner_table_container}>
                        <SyncLoader color="#36d7b7" />
                    </div>

                )}
            </div>
        </div>
    )
}

export default MatchedTable;