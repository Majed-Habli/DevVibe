import React, { useState } from "react";
import styles from '../../styles/sidebar.module.css';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineDashboard } from 'react-icons/ai';

const Sidebar = () => {
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
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="/Logo2-0.png" alt="app logo" />
            </div>

            <ul className={styles.sidebar}>
                <li className={styles.header}>Main navigation</li>
                
                <li className={styles.treeview}>
                    <div className={styles.category_container} onClick={()=>{toggleShowMenu("Dashboard")}}>
                        <div>
                            {isCategoryExpanded("Dashboard") ?(
                                <label className={styles.treatitle} htmlFor="dashboardToggle">
                                    <AiOutlineDashboard fill="white" />
                                    <span className={styles.selected}>Dashboard</span>
                                </label>
                                ):(
                                    <label className={styles.treatitle} htmlFor="dashboardToggle">
                                        <AiOutlineDashboard/>
                                        <span>Dashboard</span>
                                    </label>
                                )
                            }
                        </div>
                        <img className={`${styles.arrow} ${isCategoryExpanded("Dashboard") ? 'expanded' : ''}`} src="/arrow.png" alt="arrow icon"/>
                    </div>
                    {isCategoryExpanded("Dashboard") && (
                    <div className={styles.cont}>

                        <ul className={styles.treeview_menu}>
                            <li>
                                <a href="/dashboard">
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
                    <div className={styles.category_container}  onClick={()=>{toggleShowMenu("users")}}>
                        <div>
                        {isCategoryExpanded("Dashboard") ?(
                                <label className={styles.treatitle} htmlFor="dashboardToggle">
                                    <AiOutlineUser fill="white" />
                                    <span className={styles.selected}>User</span>
                                </label>
                                ):(
                                    <label className={styles.treatitle} htmlFor="dashboardToggle" >
                                        <AiOutlineUser/>
                                        <span>User</span>
                                    </label >
                                )
                            }
                        </div>
                        <img className={`${styles.arrow} ${isCategoryExpanded("users") ? 'expanded' : ''}`} src="/arrow.png" alt="arrow icon"/>
                    </div>
                    {isCategoryExpanded("users") && (
                    <div className={styles.cont}>

                        <ul className={styles.treeview_menu}>
                            <li>
                                <a href="">
                                    <img src="" alt="" />
                                    <span className={styles.list_headers}>New Developers</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="" alt="" />
                                    <span className={styles.list_headers}>New Recruiters</span>
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
    )
}

export default Sidebar;