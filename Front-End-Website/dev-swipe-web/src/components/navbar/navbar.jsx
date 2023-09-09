import React from "react";
import styles from './navbar.module.css';
import CustomButton from "../custom button/custombutton";

const Navbar = () => {

    return(
        <div className={styles.navbar_container}>
            <div className={styles.navbar_content}>
                <div className={styles.logo_container}>
                    <img src="/Logo.png" alt="brand logo" />
                </div>
                <CustomButton title={'Login'} width={93} height={27} borderRadius={4} textAlign={'center'} backgroundColor={'#FCC860'}/>
            </div>
        </div>
    )
}

export default Navbar;