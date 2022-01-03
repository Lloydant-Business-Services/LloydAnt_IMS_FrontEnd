import React from "react"
import {Redirect, Link} from "react-router-dom"
import { fetchData} from "../../../utils/crud"
import Layout from "../../layout"
import SideBar from "../../NewSideBar"
import AdminFooter from "../admin/AdminFooter"
// import { Link } from "gatsby"
// import image from "../../../images/docs/VALIMAGE.jpeg"

export default class StaffProfile extends React.Component {
  state = {
    importedStaffId: this.props.location.state.data,
    mappedStaff: "",
    passport:"",
    biodataTab:true
     
  }
  _calculateAge = birthday => {
    var ageDifMs = Date.now() - birthday.getTime()
    var ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  showBiodataTab = () => {
    this.setState({
      biodataTab:true,
      employmentTab:false,
      assetTab:false
    })
  }

  showEmploymentTab = () => {
    this.setState({
      biodataTab:false,
      employmentTab:true,
      assetTab:false
    })
  }

  showAssetTab = () => {
    this.setState({
      biodataTab:false,
      employmentTab:false,
      assetTab:true
    })
  }

  componentDidMount() {
fetchData(`/Staff/${this.state.importedStaffId}`, data => {
    console.log(data, "newData")
    this.setState({
        staff: data
    })
})
      
    fetchData(`/StaffAssets/${this.state.importedStaffId}`, data => {
      console.log(data, "Dataaa")

      this.setState({
        staffTiedAssets: data
      })


      setTimeout(() => {
        console.log(this.state.staffTiedAssets, "AssetsLoad")
      }, 4000)
    })
  }

  render() {
    if(this.state.userRedirect){
      return(
          <Redirect
          to={{pathname:"/Login"}}
          />
      )
  }
    const staffData = this.state.staff
    console.log(staffData)
    return (
      <>
      {/* <SideBar/> */}
      
   
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Dashboard <span className="h3 text-muted">Staff Profile</span>
              </h6>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>
          {/* Card stats */}
          <div className="row">
            <hr className="mx-0" />
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2" id="prof-card">
                      {/* <img
                        src={
                          staffData.person.imageUrl !== null
                            ? staffData.person.imageUrl
                            : this.state.passport
                        }
                        src={image}
                        alt="Profile Image"
                        className="img-fluid rounded shadow"
                        style={{ width: "200px" }}
                      /> */}
                      <hr className="my-2" />
                      <p className="text-muted font-weight-500">
                        <span className="h3 text-primary pop-font">
                          Contact Information
                        </span>
                        <br />
                      </p>
                      <p className="text-muted font-weight-500 mb-2">
                        <i className="fa fa-phone mr-2" />
                        {staffData?.person?.phoneNumber}
                      </p>
                      <p className="text-muted font-weight-500">
                        <i className="fa fa-envelope mr-2" />
                        {staffData?.person?.email}
                      </p>
                      <hr className="my-2" />
                      <p className="text-muted font-weight-500">
                        <span className="h3 text-primary pop-font">
                          Hired On
                        </span>
                        <br />
                      </p>
                      <p className="text-muted font-weight-500">
                        <i className="fa fa-calendar-alt mr-2" />
                        24th March, 2018 <br />
                        <span className="text-sm">1 yr - 10 mo</span>
                      </p>
                      <hr className="my-2" />
                      <p className="text-muted font-weight-500">
                        <span className="h3 text-primary pop-font">
                          Work Information
                        </span>
                        <br />
                      </p>
                      <p className="text-muted font-weight-500 font-weight-bold">
                        <i className="fa fa-briefcase mr-2" />
                        {staffData?.staffType? staffData?.staffType?.name : ""}
                      </p>
                      <p className="text-muted font-weight-500 font-weight-bold">
                        <i className="fa fa-users mr-2" />
                        {staffData?.department ? staffData?.department?.name : ""}
                      </p>
                      <p className="text-muted font-weight-500 font-weight-bold">
                        <i className="fa fa-map-marker-alt mr-2" />
                        {staffData?.category ? staffData?.category?.name : ""}
                      </p>
                      <hr className="my-2" />
                    </div>
                    <div className="col-md-8 ml-5">
                      <div className="pop-font">
                        <h1 className="mb-0">
                          {staffData?.person?.surname}{" "}
                          {staffData?.person?.firstname}{" "}
                          {staffData?.person?.othername}
                        </h1>
                        <p className="text-primary font-weight-500">
                          {staffData?.rank ? staffData?.rank?.name : ""}
                        </p>
                        {/* <h2 class="text-muted">Employee BioData</h2> */}
                        <div className="nav-wrapper">
                          <ul
                            className="nav nav-pills nav-fill flex-column flex-md-row"
                            id="tabs-icons-text"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <a
                                className={this.state.biodataTab ? "nav-link mb-sm-3 mb-md-0 active" : "nav-link mb-sm-3 mb-md-0"}
                                onClick={this.showBiodataTab}
                                id="tabs-icons-text-1-tab"
                                data-toggle="tab"
                                style={{cursor:"pointer"}}
                                role="tab"
                                aria-controls="tabs-icons-text-1"
                                aria-selected="true"
                              >
                                Employee BioData
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                style={{cursor:"pointer"}}

                          
                                className={this.state.employmentTab ? "nav-link mb-sm-3 mb-md-0 active" : "nav-link mb-sm-3 mb-md-0"}
                                onClick={this.showEmploymentTab}
                                id="tabs-icons-text-2-tab"
                                data-toggle="tab"
                           
                                role="tab"
                                aria-controls="tabs-icons-text-2"
                                aria-selected="false"
                              >
                                Job Information
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                style={{cursor:"pointer"}}

                             
                                className={this.state.assetTab ? "nav-link mb-sm-3 mb-md-0 active" : "nav-link mb-sm-3 mb-md-0"}
                                onClick={this.showAssetTab}
                                id="tabs-icons-text-3-tab"
                                data-toggle="tab"
                                
                                role="tab"
                                aria-controls="tabs-icons-text-3"
                                aria-selected="false"
                              >
                                Assets
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <hr className="my-2" />
                      <div className="tab-content" id="myTabContent">


                    {/* Employee Bio     */}


                        {this.state.biodataTab ? <div
                         
                          style={{backgroundColor:"white", color:"#3e3939"}}


                         
                      
                        >
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Staff ID: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.staffNumber}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Full Name: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.surname},{" "}
                                {staffData?.person?.firstname}{" "}
                                {staffData?.person?.othername}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">
                                State of Origin:{" "}
                              </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.state
                                  ? staffData?.person?.state?.name
                                  : ""}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">L.G.A: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.lga
                                  ? staffData?.person?.lga?.name
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">
                                Permanent Address:{" "}
                              </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.address}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Date of Birth: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.birthDay
                                  ? staffData?.person?.birthDay.substring(0, 10)
                                  : ""}{" "}
                                {/* <span className="text-sm text-muted">
                                  {this._calculateAge(
                                    new Date(staffData.person.birthDay)
                                  )}{" "}
                                  yrs
                                </span> */}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Gender: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.gender
                                  ? staffData?.person?.gender.name
                                  : ""}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">
                                Marital Status:{" "}
                              </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.maritalStatus
                                  ? staffData?.person?.maritalStatus.name
                                  : ""}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Religion: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.religion
                                  ? staffData?.person?.religion.name
                                  : ""}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Mobile No.: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.phoneNumber}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Email Address: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData?.person?.email}
                              </p>
                            </div>
                          </div>
                        </div>: null}
                        
                        
                    {/* Employment Details     */}
                        
                        {this.state.employmentTab ? <div
                         
                        >
                          <div className="row">
                            <div className="col-md-12">
                              <p className="font-weight-700">
                                Employment Details:{" "}
                              </p>
                              <div className="table-responsive mb-5">
                                <table className="table table-striped table-hover">
                                  <tbody>
                                    <tr>
                                      <th>Effective Date</th>
                                      <th>Employment Schedule</th>
                                      <th>Staff Type</th>
                                    </tr>
                                    <tr>
                                      <td>09/02/2019</td>
                                      <td>On-Site</td>
                                      <td>Full-Time</td>
                                    </tr>
                                    <tr>
                                      <td>08/08/2018</td>
                                      <td>Remote</td>
                                      <td>Contract Staff</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <p className="font-weight-700">
                                Promotion History:{" "}
                              </p>
                              <div className="table-responsive mb-5">
                                <table className="table table-striped table-hover">
                                  <tbody>
                                    <tr>
                                      <th>Effective Date</th>
                                      <th>Branch</th>
                                      <th>Department</th>
                                      <th>Job Title</th>
                                      <th>Manager</th>
                                    </tr>
                                    <tr>
                                      <td>09/02/2019</td>
                                      <td>Enugu Branch</td>
                                      <td>Mathematics</td>
                                      <td>Senior Lecturer</td>
                                      <td>
                                        <a href="#">Gerald Rohr</a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <p className="font-weight-700">Compensation: </p>
                              <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                  <tbody>
                                    <tr>
                                      <th>Effective Date</th>
                                      <th>Pay Rate</th>
                                      <th>Pay Type</th>
                                      <th>Schedule</th>
                                      <th>Reason</th>
                                    </tr>
                                    <tr>
                                      <td>08/02/2019</td>
                                      <td>1,800,000/yr</td>
                                      <td>Salary</td>
                                      <td>Monthly</td>
                                      <td>Performance</td>
                                    </tr>
                                    <tr>
                                      <td>08/08/2018</td>
                                      <td>1,200,000/yr</td>
                                      <td>Salary</td>
                                      <td>Monthly</td>
                                      <td>Starting Salary</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>: null}
                       
                       
                    {/* AssetsDetails     */}
                       
                       
                        {this.state.assetTab ? <div
                          
                         
                         
                        >
                          <div className="row">
                            <div className="col-md-12">
                              <p className="font-weight-700">
                                Assets History:{" "}
                              </p>
                              <div className="table-responsive mb-5">
                                <table className="table table-striped table-hover">
                                    <thead>
                                      <th>
                                        S/N
                                      </th>
                                      <th>
                                        Asset Name
                                      </th>
                                      <th>
                                        Asset Type
                                      </th>
                                      <th>
                                       Asset Model Number
                                      </th>
                                     
                                    </thead>
                                  <tbody>
                                    {this.state.staffTiedAssets && this.state.staffTiedAssets.map((i, a) => {
                                      return(
                                        <tr>
                                        <td>{a + 1}</td>

                                        <td>{i.assetName}</td>
                                        <td>{i.assetTypeName}</td>
                                        <td>{i.serialNumber}</td>
                                        
                                      </tr>
                                      )
                                    })}
                                   

                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>: null}
                      
                      
                      
                      
                      </div>
                    </div>
                  </div>





                  <div className="card-body"></div>
                  <Link
                    state={{ id: this.state.staff?.id }}
                    to="/app/admin/promotion"
                    activeClassName="active"
                    className="nav-link"
                  >
                    <button type="button" className="btn btn-primary">
                      Promote Staff
                    </button>
                  </Link>
                  <Link
                    state={{ id: this.state.staff?.id }}
                    to="/app/admin/extraEarnings"
                    activeClassName="active"
                    className="nav-link"
                  >
                    <button type="button" className="btn btn-primary">
                      Process Extra Earnings
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
       
        </div>
        {/* <AdminFooter/> */}
    
       
      </>
    )
  }
}
