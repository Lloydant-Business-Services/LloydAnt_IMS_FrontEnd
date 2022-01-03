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
    if(this.state.selectedDept == null){
        alert("Select Destination Department")
        return false
      }
    this.setState({spin:true, makeRequest:false})
    let currentState = this;
   
    let deptLoad = {
        currentDepartment: this.state.personDTO?.department?.name,
        newDepartmentId: this.state.selectedDept,
        reasons: this.state.reason,
        staffId: this.state.payLoad?.staffId
    }

    postData("/DepartmentTransfer/MakeTransferRequest", deptLoad, data => {
        if(data == StatusCodes.Created){
            currentState.componentDidMount();
            currentState.setState({
              spin:false,
              successCard: true
            })
        }else if(data == StatusCodes.NotAcceptable){
            console.log(data);

              currentState.setState({
                  requestDenied:true,
                  spin:false
              })
          
        }
    })

   

  };



  getDepartments = () => {
    fetchData(
      `/institutionDepartments`,
      (data) => {
        this.setState({ departments: data });
      }
    );
  };



  componentDidMount() {

    this.getDepartments();
    this.staffDepartmentTransferRecord();
  }

  





  staffDepartmentTransferRecord = () => {
    fetchData(`/DepartmentTransfer/GetByStaff?staffId=${this.state.payLoad.staffId}`, data => {
      console.log(data, "History")
      this.setState({
        changeOfDeptRecords: data
      })
    })
  }

  closeMakeRequest = () => {
    // alert("fefiuhkjh")
    this.setState({
      makeRequest: false,
    });
  };
  makeRequestHandler = () => {
   
    this.setState({
      makeRequest: true,
    });
  
};


  handleSelectedDepartment = (e) => {
    this.setState({ selectedDept: parseInt(e.target.value) });
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
                  Sorry this request was denied as you have made an initial transfer request which is still being processed.<br/><br/> Kindly exercise some patience until your active request is attended to.<br/><br/> Thank you
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
                  Staff Department Transfer Request{" "}
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
                          My Transfer Requests
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
                              Apply for a change of Department
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
                          {this.state.changeOfDeptRecords && this.state.changeOfDeptRecords.map((i, a) => (

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
                          <td>{i.isApproved && i.isClosed ? null : <Link to={{pathname:"DepartmentTransferLetter", state:{data:i}}}><button className="btn btn-warning btn-sm">View Request</button></Link>}</td>
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
                    Staff Department Transfer Application Form
                   
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
                  <small style={{color:"crimson"}}>Carefully fill in required information</small>

                  <div className="row">
                  

                   

                  <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Destination Department
                        </label>
                        <select
                          className="form-control"
                          onChange={this.handleSelectedDepartment}
                          required
                        >
                          <option>Select Department</option>
                          {this.state.departments &&
                          this.state.departments.length > 0
                            ? this.state.departments.map((dept) => {
                                return (
                                  <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                  </option>
                                );
                              })
                            : null}
                        </select>
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
                          onChange={(e) => {
                            this.setState({ reason: e.target.value });
                          }}
                        />
                      </div>
                    </div>

                   
                  </div>
                 

                 
                  <button
                    type="button"
                    onClick={() => this.submitDocument()}
                    data-dismiss="modal"
                    className="btn btn-success"
                  >
                    Make Transfer Request
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
