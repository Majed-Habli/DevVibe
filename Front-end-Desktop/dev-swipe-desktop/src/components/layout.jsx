import React from "react";
import styles from '../styles/layout.module.css';
import { Outlet } from "react-router-dom";

const Layout = () => {

    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="/Logo2-0.png" alt="app logo" />
            </div>

            <ul className={styles.sidebar}>
                <li className={styles.header}>Main navigation</li>
                {/* <li>
                    <a href="/">Home</a>
                </li> */}
                <li className={styles.treeview}>
                    <a href="/dashboard">
                        <img src="" alt="icon" />
                        <span>Dashboard</span>
                    </a>
                    <ul className={styles.treeview_menu}>
                        <li>
                            <a href="">
                                <img src="" alt="" />
                                <span className={styles.list_headers}>New Members</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="" alt="" />
                                <span className={styles.list_headers}>Developers</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="" alt="" />
                                <span className={styles.list_headers}>Recruiters</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <Outlet/>
        </div>
    )
}

export default Layout;