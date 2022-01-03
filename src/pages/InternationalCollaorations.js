import React from "react";
import { Component } from "react";
import hero from "../images/hero.png";
import logosm from "../assets/img/theme/unizik.png";
// import logobg from "../images/ziklogo.png"
import {PushSpinner, ClassicSpinner, MetroSpinner} from "react-spinners-kit"


import "../styles/global.css";
import { Link, Redirect } from "react-router-dom";
import about1 from "../../src/images/about1.png";
import about2 from "../../src/images/about21.png";
import hiring from "../../src/images/hiring.svg";
import interview from "../../src/images/interview.svg";
import onboarding from "../../src/images/onboarding.svg";
import compensation from "../../src/images/compensation.svg";
import lloydant from "../../src/images/llan.png";
import team4 from "../images/use.png";
import manualGuide from "../components/Reusables/HRStaffManual.pdf";
import TextTransition, { presets } from "react-text-transition";
import { Fade, AttentionSeeker } from "react-awesome-reveal";
import { StartAnim } from "../pages/home_page";
import $ from 'jquery'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";

class InternatiionalCollaborations extends Component {
    state = {};

    customAnimation() {
        var elem = document.getElementById("welcome");
        var pos = 0;
        var id = setInterval(frame, 5);
        function frame() {
            if (pos == 350) {
                clearInterval(id);
            } else {
                pos++;
                elem.style.top = pos + "px";
                elem.style.left = pos + "px";
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            $("#cover-spin").fadeOut(500)
        }, 4000)
    }

        // this.customAnimation();

        // StartAnim();    }
    render() {
        var dateYear = new Date();
        return (
            <>
            <div id="cover-spin">
            {/* <div className="container sp" style={{zIndex:'9999'}}> */}
          <div className="jumbotron jumbo" style={{backgroundColor:'transparent'}}>
            <div className="metro-spin">
            <MetroSpinner
              size={90}
              color={"white"}
              loading={this.state.loading}
              
              
            />
            </div>
            <small><b>{this.props.msg}</b></small>
          {/* </div> */}
        </div>
            </div>
                {/* <nav
              className="navbar navbar-top navbar-expand navbar-light m-0 p-0"
              style={{ backgroundColor: "#CCEFF9" }}
            >
              <div className="container">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <a
                    className="navbar-brand"
                    href="#"
                    style={{ display: "inline-block" }}
                  >
              
                    <span
                      className="avatar avatar-sm"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img src={logosm} className="pt-5" />
                    </span>
                  </a>
    
                  <ul className="navbar-nav align-items-center ml-md-auto">
                    <li className="nav-item d-xl-none">
                      <div
                        className="pr-3 sidenav-toggler sidenav-toggler-light"
                        data-action="sidenav-pin"
                        data-target="#sidenav-main"
                      >
                        <div className="sidenav-toggler-inner">
                          <i className="sidenav-toggler-line" />
                          <i className="sidenav-toggler-line" />
                          <i className="sidenav-toggler-line" />
                        </div>
                      </div>
                    </li>
    
                    <li className="nav-item">
                      {
                        !localStorage.getItem("userData") ? (
                          <>
                            <Button
                              className="btn btn-outline-primary sofia"
                              to="/Login"
                              color={"primary"}
                              tag={Link}
                            >
                              Sign In
                            </Button>{" "}
                          </>
                        ) : (
                          <span
                            className="btn btn-secondary"
                            style={{ zIndex: "9999" }}
                          >
                            <div className="media align-items-center">
                              <span className="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder" src={team4} />
                              </span>
    
                              <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle
                                  nav
                                  caret
                                  style={{ fontSize: "14px" }}
                                >
                                  {this.state.payLoad?.username}
                                </DropdownToggle>
    
                                <DropdownMenu right>
                                  <DropdownItem>
                                    <Link
                                      style={{ color: "black" }}
                                      to={{ pathname: "/Dashboard" }}
                                      className="sodia"
                                    >
                                      Proceed to Dashboard
                                    </Link>
                                  </DropdownItem>
                     
    
                                  <DropdownItem
                                    onClick={this.logout}
                                    style={{ color: "black" }}
                                    className="sofia"
                                  >
                                    <b style={{ color: "black" }}>Logout</b>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </span>
                        )
    
                      }
    
                      <a href={manualGuide} download className="text-warning sofia">
                        <b>Download User Guide</b>
                      </a>
    
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
     */}
                <section className="pb-5 pr-2 pl-2 overflow-hidden shadow-sm hero int-col" style={{ backgroundColor: "rgb(204, 239, 249)" }}>
                    <h2 className="display-4 sofia text-uppercase">Nnamdi Azikiwe University</h2>
                    <div className="container" id="welcome">
                        <div className="row">
                            <div className="col-12 col-md-8 align-self-center mt-3 mb-3 lft-ban" style={{ backgroundColor: "rgb(61 64 109 / 62%)", padding: "40px" }}>
                                <center>
                                    {/* <h2 className="display-3 font-weight-700"> */}
                                    <div
                                        className="col-sm-12"
                                        //   style={{ backgroundColor: "transparent" }}
                                    >
                                        <img src={logosm} className="" style={{ padding: "10px", backgroundColor: "white", borderRadius: "50%", height: "100px" }} />
                                    </div>
                                    {/* <h2 className="display-4 font-weight-700 sofia">
                      Nnamdi Azikiwe University
                      </h2> */}

                                    <br />
                                    <h2 className="display-3 font-weight-700 sofia">Directorate for International Collaborations and Linkages</h2>

                                    {/* </h2> */}
                                  

                                </center>
                                
                                <p className="mb-4 mt-2 font-weight-700 sofia">
                                        A channel for improved data Collection for Foreign students and scholars.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br />
                                    </p>
                               

                                {/* <Button
                      className="btn btn-primary mb-2 col-12 col-sm-auto"
                      to="/JobPositions"
                      color={"primary"}
                      tag={Link}
                    >
                      View Jobs
                    </Button> */}
                                <center>
                                    <Link to={{ pathname: "ForeignVistationType" }} className="btn btn-outline-accent mb-2 col-12 col-sm-auto sofia">
                                        Get Started <i className="fa fa-arrow-right"/>
                                    </Link>
                                </center>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-fluid mt-5 min-vh-20 bg-lighter">
                    {/* Footer */}
                    <footer className="footer py-auto bg-lighter">
                        <div className="row align-items-center justify-content-lg-between">
                            <div className="col-lg-12">
                                <div className="copyright text-center text-muted">
                                    Copyright © {dateYear.getFullYear()}{" "}
                                    <a href="https://www.lloydant.com/" className="font-weight-bold ml-1" target="_blank">
                                        <br />
                                        <br />
                                        <img src={lloydant} style={{ width: "50px" }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </>
        );
    }
}

export default InternatiionalCollaborations;
