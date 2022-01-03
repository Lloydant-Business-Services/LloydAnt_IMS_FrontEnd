import React, { Component } from "react"
import cStyle from "../../../style.css"
import dash from "../../../dashboard.css"
import ico from "../../../icons.css"
// import "../../../components/jpanelmenu.min.js"
import SideBar from "../../NewSideBar"
import AdminFooter from "../admin/AdminFooter"
import _ from "lodash"
import {fetchData} from "../../../utils/crud"
import {Redirect,Link} from "react-router-dom"


class NewDashoard extends Component {
    state = {
        allStaff: [],
        attendance: [],
        broadcasts: [],
        leaveRequests: [],
        trainingRequest: [],
        events: [],
        allVacancy: [],
        userRedirect:false,
        payLoad:JSON.parse(localStorage.getItem("userData")) 
    
    
      }
    
      loadStats = () => {
        //fetch staff
        this.loadStaff()
        //get attendance by Month
        // this.loadAttendance();
        //get birthdays
    
        //get News & Events
        this.loadNews()
        this.loadLeaveRequest()
        this.loadTrainingRequests()
        this.loadEvents()
        this.loadJobOpening()
      }
    
      loadEvents = () => {
        fetchData("/Events", data => {
          this.setState({ events: data })
        })
      }
    
      loadTrainingRequests = () => {
        fetchData(`/TrainingRequest`, data => {
          this.setState({ trainingRequest: data })
        })
      }
    
      loadLeaveRequest = () => {
        fetchData("/LeaveRequest", data => {
          this.setState({ leaveRequests: _.reverse(data) })
        })
      }
    
      loadStaff = () => {
        fetchData("/Staff", data => {
          this.setState({ allStaff: data })
        })
      }
      loadJobOpening = () => {
        fetchData("/JobVacancy", data => {
          this.setState({ allVacancy: data })
        })
      }
    
      loadAttendance = () => {
        fetchData("/Attendance/AttendanceByMonth", data => {
          this.setState({ attendance: data })
        })
      }
      loadNews = () => {
        fetchData("/Broadcasts", data => {
          this.setState({ broadcasts: _.reverse(data) })
        })
      }
    deleteo = () => {
      delete this.state.Test.key2
      this.componentDidMount()
      setTimeout(()=>{
        console.log(this.state.Test, "After!!")
      },3000)
    }
      componentDidMount() {
        console.log(this.state.payLoad, "Payload")
    
        if(!localStorage.getItem("userData")){
          this.setState({
              userRedirect:true
          })
    
         
       
      }
    
      var sampleObject = 
         {
           key1: "value1",
           "key2": "value2",
           "key3": "value3",
           "key4": "value4",
       };
       this.setState({
         Test : sampleObject
       })
       setTimeout(()=>{
         console.log(this.state.Test, "Sample State")
    
       },2000)
       console.log(sampleObject, "Sample")
         this.loadStats()
      }
    render(){
        if(this.state.userRedirect){
            return(
                <Redirect
                to={{pathname:"/Login"}}
                />
            )}
        return(
            <>

<meta name="viewport" content="width=device-width, initial-scale=1"/>

<title> Yatra - Travel Agency HTML Template</title>

<link rel="shortcut icon" type="image/x-icon" href="images/logo1.png"/>

<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>

<link href={cStyle} rel="stylesheet" type="text/css"/>

<link href="" rel="stylesheet" type="text/css"/> 

<link href={dash} rel="stylesheet" type="text/css"/>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

<div id="container-wrapper">
    <SideBar/>
        
        <div id="dashboard">
        



        <div class="dashboard-content">
                <div class="row">

                 {this.state.payLoad.roleId == 1 ? 
                 <>
                 <div class="col-lg-3 col-md-6 col-xs-6">
                        <div class="dashboard-stat color-1">
                            <div class="dashboard-stat-content"><h4> {this.state.allStaff.length > 0
                          ? this.state.allStaff.length
                          : "0"}</h4> <span>Total Staff</span></div>
                            <div class="dashboard-stat-icon"><i class="fa fa-map"></i></div>
                            <div class="dashboard-stat-item"><p>Someone bookmarked your listing!</p></div>
                            
                        </div>
                    </div>

         
                    <div class="col-lg-3 col-md-6 col-xs-6">
                        <div class="dashboard-stat color-2">
                            <div class="dashboard-stat-content"><h4>{this.state.leaveRequests.length > 0
                          ? this.state.leaveRequests.length
                          : "0"}</h4> <span>Leave Request(s)</span></div>
                            <div class="dashboard-stat-icon"><i class="fa fa-line-chart"></i></div>
                            <div class="dashboard-stat-item"><p>Someone bookmarked your listing!</p></div>
                        </div>
                    </div>


                  
                    <div class="col-lg-3 col-md-6 col-xs-6">
                        <div class="dashboard-stat color-3">
                            <div class="dashboard-stat-content"><h4> {this.state.trainingRequest.length > 0
                          ? this.state.trainingRequest.length
                          : "0"}
                      </h4> <span>Training Request(s)</span></div>
                            <div class="dashboard-stat-icon"><i class="fa fa-star"></i></div>
                            <div class="dashboard-stat-item"><p>Training Request(s)</p></div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-xs-6">
                        <div class="dashboard-stat color-4">
                            <div class="dashboard-stat-content"><h4> {this.state.allVacancy.length > 0
                          ? this.state.allVacancy.length
                          : "0"}</h4> <span>Open Position(s)</span></div>
                            <div class="dashboard-stat-icon"><i class="fas fa-user-tie"></i></div>
                            <div class="dashboard-stat-item"><p>Open Position(s)</p></div>
                        </div>
                    </div> 
                    </> 
                    
                : null}
                   
                </div>
               
                <div class="row">      
              
                    <div class="col-lg-7 col-md-12 col-xs-12 traffic">
                        <div class="dashboard-list-box with-icons margin-top-20">
                            <h4 class="gray">Upcoming Events</h4>
                            <div
                    className="timeline timeline-one-side"
                    data-timeline-content="axis"
                    data-timeline-axis-style="dashed"
                  >
                    {this.state.events != null && this.state.events.length > 0
                      ? this.state.events.map((event, key) => {
                          return (
                            <div key={key} className="timeline-block">
                              <span className="timeline-step badge-success">
                                <i className="ni ni-briefcase-24" />
                              </span>
                              <div className="timeline-content">
                                <div className="d-flex justify-content-between pt-1">
                                  <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                      {event.name}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <small className="text-muted">
                                      <i className="fas fa-clock mr-1" />
                                      {event.date.substring(0, 10)}
                                    </small>
                                    <button
                                      onClick={() =>
                                        this.setSelectedData(event)
                                      }
                                      type="button"
                                      rel="tooltip"
                                      className="ml-5 btn btn-primary btn-icon btn-sm "
                                      data-toggle="modal"
                                      data-target=".edit-level-modal"
                                    >
                                      <i className="fa fa-edit pt-1" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        this.setSelectedData(event)
                                      }
                                      type="button"
                                      rel="tooltip"
                                      className="ml-1 btn btn-danger btn-icon btn-sm "
                                      data-toggle="modal"
                                      data-target=".delete-level-modal"
                                    >
                                      <i className="fa fa-trash pt-1" />
                                    </button>
                                  </div>
                                </div>
                                <h6 className="text-sm mt-1 mb-0">
                                  {event.venue}
                                </h6>
                              </div>
                            </div>
                          )
                        })
                      : "There are no upcoming events to display at the moment"}
                  </div>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-12 col-xs-12 traffic">
                        <div class="dashboard-list-box margin-top-20 user-list">
                            <h4 class="gray">Latest News</h4>
                            
                            <div
                    className="timeline timeline-one-side"
                    data-timeline-content="axis"
                    data-timeline-axis-style="dashed"
                  >
                    {this.state.broadcasts != null &&
                    this.state.broadcasts.length > 0
                      ? this.state.broadcasts.map((news, key) => {
                          return (
                            <div key={key} className="timeline-block">
                              <span className="timeline-step badge-success">
                                <i className="ni ni-bell-55" />
                              </span>
                              <div className="timeline-content">
                                <div className="d-flex justify-content-between pt-1">
                                  <div>
                                    <span className="h5 text-muted text-sm font-weight-bold">
                                      {news.subject}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <small className="text-muted">
                                      <i className="fas fa-clock mr-1" />
                                      {news.date.substring(0, 10)}
                                    </small>
                                  </div>
                                </div>
                                <h6 className="text-sm mt-1 mb-0">
                                  {news.details}
                                </h6>
                              </div>
                            </div>
                          )
                        })
                      : "No broadcast to display at the moment"}
                  </div>


                        </div>
                    </div>
                </div>
                {/* <div class="row">
               
                    <div class="col-lg-4 col-md-4 mar-b-30">
                        <div class="dashboard-list-box">
                            <h4 class="gray">Site Traffic</h4>
                            <div id="chartContainer" style={{height: "250px; width: 100%;"}}></div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 mar-b-30">
                        <div class="dashboard-list-box">
                            <h4 class="gray">Bar Chart</h4>
                            <div id="barchart" style={{height: "250px; width: 100%;"}}></div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4">
                        <div class="dashboard-list-box">
                            <h4 class="gray">Search Engine</h4>
                            <div id="piechart" style={{height: "250px; width: 100%;"}}></div>
                        </div>
                    </div>
                </div> */}
            </div>
       
            
         
            
       
        
        </div>
        {/* <AdminFooter/> */}

    </div>


            </>

        )
    }
}



export default NewDashoard;