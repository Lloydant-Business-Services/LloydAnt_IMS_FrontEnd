import React from "react";
// import { Link, navigateTo, navigate } from "gatsby"
import { fetchData, editData, postData, URL, postFormData } from "../../../utils/crud";
import {Wave_Three, codeGreen, statusDeclined, notClosed, StatusCodes} from "../../Barn"
import axios from "axios"

import NotificationCard from "../../Reusables/NotificationCard";
import {Link} from "react-router-dom";
import Spinner from "../admin/Spinner"
import { Image, Upload, Modal, Collapse } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  // Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Fade,
  Button,
} from "reactstrap";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const { Panel } = Collapse;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class UploadDocuments extends React.Component {
  state = {
    personDTO: JSON.parse(localStorage.getItem("DTOFULL")),
    payLoad: JSON.parse(localStorage.getItem("userData")),
    payLoad2: JSON.parse(localStorage.getItem("userData")),   
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://data2.unhcr.org/images/documents/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg',
      },
     
      
    
    ], 
  };

  makeRequestHandler = () => {
    
      this.setState({
        makeRequest: true,
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
  fetchData(`/DocumentType/StaffUploadHistory?personId=${this.state.payLoad.personId}`, data =>{
      this.setState({
          docHistory:data
      })
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
    formData.append("PersonId", this.state.payLoad.personId);
    formData.append("DocumentTypeId", this.state.selectedDocumentType);
    formData.append("Document", this.state.file);

    axios({
        method: "post",
        url: URL + "/DocumentType/StaffDocumentUpload",
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

    // postFormData(
    //   `/DocumentType/StaffDocumentUpload`, formData, data => {
    //       console.log(data, "Response")
    //       if(data == StatusCodes.Created){
    //           alert("Success")
    //       }else if(data == StatusCodes.NotAuthorized){
    //           alert("Already Uploaded");
    //       }else{
    //           alert("Error submitting");
    //       }
    //   }
      
    // );
  };

  updateForm = () => {
    postData(`/LeaveRequest`, this.state.leaveRequest, (data) => {
      if (data) {
        this.loadRequests();
      }
    });
  };

 


  closeMakeRequest = () => {
    // alert("fefiuhkjh")
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
  
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  render() {
    require("antd/dist/antd.css")

    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <div className="content__inner">
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
              <div className="col-lg-6 col-md-12">
                <h6 className="h1 d-inline-block mb-0 pop-font mobile__font__header">
                  Upload Documents{" "}
                  {/* <br/> */}
                  <span className="h3 mobile__font__size sofia">/Propietor Document Upload</span>
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
                      {/* <div className="col">
                        <h3 className="card-title mb-0 float-left mr-3">
                          My Uploaded Credentials
                        </h3>
                      </div> */}
                      {/* <div className="col">
                        <div>
                          <button
                            className="btn btn-primary btn-icon btn-sm float-right mr-3"
                            onClick={this.makeRequestHandler}
                          >
                            <span className="btn-inner--icon">
                            </span>
                            <span className="btn-inner--text">
                              Add Documents
                            </span>
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="row">

                    <div className="container-fluid">
                    <Collapse accordion ghost defaultActiveKey={"1"} style={{maxHeight:'400px'}}>
    <Panel header="Select Document Propietor" key="1">
    <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
    <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
    <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
    <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
    <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
    <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
    <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
    <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
    <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
    </Panel>
   
  </Collapse>
  <br/>
                      {/* <div>
                        <p style={{fontSize:'14px'}}><input type="radio"/> &nbsp; &nbsp; Federal Polytechnic, Ilaro</p>
                      </div> */}
                    <div className="col-md-12">
                    <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
                    </div>

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
                                  <option key={docType.id} value={docType.id}>
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
            </Modal>

          </div>
        </Fade>
      </div>
    );
  }
}
