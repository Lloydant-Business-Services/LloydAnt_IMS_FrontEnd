import React from "react";
import { Link } from "react-router-dom";
import { fetchData, editData, URL, postData } from "../../../utils/crud";
import logo from "../../../images/ziklogosm.png";
import Loadable from "react-loadable";
import Layout from "../../layout";
import Spinner from "../../pages/admin/Spinner";
import {Fade,Modal, ModalBody, ModalFooter } from "reactstrap";
import loading_gif from "../../../images/loading.gif";
import axios from "axios";
import signature_anim from "../../../images/signature_anim.gif";
import $ from "jquery";

import signaDemo from "../../../images/signa.png";
// import {initGreyScale} from "../../Reusables/GreyScale"

// import { AttentionSeeker } from "react-awesome-reveal";
// import {Animated} from "react-animated-css";
//import Animate from "animate.css-react";
//import "animate.css/animate.css";
import html2canvas from "html2canvas";
import QueueAnim from 'rc-queue-anim';
import jsPDF from "jspdf";

import { Upload, message, Row, Col, Form, Select, Collapse, Drawer, Alert, Space, Button, Input } from "antd";
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

let fileHold = "";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    console.log(file, "file before");
    fileHold = file;

    setTimeout(() => {
        console.log(fileHold, "exttrrrr before");
    }, 1500);

    return isJpgOrPng && isLt2M;
}
export default class Biodata extends React.Component {
    state = {
        saveStaffProfile: false,
        sigInfoBtn:true,

        payLoad: JSON.parse(localStorage.getItem("userData")),
        payLoad2: JSON.parse(localStorage.getItem("userData")),

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
        appointments: [],
        units: [],
        departments: [],
        ranks: [],
        states: [],
        lgas: [],
        maritalStatus: [],
        genders: [],
        staffTypes: [],
        staffCategories: [],
        passport: null,
        showCV: false,
        // signatureUrlPreview:""
    };
    hidePreview = () => {
        this.setState({ showCV: false });
    };
    showPreview = () => {
        this.setState({
            showCV: true,
        });
        console.log("clicked");
        fetchData("/ApplicationForms/GetApplicantCV?personId=2", (data) => {
            this.setState({ appInfo: data });
            console.log(this.state.appInfo, "myPersonalInfo");
        });
    };
    downloadCV = () => {
        const filename = "CV.pdf";
        if (typeof window !== "undefined") {
            html2canvas(document.querySelector("#curri")).then((canvas) => {
                let pdf = new jsPDF("p", "mm", "a4");
                pdf.addImage(canvas.toDataURL("image/png"), "PNG", -10, 0, 210, 190);
                pdf.save(filename);
            });
        }
    };
    handleChange = (info) => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(
                info.file.originFileObj,
                (imageUrl) =>
                    this.setState({
                        imageUrl,
                        loading: false,
                    }),
                setTimeout(() => {
                    console.log(this.state.imageUrl, "Img");
                }, 1500)
            );
        }
    };
    updatePersonItem = (index, value) => {
        const { staff } = this.state;
        staff.person[index] = value;
        this.setState({ ...this.state, staff });
    };

    updateStaffItem = (index, value) => {
        const { staff } = this.state;
        staff[index] = value;
        this.setState({ ...this.state, staff });
    };

    loadStaff = () => {
        const id = this.state.payLoad.staffId;
        this.setState({ spin: true });

        fetchData(`/Staff/${this.state.payLoad.staffId}`, (data) => {
            this.setState({ staff: data });
            console.log(this.state.staff, "Staff Data");

            const { staff } = this.state;
            // staff.staffNumber = data.staffNumber;
            // staff.person.surname = data.person.surname;
            // staff.person.firstname = data.person.firstname;
            // staff.person.othername = data.person.othername;
            // staff.person.birthDay = data.person.birthDay.substring(0, 10);
            // staff.person.email = data.person.email;
            // staff.person.address = data.person.address;
            // staff.person.phoneNumber = data.person.phoneNumber;
            // staff.person.stateId = data.person.stateId;
            // staff.person.lgaId = data.person.lgaId;
            // staff.person.maritalStatusId = data.person.maritalStatusId;
            // staff.person.religionId = data.person.religionId;
            // staff.person.genderId = data.person.genderId;
            // staff.person.id = data.person.id;
            // staff.rankId = data.rankId;
            // staff.departmentId = data.departmentId;
            // staff.appointmentId = data.appointmentId;
            // staff.unitId = data.unitId;
            // staff.staffTypeId = data.staffTypeId;
            // staff.categoryId = data.categoryId;
            // staff.biometricId = data.biometricId;
            // staff.id = data.id;
            if (data.person.imageUrl == "") {
                staff.person.imageUrl = null;
                this.setState({ imageUrl: null });
            } else {
                staff.person.imageUrl = data.person.imageUrl;
                this.setState({ imageUrl: data?.person?.imageUrl });
            }
            //this.setState({ ...this.state, staff });
            console.log("StaffffF", this.state.staff);
            this.setState({ spin: false });
        });
    };

    loadStates = () => {
        fetchData("/States", (data) => {
            this.setState({ states: data });
        });
    };

    loadLgas = () => {
        fetchData("/Lgas", (data) => {
            this.setState({ lgas: data });
        });
    };

    loadMaritalStatus = () => {
        fetchData("/MaritalStatus", (data) => {
            this.setState({ maritalStatus: data });
        });
    };

    loadGender = () => {
        fetchData("/Genders", (data) => {
            this.setState({ genders: data });
        });
    };

    loadRank = () => {
        fetchData("/InstitutionRanks", (data) => {
            this.setState({ ranks: data });
        });
    };

    loadDepartment = () => {
        fetchData("/InstitutionDepartments", (data) => {
            this.setState({ departments: data });
        });
    };

    loadAppointment = () => {
        fetchData("/InstitutionAppointments", (data) => {
            this.setState({ appointments: data });
        });
    };

    loadUnit = () => {
        fetchData("/InstitutionUnits", (data) => {
            this.setState({ units: data });
        });
    };

    loadStaffType = () => {
        fetchData("/InstitutionStaffTypes", (data) => {
            this.setState({ staffTypes: data });
        });
    };

    loadStaffCategory = () => {
        fetchData("/InstitutionStaffCategories", (data) => {
            this.setState({ staffCategories: data });
        });
    };

    imgman = () => {
     

    }

    postProfileUpdate = () => {
        let currentState = this;
        this.setState({
            showSpin: true,
            saveStaffProfile: false,
        });
        var formData = new FormData();
        // formData.append(
        //   "Passport",
        //   this.state.file || this.state.staff.person.imageUrl
        // );
        formData.append("ContactAddress", this.state.address || this.state.staff.person.address);
        formData.append("Phone", this.state.phoneNumber || this.state.staff.person.phoneNumber);
        formData.append("EmailAddress", this.state.email || this.state.staff.person.email);
        formData.append("PFANameId", this.state.pfaNameId || 0);
        formData.append("PFAStatusId", this.state.pfaStatusId || 0);
        formData.append("AreaOfSpecializationId", this.state.areaOfSpecializationId || 0);
        formData.append("RSANumber", this.state.rsaNumber || "-");
        formData.append("BiometricNo", this.state.biometricId || "NULL");
        formData.append("StaffId", this.state.payLoad.staffId);

        axios({
            method: "post",
            url: URL + "/Staff/StaffProfileUpdate",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                if (response.status == 200) {
                    currentState.setState({
                        showSpin: false,
                        updateSuccess: true,
                    });
                    console.log(response);
                    console.log(formData);
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                console.log(formData);
            });
    };
    changeText = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    };
    loadAdditionalInfo = () => {
        fetchData(`/StaffAdditionalInfo/GetStaffAdditionalInfoByStaffId?id=${this.state.payLoad?.staffId}`, (data) => {
            //console.log(data, "Staff Add Info");

            this.setState({
                additionalInfo: data,
                pfaNameId: data.pfaNameId,
                pfaStatusId: data.pfaStatusId,
                areaOfSpecializationId: data.areaOfSpecializationId,
                rsaNumber: data.rsaNumber,
                signatureUrl: data.signatureUrl
            });
            //initGreyScale();
        });
    };
    saveSalaryDetails = () => {
        var getBtn = document.getElementById("sub-btn");
        getBtn.setAttribute("disabled", true);
        this.setState({ savingStatus: true });
        let salaryPayload = {
            staffId: this.state.payLoad?.staffId,
            salaryCategoryId: this.state.selectedSalaryCategory,
            salaryLevelId: this.state.selectedSalaryLevel,
            salaryStepId: this.state.selectedSalaryStep,
        };
        postData(`/StaffSalaryCategoryReference?staffId=${this.state.payLoad?.staffId}`, salaryPayload, (data) => {
            console.log(data, "response");
            if (data == 200) {
                this.componentDidMount();
                this.setState({ savingStatus: false, salaryCard: false });

                alert("Saved");
            } else {
                alert("oops! Not saved");
            }
        });
    };
    componentDidMount() {
        if (!localStorage.getItem("userData")) {
            this.setState({
                userRedirect: true,
            });
        }
        this.getSalaryCategory();
        this.getSalaryLevel();
        this.getSalaryStep();
        
        fetchData("/Pfa/GetPFA", (data) => {
            console.log(data, "PfaNames");
            this.setState({ pfaName: data });
        });

        fetchData("/Pfa/GetPFAStatus", (data) => {
            console.log(data, "PfaStatus");
            this.setState({ pfaStatus: data });
        });

        fetchData("/Pfa/GetAreaOfSpecialization", (data) => {
            console.log(data, "AOS");
            this.setState({ aos: data });
        });

        fetchData(`/StaffSalaryCategoryReference/ByStaffId?staffId=${this.state.payLoad?.staffId}`, (data) => {
            this.setState({
                staffSalary: data,
            });
        });
        this.loadStaff();
        this.loadStaffCategory();
        this.loadStaffType();
        this.loadUnit();
        this.loadAppointment();
        this.loadDepartment();
        this.loadRank();
        this.loadGender();
        this.loadLgas();
        this.loadStates();
        this.loadMaritalStatus();
        this.loadAdditionalInfo();
        this.getEducation();
        // setTimeout(() =>{
        //   initGreyScale();
        // }, 2000)
        console.log(this.state.payLoad, "payload!!");
        console.log(this.state.payLoad?.staffId, "Staff IDDDD");
    }

    isValidInputs = () => {
        var phoneno = /^\d{11}$/;
        if (!this.state.staff.person.phoneNumber.match(phoneno)) {
            alert("Enter a valid Phone Number");
            return false;
        }

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.staff.person.email.match(mailformat)) {
            alert("Enter a valid Phone Number");
            return false;
        }

        return true;
    };

    updateForm = () => {
        if (this.isValidInputs()) {
            editData(`/Staff/${this.state.staff.id}`, this.state.staff, (data) => {
                if (data) {
                    alert("Saved!");
                }
            });
        }
    };

    handleFileUpload = (e) => {
        e.preventDefault();
        let pHold = document.getElementById("progressHold");
        pHold.style.display = "block";
        let pBar = document.getElementById("pb");
        pBar.style.width = "0%";

        pBar.innerHTML = "Uploading.....";

        setTimeout(() => {
            pBar.style.width = "100%";
            pBar.innerHTML = "Attached Successfully !";
        }, 2000);

        let reader = new FileReader();
        let file = e.target.files[0];
        const { staff } = this.state;

        reader.onloadend = () => {
            staff.person.imageUrl = reader.result;
            this.setState({
                ...this.state,
                file: file,
                passport: reader.result,
                staff,
            });
        };
        setTimeout(() => {
            console.log(this.state.file, "File");
            reader.readAsDataURL(file);
        }, 2000);
    };

    myToggle = () => {
        if (!this.state.saveStaffProfile) {
            this.setState({
                saveStaffProfile: true,
            });
        } else {
            this.setState({
                saveStaffProfile: false,
            });
        }
    };

    closeUpdatedModal = () => {
        this.setState({
            updateSuccess: false,
        });
    };
    dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 2000);
    };

    handleChange = (info) => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(
                info.file.originFileObj,
                (imageUrl) =>
                    this.setState({
                        imageUrl,
                        loading: false,
                    }),
                setTimeout(() => {
                    console.log(this.state.imageUrl, "Img");
                }, 1500)
            );
        }
    };
    getSalaryCategory = () => {
        fetchData(`/SalaryGradeCategory`, (data) => {
            this.setState({ salaryCategoryLoad: data });
            console.log(this.state.salaryCategoryLoad, "Cat Load");
        });
    };

    getSalaryLevel = () => {
        fetchData(`/SalaryLevel`, (data) => {
            this.setState({ salaryLevelLoad: data });
        });
    };

    getSalaryStep = () => {
        fetchData(`/SalaryStep`, (data) => {
            this.setState({ salaryStepLoad: data });
        });
    };
    onChangePassport = (info) => {
        let currentState = this;
        console.log(info, "infooo");
        console.log(this.state.extractImage, "extract");
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            getBase64(
                info.file.originFileObj,
                (imageUrl) =>
                    this.setState({
                        imageUrl,
                        loading: false,
                        staffImageUrl: info.fileList[0],
                    }),
                setTimeout(() => {
                    console.log(this.state.imageUrl, "Img");
                    console.log(this.state.staffImageUrl, "StaffImage");
                }, 1500)
            );
            var formData = new FormData();
          
            formData.append("file", fileHold);
            setTimeout(() => {
                console.log(fileHold, "extract");
                axios({
                    method: "post",
                    url: URL + `/Staff/UploadStaffPassport?staffId=${this.state.payLoad?.staffId}`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (response) {
                        console.log(response, "Success");
                    })
                    .catch(function (response) {
                        console.log(response);
                        console.log(formData);
                    });
            }, 1500);
         
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    onChangeSignature = (info) => {
      let currentState = this;
      console.log(info, "infooo");
      console.log(this.state.extractImage, "extract");
      if (info.file.status === "uploading") {
          this.setState({ loading: true });
          return;
      }
      if (info.file.status === "done") {
          getBase64(
              info.file.originFileObj,
              (signatureUrlPreview) =>
                  this.setState({
                      signatureUrlPreview,
                      loading: false,
                      //signatureUrl: info.fileList[0],
                  }),
              setTimeout(() => {
                  console.log(this.state.imageUrl, "Img");
                  console.log(this.state.staffImageUrl, "StaffImage");
              }, 1500)
          );
          // var formData = new FormData();
        
          // formData.append("file", fileHold);
          // setTimeout(() => {
          //     console.log(fileHold, "extract");
          //     axios({
          //         method: "post",
          //         url: URL + `/Staff/UploadStaffPassport?staffId=${this.state.payLoad?.staffId}`,
          //         data: formData,
          //         headers: { "Content-Type": "multipart/form-data" },
          //     })
          //         .then(function (response) {
          //             console.log(response, "Success");
          //         })
          //         .catch(function (response) {
          //             console.log(response);
          //             console.log(formData);
          //         });
          // }, 1500);
       
      } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
      }
  };
    showDrawer = () => {
        this.setState({
            drawEdit: true,
        });
    };
    getEducation = () => {
        fetchData(`/PersonEducation/GetPersonEducationByPersonId?personId=${this.state.payLoad?.personId}`, (data) => {
            this.setState({
                personEducations: data,
            });
        });
    };
    onClose = () => {
        this.setState({
            drawEdit: false,
            showSignatureDrawer:false

        });
    };
    saveSignature = () => {
      let currentState = this;
      if(this.state.signaturePin == null || this.state.signaturePin.length != 4){
        message.open({
          type:'error',
          content:"Failed! Please enter a four digit pin.",
          duration:5
        });
        return false;
      }
      if(this.state.signaturePin != this.state.confirmSignaturePin){
        message.open({
          type:'error',
          content:"Failed! Pin and confirm pin are not a match. Please try again.",
          duration:5
        });
        return false;
      }
      currentState.setState({saving:true, signatureInfo:false})
     var formData = new FormData();
        
          formData.append("file", fileHold);
          setTimeout(() => {
              console.log(fileHold, "extract");
              axios({
                  method: "post",
                  url: URL + `/StaffAdditionalInfo/UploadStaffSignature?staffId=${this.state.payLoad?.staffId}&pin=${this.state.signaturePin}`,
                  data: formData,
                  headers: { "Content-Type": "multipart/form-data" },
              })
                  .then(function (response) {
                    currentState.loadAdditionalInfo();
                      console.log(response, "Success");
                      message.open({
                        type:'success',
                        content:"Success! Signature and pin saved!",
                        duration:5
                      });
                      currentState.setState({saving:false, showSignatureDrawer:false})
                  })
                  .catch(function (response) {
                    currentState.setState({saving:false})

                      console.log(response);
                      console.log(formData);
                  });
          }, 1500);
    }
    onChange = (e) => {
        this.setState({
            placement: e.target.value,
        });
    };
signatureDrawer = () => {
  this.setState({
    showSignatureDrawer:true
  })
}
    toggleSignatureInfo = () => {
      if(!this.state.signatureInfo){
        this.setState({
          signatureInfo:true,
          sigInfoBtn:false
        })
      }
      else{
        this.setState({
          signatureInfo:false,
          sigInfoBtn:true
        })
      }
    }
    render() {
        let screen_width = $(window).width();
        require("antd/dist/antd.css");
        let newData = this.state.staff;
        const { loading, imageUrl, signatureUrl, signatureUrlPreview } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>
                    Upload <br />
                    Passport
                </div>
            </div>
        );

        const uploadSignatureBtn = (
          <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>
                  Upload <br />
                  Signature
              </div>
          </div>
      );
        return (
            <>
                <Modal isOpen={this.state.salaryCard}>
                    <ModalBody>
                        <div className="modal-header border-bottom">
                            <h4 className="mb-0" id="exampleModalScrollableTitle">
                                Staff Salary Category
                            </h4>
                            <button
                                type="button"
                                className="close"
                                onClick={() => {
                                    this.setState({ salaryCard: false });
                                }}
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Salary Category
                                        </label>

                                        <select
                                            className="form-control col-12"
                                            onChange={(e) => {
                                                this.setState({ selectedSalaryCategory: parseInt(e.target.value) });
                                            }}
                                        >
                                            <option>Select Salary Category</option>

                                            {this.state.salaryCategoryLoad &&
                                                this.state.salaryCategoryLoad.map((type, i) => (
                                                    <option value={type.id} selected={type.id == this.state.selectedSalaryCategory}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Salary Level
                                        </label>

                                        <select
                                            className="form-control col-12"
                                            onChange={(e) => {
                                                this.setState({ selectedSalaryLevel: parseInt(e.target.value) });
                                            }}
                                        >
                                            <option>Select Salary Level</option>

                                            {this.state.salaryLevelLoad &&
                                                this.state.salaryLevelLoad.map((type, i) => (
                                                    <option value={type.id} selected={type.id == this.state.selectedSalaryLevel}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Salary Step
                                        </label>

                                        <select
                                            className="form-control col-12"
                                            onChange={(e) => {
                                                this.setState({ selectedSalaryStep: parseInt(e.target.value) });
                                            }}
                                        >
                                            <option>Select Salary Step</option>

                                            {this.state.salaryStepLoad &&
                                                this.state.salaryStepLoad.map((type, i) => (
                                                    <option value={type.id} selected={type.id == this.state.selectedSalaryStep}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <button className="btn btn-primary" onClick={() => this.saveSalaryDetails()} data-dismiss="modal" id="sub-btn">
                                        {this.state.savingStatus ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                {this.state.spin ? <Spinner msg={"Please wait..."} /> : null}
                {this.state.showSpin ? <Spinner msg={"Saving..."} /> : null}
                <Modal isOpen={this.state.saveStaffProfile}>
                    <ModalBody>
                        <b>Are you sure about this action?</b>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-info" onClick={() => this.postProfileUpdate()}>
                            Confirm &nbsp; <i className="fa fa-check" />
                        </button>
                        <button className="btn btn-danger" onClick={this.myToggle}>
                            Cancel &nbsp; <i className="fa fa-arrow-left" />
                        </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.updateSuccess}>
                    <ModalBody>
                        <b>Your Profile Was Updated Successfully!</b>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={this.closeUpdatedModal}>
                            OK
                        </button>
                    </ModalFooter>
                </Modal>
                <Fade>
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <h6 className="h1 d-inline-block mb-0 pop-font">
                                    Dashboard <span className="h3 text-muted">/Staff Biodata</span>
                                </h6>
                                <span className="text-sm d-block">Update Biodata.</span>
                            </div>
                            <div className="col-lg-6 col-5 text-right"></div>
                        </div>

                        {/* Card stats */}
                        <div className="row justify-content-md-center">
                            {/* <hr className="mx-0" /> */}
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row align-items-center">
                                    <h1>Bio-Data</h1>
<br/>
                                            <div className="col">
                                                {/* <div>
                          <button
                            className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                            type="button"
                            onClick={this.showPreview}
                          >
                            <span className="btn-inner--icon">
                              <i className="fa fa-download" />
                            </span>
                            <span className="btn-inner--text">Download CV</span>
                          </button>
                          <Link
                            to={{
                                pathname:"/IdentityCard",
                                state:{newData}
                            }}
                            
                            className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                          >
                            <span className="btn-inner--icon">
                              <i className="fa fa-credit-card" />
                            </span>
                            <span className="btn-inner--text">ID Card</span>
                          </Link>
                        </div> */}
                                            </div>
                                        </div>
                                    </div>
                                       
                                    <Drawer
                                        title={"Signature Setup"}
                                        // placement="top"
                                        closable={true}
                                        onClose={this.onClose}
                                        visible={this.state.showSignatureDrawer}
                                        // key={this.state.personEducationId}
                                        // getContainer={true}
                                    >
                                      
                                      <div className="row">
                          
                            <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Pin <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="signaturePin"
                                            onChange={this.changeText}
                                            maxLength={4}
                                            
                                        />
                                    </div>
                                    </div>

                                     
                            <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Confirm Pin <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="confirmSignaturePin"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                    </div>
                                    <label className="label-control col-md-12" style={{color:'red'}}><small>Supported Formats(png, jpg, jpeg)</small></label>
                                    <div className="col-md-12">
                                    <ImgCrop modalTitle={<p style={{fontSize:'12px', color:'red'}}><b>Use the plus(+) icon to properly zoom in and focus on the signature image before proceeding.</b></p>}>
                                    <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    //action={this.dummyRequest}
                                                    customRequest={this.dummyRequest}
                                                    beforeUpload={beforeUpload}
                                                    onChange={this.onChangeSignature}
                                                >
                                                    {/* {signatureUrl != null ? signatureUrl : uploadSignatureBtn} */}
                                                    {signatureUrlPreview ? <img className="img-bw" src={signatureUrlPreview} alt="Signature" style={{ width: "100%" }} /> : uploadSignatureBtn}
                                                </Upload>
                                                </ImgCrop>
                                </div>
                                <div className="col-md-12">
                                  <br/>
                                  <br/>
                                <Button type="primary" loading={this.state.saving} onClick={this.saveSignature}>Save &nbsp; <i className="fa fa-save"/></Button>
                                </div>
                                </div>

                    
                                      </Drawer>
                   
                        
                                    <div className="card-body">
                                        <Row gutter={16}>
                                            <Col span={screen_width > 700 ? 12 : 24}>
                                                <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    //action={this.dummyRequest}
                                                    customRequest={this.dummyRequest}
                                                    beforeUpload={beforeUpload}
                                                    onChange={this.onChangePassport}
                                                >
                                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
                                                </Upload>
                                            </Col>
                                            <Col span={screen_width > 700 ? 12 : 24}>
                                        
                                            {this.state.signatureInfo ? <QueueAnim> <div key="1"><Alert
                                              message="Signature setup info"
                                              description={<p style={{fontSize:'12px'}}>
                                              This process requires that you upload your signature and create a four digit pin. This pin would inturn be tied to your signature.
                                               <br/>NOTE: 2</p>}
                                              type="info"
                                              showIcon
                                              action={
                                                <Space direction="vertical">
                                                  <Button size="small" type="primary" onClick={this.signatureDrawer}>
                                                    Continue
                                                  </Button>
                                                  <Button size="small" danger type="ghost" onClick={this.toggleSignatureInfo}>
                                                    Cancel
                                                  </Button>
                                                </Space>
                                              }
                                             
                                            /> </div></QueueAnim>: null}
                                    {/* <img src="http://localhost/LiteHr/Resources/Passport/Signature_16_884_886.jpeg" id="eeveelutions" />
<canvas id="canvas" width="200" height="200"></canvas> */}
                                            {this.state.signatureUrl == null ? <><img id="" src={signature_anim} style={{ width: "200px", height: "200px" }} />
                                            <button 
                                            className="btn btn-outline-primary btn-sm" 
                                            onClick={this.toggleSignatureInfo}>Add Signature &nbsp; <i className="fa fa-plus"/></button> </>:  <button 
                                            className="btn btn-outline-primary btn-sm" 
                                            onClick={this.toggleSignatureInfo}>Update Signature &nbsp; <i className="fa fa-plus"/></button>}
                                            <br/>
                                            {this.state.signatureUrl ? <><label className="label-control col-md-12">Signature</label><img className="img-bw" src={this.state.signatureUrl} style={{ width: "150px", height: "150px" }} /> </> : null}


                                                {/* {this.state.signatureUrl != null ? <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    customRequest={this.dummyRequest}
                                                    beforeUpload={beforeUpload}
                                                    onChange={this.onChangePassport}
                                                >
                                                    {signatureUrl ? <img src={signatureUrl} alt="avatar" style={{ width: "100%" }} /> : uploadSignatureBtn}
                                                </Upload> : null}
                                            {loading ? <img src={loading_gif} style={{ width: "30px", height: "30px" }} /> : null} */}

                                            </Col>
                                        </Row>
                                        <br />
                                        <div className="row">
                                            {/* <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Passport
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="passport"
                            onChange={(e) => this.handleFileUpload(e)}
                          />
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
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          <span className="avatar avatar-xl">
                            <img src={this.state.staff.person?.imageUrl} />
                          </span>
                        </div>
                      </div> */}

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        disabled
                                                        type="text"
                                                        name="surname"
                                                        value={this.state.staff.person.surname}
                                                        onChange={(e) => {
                                                            this.updatePersonItem("surname", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        First Name
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        disabled
                                                        name="firstname"
                                                        value={this.state.staff.person.firstname}
                                                        onChange={(e) => {
                                                            this.updatePersonItem("firstname", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Other Name
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        disabled
                                                        type="text"
                                                        name="othername"
                                                        value={this.state.staff.person.othername}
                                                        onChange={(e) => {
                                                            this.updatePersonItem("othername", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Date of birth
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        disabled
                                                        type="date"
                                                        name="birthDay"
                                                        value={this.state.staff.person.birthDay != null ? this.state.staff.person.birthDay.substring(0, 10) : null}
                                                        onChange={(e) => {
                                                            this.updatePersonItem("birthDay", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="email"
                                                        name="email"
                                                        defaultValue={this.state.staff.person.email}
                                                        onChange={(e) => {
                                                            this.setState({ email: e.target.value });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Phone
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="phoneNumber"
                                                        defaultValue={this.state.staff.person.phoneNumber}
                                                        onChange={(e) => {
                                                            this.setState({ phoneNumber: e.target.value });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Contact Address
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        type="text"
                                                        name="address"
                                                        defaultValue={this.state.staff?.person?.address}
                                                        onChange={(e) => {
                                                            this.setState({ address: e.target.value });
                                                        }}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        State of Origin
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        disabled
                                                        name="state"
                                                        onChange={(e) => {
                                                            this.updatePersonItem("stateId", parseInt(e.target.value));
                                                        }}
                                                        required
                                                    >
                                                        <option>Select a state</option>
                                                        {this.state.states && this.state.states.length > 0
                                                            ? this.state.states.map((state) => {
                                                                  return (
                                                                      <option key={state.id} selected={state.id == this.state.staff?.person?.lga?.stateId} value={state.id}>
                                                                          {state.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Local Government Area
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        disabled
                                                        name="lgaId"
                                                        onChange={(e) => {
                                                            this.updatePersonItem("lgaId", parseInt(e.target.value));
                                                        }}
                                                        required
                                                    >
                                                        <option>Select a Local Government</option>
                                                        {this.state.lgas && this.state.lgas.length > 0
                                                            ? this.state.lgas.map((lga) => {
                                                                  return (
                                                                      <option key={lga.id} selected={lga.id == this.state.staff.person.lgaId} value={lga.id}>
                                                                          {lga.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Gender
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        disabled
                                                        name="gender"
                                                        onChange={(e) => {
                                                            this.updatePersonItem("genderId", parseInt(e.target.value));
                                                        }}
                                                    >
                                                        <option>Select a Gender</option>
                                                        {this.state.genders && this.state.genders.length > 0
                                                            ? this.state.genders.map((gender) => {
                                                                  return (
                                                                      <option key={gender.id} selected={gender.id == this.state.staff.person.genderId} value={gender.id}>
                                                                          {gender.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Relationship Status
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        disabled
                                                        name="maritalStatusId"
                                                        onChange={(e) => {
                                                            this.updatePersonItem("maritalStatusId", parseInt(e.target.value));
                                                        }}
                                                    >
                                                        <option>Select a Relationship Status</option>
                                                        {this.state.maritalStatus && this.state.maritalStatus.length > 0
                                                            ? this.state.maritalStatus.map((status) => {
                                                                  return (
                                                                      <option key={status.id} selected={status.id == this.state.staff.person.maritalStatusId} value={status.id}>
                                                                          {status.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                           
                                           
                                            </div>

                                            <Drawer
                                                title="Basic Drawer"
                                                placement="top"
                                                closable={true}
                                                onClose={this.onClose}
                                                visible={this.state.drawEdit}
                                                // key={placement}
                                            >
                                                <p>Some contents...</p>
                                                <p>Some contents...</p>
                                                <p>Some contents...</p>
                                            </Drawer>
                                         <hr/>
                                         <br/>

                                         <div className="col-md-12">
                                         <br/>

                                         <h1>Employment Details</h1>   
                                         <hr/>

                                           </div>
                                         <br/>
                                         <br/>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        PFA Name
                                                    </label>
                                                    <select className="form-control" name="pfaNameId" onChange={this.changeText} disabled={this.state.additionalInfo?.pfaNameId != null ? true : false}>
                                                        <option>Select PFA</option>
                                                        {this.state.pfaName && this.state.pfaName.length > 0
                                                            ? this.state.pfaName.map((pfa) => {
                                                                  return (
                                                                      <option key={pfa.id} selected={pfa.id == this.state.pfaNameId} value={pfa.id}>
                                                                          {pfa.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        PFA Status
                                                    </label>
                                                    <select className="form-control" name="pfaStatusId" onChange={this.changeText} disabled={this.state.additionalInfo?.pfaStatusId != null ? true : false}>
                                                        <option>Select PFA Status</option>
                                                        {this.state.pfaStatus && this.state.pfaStatus.length > 0
                                                            ? this.state.pfaStatus.map((pfa) => {
                                                                  return (
                                                                      <option key={pfa.id} selected={pfa.id == this.state.pfaStatusId} value={pfa.id}>
                                                                          {pfa.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        IPPIS
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="rsaNumber"
                                                        defaultValue={this.state.rsaNumber}
                                                        onChange={this.changeText}
                                                        disabled={this.state.additionalInfo?.rsaNumber != null ? true : false}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Biometric Id
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="biometricId"
                                                        defaultValue={this.state.staff?.biometricId}
                                                        onChange={this.changeText}
                                                        disabled={this.state.staff?.biometricId == null || this.state.staff?.biometricId == "NULL" ? false : true}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Area of Specialization
                                                    </label>
                                                    <select className="form-control" name="areaOfSpecializationId" onChange={this.changeText} disabled={this.state.additionalInfo?.areaOfSpecializationId != null ? true : false}>
                                                        <option>Select Area of Specialization</option>
                                                        {this.state.aos && this.state.aos.length > 0
                                                            ? this.state.aos.map((i) => {
                                                                  return (
                                                                      <option key={i.id} selected={i.id == this.state.areaOfSpecializationId} value={i.id}>
                                                                          {i.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Staff Number
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        disabled
                                                        type="text"
                                                        name="staffNumber"
                                                        value={this.state.staff.staffNumber}
                                                        onChange={(e) => {
                                                            this.updateStaffItem("staffNumber", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
       
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <Collapse
                                                        // defaultActiveKey={['1']}
                                                        // onChange={callback}
                                                        ghost={true}
                                                    >
                                                        <Collapse.Panel className="" header={<b>Educational Qualifications</b>} key="1">
                                                            <div class="container">
                                                                {/* <button onClick={this.showDrawer} className="btn btn-primary btn-sm">
                                                                    Add &nbsp;
                                                                    <i className="fa fa-plus" />
                                                                </button> */}
                                                                <br />
                                                                {/* <p>The .table-bordered class adds borders on all sides of the table and the cells:</p>             */}
                                                                <table class="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>S/N</th>
                                                                            <th>Instisution Name</th>
                                                                            <th>Degree Obtained</th>
                                                                            <th>Year Obtained</th>
                                                                            {/* <th>&nbsp;</th> */}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.personEducations &&
                                                                            this.state.personEducations.map((edu, i) => {
                                                                                return (
                                                                                    <tr>
                                                                                        <td>{i + 1}</td>
                                                                                        <td>{edu.institution}</td>
                                                                                        <td>{edu.qualificationName}</td>
                                                                                        <td>{edu.yearObtained}</td>
                                                                                        {/* <td>
                                                                                            <button onClick={this.showDrawer} className="btn btn-outline-primary btn-sm">
                                                                                                <i className="fa fa-edit" />
                                                                                            </button>
                                                                                        </td> */}
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </Collapse.Panel>
                                                    </Collapse>
                                                    <hr />
                                                </div>
                                            </div>

                                            <br />
                                      
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Staff Type
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        disabled
                                                        name="staffTypeId"
                                                        onChange={(e) => {
                                                            this.updateStaffItem("staffTypeId", parseInt(e.target.value));
                                                        }}
                                                    >
                                                        <option>Select Staff Type</option>
                                                        {this.state.staffTypes && this.state.staffTypes.length > 0
                                                            ? this.state.staffTypes.map((types) => {
                                                                  return (
                                                                      <option key={types.id} selected={types.id == this.state.staff.staffTypeId} value={types.id}>
                                                                          {types.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Staff Category
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        disabled
                                                        name="categoryId"
                                                        onChange={(e) => {
                                                            this.updateStaffItem("categoryId", parseInt(e.target.value));
                                                        }}
                                                    >
                                                        <option>Select a Staff Category</option>
                                                        {this.state.staffCategories && this.state.staffCategories.length > 0
                                                            ? this.state.staffCategories.map((category) => {
                                                                  return (
                                                                      <option key={category.id} selected={category.id == this.state.staff.categoryId} value={category.id}>
                                                                          {category.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Unit
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        disabled
                                                        name="unitId"
                                                        onChange={(e) => {
                                                            this.updateStaffItem("unitId", parseInt(e.target.value));
                                                        }}
                                                    >
                                                        <option>Select a unit</option>
                                                        {this.state.units && this.state.units.length > 0
                                                            ? this.state.units.map((unit) => {
                                                                  return (
                                                                      <option key={unit.id} selected={unit.id == this.state.staff.unitId} value={unit.id}>
                                                                          {unit.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Department
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        disabled
                                                        name="departmentId"
                                                        onChange={(e) => {
                                                            this.updateStaffItem("departmentId", parseInt(e.target.value));
                                                        }}
                                                    >
                                                        <option>Select a Department</option>
                                                        {this.state.departments && this.state.departments.length > 0
                                                            ? this.state.departments.map((department) => {
                                                                  return (
                                                                      <option key={department.id} selected={department.id == this.state.staff.departmentId} value={department.id}>
                                                                          {department.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Rank
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        disabled
                                                        name="rankId"
                                                        onChange={(e) => {
                                                            this.updateStaffItem("rankId", parseInt(e.target.value));
                                                        }}
                                                    >
                                                        <option>Select an Rank</option>
                                                        {this.state.ranks && this.state.ranks.length > 0
                                                            ? this.state.ranks.map((rank) => {
                                                                  return (
                                                                      <option key={rank.id} selected={rank.id == this.state.staff?.rankId} value={rank.id}>
                                                                          {rank.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Appointment
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        // disabled
                                                        name="appointmentId"
                                                        onChange={(e) => {
                                                            this.updateStaffItem("appointmentId", parseInt(e.target.value));
                                                        }}
                                                    >
                                                        <option>Select an Appointment</option>
                                                        {this.state.appointments && this.state.appointments.length > 0
                                                            ? this.state.appointments.map((appointment) => {
                                                                  return (
                                                                      <option key={appointment.id} selected={appointment.id == this.state.staff.appointmentId} value={appointment.id}>
                                                                          {appointment.name}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Salary Grade Level
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="email"
                                                        required
                                                        name="email"
                                                        disabled
                                                        value={this.state.staffSalary ? this.state.staffSalary?.salaryCategory + " " + this.state.staffSalary?.salaryLevel + ", " + this.state.staffSalary?.salaryStep : "-"}
                                                        // onChange={e => {
                                                        //   this.updatePersonItem("email", e.target.value)
                                                        // }}
                                                        onChange={this.changeText}
                                                    />
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => {
                                                            this.setState({ salaryCard: true });
                                                        }}
                                                    >
                                                        <i className="fa fa-edit" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Date of Assumption
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        disabled
                                                        type="date"
                                                        name="doa"
                                                        value={this.state.staff.dateOfAssumption != null ? this.state.staff.dateOfAssumption.substring(0, 10) : null}
                                                        onChange={(e) => {
                                                            this.updatePersonItem("doa", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Date of Confirmation
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        disabled
                                                        type="date"
                                                        name="doc"
                                                        value={this.state.staff.dateOfConfirmation != null ? this.state.staff.dateOfConfirmation.substring(0, 10) : null}
                                                        onChange={(e) => {
                                                            this.updatePersonItem("doc", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">
                                                        Date of Last Promotion
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        disabled
                                                        type="date"
                                                        name="dolp"
                                                        value={this.state.staff.dateOfLastPromotion != null ? this.state.staff.dateOfLastPromotion.substring(0, 10) : null}
                                                        onChange={(e) => {
                                                            this.updatePersonItem("dolp", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                           
                                        </div>
                                        <button type="button" onClick={() => this.myToggle()} data-dismiss="modal" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.showCV == true ? (
                        <div className="jumbo-back">
                            <div className="container marg-top">
                                <div className="text-right" id="m-bot">
                                    <button id="cvx" className="btn btn-info" id="cv-download" onClick={this.downloadCV}>
                                        <span className="btn-inner--icon">
                                            <i className="fa fa-download" />
                                        </span>{" "}
                                        Download CV{" "}
                                    </button>
                                    <button id="cvx" className="btn btn-danger" onClick={this.hidePreview} id="cv-download">
                                        {" "}
                                        &times; Cancel{" "}
                                    </button>
                                </div>

                                <div className="container mt5-pct mb-5" id="curri">
                                    <div className="card shadow">
                                        <div className="card-body primary-bg">
                                            <div className="row">
                                                <div className="offset-md-2 col-md-8">
                                                    <div
                                                        style={{
                                                            marginLeft: "auto",
                                                            marginRight: "auto",
                                                            width: "50px",
                                                        }}
                                                    >
                                                        <img
                                                            src={logo}
                                                            alt="school logo"
                                                            style={{
                                                                width: "50px",
                                                                marginLeft: "auto",
                                                                marginRight: "auto",
                                                            }}
                                                        />
                                                    </div>
                                                    <form className="mt-5">
                                                        <b>BIODATA</b>
                                                        <hr />

                                                        <div className="form-group row">
                                                            <label className="col-sm-3">
                                                                Full Name: <br />
                                                                <p>
                                                                    <b>
                                                                        <i>
                                                                            {this.state.staff.person.surname} {this.state.staff.person.firstname} {this.state.staff.person.othername}
                                                                        </i>
                                                                    </b>
                                                                </p>
                                                            </label>

                                                            <label className="col-sm-3">
                                                                Date of Birth :
                                                                <br />
                                                                <p>
                                                                    <b>
                                                                        <i>{this.state.staff.person.birthDay}</i>
                                                                    </b>
                                                                </p>
                                                            </label>

                                                            <label className="col-sm-3">
                                                                Gender:
                                                                <br />
                                                                <p></p>
                                                            </label>

                                                            <div className="col-sm-3" style={{ backgroundColor: "grey" }}>
                                                                <img />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-3">
                                                                Address:
                                                                <br />
                                                                <p> </p>
                                                            </label>

                                                            <label className="col-sm-3">
                                                                Phone Number:
                                                                <br />
                                                                <p></p>
                                                            </label>

                                                            <label className="col-sm-3">
                                                                Email Address:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                            <label className="col-sm-3">
                                                                Marital Status:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-3">
                                                                Religion:
                                                                <br />
                                                                <p></p>
                                                            </label>

                                                            <label className="col-sm-3">
                                                                State of Origin:
                                                                <br />
                                                                <p></p>
                                                            </label>

                                                            <label className="col-sm-3">
                                                                LGA:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                        </div>

                                                        <hr />
                                                        <b>EDUCATION & QUALIFICATIONS</b>
                                                        <hr />

                                                        <div className="form-group row">
                                                            <label className="col-sm-3">
                                                                Institution Attended:
                                                                <br />
                                                                <p> </p>
                                                            </label>

                                                            <label className="col-sm-3">
                                                                Course:
                                                                <br />
                                                                <p> </p>
                                                            </label>

                                                            <label className="col-sm-3">
                                                                Graduation Year:
                                                                <br />
                                                                <p></p>
                                                            </label>

                                                            <label className="col-sm-3">
                                                                Qualification Obtained:
                                                                <br />
                                                                <p> </p>
                                                            </label>
                                                        </div>

                                                        <hr />

                                                        <hr />
                                                        <b>WORK EXPERIENCE</b>
                                                        <hr />

                                                        <div className="form-group row">
                                                            <label className="col-sm-3">
                                                                Organisation:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                            <label className="col-sm-3">
                                                                Position Held:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                            <label className="col-sm-3">
                                                                Start Year:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                            <label className="col-sm-3">
                                                                End Year:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                        </div>

                                                        <hr />

                                                        <hr />
                                                        <b>REFEREES</b>
                                                        <hr />

                                                        <div className="form-group row">
                                                            <label className="col-sm-3">
                                                                Name of Referee 1:
                                                                <br />
                                                            </label>
                                                            <label className="col-sm-3">
                                                                Organisation:
                                                                <br />
                                                            </label>{" "}
                                                            <label className="col-sm-3">
                                                                Designation:
                                                                <br />
                                                            </label>
                                                            <label className="col-sm-3">
                                                                Email:
                                                                <br />
                                                            </label>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-3">
                                                                Name of Referee 2:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                            <label className="col-sm-3">
                                                                Organisation:
                                                                <br />
                                                                <p></p>
                                                            </label>{" "}
                                                            <label className="col-sm-3">
                                                                Designation:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                            <label className="col-sm-3">
                                                                Email:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-sm-3">
                                                                Name of Referee 3:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                            <label className="col-sm-3">
                                                                Organisation:
                                                                <br />
                                                                <p></p>
                                                            </label>{" "}
                                                            <label className="col-sm-3">
                                                                Designation:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                            <label className="col-sm-3">
                                                                Email:
                                                                <br />
                                                                <p></p>
                                                            </label>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </Fade>
            </>
        );
    }
}
