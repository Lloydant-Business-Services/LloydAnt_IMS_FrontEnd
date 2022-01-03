import { Steps, Button, message, Progress, Checkbox, Radio, Upload, Modal } from "antd";
import React from "react";
// import "antd/dist/antd.css";
import { initForm } from "./init";
import { Component } from "react";
import logosm from "../assets/img/theme/unizik.png";
import pass_port from "../images/they.jpeg";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";
import $ from "jquery";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import SweetAlert from "react-bootstrap-sweetalert";
import { postData, fetchData, fetchDataWithoutToken, LoginRequest } from "../utils/crud";
import {ActionType } from "../utils/Identifiers";


const { Step } = Steps;

const steps = [
    {
        title: "First",
        content: "First-content",
    },
    {
        title: "Second",
        content: "Second-content",
    },
    {
        title: "Last",
        content: "Last-content",
    },
];
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
    return isJpgOrPng && isLt2M;
}
class InternationalCollaboForm extends Component {
    state = {
        // saving:true
        visitation_props: this.props.location.state.data
    };

    changeText = (event) => {
      const target = event.target;
    //   const yy = target.type === "select"? $("#yourdropdownid option:selected").text() : null
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;  
      this.setState({
        [name]: value,
      });
    };
    onChange = (checkedValues) => {
        console.log("checked = ", checkedValues);
        this.setState({
          sponsorship_type: checkedValues.length > 0 ? checkedValues[0] : 1
        })
        
    };
    onChange1 = (e) => {
        console.log("radio1 checked", e.target.value);
        this.setState({
            value1: e.target.value,
        });
    };
    handleChange = (info) => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) =>
                this.setState({
                    imageUrl,
                    loading: false,
                })
               
            );

            setTimeout(() => {
              console.log(this.state.imageUrl)
            },2000)
        }
    };

    previewForm = () => {
        var dept = $("#department option:selected").text()
        var deptCurr = $("#department_curr option:selected").text()
        var gender = $("#gender option:selected").text()
        var fac = $("#faculty option:selected").text()
        var facCurr = $("#faculty_curr option:selected").text()
        var country = $("#country option:selected").text()
        var progType = $("#prog_type option:selected").text()
        this.setState({
            isPreview: true,
            dept_text:dept,
            dept_text2:deptCurr,
            gender_text: gender,
            faculty_text1: fac,
            faculty_text2: facCurr,
            country_text: country,
            programme_type_text: progType,
        });
    };

    confirmSubmission = () => {
        window.scrollTo(0,0)
        this.setState({
            saving: true,
            confirm_pop: false,
            isPreview: false,
        });
        let p = this.state;
        const payload = {
          "surname": p.surname,
          "firstname": p.firstname,
          "othername": p.othername,
          "birthDay": p.birthDay,
          "email": p.email,
          "address": p.permanent_address,
          "phoneNumber": p.phone_one,
          "genderId": parseInt(p.gender),
          "addressSecond": p.corr_address,
          "passportNumber": p.passport_number,
          "programmeType": p.programme_type,
          "academicYear": p.academic_year,
          "institutionDepartmentId": parseInt(p.department),
          "durationOfStay": parseInt(p.duration_of_stay),
          "degreeAwardDate": p.date_of_award,
          "awardingInstitution": p.awarding_inst,
          "currentInstitutionDepartmentId": parseInt(p.department_curr),
          "currentYearOfStudy": parseInt(p.year_of_study),
          "currentExpectedQualificationYear": p.qualification_year,
          "reason": p.reason,
          "sponsorshipType": p.sponsorship_type,
          "sponsorshipOrganization": p.sponsorship_organization,
          "nextOfKinFullname": p.nok_name,
          "nextOfKinPhone": p.nok_phone,
          "nextOfKinAddress": p.nok_address,
          "imageUrl": p.imageUrl,
          "visitationTypeId": parseInt(p.visitation_props?.id)
        }

        LoginRequest("/ForeignVisitation/PostForeignVisitationForm", payload, data => {
            console.log(data)
          if(data == 200){
            this.setState({
              succ_pop: true,
              saving: false,
          })
          $("#cover-spin").fadeOut(200);
          }
        })
      
    };
    loadGender = () => {
        fetchData("/Genders", (data) => {
          this.setState({ genders: data });
        });
      };
    loadGender = () => {
        fetchDataWithoutToken("/Genders", (data) => {
          this.setState({ genders: data });
        });
      };
      loadDepartment = () => {
        fetchDataWithoutToken("/InstitutionDepartments", (data) => {
          this.setState({ departments: data });
        });
      };    
      loadFaculty = () => {
        fetchDataWithoutToken("/Faculty", (data) => {
          this.setState({ faculties: data });
        });
      }; 

      redirectUser = () => {
          this.setState({succ_pop:false})
          setTimeout(() => {
          window.location.href = "/International_Collaborations"

          },2000)
      }
  
    componentDidMount() {
        console.log(this.state.visitation_props, "VV")
        initForm();
        this.loadDepartment()
        this.loadGender()
        this.loadFaculty()
        setTimeout(() => {
            $("#cover-spin").fadeOut(500);
        }, 3000);
    }
    render() {
        const { loading, imageUrl } = this.state;
        const person = this.state;
        const plainOptions = ["Full Sponsorship", "Partial Sponsorship", "No Sponsorship"];
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Passport Photograph</div>
            </div>
        );
        require("../assets/css/v-form.css");
        require("antd/dist/antd.css")
        return (
            <>
                {this.state.saving ? (
                    <div id="cover-spin">
                        {/* <div className="container sp" style={{zIndex:'9999'}}> */}
                        <div className="jumbotron jumbo" style={{ backgroundColor: "transparent" }}>
                            <div className="metro-spin">
                                <MetroSpinner size={90} color={"white"} loading={this.state.loading} />
                            </div>
                            {/* <small>
                            Please wait...
                        </small> */}
                            {/* </div> */}
                        </div>
                    </div>
                ) : null}
                {this.state.confirm_pop ? (
                    <SweetAlert warning showCancel confirmBtnText="Submit" confirmBtnBsStyle="primary" title="Are you sure?" onConfirm={this.confirmSubmission} onCancel={() => this.setState({ confirm_pop: false })} focusCancelBtn>
                        Once submitted, further modifications cannot be made. Continue with submission?
                    </SweetAlert>
                ) : null}

                {this.state.succ_pop ? (
                    <SweetAlert success title="Saved!" onConfirm={this.redirectUser}>
                        Application was saved and submitted successfully. Please refer to the email address provided as neccesary information and directives has been duly forwarded. Thank you!
                    </SweetAlert>
                ) : null}
                <Modal
                    title="Preview"
                    // centered
                    visible={this.state.isPreview}
                    style={{ top: 20 }}
                    // onOk={() => setVisible(false)}
                    onCancel={() => this.setState({ isPreview: false })}
                    footer={[
                        <Button key="back" onClick={() => this.setState({ isPreview: false })}>
                            Cancel
                        </Button>,

                        <Button
                            key="link"
                            type="primary"
                            // loading={loading}
                            onClick={() => this.setState({ confirm_pop: true })}
                        >
                            Save & Submit
                        </Button>,
                    ]}
                    width={1000}
                >
                    <div>
                                <img
                                    src={logosm}
                                    className=""
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        height: "100px",
                                    }}
                                />
                            </div>
                    <center>
                        <div className="img-vis-prev">
                            <img src={person.imageUrl} style={{ width: "inherit", height: "inherit" }} />
                        </div>
                    </center>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Surname: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                        {person.surname} 
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    First Name: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.firstname} 
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Other Name: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.othername} 
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Title: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                        Mr.
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Gender: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.gender_text}
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Date of Birth: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.birthDay ? person.birthDay.substring(0,10) : "-"} 
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Country of Residence: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.country_text}
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Country of Citizenship: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                        -
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Passport Number: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.passport_number}
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <hr /> */}
                    <div className="row">
                        {/* <div className="col-md-12">
                            <h3 className="text-black" style={{ color: "black", fontWeight: "700", marginBottom: "20px" }}>
                            Permanent Address
                            </h3>
                        </div> */}

                        <div className="col-md-4 mt-0">
                            <div className="form-group">
                                <p>
                                    Permanent Address: &nbsp; &nbsp;
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.permanent_address}
                                    </label>
                                </p>
                            </div>
                        </div>
{/* 
                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Phone: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.phone_one}
                                    </label>
                                </p>
                            </div>
                        </div> */}
{/* 
                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Email: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.email}
                                    </label>
                                </p>
                            </div>
                        </div> */}
                    </div>

                    {/* <hr /> */}

                    <div className="row">
                        {/* <div className="col-md-12">
                            <h3 className="text-black" style={{ color: "black", fontWeight: "700", marginBottom: "20px" }}>
                                Correspondence Address
                            </h3>
                        </div> */}

                        <div className="col-md-4 mt-0">
                            <div className="form-group">
                                <p>
                                Correspondence Address: &nbsp; &nbsp;
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.corr_address}
                                    </label>
                                </p>
                            </div>
                        </div>
{/* 
                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Phone: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                        +12 890 9484 9484
                                    </label>
                                </p>
                            </div>
                        </div> */}

                        {/* <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Email: &nbsp;{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                        miracleoghenemado@gmail.com
                                    </label>
                                </p>
                            </div>
                        </div> */}
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="text-black" style={{ color: "black", fontWeight: "700", marginBottom: "20px" }}>
                                Next of Kin Details
                            </h3>
                        </div>

                        <div className="col-md-5 mt-0">
                            <div className="form-group">
                                <p>
                                    Fullname: &nbsp;
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.nok_name}
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group">
                                <p>
                                    Phone:{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.nok_phone}
                                    </label>
                                </p>
                            </div>
                        </div>
{/* 
                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Email:{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.no}
                                    </label>
                                </p>
                            </div>
                        </div> */}
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="text-black" style={{ color: "black", fontWeight: "700", marginBottom: "20px" }}>
                                Programme Information
                            </h3>
                        </div>

                        <div className="col-md-4 mt-0">
                            <div className="form-group">
                                <p>
                                    Type of Programme: &nbsp;
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.programme_type_text}
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Academic Year:{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.academic_year}
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Faculty:{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.faculty_text1}
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mt-0">
                            <div className="form-group">
                                <p>
                                    Department &nbsp;
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.dept_text}
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Estimated Duration of Stay:{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.duration_of_stay} Months
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="text-black" style={{ color: "black", fontWeight: "700", marginBottom: "20px" }}>
                                Current Institution Details
                            </h3>
                        </div>

                        <div className="col-md-4 mt-0">
                            <div className="form-group">
                                <p>
                                    Date of Degree Award: &nbsp;
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.date_of_award}
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Awarding Institution:{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.awarding_inst}
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Faculty:{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.faculty_text2}
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <p>
                                    Department:{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.dept_text2}
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="text-black" style={{ color: "black", fontWeight: "700", marginBottom: "20px" }}>
                                Reasons for Choosing Nnamsi Azikiwe University
                            </h3>
                        </div>

                        <div className="col-md-12 mt-0">
                            <div className="form-group">
                                <p>
                                    Reason: &nbsp;
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.reason}
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="text-black" style={{ color: "black", fontWeight: "700", marginBottom: "20px" }}>
                                Sponsorship Details
                            </h3>
                        </div>

                        <div className="col-md-4 mt-0">
                            <div className="form-group">
                                <p>
                                    Sponsorship Type: &nbsp;
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.sponsorship_type}
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="form-group">
                                <p>
                                    Sponsorship Organization:{" "}
                                    <label htmlFor="example-text-input" className="form-control-label">
                                    {person.sponsorship_organization}
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>

                <div id="cover-spin">
                    {/* <div className="container sp" style={{zIndex:'9999'}}> */}
                    <div className="jumbotron jumbo" style={{ backgroundColor: "transparent" }}>
                        <div className="metro-spin">
                            <MetroSpinner size={90} color={"white"} loading={this.state.loading} />
                        </div>
                        {/* <small>
                            Please wait...
                        </small> */}
                        {/* </div> */}
                    </div>
                </div>
                <center className="container-fluid">
                    <div className="form-vis-top">
                        <div
                            className="col-sm-12"
                            //   style={{ backgroundColor: "transparent" }}
                        >
                            <center>
                                <img
                                    src={logosm}
                                    className=""
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        height: "100px",
                                    }}
                                />
                            </center>
                        </div>
                        <h2 className="display-4 sofia text-white">Student Visitation Form</h2>
                    </div>
                </center>
                <form id="msform">
                    {/* progressbar */}

                    {/* sections */}

                    <div className="container">
                        <center>
                            <ul id="progressbar">
                                <li className="active" />
                                <li />
                                <li />
                                <li />
                                <li />
                                <li />
                                {/* <li />
          <li />
          <li />
          <li /> */}
                            </ul>
                            {/* <Progress percent={70} width={50}/> */}
                            <br />
                            <br />
                        </center>
                        <section className="card col-lg-10 col-sm-12">
                            <h2 className="fs-title text-center">PERSONAL INFORMATION</h2>
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    {/* <label
                      htmlFor="example-text-input"
                      className="form-control-label col-md-12"
                    >
                      Upload Passport Photograph
                    </label> */}
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
                                    </Upload>
                                    <br />
                                    <br />
                                    <br />
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Surname <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="surname"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            First Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="firstname"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Other Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="othername"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="email"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Phone 1 <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="phone_one"
                                            onChange={this.changeText}
                                        />
                                    </div>

                                </div>
                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Title
                                        </label>
                                        <select className="form-control" name="title" onChange={this.changeText} required>
                                            <option>Mr.</option>
                                            <option>Miss</option>
                                        </select>
                                    </div>
                                </div> */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Date of birth <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control sofia"
                                            type="date"
                                            name="birthDay"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Gender
                                        </label>
                                        <select className="form-control" id="gender" name="gender" onChange={this.changeText} required>
                                            <option>Select Gender</option>
                                        {this.state.genders &&
                      this.state.genders.length > 0
                        ? this.state.genders.map((gender) => {
                            return (
                              <option key={gender.id} value={gender.id}>
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
                                            Country
                                        </label>
                                        <select className="form-control" id="country" name="country" onChange={this.changeText} required>
                                            <option>Canada</option>
                                            <option>China</option>
                                            <option>Nigeria</option>
                                            <option>Ghana</option>
                                            <option>The U.S.A</option>
                                            
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Passport Number <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="passport_number"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Phone 1 <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="phone_one"
                                            onChange={this.changeText}
                                        />
                                    </div>

                                </div> */}

                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Phone 2
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="phone_two"
                                            onChange={this.changeText}
                                        />
                                    </div>

                                    
                                </div> */}
                                </div>
                            <br />
                            {/* <h2 className="fs-title">Permanent Address</h2>
                            <br /> */}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                           Permanent Addresss <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="permanent_address"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>

                  
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Correspondence Addresss <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="corr_address"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>

                      
                         
                            <input type="button" name="next" className="next action-button sofia" defaultValue="Next" />
                        </section>
                        <section className="card col-lg-10 col-sm-12">
                            <h2 className="fs-title text-center">NEXT OF KIN INFORMATION</h2>
                            <br />

                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Next of Kin Full Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="nok_name"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Phone <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="nok_phone"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Address<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="nok_address"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>

                            <input type="button" name="previous" className="previous action-button" defaultValue="Previous" />
                            <input type="button" name="next" className="next action-button sofia" defaultValue="Next" />
                        </section>

                        <section className="card col-lg-10 col-sm-12">
                            <h2 className="fs-title text-center">PROGRAMME INFORMATION</h2>
                            <br />

                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Type of Programme
                                        </label>
                                        <select className="form-control" id="prog_type" name="programme_type" onChange={this.changeText} required>
                                            <option>PHD</option>
                                            <option>Post-Graduate</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Academic Year
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="academic_year"
                                            placeholder="2020/2021"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Faculty<span className="text-danger">*</span>
                                        </label>
                                        <select className="form-control" id="faculty" name="faculty" onChange={this.changeText} required>
                                        <option>Select a Faculty</option>
                      {this.state.faculties &&
                      this.state.faculties.length > 0
                        ? this.state.faculties.map((faculty) => {
                            return (
                              <option key={faculty.id} value={faculty.id}>
                                {faculty.name}
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
                                            Department<span className="text-danger">*</span>
                                        </label>
                                        <select className="form-control" id="department" name="department" onChange={this.changeText} required>
                                        <option>Select a Department</option>
                      {this.state.departments &&
                      this.state.departments.length > 0
                        ? this.state.departments.map((department) => {
                            return (
                              <option key={department.id} value={department.id}>
                                {department.name}
                              </option>
                            );
                          })
                        : null}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Estimated Duration of Stay<span className="text-danger">*</span>
                                        </label>
                                        <select className="form-control" id="duration" name="duration_of_stay" onChange={this.changeText} required>
                                            <option value="2">2 Months</option>
                                            <option value="3">3 Months</option>
                                            <option value="6">6 Months</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <input type="button" name="previous" className="previous action-button" defaultValue="Previous" />
                            <input type="button" name="next" className="next action-button sofia" defaultValue="Next" />
                        </section>

                        <section className="card col-lg-10 col-sm-12">
                            <h2 className="fs-title text-center text-uppercase">Information on Current Institution (For Masters and PhD Previous Institution)</h2>
                            <br />

                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Date of Degree Award <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            name="date_of_award"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Awarding Institution
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="awarding_inst"
                                            onChange={this.changeText}
                                        />
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Faculty<span className="text-danger">*</span>
                                        </label>
                                        <select className="form-control" id="faculty_curr" name="faculty_curr" onChange={this.changeText} required>
                                        <option>Select a Faculty</option>
                      {this.state.faculties &&
                      this.state.faculties.length > 0
                        ? this.state.faculties.map((faculty) => {
                            return (
                              <option key={faculty.id} value={faculty.id}>
                                {faculty.name}
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
                                            Department<span className="text-danger">*</span>
                                        </label>
                                        <select className="form-control" id="department_curr" name="department_curr" onChange={this.changeText} required>
                                        <option>Select a Department</option>
                      {this.state.departments &&
                      this.state.departments.length > 0
                        ? this.state.departments.map((department) => {
                            return (
                              <option key={department.id} value={department.id}>
                                {department.name}
                              </option>
                            );
                          })
                        : null}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Year of Study <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="year_of_study"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Expected Qualification & Year<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="qualification_year"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>

                            <input type="button" name="previous" className="previous action-button" defaultValue="Previous" />
                            <input type="button" name="next" className="next action-button sofia" defaultValue="Next" />
                        </section>

                        <section className="card col-lg-10 col-sm-12">
                            <h2 className="fs-title text-center text-uppercase">Why you Choose Nnamdi Azikiwe University(Brief Narrative)</h2>
                            <br />

                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <textarea className="form-control sofia" name="reason" id="CAT_Custom_10" rows={4} onkeydown="if(this.value.length>=4000)this.value=this.value.substring(0,3999);" defaultValue={""} onChange={this.changeText}/>
                                </div>
                            </div>

                            <input type="button" name="previous" className="previous action-button" defaultValue="Previous" />
                            <input type="button" name="next" className="next action-button sofia" defaultValue="Next" />
                        </section>

                        <section className="card col-lg-10 col-sm-12">
                            <h2 className="fs-title text-center">SPONSORSHIP</h2>
                            <br />

                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Sponsorship Type <span className="text-danger">*</span> &nbsp; &nbsp; &nbsp;
                                        </label>
                                        <Checkbox.Group options={plainOptions} defaultValue={["Apple"]} onChange={this.onChange} />
                                        {/* <Radio.Group options={plainOptions} onChange={this.onChange1} value={this.state.sponsor_check} /> */}
                                        <br />

                                        <br />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input" className="form-control-label">
                                            Sponsorship Organization <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="sponsorship_organization"
                                            onChange={this.changeText}
                                        />
                                    </div>
                                </div>
                            </div>

                            <input type="button" name="previous" className="previous action-button" defaultValue="Previous" />
                            <input type="button" name="preview" onClick={this.previewForm} className="action-button sofia" defaultValue="Preview" />
                        </section>

                        {/* <section className="card">
          <h2 className="fs-title">Question 10</h2>
          <h3 className="fs-subtitle">What postgraduate qualifications or training do you wish to obtain?</h3>
          <textarea className="form-control" name="CAT_Custom_10" id="CAT_Custom_10" rows={4} onkeydown="if(this.value.length>=4000)this.value=this.value.substring(0,3999);" defaultValue={""} />
          <input type="button" name="previous" className="previous action-button" defaultValue="Previous" />
          <input type="submit" name="submit" className="submit action-button" defaultValue="Submit" />
        </section> */}
                        {/* </center> */}
                    </div>
                </form>
            </>
        );
    }
}

export default InternationalCollaboForm;
