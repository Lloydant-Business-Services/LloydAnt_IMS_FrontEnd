import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn,getUser } from "../utils/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/home`) {
    navigate("/home")
    return null
  }

  const user = getUser();
  return <Component {...rest} location={location} user={user} />
}

export default PrivateRoute