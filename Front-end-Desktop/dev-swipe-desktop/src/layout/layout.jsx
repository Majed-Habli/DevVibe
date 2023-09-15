import React, { useState } from "react";
import styles from '../styles/layout.module.css';
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import { FiMenu } from 'react-icons/fi';

const Layout = () => {
    const [isOpen,setIsOpen] =useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return(
        <div className={styles.container}>
            <div className={`${isOpen? styles.show_menu: styles.Sidebar_container}`}>
                <Sidebar status={isOpen}/>
            </div>
            <div className={styles.outlet_container}>
                <div className={styles.header}>
                    <div className={styles.icon_container} onClick={()=>handleClick()}>
                        <FiMenu fill="white" size={25} />
                    </div>

                </div>
               <Outlet/>
            </div>
        </div>
    )
}

export default Layout;