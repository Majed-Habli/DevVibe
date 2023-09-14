import React from "react";
import {Outlet} from "react-router-dom";
import styles from '../styles/pagelayout.module.css';

const PageLayout = () => {

    return (
        <div className={styles.Parent_layout}>
            <div className={styles.outlet_parent}>
                <div className={styles.top_img}>
                    <img src="/rb2.png" alt="top right backgroung-image" />
                </div>
                <div className={styles.btm_img}>
                    <img src="/lb2.png" alt="bottom left backgroung-image" />
                </div>
                <Outlet/>
            </div>
        </div>
    )
}

export default PageLayout;