import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
import _ from "lodash";
import {
  Fade,
  Tooltip,
  Popover,
  PopoverBody,
  PopoverHeader,
  Button,
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import $ from "jquery";
import {
  HOD,
  Dean,
  Vice_Chancellor,
  _Declined,
  Wave_Three,
  _statCodeOne,
  _statCodeZ,
  _statCodeTwo,
  Roles,
} from "../../../components/Barn";
export default class AdminLeaveRequest extends React.Component {
  state = {
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    staffRoleId: JSON.parse(localStorage.getItem("DTO")),
    payLoad: JSON.parse(localStorage.getItem("userData")),

    leaveRequests: [],
    leaveRequest: {
      leaveId: 0,
      staffId: 0,
      startDate: null,
      endDate: null,
      reason: "",
      attachmentUrl: "",
      remarks: "",
      id: 0,
      progressBar: null,
    },
  };

  updateItem = (index, value) => {
    const { leaveRequest } = this.state;
    leaveRequest[index] = value;
    this.setState({ ...this.state, leaveRequest });
  };

  updateChekcbox = () => {
    const { leaveRequest } = this.state;
    leaveRequest.approved = !leaveRequest.approved;
    this.setState({ ...this.state, leaveRequest });
  };

  loadRequests = () => {
    fetchData("/LeaveRequest", (data) => {
      this.setState({ leaveRequests: _.reverse(data) });
    });
  };

  getInstDept = () => {
    fetchData(
      `/InstitutionDepartments/${this.state.staffPayLoad?.departmentId}`,
      (data) => {
        console.log(data, "Dept!!");
        this.setState({
          departmentName: data.name,
        });
      }
    );
  };

  // GetLeaveRecordsHistory?departmentId=2&roleId=7

  getLeaveRequestsByRole = () => {
    fetchData(
      `/LeaveRequestManagement/GetLeaveRequestsByRole?departmentId=${
        this.state.staffPayLoad?.departmentId
          ? this.state.staffPayLoad?.departmentId
          : 0
      }&roleId=${this.state.payLoad?.roleId}`,
      (data) => {
        console.log(data, "Fusion");
        this.setState({
          newLeaveRequests: data,
          newLeaveCount: data.length,
        });
      }
    );
  };

  getLeaveRequestHistoryByRole = () => {
    fetchData(
      `/LeaveRequestManagement/GetLeaveRecordsHistory?departmentId=${
        this.state.staffPayLoad?.departmentId
          ? this.state.staffPayLoad?.departmentId
          : 0
      }&roleId=${this.state.payLoad?.roleId}`,
      (data) => {
        console.log(data, "Histrory");
        this.setState({
          leaveRequestsHistory: data,
          prev_acted: true,
          new_requests: false,
        });
      }
    );
  };

  componentDidMount() {
    let verification = JSON.parse(localStorage.getItem("userData"));

    if (!localStorage.getItem("userData")) {
      this.setState({
        userRedirect: true,
      });
    }

    // else if (verification.roleId != Roles.SuperAdmin && verification.roleId != Roles.HOD && verification.roleId != Roles.Dean && verification.roleId != Roles.Vice_Chancellor && verification.roleId != Roles.Personnel && verification.roleId != Roles.PersonnelDocumentation)
    //   {
    //     alert("Unauthorized access")
    //   localStorage.clear();
    //   this.setState({
    //     userRedirect: true,
    //   });
    // }
    //     if(this.state.newLeaveRequests.progress == 1){
    //   this.setState({progressBar:33.4})
    //  }
    console.log(this.state.staffPayLoad, "Staff PAyload");
    this.getLeaveRequestsByRole();
    this.getLeaveRequestHistoryByRole();
    this.getInstDept();
  }

  setSelectedData = (data) => {
    let { leaveRequest } = this.state;
    leaveRequest = data;
    this.setState({ ...this.state, leaveRequest });
  };

  isValidInputs = () => {
    return true;
  };

  submitForm = () => {
    if (this.isValidInputs()) {
      const { leaveRequest } = this.state;
      if (leaveRequest.approved) {
        const id = this.props.user.userId;
        leaveRequest.approvedById = parseInt(id);
      }

      editData(
        `/LeaveRequest/${this.state.leaveRequest.id}`,
        leaveRequest,
        (data) => {
          this.loadRequests();
        }
      );
    }
  };

  _calculateDuration = (startDate, endDate) => {
    // To set two dates to two variables
    const _start = new Date(startDate);
    const _end = new Date(endDate);

    // To calculate the time difference of two dates
    const Difference_In_Time = _end.getTime() - _start.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  };

  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <>
        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Dashboard{" "}
                  <span className="h3 text-muted">/Staff Leave Requests</span>
                </h6>
              </div>
              <div className="col-lg-6 col-5 text-right"></div>
            </div>
            {/* Card stats */}
            {this.state.prev_acted ? (
              <div className="row">
                <hr className="mx-0" />
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="card-title mb-0 float-left mr-3">
                            Leave Requests (Acted){" "}
                            {/* <b>{_.upperCase(this.state.departmentName)}</b> */}
                          </h3>
                          <div className="col">
                            <a
                              href="#"
                              title="Header"
                              data-toggle="popover"
                              style={{ display: "block" }}
                              data-placement="top"
                              data-content="Content"
                            >
                              <div
                                className="media align-items-center float-right mr-3"
                                onClick={() =>
                                  this.setState({
                                    prev_acted: false,
                                    new_requests: true,
                                  })
                                }
                              >
                                <span className="navbar-tool-label">
                                  {this.state.newLeaveCount}
                                </span>

                                <span className="avatar avatar-sm rounded-circle">
                                  <i className="fa fa-bell" />
                                </span>
                              </div>
                              {/* </Link> */}
                            </a>
                          </div>

                          <div></div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped sofia">
                          <thead>
                            <tr>
                              <th>S/No</th>
                              <th>Staff Number</th>
                              <th>Staff Name</th>
                              <th>Leave Type</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Original Leave Duration(Days)</th>
                              <th>NO. of Days Applied for</th>
                              <th>Unused Leave Days</th>
                              <th>Status</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.leaveRequestsHistory &&
                              this.state.leaveRequestsHistory.map((a, i) => (
                                <tr>
                                  <td>{i + 1}</td>
                                  <td>{a.staffNumber}</td>
                                  <td>{_.upperCase(a.staffName)}</td>
                                  <td>{a.leaveType}</td>
                                  <td>{a.start.substring(0, 10)}</td>
                                  <td>{a.end.substring(0, 10)}</td>

                                  <td>{a.duration}</td>
                                  <td>{a.appliedLeaveDuration}</td>
                                  <td>{a.remainingLeaveDays}</td>
                                  <td>
                                    {a.status >= 98 ? (
                                      <span class="badge badge-success">
                                        Approved
                                      </span>
                                    ) : a.status == _Declined ? (
                                      <span class="badge badge-danger">
                                        Declined
                                      </span>
                                    ) : (
                                      <div
                                        class="progress badge-warning"
                                        id="progressHold"
                                        style={{ height: "20px" }}
                                      >
                                        <div
                                          class="progress-bar bg-warning"
                                          id="pb"
                                          style={{
                                            width: a.progressInPercentage + "%",
                                            height: "15px",
                                            padding: "10px",
                                            color: "white",
                                          }}
                                        >
                                          Processing...
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    <Link
                                      to={{
                                        pathname: "/ViewLeaveRequest",
                                        state: {
                                          data: a,
                                        },
                                      }}
                                      className="btn btn-info btn-sm"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {this.state.new_requests ? (
              <div className="row">
                <hr className="mx-0" />
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="card-title mb-0 float-left mr-3">
                            New Leave Requests{" "}
                            {/* <b>{_.upperCase(this.state.departmentName)}</b> */}
                          </h3>
                          <div className="col">
                            <a
                              href="#"
                              title="Header"
                              data-toggle="popover"
                              style={{ display: "block" }}
                              data-placement="top"
                              data-content="Content"
                            >
                              {/* <Link to={"#"}> */}
                              {/* <button
                            className="btn btn-danger btn-icon float-right mr-3"
                            onClick={this.makeRequestHandler}
                          >
                            <span className="btn-inner--icon">
                            
                            </span>
                            <span className="btn-inner--text">
    New Requests <span style={{height:"30", width:"55", borderRadius:"50%", backgroundColor:"ghostwhite", color:"black", padding:"7px"}}>{this.state.newLeaveCount}</span>
    
                            </span>
                          </button> */}

                              <div className="media align-items-center float-right mr-3">
                                <span className="navbar-tool-label">
                                  {this.state.newLeaveCount}
                                </span>

                                <span className="avatar avatar-sm rounded-circle">
                                  <i className="fa fa-bell" />
                                </span>
                              </div>
                              {/* </Link> */}
                            </a>
                          </div>

                          <div></div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped sofia">
                          <thead>
                            <tr>
                              <th>Status</th>
                              <th>Staff Number</th>
                              <th>Staff Name</th>
                              <th>Leave Type</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Original Leave Duration(Days)</th>
                              <th>NO. of Days Applied for</th>
                              <th>Unused Leave Days</th>
                              <th>Status</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.newLeaveRequests &&
                              this.state.newLeaveRequests.map((a, i) => (
                                <tr>
                                  <td><span className="badge badge-danger new-badge">New</span></td>
                                  <td>{a.staffNumber}</td>
                                  <td>{_.upperCase(a.staffName)}</td>
                                  <td>{a.leaveType}</td>
                                  <td>{a.start.substring(0, 10)}</td>
                                  <td>{a.end.substring(0, 10)}</td>

                                  <td>{a.duration}</td>
                                  <td>{a.appliedLeaveDuration}</td>
                                  <td>{a.remainingLeaveDays}</td>
                                  <td>
                                    {a.status >= 98 ? (
                                      <span class="badge badge-success">
                                        Approved
                                      </span>
                                    ) : a.status == _Declined ? (
                                      <span class="badge badge-danger">
                                        Declined
                                      </span>
                                    ) : (
                                      <div
                                        class="progress badge-warning"
                                        id="progressHold"
                                        style={{ height: "20px" }}
                                      >
                                        <div
                                          class="progress-bar bg-warning"
                                          id="pb"
                                          style={{
                                            width: a.progressInPercentage + "%",
                                            height: "15px",
                                            padding: "10px",
                                            color: "white",
                                          }}
                                        >
                                          Processing...
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    <Link
                                      to={{
                                        pathname: "/ViewLeaveRequest",
                                        state: {
                                          data: a,
                                        },
                                      }}
                                      className="btn btn-info btn-sm"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Fade>
      </>
    );
  }
}
