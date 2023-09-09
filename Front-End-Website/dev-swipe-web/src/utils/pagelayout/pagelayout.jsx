import React from "react";
import {Outlet} from "react-router-dom";
import styles from '../pagelayout/pagelayout.module.css';
import Navbar from "../../components/navbar/navbar";

const PageLayout = () => {

    return (
        <div className={styles.Parent_layout}>
            <div className={styles.side_bar_container}>
                <Navbar/>
            </div>
            <div className={styles.outlet_parent}>
                <Outlet/>
            </div>
        </div>
    )
}

export default PageLayout;