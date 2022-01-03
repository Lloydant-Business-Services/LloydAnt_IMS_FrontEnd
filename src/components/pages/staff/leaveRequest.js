import React from "react";
// import { Link, navigateTo, navigate } from "gatsby"
import { fetchData, editData, postData } from "../../../utils/crud";
import {
  Wave_Three,
  codeGreen,
  statusDeclined,
  notClosed,
  StatusCodes,
  _Declined
} from "../../Barn";
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner";

import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { Slide, Fade, AttentionSeeker } from "react-awesome-reveal";

import {PushSpinner, ClassicSpinner, MetroSpinner} from "react-spinners-kit"



export default class LeaveRequest extends React.Component {
  state = {
    personDTO: JSON.parse(localStorage.getItem("DTOFULL")),
    payLoad: JSON.parse(localStorage.getItem("userData")),
    payLoad2: JSON.parse(localStorage.getItem("userData")),
    // loading:true,

    staff: {
      staffNumber: "NAU/",
      person: {
        surname: "",
        firstname: "",
        othername: "",
        birthDay: "",
        email: "",
        address: "",
        phoneNumber: "",
        stateId: 0,
        lgaId: 0,
        maritalStatusId: 0,
        religionId: 1,
        genderId: 0,
        imageUrl: "",
        id: 0,
      },
      rankId: 0,
      departmentId: 0,
      appointmentId: 0,
      unitId: 0,
      staffTypeId: 0,
      categoryId: 0,
      id: 0,
    },
    leaveTypes: [],
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
    },
    // makeRequest: true,
    day_count: 0,
    daysCalc:0
  };

  updatePersonItem = (index, value) => {
    const { leaveRequest } = this.state;
    leaveRequest[index] = value;
    this.setState({ ...this.state, leaveRequest });
  };

  loadStaff = () => {
    const id = this.props.user.userId;
    fetchData(`/Staff/${id}`, (data) => {
      const { staff, leaveRequest } = this.state;
      staff.staffNumber = data.staffNumber;
      staff.person.surname = data.person.surname;
      staff.person.firstname = data.person.firstname;
      staff.person.othername = data.person.othername;
      staff.person.birthDay = data.person.birthDay;
      staff.person.email = data.person.email;
      staff.person.address = data.person.address;
      staff.person.phoneNumber = data.person.phoneNumber;
      staff.person.stateId = data.person.stateId;
      staff.person.lgaId = data.person.lgaId;
      staff.person.maritalStatusId = data.person.maritalStatusId;
      staff.person.religionId = data.person.religionId;
      staff.person.genderId = data.person.genderId;
      staff.person.id = data.person.id;
      staff.rankId = data.rankId;
      staff.departmentId = data.departmentId;
      staff.appointmentId = data.appointmentId;
      staff.unitId = data.unitId;
      staff.staffTypeId = data.staffTypeId;
      staff.categoryId = data.categoryId;
      staff.id = data.id;
      if (data.person.imageUrl == "") {
        staff.person.imageUrl = null;
      } else {
        staff.person.imageUrl = data.person.imageUrl;
      }

      leaveRequest.staffId = staff.id;
      this.setState({ ...this.state, staff, leaveRequest });
    });
  };

  loadLeaves = () => {
    fetchData("/LeaveAssignments", (data) => {
      this.setState({ leaveTypes: data });
    });
  };

  loadRequests = () => {
    const id = this.props.user.userId;
    fetchData(`/LeaveRequest/LeaveRequestByStaff/${id}`, (data) => {
      this.setState({ leaveRequests: data });
    });
  };

  getLeavebyRank = () => {
    fetchData(
      `/LeaveType/LeaveTypeRankByRank?RankId=${this.state.personDTO?.rankId}`,
      (data) => {
        this.setState({ uniqueLeaveType: data });
        console.log(data, "Exclusive Leave Type");
      }
    );
  };

  componentDidMount() {
    // this.loadStaff()
    // this.loadLeaves()
    // this.loadRequests()
    
    this.getLeavebyRank();
    this.staffLeaveRequestHistory();
    // this.ascertainLeaveDays();
  }

  addForm = (e) => {
    e.preventDefault();
    this.setState({loading:true})

    if(this.state.personDTO?.staffTypeId == null){
    this.setState({loading:false})
      alert("The system is unable to ascertain your Staff type status as you do not have that updated. Contact the HR Admin to initiate update. Thank you.")
      return false;
    }
    // this.setState({ makeRequest: false });
    let newLeaveRequest = {
      comment: this.state.comment,
      supportDocument: "null",
      staffId: this.state.personDTO.id,
      start: this.state.startDate,
      end: this.state.endDate,
      leaveTypeRankId: this.state.selectedLeave,
      duration:parseInt(this.state.daysCalc)
    };

    if (this.state.selectedLeave == null) {
      alert("Select Leave Type");
    this.setState({loading:false})

      return false;
    }

    postData(
      `/LeaveRequestManagement/MakeLeaveRequests`,
      newLeaveRequest,
      (data) => {
        console.log(data);
        if (data == codeGreen) {
          this.setState({ successCard: true, loading:false });
          this.componentDidMount();
        } else if (data == statusDeclined) {
          this.setState({ requestDenied: true, loading:false });
        } else if (data == notClosed) {
          this.setState({ notClosedCard: true, loading:false });
        } else if (data == StatusCodes.RequiredDataNull) {
          this.setState({ noRequiredDetail: true, loading:false });
        } 
        else if(data == StatusCodes.Ineligible){
          this.setState({ appliedAndApprovedForTheYear: true, loading:false });
        }
        else if(data == StatusCodes.DurationDisparity){
          this.setState({ durationDisparity: true, loading:false });

        }
        else if(data == StatusCodes.NoChainSet){
            alert("Leave Chain not set");
          this.setState({loading:false });

        }
        
        // else {
        //   console("Error");
        // }
      }
    );
  };

  updateForm = () => {
    postData(`/LeaveRequest`, this.state.leaveRequest, (data) => {
      if (data) {
        this.loadRequests();
      }
    });
  };

  makeRequestHandler = () => {
    this.setState({ leaveDateRange: false, day_count: 0 });
   
      this.setState({
        makeRequest: true,
      });
    }
  // };

  staffLeaveRequestHistory = () => {
    fetchData(
      `/LeaveRequestManagement/GetLeaveRequestByStaffId?staffId=${this.state.payLoad?.staffId}`,
      (data) => {
        console.log(data, "History");
        this.setState({
          staffLeaveRecord: data,
        });
      }
    );
  };

  closeMakeRequest = () => {
    // alert("fefiuhkjh")
    this.setState({
      makeRequest: false,
    });
  };
  handleFileUpload = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    const { leaveRequest } = this.state;

    reader.onloadend = () => {
      leaveRequest.attachmentUrl = reader.result;
      this.setState({
        ...this.state,
        file: file,
        leaveRequest,
      });
    };
    reader.readAsDataURL(file);
  };

  handleSelectedLeave = (e) => {
    this.setState({ selectedLeave: parseInt(e.target.value) });
  };


  handleSelectEndDate = async (e) => {
    this.setState({daysSpin: true})
  
    this.setState({ endDate: e.target.value });
    console.log(this.state.endDate, "End Date");

    setTimeout(() => {
      this.ascertainLeaveDays();
  
      },2000)


    setTimeout(() => {
      var dayCount = this.dateDiffInDays(
        new Date(this.state.startDate),
        new Date(this.state.endDate)

      );
     
      this.setState({ day_count: parseInt(dayCount) });
      console.log(dayCount, "Day Count");
    }, 1000);
  };



  closeNoticeCard = () => {
    this.setState({
      successCard: false,
    });
  };

  dateDiffInDays(date1, date2) {
    var sum = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));

    var start = new Date(date1);
    var finish = new Date(date2);
    var dayMilliseconds = 1000 * 60 * 60 * 24;
    var sundays = 0;
    var saturdays = 0;
    while (start <= finish) {
      var day = start.getDay();
      if (day == 0) {
        sundays++;
      }
      if (day == 6) {
        saturdays++;
      }

      start = new Date(+start + dayMilliseconds);
    }
    var weekendDays = saturdays + sundays;
    return sum - weekendDays;
  }

  handleLeaveDateShow = () => {
    if (!this.state.leaveDateRange) {
      this.setState({ leaveDateRange: true });
    } else {
      this.setState({ leaveDateRange: false });
    }
  };

  ascertainLeaveDays = () => {
    

    if(this.state.personDTO?.staffTypeId == null){
      alert("The system is unable to ascertain your Staff type status as you do not have that updated. Contact the HR Admin to initiate update. Thank you.")
      return false;
    }
    fetchData(`/LeaveRequestManagement/LeaveDayCount?start=${this.state.startDate}&end=${this.state.endDate}&staffId=${this.state.personDTO?.staffTypeId}`, (data) => {
      // console.log(data, "Calcc")
      
          this.setState({daysCalc:data, daysSpin:false})
     
    })
  }

 
  render() {
    return (
      <>
        {this.state.successCard ? (
          <NotificationCard
            message="Leave Application has been submitted for due Action!"
            closeCard={this.closeNoticeCard}
            okBtn={true}
          />
        ) : null}

        {this.state.notClosedCard ? (
          <NotificationCard
            message="This Request Was Denied, as you had initially made a request, which  is still being processed and not fully acted upon by the required administrator(s). Kindly exercise some patience while the
              initial request awaits appropriate action. Thank you!"
            closeCard={() => {
              this.setState({ notClosedCard: false });
            }}
            okBtnDanger={true}
            systemNotice={true}
          />
        ) : null}

{this.state.appliedAndApprovedForTheYear ? (
          <NotificationCard
            message="Your request was denied, as you have used up the alloted days for the requested Leave Type in a calendar year."
            closeCard={() => {
              this.setState({ appliedAndApprovedForTheYear: false });
            }}
            okBtnDanger={true}
            systemNotice={true}
          />
        ) : null}

{this.state.durationDisparity ? (
          <NotificationCard
            message="Your request was denied, as the number of days for the requested Leave type exceeds the original alloted number of days. Kindly
            confirm and try again."
            closeCard={() => {
              this.setState({ durationDisparity: false });
            }}
            okBtnDanger={true}
            systemNotice={true}
          />
        ) : null}

        <Modal isOpen={this.state.requestDenied}>
          <ModalBody>
            <ModalHeader className="text-secondary">
              <h2 class="badge badge-danger">Important Notice!</h2>
              <br />
              <br />
            </ModalHeader>

            <h3 className="text-center">
              <b>
                {" "}
                Your request was denied, as you are not allowed to apply for an
                Annual Leave twice in a period of year. <br /> <br /> ANNUAL
                LEAVE only allows for subsequent requests if the period between
                your previous request and the present day reaches or exceeds a
                year
              </b>
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"danger"}
              onClick={() => {
                this.setState({ requestDenied: false });
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.noRequiredDetail}>
          <ModalBody>
            <ModalHeader className="text-secondary">
              <h2 class="badge badge-danger">Important Notice!</h2>
              <br />
              <br />
            </ModalHeader>

            <h3 className="text-center">
              <b className="sofia">
                {" "}
                Sorry! You are not allowed to make this request, as either of
                your Department, Phone Number, Assumption of Duty or Salary
                Category information has not been updated.
                <br /> <br />
                Kindly refer to the HR Administrator to have these details
                 updated to continue. Thank you!
              </b>
            </h3>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                this.setState({ noRequiredDetail: false });
              }}
            >
              Close
            </button>
          </ModalFooter>
        </Modal>

        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Leave Requests{" "}
                  <span className="h3 text-muted">/Leave Request Records</span>
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
                          My Leave Request History
                        </h3>
                      </div>
                      <div className="col">
                        <div>
                          <button
                            className="btn btn-primary btn-icon btn-sm float-right mr-3"
                            onClick={this.makeRequestHandler}
                          >
                            <span className="btn-inner--icon">
                              {/* <i className="fa fa-plus text-primary" /> */}
                            </span>
                            <span className="btn-inner--text">
                              Make a new Leave request
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped sofia">
                        <thead>
                          <tr>
                            <th>S/No</th>
                            <th>Leave Type</th>
                            <th>Date of Request</th>
                            <th>Status</th>
                            <th>Original Leave Duration(Days)</th>
                            <th>NO. of Days Applied for</th>
                            <th>Unused Leave Days</th>
                            <th>Proposed Start Date</th>
                            {/* <th>Remarks</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.staffLeaveRecord &&
                            this.state.staffLeaveRecord.map((i, a) => (
                              <tr>
                                <td>{a + 1}</td>
                                <td>{i.leaveName}</td>

                                <td>{i.dateEntered.substring(0, 10)}</td>
                                <td>
                                  {i.progressInPercentage >= 97 ? (
                                    <span class="badge badge-success">
                                      Approved
                                    </span>
                                  ) : 
                                  i.progress == _Declined ? (
                                    <span class="badge badge-danger">
                                      Declined
                                    </span> ):
                                  
                                  i.progressInPercentage > 0 ? (
                                    <div
                                      class="progress badge-warning"
                                      id="progressHold"
                                      style={{ height: "20px" }}
                                    >
                                      <div
                                        class="progress-bar bg-warning"
                                        id="pb"
                                        style={{
                                          width: i.progressInPercentage + "%",
                                          height: "15px",
                                          padding: "10px",
                                          color: "white",
                                        }}
                                      >
                                        Processing...
                                      </div>
                                    </div>
                                  ) : (
                                    <span class="badge badge-warning">
                                      Waiting to be Acted Upon
                                    </span>
                                  )}
                                  {/* <span class="badge badge-success">Approved</span> */}
                                </td>
                                <td>{i.originalLeaveDuration}</td>
                                <td>{i.appliedLeaveDuration}</td>
                                <td>{i.remainingLeaveDays}</td>
                                <td>{i.start.substring(0, 10)}</td>
                                {/* <td>Leave Request is viable</td> */}
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

          <div className="container-fluid mt--6">
            <div></div>

            <Modal isOpen={this.state.makeRequest}>
              <div className="modal-header border-bottom">
                <h2 className="mb-0" id="exampleModalScrollableTitle">
                  Leave Request Form
                </h2>
                {/* <button
                 
                    className="close"
                  >
                    <span
                    
                    >×</span>
                  </button> */}
                <button className="close" onClick={this.closeMakeRequest}>
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body sofia">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Leave Type
                      </label>
                      <select
                        className="form-control"
                        onChange={this.handleSelectedLeave}
                        required
                      >
                        <option>Select a Leave Type</option>
                        {this.state.uniqueLeaveType &&
                        this.state.uniqueLeaveType.length > 0
                          ? this.state.uniqueLeaveType.map((leave) => {
                              return (
                                <option key={leave.id} value={leave.id}>
                                  {leave.name}
                                </option>
                              );
                            })
                          : null}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <label
                      htmlFor="example-text-input"
                      className="row form-control-label sofia"
                      style={{ marginLeft: "3px" }}
                    >
                      Show Date{" "}
                      <small style={{ color: "red" }}>
                        {" "}
                        &nbsp;(Only toggle show if you wish to use part of the
                        privileged Leave days)
                      </small>{" "}
                      &nbsp;
                    </label>

                    <label className="custom-toggle">
                      <input
                        type="checkbox"
                        onChange={this.handleLeaveDateShow}
                      />
                      <span
                        className="custom-toggle-slider rounded-circle"
                        style={{ borderRadius: "34px !important" }}
                        data-label-off="Show"
                        data-label-on="Hide"
                      />
                    </label>
                  </div>

                  {/* <div className="row"> */}
                  <div className="col-md-6">
                    <Fade>
                      {this.state.leaveDateRange ? (
                        <AttentionSeeker effect={"shake"} duration={300}>
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Start Date
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              onChange={(e) => {
                                this.setState({ startDate: e.target.value });
                              }}
                            />
                          </div>
                        </AttentionSeeker>
                      ) : null}
                    </Fade>
                  </div>

                  <div className="col-md-6">
                    <Fade>
                      {this.state.leaveDateRange ? (
                        <AttentionSeeker effect={"shake"} duration={300}>
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              End Date
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              value={this.state.leaveRequest.endDate}
                              onChange={(e) => this.handleSelectEndDate(e)}
                              
                            />
                          </div>
                        </AttentionSeeker>
                      ) : null}
                    </Fade>
                  </div>

                  <div className="col-md-6">
                    <Fade>
                      {this.state.leaveDateRange ? (
                        <AttentionSeeker effect={"shake"} duration={300}>
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Proposed Leave Days :{" "}
                              <span
                                className="badge badge-success"
                                style={{ fontSize: "18px" }}
                              >
                                {/* {this.state.day_count} */}
                                
                                {this.state.daysSpin ? 
                               <MetroSpinner
                               size={20}
                               color={"#1aae6f"}
                               loading={this.state.loading}
                               
                               
                             /> 
                              : this.state.daysCalc
                              }
                              </span>
                            </label>
                          </div>
                        </AttentionSeeker>
                      ) : null}
                    </Fade>
                  </div>
                  {/* </div> */}

                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Reason/Comments
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => {
                          this.setState({ comment: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Attachments &nbsp; <p className="text-danger" style={{fontSize:"12px"}}>Supported File Format: Jpg, Jpeg, png</p>
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        onChange={(e) => this.handleFileUpload(e)}
                      />
                    </div>
                  </div>
                </div>
                <br/>
                <br/>
                <button
                  type="button"
                  onClick={(e) => this.addForm(e)}
                  data-dismiss="modal"
                  className="btn btn-outline-primary"
                >
                  Make Request <i className="fa fa-send" />
                </button>
                <br/>
                <br/>

                {this.state.loading ? <MetroSpinner
              size={40}
              color={"#123abd"}
              loading={this.state.loading}
              
              
            /> : null}
              </div>
            </Modal>

            <div
              className="modal fade edit-level-modal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header border-bottom">
                    <h2 className="mb-0" id="exampleModalScrollableTitle">
                      Edit Profile
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
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Leave Type
                          </label>
                          <select
                            className="form-control"
                            name="state"
                            onChange={(e) => {
                              this.updatePersonItem(
                                "leaveId",
                                parseInt(e.target.value)
                              );
                            }}
                            required
                          >
                            <option>Select a Leave Type</option>
                            {this.state.leaveTypes &&
                            this.state.leaveTypes.length > 0
                              ? this.state.leaveTypes.map((leave) => {
                                  return (
                                    <option
                                      key={leave.id}
                                      value={leave.leave.id}
                                    >
                                      {leave.leave.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Start Date
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            name="surname"
                            value={this.state.leaveRequest.startDate}
                            onChange={(e) => {
                              this.updatePersonItem(
                                "startDate",
                                e.target.value
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            End Date
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            name="firstname"
                            value={this.state.leaveRequest.endDate}
                            onChange={(e) => {
                              this.updatePersonItem("endDate", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Reason/Comments
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="firstname"
                            value={this.state.leaveRequest.reason}
                            onChange={(e) => {
                              this.updatePersonItem("reason", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Attachments
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="passport"
                            onChange={(e) => this.handleFileUpload(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => this.updateForm()}
                      data-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
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
                          Are you sure you want to delete this record? All items
                          related to it will be affected
                        </p>
                        <button className="btn btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick-={this.closeMakeRequest}
                    >
                      Close
                    </button>
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
