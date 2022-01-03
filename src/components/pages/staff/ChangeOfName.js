import React from "react";
import { Link } from "react-router-dom"
import { fetchData, editData, postData, URL } from "../../../utils/crud";
import {Wave_Three, codeGreen, statusDeclined, notClosed} from "../../Barn"
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner"
import {StatusCodes} from "../../Barn"
import axios from "axios"


import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Fade,
  Button,
} from "reactstrap";

export default class ChangeOfName extends React.Component {
  state = {
    personDTO: JSON.parse(localStorage.getItem("DTOFULL")),
    payLoad: JSON.parse(localStorage.getItem("userData")),
    payLoad2: JSON.parse(localStorage.getItem("userData")),


   
  };

  updatePersonItem = (index, value) => {
    const { leaveRequest } = this.state;
    leaveRequest[index] = value;
    this.setState({ ...this.state, leaveRequest });
  };

  submitDocument = () => {
    // e.preventDefault();
    this.setState({spin:true, makeRequest:false})
    let currentState = this;
   


    let formData = new FormData();
    formData.append("StaffId", this.state.payLoad.staffId);
    formData.append("Surname", this.state.surname);
    formData.append("Firstname", this.state.firstname);
    formData.append("Othername", this.state.othername);
    formData.append("Comments", this.state.comments);
    formData.append("Attachment", this.state.file);

    axios({
        method: "post",
        url: URL + "/ChangeOfName/MakeRequest",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (response.data == StatusCodes.Created) {
            currentState.componentDidMount();
            currentState.setState({
              spin:false,
              successCard: true
            })
            console.log(response);
            console.log(formData);
          }else if(response.data == StatusCodes.NotAuthorized){
            console.log(response);

              currentState.setState({
                  requestDenied:true,
                  spin:false
              })
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          console.log(formData);
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
      `/LeaveType/LeaveTypeRankByRank?RankId=${this.state.personDTO.rankId}`,
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
  }

  addForm = (e) => {
    e.preventDefault();

    let newLeaveRequest = {
      comment: this.state.comment,
      supportDocument: "null",
      staffId: this.state.personDTO.id,
      start: this.state.startDate,
      end: this.state.endDate,
      leaveTypeRankId: this.state.selectedLeave

      
    };

    if(this.state.selectedLeave == null){
      alert("Select Leave Type")
      return false
    }

    postData(
      `/LeaveRequestManagement/MakeLeaveRequests`,
      newLeaveRequest,
      (data) => {
        console.log(data)
        if (data == codeGreen) {
          this.setState({successCard:true})
          this.componentDidMount();
        }else if(data == statusDeclined){
          this.setState({requestDenied:true})

        }else if(data == notClosed){
          this.setState({notClosedCard:true})

        }
          else{
                alert("Error")
              }
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
   
      this.setState({
        makeRequest: true,
      });
    
  };

  staffLeaveRequestHistory = () => {
    fetchData(`/ChangeOfName/StaffRequestList?staffId=${this.state.payLoad.staffId}`, data => {
      console.log(data, "History")
      this.setState({
        changeOfNameRecords: data
      })
    })
  }

  closeMakeRequest = () => {
    // alert("fefiuhkjh")
    this.setState({
      makeRequest: false,
    });
  };
//   handleFileUpload = (e) => {
//     e.preventDefault();
//     let reader = new FileReader();
//     let file = e.target.files[0];
//     const { leaveRequest } = this.state;

//     reader.onloadend = () => {
//       leaveRequest.attachmentUrl = reader.result;
//       this.setState({
//         ...this.state,
//         file: file,
//         leaveRequest,
//       });
//     };
//     reader.readAsDataURL(file);
//   };




  handleFileUpload = (e) => {
    e.preventDefault();
    let pHold = document.getElementById("progressHold");
    let docPrev = document.getElementById("docPreview")
    pHold.style.display = "block";
    let pBar = document.getElementById("pb");
    pBar.style.width = "0%";

    pBar.innerHTML = "Uploading.....";

    setTimeout(() => {
      pBar.style.width = "100%";
      docPrev.style.display = "block";
      pBar.innerHTML = "Attached Successfully !";
    }, 2000);

    // setTimeout(()=>{
    //   pHold.style.display = "none"
    //   pBar.style.width = "0%";

    // },6000)

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.state.documentPreview = reader.result;
      this.setState({
        ...this.state,
        file: file,
        documentUploaded: reader.result,
     
      });
    };
    setTimeout(() => {
      console.log(this.state.file, "File");
      reader.readAsDataURL(file);
    }, 2000);
  };

  handleSelectedLeave = (e) => {
    this.setState({ selectedLeave: parseInt(e.target.value) });
  };

  closeNoticeCard = () => {
    this.setState({
      successCard:false
    })
  }

  render() {
    return (
      <>
{this.state.spin ? <Spinner/> : null}

      {this.state.successCard ? <NotificationCard
        message="Your Request was submitted successfully"
        closeCard={this.closeNoticeCard}
        okBtn={true}
      
      /> : null}


      {this.state.notClosedCard ? <NotificationCard
      
              message="This Request Was Denied, as you had initially made a request with the same Leave Type, which  is still being processed and yet to be closed. Kindly exercise some patience while your
              previous request awaits appropriate action. Thank you!"
              closeCard={()=>{this.setState({notClosedCard:false})}}
              okBtnDanger={true}
              systemNotice={true}
            
            /> : null}

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
                  Sorry this request was denied as you have made an initial CHANGE OF NAME request which is still being processed by the appropriate authorities.<br/><br/> Kindly exercise some patience until the initial request is attended to.<br/><br/> Thank you
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
      

        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Change Of Name Request{" "}
                  <span className="h3 text-muted"></span>
                </h6>
              </div>
              <div className="col-lg-6 col-5 text-right"></div>
            </div>
            {/* Card stats */}
            <div className="row">
              <hr className="mx-0" />
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="card-title mb-0 float-left mr-3">
                          My Change Of Name Requests
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
                              Apply for a change of name
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>S/No</th>
                            <th>Date of Request</th>
                            <th>Status</th>
                            <th>Action</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.changeOfNameRecords && this.state.changeOfNameRecords.map((i, a) => (

                                      <tr>
                                      <td>{a + 1}</td>
                                      {/* <td>{i.leaveName}</td> */}
                                
                                      <td>{i.dateOfRequest.substring(0, 10)}</td>
                                      <td>

                                      {i.isApproved && i.isClosed ? <span class="badge badge-success">Approved</span> : 
                                      !i.isApproved  && !i.isClosed ? <span class="badge badge-warning">Processing</span> :
                                      !i.isApproved  && i.isClosed ? <span class="badge badge-danger">Declined</span> 
                                      
                                      : null}
                                        
                                      </td>
                          <td>{i.isApproved && i.isClosed ? null : <Link to={{pathname:"ViewChangeOfName", state:{data:i}}}><button className="btn btn-warning btn-sm">View Request</button></Link>}</td>
                                      {/* <td>Leave Request is viable</td> */}
                                    
                                      </tr>
                          ))
                          }

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
              {/* <div className="modal-content mdal2"> */}
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Change of Name Application Form
                   
                  </h2>
                  {/* <button
                 
                    className="close"
                  >
                    <span
                    
                    >×</span>
                  </button> */}
                  <button className="close" onClick={this.closeMakeRequest}>
                    <span>×</span><br/>

                  </button>
                </div>
                <div className="modal-body">
                  <small style={{color:"crimson"}}> Kindly fill in with the new information you want effected</small>

                  <div className="row">
                  

                   


                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Surname
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            this.setState({ surname: e.target.value });
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
                          First Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            this.setState({ firstname: e.target.value });
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
                          Othername
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            this.setState({ othername: e.target.value });
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
                          Comments
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            this.setState({ comments: e.target.value });
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
                          Document &nbsp;
                          <small style={{color:"crimson"}}>(Supported File Formats: JPEG, JPG)</small>
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => this.handleFileUpload(e)}
                        />
                      </div>
                    </div>
                  </div>
                   <div
                            class="progress"
                            id="progressHold"
                            style={{ height: "15px", display: "none" }}
                          >
                            <div
                              class="progress-bar bg-success"
                              id="pb"
                              style={{ width: "0%", height: "15px" }}
                            ></div>
                          </div>

                  <div className="col-md-12">
                        <div className="media align-items-center">
                          <span className="jumbotron" id="docPreview" style={{display:"none"}}>
                            <img src={this.state.documentUploaded} />
                          </span>
                        </div>
                      </div>
                  <button
                    type="button"
                    onClick={() => this.submitDocument()}
                    data-dismiss="modal"
                    className="btn btn-success"
                  >
                    Make Request
                  </button>
                {/* </div> */}
              </div>
            </Modal>

         
          
          </div>
        </Fade>
      </>
    );
  }
}
