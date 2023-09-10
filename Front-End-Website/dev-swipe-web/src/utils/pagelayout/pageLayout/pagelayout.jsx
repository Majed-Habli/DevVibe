import React from "react";
import {Outlet} from "react-router-dom";
import styles from '../pageLayout/pagelayout.module.css';
import Navbar from "../../../components/navbar/navbar";

const PageLayout = () => {

    return (
        <div className={styles.Parent_layout}>
            <div className={styles.navbar_container}>
                <Navbar/>
            </div>
            <div className={styles.outlet_parent}>
                <div className={styles.top_img}>
                    <img src="/topright-icon.png" alt="top right backgroung-image" />
                </div>
                <div className={styles.btm_img}>
                    <img src="/btmleft-icon.png" alt="bottom left backgroung-image" />
                </div>
                <Outlet/>
            </div>
        </div>
    )
}

export default PageLayout;