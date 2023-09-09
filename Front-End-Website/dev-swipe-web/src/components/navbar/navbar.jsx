import React from "react";
import styles from './navbar.module.css';

const Navbar = () => {

    return(
        <div className={styles.navbar_container}>
            <div className={styles.navbar_content}>
                <div className={styles.logo_container}>
                    <img src="/Logo.png" alt="brand logo" />
                </div>
                <div className={styles.button_container}>
                    <div>Login</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;