import React from "react";
import {Outlet} from "react-router-dom";
import styles from '../dashboardLayout/dashboardLayout.module.css';
import Navbar from "../../../components/navbar/navbar";

const DashboardLayoout = () => {

    return (
        <div className={styles.Parent_layout}>
            <div className={styles.navbar_container}>
                <Navbar/>
            </div>
            <div className={styles.outlet_parent}>
                {/* <div className={styles.page_header}>
                   
                </div> */}
                <Outlet/>
            </div>
        </div>
    )
}

export default DashboardLayoout;