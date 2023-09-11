import React, { useEffect, useState } from "react";
import styles from './navbar.module.css';
import CustomButton from "../custom button/custombutton";
import { localStorageAction } from "../../utils/functions/localStorage";

const Navbar = () => {
    let [token, setToken] = useState('');
    const validate = () =>{
        setToken=(localStorageAction("token"));
        console.log('the token was read', token);
        // localStorage.removeItem('token');
    }

    useEffect(()=>{
        validate();
    },[]);

    return(
        <div className={styles.navbar_container}>
            <div className={styles.navbar_content}>
                <div className={styles.logo_container}>
                    <img src="/Logo.png" alt="brand logo" />
                </div>
                {token ? (
                    <CustomButton title={'Login'} width={93} height={27} borderRadius={4} textAlign={'center'} backgroundColor={'#FCC860'}/>
                ):(
                    <div className={styles.card_container}>
                        <div className={styles.container_left}>
                            <div className={styles.profile_image_container}>
                                <img src="/testuser.png" alt="profile image" />
                            </div>
                            <div className={styles.user_name}>majed</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;