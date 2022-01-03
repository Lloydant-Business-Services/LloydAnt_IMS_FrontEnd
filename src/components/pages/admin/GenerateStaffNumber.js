import React, { Component } from "react";
import { fetchData, postData, editData, URL } from "../../../utils/crud";
import SaveSpinner from "./SaveSpinner";
import {PushSpinner, ClassicSpinner, MetroSpinner} from "react-spinners-kit"
import {Link, Redirect} from "react-router-dom"


import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import { PersonnelDepartmentId, Roles } from "../../Barn";

class CreateStaffForm extends Component {
  state = {
    // errorCard:true,
    spin: false,
    trig: this.props.trigger,
    staffAdd:false,
    stateId: 0,
    lgaId: 0,
    genderId: 0,
    religionId: 0,
    maritalStatusId: 0,
    departmentId: 0,
    appointmentTypeId: 0,
    dateOfConfirmation: "",
    dateOfAppointment: "",
    doB: "",
    surname: "",
    firstName: "",
    otherName: "",
    emailAddress: "",
    courseOfStudy: "",
    phoneNo: "",
    address: "",
    staffNumber: "",
    rankId: 0,
    categoryId: 0,
    appointmentId: 0,
    staffTypeId: 0,
    isConfirmed: true,
    institutionOfQualification: "",
    year: 0,
    qualificationId: 0,
    qualifications: '',
    educationalQualification: [
      {
        id: Math.random(),
        institutionAttended: "",
        course: "",
        graduationYear: 0,
        qualificationObtained: 0,
      },
    ],
  };

  pushMethod = () => {
 
    this.state.editStaff.personEducations.push({
      id: 0,
      personId: 0,
      qualificationId: this.state.qualiId,
      institutionName: this.state.institutionOfQualification,
      courseOfStudy: this.state.courseOfStudy,
      year: this.state.year
    })
   

setTimeout(()=>{
  console.log(this.state.editStaff.personEducations, "EditStaff")

},3000)

let mapEdu = this.state.editStaff.personEducations.map((a,i)=>{
  return{
    instName: a.institutionName,
    courseOfStudy: a.courseOfStudy,
    year: a.year,
    qualificationId: a.qualificationId
  }
})

console.log(mapEdu, "MEEEEEE!!!!!")
this.setState({
  mappedEdu:mapEdu
})

    
  }

  loadStaff = () => {
    fetchData("/Staff", (data) => {
      this.setState({ allStaff: data, allStaffSearch: data });
    });

    setTimeout(() => {
      console.log(this.state.allStaff);
    }, 2000);
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

  loadReligion = () => {
    fetchData("/Religions", (data) => {
      this.setState({ Religions: data });
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
  loadAppointmentType = () => {
    fetchData("/AppointmentType", (data) => {
      this.setState({ appointmentType: data });
    });
    setTimeout(() => {
      console.log(this.state.appointmentType, "Appointment Type!!!!");
    }, 2000);
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


    setTimeout(()=>{
        console.log(this.state.appointments, "Appointments!!")
    },4000)
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
  loadStaffCadre = () => {
    fetchData("/StaffCadre", (data) => {
      this.setState({ staffCadre: data });
    });
  };

  loadStaffCategory = () => {
    fetchData("/InstitutionStaffCategories", (data) => {
      this.setState({ staffCategories: data });
    });
  };
  loadeducationalQualifications = () => {
    fetchData("/EducationalQualifications", data => {
      this.setState({ qualifications: data })
    })
    
  }
  handleAppointment = (e) => {
    this.setState({
      appointmentId: parseInt(e.target.value),
    });
  };

  handleReligion = (e) => {
    this.setState({
      religionId: parseInt(e.target.value),
    });
  };

  //DropDown Handlers

  handleAppointmentType = (e) => {
      let app = document.getElementById("appType")
    app.style.border = "1px solid #8080803b"

    this.setState({
      appointmentTypeId: parseInt(e.target.value),
    });
  };

  handleDepartment = (e) => {
    this.setState({
      departmentId: parseInt(e.target.value),
    });
  };

  handleGender = (e) => {
    this.setState({
      genderId: parseInt(e.target.value),
    });
  };

  handleLGA = (e) => {
    this.setState({
      lgaId: parseInt(e.target.value),
    });
  };

  handleRelationship = (e) => {
    this.setState({
      maritalStatusId: parseInt(e.target.value),
    });
  };

  handleStaffCategory = (e) => {
    this.setState({
      categoryId: parseInt(e.target.value),
    });
  };

  handleStaffType = (e) => {
    this.setState({
      staffTypeId: parseInt(e.target.value),
    });
  };

  handleStateOfOrigin = (e) => {
    this.setState({
      stateId: parseInt(e.target.value),
    });

    setTimeout(() => {
      fetchData(`/Lgas/byStateId?id=${this.state.stateId}`, (data) => {
        this.setState({
          filteredLGA: data,
        });
      });
      console.log(this.state.filteredLGA, "Filtered!!");
    }, 2000);
  };

  handleRank = (e) => {
    this.setState({
      rankId: parseInt(e.target.value),
    });
  };

  handleUnit = (e) => {
    this.setState({
      unitId: parseInt(e.target.value),
    });
    setTimeout(() => {
      fetchData(
        `/InstitutionRanks/GetInstitutionRankBy?unitId=${this.state.unitId}`,
        (data) => {
          this.setState({ tiedRank: data });

          console.log(this.state.tiedRank, "Tied Rank!!");
        }
      );
    }, 2000);
  };
  handleStaffCadre = (e) => {
    this.setState({
      staffCadreId: parseInt(e.target.value),
    });
  };
handleQualificationYear = (e) => {
    this.setState({
        year: parseInt(e.target.value)
    })
}

handleQualificationId = (e) => {
    this.setState({
    qualificationId: parseInt(e.target.value)

    })
}
  handleCreateStaff = (e) => {
    e.preventDefault();
    let surname = document.forms["staffForm"]["surname"].value;
    let firstname = document.forms["staffForm"]["firstname"].value;
    let othername = document.forms["staffForm"]["othername"].value;
    // let phoneNo = document.forms["staffForm"]["phoneNumber"].value;
    // let emailAdd = document.forms["staffForm"]["email"].value;
    let salCat = document.forms["staffForm"]["salCat"].value;
    let salLvl = document.forms["staffForm"]["salLvl"].value;
    let salStp = document.forms["staffForm"]["salStp"].value;
    if (
      surname == "" ||
      firstname == "" ||
      othername == "" ||
    //   phoneNo == "" ||
    //   emailAdd == ""||
      salCat == "" ||
      salLvl == "" ||
      salStp == "" 
    ) {
      alert("Required Fields should not be left empty");
      return false;
    }else if(this.state.appointmentTypeId == 0){
        let app = document.getElementById("appType");
        app.style.border = "2px solid red"
        alert("Please Select Staff Appointment Type")

        return false
    }


    

    // let bto = document.getElementById("btt");
    // bto.setAttribute("disabled", true)
    this.setState({
      spin: true,
      trig: false,
    });
    let currentState = this;
    const newStaff = {
    
      departmentId: this.state.departmentId > 0 ? this.state.departmentId : PersonnelDepartmentId,
      appointmentTypeId: this.state.appointmentTypeId,
      dateOfConfirmation: this.state.dateOfConfirmation,
    //   dateOfAppointment: this.state.dateOfAppointment,
    //   doB: this.state.doB,
      surname: this.state.surname,
      firstName: this.state.firstName,
      otherName: this.state.otherName,
    //   courseOfStudy: this.state.courseOfStudy || "",
    //   phoneNo: this.state.phoneNo,
    //   address: this.state.address,
      staffNumber: "",
      rankId: this.state.rankId,
      categoryId: this.state.categoryId,
      appointmentId: this.state.appointmentId,
      staffTypeId: this.state.staffTypeId,
      isConfirmed: true,
    //   institutionOfQualification: this.state.institutionOfQualification || "",
    //   year: this.state.year || 0,
    //   qualificationId: this.state.qualificationId,
      salaryCategoryId: this.state.selectedSalaryCategory,
      salaryLevelId: this.state.selectedSalaryLevel,
      salaryStepId: this.state.selectedSalaryStep
    };

    postData("/Staff/GenerateStaffNumber", newStaff, data => {
      console.log(data, "Sent Object")

      if(data > 0){
        currentState.setState({
          spin: false,
          staffAdd: true,
          redirect:true,
          crearedStaffId: data
          
        });
        // this.props.closeToggle()

      }else{
        currentState.setState({
          spin: false,
          errorCard:true
        });
      }
    })

  };
  closeAdd = () => {
    this.setState({
      staffAdd: false,
    });
  };

  getSalaryCategory = () => {
    fetchData("/SalaryGradeCategory", data => {
      this.setState({salaryCategory:data})
    })
  }

  getSalaryLevel= () => {
    fetchData("/SalaryLevel", data => {
      this.setState({salaryLevel:data})
    })
  }

  getSalaryStep= () => {
    fetchData("/SalaryStep", data => {
      this.setState({salaryStep:data})
    })
  }

  componentDidMount() {
    this.getSalaryCategory();
    this.getSalaryLevel();
    this.getSalaryStep();
    this.loadStaffCategory();
    this.loadStaffCadre();
    this.loadStaffType();
    this.loadUnit();
    this.loadReligion();
    this.loadAppointment();
    this.loadDepartment();
    this.loadRank();
    this.loadGender();
    this.loadLgas();
    this.loadStates();
    this.loadAppointmentType();
    this.loadMaritalStatus();
    this.loadeducationalQualifications();
  }
  closeErrorCard = () =>{
    this.setState({
      errorCard:false
    })
  }




  render() {
    if(this.state.redirect){
      return(
        <Redirect to={{
          pathname:"/CreatedProfilePreview",
          state:{
            passedId: this.state.crearedStaffId
          }
        }}/>
      )
    }
    return (
      <>



<Modal isOpen={this.state.errorCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">
             There was an error submitting form. <br/> This could have been caused by an unstable network. Kindly Refresh page and try again
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button className="ok-btn" color={"info"} onClick={this.closeErrorCard}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

        {/* {this.state.spin ? <SaveSpinner msg={"Saving..."} /> : null} */}

        <Modal isOpen={this.state.staffAdd}>
            <ModalBody>
              <ModalHeader className="text-secondary"></ModalHeader>

              <h3 className="text-center">Staff Account was created successfully!</h3>
            </ModalBody>
            <ModalFooter>
              <Button className="ok-btn" color={"info"} onClick={this.closeAdd}>
                OK
              </Button>
            </ModalFooter>
          </Modal>
          <div className="row mb-4 mt-4">
              <div className="col">
                <h1 className="d-inline-block mb-0 pop-font">
                 Generate Staff Number{" "}
                  <span className="h3 text-muted">/ New Staff Profile</span>
                </h1>

                <span className="text-sm d-block">
                  {/* Add New Staff */}
                </span>
              </div>

              <div className="col">
                
                <div>
                  <button
                    className="btn btn-primary btn-icon btn-sm float-right mr-3 mt-2"
                    type="button"
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-file" />
                    </span>
                    <Link to={{ pathname: "/UploadStaffList" }} style={{color:"white"}}>
                      <span className="btn-inner--text"> Upload Staff List</span>
                    </Link>
                  </button>
                </div>
              </div>
           
           
            </div>

          <div className="row justify-content-center" style={{paddingBottom:"10px"}}>
            <div className="card col-md-8">

          <form name="staffForm" onSubmit={(e) => this.handleCreateStaff(e)}>
            {/* <div className="modal-content mdal2"> */}
             

              {/* <ModalHeader className="text-secondary">
                Create New Staff
              </ModalHeader> */}
           
                
              <div className="row card-body">
              <div className="col-md-12">
                  <div className="form-group">
                  <h2>Personal Information</h2>
                  <p className="text-warning"><b>Fields marked with (*) are required fields</b></p>

                  </div>
                </div>
             
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="surname"
                      onChange={(e) => {
                        this.setState({ surname: e.target.value });
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
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstname"
                      onChange={(e) => {
                        this.setState({ firstName: e.target.value });
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
                      Other Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="othername"
                      onChange={(e) => {
                        this.setState({ otherName: e.target.value });
                      }}
                    />
                  </div>
                </div>
       



                <div className="col-md-12">
                  <div className="form-group">
                  <h2>Staff Information</h2>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Staff Type
                    </label>
                    <select
                      className="form-control"
                      name="staffTypeId"
                      onChange={this.handleStaffType}
                    >
                      <option>Select Staff Type</option>
                      {this.state.staffTypes && this.state.staffTypes.length > 0
                        ? this.state.staffTypes.map((types) => {
                            return (
                              <option key={types.id} value={types.id}>
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
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Staff Category
                    </label>
                    <select
                      className="form-control"
                      name="categoryId"
                      onChange={this.handleStaffCategory}
                    >
                      <option>Select a Staff Category</option>
                      {this.state.staffCategories &&
                      this.state.staffCategories.length > 0
                        ? this.state.staffCategories.map((category) => {
                            return (
                              <option key={category.id} value={category.id}>
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
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Cadre
                    </label>
                    <select
                      className="form-control"
                      name="unitId"
                      onChange={this.handleUnit}
                    >
                      <option>Select Staff Cadre</option>
                      {this.state.units && this.state.units.length > 0
                        ? this.state.units.map((unit) => {
                            return (
                              <option key={unit.id} value={unit.id}>
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
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Department
                    </label>
                    <select
                      className="form-control"
                      name="departmentId"
                      onChange={this.handleDepartment}
                    >
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

                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Rank
                    </label>
                    <select
                      className="form-control"
                      name="rankId"
                      onChange={this.handleRank}
                    >
                      <option>Select an Rank</option>
                      {this.state.tiedRank && this.state.tiedRank.length > 0
                        ? this.state.tiedRank.map((rank) => {
                            return (
                              <option key={rank.id} value={rank.id}>
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
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Appointment
                    </label>
                    <select
                      className="form-control"
                      name="appointmentId"
                      onChange={this.handleAppointment}
                    >
                      <option>Select an Appointment</option>
                      {this.state.appointments &&
                      this.state.appointments.length > 0
                        ? this.state.appointments.map((appointment) => {
                            return (
                              <option
                                key={appointment.id}
                                value={appointment.id}
                              >
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
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Salary Category <span className="text-danger">**</span>
                    </label>
                    <select
                    name="salCat"
                      className="form-control"
                      onChange={(e)=>{this.setState({selectedSalaryCategory: parseInt(e.target.value)})}}
                    >
                      <option>Select Salary Category</option>
                      {this.state.salaryCategory &&
                      this.state.salaryCategory.length > 0
                        ? this.state.salaryCategory.map((salCat) => {
                            return (
                              <option
                                key={salCat.id}
                                value={salCat.id}
                              >
                                {salCat.name}
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
                      Salary Level <span className="text-danger">**</span>
                    </label>
                    <select
                    name="salLvl"
                      className="form-control"
                      onChange={(e)=>{this.setState({selectedSalaryLevel: parseInt(e.target.value)})}}

                    >
                      <option>Select Salary level</option>
                      {this.state.salaryLevel &&
                      this.state.salaryLevel.length > 0
                        ? this.state.salaryLevel.map((salLvl) => {
                            return (
                              <option
                                key={salLvl.id}
                                value={salLvl.id}
                              >
                                {salLvl.name}
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
                      Salary Step <span className="text-danger">**</span>
                    </label>
                    <select
                      name="salStp"

                      className="form-control"
                      onChange={(e)=>{this.setState({selectedSalaryStep: parseInt(e.target.value)})}}

                    >
                      <option>Select Salary Step</option>
                      {this.state.salaryStep &&
                      this.state.salaryStep.length > 0
                        ? this.state.salaryStep.map((step) => {
                            return (
                              <option
                                key={step.id}
                                value={step.id}
                              >
                                {step.name}
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
                      Appointment Type <span className="text-danger">**</span>
                    </label>
                    <select
                    id="appType"
                      className="form-control"
                      name="appointmentTypeId"
                      onChange={this.handleAppointmentType}
                    >
                      <option>Select Appointmen Type</option>
                      {this.state.appointmentType &&
                      this.state.appointmentType.length > 0
                        ? this.state.appointmentType.map((appType) => {
                            return (
                              <option key={appType.id} value={appType.id}>
                                {appType.name}
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
                      Date of Assumption <span className="text-danger">**</span>
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="confirmation"
                      onChange={(e) => {
                        this.setState({ dateOfConfirmation: e.target.value });
                      }}
                    />
                  </div>
                </div>

              

                <div className="col-md-12">
                  <div className="form-group">
                <button
                id="btt"
                  type="submit"
                  //   onClick={this.props.closeToggle}
                  data-dismiss="modal"
                  className="btn btn-primary"
                >
          {this.state.spin ? 
          <MetroSpinner
          size={40}
          color={"white"}
          loading={this.state.loading}
          
          
        />  
        : "Submit"}
                  
                </button>
              </div>
              </div>
              </div>
              
            {/* </div> */}
          </form>
          </div>
          </div>

      </>
    );
  }
}
export default CreateStaffForm;
