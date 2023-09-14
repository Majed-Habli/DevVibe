import React, { useState } from "react";
import styles from '../styles/layout.module.css';
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

const Layout = () => {
    
    return(
        <div>
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default Layout;