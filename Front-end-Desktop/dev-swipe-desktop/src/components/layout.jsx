import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {

    return(
        <div>
            <p>this is our layout</p>

            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/dashboard">Work</a>
                </li>
            </ul>
            <Outlet/>
        </div>
    )
}

export default Layout;