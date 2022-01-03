import React from "react";
// import { Link, navigateTo, navigate } from "gatsby"
import { fetchData, editData, postData, URL, postFormData } from "../../../utils/crud";
import {Wave_Three, codeGreen, statusDeclined, notClosed, StatusCodes} from "../../Barn"
import NotificationCard from "../../Reusables/NotificationCard";
import axios from "axios"
import {Link} from "react-router-dom";
import Spinner from "../admin/Spinner"
import Avatar from "../../../images/use.png"


import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Fade,
  Button,
} from "reactstrap";

export default class AdminStaffDocUpload extends React.Component {
  state = {
    personDTO: JSON.parse(localStorage.getItem("DTOFULL")),
    payLoad: JSON.parse(localStorage.getItem("userData")),
    payLoad2: JSON.parse(localStorage.getItem("userData")),
    newStaffInfo : this.props.location.state.staffInfo

  };

  makeRequestHandler = () => {
    console.log(this.state.newStaffInfo.personId, "new Person Id")


      this.setState({
        makeRequest: true,
        newPersonId:this.state.newStaffInfo.personId,
      });
    
  };


  getDocumentType = () => {
    fetchData(
      `/DocumentType`,
      (data) => {
        this.setState({ documentType: data });
      }
    );
  };

  componentDidMount() {
    console.log(this.state.newStaffInfo, "new!!!")

    fetchData(`/DocumentType/StaffUploadHistory?personId=${this.state.newStaffInfo?.personId}`, data =>{
        this.setState({
            docHistory: data
        })
         console.log(this.state.docHistory,"Histo")
    })
  
    // this.loadStaff()
    // this.loadLeaves()
    // this.loadRequests()
    this.getDocumentType();
    console.log(this.state.payLoad, "Id Check!")
  }

  submitDocument = () => {
    // e.preventDefault();
    this.setState({spin:true, makeRequest:false})
    let currentState = this;
   

    if(this.state.selectedDocumentType == null){
      alert("Select Leave Type")
      return false
    } 

    let formData = new FormData();
    formData.append("PersonId", this.state.newPersonId);
    formData.append("DocumentTypeId", this.state.selectedDocumentType);
    formData.append("Document", this.state.file);

    axios({
        method: "post",
        url: URL + "/DocumentType/StaffDocumentUploadByAdmin",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (response.data == StatusCodes.Created) {
            currentState.componentDidMount();
            currentState.setState({
              showSpin:false,
              successCard: true,
              spin:false
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

  updateForm = () => {
    postData(`/LeaveRequest`, this.state.leaveRequest, (data) => {
      if (data) {
        this.loadRequests();
      }
    });
  };

 


  closeMakeRequest = () => {
    this.setState({
      makeRequest: false,
    });
  };

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

  handleSelectedDocumentType = (e) => {
    this.setState({ selectedDocumentType: parseInt(e.target.value) });
  };

  closeNoticeCard = () => {
    this.setState({
      successCard:false,
      makeRequest:false
    })
  }

  imageModal = () => {
    var modal = document.getElementById("myModall");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

  modal.style.display = "block";
 


var span = document.getElementsByClassName("close")[0];


  }

  loadData = data => {
    this.setState({
      name: data.documentName,
      selectedImage: data.imageUrl
    })



    var modal = document.getElementById("myModall");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    
      modal.style.display = "block";
      // modalImg.src = this.src;
      // captionText.innerHTML = this.alt;
    
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  }

  loadStaff = data => {
        this.setState({
            selectedDocumentType: data.documentTypeId
        })
        this.makeRequestHandler();
        console.log(this.state.selectedDocumentType, "Doco!")
  }
  

  render() {
    return (
      <>
{this.state.spin ? <Spinner/> : null}
      {this.state.successCard ? <NotificationCard
        message="Document Uploaded Successfully!"
        closeCard={this.closeNoticeCard}
        okBtn={true}
        // addMoreBtn={true}
        // okBtnDanger={true}
      
      /> : null}


     

<Modal isOpen={this.state.requestDenied}>
          <ModalBody>
            <ModalHeader className="text-secondary">
              <h2 class="badge badge-danger">System Notice!</h2>
              <br />
              <br />
            </ModalHeader>

            <h3 className="text-center">
              <b>
                {" "}
                  Selected Document Type had already been uploaded by you. <br/>
                  Please contact the HR Administrator to update this Document accordingly.
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
                  Update Staff Documents{" "}
                  <span className="h3 text-muted">/Update & Upload Staff Credentials</span>
                </h6>
              </div>
              <div className="col-lg-6 col-5 text-right"></div>
            </div>


            <div class="card" style={{width:"300px"}}>
  <img class="card-img-top" src={Avatar} style={{height:"230px", background:"transparent"}} alt="Card image"/>
  <div class="card-body">
  {/* <div className="container"><img class="card-img-top" src={Avatar} style={{width:"80px", background:"transparent"}} alt="Card image"/></div>
  <br/> */}

    <p class="card-text">Name:<h4 class="card-title">{this.state.newStaffInfo?.person?.surname} {this.state.newStaffInfo?.person.firstname}</h4> </p>
    <p class="card-text">Department:<h4 class="card-title">{this.state.newStaffInfo?.department?.name}</h4> </p>
   
    {/* <p class="card-text">Department: <b style={{fontSize:"16px", fontWeight:"700"}}>{this.state.newStaffInfo?.department?.name}</b></p> */}
    {/* <button class="btn btn-primary" style={{cursor:"disabled"}}>{this.state.newStaffInfo?.generatedStaffNumber}</button> */}
    <p></p>
    <span class="badge badge-info badge-lg" style={{fontSize:"14px"}}>{this.state.newStaffInfo?.generatedStaffNumber}</span>
  </div>
</div>
          
            {/* <div className="col-md-6">
            
            <div className="card" style={{padding:"10px", borderLeft:"3px solid orange", fontFamily:"Trebuchet MS"}}>
            <div className="container">
            <div className="row align-items-center">
                      <div className="col">
            <h4 className="h4 text-muted">Staff Name: &nbsp; &nbsp; &nbsp; <span style={{fontSize:"20px"}}>{this.state.newStaffInfo?.person?.surname} {this.state.newStaffInfo?.person.firstname}</span></h4><br/>
                <h4 className="h4 text-muted">Staff Number: &nbsp; &nbsp;  <span style={{fontSize:"18px"}}>{this.state.newStaffInfo?.generatedStaffNumber}</span></h4><br/>
                <h4 className="h4 text-muted">Staff Deparment: &nbsp; &nbsp;  <span style={{fontSize:"18px"}}>{this.state.newStaffInfo?.department?.name}</span></h4><br/>
            </div>
            </div>
            </div>
            </div>
            </div> */}
            {/* Card stats */}
            <div className="row">
              <hr className="mx-0" />
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="card-title mb-0 float-left mr-3">
                          Uploaded Credentials
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
                              Add Documents
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
                            <th>Document Type</th>
                            <th>Date Submitted</th>
                            <th>Action</th>
                           
                            {/* <th>Remarks</th> */}
                            
                          </tr>
                        </thead>
                        <tbody>
                            {this.state.docHistory && this.state.docHistory.map((docx, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{docx.documentName}</td>
                                    <td>{docx.dateEntered.substring(0, 10)}</td>
                                    <td>
                                      
          {/* <img id="myImg" alt="Snow" onClick={() => this.loadData(docx)} style={{width:"100%", maxWidth:"300px"}}/> */}
         
                                  <a
                                  
                                  href={docx.imageUrl}
                                    className="btn btn-info btn-sm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </a>
                                  <a
                                  
                                
                                    className="btn btn-warning btn-sm"
                            onClick={() => this.loadStaff(docx)}

                                  >
                                    <i className="fa fa-edit" style={{color:"white", cursor:"pointer"}}></i>
                                  </a>
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




{/* <div id="myModal" class="modal">


  <span class="close">&times;</span>

  
  <img class="modal-content" id="img01"/>

  
  <div id="caption"></div>
</div> */}



<div id="myModall" class="modall">


<span class="close">&times;</span>

<div className="container">
<img class="modal-contentt" src={this.state.selectedImage} style={{width:"500px"}} id="img01"/>
{/* <p style={{position:"absolute"}}>hrtgeqhjklnqjlwhgwqjklrghjklhqwkjlgh3grl3jkghqkjhg</p> */}

</div>

<div id="caption"></div>
</div>




          <div className="container-fluid mt--6">
            <div></div>

            <Modal isOpen={this.state.makeRequest}>
              <div className="modal-content mdal2">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Add Documents
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
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Document Type
                        </label>
                        <select
                          className="form-control"
                          onChange={this.handleSelectedDocumentType}
                          required
                        >
                          <option>Select Document Type</option>
                          {this.state.documentType &&
                          this.state.documentType.length > 0
                            ? this.state.documentType.map((docType) => {
                                return (
                                  <option key={docType.id} value={docType.id} selected={docType.id == this.state.selectedDocumentType}>
                                    {docType.name}
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
                          Select Document &nbsp;
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
                     
                      <br/>
                      <br/>
                  <button
                    type="button"
                    onClick={() => this.submitDocument()}
                    data-dismiss="modal"
                    className="btn btn-success"
                  >
                    Save and upload
                  </button>
                </div>
              </div>
            </Modal>

          </div>
        </Fade>
      </>
    );
  }
}
