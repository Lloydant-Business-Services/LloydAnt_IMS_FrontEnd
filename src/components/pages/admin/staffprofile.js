import React from "react"
import {Redirect, Link} from "react-router-dom"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import Layout from "../../layout"
import SideBar from "../../NewSideBar"
import AdminFooter from "../admin/AdminFooter"
// import { Link } from "gatsby"
// import image from "../../../images/docs/VALIMAGE.jpeg"

export default class StaffProfile extends React.Component {
  state = {
    staff: this.props.location.state.data,
    mappedStaff: "",
    passport:
      //"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",
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDYgMjgiIGZvY3VzYWJsZT0iZmFsc2UiPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik02Mi45IDEyaDIuOHYxMGgtMi44di0xLjNjLTEgMS41LTIuMyAxLjYtMy4xIDEuNi0zLjEgMC01LjEtMi40LTUuMS01LjMgMC0zIDItNS4zIDQuOS01LjMuOCAwIDIuMy4xIDMuMiAxLjZWMTJ6bS01LjIgNWMwIDEuNiAxLjEgMi44IDIuOCAyLjggMS42IDAgMi44LTEuMiAyLjgtMi44IDAtMS42LTEuMS0yLjgtMi44LTIuOC0xLjYgMC0yLjggMS4yLTIuOCAyLjh6bTEzLjUtMi42VjIyaC0yLjh2LTcuNmgtMS4xVjEyaDEuMVY4LjZoMi44VjEyaDEuOXYyLjRoLTEuOXptOC41IDBjLS43LS42LTEuMy0uNy0xLjYtLjctLjcgMC0xLjEuMy0xLjEuOCAwIC4zLjEuNi45LjlsLjcuMmMuOC4zIDIgLjYgMi41IDEuNC4zLjQuNSAxIC41IDEuNyAwIC45LS4zIDEuOC0xLjEgMi41cy0xLjggMS4xLTMgMS4xYy0yLjEgMC0zLjItMS0zLjktMS43bDEuNS0xLjdjLjYuNiAxLjQgMS4yIDIuMiAxLjIuOCAwIDEuNC0uNCAxLjQtMS4xIDAtLjYtLjUtLjktLjktMWwtLjYtLjJjLS43LS4zLTEuNS0uNi0yLjEtMS4yLS41LS41LS44LTEuMS0uOC0xLjkgMC0xIC41LTEuOCAxLTIuMy44LS42IDEuOC0uNyAyLjYtLjcuNyAwIDEuOS4xIDMuMiAxLjFsLTEuNCAxLjZ6bTYuMS0xLjFjMS0xLjQgMi40LTEuNiAzLjItMS42IDIuOSAwIDQuOSAyLjMgNC45IDUuM3MtMiA1LjMtNSA1LjNjLS42IDAtMi4xLS4xLTMuMi0xLjZWMjJIODNWNS4yaDIuOHY4LjF6bS0uMyAzLjdjMCAxLjYgMS4xIDIuOCAyLjggMi44IDEuNiAwIDIuOC0xLjIgMi44LTIuOCAwLTEuNi0xLjEtMi44LTIuOC0yLjgtMS43IDAtMi44IDEuMi0yLjggMi44em0xMyAzLjVMOTMuNyAxMkg5N2wzLjEgNS43IDIuOC01LjdoMy4ybC04IDE1LjNoLTMuMmwzLjYtNi44ek01NCAxMy43aC03djIuOGgzLjdjLS42IDEuOS0yIDMuMi00LjYgMy4yLTIuOSAwLTUtMi40LTUtNS4zUzQzLjEgOSA0NiA5YzEuNiAwIDMuMi44IDQuMiAyLjFsMi4zLTEuNUM1MSA3LjUgNDguNiA2LjMgNDYgNi4zYy00LjQgMC04IDMuNi04IDguMXMzLjQgOC4xIDggOC4xIDgtMy42IDgtOC4xYy4xLS4zIDAtLjUgMC0uN3pNMjUgMTRoLTd2Mmg0LjhjLS43IDMtMi45IDUuNS01LjggNi41TDUuNSAxMWMxLjItMy41IDQuNi02IDguNS02IDMgMCA1LjcgMS41IDcuNCAzLjhsMS41LTEuM0MyMC45IDQuOCAxNy43IDMgMTQgMyA4LjggMyA0LjQgNi43IDMuMyAxMS42bDEzLjIgMTMuMkMyMS4zIDIzLjYgMjUgMTkuMiAyNSAxNHptLTIyIC4xYzAgMi44IDEuMSA1LjUgMy4yIDcuNiAyLjEgMi4xIDQuOSAzLjIgNy42IDMuMkwzIDE0LjF6Ii8+CiAgPHBhdGggZD0iTTE0IDBDNi4zIDAgMCA2LjMgMCAxNHM2LjMgMTQgMTQgMTQgMTQtNi4zIDE0LTE0UzIxLjcgMCAxNCAwek02LjIgMjEuOEM0LjEgMTkuNyAzIDE2LjkgMyAxNC4yTDEzLjkgMjVjLTIuOC0uMS01LjYtMS4xLTcuNy0zLjJ6bTEwLjIgMi45TDMuMyAxMS42QzQuNCA2LjcgOC44IDMgMTQgM2MzLjcgMCA2LjkgMS44IDguOSA0LjVsLTEuNSAxLjNDMTkuNyA2LjUgMTcgNSAxNCA1Yy0zLjkgMC03LjIgMi41LTguNSA2TDE3IDIyLjVjMi45LTEgNS4xLTMuNSA1LjgtNi41SDE4di0yaDdjMCA1LjItMy43IDkuNi04LjYgMTAuN3oiIGZpbGw9IiM2MzkiLz4KPC9zdmc+Cg==",
  }
  _calculateAge = birthday => {
    var ageDifMs = Date.now() - birthday.getTime()
    var ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  componentDidMount() {
    fetchData(`/StaffAssets/${this.state.staff.id}`, data => {
      const { assetNumber, asset, serialNumber } = data

      this.setState({
        staffAssets: data,
        mappedStaff: {
          serialNumber,
          assetNumber,
          assetType: asset.assetType.name,
          assetName: asset.name,
        },
      })

      console.table(this.state.mappedStaff)

      setTimeout(() => {
        console.log(this.state.staffAssets, "AssetsLoad")
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
                        {staffData.person.phoneNumber}
                      </p>
                      <p className="text-muted font-weight-500">
                        <i className="fa fa-envelope mr-2" />
                        {staffData.person.email}
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
                        {staffData.staffType? staffData.staffType.name : ""}
                      </p>
                      <p className="text-muted font-weight-500 font-weight-bold">
                        <i className="fa fa-users mr-2" />
                        {staffData.department ? staffData.department.name : ""}
                      </p>
                      <p className="text-muted font-weight-500 font-weight-bold">
                        <i className="fa fa-map-marker-alt mr-2" />
                        {staffData.category ? staffData.category.name : ""}
                      </p>
                      <hr className="my-2" />
                    </div>
                    <div className="col-md-8 ml-5">
                      <div className="pop-font">
                        <h1 className="mb-0">
                          {staffData.person.surname}{" "}
                          {staffData.person.firstname}{" "}
                          {staffData.person.othername}
                        </h1>
                        <p className="text-primary font-weight-500">
                          {staffData.rank ? staffData.rank.name : ""}
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
                                className="nav-link mb-sm-3 mb-md-0 active"
                                id="tabs-icons-text-1-tab"
                                data-toggle="tab"
                                href="#tabs-icons-text-1"
                                role="tab"
                                aria-controls="tabs-icons-text-1"
                                aria-selected="true"
                              >
                                Employee BioData
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link mb-sm-3 mb-md-0"
                                id="tabs-icons-text-2-tab"
                                data-toggle="tab"
                                href="#tabs-icons-text-2"
                                role="tab"
                                aria-controls="tabs-icons-text-2"
                                aria-selected="false"
                              >
                                Job Information
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link mb-sm-3 mb-md-0"
                                id="tabs-icons-text-3-tab"
                                data-toggle="tab"
                                href="#tabs-icons-text-3"
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
                        <div
                          className="tab-pane fade show active"
                          id="tabs-icons-text-1"
                          role="tabpanel"
                          aria-labelledby="tabs-icons-text-1-tab"
                          style={{backgroundColor:"white", color:"#3e3939"}}


                         
                      
                        >
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Staff ID: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData.staffNumber}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Full Name: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData.person.surname},{" "}
                                {staffData.person.firstname}{" "}
                                {staffData.person.othername}{" "}
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
                                {staffData.person.state
                                  ? staffData.person.state.name
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
                                {staffData.person.lga
                                  ? staffData.person.lga.name
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
                                {staffData.person.address}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Date of Birth: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData.person.birthDay
                                  ? staffData.person.birthDay.substring(0, 10)
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
                                {staffData.person.gender
                                  ? staffData.person.gender.name
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
                                {staffData.person.maritalStatus
                                  ? staffData.person.maritalStatus.name
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
                                {staffData.person.religion
                                  ? staffData.person.religion.name
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
                                {staffData.person.phoneNumber}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-700">Email Address: </p>
                            </div>
                            <div className="col-md-9">
                              <p className="font-weight-400">
                                {staffData.person.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tabs-icons-text-2"
                          role="tabpanel"
                          aria-labelledby="tabs-icons-text-2-tab"
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
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tabs-icons-text-3"
                          role="tabpanel"
                          aria-labelledby="tabs-icons-text-3-tab"
                        >
                          <div className="row">
                            <div className="col-md-12">
                              <p className="font-weight-700">
                                Assets History:{" "}
                              </p>
                              <div className="table-responsive mb-5">
                                <table className="table table-striped table-hover">
                                  <tbody>
                                    <tr>
                                      <th>
                                        {this.state.mappedStaff.serialNumber}
                                      </th>
                                      <th>
                                        {this.state.mappedStaff.assetName}
                                      </th>
                                      <th>
                                        {this.state.mappedStaff.assetNumber}
                                      </th>
                                      <th>
                                        {this.state.mappedStaff.assetType}
                                      </th>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body"></div>
                  <Link
                    state={{ id: this.state.staff.id }}
                    to="/app/admin/promotion"
                    activeClassName="active"
                    className="nav-link"
                  >
                    <button type="button" className="btn btn-primary">
                      Promote Staff
                    </button>
                  </Link>
                  <Link
                    state={{ id: this.state.staff.id }}
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
