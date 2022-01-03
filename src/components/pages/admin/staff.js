import React from "react";
import { fetchData, postData, editData, URL } from "../../../utils/crud";
import _ from "lodash";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import Layout from "../../layout";
import HrDataTable from "./HrDataTable";
import axios from "axios";
import SaveSpinner from "./SaveSpinner";
import CreateStaffForm from "./CreateStaffForm";
import SideBar from "../../NewSideBar";
import AdminFooter from "../admin/AdminFooter";
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
  Fade,
} from "reactstrap";

export default class Staff extends React.Component {
  state = {
    // spinn:true,
    spin: false,
    createStaff: false,
    staffAdd: false,
    lastname: "",
    firstname: "",
    othername: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
    departmentId: 0,
    unitId: 0,
    genderId: 0,
    appointmentTypeId: 0,
    contactAddress: "",
    appointmentId: 0,
    staffCategoryId: 0,
    stateOfOriginId: 0,
    lgaId: 0,
    rankId: 0,
    staffCadreId: 0,
    staffNum: "",
    religionId: 0,
    relationshipId: 0,
    newID: "",
    spinner: true,
    editStaff: "",
    staffTypeId: 0,
    allStaff: [],
    allStaffSearch: [],

    staff: {
      staffNumber: "",
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
        relationshipId: 0,
        religionId: 0,
        genderId: 0,
        id: 0,
        staffTypeId: 0,
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
    searchText: "",
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

  setSelectedData = (data) => {
    const { staff } = this.state;
    staff.staffNumber = data.staffNumber;
    staff.person.surname = data.person.surname;
    staff.person.firstname = data.person.firstname;
    staff.person.othername = data.person.othername;
    staff.person.birthDay = data.person.birthDay.substring(0, 10);
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

    this.setState({ ...this.state, staff });
  };

  isValidInputs = () => {
    var phoneno = /^\d{11}$/;
    if (!this.state.staff.person.phoneNumber.match(phoneno)) {
      alert("Enter a valid Phone Number");
      return false;
    }

    return true;
  };

  submitForm = () => {
    postData("/Staff/AddSingleStaff", this.state.staff, (data) => {
      this.loadStaff();

      //Re-mount the component to force a reload
      this.componentDidMount();
    });
  };

  updateForm = () => {
    if (this.isValidInputs()) {
      editData(`/Staff/${this.state.staff.id}`, this.state.staff, (data) => {
        this.loadStaff();
      });
      this.loadStaff();

      //Force a reload of the current component
      this.componentDidMount();
    }
  };

  uploadStaffList = () => {
    // navigate("/app/admin/UploadStaffList")
  };

  createStaffToggle = () => {
    this.setState({
      createStaff: true,
    });
  };

  closeToggle = () => {
    this.setState({
      createStaff: false,
    });
  };

  filterStaff = () => {
    this.setState({
      spinn: true,
      queryCard:false,
      staffTypeCard:false,
      staffRank:false,
      combined:false
    });
    fetchData(
      `/Staff/GetStaffBy?departmentId=${this.state.departmentId}&staffTypeId=${this.state.staffTypeId}&rankId=${this.state.rankId}`,
      (data) => {
        setTimeout(() => {
          console.log(data);
        }, 2000);

        let mappedStaff = data.map((d, i) => {
          this.setState({
            newID: d.personId,
          });

          return {
            sn: i + 1,
            username: d.generatedStaffNumber,
            staffId: d.staffNumber,
            name: (
              <Link
                to={{ pathname: "/StaffProfile", state: { data: d } }}
                className="myLinks"
              >
                {d.person.surname} {d.person.firstname} {d.person.othername}
              </Link>
            ),

            email: d.person.email || "-",
            dob: new Date(d.person.birthDay).toDateString().slice(4),
            rank: d.rank?.name || "-",
            department: d.department?.name || "-",
            action: (
              <Link
                to={{
                  pathname: "/EditStaffProfile",
                  state: { data: d, compoTitle: "Staff" },
                }}
                className="btn btn-info btn-sm myLinks"
              >
                Edit
              </Link>
            ),
          };
        });
        setTimeout(() => {
          console.log(mappedStaff, "mapp!!!");
        }, 2000);
        this.setState({
          myStaff: mappedStaff,
          spinn: false,
          showDataTable: true,
          staffTypeId:0,
          rankId:0,
          departmentId:0
        });
      }
    );
  };

  componentDidMount() {
    if (!localStorage.getItem("userData")) {
      this.setState({
        userRedirect: true,
      });
    }

    fetchData("/InstitutionDepartments", (data) => {
      this.setState({
        institutionDepts: data,
      });

      console.log(this.state.institutionDepts, "Depts!!");
    });

    fetchData("/InstitutionRanks", (data) => {
      this.setState({
        institutionRank: data,
      });

      console.log(this.state.institutionCadre, "Cadres!!");
    });

    fetchData("/InstitutionStaffTypes", (data) => {
      this.setState({
        institutionStaffType: data,
      });

      console.log(this.state.institutionStaffType, "Satff Type!!");
    });
    this.setState({
      spinn: true,
    });

    fetchData("/Staff", data => {
      this.setState({
        newData: data,
        spinn:false
      })
      setTimeout(()=>{
        console.log(this.state.newData, "STAFF!!")
      },2000)
      let mappedStaff = data.map((d, i) => {
        this.setState({
          newID: d.personId,
        })

        return {
          sn: i + 1,
          username:d.generatedStaffNumber,
          staffId: d.staffNumber,
          name: (
            <Link to={{pathname:"/StaffProfile", state:{data:d} }}  className="myLinks">
              {d.person.surname} {d.person.firstname} {d.person.othername}
            </Link>
          ),

          email: d.person.email || "-",
          dob: new Date(d.person.birthDay).toDateString().slice(4),
          rank: d.rank?.name || "-",
          department: d.department?.name || "-",
          action: (
            <Link to={{pathname:"/EditStaffProfile", state:{data:d, compoTitle:"Staff"} }}  className="btn btn-info btn-sm myLinks">
                         Edit
          </Link>
          ),
        }
      })
      setTimeout(()=>{
      console.table(mappedStaff, "mapp!!!")

      },2000)
      this.setState({
        myStaff: mappedStaff,
      })

      this.setState({ allStaff: data, allStaffSearch: data })

    })

    setTimeout(() => {
      console.log(this.state.allStaff);
    }, 4000);
  }

  handleDepartment = (e) => {
    this.setState({
      departmentId: parseInt(e.target.value),
    });
  };


  handleStaffType = (e) => {
    this.setState({
      staffTypeId: parseInt(e.target.value),
    });
  };


  handleRank = (e) => {
    this.setState({
      rankId: parseInt(e.target.value),
    });
  };

  closeAdd = () => {
    this.setState({
      staffAdd: false,
    });
  };

  toggleCloseCard = () => {
    if(!this.state.queryCard){
      this.setState({
        queryCard:true,
      })
    }else{
      this.setState({
        queryCard:false,

      })
    }
  }


  toggleStaffTypeCard = () => {
    if(!this.state.staffTypeCard){
      this.setState({
        staffTypeCard:true,
      })
    }else{
      this.setState({
        staffTypeCard:false

      })
    }
  }

  toggleRankCard = () => {
    if(!this.state.staffRank){
      this.setState({
        staffRank:true,
      })
    }else{
      this.setState({
        staffRank:false

      })
    }
  }


  toggleCombinedCard = () => {
    if(!this.state.combined){
      this.setState({
        combined:true,
      })
    }else{
      this.setState({
        combined:false

      })
    }
  }
  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <>
        {this.state.spinn ? (
          <Spinner msg={"Loading Staff List, please wait..."} />
        ) : null}

        {/* <SideBar/>       */}

        <CreateStaffForm
          closeToggle={this.closeToggle}
          trigger={this.state.createStaff}
        />
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







        <Modal isOpen={this.state.queryCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary">Select Department</ModalHeader>
            <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Department:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleDepartment}
                        required
                      >
                        <option>Select Department</option>
                        {this.state.institutionDepts &&
                          this.state.institutionDepts.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
           
          </ModalBody>
          <ModalFooter>
            <Button
              // className="ok-btn"
              color={"info"}
              onClick={this.filterStaff}
            >
              Load Staff List
            </Button>

            <Button
              // className="ok-btn"
              color={"danger"}
              onClick={this.toggleCloseCard}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>




        
        <Modal isOpen={this.state.staffTypeCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary">Select Staff Type</ModalHeader>
            <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Staff Type:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleStaffType}
                        required
                      >
                        <option>Select Staff type</option>
                        {this.state.institutionStaffType &&
                          this.state.institutionStaffType.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
           
          </ModalBody>
          <ModalFooter>
            <Button
              // className="ok-btn"
              color={"info"}
              onClick={this.filterStaff}
            >
              Load Staff List
            </Button>

            <Button
              // className="ok-btn"
              color={"danger"}
              onClick={this.toggleStaffTypeCard}
                    
                    >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>











        <Modal isOpen={this.state.staffRank} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary">Select Staff Rank</ModalHeader>
            <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Cadre:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleRank}
                        required
                      >
                        <option>Select Rank</option>
                        {this.state.institutionRank &&
                          this.state.institutionRank.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
           
          </ModalBody>
          <ModalFooter>
            <Button
              // className="ok-btn"
              color={"info"}
              onClick={this.filterStaff}
            >
              Load Staff List
            </Button>

            <Button
              // className="ok-btn"
              color={"danger"}
              onClick={this.toggleRankCard}
                    
                    >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.combined} className="myModal">
          <ModalHeader></ModalHeader>
          <ModalBody>
                <div className="row card-body" >
                

                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Department:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleDepartment}
                        required
                      >
                        <option>Select Department</option>
                        {this.state.institutionDepts &&
                          this.state.institutionDepts.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Staff Type:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleStaffType}
                        required
                      >
                        <option>Select Staff type</option>
                        {this.state.institutionStaffType &&
                          this.state.institutionStaffType.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Rank:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleRank}
                        required
                      >
                        <option>Select Rank</option>
                        {this.state.institutionRank &&
                          this.state.institutionRank.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                 
              
                </div>
           
           
           
          </ModalBody>
          <ModalFooter>
          <button
                      className="btn btn-info"
                      onClick={() => this.filterStaff()}
                    >
                      Load Staff List
                    </button>
                  
              

                  <button
                      className="btn btn-danger"
                      onClick={this.toggleCombinedCard}
                    >
                      Cancel
                    </button>
          </ModalFooter>
        </Modal>

        {/* 
<div id="dashboard">
        



        <div class="dashboard-content"> */}

        {/* {this.state.spin ? <Spinner msg={"Loading Staff List, please wait..."}/> : null} */}
        <div className="">
          {/* {this.state.spinner == true ? <Spinner /> : null} */}
          <div className="py-4">
            <div className="row mb-4">
              <div className="col">
                <h1 className="d-inline-block mb-0 pop-font">
                  Staff Management{" "}
                  <span className="h3 text-muted">/Staff Profiles</span>
                </h1>

                <span className="text-sm d-block">
                  Create and manage Staff Profiles
                </span>
              </div>

              <div className="col">
                <div>
                  <button
                    className="btn btn-outline-primary btn-icon btn-sm float-right mr-3 mt-2"
                    type="button"
                    data-toggle="modal"
                    data-target=".new-level-modal"
                    onClick={this.createStaffToggle}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-plus" />
                    </span>
                    <span className="btn-inner--text">Create Staff</span>
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-outline-primary btn-icon btn-sm float-right mr-3 mt-2"
                    type="button"
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-file" />
                    </span>
                    <Link to={{ pathname: "/UploadStaffList" }}>
                      <span className="btn-inner--text">Upload Staff List</span>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          
              <div className="card mCrd">
                <div className="row card-body">

                {/* <div className="col-md-6 text-center"> */}
                    <h3>Load Staff List By:</h3>
                    <br />
                    <br />
                  {/* </div> */}
                  <div className="container">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={this.toggleCloseCard}

                      
                    >
                      Department
                    </button>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={this.toggleStaffTypeCard}


                    >
                      Staff Type
                    </button>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={this.toggleRankCard}
                    >
                      Rank
                    </button>

                   

                    <button
                      className="btn btn-success btn-sm"
                      onClick={this.toggleCombinedCard}

                    >
                      Department/Staff Type/Rank
                    </button>
                  </div>
                </div>
              </div>

             
           
            
              <Fade>
                <HrDataTable
                  passedStaffData={this.state.myStaff}
                  take={this.state.staff.staffNumber}
                />{" "}
              </Fade>
       
          </div>
          {/* Card stats */}
        </div>

        <div className="container-fluid mt--6">
          <div></div>
          <div
            className="modal fade new-level-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">{/* start */}</div>
          </div>
          {/* Edit Staff was here */}
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
                      <button className="btn btn-outline-danger">Delete</button>
                    </div>
                  </div>
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
        </div>

        {/* </div>
</div> */}

        {/* <AdminFooter/> */}
      </>
    );
  }
}
