import React from "react";
import favicon from "../images/brand/favicon.png";
import team1 from "../images/theme/team-1.jpg"
import team2 from "../images/theme/team-2.jpg"
import team3 from "../images/theme/team-3.jpg"
import team4 from "../images/theme/team-4.jpg"
import team5 from "../images/theme/team-5.jpg"
import { graphql, Link,withPrefix  } from "gatsby"



const SamplePage = ({ data }) => (
    <div>
        <header>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content={data.site.siteMetadata.description} />
            <title>{data.site.siteMetadata.title}</title>
            {/* Favicon */}
            <link rel="icon" href={favicon} type="image/png" />
            {/* Fonts */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" />
            <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap" rel="stylesheet" />
            {/* Icons */}
            <link rel="stylesheet" href={nucleo} type="text/css" />
            <link rel="stylesheet" href={fontawesome} type="text/css" />
        </header>
        {/* Sidenav */}
        <nav className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-dark bg-primary" id="sidenav-main">
            <div className="scrollbar-inner">
                {/* Brand */}
                <div className="sidenav-header d-flex align-items-center">
                    <a className="navbar-brand" href="dashboard.html">
                        {/* <img src="assets/img/brand/blue.png" class="navbar-brand-img" alt="..."> */}
                        <h2 className="mb-0 text-white pop-font">HRM</h2>
                    </a>
                    <div className="ml-auto">
                        {/* Sidenav toggler */}
                        <div className="sidenav-toggler sidenav-toggler-dark d-none d-xl-block" data-action="sidenav-unpin" data-target="#sidenav-main">
                            <div className="sidenav-toggler-inner">
                                <i className="sidenav-toggler-line" />
                                <i className="sidenav-toggler-line" />
                                <i className="sidenav-toggler-line" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-inner">
                    {/* Collapse */}
                    <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                        {/* Nav items */}
                        <ul className="navbar-nav pop-font">
                            <li className="nav-item">
                                <a className="nav-link active" href="index.html">
                                    <i className="ni ni-app" />
                                    <span className="nav-link-text">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#navbar-dashboards" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="navbar-dashboards">
                                    <i className="ni ni-building text-white" />
                                    <span className="nav-link-text">Organization Setup</span>
                                </a>
                                <div className="collapse" id="navbar-dashboards">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Organization Details</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Branches &amp; Departments</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Education Levels</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Promotion</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Leave</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Attendance</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="ni ni-notification-70" />
                                    <span className="nav-link-text">News</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="ni ni-calendar-grid-58" />
                                    <span className="nav-link-text">Calendar</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="ni ni-briefcase-24" />
                                    <span className="nav-link-text">Leave</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="ni ni-paper-diploma" />
                                    <span className="nav-link-text">Training</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="ni ni-time-alarm" />
                                    <span className="nav-link-text">Attendance</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="ni ni-chart-pie-35" />
                                    <span className="nav-link-text">Asset Management</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        {/* Main content */}
        <div className="main-content" id="panel">
            {/* Topnav */}
            <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary-dark border-bottom">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Navbar links */}
                        <ul className="navbar-nav align-items-center ml-md-auto">
                            <li className="nav-item d-xl-none">
                                {/* Sidenav toggler */}
                                <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin" data-target="#sidenav-main">
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line" />
                                        <i className="sidenav-toggler-line" />
                                        <i className="sidenav-toggler-line" />
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item d-sm-none">
                                <a className="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
                                    <i className="ni ni-zoom-split-in" />
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ni ni-bell-55" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden">
                                    {/* Dropdown header */}
                                    <div className="px-3 py-3">
                                        <h6 className="text-sm text-muted m-0">You have <strong className="text-primary">13</strong> notifications.</h6>
                                    </div>
                                    {/* List group */}
                                    <div className="list-group list-group-flush">
                                        <a href="#!" className="list-group-item list-group-item-action">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    {/* Avatar */}
                                                    <img alt="Image placeholder" src={team2} className="avatar rounded-circle" />

                                                </div>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>2 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#!" className="list-group-item list-group-item-action">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    {/* Avatar */}
                                                    <img alt="Image placeholder" src={team1} className="avatar rounded-circle" />
                                                </div>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>3 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">A new issue has been reported for Argon.</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#!" className="list-group-item list-group-item-action">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    {/* Avatar */}
                                                    <img alt="Image placeholder" src={team3} className="avatar rounded-circle" />
                                                </div>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>5 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">Your posts have been liked a lot.</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#!" className="list-group-item list-group-item-action">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    {/* Avatar */}
                                                    <img alt="Image placeholder" src={team4} className="avatar rounded-circle" />
                                                </div>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>2 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#!" className="list-group-item list-group-item-action">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    {/* Avatar */}
                                                    <img alt="Image placeholder" src={team5} className="avatar rounded-circle" />
                                                </div>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>3 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">A new issue has been reported for Argon.</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* View all */}
                                    <a href="#!" className="dropdown-item text-center text-primary font-weight-bold py-3">View all</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ni ni-ungroup" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default dropdown-menu-right">
                                    <div className="row shortcuts px-4">
                                        <a href="#!" className="col-4 shortcut-item">
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                                                <i className="ni ni-calendar-grid-58" />
                                            </span>
                                            <small>Calendar</small>
                                        </a>
                                        <a href="#!" className="col-4 shortcut-item">
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                                                <i className="ni ni-email-83" />
                                            </span>
                                            <small>Email</small>
                                        </a>
                                        <a href="#!" className="col-4 shortcut-item">
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                                                <i className="ni ni-credit-card" />
                                            </span>
                                            <small>Payments</small>
                                        </a>
                                        <a href="#!" className="col-4 shortcut-item">
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                                                <i className="ni ni-books" />
                                            </span>
                                            <small>Reports</small>
                                        </a>
                                        <a href="#!" className="col-4 shortcut-item">
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                                                <i className="ni ni-pin-3" />
                                            </span>
                                            <small>Maps</small>
                                        </a>
                                        <a href="#!" className="col-4 shortcut-item">
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                                                <i className="ni ni-basket" />
                                            </span>
                                            <small>Shop</small>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav align-items-center ml-auto ml-md-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="media align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img alt="Image placeholder" src={team4} />
                                        </span>
                                        <div className="media-body ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm  font-weight-bold">John Snow</span>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-header noti-title">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </div>
                                    <a href="#!" className="dropdown-item">
                                        <i className="ni ni-single-02" />
                                        <span>My profile</span>
                                    </a>
                                    <a href="#!" className="dropdown-item">
                                        <i className="ni ni-settings-gear-65" />
                                        <span>Settings</span>
                                    </a>
                                    <a href="#!" className="dropdown-item">
                                        <i className="ni ni-calendar-grid-58" />
                                        <span>Activity</span>
                                    </a>
                                    <a href="#!" className="dropdown-item">
                                        <i className="ni ni-support-16" />
                                        <span>Support</span>
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a href="#!" className="dropdown-item">
                                        <i className="ni ni-user-run" />
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Header */}
            {/* Header */}
            <div className="header pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard</h6>
                            </div>
                            <div className="col-lg-6 col-5 text-right">
                            </div>
                        </div>
                        {/* Card stats */}
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    {/* Card body */}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col pop-font">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Total Staff</h5>
                                                <span className="h1 font-weight-bold mb-0">1,897</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                                    <i className="ni ni-single-02" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    {/* Card body */}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col pop-font">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Branches</h5>
                                                <span className="h1 font-weight-bold mb-0">4</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                    <i className="ni ni-chart-pie-35" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    {/* Card body */}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col pop-font">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Open Positions</h5>
                                                <span className="h1 font-weight-bold mb-0">24</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                                    <i className="ni ni-badge" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    {/* Card body */}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col pop-font">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Active Interviews</h5>
                                                <span className="h1 font-weight-bold mb-0">6</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                                    <i className="ni ni-briefcase-24" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page content */}
            <div className="container-fluid mt--6">
                <div className="min-vh-60">
                </div>
                {/* Footer */}
                <footer className="footer pt-0">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6">
                            <div className="copyright text-center text-lg-left text-muted">
                                © 2019 <a href="https://www.lloydant.com/" className="font-weight-bold ml-1" target="_blank">Lloydant</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>

)

export default SamplePage
export const query = graphql`
  query {
    site {
      siteMetadata {
        title,
        description
      }
    }
  }
`