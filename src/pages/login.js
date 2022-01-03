import React from "react";

import { handleLogin, isLoggedIn } from "../utils/auth";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { LoginRequest, fetchData, fetchDataWithoutToken } from "../utils/crud";
import {MetroSpinner, PulseSpinner } from "react-spinners-kit";
import logosm from "../images/ziklogosm.png"
import logornd from "../images/logobg.png";
import check from "../images/check-success.svg";

import login from "../images/login.jpg";
import {Fade} from "reactstrap"
import { Modal as AntModal, Button as AntButton } from 'antd';
import Spinner from "../components/pages/admin/Spinner";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

var HeroStyle = {
  width: "100%",
  height: "60vh",
  backgroundImage: "url(" + login + ")",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
};

var Overlay = {
  backgroundColor: "rgba(37, 59, 128, 0.8)",
  position: "relative",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  textAlign: "center",
}

export default class LoginPage extends React.Component {
  state = {
    username: ``,
    password: ``,
    spin: false,
    newRedirect: false,
    logging: false,
  };

  proceed = () => {
    this.setState({
      navigate: true,
    });
  };

  logOut = () => {
    localStorage.clear();
    this.setState({
      loggedIn: false,
    });
  };

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    this.setState({
      spin:true
    })
    let currentState = this;
   
    event.preventDefault();
let loginLoad = {
  password: this.state.password,
  username: this.state.username
}



LoginRequest("/Users/authenticate", loginLoad, data => {
  // console.log(data, "Login Load")
  if(data.errorFeed == 400){
    this.setState({
      // logging: false
      spin: false
    })
    alert("Invalid Login Credentials")
    return false
  }
  if (data.loginStatus == 200) {
    
    fetchDataWithoutToken(`/Staff/${data.staffId}`, (data) => {
        console.log(data, "Reload");
        localStorage.setItem("DTOFULL", JSON.stringify(data))
      });
    
      setTimeout(()=>{
          localStorage.setItem("userData", JSON.stringify(data));
          console.log(data, "User Data");
          window.location.href = "Dashboard"
            currentState.setState({
              // newRedirect: true,
              // logging:false
            });

          },3000)
      
        }
})
    

  
  }

  handleCancel = () => {
      this.setState({forgotPassword:false})
  }

  handleReset = (e) => {
      e.preventDefault();
      this.setState({loading:true})
      setTimeout(() => {
          this.setState({
              forgotPassword:false,
              isSuccess:true,
              loading:false
          })
      },2000)
  }

  componentDidMount() {
    if (localStorage.getItem("userData")) {
      // alert("You are already Logged In")
      
      this.setState({
        loggedIn: true,
      });
    }
  }

  render() {
      require('antd/dist/antd.css');
    if (this.state.loggedIn) {
      return <Redirect to={{ pathname: "/Dashboard" }} />;
    }

    if (this.state.newRedirect) {
      return <Redirect to={{ pathname: "/Dashboard" }} />;
    }
    return (
      <React.Fragment>
        <Fade>
        <div>
          {this.state.logging ? (
            <div className="jumbo-back">
              <div className="container sp">
                <div className="jumbotron jumbo">
                  <div className="metro-spin">
                    <MetroSpinner
                      size={90}
                      color={"#123abc"}
                      loading={this.state.loading}
                    />
                  </div>
                  <p>
                    <b>{this.props.msg}</b>
                  </p>
                </div>
              </div>
            </div>
          ) : null}

{this.state.spin ? (
          <Spinner msg={"Loggin you in..."} />
        ) : null}

          <div className="main-content">
            {/* Header */}
            {/* bg-gradient-primary */}
            <div style={HeroStyle}>
                <div style={Overlay}>

                    <div className="header py-7 py-lg-8"> 
                      <div className="container">
                        <div className="header-body text-center mb-5">
                          <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-8 col-md-8 px-3">
                            <span 
                          className="avatar avatar-sm"
                          style={{ backgroundColor: "transparent",}}
                        >
                          <img style={{width:"120px"}} src={logornd} />
                        </span>
                              <h1 className="text-white">Nnamdi Azikiwe University</h1>
                              {/* <h4 className="text-white">LiteHR</h4> */}
                              <p className="text-lead text-white">
                                Human Resource Manager
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                          x={0}
                          y={0}
                          viewBox="0 0 2560 100"
                          preserveAspectRatio="none"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon
                            className="fill-default"
                            points="2560 0 2560 100 0 100"
                          />
                        </svg>
                      </div> */}
                    </div>
                    
                </div>
            </div>
{/* Page content */}
            <div className="container mt--8 pb-5">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7">
                  <div
                    className="card bg-secondary border-0 mb-0"
                    id="anything"
                  >
                    <div className="card-body px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <h1 className="sofia">Sign In</h1>
                      </div>
                      <form
                        method="post"
                        onSubmit={(event) => {
                          this.handleSubmit(event);
                          // navigate(`/app/profile`)
                        }}
                      >
                        <div className="form-group mb-3">
                          <div className="input-group input-group-merge input-group-alternative">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="ni ni-email-83 text-light" />
                              </span>
                            </div>
                            <input
                              required
                              className="form-control"
                              placeholder="Username"
                              type="text"
                              value={this.state.username}
                              onChange={(e) =>
                                this.setState({ username: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group input-group-merge input-group-alternative">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="ni ni-lock-circle-open text-light" />
                              </span>
                            </div>
                            <input
                              required
                              className="form-control"
                              placeholder="Password"
                              type="password"
                              value={this.state.password}
                              onChange={(e) =>
                                this.setState({ password: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="custom-control custom-control-alternative">
                        
                          <label
                           
                            htmlFor=" customCheckLogin"
                          >
                              <i
                          className="fa fa-hand-o-right text-warning"
                          />&nbsp;<a href="GetLoginDetails" className="text-warning"><small className="text-warning">I have not been assigned a Login Credential</small></a>
                          </label>
                        </div>
                       
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary my-4 sofia"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                      <div className="row text-center">
                      <div className="col-sm-12">
                            <a href="#" className="sofia text-center" onClick={() => this.setState({forgotPassword:true})} style={{fontSize:'12px'}}>Forgot Password?</a>
                            </div>
                    </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      {/* <a href="#" className="text-light"><small>Forgot password?</small></a> */}
                    </div>
                    <div className="col-6 text-right">
                      {/* <a href="#" className="text-light"><small>Create new account</small></a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AntModal title={<h3 className="sofia">Password Reset</h3>} visible={this.state.forgotPassword} onCancel={this.handleCancel}
        footer={[
            <AntButton key="back" onClick={this.handleCancel}>
              Cancel
            </AntButton>,
            <AntButton 
            onClick={this.handleReset}
            // disabled={this.state.isValidated ? false : true} 
            type="primary" loading={this.state.loading}>
              Reset
            </AntButton>,
           
          ]}
        >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label className="label-control sofia">
                                Enter Staff Username
                            </label>
                            <input name="staff_username" type="text" className="form-control sofia" placeholder="NAU/ST/xxxx"/>

                    </div>
                    </div>
                    <div className="col-sm-12">
                    {this.state.loading ? <p className="sofia" style={{fontSize:'13px'}}>  <div className="metro-spin text-center">
                    <PulseSpinner
                      size={40}
                      color={"#123abc"}
                      loading={true}
                    />
                   
                  </div>Validating staff username...</p> : null}

                  {this.state.isValidated ? <p className="sofia text-success" style={{fontSize:'13px'}}>Staff username validated! <i className="fa fa-check"/></p> : null}
                  {this.state.isNotValidated ? 
                  <p className="sofia text-danger" style={{fontSize:'13px'}}>Staff validation failed! Username does not exist <i className="fa fa-cancel"/></p>
                 : null}
                   
                    </div>

                    
                  
                </div>
               
            </div>

       
      </AntModal>
       
      <AntModal title={<h3 className="sofia">Reset Successful!</h3>} visible={this.state.isSuccess} onOk={this.handleOk} onCancel={false}
        footer={[
            <AntButton key="back" onClick={() => this.setState({isSuccess:false})}>
              Ok
            </AntButton>,
           
           
          ]}
        >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <p className="text-center text-success">
                            <img src={check}/>
                        </p>
                        <p className="sofia" style={{fontSize:'14px'}}>Your password reset request was successful. A password reset link has been sent to the email address linked to the username provided.</p>
                    </div>
                   

                    
                  
                </div>
               
            </div>

       
      </AntModal>
       
        </Fade>
      </React.Fragment>
    );
  }
}
