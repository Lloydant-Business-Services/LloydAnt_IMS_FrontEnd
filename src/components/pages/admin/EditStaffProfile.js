import React, { Component } from "react";
import { render } from "react-dom";
import { fetchData, postData, editData, deleteData, URL, editDataWithPatch } from "../../../utils/crud";
// import { navigate } from "gatsby"
import axios from "axios";
// import Spinner from "./Spinner"
import { Link, Redirect } from "react-router-dom";
import Layout from "../../layout";
import SideBar from "../../NewSideBar";
import AdminFooter from "../admin/AdminFooter";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";

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
  Alert,
} from "reactstrap";

class EditApplicantProfile extends Component {
  state = {
    editStaff: {
      newStaff: {
        personId: this.props.location.state?.data.id,
        staffNumber: this.props.location.state?.data.staffNumber,
        generatedStaffNumber: "",
        person: {
          imageUrl: null,
          surname: this.props.location.state?.data.person.surname,
          firstname: this.props.location.state?.data.person.firstname,
          othername: this.props.location.state?.data.person.othername,
          birthDay: this.props.location.state?.data.person.birthDay,
          email: this.props.location.state?.data.person.email,
          address: this.props.location.state?.data.person.address,
          phoneNumber: this.props.location.state?.data.person.phoneNumber,
          stateId: null,
          lgaId: this.props.location.state?.data.person.lgaId,
          maritalStatusId: this.props.location.state?.data.person
            .maritalStatusId,
          religionId: this.props.location.state?.data.person.religionId,
          genderId: this.props.location.state?.data.person.genderId,
          state: null,
          lga: null,
          maritalStatus: null,
          religion: null,
          gender: null,
          personEducations: null,
          personProfessionalBodies: null,
          personJournals: null,
          personExperiences: null,
          personResearchGrants: null,
          personCertifications: null,
          personReferees: null,
          id: 0,
        },
        rankId: this.props.location.state?.data.rankId,
        departmentId: this.props.location.state?.data.departmentId,
        appointmentId: this.props.location.state?.data.appointmentId,
        rank: {
          name: "",
          active: true,
          institutionUnitId: 0,
          institutionUnit: {
            name: "",
            active: true,
            id: 0,
          },
          gradeLevel: "",
          id: 0,
        },
        department: {
          name: "",
          active: true,
          id: 2,
        },
        appointment: null,
        staffTypeId: this.props.location.state?.data.staffTypeId,
        staffType: {
          name: "",
          active: true,
          id: 0,
        },
        categoryId: this.props.location.state?.data.categoryId || 0,
        category: {
          name: "",
          active: false,
          id: 0,
        },
        active: true,
        retirementReason: null,
        appointmentIsConfirmed: true,
        appointmentDate: "2020-06-17T00:00:00",
        dateOfRegularization: null,
        dateOfConfirmation: "2020-06-08T00:00:00",
        appointmentTypeId: 0,
        appointmentType: {
          name: "",
          active: true,
          id: 0,
        },
        id: 0,
      },
      personEducations: [
  
      ],
    },

    staff: this.props.location.state?.data,
    staffId: this.props.location.state?.data.id,
    compoTitle: this.props.location.state?.compoTitle,
    msg: this.props.location.msg,
    loading: false,
    staffDto: "",
    // educationState:""
    // errorCard:true
  };

  educationMapper = () => {};

  isValidInputs = () => {
    var phoneno = /\d{11}$/;
    if (this.state.staff.person.phoneNumber === null) {
      this.setState({
        confirmRegularization: false,
      });
      alert("Enter a valid Phone Number");
      return false;
    }

    // return true
  };

  updatePersonItem = (index, value) => {
    const { staff } = this.state;
    staff.staffDto[index] = value;
    this.setState({ ...this.state, staff });
  };

  // updatePersonItem = (index, value) => {
  //   const { staff } = this.state
  //   staff.editStaff[index] = value
  //   this.setState({ ...this.state, staff })
  // }

  updateStaff = (property, value) => {
    let state = this.state.editStaff.newStaff.person;
    this.setState({
      ...this.state,
      ...(state[property] = value),
    });
  };

  updateStaffDetails = (property, value) => {
    let state = this.state.editStaff.newStaff;
    this.setState({
      ...this.state,
      ...(state[property] = value),
    });
  };

  loadStates = () => {
    fetchData("/States", (data) => {
      this.setState({ states: data });
    });
  };

  handleStateOfOrigin = (e) => {
    this.setState({
      stateOfOriginId: parseInt(e.target.value),
    });

    setTimeout(() => {
      fetchData(`/Lgas/byStateId?id=${this.state.stateOfOriginId}`, (data) => {
        this.setState({
          filteredLGA: data,
        });
      });
      console.log(this.state.filteredLGA, "Filtered!!");
    }, 2000);
  };
  handleLGA = (e) => {
    this.setState({
      selectedLGA: parseInt(e.target.value),
    });
  };
  handleReligion = (e) => {
    this.setState({
      religionId: parseInt(e.target.value),
    });
  };
  handleMaritalStatus = (e) => {
    this.setState({
      maritalStatusId: parseInt(e.target.value),
    });
  };
  handleGender = (e) => {
    this.setState({
      genderId: parseInt(e.target.value),
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
  loadeducationalQualifications = () => {
    fetchData("/EducationalQualifications", (data) => {
      this.setState({ educationalQualifications: data });
    });
  };
  loadStaffCategory = () => {
    fetchData("/InstitutionStaffCategories", (data) => {
      this.setState({ staffCategories: data });
    });
  };

  loadStaff = () => {
    fetchData(`/Staff/GetStaffUpdate?id=${this.state.staff.id}`, (data) => {
      let mappedEducation = data.personEducations.map((s, index) => {
        return {
          id: s.id,
          institutionName: s.institutionName,
          courseOfStudy: s.courseOfStudy,
          year: s.year,
          qualificationId: s.qualificationId,
        };
      });
      var mee = JSON.stringify(mappedEducation);

      console.log(mappedEducation, "Educations");
      console.log(mee, "MEEEEE");

      this.setState({
        educationState: mappedEducation,
        educationStateId: mappedEducation[0].id,
        mappedQualificationId: mappedEducation[0].qualificationId,
        main: data,
      });

    
      setTimeout(() => {
        // console.log(this.state.editStaff.personEducations, "pushed")

        console.log(this.state.educationState, "Educations State");
        console.log(this.state.educationStateId, "Educations State ID!!!");
        console.log(this.state.mappedQualificationId, "Qualification ID!!!");

      
      }, 3000);

      setTimeout(() => {
        console.log(this.state.educationState, "New fetch Staff!!!!!!!!!");
        console.log(data, " StaffoooO!!!!");
      }, 5000);
    });
  };

  updateForm = () => {
    let newState = this;
    this.setState({
      loading: true,
      confirmRegularization: false,
      confirmRegularization2: false,
    });
    let updateState = this.state.editStaff.newStaff.person;
    let updateState1 = this.state.editStaff.newStaff;

    let updatedStaff = {
      staff: {
        personId: this.state.staffId,
        staffNumber: updateState1.staffNumber,
        generatedStaffNumber: this.state.staff.generatedStaffNumber,
        person: {
          imageUrl: null,
          surname: updateState.surname,
          firstname: updateState.firstname,
          othername: updateState.othername,
          birthDay: updateState.birthDay,
          email: updateState.email,
          address: updateState.address,
          phoneNumber: updateState.phoneNumber,
          stateId: null,
          lgaId: parseInt(updateState.lgaId),
          maritalStatusId: parseInt(updateState.maritalStatusId),
          religionId: parseInt(updateState.religionId),
          genderId: parseInt(updateState.genderId),
          state: null,
          lga: null,
          maritalStatus: null,
          religion: null,
          gender: null,
          personEducations: null,
          personProfessionalBodies: null,
          personJournals: null,
          personExperiences: null,
          personResearchGrants: null,
          personCertifications: null,
          personReferees: null,
          id: parseInt(this.state.staffId),
        },
        rankId: parseInt(updateState1.rankId),
        departmentId: parseInt(updateState1.departmentId),
        appointmentId: parseInt(updateState1.appointmentId),
        rank: {
          name: "null",
          active: true,
          institutionUnitId: parseInt(updateState1.rank.institutionUnitId),
          institutionUnit: {
            name: "",
            active: true,
            id: parseInt(updateState1.rank.institutionUnitId),
          },
          gradeLevel: "",
          id: 0,
        },
        department: {
          name: "",
          active: true,
          id: 0,
        },
        appointment: null,
        staffTypeId: parseInt(updateState1.staffTypeId) || 2,
        staffType: {
          name: "",
          active: true,
          id: parseInt(updateState1.staffTypeId) || 2,
        },
        categoryId: parseInt(updateState1.categoryId) || 1,
        category: {
          name: "",
          active: true,
          id: parseInt(updateState1.categoryId) || 1,
        },
        active: true,
        retirementReason: null,
        appointmentIsConfirmed: true,
        appointmentDate: "2020-06-17T00:00:00",
        dateOfRegularization: null,
        dateOfConfirmation: "2020-06-08T00:00:00",
        appointmentTypeId: 1,
        appointmentType: {
          name: "Regular",
          active: true,
          id: 1,
        },
        id: this.state.staffId,
      },
      personEducations: [
        {
          id: parseInt(this.state.educationStateId) || 0,
          personId: parseInt(this.state.staffId),
          qualificationId: parseInt(this.state.qualiId) || this.state.mappedQualificationId,
          institutionName: "null",
          courseOfStudy: "null",
          year: 0,
        },
      ],
    };

    axios({
      method: "PATCH",
      url: URL + `/Staff/PostStaffUpdate?id=${this.state.staffId}`,
      data: updatedStaff,
      config: {
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-credentials": "true",
          // "access-control-allow-origin": "http://97.74.6.243",
        },
      },
    })
      .then((res) => {
        newState.setState({
          upd: true,
          loading: false,
        });
        newState.componentDidMount();
        console.log(res, "Response");
      })
      .catch((err) => {
        newState.setState({
          loading: false,
          errorCard: true,
        });
        // alert("Error Submitting Form")

        console.log(err);
      });
  };

  updateStaffItem = (index, value) => {
    const { staff } = this.state;
    staff[index] = value;
    this.setState({ ...this.state, staff });
  };

  handleRegularization2 = (e) => {
    e.preventDefault();
    this.setState({
      spin: true,
      confirmRegularization: false,
    });

  



    const newState = this;

    // const regStaff = {
    //   staffId: parseInt(this.state.staff.id),
    //   appointmentTypeId: 1,
    // };

    let updateState = this.state.editStaff.newStaff.person;
    let updateState1 = this.state.editStaff.newStaff;

    
    let updatedStaff = {
      staff: {
        personId: this.state.staffId,
        staffNumber: updateState1.staffNumber,
        generatedStaffNumber: this.state.staff.generatedStaffNumber,
        person: {
          imageUrl: null,
          surname: updateState.surname,
          firstname: updateState.firstname,
          othername: updateState.othername,
          birthDay: updateState.birthDay,
          email: updateState.email,
          address: updateState.address,
          phoneNumber: updateState.phoneNumber,
          stateId: null,
          lgaId: parseInt(updateState.lgaId),
          maritalStatusId: parseInt(updateState.maritalStatusId),
          religionId: parseInt(updateState.religionId),
          genderId: parseInt(updateState.genderId),
          state: null,
          lga: null,
          maritalStatus: null,
          religion: null,
          gender: null,
          personEducations: null,
          personProfessionalBodies: null,
          personJournals: null,
          personExperiences: null,
          personResearchGrants: null,
          personCertifications: null,
          personReferees: null,
          id: parseInt(this.state.staffId),
        },
        rankId: parseInt(updateState1.rankId),
        departmentId: parseInt(updateState1.departmentId),
        appointmentId: parseInt(updateState1.appointmentId),
        rank: {
          name: "null",
          active: true,
          institutionUnitId: parseInt(updateState1.rank.institutionUnitId),
          institutionUnit: {
            name: "",
            active: true,
            id: parseInt(updateState1.rank.institutionUnitId),
          },
          gradeLevel: "",
          id: 0,
        },
        department: {
          name: "",
          active: true,
          id: 0,
        },
        appointment: null,
        staffTypeId: parseInt(updateState1.staffTypeId) || 2,
        staffType: {
          name: "",
          active: true,
          id: parseInt(updateState1.staffTypeId) || 2,
        },
        categoryId: parseInt(updateState1.categoryId) || 3,
        category: {
          name: "",
          active: true,
          id: parseInt(updateState1.categoryId) || 3,
        },
        active: true,
        retirementReason: null,
        appointmentIsConfirmed: true,
        appointmentDate: "2020-06-17T00:00:00",
        dateOfRegularization: null,
        dateOfConfirmation: "2020-06-08T00:00:00",
        appointmentTypeId: 1,
        appointmentType: {
          name: "Regular",
          active: true,
          id: 1,
        },
        id: this.state.staffId,
      },
      personEducations: [
        {
          id: parseInt(this.state.educationStateId) || 0,
          personId: parseInt(this.state.staffId),
          qualificationId: parseInt(this.state.qualiId) || this.state.mappedQualificationId,
          institutionName: "null",
          courseOfStudy: "null",
          year: 0,
        },
      ],
    };

    editDataWithPatch(`/Staff/PostStaffUpdate?id=${this.state.staffId}`, updatedStaff, data => {
          console.log(data, "Patch!!")
      const regStaff = {
        staffId: parseInt(this.state.staff.id),
        appointmentTypeId: 1,
      };
  
  
      editData("/Staff/RegularizeStaff", regStaff, data => {
        if(data == 200){
          newState.setState({
            staffRegu: true,
            spinn: false,
          });
        }else{
          newState.setState({
            spinn: false,
          });
          // alert("Error Submitting Form")
          newState.setState({
            errorCard: true,
          });

        }
      })
  
      // axios({
      //   method: "PUT",
      //   url: URL + "/Staff/RegularizeStaff",
      //   data: regStaff,
      //   config: {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   },
  
        
      // })
      //   .then((res) => {
      //     newState.componentDidMount();
         
  
      //     newState.setState({
      //       staffRegu: true,
      //       spinn: false,
      //     });
      //     console.log(res, "Response");
      //   })
      //   .catch((err) => {
      //     newState.setState({
      //       spinn: false,
      //     });
      //     newState.setState({
      //       errorCard: true,
      //     });
      //     console.log(err);
      //   });

    })

    
   
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
  showConfirmCard = () => {
    this.setState({
      confirmRegularization: true,
    });
  };
  closeExistToggle = () => {
    this.setState({
      confirmRegularization: false,
    });
  };
  closeReg = () => {
    this.setState({
      staffRegu: false,
      confirmRegularization: false,
      upd: false,
    });
  };

  pushMethod = () => {
    this.state.editStaff.personEducations.push({
      id: 0,
      personId: 0,
      qualificationId: this.state.qualiId,
      institutionName: this.state.institutionOfQualification,
      courseOfStudy: this.state.courseOfStudyPick,
      year: this.state.yearNew,
    });

    alert("Added");
    var dis = document.getElementById("boot");
    dis.setAttribute("disabled", true);
    setTimeout(() => {
      console.log(this.state.editStaff.personEducations, "EditStaff");
    }, 3000);

    let mapEdu = this.state.editStaff.personEducations.map((a, i) => {
      return {
        instName: a.institutionName,
        courseOfStudy: a.courseOfStudy,
        year: a.year,
        qualificationId: a.qualificationId,
      };
    });

    console.log(mapEdu, "MEEEEEE!!!!!");
    this.setState({
      mappedEdu: mapEdu,
    });
  };

  handleQualificationId = (e) => {
    this.setState({
      qualiId: parseInt(e.target.value),
      realId: this.state.educationState,
    });
    setTimeout(() => {
      console.log(this.state.realId, "Real!!!!sss");
    }, 2000);
  };

  handleYear = (e) => {
    this.setState({
      yearNew: parseInt(e.target.value),
    });
  };

  showConfirmCard2 = () => {
    this.setState({
      confirmRegularization2: true,
    });
  };

  componentDidMount() {
    if (!localStorage.getItem("userData")) {
      this.setState({
        userRedirect: true,
      });
    }else{
      setTimeout(() => {
        console.log(this.state.staff, "Transfered Staff!!!");
        console.log(this.state.staffId, "StaffIDDDD!!!");
  
        fetchData(
          `/EducationalQualifications/${this.state.mappedQualificationId}`,
          (data) => {
            console.log(data, "Qualification Query");
          }
        );
      }, 3000);
  
      this.loadStaff();
  
      if (this.state.staff.rank?.id > 0) {
        this.setState({
          institutionUnitId: this.state.staff.rank.institutionUnitId,
        });
        fetchData(
          `/InstitutionRanks/GetInstitutionRankBy?unitId=${this.state.staff.rank.institutionUnitId}`,
          (data) => {
            console.log(data, "filtered!!");
  
            this.setState({
              tiedRank: data,
            });
          }
        );
      }
  
      if (this.state.staff.person?.lgaId > 0) {
        this.setState({
          stateId: this.state.staff.person.lga.stateId,
        });
        fetchData(
          `/Lgas/byStateId?id=${this.state.staff.person.lga.stateId}`,
          (data) => {
            console.log(data, "filtered!!");
  
            this.setState({
              filteredLGA: data,
            });
          }
        );
      }
  
      console.log(this.state.staff, "WWWW!!");
      console.log(this.state.compoTitle, "Compo!!");
      this.loadStates();
      this.loadLgas();
      this.loadMaritalStatus();
      this.loadGender();
      this.loadRank();
      this.loadDepartment();
      this.loadAppointment();
      this.loadUnit();
      this.loadStaffType();
      this.loadStaffCategory();
      this.loadeducationalQualifications();
    }

    
  }

  closeErrorCard = () => {
    this.setState({
      errorCard: false,
    });
  };
  closeExistToggle = () => {
    this.setState({
      confirmRegularization2: false,
      confirmRegularization: false,
    });
  };
  addNewRow = () => {
    this.setState({
      addEducation: true,
    });
  };

  loadeducationalQualifications = () => {
    fetchData("/EducationalQualifications", (data) => {
      this.setState({ qualifications: data });
    });
  };

  handleRegularization = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      confirmRegularization2: false,
    });
    const newState = this;

    const regStaff = {
      staffId: parseInt(this.state.staff.id),
      appointmentTypeId: 1,
    };

    editData("/Staff/RegularizeStaff", regStaff, data => {
      if(data == 200){
        newState.updateForm();

        newState.setState({
          staffRegu: true,
          spinn: false,
        });
      }else{
        newState.setState({
          spinn: false,
        });
        // alert("Error Submitting Form")
        newState.setState({
          errorCard: true,
        });

      }
    })

    // axios({
    //   method: "PUT",
    //   url: "http://97.74.6.243/litehr/api/Staff/RegularizeStaff",
    //   data: regStaff,
    //   config: {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    // })
    //   .then((res) => {
    //     newState.componentDidMount();
    //     if (res.status == 200 || res.status == 204) {
    //       newState.setState({
    //         staffRegu: true,
    //         loading: false,
    //       });
    //       newState.updateForm();
    //       console.log(res, "Response");
    //     }
    //   })
    //   .catch((err) => {
    //     newState.setState({
    //       loading: false,
    //       errorCard: true,
    //     });
    //     console.log(err);
    //   });
  };

  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <div>
        <Modal isOpen={this.state.errorCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">
              There was an error submitting form. <br /> This could have been
              caused by an unstable network. Kindly Refresh page and try again
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"info"}
              onClick={this.closeErrorCard}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        {/* {this.state.spinn ? <Spinner/> : null} */}
        <Modal isOpen={this.state.staffRegu} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">
              Staff Regularization was Successful!
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button className="ok-btn" color={"info"} onClick={this.closeReg}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.upd} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">Staff Update was Successful!</h3>
          </ModalBody>
          <ModalFooter>
            <Button className="ok-btn" color={"info"} onClick={this.closeReg}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.confirmRegularization2} className="mdal">
          <ModalBody>
            <ModalHeader id="clBtn" className="text-secondary">
              <Button onClick={this.closeExistToggle}>X</Button>
            </ModalHeader>

            <form>
              <b>How do you wish to proceed?</b>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"info"}
              onClick={() => this.updateForm()}
            >
              Save Update
            </Button>
            <Button
              className="ok-btn"
              color={"primary"}
              onClick={(e) => this.handleRegularization(e)}
            >
              Save and Regularize
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.errorCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">
              There was an error submitting form. <br /> This could have been
              caused by an unstable network. Kindly Refresh page and try again
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"info"}
              onClick={this.closeErrorCard}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        {/* {this.state.spinn ? <Spinner /> : null} */}
        <Modal isOpen={this.state.upd} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">Staff Update was Successful!</h3>
          </ModalBody>
          <ModalFooter>
            <Button className="ok-btn" color={"info"} onClick={this.closeReg}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.confirmRegularization} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <form>
              <b>Are you sure?</b>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"success"}
              onClick={() => this.updateForm()}
            >
              Confirm
            </Button>
            <Button
              className="ok-btn"
              color={"danger"}
              onClick={this.closeExistToggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* <SideBar/> */}

        {/* <div id="dashboard">
        



        <div class="dashboard-content"> */}
        <h1>Edit Staff Profile</h1>

        {/* edit here */}
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-bottom">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Last Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="surname"
                        defaultValue={this.state.staff?.person.surname}
                        // onChange={e => {
                        //   this.updatePersonItem("surname", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("surname", el.target.value)
                        }

                        // onChange={e => {
                        //   this.updatePersonItem("surname", e.target.value)
                        // }}

                        // onChange={(e) => {
                        //   this.setState({ surname: e.target.value });
                        // }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
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
                        name="firstname"
                        defaultValue={this.state.staff?.person.firstname}
                        // onChange={e => {
                        //   this.updatePersonItem("firstname", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("firstname", el.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Other Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="othername"
                        defaultValue={this.state.staff?.person.othername}
                        // onChange={e => {
                        //   this.updatePersonItem("othername", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("othername", el.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Date of birth
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        name="birthDay"
                        defaultValue={
                          this.state.staff?.person.birthDay
                            ? this.state.staff?.person.birthDay.substring(0, 10)
                            : ""
                        }
                        // onChange={e => {
                        //   this.updatePersonItem("birthDay", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("birthDay", el.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Email Address
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        required
                        name="email"
                        defaultValue={this.state.staff?.person.email}
                        // onChange={e => {
                        //   this.updatePersonItem("email", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("email", el.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Phone
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        name="phoneNumber"
                        defaultValue={this.state.staff?.person.phoneNumber}
                        onChange={(e) => {
                          this.updateStaff("phoneNumber", e.target.value);
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
                        Contact Address
                      </label>
                      <textarea
                        className="form-control"
                        type="text"
                        name="address"
                        defaultValue={this.state.staff?.person.address}
                        onChange={(el) =>
                          this.updateStaff("address", el.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        State of Origin
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleStateOfOrigin}
                        required
                      >
                        <option>Select a state</option>
                        {this.state.states && this.state.states.length > 0
                          ? this.state.states.map((state) => {
                              return (
                                <option
                                  key={state.id}
                                  selected={state.id == this.state.stateId}
                                  value={state.id}
                                >
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
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Local Government Area
                      </label>
                      <select
                        className="form-control"
                        name="lgaId"
                        // onChange={e => {
                        //   this.updatePersonItem(
                        //     "lgaId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        // onChange={this.handleLGA}
                        onChange={(el) =>
                          this.updateStaff("lgaId", el.target.value)
                        }
                        required
                      >
                        <option>Select a Local Government</option>
                        {this.state.filteredLGA &&
                        this.state.filteredLGA.length > 0
                          ? this.state.filteredLGA.map((lga) => {
                              return (
                                <option
                                  key={lga.id}
                                  selected={
                                    lga.id == this.state.staff.person.lgaId
                                  }
                                  value={lga.id}
                                >
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
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Gender
                      </label>
                      <select
                        className="form-control"
                        name="gender"
                        // onChange={e => {
                        //   this.updatePersonItem(
                        //     "genderId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        onChange={(el) =>
                          this.updateStaff("genderId", el.target.value)
                        }
                      >
                        <option>Select a Gender</option>
                        {this.state.genders && this.state.genders.length > 0
                          ? this.state.genders.map((gender) => {
                              return (
                                <option
                                  key={gender.id}
                                  selected={
                                    gender.id ==
                                    this.state.staff.person.genderId
                                  }
                                  value={gender.id}
                                >
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
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Relationship Status
                      </label>
                      <select
                        className="form-control"
                        name="maritalStatusId"
                        // onChange={e => {
                        //   this.updatePersonItem(
                        //     "maritalStatusId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        onChange={(el) =>
                          this.updateStaff("maritalStatusId", el.target.value)
                        }
                      >
                        <option>Select a Relationship Status</option>
                        {this.state.maritalStatus &&
                        this.state.maritalStatus.length > 0
                          ? this.state.maritalStatus.map((status) => {
                              return (
                                <option
                                  key={status.id}
                                  selected={
                                    status.id ==
                                    this.state.staff.person.maritalStatusId
                                  }
                                  value={status.id}
                                >
                                  {status.name}
                                </option>
                              );
                            })
                          : null}
                      </select>
                    </div>
                  </div>

                  {/* <div className="col-md-12">
                  <div className="form-group">
                    <h2>Educational Qualification</h2>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <table className="table table-striped" >
                      <th>Institution Name</th>
                      <th>Course of Study</th>
                      <th>Year Obtained</th>
                   {this.state.educationState && this.state.educationState.map((i,s) =>{
                     return(
                       <tr >
                     <td><h4>{i.institutionName}</h4></td>
                     <td><h4>{i.courseOfStudy}</h4></td>
                     <td><h4>{i.year}</h4></td>

                     </tr>
                     )
                   })}
                   </table>
                  </div>
                  <table className="table table-striped" >
                  {this.state.mappedEdu && this.state.mappedEdu.map((w, p)=>{
                    return(
                      <tr>
                    <td>-</td>
                    <td>{w.instName} </td>
                   <td>{w.courseOfStudy}</td>
                   <td>{w.year}</td>
                     </tr>

                    )
                  })}
                  </table>
                  <div className="col-md-6">
            <button
              className="btn btn-icon btn-3 btn-primary btn-sm"
              type="button"
              onClick={this.addNewRow}
            >
              <span className="btn-inner--icon">
                <i className="fa fa-plus" />
              </span>
              <span className="btn-inner--text">Add qualification</span>
            </button>
          </div>
                </div> */}

                  {/* <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Institution Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      required
                      name="institutioName"
                      onChange={(e) => {
                        this.setState({ institutionOfQualification: e.target.value });
                      }}
                    
                      
                    />
                  </div>
                </div> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Highest Qualification Obtained
                      </label>
                      <select
                        className="form-control"
                        name="staffTypeId"
                        onChange={this.handleQualificationId}
                      >
                        <option>Select Qualification</option>
                        {this.state.qualifications &&
                        this.state.qualifications.length > 0
                          ? this.state.qualifications.map((types) => {
                              return (
                                <option
                                  key={types.id}
                                  value={types.id}
                                  selected={
                                    types.id == this.state.mappedQualificationId
                                  }
                                >
                                  {types.name}
                                </option>
                              );
                            })
                          : null}
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Course of Study
                    </label>
                    <input

                    required
                      className="form-control"
                      type="text"
                      name="Course of Study"
                      onChange={(e) => {
                        this.setState({ courseOfStudy: e.target.value });
                      }}
                    />
                  </div>
                </div> */}

                  {/* <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Year Obtained
                    </label>
                    <input
                    required
                      className="form-control"
                      type="text"
                      name="Course of Study"
                      onChange={(e) => {
                        this.setState({ yearNew: e.target.value });
                      }}
                    />
                  </div>
                </div> */}

                  {/* <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Year Obtained
                    </label>
                    <select
                      className="form-control"
                      name="Year"
                      onChange={
                     this.handleYear}
                    >
                      <option>Select Year</option>
                      <option value="2015">2015</option>
                      <option>2016</option>
                      <option>2017</option>
                      <option>2018</option>
                      <option>2019</option>
                      <option>2020</option>
                    
                      
                    </select>
                  </div>
                </div> */}
                  {/* <button className="btn btn-success" id="boot" onClick={this.pushMethod}>Add</button> */}

                  {/* <button className="btn btn-primary-sm">Add Educational Qualification</button> */}

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
                        // onChange={e => {
                        //   this.updateStaffItem(
                        //     "staffTypeId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        onChange={(el) =>
                          this.updateStaffDetails(
                            "staffTypeId",
                            el.target.value
                          )
                        }
                      >
                        <option>Select Staff Type</option>
                        {this.state.staffTypes &&
                        this.state.staffTypes.length > 0
                          ? this.state.staffTypes.map((types) => {
                              return (
                                <option
                                  key={types.id}
                                  selected={
                                    types.id == this.state.staff.staffTypeId
                                  }
                                  value={types.id}
                                >
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
                        // onChange={e => {
                        //   this.updateStaffItem(
                        //     "categoryId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        onChange={(el) =>
                          this.updateStaffDetails("categoryId", el.target.value)
                        }
                      >
                        <option>Select a Staff Category</option>
                        {this.state.staffCategories &&
                        this.state.staffCategories.length > 0
                          ? this.state.staffCategories.map((category) => {
                              return (
                                <option
                                  key={category.id}
                                  selected={
                                    category.id == this.state.staff.categoryId
                                  }
                                  value={category.id}
                                >
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
                                <option
                                  key={unit.id}
                                  selected={
                                    unit.id == this.state.institutionUnitId
                                  }
                                  value={unit.id}
                                >
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
                        onChange={(el) =>
                          this.updateStaffDetails(
                            "departmentId",
                            el.target.value
                          )
                        }
                      >
                        <option>Select a Department</option>
                        {this.state.departments &&
                        this.state.departments.length > 0
                          ? this.state.departments.map((department) => {
                              return (
                                <option
                                  key={department.id}
                                  selected={
                                    department.id ==
                                    this.state.staff.departmentId
                                  }
                                  value={department.id}
                                >
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
                        onChange={(el) =>
                          this.updateStaffDetails("rankId", el.target.value)
                        }
                      >
                        <option>Select an Rank</option>
                        {this.state.tiedRank && this.state.tiedRank.length > 0
                          ? this.state.tiedRank.map((rank) => {
                              return (
                                <option
                                  key={rank.id}
                                  selected={rank.id == this.state.staff.rankId}
                                  value={rank.id}
                                >
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
                        onChange={(el) =>
                          this.updateStaffDetails(
                            "appointmentId",
                            el.target.value
                          )
                        }
                      >
                        <option>Select an Appointment</option>
                        {this.state.appointments &&
                        this.state.appointments.length > 0
                          ? this.state.appointments.map((appointment) => {
                              return (
                                <option
                                  key={appointment.id}
                                  selected={
                                    appointment.id ==
                                    this.state.staff.appointmentId
                                  }
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
                        Staff Number
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="staffNumber"
                        defaultValue={this.state.staff?.staffNumber}
                        onChange={(e) => {
                          this.updateStaffDetails(
                            "staffNumber",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <MetroSpinner
                  size={40}
                  color={"blue"}
                  loading={this.state.loading}
                />

                {!this.state.loading && this.state.compoTitle == "Staff" ? (
                  <div>
                    {" "}
                    <button
                      type="button"
                      onClick={this.showConfirmCard}
                      data-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                    <Link to={"/Staff"} className="btn btn-info">
                      Back
                    </Link>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <button
                      type="button"
                      onClick={this.showConfirmCard2}
                      data-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                    <Link to={"/Staff"} className="btn btn-info">
                      Back
                    </Link>
                  </div>
                )}
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>

        {/* </div>
      </div> */}
        <div>
          {/* {this.state.educationState && this.state.educationState.map((t,p)=>{
          return(
                   <input id="eduId" hidden type="text" value={t.id}/>

          )
        })} */}

          {/* <input id="eduId" type="text" value={0}/> */}
        </div>
        {/* <AdminFooter/> */}
      </div>
    );
  }
}

export default EditApplicantProfile;
