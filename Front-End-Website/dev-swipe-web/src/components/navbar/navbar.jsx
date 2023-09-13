import React, { useEffect, useState } from "react";
import styles from './navbar.module.css';
import CustomButton from "../custom button/custombutton";
import { localStorageAction } from "../../utils/functions/localStorage";
import CustomImageButton from "../custom button/customImageButton";

const Navbar = () => {
    let [token, setToken] = useState('');
    const [displayModal, setDisplayModal] = useState(false);

    const validate = () =>{
        setToken=(localStorageAction("token"));
    }

    const showView = () =>{
        setDisplayModal((current) => !current);
    }

    const path = 'dashboard'

    const userName = localStorageAction('user_name');
    const profileImageUrl = localStorageAction('profile_image');
    const userID = localStorageAction('user_id');

    const goToPage = ({value}) => {
        if(value === 'dashboard'){
            window.location.href = `/dashboard`;
        }else{
            window.location.href = `/dashboard/profile/${userID}`
        }
    }

    useEffect(()=>{
        validate();
    },[]);

    return(
        <div className={styles.navbar_container}>
            <div className={styles.navbar_content}>
                <div className={styles.logo_container}>
                    <img src="/Logo2-0.png" alt="brand logo" />
                </div>
                {token ? (
                    <CustomButton title={'Login'} width={93} height={27} borderRadius={4} textAlign={'center'} backgroundColor={'#FCC860'}/>
                ):(
                    <div className={styles.routing_pressables}>
                        <div className={styles.route} onClick={()=>goToPage({value:path})}>Dashboard</div>
                        <div className={styles.card_container}>
                            <div className={styles.container_left} onClick={()=>goToPage({})}>
                                <div className={styles.profile_image_container}>
                                    <img src={`${profileImageUrl}`} alt="profile image" />
                                </div>
                                <div className={styles.user_name}>{userName}</div>
                            </div>
                            <div className={styles.container_right}>
                                <CustomImageButton image_name={'arrow_white.png'} image_height={20}
                                image_width={20} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={()=>showView()}/>
                            </div>
                        </div>
                    </div>
                )}
                
                {
                displayModal && (<div className={styles.Model}>
                    <div className={styles.button_container}>
                        <div>Logout</div>
                        <img src="/logout.png" alt="" />
                    </div>
                </div>)
                }
            </div>
        </div>
    )
}

export default Navbar;