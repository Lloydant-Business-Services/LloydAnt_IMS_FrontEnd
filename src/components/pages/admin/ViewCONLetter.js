import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Fade } from "reactstrap";
import _ from "lodash";
import { postData, editData, fetchData } from "../../../utils/crud";
import { codeGreen } from "../../Barn";
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner";
import logobg from "../../../images/ziklogosm.png";

class ViewChangeOfNameLetter extends Component {
  state = {
    conInfo: this.props.location.state.data,
    staffRoleId: JSON.parse(localStorage.getItem("DTO")),
    payLoad: JSON.parse(localStorage.getItem("userData")),

    // confirmCard: true,
  };
  loadStaffInfo = () => {
    this.setState({ spin: true });
    fetchData(`/Staff/${this.state.conInfo.staffId}`, (data) => {
      console.log(data, "StaffInfo");
      this.setState({ spin: false });

      this.setState({
        staffInfo: data,
      });
    });
  };
  changeOfNameAction = (e) => {
    e.preventDefault();
    this.setState({ loading: true, confirmCard:false });

   

    postData(
      `/ChangeOfName/RequestAction?staffId=${this.state.staffInfo.id}&requestAction=${this.state.actOnRequest}`, "",
     
      (data) => {
        console.log(data);
        if (data == codeGreen || data == 204) {
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

  declineLeaveRequest = (e) => {
    e.preventDefault();
    this.setState({ loading: true, confirmCard: false });

    let declinePayload = {
      leaveRequestId: this.state.conInfo.leaveRequestId,
      remarks: this.state.comments,
    };

    editData(
      `/LeaveRequestManagement/DeclineRequest?roleId=${this.state.payLoad.roleId}`,
      declinePayload,
      (data) => {
        console.log(data);
        if (data.status == codeGreen) {
          this.setState({ declineCard: true, loading: false });
        } else {
          this.setState({ loading: false });
          alert("Error sending Request");
        }
      }
    );
  };

  closeNotification = () => {
    this.setState({
      notificationCard: false,
      declineCard: false,
      confirmCard: false,
    });
  };

  componentDidMount() {
    console.log(this.state.conInfo, "Leave Obj");

    this.loadStaffInfo();
  }
  render() {
    return (
      <>
        {this.state.loading ? <Spinner msg={"Saving Request.."} /> : null}

        {this.state.notificationCard ? (
          <NotificationCard
            message={"Action was successful!"}
            okBtn={true}
            closeCard={this.closeNotification}
          />
        ) : null}

        {this.state.declineCard ? (
          <NotificationCard
            message={
              "The Selected Staff has been denied Leave Approval by you!"
            }
            okBtn={true}
            closeCard={this.closeNotification}
          />
        ) : null}

        {this.state.confirmCard ? (
          <NotificationCard
            message={"Are you sure of this action?"}
            confirmBtn={true}
            confirm={(e) => {
              this.changeOfNameAction(e);
            }}
            closeBtn={true}
            closeCard={this.closeNotification}
          />
        ) : null}
        {/* <NotificationCard message={"This Leave Request has previously been approved by you."}/> */}

        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Change of Name Application Letter &nbsp;
                  <span className="h3 text-muted">
                    {/* /Staff Leave Request Details &nbsp;{" "} */}
                  </span>
                </h6>
                <Link
                  to={{ pathname: "/ChangeOfNameManagement" }}
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
                  <div
                    className="modal-content"
                    style={{ borderLeft: "4px solid darkorange" }}
                  >
                    <div
                      className="modal-header border-bottom"
                      style={{ textAlign: "center" }}
                    >
                      <h2
                        className="mb-0"
                        id="exampleModalScrollableTitle"
                        style={{ textAlign: "center", width: "100%" }}
                      >
                        <div className="col-12 text-center">
                          <img src={logobg} style={{ width: "50px" }} />
                        </div>
                        <b>NNAMDI AZIKIWE UNIVERSITY</b>
                      </h2>
                    </div>
                    <br />
                    <br />
                    <br />
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
                              {this.state.conInfo.dateOfRequest.substring(
                                0,
                                10
                              )}
                            </p>
                            <br />
                            <br />
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
                            <h3 style={{ textAlign: "center" }}>
                              <b>REQUEST FOR CHANGE OF NAME</b>
                            </h3>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <p
                              style={{
                                lineHeight: "30px",
                                textAlign: "center",
                              }}
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              I,{" "}
                              <b>
                                {_.upperCase(
                                  this.state.staffInfo?.person?.surname
                                )}{" "}
                                {_.upperCase(
                                  this.state.staffInfo?.person?.firstname
                                )}{" "}
                                {_.upperCase(
                                  this.state.staffInfo?.person?.othername
                                )}
                                ,
                              </b>{" "}
                              with Staff Number{" "}
                              <b>
                                {this.state.staffInfo?.generatedStaffNumber},{" "}
                              </b>{" "}
                              from the department of{" "}
                              <b>
                                {_.upperCase(
                                  this.state.staffInfo?.department?.name
                                )}
                                , previuosly known as{" "}
                                {_.upperCase(
                                  this.state.staffInfo?.person?.surname
                                )}{" "}
                                {_.upperCase(
                                  this.state.staffInfo?.person?.firstname
                                )}{" "}
                                {_.upperCase(
                                  this.state.staffInfo?.person?.othername
                                )}
                                ,
                              </b>{" "}
                              humbly make an official request for a change of
                              Name. I have fufiled and met all neccessary legal
                              requirements to effect this change.
                              <br />
                              <br />
                              In accordance, I am now to be called, addressed
                              and reffered to as{" "}
                              <b>
                                {_.upperCase(this.state.conInfo.surname)},{" "}
                                {_.upperCase(this.state.conInfo.firstname)}{" "}
                                {_.upperCase(this.state.conInfo.othername)}
                              </b>
                              {/* <b>{_.upperCase(this.state.conInfo.leaveType)}</b> from <b>{this.state.conInfo.start.substring(0,10)}</b> to <b>{this.state.conInfo.end.substring(0,10)}.
                              
                              </b> */}
                              <br />
                              Comments: {this.state.conInfo.comments}
                              <br />
                              <br />
                              Thank you.
                            </p>
                            <a href={this.state.conInfo.attachment} className="btn btn-warning btn-sm"  target="_blank"><i className="fa fa-eye"/>  Supporting Document</a>
                            <br />
                            <br />

                            <br />
                          </div>
                        </div>
                      </div>

                      {!this.state.conInfo.isClosed && !this.state.conInfo.isApproved ?
                        <div>
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={()=> {this.setState({confirmCard:true, actOnRequest:true})}}
                          >
                            Approve Request &nbsp; <i className="fa fa-check" />
                          </button>
                          <button
                            type="button"
                            data-dismiss="modal"
                            className="btn btn-danger"
                            onClick={() => {
                              this.setState({ confirmCard: true, actOnRequest:false });
                            }}
                          >
                            Decline Request &nbsp; <i className="fa fa-ban" />
                          </button>
                        </div> : this.state.conInfo.isClosed && !this.state.conInfo.isApproved ? <span className="badge badge-danger">Declined</span> : <span className="badge badge-success">Approved</span>
                      }
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
              ></div>
            </div>
          </div>
        </Fade>
      </>
    );
  }
}

export default ViewChangeOfNameLetter;
