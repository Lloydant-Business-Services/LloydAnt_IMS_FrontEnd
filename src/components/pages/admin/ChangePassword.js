import React from "react"
import { fetchData, postData, editData, deleteData, editDataWithPatch } from "../../../utils/crud"
import AlertBox from "./alertBox"
import Spinner from "../admin/Spinner"
import checkIcon from "../../../images/checkIcon.png"
import checkIcon2 from "../../../images/checkIcon2.png"
import axios from "axios";
import { URL } from "../../../utils/crud"

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  

} from "reactstrap";
import {Redirect} from "react-router-dom";
import { post } from "jquery"

export default class ChangePassword extends React.Component {
  state = {
    departments: [],
    documentType: [],
    name: "",
    id: 0,
    active: true,
    documentType: "",
    added: false,
    spin:false,
    payLoad: JSON.parse(localStorage.getItem("userData")),

  }

  loadStaff = () => {
      let currentState = this

      
      currentState.setState({
          spin:true
      })

    
   
  }

  initiateChangePassword = () => {







      if(this.state.newPassword != this.state.confirmPassword){
          alert("Passwords Do not Match")
          return false
      }
      else{
        this.setState({spin:true})
          let passwordLoad = {
     
            "oldPassword": this.state.oldPassword,
            "userId": this.state.payLoad?.id,
            "newPassword": this.state.newPassword
          }
          postData(`/Staff/ModifyUserPassword`, passwordLoad, data => {
            console.log(data, "res")
              this.setState({spin:false, successCard:true})
          })
      }
   

      // let passwordLoad = {
      //   "oldPassword": this.state.oldPassword,
      //   "userId": 12,
      //   "newPassword": this.state.newPassword
      // }

      // const headers = {
      //   "Content-Type": 'application/json',
      //   "Authorization": 'Bearer '.concat(this.state.payLoad?.token),
      //   "Access-Control-Allow-Origin": '*'
      // }
      
      // axios.post(URL + "/Staff/ModifyUserPassword", passwordLoad, {
      //     headers: headers
      //   })
      //   .then((response) => {
      //     this.setState({spin:false})
      //     console.log(response)
      //     alert("success")
      //   })
      //   .catch((error) => {
      //     this.setState({spin:false})
      //     console.log(error);
      //     alert(error);
      //   })
  }

  componentDidMount() {

    // fetchData("/DocumentType", data => {
    //   this.setState({ documentType: data })
    //   console.log(this.state.documentType, "Levels")
    // })
  }

  
  
  

  render() {
      if(this.state.redirect){
          return(
            <Redirect to={{pathname:"/AdminStaffDocumentUpdate", state:{staffInfo:this.state.staffInfo}}}/>
          )
      }
    return (
      <>


<Modal isOpen={this.state.successCard}>
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>
            <div className="row justify-content-center">
              {/* <img src={checkIcon2} style={{width:"60px", height:"60px"}}/> */}
              <i className="fa fa-check text-primary" style={{fontSize:"14px"}}/>
              </div>
            <h3 className="text-center">Your Password was successfully updated!</h3>
          </ModalBody>
          <ModalFooter>
            <Button
              // className="ok-btn"
              color={"success"}
              onClick={() => {
                this.setState({ successCard: false });
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        {this.state.spin ? <Spinner/> : null}

        {this.state.added == true ? (
          <AlertBox ok={this.closeAdded} message={"Succesfully Added!"} />
        ) : null}
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Change Password{" "}
                <span className="h3 text-muted">
                
                </span>
              </h6>
              <span className="text-sm d-block">
               Security an Privacy
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>


          {/* Card stats */}
          <div className="row justify-content-center">
            <hr className="mx-0" />
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
        {/* <h4 className=" mb-0">Manage Staff Document</h4> */}
                    </div>
                    <div className="col">
                     
                    </div>
                  </div>
                </div>
                <div className="card-body">
                <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                         Enter Current Password
                        </label>
                        <input
                          className="form-control"
                          id="myInp"
                          type="password"
                          // name="docType"
                          value={this.state.oldPassword}
                          onChange={e => {
                            this.setState({ oldPassword: e.target.value })
                          }}
                        />
                </div>

                <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                         Enter New Password
                        </label>
                        <input
                          className="form-control"
                          id="myInp"
                          type="password"
                          // name="docType"
                          value={this.state.newPassword}
                          onChange={e => {
                            this.setState({ newPassword: e.target.value })
                          }}
                        />


                        
                </div>

                <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                         Confirm New Password
                        </label>
                        <input
                          className="form-control"
                          id="myInp"
                          type="password"
                          name="docType"
                          value={this.state.confirmPassword}
                          onChange={e => {
                            this.setState({ confirmPassword: e.target.value })
                          }}
                        />


                        
                </div>
                <br/>

                <button
                    type="button"
                    className="btn btn-info text-white"
                   onClick={this.initiateChangePassword}
                    
                  >
                    Change Password
                  </button>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div></div>
    

         
     
      
        </div>
      </>
    )
  }
}
