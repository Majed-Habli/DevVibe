import React from "react";
import styles from '../styles/layout.module.css';
import { Outlet } from "react-router-dom";

const Layout = () => {

    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="/Logo2-0.png" alt="app logo" />
            </div>

            <ul>
                <li className={styles.header}>Main navigation</li>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/dashboard">
                        <img src="" alt="icon" />
                        <span>Dashboard</span>
                    </a>
                    <ul>
                        <li>
                            <a href="">
                                <img src="" alt="" />
                                <span>New Members</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="" alt="" />
                                <span>Developers</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="" alt="" />
                                <span>Recruiters</span>
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