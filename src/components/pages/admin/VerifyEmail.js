import React, { Component } from 'react'
import Spinner from "./Spinner";
import {Redirect} from "react-router-dom"
import { 
    fetchData, fetchDataWithoutToken, 
   
} from "../../../utils/crud"

class VerifyEmail extends Component{
    state ={

    }


    handleQuery = () => {
        let extURL = document.URL;
        console.log(extURL, "Extracted URL");
        var url = new URL(extURL);
        var emailParam = url.searchParams.get("email");
        var guidParam = url.searchParams.get("guid");
        console.log(emailParam, "Email");
        console.log(guidParam, "GUID");
        this.setState({
          guid: guidParam,
          email: emailParam,
        });
    
        setTimeout(() => {
          // console.log(this.state.email, this.state.guid, "STATE PARAMTERS STORED!!");
    
          fetchDataWithoutToken(
            `/JobVacancy/VerifyGuid?guid=${this.state.guid}&email=${this.state.email}`,
            (data) => {
              console.log(data, "Retrieved");
              this.setState({
                userInfo: data,
                redirect:true
              });
              console.log(this.state.userInfo, "USER INFO");
    
            }
          );
        }, 2000);
      };

      componentDidMount(){
          this.handleQuery();
      }

    render(){
        if (this.state.redirect) {
            return (
              <Redirect
                to={{
                  pathname: "/Application",
                  state: {
                    data: this.state.userInfo,
                  },
                }}
              />
            );
          }
        return(
            
            <>
                <Spinner msg={"Verifying, Please wait..."}/>
            </>
        )
    }
}

export default VerifyEmail;