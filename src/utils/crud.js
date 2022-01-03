import { getUser, isLoggedIn } from "./auth"
import {Roles} from "./Identifiers"
import {logOutUser} from "..//utils/helpers"

//export const URL = "http://localhost/LiteHR/api"
export const URL = "http://10.211.55.3/LiteHR/api"
 //export const URL = "http://97.74.6.243/LiteHR/api"
//export const URL = "https://bhrnau.lloydant.com/api"
// export const URLE = "http://192.169.155.119/elearnv2/api";


const lStorage = JSON.parse(localStorage.getItem("userData"));
var myHeaders = () => {
  const user = getUser()
  const authorization = `Bearer ${user.token}`
  const newAuth = 'Bearer '.concat(lStorage.token);
  const fetchHeader = new Headers();
  fetchHeader.append("Accept", "application/json")
  fetchHeader.append("Content-Type", "application/json")
  fetchHeader.append("Authorization", newAuth)
  fetchHeader.append('Access-Control-Allow-Origin', '*');
  // fetchHeader.append("Content-Type", "multipart/form-data");
  // fetchHeader.append("Authorization", authorization)

  return fetchHeader
}
var myLoginHeaders = () => {
  const user = getUser()
  const fetchHeader = new Headers()
  fetchHeader.append("Accept", "application/json")
  fetchHeader.append("Content-Type", "application/json")
  fetchHeader.append('Access-Control-Allow-Origin', '*');

  return fetchHeader
}


export const fetchDataWithoutToken = (endpoint, callback) => {
  var requestOptions = {
    method: "GET",
    headers: myLoginHeaders,
    redirect: "follow",
    credentials: "include",
  }
  

  fetch(URL + endpoint, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(jsondata => {
      callback(jsondata)
    })
    .catch(error => console.log("An error Ocuured: " + error))
}




export const fetchData = (endpoint, callback) => {  
  var requestOptions = {
    method: "GET",
    headers: myHeaders(),
    redirect: "follow",
    credentials: "include",
  }
  

  fetch(URL + endpoint, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(jsondata => {
      callback(jsondata)
    })
    .catch(error => console.log("An error Ocuured: " + error))
}


export const postData = (endpoint, data, callback) => {
  var requestOptions = {
    method: "POST",
    headers: myHeaders(),
    redirect: "follow",
    body: JSON.stringify(data),
  }

  fetch(URL + endpoint, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(jsondata => {
      callback(jsondata)
    })
    .catch(error => console.log("An error Occured: " + error))
}

export const LoginRequest = (endpoint, data, callback) => {
  var requestOptions = {
    method: "POST",
    headers: myLoginHeaders(),
    redirect: "follow",
    body: JSON.stringify(data),
  }

  fetch(URL + endpoint, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(jsondata => {
      callback(jsondata)
    })
    .catch(error => console.log("An error Occured: " + error))
}

export const editDataWithPatch = (endpoint, data, callback) => {
  var requestOptions = {
    method: "PATCH",
    headers: myHeaders(),
    redirect: "follow",
    body: JSON.stringify(data),
  }

  fetch(URL + endpoint, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(jsondata => {
      callback(true)
    })
    .catch(error => console.log("An error Ocuured: " + error))
}

export const editData = (endpoint, data, callback) => {
  var requestOptions = {
    method: "PUT",
    headers: myHeaders(),
    redirect: "follow",
    body: JSON.stringify(data),
  }

  fetch(URL + endpoint, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(jsondata => {
      callback(jsondata)
    })
    .catch(error => console.log("An error Ocuured: " + error))
}

export const deleteData = (endpoint, callback) => {
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders(),
    redirect: "follow",
  }

  fetch(URL + endpoint, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(jsondata => {
      callback(true)
    })
    .catch(error => console.log("An error Ocuured: " + error))
}

export const deleteDataWithReturnPayload = (endpoint, callback) => {
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders(),
    redirect: "follow",
  }

  fetch(URL + endpoint, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(jsondata => {
      callback(jsondata)
    })
    .catch(error => console.log("An error Ocuured: " + error))
}


