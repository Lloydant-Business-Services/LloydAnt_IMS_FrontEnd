import React from "react";
import { fetchData, postData, editData, deleteData, editDataWithPatch } from "../../../utils/crud";
import {securityCheck} from "../../../utils/helpers";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner";
import Avatar from "../../../images/use.png";
import {Roles} from "../../Barn"
import { Redirect } from "react-router-dom";



import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Fade
} from "reactstrap";

export default class RoleManagement extends React.Component {
 
  state = {
    role: [],
    types: [],
    name: "",
    id: 0,
    active: true,
    searchCard: true,
    profile: false

  };




  componentDidMount() {
    

    let verification = JSON.parse(localStorage.getItem("userData"));
    if (verification == null) {
      this.setState({
        logOut: true,
      });

    
    }
    // else if (verification.roleId != Roles.SuperAdmin && verification.roleId != Roles.Personnel && verification.roleId != Roles.Regularization) {
    //   alert("Unauthorized Access")
    //   localStorage.clear();
    //   this.setState({
    //     userRedirect: true,
    //   });
    // }
    fetchData("/Roles", (data) => {
      this.setState({ role: data });
    });
    this.loadRoleList();

    fetchData("/InstitutionStaffTypes", (data) => {
      this.setState({ types: data });
    });
  }

  addRole = () => {
    if (this.state.name !== "") {
      const Role = {
        id: 0,
        name: this.state.name,
        active: this.state.active,
      };
      this.setState({ createRole: false });
      postData("/Roles", Role, (data) => {
        const { role } = this.state;
        role.push(data);
        this.setState({ ...this.state, role, name: "", active: true });
        this.componentDidMount();
      });
    }
  };

  addType = () => {
    if (this.state.staffTypeName !== "") {
      const type = {
        id: 0,
        name: this.state.staffTypeName,
        active: true,
      };
      this.setState({ assignRole: false });

      postData("/InstitutionStaffTypes", type, (data) => {
        const { types } = this.state;
        types.push(data);
        this.setState({ ...this.state, types, name: "", active: true });
        this.componentDidMount();
      });
    }
  };

  loadEditData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      createRole: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateRole = () => {
    this.setState({
      createRole: true,
      name: " ",
      Title: "Add",
    });
  };
  handleDeleteRole = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteRole: true,
    });
  };
  closeDelete = () => {
    this.setState({ deleteRole: false });
  };

  initiateUpdate = () => {
    this.setState({ spin: true, createRole: false });
    let selectedData = {
      name: this.state.name,
      id: this.state.id,
      active: true,
    };
    editData(`/Roles/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount();
      this.setState({ spin: false, notice: true });
    });
  };

  initiateDelete = () => {
    this.setState({ deleteRole: false });
    deleteData(`/Roles/${this.state.id}`, (data) => {
      console.log(data);
      this.componentDidMount();
      this.setState({ notice: true });
    });
  };

  //Staff Type

  loadEditData2 = (data) => {
    this.setState({
      staffTypeName: data.name,
      id: data.id,
      active: data.active,
      assignRole: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleAssignRole = () => {
    this.setState({
      assignRole: true,
      staffTypeName: " ",
      Title: "Add",
    });
  };
  handleDeleteStafftype = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteStaffType: true,
    });
  };
  closeDelete2 = () => {
    this.setState({ deleteStaffType: false });
  };

  initiateRoleAssignment = () => {
    this.setState({ spin: true, assignRole: false });

      let assignLoad = {
          roleId : this.state.selectedRole,
          staffId: this.state.staffInfo.id
      }
      editData("/Staff/AssignRole", assignLoad, data => {
          this.setState({notice: true, spin:false})
      })
  }

  initiateUpdate2 = () => {
    this.setState({ spin: true, assignRole: false });
    let selectedData = {
      name: this.state.staffTypeName,
      id: this.state.id,
      active: true,
    };
    editData(
      `/InstitutionStaffTypes/${this.state.id}`,
      selectedData,
      (data) => {
        console.log(data, "Editted");
        this.componentDidMount();
        this.setState({ spin: false, notice: true });
      }
    );
  };

  initiateDelete2 = () => {
    this.setState({ deleteStaffType: false });
    deleteData(`/InstitutionStaffTypes/${this.state.id}`, (data) => {
      console.log(data);
      this.componentDidMount();
      this.setState({ notice: true });
    });
  };

  toggleSearchCard = () => {
      this.setState({
          searchCard:true,
          profile:false
      })
  }

  loadStaff = () => {
    let currentState = this

    
    currentState.setState({
        spin:true
    })

    setTimeout(() => {
      fetchData(`/Staff/GetStaffByStaffNumber?generatedStaffNumber=${this.state.staffNumber}`, data => {
          console.log(data, "Docx Info")
          currentState.setState({
              staffInfo:data
          })
          if(data){

              currentState.setState({
                spin:false,
                 profile:true,
                 searchCard:false
            })
           

          }
          else{
            
              currentState.setState({
                  spin:false
              })
                alert("No Uploaded Document Record For this Staff")
          }
      })
    }, 2000)
 
}

loadRoleList = () => {
    fetchData("/Roles", data => {
        this.setState({roleList:data})
    })
}

  render() {
    if (this.state.logOut) {
      // localStorage.clear();
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
      <>
        {/* <Alert color="primary">
        This is a primary alert — check it out!
      </Alert> */}
        {this.state.notice ? (
          <Notice
            message={"Action was Successful!"}
            okBtn={true}
            closeCard={() => {
              this.setState({ notice: false });
            }}
          />
        ) : null}
        {this.state.spin ? <Spinner /> : null}
        {this.state.deleteRole ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}

        {this.state.deleteStaffType ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete2}
            confirm={this.initiateDelete2}
          />
        ) : null}
        <Modal isOpen={this.state.createRole}>
          <ModalBody>
            <div className="modal-header border-bottom">
              <h2 className="mb-0" id="exampleModalScrollableTitle">
                {this.state.Title} Staff Role
              </h2>
              <button
                type="button"
                className="close"
                onClick={() => {
                  this.setState({ createRole: false });
                }}
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
                      Role Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="unit"
                      defaultValue={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </div>
                  {this.state.Title == "Add" ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => this.addRole()}
                    >
                      Create Role
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={this.initiateUpdate}
                    >
                      Update Role
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btn-sm text-white"
                onClick={() => {
                  this.setState({ createRole: false });
                }}
              >
                Close
              </button>
            </div>
          </ModalBody>
        </Modal>

        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Role Management{" "}
                <span className="h3 text-muted">
                  /Role Assignment &amp; Staff Type
                </span>
              </h6>
              <span className="text-sm d-block">Create and Assign Role</span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>
          {/* Card stats */}
          <div className="row">
            <hr className="mx-0" />
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="card-title mb-0">Roles</h3>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-primary btn-icon btn-sm float-right"
                          type="button"
                          onClick={this.handleCreateRole}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">New Role</span>
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
                          <th>Role Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.role && this.state.role.length > 0
                          ? this.state.role.map((unit) => {
                              return (
                                <tr key={unit.id}>
                                  <td>
                                    <h5 className="mt-2">{unit.name}</h5>
                                  </td>
                                  <td>
                                    <span
                                      onClick={() => this.loadEditData(unit)}
                                      className="h2 cpoint mr-4"
                                    >
                                      <i className="d-inline fa fa-edit" />
                                    </span>
                                    <span
                                      onClick={() =>
                                        this.handleDeleteRole(unit)
                                      }
                                      className="h2 cpoint"
                                    >
                                      <i className="fa fa-trash" />
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>




            {/* Staff Type */}

            <Modal isOpen={this.state.assignRole}>
              <ModalBody>
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    {/* {this.state.staffInfo?.person.surname} {this.state.staffInfo?.person.firstname} {this.state.staffInfo?.person.othername} */}
                  </h2>
                  <button
                    type="button"
                    className="close"
                    onClick={() => {
                      this.setState({ assignRole: false });
                    }}
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
                   Role
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedRole: parseInt(e.target.value) });
                    }}
                  >
                    <option
                    >Select Role</option>

                    {this.state.roleList &&
                      this.state.roleList.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selectedRole}
                        
                        >{type.name}</option>
                      ))}
                  </select>
                </div>
                     
                        <button
                          className="btn btn-primary"
                          onClick={this.initiateRoleAssignment}
                        >
                          Save
                        </button>
                     
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    onClick={() => {
                      this.setState({ assignRole: false });
                    }}
                  >
                    Close
                  </button>
                </div>
              </ModalBody>
            </Modal>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="card-title mb-0">Assign Role to Staff</h3>
                    </div>

                    {this.state.profile ? <Fade><div className="col">
                          <div>
                            <button
                              className="btn btn-primary btn-icon btn-sm float-right"
                              type="button"
                              onClick={this.toggleSearchCard}
                            >
                              <span className="btn-inner--icon">
                                <i className="ni ni-bold-left" />
                              </span>
                              <span className="btn-inner--text">
                                Search Staff
                              </span>
                            </button>
                          </div>
                        </div> </Fade>: null}

                    <hr />
                  </div>
                </div>
                {this.state.profile ? <Fade><div className="container">
                  <div className="card-body">
                    <div class="card" style={{ width: "300px" }}>
                      <img
                        class="card-img-top"
                        src={Avatar}
                        style={{ height: "230px", background: "transparent" }}
                        alt="Card image"
                      />
                      <div class="card-body">
                        {/* <div className="container"><img class="card-img-top" src={Avatar} style={{width:"80px", background:"transparent"}} alt="Card image"/></div>
  <br/> */}

                        <p class="card-text">
                          Name:
                          <h4 class="card-title">
                            {this.state.staffInfo?.person?.surname}{" "}  {this.state.staffInfo?.person?.firstname} {this.state.staffInfo?.person?.othername}
                          </h4>{" "}
                        </p>
                        <p class="card-text">
                          Department:
                          <h4 class="card-title">
                            {this.state.staffInfo?.department?.name}
                          </h4>{" "}
                        </p>
                        <p class="card-text">
                          Current Role:
                          <h4 class="card-title">{"Faculty Officer"}</h4>{" "}
                        </p>

                        {/* <p class="card-text">Department: <b style={{fontSize:"16px", fontWeight:"700"}}>{this.state.newStaffInfo?.department?.name}</b></p> */}
                        {/* <button class="btn btn-primary" style={{cursor:"disabled"}}>{this.state.newStaffInfo?.generatedStaffNumber}</button> */}
                        <p></p>
                        <span
                          class="badge badge-info badge-lg"
                          style={{ fontSize: "14px" }}
                        >
                          {this.state.staffInfo?.generatedStaffNumber}
                        </span>
                        <br />
                        
                      </div>
                      <div className="col">
                          <div>
                            <button
                              className="btn btn-warning btn-icon btn-sm float-right"
                              type="button"
                              onClick={this.handleAssignRole}
                            >
                              <span className="btn-inner--icon">
                                <i className="ni ni-badge" />
                              </span>
                              <span className="btn-inner--text">
                                Assign a Role
                              </span>
                            </button>
                          </div>
                        </div>
                    </div>
                    
                  </div>

                 
                                
                </div> </Fade> : null}
                


{/* Searh Card */}


 {this.state.searchCard ? <div className="container">


 <div className="card-body">
                <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                         Enter Staff Number
                        </label>
                        <input
                          className="form-control"
                          id="myInp"
                          placeholder="NAU/ST/XXXX"
                          type="text"
                          name="docType"
                          value={this.state.staffNumber}
                          onChange={e => {
                            this.setState({ staffNumber: e.target.value })
                          }}
                        />
                </div>
                <br/>

                <button
                    type="button"
                    className="btn btn-info text-white"
                   onClick={this.loadStaff}
                    
                  >
                    Load Staff <i className="ni ni-curved-next"/>
                  </button>
              </div>
             
             
                         {/* <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Type</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.types && this.state.types.length > 0 ?
                                                        this.state.types.map(cat => {
                                                            return (
                                                                <tr key={cat.id}>
                                                                    <td>
                                                                        <h5 className="mt-2">{cat.name}</h5>
                                                                    </td><td>
                                                                        <span onClick={() => this.loadEditData2(cat)} className="h2 cpoint mr-4" data-toggle="modal" data-target=".edit-unit-modal"><i className="d-inline fa fa-edit" /></span>
                                                                        <span onClick={() => this.handleDeleteStafftype(cat)} className="h2 cpoint" data-toggle="modal" data-target=".delete-unit-modal"><i className="fa fa-trash" /></span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                               
                               
                                */}
                                
                </div> : null}
                




              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
