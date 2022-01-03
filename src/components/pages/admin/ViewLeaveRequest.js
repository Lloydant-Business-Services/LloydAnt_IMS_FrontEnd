import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Fade } from "reactstrap";
import _, { toUpper } from "lodash";
import { postData, editData, fetchData } from "../../../utils/crud";
import { codeGreen } from "../../Barn";
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner";
import logobg from "../../../images/ziklogosm.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import {exportPDF} from "../admin/PDFBuilders/AnnualLeave"

class ViewLeaveRequest extends Component {
  state = {
    leaveInfo: this.props.location.state.data,
    staffRoleId: JSON.parse(localStorage.getItem("DTO")),
    payLoad: JSON.parse(localStorage.getItem("userData")),

    // confirmCard: true,
  };

  exportPDF = () => {
    const staff = this.state;
    const orientation = "portrait"; // portrait or landscape
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const margins = {
      bottom: 40,
      top: 10,
      left: 10,
      right: 10,
    };

    const marginLeft = 20;

    if (typeof window !== "undefined") {
      // const doc = new jsPDF(orientation, unit, size)
      const doc = new jsPDF("portrait", "pt", "A4", [200, 400]);

      var img = new Image();
      img.src = logobg;

      doc.setFontSize(15);
      doc.setFont("Times New Roman");

      const nau = "NNAMDI AZIKIWE UNIVERSITY";
      const ass = "ASSUMPTION OF DUTY";

      doc.setFont("Arial");
      doc.setFontSize(16);

      doc.addImage(img, "png", 280, 20, 28, 34);

      doc.setFontType("bold");
      doc.text(nau, 180, 70);
      doc.setFontType("normal");
      doc.text("OFFICE OF THE REGISTRAR", 200, 87);
      doc.text("P.M.B. 5025", 250, 105);

      doc.setFontSize(15);
      doc.setFontType("bold");
      doc.text("Personal Data:", 60, 150);
      doc.setFontType("normal");
      doc.setFontSize(12);

      //Section One
      doc.text("Name: " + staff.leaveInfo?.staffName, 60, 180);
      doc.text("Department: " + staff.leaveInfo?.departmentName, 250, 180);
      doc.text("Rank: " + staff.staffStore.rank?.name, 380, 180);
      doc.text(
        "Staff Type: " + toUpper(staff.staffStore?.staffType?.name),
        60,
        205
      );
      doc.setLineDash([20, 0], 10);
      doc.line(50, 220, 553, 220);

      //Section Two
      doc.setFontSize(15);
      doc.setFontType("bold");
      doc.text("Previous Leave Information:", 60, 260);
      doc.setFontType("normal");
      doc.setFontSize(12);
      doc.text("Date of last Annual Leave (From) : -", 60, 290);
      doc.text("To : -", 350, 290);
      // staff.staffStore.person.genderId == 1 ? doc.text("Maternity: " + staff.staffStore.rank?.name, 380, 290) : null
      if (staff.staffStore.person?.genderId == 1) {
        doc.text("Period of last Maternity (From) : -", 60, 315);
        doc.text("To: -", 350, 315);
      }
      doc.setLineDash([20, 0], 10);
      doc.line(50, 330, 553, 330);

      doc.setFontSize(15);
      doc.setFontType("bold");
      doc.text("Present Leave Request Information:", 60, 360);
      doc.setFontType("normal");
      doc.setFontSize(12);
      doc.text(
        "Number of Days : " + staff.leaveInfo?.appliedLeaveDuration,
        60,
        390
      );
      doc.text("From : " + staff.leaveInfo?.start.slice(0, 10), 200, 390);
      doc.text("To : " + staff.leaveInfo?.end.slice(0, 10), 350, 390);
      doc.setLineDash([20, 0], 10);
      doc.line(50, 404, 553, 405);

      doc.setFontSize(15);
      doc.setFontType("bold");
      doc.text("HOD Comments:", 60, 435);
      doc.setFontType("normal");
      doc.setFontSize(12);
      doc.setLineDash([20, 0], 10);
      doc.line(50, 470, 553, 470);

      doc.setFontSize(15);
      doc.setFontType("bold");
      doc.text("Personnel Information:", 60, 490);
      doc.setFontType("normal");
      doc.setFontSize(12);
      doc.setLineDash([20, 0], 10);
      doc.line(50, 520, 553, 520);

      doc.setFontSize(13);
      doc.setFontType("bold");
      doc.text("DEPUTY REGISTRAR PERSONNEL:", 60, 570);
      doc.text("CC:", 60, 600);
      doc.text("Bursar:", 120, 600);
      doc.text("HOD Concerned:", 120, 620);
      doc.text("Staff Concerned:", 120, 640);
      doc.text("Staff/PF:", 120, 660);

      doc.save("Annual Leave Print-out.pdf");
    }
  };

  //Ends

  leaveAction = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    let actOnLeave = {
      //   leaveResponseId: this.state.leaveInfo.leaveResponseId,
      leaveRequestId: this.state.leaveInfo.leaveRequestId,
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

  declineLeaveRequest = (e) => {
    e.preventDefault();
    this.setState({ loading: true, confirmCard: false });

    let declinePayload = {
      leaveRequestId: this.state.leaveInfo.leaveRequestId,
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
    console.log(this.state.leaveInfo, "Leave Obj");

    fetchData(`/Staff/${this.state.leaveInfo.staffId}`, (data) => {
      console.log(data, "Staff Store");
      this.setState({ staffStore: data });
    });

    fetchData(
      `/LeaveRequestManagement/GetActionComments?leaveRequestId=${this.state.leaveInfo?.leaveRequestId}`,
      (data) => {
        console.log(data, "CommentList");
        this.setState({ remarkList: data });
      }
    );
  }
  render() {
    return (
      <>
        {this.state.loading ? <Spinner msg={"Saving Request.."} /> : null}

        {this.state.notificationCard ? (
          <NotificationCard
            message={"Leave Request Was Succesfully Approved!"}
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
              this.declineLeaveRequest(e);
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
                  Leave Request{" "}
                  <span className="h3 text-muted">
                    /Staff Leave Request Details &nbsp;{" "}
                  </span>
                </h6>

                <Link to={"/LeaveRequest"}>
                  <button className="btn btn-primary">
                    <i className="fa fa-arrow-left" />
                  </button>
                </Link>
                <br />
                <br />
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
                              {this.state.leaveInfo.enteredDate.substring(
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
                              <b>
                                APPLICATION FOR{" "}
                                {_.upperCase(this.state.leaveInfo.leaveType)}
                              </b>
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
                                {_.upperCase(this.state.leaveInfo.staffName)},
                              </b>{" "}
                              with Staff Number{" "}
                              <b>{this.state.leaveInfo.staffNumber}, </b> from
                              the department of{" "}
                              <b>
                                {_.upperCase(
                                  this.state.leaveInfo.departmentName
                                )}
                                ,
                              </b>{" "}
                              do hereby make a humble and an official leave
                              request for due processing. It is a kind request
                              that I be permitted to go on{" "}
                              <b>
                                {_.upperCase(this.state.leaveInfo.leaveType)}
                              </b>{" "}
                              from{" "}
                              <b>
                                {this.state.leaveInfo.start.substring(0, 10)}
                              </b>{" "}
                              to{" "}
                              <b>
                                {this.state.leaveInfo.end.substring(0, 10)}.
                              </b>
                              <br />
                              Reason: {this.state.leaveInfo.reason}
                            </p>
                            <br />
                            <br />
                            <h2>Leave Action Progression</h2>
                            <table className="table table-striped">
                              <th>Desk</th>
                              <th>Remarks</th>
                              <th>Action</th>
                              {this.state.remarkList &&
                                this.state.remarkList.map((comms, i) => (
                                  <tr>
                                    <td>{comms.roleName} </td>

                                    <td>{comms.comments}</td>
                                    <td>
                                      {comms.action == true ? "Approved" : null}
                                    </td>
                                  </tr>
                                ))}
                            </table>
                            <br />
                          </div>
                        </div>
                      </div>

                      {this.state.leaveInfo.isActed &&
                      this.state.leaveInfo.isApproved ? (
                        <>
                          <span className="badge badge-success badge-sm">
                            Approved
                          </span>{" "}
                          &nbsp; &nbsp;
                        </>
                      ) : this.state.leaveInfo.isActed &&
                        !this.state.leaveInfo.isApproved ? (
                        <span className="badge badge-danger badge-sm">
                          Declined
                        </span>
                      ) : (
                        <>
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
                            onClick={() => {
                              this.setState({ confirmCard: true });
                            }}
                          >
                            Decline Request &nbsp; <i className="fa fa-ban" />
                          </button>
                        </>
                      )}

                      {this.state.leaveInfo.status >= 98 &&
                      this.state.leaveInfo.leaveTypeId == 7 ? (
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => this.exportPDF()}
                        >
                          <i className="fa fa-download" /> Download Annual Leave
                          Form
                        </button>
                      ) : null}
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

export default ViewLeaveRequest;
