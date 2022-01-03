import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner"
import {ParentName} from "../../Barn"
import {Roles} from "../../Barn"
import { Link, Redirect } from "react-router-dom";
import MenuDataTable from "../DataTables/MenuDataTable";



import AlertBox from "./alertBox";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


export default class MenuManagement extends React.Component {
  state = {
    departments: [],
    Menus: [],
    name: "",
    id: 0,
    active: true,
    Menus: "",
    selectedParentMenu:0,
    selectedRole:0
  };

  loadRoleList = () => {
      fetchData("/Roles", data => {
          this.setState({roleList:data})
      })
  }
  componentDidMount() {


    let verification = JSON.parse(localStorage.getItem("userData"));
    if (verification == null) {
      this.setState({
        userRedirect: true,
      });

    
    }
    // else if (verification.roleId != Roles.SuperAdmin) {
    //   alert("Unauthorized Access")
    //   localStorage.clear();
    //   this.setState({
    //     userRedirect: true,
    //   });
    // }


    
    // fetchData("/Menu/GetAllMenu", (data) => {
    //   this.setState({ Menus: data });
    //   console.log(this.state.Menus, "Levels");
    // });
    
    fetchData("/Menu/GetAllMenu", (data) => {

      let mappedMenu = data.map((a, i) => {
        return {
          sn : i + 1,
          name: a.name,
          rolePrivilege: a.roleName,
          action: (
            <>
            <span
            onClick={() => this.loadEditData(a)}
            className="h2 cpoint mr-4"
            data-toggle="modal"
            data-target=".edit-docType-modal"
          >
            <i className="d-inline fa fa-edit" />
          </span>

                <span
                onClick={() =>
                  this.handleDeleteMenus(a)
                }
                className="h2 cpoint"
                data-toggle="modal"
                data-target=".delete-docType-modal"
                >
                <i className="fa fa-trash" />
                </span>
                </>

          )

        }
      })
      this.setState({ Menus: data, dataMenu: mappedMenu });
      console.log(this.state.Menus, "Levels");
      console.log(this.state.dataMenu, "Data Menu");
    });

    fetchData("/ParentMenu", (data) => {
      this.setState({ parentMenus: data });
      console.log(this.state.parentMenus, "Par Menus");
    });

  this.loadRoleList();

  }


  addMenus = () => {
    if (this.state.name !== "") {
      const menuPost = {
        name: this.state.name,
        route: this.state.route,
        roleId: this.state.selectedRole,
        parentMenuId:this.state.selectedParentMenu,
        active: true,
      };
      this.setState({ createMenus: false });
      postData("/Menu/AddMenu", menuPost, (data) => {
        this.componentDidMount();
        const { Menus } = this.state;
        Menus.push(data);
        this.setState({
          ...this.state,
          Menus,
          name: "",
          active: true,
        });
      });
    }
  };
  closeAdded = () => {
    this.setState({
      added: false,
    });
  };

  clearInput = () => {
    if (typeof window !== "undefined") {
      document.getElementById("myInp").value = "";
    }
  };

  loadEditData = (data) => {
    this.setState({
        name: data.name,
        route: data.route,
        roleName: data.roleName,
        selectedRole: data.roleId,
        selectedParentMenu: data.parentMenuId,
        id: data.id,
        createMenus:true,
        Title:"Edit"
    });

    console.log(data, "data");
  };

  handleCreateMenus = () => {
    this.setState({
      createMenus: true,
      name: "",
      Title: "Add",
      route:"",
      selectedRole:0,
      selectedParentMenu:0
    });
  };
  handleDeleteMenus = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteMenus: true,
    });
  };
  closeDelete = () => {
    this.setState({ deleteMenus: false });
  };

  initiateUpdate = () => {
    this.setState({spin:true, createMenus:false})
    let selectedData = {
        name: this.state.name,
        route: this.state.route,
        roleId: this.state.selectedRole,
        parentMenuId: this.state.selectedParentMenu
        
    };
    editData(`/Menu/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDelete = () => {
    this.setState({deleteMenus:false})
    deleteData(`/Menu/${this.state.id}`, data => {
      console.log(data)
      this.componentDidMount();
    this.setState({notice:true})

    })
  }
  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <>
    {this.state.notice ? <Notice message={"Action was Successful!"} okBtn={true} closeCard={()=>{this.setState({notice:false})}}/> : null}
      {this.state.spin ? <Spinner/> : null}
        {this.state.deleteMenus ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}
        <Modal isOpen={this.state.createMenus}>
          <ModalBody>
            <div className="modal-header border-bottom">
              <h4 className="mb-0" id="exampleModalScrollableTitle">
                {this.state.Title} Menu
              </h4>
              <button
                type="button"
                className="close"
                onClick={() => {
                  this.setState({ createMenus: false });
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
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Menu Name
                    </label>
                    <input
                      className="form-control"
                      id="myInp"
                      type="text"
                      name="docType"
                      defaultValue={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   Parent Menu
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedParentMenu: parseInt(e.target.value) });
                    }}
                  >
                    <option
                    >Select Parent Menu</option>

                    {this.state.parentMenus &&
                      this.state.parentMenus.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selectedParentMenu}
                        
                        >{type.name}</option>
                      ))}
                  </select>
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Route
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={this.state.route}
                      onChange={(e) => {
                        this.setState({ route: e.target.value });
                      }}
                    />
                  </div>


                  <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   Role Privileges
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






                  {this.state.Title == "Add" ? <button
                    className="btn btn-primary"
                    onClick={() => this.addMenus()}
                    data-dismiss="modal"
                  >
                    Add Menu
                  </button> : <button
                    className="btn btn-primary"
                    onClick={this.initiateUpdate}
                    data-dismiss="modal"
                  >
                    Update Menu
                  </button>}
                </div>
              </div>
            </div>
          
          
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btn-sm text-white"
                onClick={() => {
                  this.setState({ createMenus: false });
                }}
              >
                Close
              </button>
            </div>
          </ModalBody>
        </Modal>

        {this.state.added == true ? (
          <AlertBox ok={this.closeAdded} message={"Succesfully Added!"} />
        ) : null}
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Menu Management{" "}
                <span className="h3 text-muted">/ Menu Privileges</span>
              </h6>
              <span className="text-sm d-block">
                Add and Edit Menus
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="form-group row col-md-8">
            {/* <div className="col-10">
                            <label htmlFor="example-text-input" className="form-control-label">Steps per Level</label>
                            <input className="form-control" type="number" name="steps" />
                        </div>
                        <div className="col-2">
                            <span className=" btn btn-primary btn-sm mt-4" onClick={() => this.addDepartment()}>Save</span>
                        </div> */}
          </div>

          {/* Card stats */}
          <div className="row justify-content-center">
            <hr className="mx-0" />
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
                      <h4 className=" mb-0">Menu List</h4>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-primary btn-icon btn-sm float-right"
                          type="button"
                          onClick={() => this.handleCreateMenus()}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            Add a Menu
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

<MenuDataTable data={this.state.dataMenu}/>
                  
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div></div>

          <div
            className="modal fade edit-docType-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Edit Level
                  </h4>
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Level Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="unitName"
                          value={this.state.name}
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                        />
                      </div>
                      <button
                        onClick={() => this.updateUnit()}
                        className="btn btn-primary"
                      >
                        Edit Level
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade delete-docType-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Delete Level?
                  </h4>
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
                        Are you sure you want to delete this ({this.state.name})
                        record? All items related to it will be affected
                      </p>
                      <button
                        onClick={() => this.deleteUnit()}
                        className="btn btn-outline-danger"
                        data-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
