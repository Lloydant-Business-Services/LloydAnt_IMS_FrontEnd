import React from "react"
import Header from "./header"
import Sidenav from "./sidenav"
import Topnav from "./topnav"
import Footer from "./footer"
import "./layout.css"
import { getUser } from "../utils/auth"
import { logOutUser } from "../utils/helpers"


const Layout = ({ children }) => {
    // let verification = JSON.parse(localStorage.getItem("userData"));
    // if (verification == null) {
    //   logOutUser();
    // }

    return (
        <>
            <Header />
            <Sidenav/>
            <div className="main-content" id="panel">
                <Topnav/>
                <div className="header pb-6">
                    <div className="container-fluid">{children}</div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout
