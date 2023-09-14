import React, { useState } from "react";
import styles from '../styles/layout.module.css';
import { Outlet } from "react-router-dom";
import { AiOutlineUser } from 'react-icons/ai';

const Layout = () => {
    const [showSubMenu, setShowSubMenu] = useState([]);

    const toggleShowMenu = (category) =>{
        if (showSubMenu.includes(category)) {
            setShowSubMenu(showSubMenu.filter(cat => cat !== category));
        } else {
            setShowSubMenu([...showSubMenu, category]);
        }
    }
    const isCategoryExpanded = (category) => showSubMenu.includes(category);

    return(
        <div>
            <div className={styles.container}>
    <div className={styles.logo}>
        <img src="/Logo2-0.png" alt="app logo" />
    </div>

    <ul className={styles.sidebar}>
        <li className={styles.header}>Main navigation</li>
        
        <li className={styles.treeview}>
            <div className={styles.category_container}>
                <label className={styles.treatitle} htmlFor="dashboardToggle">
                    <AiOutlineUser />
                    
                    <span>Dashboard</span>
                </label>
                <img className={`${styles.arrow} ${isCategoryExpanded("Dashboard") ? 'expanded' : ''}`} src="/arrow.png" alt="arrow icon" onClick={()=>{toggleShowMenu("Dashboard")}}/>
            </div>
            {isCategoryExpanded("Dashboard") && (
            <div className={styles.cont}>

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
            </div>
            )}
        </li>
        <li className={styles.treeview}>
            <div className={styles.category_container}>
                <label className={styles.treatitle} htmlFor="dashboardToggle">
                    <AiOutlineUser />
                    
                    <span>Users</span>
                </label>
                <img className={`${styles.arrow} ${isCategoryExpanded("users") ? 'expanded' : ''}`} src="/arrow.png" alt="arrow icon" onClick={()=>{toggleShowMenu("users")}}/>
            </div>
            {isCategoryExpanded("users") && (
            <div className={styles.cont}>

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
            </div>
            )}
        </li>
    </ul>
</div>
            <Outlet/>
        </div>
    )
}

export default Layout;