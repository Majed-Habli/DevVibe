import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {

    return(
        <div>
            <p>this is our layout</p>
            <div>
                <img src="/Logo2-0.png" alt="app logo" />
            </div>

            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/dashboard"></a>
                    <ul>
                        <li>
                            <a href="">
                                <img src="" alt="" />
                                <span>hey</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="" alt="" />
                                <span>hey</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="" alt="" />
                                <span>hey</span>
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