import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Fade } from "reactstrap";
import _ from "lodash";
import { postData, editData, fetchData } from "../../../utils/crud";
import { codeGreen } from "../../Barn";
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner";
import logobg from "../../../images/ziklogosm.png"


class StaffDeptTransferLetter extends Component {
  state = {
    conInfo: this.props.location.state.data,
    staffRoleId: JSON.parse(localStorage.getItem("DTO")),
    payLoad: JSON.parse(localStorage.getItem("userData")),

    // confirmCard: true,
  };
loadStaffInfo = () =>{
    this.setState({spin:true})
    fetchData(`/Staff/${this.state.payLoad.staffId}`, data =>{
        console.log(data, "StaffInfo")
    this.setState({spin:false})

        this.setState({
            staffInfo: data
        })
    })
}
  leaveAction = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    let actOnLeave = {
    //   leaveResponseId: this.state.conInfo.leaveResponseId,
      leaveRequestId: this.state.conInfo.leaveRequestId,
      remarks: this.state.comments,
    };
  

    editData(
      `/LeaveRequestManagement/LeaveAction?roleId=${this.state.payLoad.roleId}`,
      actOnLeave,
      (data) => {
        console.log(data);
        if (data.status == codeGreen) {
          this.setState({
            notificationCard: true,
            loading: false,
          });
        } else {
          alert("Error Submitting Request");
          this.setState({ loading: false });
        }
      }
    );
  };



  closeNotification = () => {
   
      this.setState({
        notificationCard: false,
        declineCard:false,
        confirmCard:false
      });
    
  
  };


 

  componentDidMount() {
    console.log(this.state.conInfo, "Tranfer Obj");

 this.loadStaffInfo();
    
  }
  render() {
    return (
      <>
        {this.state.loading ? <Spinner msg={"Saving Request.."} /> : null}
        
                {this.state.notificationCard ? <NotificationCard
                message={"Leave Request Was Succesfully Approved!"}
                okBtn={true}
                closeCard={this.closeNotification}
                />: null}

            {this.state.declineCard ? <NotificationCard
                message={"The Selected Staff has been denied Leave Approval by you!"}
                okBtn={true}
                closeCard={this.closeNotification}
                />: null}


              {this.state.confirmCard ? <NotificationCard
                message={"Are you sure of this action?"}
               confirmBtn={true}
               confirm={(e) => {this.declineLeaveRequest(e)}}
               closeBtn={true}
                closeCard={this.closeNotification}
                />: null}
            {/* <NotificationCard message={"This Leave Request has previously been approved by you."}/> */}

        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Department Transfer Request Letter{" "} &nbsp;
                  <span className="h3 text-muted">
                    {/* /Staff Leave Request Details &nbsp;{" "} */}
                  </span>
                </h6>
                <Link
                  to={{ pathname: "/StaffDepartmentTransfer" }}
                  className="btn btn-info"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Back"
                >
                  <i className="fa fa-arrow-circle-left fa-2x" />
                </Link>
              </div>
              <div className="col-lg-6 col-5 text-right"></div>
            </div>

            <div className="container-fluid mt--6">
              <div
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-lg"
                  style={{ marginTop: "80px" }}
                >
                  <div className="modal-content" style={{borderLeft:"4px solid darkorange"}}>
                    <div className="modal-header border-bottom" style={{textAlign:"center"}}>
                      <h2 className="mb-0"  id="exampleModalScrollableTitle" style={{textAlign:"center", width:"100%"}}>
                      <div className="col-12 text-center">
                        <img
                          src={logobg}
                          style={{ width:"50px" }}
                          
                        />
                      </div>
                       <b>NNAMDI AZIKIWE UNIVERSITY</b> 
                     
                      </h2>

                     
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <p
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              The Human Resource Manager,
                            </p>
                            <p
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Nnamdi Azikiwe University,
                            </p>
                            <p
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              {this.state.conInfo.dateOfRequest.substring(0, 10)}
                            </p>
                           <br/>
                           <br/>
                           <p
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Dear Sir/Ma,
                            </p>
                          </div>
                        </div>

                       

                        
                        <div className="col-md-12">
                          <div className="form-group">
                            <h3
                            style={{textAlign:"center"}}
                             
                              
                            >
                              <b>
                              TRANSFER/CHANGE OF DEPARTMENT REQUEST
                              </b>
                            </h3>
                          
                          </div>
                        </div>

                  

                        <div className="col-md-12">
                          <div className="form-group">
                            <p
                            style={{lineHeight:"30px", textAlign:"center"}}
                            
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              I,  <b>{_.upperCase(this.state.staffInfo?.person?.surname)} {_.upperCase(this.state.staffInfo?.person?.firstname)} {_.upperCase(this.state.staffInfo?.person?.othername)},</b> with Staff Number <b>{this.state.staffInfo?.generatedStaffNumber}, </b> from the department of <b>{_.upperCase(this.state.staffInfo?.department?.name)},</b> do hereby make an official request for a Transfer/Change of Department from the afore mentioned Department to the {<b>DEPARTMENT OF {_.upperCase(this.state.conInfo.newDepartment)}</b>}<br/>
              
                              {/* <b>{_.upperCase(this.state.conInfo.leaveType)}</b> from <b>{this.state.conInfo.start.substring(0,10)}</b> to <b>{this.state.conInfo.end.substring(0,10)}.
                              
                              </b> */}
                              <br/>
                              Reason: {this.state.conInfo.reasons}
                              <br/>
                              <br/>
                              Thank you.
                            </p>
                           <br/>
                           <br/>
                          
                      <br/>

                          </div>
                        </div>
                       

                      </div>

                     
                      {<div>

                 <small>Yours Faithfully,</small><br/>
                <b>{_.upperCase(this.state.staffInfo?.person?.surname)} {_.upperCase(this.state.staffInfo?.person?.firstname)} {_.upperCase(this.state.staffInfo?.person?.othername)}</b>
                 <p>{this.state.conInfo.dateOfRequest.substring(0, 10)}</p>


                    </div>}


                  </div>
                </div>
              </div>
              </div>
              <div
                className="modal fade delete-level-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
            
              
              </div>
            </div>
          </div>
        
        
        
{/* Untouched */}
        
          {/* <div className="container-fluid mt--6">
              <div
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-lg"
                  style={{ marginTop: "80px" }}
                >
                  <div className="modal-content">
                    <div className="modal-header border-bottom">
                      <h2 className="mb-0" id="exampleModalScrollableTitle">
                        Staff Name: &nbsp;{" "}
                        <b>{_.upperCase(this.state.conInfo.staffName)}</b>
                      </h2>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Staff Number
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="staffNumber"
                              disabled
                              value={_.upperCase(
                                this.state.conInfo.staffNumber
                              )}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Rank
                            </label>
                            <input
                              className="form-control"
                              disabled
                              type="text"
                              name="rank"
                            />
                          </div>
                        </div>


                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Leave Type
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="leave"
                              disabled
                              value={_.upperCase(
                                this.state.conInfo.leaveType
                              )}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Proposed Start Date
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              name="startDate"
                              disabled
                              value={this.state.conInfo.start.substring(
                                0,
                                10
                              )}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Proposed End Date
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              name="endDate"
                              disabled
                              // value={this.state.leaveRequest.staff ? this.state.leaveRequest.endDate.substring(0,10) : ''} disabled
                              defaultValue={this.state.conInfo.end.substring(
                                0,
                                10
                              )}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Reason
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="reason"
                              disabled
                              value={_.upperCase(this.state.conInfo.reason)}

                              // value={this.state.leaveRequest.staff ? this.state.leaveRequest.reason : ''} disabled
                            />
                          </div>
                        </div>


                        
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Comments From Previous Desk of Action
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="reason"
                              disabled
                              value={_.upperCase(this.state.conInfo.comment)}

                              // value={this.state.leaveRequest.staff ? this.state.leaveRequest.reason : ''} disabled
                            />
                          </div>
                        </div>

                  

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Remarks
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="remarks"
                       
                              onChange={(e) => {
                                this.setState({ comments: e.target.value });
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {<div>

                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={(e) => {
                          this.leaveAction(e);
                        }}
                      >
                        Approve Request &nbsp; <i className="fa fa-check" />
                      </button>
                      <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-danger"
                        onClick={() => {this.setState({confirmCard:true})}}
                      >
                        Decline Request &nbsp; <i className="fa fa-ban" />
                      </button>
                    </div>}


                  </div>
                </div>
              </div>
              </div>
              <div
                className="modal fade delete-level-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header border-bottom">
                      <h2 className="mb-0" id="exampleModalScrollableTitle">
                        Delete Staff?
                      </h2>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div>
                        <div>
                          <p>
                            Are you sure you want to delete this record? All
                            items related to it will be affected
                          </p>
                          <button className="btn btn-outline-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
         */}
        </Fade>
      </>
    );
  }
}

export default StaffDeptTransferLetter;
