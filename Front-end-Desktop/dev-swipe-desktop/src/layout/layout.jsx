import React, { useState } from "react";
import styles from '../styles/layout.module.css';
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";

const Layout = () => {
    
    return(
        <div className={styles.container}>
            <div className={styles.Sidebar_container}>
                <Sidebar/>
            </div>
            <div className={styles.outlet_container}>
                <div className={styles.header}></div>
               <Outlet/>
            </div>
        </div>
    )
}

export default Layout;