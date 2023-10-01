import React, { useState, useEffect } from "react";
import styles from '../../styles/sidebar.module.css';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineDashboard } from 'react-icons/ai';
import CustomButton from "../custom button/custombutton";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";

const Sidebar = ({status}) => {
    const [showSubMenu, setShowSubMenu] = useState([]);
    const [navbarOpen, setNavbarOpen] = useState('');
    const [error, setError] = useState('');

    const toggleShowMenu = (category) =>{
        if (showSubMenu.includes(category)) {
            setShowSubMenu(showSubMenu.filter(cat => cat !== category));
        } else {
            setShowSubMenu([...showSubMenu, category]);
        }
    }
    const isCategoryExpanded = (category) => showSubMenu.includes(category);

    const LogOut = async () =>{
        try {
            const response = await sendRequest({
                route: "/guest/logout",
                method: requestMethods.GET,
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
                localStorage.clear();
                window.location.href = '/';
            }else{
                setError("Couldn't logout!");
                console.log(error);
            }
          } catch (error) {
            console.error("api calling failed:", error);
            if(error.response.status === 401){
                localStorage.clear();
                window.location.href = '/'
            }
          }
    }

    useEffect(()=>{
        setNavbarOpen(status)
    },[status])

    return(
        <div className={`${navbarOpen? styles.show_menu: styles.container}`}>
            <div>

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
                                        <span className={styles.list_headers}>Summary</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/dashboard/stats">
                                        <img src="" alt="" />
                                        <span className={styles.list_headers}>Stats</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        )}
                    </li>
                    <li className={styles.treeview}>
                        <div className={styles.category_container}  onClick={()=>{toggleShowMenu("users")}}>
                            <div>
                            {isCategoryExpanded("users") ?(
                                    <label className={styles.treatitle} htmlFor="usersToggle">
                                        <AiOutlineUser fill="white" />
                                        <span className={styles.selected}>User</span>
                                    </label>
                                    ):(
                                        <label className={styles.treatitle} htmlFor="usersToggle" >
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
                                    <a href="/dashboard/users/new-developers">
                                        <img src="" alt="" />
                                        <span className={styles.list_headers}>New Developers</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/dashboard/users/new-recruiters">
                                        <img src="" alt="" />
                                        <span className={styles.list_headers}>New Recruiters</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/dashboard/users/old-developers">
                                        <img src="" alt="" />
                                        <span className={styles.list_headers}>Developers</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/dashboard/users/old-recruiters">
                                        <img src="" alt="" />
                                        <span className={styles.list_headers}>Recruiters</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        )}
                    </li>
                    <li className={styles.treeview}>
                        <div className={styles.category_container}  onClick={()=>{toggleShowMenu("Skills")}}>
                            <div>
                            {isCategoryExpanded("Skills") ?(
                                    <label className={styles.treatitle} htmlFor="usersToggle">
                                        <img className={styles.icon} src="/sidebar-white-skill.png" alt="" />
                                        <a href="/dashboard/skills">
                                            <span className={styles.selected}>Skills</span>
                                        </a>
                                    </label>
                                    ):(
                                        <label className={styles.treatitle} htmlFor="usersToggle" >
                                                <img className={styles.icon} src="/sidebar-default-skill.png" alt="" />
                                            <a href="/dashboard/skills">
                                                <span>Skills</span>
                                            </a>
                                        </label >
                                    )
                                }
                            </div>
                        </div>
                        
                    </li>
                    
                </ul>
            </div>
            <div className={styles.button_container}>
                <CustomButton title={'Logout'} width={120} height={35} display={'flex'} alignItems={'center'} justifyContent={'center'} backgroundColor={'#FCC860'} onClick={()=>LogOut()}/>
            </div>
        </div>
    )
}

export default Sidebar;