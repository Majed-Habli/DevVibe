import React from "react";
import {Outlet} from "react-router-dom";
// import styles from './pageLayout.module.css';
import styles from './pageLayout.module.css';
// import Sidebar from "../../components/sidebar/sidebar";

const PageLayout = () => {

    return (
        <div className={styles.Parent_layout}>
            <div className={styles.side_bar_container}>
                {/* <Navbar/> */}hey here is the nav bar
            </div>
            <div className={styles.outlet_parent}>
                <Outlet/>
            </div>
        </div>
    )
}

export default PageLayout;