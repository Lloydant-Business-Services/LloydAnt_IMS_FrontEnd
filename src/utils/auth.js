import { URL } from "./crud"
import {Redirect} from "react-router-dom";
export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("liteHRUser")
    ? JSON.parse(window.localStorage.getItem("liteHRUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("liteHRUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
  var myHeaders = new Headers()
  myHeaders.append("Accept", "application/json")
  myHeaders.append("Content-Type", "application/json")
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }

  fetch(URL + "/Users/authenticate", requestOptions)
    .then(response => {
      return response.json()
    })
    .then(jsondata => {
      return setUser({
        username: jsondata.username,
        userId: jsondata.id,
        roleId: jsondata.roleId,
        role: jsondata.role,
        token: jsondata.token,
      })
    })
    .catch(error => console.log("An error Ocuured: " + error))

  return false
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}

export const logout = () => {
  setUser({})
  localStorage.clear()
}
