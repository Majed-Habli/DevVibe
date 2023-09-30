import React, { useEffect, useState } from "react";
import styles from './navbar.module.css';
import CustomButton from "../custom button/custombutton";
import { localStorageAction } from "../../utils/functions/localStorage";
import CustomImageButton from "../custom button/customImageButton";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";

const Navbar = () => {
    const token = localStorageAction("token");
    const [displayModal, setDisplayModal] = useState(false);
    const [error, setError] = useState('');

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

    const onLogout = async () =>{

        try {
            const response = await sendRequest({
                route: "/guest/logout",
                method: requestMethods.GET,
            });
            const data = response;
            console.log("res", response)
            const token = " ";

            if(data.status == 'success'){
                console.log("bye")
                localStorage.clear();
                window.location.href = '/';
            }else{
                setError("Couldn't logout!");
                console.log(error);
            }
          } catch (error) {
            console.error("api calling failed:", error);
            if(error.response.status === 401){
                localStorage.clear();
                window.location.href = '/'
            }
          }
    }

    return(
        <div className={styles.navbar_container}>
            <div className={styles.navbar_content}>
                <div className={styles.logo_container} onClick={()=>goToPage({value:path})}>
                    <img src="/Logo2-0.png" alt="brand logo" />
                </div>
                {token == null ? (
                    <CustomButton title={'Login'} width={93} height={27} borderRadius={4} display={'flex'} justifyContent={'center'} alignItems={'center'} backgroundColor={'#FCC860'}/>
                ):(
                    <div>
                        {/* <div className={styles.route} onClick={()=>goToPage({value:path})}>Dashboard</div> */}
                        <div className={styles.card_container}>
                            <div className={styles.container_left} onClick={()=>goToPage({})}>
                                <div className={styles.profile_image_container}>
                                    {profileImageUrl != null ?(<img src={`${profileImageUrl}`} alt="profile image" />):(
                                        <img src='/default-user.png' alt="profile image" />
                                    )}
                                </div>
                                <div className={styles.user_name}>{userName}</div>
                            </div>
                            <div className={styles.container_right}>
                                <CustomImageButton image_name={'arrow_white.png'} image_height={20}
                                image_width={20} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={()=>showView()} cursor={'pointer'}/>
                            </div>
                        </div>
                    </div>
                )}
                
                {
                displayModal && (<div className={styles.Model}>
                    <div className={styles.button_container} onClick={()=>onLogout()}>
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