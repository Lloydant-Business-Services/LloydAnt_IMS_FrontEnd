import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
import _ from "lodash";
import { Fade } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import { HOD, Dean, Vice_Chancellor, _Declined, Wave_Three, _statCodeOne, _statCodeZ, _statCodeTwo } from "../../../components/Barn";



export default class ChangeOfDeptManagement extends React.Component {
  state = {
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    staffRoleId: JSON.parse(localStorage.getItem("DTO")),
    payLoad: JSON.parse(localStorage.getItem("userData")),



    conRequests: [],
    leaveRequest: {
      leaveId: 0,
      staffId: 0,
      startDate: null,
      endDate: null,
      reason: "",
      attachmentUrl: "",
      remarks: "",
      id: 0,
      progressBar: null
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
    fetchData("/DepartmentTransfer/GetByAdmin", (data) => {
      this.setState({ conRequests: _.reverse(data) });
    });
  };

  getInstDept = () => {
    fetchData(
      `/InstitutionDepartments/${this.state.staffPayLoad.departmentId}`,
      (data) => {
        console.log(data, "Dept!!");
        this.setState({
          departmentName: data.name,
        });
      }
    );
  };





  componentDidMount() {
    if (!localStorage.getItem("userData")) {
      this.setState({
        userRedirect: true,
      });
    }



  }

  setSelectedData = (data) => {
    let { leaveRequest } = this.state;
    leaveRequest = data;
    this.setState({ ...this.state, leaveRequest });
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
                  Staff Transfer/Change of Department Requests{" "}
                  <span className="h3 text-muted">Approve/Decline</span>
                </h6>
              </div>
              <div className="col-lg-6 col-5 text-right"></div>
            </div>
            {/* Card stats */}
            <div className="row">
              <hr className="mx-0" />
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="card-title mb-0 float-left mr-3">
                          Department Transfer Request List{" "}
                          {/* <b>{_.upperCase(this.state.departmentName)}</b> */}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>S/No</th>
                            <th>Staff Number</th>
                            <th>Staff Name</th>
                            <th>Date of Submission</th>
                            <th>Status</th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.conRequests &&
                            this.state.conRequests.map((a, i) => (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{a.staffNumber}</td>
                                <td>{_.upperCase(a.staffName)}</td>
                                <td>{a.dateOfRequest.substring(0, 10)}</td>
                                <td>
                              
                                 
                                {a.isApproved && a.isClosed ? <span class="badge badge-success">Approved</span> : 
                                      !a.isApproved  && !a.isClosed ? <span class="badge badge-warning new-badge">New</span> :
                                      !a.isApproved  && a.isClosed ? <span class="badge badge-danger">Declined</span> 
                                      
                                      : null}
                          
                          
                          
                                  
                                </td>
                                <td>
                                  <Link
                                    to={{
                                      pathname: "/StaffTransferLetter",
                                      state: {
                                        data:a,
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
          </div>
        </Fade>
     
     
     
     
      </>
    );
  }
}
