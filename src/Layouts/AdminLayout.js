import React from "react"
import Header from "../components/header"
import Sidenav from "../components/sidenav"
import Topnav from "../components/topnav"
import Footer from "../components/footer"
import "../components/layout.css"
import Role from "../components/pages/admin/RoleAssignment"
import Dashboard from "../components/pages/admin/dashboard"
// import MenuManagement from "./components/pages/admin/MenuManagement"
import MenuManagement from "../components/pages/admin/MenuManagement"
import {logOutUser} from "../utils/helpers"


import {Roles} from "../utils/Identifiers"
import { getUser } from "../utils/auth"
import {Route, Switch, useRouteMatch} from "react-router-dom";


const Layout = (props) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user == null || user.roleId != Roles.SuperAdmin) {
        logOutUser();
    }

    let {path, url} = useRouteMatch();

    return (
        <>
           
                <Switch>
					<Route path={'/admin'} component={Dashboard} exact={true}/>
                    <Route path={"/RoleManagement"} component={Role} /> 
                    <Route path={"/MenuManagement"} component={MenuManagement} />
                    </Switch>
                        
            
        </>
    )
}

export default Layout;
