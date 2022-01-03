import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner"
import {ParentName} from "../../Barn"
import {Roles} from "../../Barn"
import { Link, Redirect } from "react-router-dom";
import SalaryDataTable from "../DataTables/SalaryDataTable";
import {currencyFormat, amountToWords, GetDate} from "../../../utils/helpers"


import AlertBox from "./alertBox";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


export default class SalarySetup extends React.Component {
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
  getSalaryCategory = () => {
    fetchData(`/SalaryGradeCategory`, data => {
      this.setState({salaryCategoryLoad:data})
      console.log(this.state.salaryCategoryLoad, "Cat Load")
    })
  }

  getSalaryLevel = () => {
    fetchData(`/SalaryLevel`, data => {
      this.setState({salaryLevelLoad:data})
      console.log(this.state.salaryLevelLoad, "Lvl Load")

    })
  }

  getSalaryStep = () => {
    fetchData(`/SalaryStep`, data => {
      this.setState({salaryStepLoad:data})
      console.log(this.state.salaryStepLoad, "Step Load")

    })
  }

  componentDidMount() {

    this.getSalaryCategory();
    this.getSalaryLevel();
    this.getSalaryStep();

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
    
    fetchData("/SalaryGradingSystem/GetSalaryGrade", (data) => {

      let mappedSalaries = data.map((a, i) => {
        return {
          sn : i + 1,
          sgc: a.salaryGradeCategoryName,
          ss: a.salaryStepName,
          sl: a.salaryLevelName,
          amt: (<span className="badge badge-success sofia" style={{fontSize:'15px'}}>{currencyFormat(a.amount) + ".00"}</span>),
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

                {/* <span
                onClick={() =>
                  this.handleDeleteGrades(a)
                }
                className="h2 cpoint"
                data-toggle="modal"
                data-target=".delete-docType-modal"
                >
                <i className="fa fa-trash" />
                </span> */}
                </>

          )

        }
      })
      this.setState({dataSalaryGrades: mappedSalaries});
      console.log(this.state.Menus, "Levels");
      console.log(this.state.dataSalaryGrades, "Data Menu");
    });

    fetchData("/ParentMenu", (data) => {
      this.setState({ parentMenus: data });
      console.log(this.state.parentMenus, "Par Menus");
    });

  this.loadRoleList();

  }


  addSalaryGrade = () => {
    
      const salaryPayload = {
        "salaryGradeCategoryId": this.state.selectedSalaryCategory,
        "salaryStepId": this.state.selectedSalaryStep,
        "salaryLevelId": this.state.selectedSalaryLevel,
        "amount": parseInt(this.state.salaryAmount),
      };
      this.setState({ createSalaryGrade: false });
      postData("/SalaryGradingSystem/AddSalaryGrade", salaryPayload, (data) => {
        if(data == 200){
          alert("Added!")
          this.componentDidMount();         
        }
      });
    
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
        //name: data.name,
        salaryAmount: data.amount,
        selectedSalaryCategory: data.salaryGradeCategoryId,
        selectedSalaryLevel: data.salaryLevelId,
        selectedSalaryStep: data.salaryStepId,
        id: data.id,
        createSalaryGrade:true,
        Title:"Edit"
    });

    console.log(data, "data");
  };

  handlecreateSalaryGrade = () => {
    this.setState({
      createSalaryGrade: true,
      name: "",
      Title: "Add",
      salaryAmount: 0,
        selectedSalaryCategory: 0,
        selectedSalaryLevel: 0,
        selectedSalaryStep: 0,
    });
  };
  handleDeleteGrades = (data) => {
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
    this.setState({spin:true, createSalaryGrade:false})
    let selectedData = {
      "salaryGradeCategoryId": this.state.selectedSalaryCategory,
      "salaryStepId": this.state.selectedSalaryStep,
      "salaryLevelId": this.state.selectedSalaryLevel,
      "amount": parseInt(this.state.salaryAmount),
        
    };

    editData(`/SalaryGradingSystem/UpdateSalaryGrade?gradeId=${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDelete = () => {
    this.setState({deleteMenus:false})
    deleteData(`/SalaryGradingSystem/UpdateSalaryGrade?gradeId=${this.state.id}`, data => {
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
        <Modal isOpen={this.state.createSalaryGrade}>
          <ModalBody>
            <div className="modal-header border-bottom">
              <h4 className="mb-0" id="exampleModalScrollableTitle">
                {this.state.Title} Salary Grade
              </h4>
              <button
                type="button"
                className="close"
                onClick={() => {
                  this.setState({ createSalaryGrade: false });
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
                   Salary Grade Category
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedSalaryCategory: parseInt(e.target.value) });
                    }}
                  >
                    <option
                    >Select Salary Grade Category</option>

            {this.state.salaryCategoryLoad &&
                      this.state.salaryCategoryLoad.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selectedSalaryCategory}
                        
                        >{type.name}</option>
                      ))}   
                  </select>
                  </div>





                  <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   Salary Grade Step
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedSalaryStep: parseInt(e.target.value) });
                    }}
                  >
                    <option
                    >Select Grade Step</option>

            {this.state.salaryStepLoad &&
                      this.state.salaryStepLoad.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selectedSalaryStep}
                        
                        >{type.name}</option>
                      ))}   
                  </select>
                  </div>


                  <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   Salary Grade Level
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedSalaryLevel: parseInt(e.target.value) });
                    }}
                  >
                    <option
                    >Select Grade Level</option>

            {this.state.salaryLevelLoad &&
                      this.state.salaryLevelLoad.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selectedSalaryLevel}
                        
                        >{type.name}</option>
                      ))}   
                  </select>
                  </div>



                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Amount
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      defaultValue={this.state.salaryAmount}
                      onChange={(e) => {
                        this.setState({ salaryAmount: e.target.value });
                      }}
                    />
                  </div>


                 





                  {this.state.Title == "Add" ? <button
                    className="btn btn-primary"
                    onClick={() => this.addSalaryGrade()}
                    data-dismiss="modal"
                  >
                    Add Salary Grade
                  </button> : <button
                    className="btn btn-primary"
                    onClick={this.initiateUpdate}
                    data-dismiss="modal"
                  >
                    Update Salary Grade
                  </button>}
                </div>
              </div>
            </div>
          
          
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btn-sm text-white"
                onClick={() => {
                  this.setState({ createSalaryGrade: false });
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
                Salary Setup{" "}
                <span className="h3 text-muted">/ Salary Grade</span>
              </h6>
              <span className="text-sm d-block">
                Modify Salary Setup
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
                      <h4 className=" mb-0">Salary Details</h4>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-primary btn-icon btn-sm float-right"
                          type="button"
                          onClick={() => this.handlecreateSalaryGrade()}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            Add &nbsp;<i className="fa fa-plus"/>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

<SalaryDataTable data={this.state.dataSalaryGrades}/>
                  
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
