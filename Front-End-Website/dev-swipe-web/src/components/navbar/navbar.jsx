import React from "react";
import styles from './navbar.module.css';

const Navbar = () => {

    return(
        <div className={styles.navbar_container}>
            <div className={styles.navbar_content}>
                <div className={styles.logo_container}>
                    <img src="" alt="" />
                </div>
                <div className={styles.button_container}>
                    <div>button here</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;