// import { Link } from "gatsby"
import React, { Component, useState } from "react";
import logosm from "../images/ziklogosm.png";
import logobg from "../images/ziklogo.png";
import logornd from "../images/logobg.png";
import newLogo from "../images/logoFresh.png";
import lloydant from "../images/llan.png";
import { ParentMenu, Roles, ParentName } from "./Barn";
import { Link, Redirect } from "react-router-dom";
import people from "../images/people.svg";
import menu from "../images/menuu.svg";
import leave from "../images/leave.svg";
import doc from "../images/doc.svg";
import dept from "../images/dept.svg";
import StaffCategory from "../images/fac.svg";
import assetIcon from "../images/settings.svg";
import jobMgt from "../images/idea.svg";
import $ from "jquery";
import { enquireScreen } from 'enquire-js';

// import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
  Card,
  CardBody,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import "./myJS";
import { render } from "@testing-library/react";
import { fetchData, fetchDataWithoutToken } from "../utils/crud";

class Sidenav extends Component {
  // state = {
  //   payload: JSON.parse(localStorage.getItem("userData"))
  // }
  constructor() {
    super();
    this.state = {
      name: "React",
      popoverOpen: false,
      payload: JSON.parse(localStorage.getItem("userData")),
      staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    };
    this.togglePopover = this.togglePopover.bind(this);
  }

  openNav() {
    var t = document.getElementById("myNav");
    t.style.width = "50%";
  }

  closeNav() {
    var t = document.getElementById("myNav");
    t.style.width = "0%";
  }

  toggleOrgSettings = (data) => {
   
     if(this.state.menu_id != data){
      this.setState({ menu_id: data });

     }
     else{
      this.setState({ menu_id: null });

     }

  };

  toggleProfile = () => {
    if (!this.state.showProfile) {
      this.setState({ showProfile: true });
    } else {
      this.setState({ showProfile: false });
    }
  };

  toggleLeave = () => {
    if (!this.state.showLeave) {
      this.setState({ showLeave: true });
    } else {
      this.setState({ showLeave: false });
    }
  };

  toggleRecruitment = () => {
    if (!this.state.showRecruitment) {
      this.setState({ showRecruitment: true });
    } else {
      this.setState({ showRecruitment: false });
    }
  };
  toggleMyDocument = () => {
    if (!this.state.showMyDocument) {
      this.setState({ showMyDocument: true });
    } else {
      this.setState({ showMyDocument: false });
    }
  };

  toggleTraining = () => {
    if (!this.state.showTraining) {
      this.setState({ showTraining: true });
    } else {
      this.setState({ showTraining: false });
    }
  };

  togglePopover() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  loadRoleMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetMenuByRole?roleId=${this.state.payload?.roleId}`,
      (data) => {
        this.setState({ menuList: data });
      }
    );
  };
  loadStaffMgtMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetMenuByRole?roleId=${this.state.payload?.roleId}&parentMenuName=${ParentName.ManageStaff}`,
      (data) => {
        this.setState({ staffMgt: data });
      }
    );
  };
  loadLeaveMgtMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetMenuByRole?roleId=${this.state.payload?.roleId}&parentMenuName=${ParentName.LeaveMgt}`,
      (data) => {
        this.setState({ leaveMgt: data });
      }
    );
  };

  loadLeaveRecruitmentMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetMenuByRole?roleId=${this.state.payload?.roleId}&parentMenuName=${ParentName.Recruitment}`,
      (data) => {
        this.setState({ recruitMenu: data });
      }
    );
  };

  loadLeaveMyDocumentMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetMenuByRole?roleId=${this.state.payload?.roleId}&parentMenuName=${ParentName.MyDocument}`,
      (data) => {
        this.setState({ documentMenu: data });
      }
    );
  };

  loadLeaveTrainingMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetMenuByRole?roleId=${this.state.payload?.roleId}&parentMenuName=${ParentName.Training}`,
      (data) => {
        this.setState({ trainingMenu: data });
      }
    );
  };

  //All Sub Menu Loader

  forAllMyProfileMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetFreeRoleMenu?parentMenuName=${ParentName.MyProfile}`,
      (data) => {
        this.setState({ allProfileMenu: data });
      }
    );
  };

  forAllStaffMgtMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetFreeRoleMenu?parentMenuName=${ParentName.ManageStaff}`,
      (data) => {
        this.setState({ allStaffMgt: data });
      }
    );
  };

  forAllLLeaveMgtMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetFreeRoleMenu?parentMenuName=${ParentName.LeaveMgt}`,
      (data) => {
        this.setState({ allLeaveMgt: data });
      }
    );
  };

  // forAllRecruitmentMenu = () => {
  //   fetchData(`/Menu/GetMenuByRole?roleId=${this.state.payload?.roleId}&parentMenuName=${ParentName.Recruitment}`, data => {
  //     this.setState({allRecruitMenu:data})
  //   })
  // }

  forAllTrainingMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetFreeRoleMenu?parentMenuName=${ParentName.Training}`,
      (data) => {
        this.setState({ allTrainingMenu: data });
      }
    );
  };
  forAllLoadLeaveMyDocumentMenu = () => {
    fetchDataWithoutToken(
      `/Menu/GetFreeRoleMenu?parentMenuName=${ParentName.MyDocument}`,
      (data) => {
        this.setState({ allDocumentMenu: data });
      }
    );
  };

  loadStandAloneMenu = () => {
    fetchDataWithoutToken(
      `/Menu/StandAloneMenus?roleId=${this.state.payload?.roleId}`,
      (data) => {
        this.setState({ standAloneMenus: data });
      }
    );
  };

  loadFreeMenu = () => {
    fetchDataWithoutToken(`/Menu/FreeMenu`, (data) => {
      this.setState({ freeMenu: data });
    });
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: b,
      });
    });
    window.scrollTo(0, 0);
    let verification = JSON.parse(localStorage.getItem("userData"));

    if (verification == null) {
      this.setState({
        userRedirect: true,
      });
    }
this.loadRoleMenu();
    // if (verification.roleId != Roles.SuperAdmin) {
    //   localStorage.clear();
    //   this.setState({
    //     userRedirect: true,
    //   });
    // }
    //this.loadMyProfileMenu();
    this.loadStaffMgtMenu();
    this.loadLeaveMgtMenu();
    this.loadStandAloneMenu();
    this.loadLeaveRecruitmentMenu();
    this.loadLeaveMyDocumentMenu();
    this.loadLeaveTrainingMenu();
    this.loadFreeMenu();
    this.forAllLLeaveMgtMenu();
    this.forAllLoadLeaveMyDocumentMenu();
    this.forAllMyProfileMenu();
    this.forAllStaffMgtMenu();
    this.forAllTrainingMenu();
    // fetchData(`/Menu/GetMenuByRole?roleId=${this.state.payload?.roleId}&parentMenuId=1`, data => {
    //   this.setState({menuItems:data})
    // })
  }
  logout = () => {
    localStorage.clear()
    this.setState({
      logUserOut: true
    })
  }
  toggleSideNav = () => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    }
  };

  render() {
    var menu__col = false
    if(this.state.logUserOut){
      return(
        <Redirect
          to={{pathname:"/Home"}}
        />
      )
      
    }

    let screen_width = $(window).width();
    const { popoverOpen } = this.state;

    if(screen_width > 700){
        document.body.classList.add("g-sidenav-show");
        document.body.classList.add("g-sidenav-pinned");
    }

   

    return (
      <>
        <nav
          className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs  navbar-dark bg-main ghost"
          id="sidenav-main"
          style={{ backgroundColor: "#172b4d;", width:"240px" }}
        >
          <div className="scrollbar-inner">
            {/* Brand */}
            <div
              className="sidenav-header2 d-flex align-items-center"
              style={{
                backgroundColor: "#ffffff26",
                paddingBottom: "20px",
              }}
            >
              <Link className="mx-auto" style={{ paddingTop: "40px" }}>
                {/* <img src={logosm} class="navbar-brand-img" alt="..."/> */}
                {/* <h2 className="mb-0 text-white pop-font">HRM</h2> */}
                <span
                  className="avatar avatar-sm"
                  style={{
                    backgroundColor: "transparent",
                    width: "40px",
                    height: "50px",
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  <img
                    alt="Image placeholder"
                    src={newLogo}
                    style={{ width: "40px" }}
                  />
                </span>
                <h3 className="d-inline ml-4 text-white font-weight-700">
                  {" "}
                  LloydAnt IMS
                </h3>
              </Link>
            </div>

            <div className="navbar-inner" style={{ width: "350px" }}>
              {/* Collapse */}
              <div
                className="collapse navbar-collapse"
                id="sidenav-collapse-main"
              >
                {/* Admin*/}

                <ul
                  style={{ marginLeft: "-10px" }}
                  className="navbar-nav pop-font"
                >
                  <li className="nav-item">
                    <Link
                      onClick={this.toggleSideNav}
                      activeClassName="active"
                      className="nav-link "
                      to={{ pathname: "/Dashboard" }}
                    >
                      <i className="ni ni-app" />
                      <span
                        className="nav-link-text"
                        style={{ fontSize: "12px" }}
                      >
                        Dashboard
                      </span>
                    </Link>
                  </li>


                  {this.state.menuList && this.state.menuList.map(x => {
                    return(
<>
                  
                  <li className="nav-item">
                    <Link
                      activeClassName="active"
                      className="nav-link"
                      onClick={() => this.toggleOrgSettings(x.id)}
                      style={{ marginBottom: "0px" }}
                    >
                      <i className={x.icon + " text-white"} />

                      <span className="nav-link-text">
                        {x.name} &nbsp;
                        <i className="fa fa-angle-down" />
                      </span>
                    </Link>
                  </li>

                  <Collapse isOpen={this.state.menu_id == x.id ? true : false}>
                    <Card
                      style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        marginBottom: "-5px",
                      }}
                    >
                      <CardBody>
                        <ul
                          style={{
                            marginLeft: "10px",
                            marginTop: "-30px",
                            width: "300px",
                          }}
                          class
                          Name="subo"
                        >
                          {x.subMenus &&
                            x.subMenus.map((m) => {
                              return (
                                <li
                                  className="nav-item"
                                  onClick={this.toggleSideNav}
                                  style={{ listStyleType: "none" }}
                                >
                                  <Link
                                    activeClassName="active"
                                    className="nav-link "
                                    to={{ pathname: "/" + m.route }}
                                  >
                                    {/* <i className="ni ni-check-bold" /> */}
                                    <span
                                      className="nav-link-text"
                                      style={{ fontSize: "10px" }}
                                    >
                                      {m.name}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}

                          {this.state.allStaffMgt &&
                            this.state.allStaffMgt.map((m) => {
                              return (
                                <li
                                  className="nav-item"
                                  onClick={this.toggleSideNav}
                                  style={{ listStyleType: "none" }}
                                >
                                  <Link
                                    activeClassName="active"
                                    className="nav-link "
                                    to={{ pathname: "/" + m.route }}
                                  >
                                    <i className="ni ni-check-bold" />
                                    <span
                                      className="nav-link-text"
                                      style={{ fontSize: "10px" }}
                                    >
                                      {m.name}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </CardBody>
                    </Card>
                  </Collapse>
                </> 
                    )
                  })}





                  

         
                  {/* {this.state.standAloneMenus &&
                    this.state.standAloneMenus.map((m) => {
                      return (
                        <li className="nav-item" onClick={this.toggleSideNav}>
                          <Link
                            activeClassName="active"
                            className="nav-link "
                            to={{ pathname: "/" + m.route }}
                          >
                            <i className="ni ni-check-bold" />

                            <span
                              className="nav-link-text"
                              style={{ fontSize: "12px" }}
                            >
                              {m.name}
                            </span>
                          </Link>
                        </li>
                      );
                    })} */}

                  {/* {this.state.freeMenu &&
                    this.state.freeMenu.map((m) => {
                      return (
                        <li
                          className="nav-item"
                          onClick={this.toggleSideNav}
                          style={{ listStyleType: "none" }}
                        >
                          <Link
                            activeClassName="active"
                            className="nav-link "
                            to={{ pathname: "/" + m.route }}
                          >
                            <i className="ni ni-check-bold" />
                            <span
                              className="nav-link-text"
                              style={{ fontSize: "12px" }}
                            >
                              {m.name}
                            </span>
                          </Link>
                        </li>
                      );
                    })} */}


<li className="nav-item"
                   onClick={this.logout}
                  >
                    <a
                      activeClassName="active"
                      className="nav-link"
             
                      style={{ marginBottom: "0px" }}
                    >
                      <i className="fa fa-sign-out" />

                      <span className="nav-link-text">
                        Log out &nbsp;
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              {/* <Button id="Popover1" type="button">
        Launch Popover
      </Button> */}
            </div>
            <div id="myNav" class="overlay">
              <a
                href="#"
                class="closebtn"
                onClick={this.closeNav}
                style={{ color: "grey", fontSize: "30px" }}
              >
                &times;
              </a>

              <h3
                className="text-muted"
                style={{ marginLeft: "50px", marginTop: "30px" }}
              >
                Admin Settings
              </h3>
              {/* <h2 className="sool" style={{marginLeft:"50px", marginTop:"50px"}}><i className="ni ni-settings " /> Solution Setup</h2> */}

              <div class="overlay-content justify-content">
                <div className="row card-body col-md-12">
                  <div className="col-md-4">
                    <div className="form-group">
                      <Link to={"/RoleManagement"} onClick={this.closeNav}>
                        <button className="btn btn-secondary">
                          {/* <i className="fa fa-user"></i>  */}{" "}
                          <span className="col-md-2">
                            <img src={people} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              Role Setup &<br /> Assignment{" "}
                            </span>
                          </div>
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link to={"/MenuManagement"} onClick={this.closeNav}>
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img src={menu} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              Menu <br />
                              Management{" "}
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link
                        to={{ pathname: "DocumentType" }}
                        onClick={this.closeNav}
                      >
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img src={doc} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              Document
                              <br /> Type Setup
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link
                        to={{ pathname: "Department" }}
                        onClick={this.closeNav}
                      >
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img src={dept} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              Department/
                              <br />
                              Faculty Setup
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link
                        to={{ pathname: "StaffCategory" }}
                        onClick={this.closeNav}
                      >
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img
                              src={StaffCategory}
                              style={{ width: "30px" }}
                            />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              Staff Category/
                              <br /> Type
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link to={{ pathname: "Leave" }} onClick={this.closeNav}>
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img src={leave} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              &nbsp; Leave &nbsp; <br /> Setup
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link to={{ pathname: "Asset" }} onClick={this.closeNav}>
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img src={assetIcon} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              Asset
                              <br /> Management
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link
                        to={{ pathname: "EducationalQualifications" }}
                        onClick={this.closeNav}
                      >
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img src={doc} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              Educational
                              <br /> Qualifications
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link
                        to={{ pathname: "ManageVacancies" }}
                        onClick={this.closeNav}
                      >
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img src={jobMgt} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              Job
                              <br /> Management
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link
                        to={{ pathname: "PFASetup" }}
                        onClick={this.closeNav}
                      >
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img src={jobMgt} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              PFA
                              <br /> Setup
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Link
                        to={{ pathname: "AosHolidaySetup" }}
                        onClick={this.closeNav}
                      >
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          <span className="col-md-2">
                            <img src={jobMgt} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                              Holidays/AOS
                              <br /> Setup
                            </span>
                          </div>
                        </button>
                      </Link>
                    </div>
                  </div>


                  <div className="col-md-4">
                    <div className="form-group">
                      <Link to={"/SalarySetup"} onClick={this.closeNav}>
                        <button
                          className="btn btn-secondary"
                          style={{ zIndex: "333444" }}
                        >
                          {/* <i className="ni ni-app" />{" "} */}
                          <span className="col-md-2">
                            <img src={menu} style={{ width: "30px" }} />
                          </span>
                          <div className="form-group">
                            <span style={{ fontSize: "13px" }}>
                             Salary <br />
                              Setup{" "}
                            </span>
                          </div>
                          {/* <i className="fa fa-angle-down"></i> */}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />

                {/* <hr/> */}
                <span className="font-weight-bold ml-1 mt-0" target="_blank">
                  <br />
                  <small style={{ fontSize: "10px" }}>Powered by</small>

                  <br />
                  <img src={lloydant} style={{ width: "40px" }} />
                </span>
              </div>
            </div>

            {this.state.payload?.roleId == Roles.SuperAdmin && !this.state.isMobile
            ? (
              <ul
                style={{ marginLeft: "10px", position: "fixed", top: "800px" }}
                className="navbar-nav pop-font"
              >
                <li className="nav-item">
                  <Link
                    activeClassName="active"
                    className="nav-link "
                    onClick={this.openNav}
                  >
                    <i className="ni ni-settings " />
                    <span
                      className="nav-link-text"
                      style={{ fontSize: "12px" }}
                    >
                      {" "}
                      Setup
                    </span>
                  </Link>
                </li>
                
              </ul>
            ) : null}
          </div>
        </nav>
      </>
    );
  }
}

export default Sidenav;
