import React from "react";

import hero from "../images/hero.png";
import logosm from "../images/logoFresh.png";
// import logobg from "../images/ziklogo.png"

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
import {Fade, AttentionSeeker } from "react-awesome-reveal";
import {StartAnim} from "../pages/home_page"
import { RainbowSpinner, SphereSpinner, WhisperSpinner } from "react-spinners-kit";
import $ from "jquery"
import { enquireScreen } from 'enquire-js';
import Particles from "react-particles-js";
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import {InitBubbles} from "../utils/InitBubbles"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

// import { navigate } from "@reach/router"
const Abs = {
  width: "100%",
  minHeight: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex:'99999'
};
export default class Home extends React.Component {
  state = {
    jobVacancy: [],
    navigate: false,
    payLoad: JSON.parse(localStorage.getItem("userData")),
  };

  myHooks = () => {
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
      const intervalId = setInterval(
        () => setIndex((index) => index + 1),
        3000 // every 3 seconds
      );
    });
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      logUserOut: true,
    });
  };

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
    // InitBubbles();
    this.customAnimation();
    StartAnim();

    enquireScreen((b) => {
      this.setState({
        isMobile: b,
      });
    });

    $(document).ready(function() {
      setTimeout(() => {
          $('#preloader').delay(450).fadeOut('slow');
      }, 3000);
      console.log( "ready!" );
  });
  }

  render() {
    require("antd/dist/antd.css")

    if (this.state.logUserOut) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    var dateYear = new Date();

    console.log(this.state.jobVacancy.map((id) => console.log(id.id)));
    return (
      <>
   
<section class="sticky">
  <div class="bubbles">
      <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    
  </div>
</section>
           
       <div id="preloader">
              <div id="status">
    

                <img src={logosm} className="pt-5 lloyd-logo" style={!this.state.isMobile ? {width:'50px'} : {width:'40px'}}/>
                <p className="text-white mt-4" style={this.state.isMobile ? {marginLeft:'-3px'} : {marginLeft:'-12px', fontSize:'13px'}}>Initializing...</p>

              </div>
            </div>

        <section
          className="pb-5 pr-2 pl-2 overflow-hidden shadow-sm hero new_bgg"

//           background: linear-gradient(
// 135deg,#35aef8 0%,#7681ff 76%,#7681ff 76%);
        >
         
       
           <nav
          className="navbar navbar-top navbar-expand navbar-light m-0 p-0"
          style={{ background:'transparent' }}
        >
          <div className="container">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
              style={this.state.isMobile ? {justifyContent:'space-between'} : {justifyContent:'space-between'}}
            >
              {/* Navbar links */}
              <a
                className="navbar-brand"
                href="#"
                style={{ display: "inline-block" }}
              >
                {/* <img src="assets/img/brand/blue.png" class="navbar-brand-img" alt="..."> */}
                {/* <h2 className="mb-0 text-white pop-font">HRM</h2>  */}
                <span
                  className="avatar avatar-sm"
                  style={{ backgroundColor: "transparent" }}
                >
                  <img src={logosm} className="pt-5" />
                </span>
              </a>

              <ul className="navbar-nav align-items-center ml-md-auto">
                <li className="nav-item d-xl-none">
                  {/* Sidenav toggler */}
                  <div
                    className="pr-3 sidenav-toggler sidenav-toggler-light"
                    data-action="sidenav-pin"
                    data-target="#sidenav-main"
                  >
                    <div className="sidenav-toggler-inner text-white">
                      <i className="sidenav-toggler-line text-white" style={{backgroundColor:'#f1f1f1'}}/>
                      <i className="sidenav-toggler-line text-white" style={{backgroundColor:'#f1f1f1'}}/>
                      <i className="sidenav-toggler-line text-white" style={{backgroundColor:'#f1f1f1'}}/>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  {/* <Link className="nav-link" to="/login"> */}
                  {/* <button className="btn btn-outline-primary" to="/admin/user-profile" tag={Link}>Sign In</button> */}
                

                  {/* <a href={manualGuide} download className="text-warning sofia">
                    <b>Download User Guide</b>
                  </a> */}

                  {/* </Link> */}
                </li>
              </ul>
              {!this.state.isMobile ? <div className="home-c-menu">
                {/* <ul style={{display:'inline'}}> */}
                  <a>Home</a>
                  <a>Inventory</a>
                  <Link to="/login">Login</Link>
                  <a>Contact us</a>
                  <a>Official Website</a>
                {/* </ul> */}
              </div>: null}
            </div>
          </div>
        </nav>
<div style={{position:'absolute', width:'100%'}} className="abs-lloyd">
<h1 className="back-road" style={this.state.isMobile ? {visibility:'hidden'} : null}>LloydAnt</h1>
{this.state.isMobile ? <><h1 className="back-road">LloydAnt</h1>
{/* <h1 className="back-road" style={{marginTop:'-73px'}}>Inventory</h1> */}
{/* <h1 className="back-road">Services</h1> */}
</> : null}

{/* <h1 className="back-road" style={this.state.isMobile ? {fontSize:'60px'} : null}>LloydAnt</h1> */}

</div>
{/* <Particles /> */}
          <div className="container" id="welcome">
          {/* {this.state.isMobile ? <section className="iq-features">
        <div className="container txt-anim">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-12" />
            <div className="col-lg-6 col-md-12">
              <div className="holderCircle">
                <div className="round" />
                <div className="dotCircle">
                  <span className="itemDot active itemDot1" data-tab={1}>
                    <i className="fa fa-users" />
                    <span className="forActive" />
                  </span>
                  <span className="itemDot itemDot2" data-tab={2}>
                    <i className="fa fa-flag" />
                    <span className="forActive" />
                  </span>
                  <span className="itemDot itemDot3" data-tab={3}>
                    <i className="fa fa-university" />
                    <span className="forActive" />
                  </span>
                </div>
                <div className="contentCircle">
                  <div className="CirItem title-box active CirItem1">
                    <h2 className="title"><span className="font-weight-700 prompt_t text-white" style={{fontSize:'16px'}}>Document Management</span></h2>
                    <p className="sofia text-white" style={{fontSize:'13px'}}>Organised document storage system</p>
                    <i className="fa fa-clock-o" />
                  </div>
                  <div className="CirItem title-box CirItem2">
                    <h2 className="title"><span className="prompt_t text-white">Assets</span></h2>
                    <p className="sofia text-white" style={{fontSize:'14px'}}> Modern applicant selection process to help find, evaluate, and
                  hire the right people as quickly as possible.</p>
                    <i className="fa fa-comments" />
                  </div>
                  <div className="CirItem title-box CirItem3">
                    <h2 className="title font-weight-700 prompt_t text-white"><span className="text-white">Payroll</span></h2>
                    <p className="sofia text-white" style={{fontSize:'13px'}}>Simple and effective payroll management solution to handle and
                  track all payments and benefits.</p>
                    <i className="fa fa-user" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12" />
          </div>
        </div>
     
     
      </section> : null} */}
            <div className="row" style={this.state.isMobile ? {marginTop:'40px'} : null}>
              <div className="col-12 col-md-6 align-self-center mt-3 mb-3 lft-ban">
                <h2 className="display-3 font-weight-700">
                  <h2 className="display-3 font-weight-700">
                    <TextTransition
                    className="text-white manrope__head2"
                      text={"LloydAnt Inventory Management Solution"}
                      springConfig={presets.molasses}
                      delay={200}
                      style={this.state.isMobile ? {fontSize:'24px'} : {fontSize:'26px'}}
                    />
                  </h2>
				  {/* <h2 className="display-3 font-weight-700">
                    <TextTransition
                      text={"Solution"}
                      springConfig={presets.molasses}
                      delay={200}
                    />
                  </h2> */}
				  {/* <h2 className="display-3 font-weight-700">
                    <TextTransition
                      text={"Staff Portal"}
                      springConfig={presets.molasses}
                      delay={200}
                    />
                  </h2> */}
				  
                  {/* Welcome to the <br /> */}
                  {/* Nnamdi Azikiwe University <br /> */}
                  
                </h2>
                <p className="mb-4 mt-2  manrope__text">
				<TextTransition
                      text={"This portal is a personalized application providing staff with easy access to many of the online services provided by the University such as staff recruitment, payroll, leave management, performance reviews/promotions, employee self-service."}
                      springConfig={presets.molasses}
                      delay={200}
                      className="text-white"
                      style={this.state.isMobile ? {fontSize:'14px'} : null}
                    />
                  {/* This portal is a personalized application providing staff with
                  easy access to many of the online services provided by the
                  University such as staff recruitment, payroll, leave
                  management, performance reviews/promotions, employee
                  self-service etc. <br /> */}
                  {/* with Human Resource Management System from Lloydant.{" "} */}
                </p>

                <Button
                  className="btn btn-dove mb-2 col-12 col-sm-auto"
                  to="/JobPositions"
                  color={false}
                  tag={Link}
                >
                  Quick Guide
                </Button>

                <Link
                  to={{ pathname: "Login" }}
                  className="btn btn-dove mb-2 col-12 col-sm-auto "
                >
                  Get Started
                </Link>

                
                <Button
                  className="btn btn-dove mb-2 col-12 col-sm-auto"
                  to="/JobPositions"
                  color={false}
                  tag={Link}
                >
                  Quick Guide
                </Button>

                <Link
                  to={{ pathname: "Login" }}
                  className="btn btn-dove mb-2 col-12 col-sm-auto "
                >
                  Get Started
                </Link>
              </div>
              <div class="col-12 col-md-6">
              {!this.state.isMobile ? <section className="iq-features">
        <div className="container txt-anim">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-12" />
            <div className="col-lg-6 col-md-12">
              <div className="holderCircle">
                <div className="round" />
                <div className="dotCircle">
                  <span className="itemDot active itemDot1" data-tab={1}>
                    <i className="fa fa-users" />
                    <span className="forActive" />
                  </span>
                  <span className="itemDot itemDot2" data-tab={2}>
                    <i className="fa fa-flag" />
                    <span className="forActive" />
                  </span>
                  <span className="itemDot itemDot3" data-tab={3}>
                    <i className="fa fa-university" />
                    <span className="forActive" />
                  </span>
                </div>
                <div className="contentCircle">
                  <div className="CirItem title-box active CirItem1">
                    <h2 className="title"><span className="font-weight-700 prompt_t text-white" style={{fontSize:'16px'}}>Document Management</span></h2>
                    <p className="sofia text-white" style={{fontSize:'13px'}}>Organised document storage system</p>
                    <i className="fa fa-clock-o" />
                  </div>
                  <div className="CirItem title-box CirItem2">
                    <h2 className="title"><span className="prompt_t text-white">Assets</span></h2>
                    <p className="sofia text-white" style={{fontSize:'14px'}}> Modern applicant selection process to help find, evaluate, and
                  hire the right people as quickly as possible.</p>
                    <i className="fa fa-comments" />
                  </div>
                  <div className="CirItem title-box CirItem3">
                    <h2 className="title font-weight-700 prompt_t text-white"><span className="text-white">Payroll</span></h2>
                    <p className="sofia text-white" style={{fontSize:'13px'}}>Simple and effective payroll management solution to handle and
                  track all payments and benefits.</p>
                    <i className="fa fa-user" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12" />
          </div>
        </div>
     
     
      </section> : null}
			  {/* <AttentionSeeker effect={"rubberBand"} duration={400} delay={1000} triggerOnce={false}>

                <img src={hero} className="img-fluid" alt="" />
				</AttentionSeeker> */}

              </div>
            </div>
          </div>

          
        </section>

        <section>
          <div class="container mt-5">
            {this.state.jobVacancy && this.state.jobVacancy.length > 0 ? (
              <div className="row mb-2 pr-2 pl-2">
                <div className="col-12">
                  <h2>Open Positions</h2>
                </div>
              </div>
            ) : null}

            {this.state.jobVacancy && this.state.jobVacancy.length > 0
              ? this.state.jobVacancy.map((vacancy) => {
                  return (
                    <div class="card mb-2 border">
                      <div class="card-body d-md-flex align-items-center">
                        <div class="d-flex flex-fill align-items-center">
                          <div class="d-flex flex-fill flex-column flex-md-row align-items-md-center">
                            <div>
                              <h3 class="d-inline-block align-middle font-weight-bold mb-0 mr-2">
                                <span class="companyname">{vacancy.name}</span>
                              </h3>
                              <p class="card-text text-muted small mb-0">
                                {vacancy.jobType.name}
                              </p>
                            </div>
                            <div class="ml-auto p-0 col-12 col-md-4 d-flex text-align-right justify-content-md-end align-items-center">
                              <span class="card-text text-muted small ml-auto">
                                <span class="font-weight-bold"> Open: </span>
                                {vacancy.dateCreated}
                              </span>
                              {/* <Link to={`/form`} state={vacancy}> */}
                              <span class="ml-auto btn btn-outline-primary ">
                                Apply
                              </span>
                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          <div className="container">
            <div className="row my-4">
              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 font-weight-700 sofia">
				<TextTransition
                      text={"Document Management"}
                      springConfig={presets.wobbly}
                      delay={1000}
                    />
					
					</h2>
                <p className="font-weight-700 sofia">
                  With the Staff portal, heads of units or department and can
                  communicate with other staff members within the unit. For
                  example, department heads can notify the staff of training
                  plans.
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>

              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 font-weight-700 sofia">
				<TextTransition
                      text={"Asset Management"}
                      springConfig={presets.wobbly}
                      delay={1500}
                    />
					
					</h2>
                <p className="font-weight-700 sofia">
                  The portal simplifies management of store, procurement and
                  staff inventory thereby providing a direct link between the
                  property and the staff at work.
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>

              <div className="col-lg-6 mb-4 text-center">
                <img src={about1} alt="" height="300px" />
              </div>

              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 font-weight-700 sofia">
				<TextTransition
                      text={"Staff Directory"}
                      springConfig={presets.wobbly}
                      delay={1700}
                    />
					
					</h2>
                <p className="font-weight-700 sofia">
                  Nnamdi Azikiwe University Staff portal provides staff who are
                  or authorized or head of Units, Departments, Directorates can
                  get contact information of staff, get in touch with them
                  through instant chats, and search staff through designation
                  and view staff requests.
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>

              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 font-weight-700 sofia">Document Management</h2>
                <p className="font-weight-700 sofia">
                  Effective management of document both private and shared
                  documents. Staff document are effectively managed and
                  minimizes duplicate efforts by individual units.
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>

              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 font-weight-700 sofia">Staff Management</h2>
                <p className="font-weight-700 sofia">
                  The portal provides staff the responsibility of planning,
                  directing, and coordinating the administrative functions of
                  the University. It is designed also to help deploy and track
                  employees in the University effectively
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>
            </div>
          </div>

          <div className="bg-lighter">
            <div className="container ">
              <div className="row my-4">
                <div className="col-lg-6 mb-4 mt-lg-5 text-center">
                  <img src={about2} alt="" height="300px" />
                </div>

                <div className="col-lg-6 mb-4 mt-lg-6">
                  <h2 className="display-4 font-weight-700 sofia">News and Announcement</h2>
                  <p className="font-weight-700 sofia">
                    The portal provides a concise platform for institution-wide
                    announcements, external news and feed import through RSS
                    Institutions news
                  </p>
                  {/* <Link to={{pathname:"Login"}} className="btn btn-outline-primary">Sign In</Link> */}
                </div>

                <div className="col-lg-6 mb-4 mt-lg-6">
                  <h2 className="display-4 font-weight-700 sofia">Time Management</h2>
                  <p className="font-weight-700 sofia">
                    Features Staff time and Attendance management e.g. Clock
                    in/clock out, breaks, and attendance reports.
                  </p>
                  {/* <Link to={{pathname:"Login"}} className="btn btn-outline-primary">Sign In</Link> */}
                </div>

                <div className="col-lg-6 mb-4 mt-lg-6">
                  <h2 className="display-4">Employee Self Service</h2>
                  <p>
                    Staff members are able to update their personal information
                    employee/staff such as an address, contact information, and
                    banking information, & also to view scheduling and payroll
                    information.
                  </p>
                  {/* <Link to={{pathname:"Login"}} className="btn btn-outline-primary">Sign In</Link> */}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row my-7">
              <div className="col-lg-3">
                <img src={hiring} alt="" height="50px" />
                <h2 className="mt-3 font-weight-700 sofia">Hiring</h2>
                <p className="font-weight-700 sofia">
                  Modern applicant selection process to help find, evaluate, and
                  hire the right people as quickly as possible.
                </p>
                <a href="#" className="font-weight-600">
                  Learn More <i className="fa fa-chevron-right"></i>
                </a>
              </div>

              <div className="col-lg-3">
                <img src={interview} alt="" height="50px" />
                <h2 className="mt-3 font-weight-700 sofia">Interview</h2>
                <p className="font-weight-700 sofia">
                  Platform streamlines interview process by pre-ordering
                  selected applicants according to preset criteria.
                </p>
                <a href="#" className="font-weight-600">
                  Learn More <i className="fa fa-chevron-right"></i>
                </a>
              </div>

              <div className="col-lg-3">
                <img src={onboarding} alt="" height="50px" />
                <h2 className="mt-3 font-weight-700 sofia">Onboarding</h2>
                <p className="font-weight-700 sofia">
                  Complete suite of onboarding resources to take away all
                  redundancy from the orientation process.
                </p>
                <a href="#" className="font-weight-600">
                  Learn More <i className="fa fa-chevron-right"></i>
                </a>
              </div>

              <div className="col-lg-3">
                <img src={compensation} alt="" height="50px" />
                <h2 className="mt-3 font-weight-700 sofia">Compensation</h2>
                <p className="font-weight-700 sofia">
                  Simple and effective payroll management solution to handle and
                  track all payments and benefits.
                </p>
                <a href="#" className="font-weight-600">
                  Learn More <i className="fa fa-chevron-right"></i>
                </a>
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
                  <a
                    href="https://www.lloydant.com/"
                    className="font-weight-bold ml-1"
                    target="_blank"
                  >
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
