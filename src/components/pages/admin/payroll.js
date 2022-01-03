import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import AlertBox from "./alertBox"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

} from "reactstrap";

export default class Payroll extends React.Component {
  state = {
    departments: [],
    salaryGradeLevel: [],
    name: "",
    id: 0,
    active: true,
    salaryGradeLevel: "",
    added: false,
  }

  componentDidMount() {
    // fetchData('/InstitutionDepartments', (data) => {
    //     this.setState({ departments: data })
    // });

    fetchData("/SalaryLevel", data => {
      this.setState({ salaryGradeLevel: data })
      console.log(this.state.salaryGradeLevel, "Levels")
    })
  }

  // addDepartment = () => {
  //     if (this.state.name !== '') {
  //         const department = {
  //             id: 0,
  //             name: this.state.name,
  //             active: this.state.active
  //         };
  //         postData('/InstitutionDepartments', department, (data) => {
  //             const { departments } = this.state;
  //             departments.push(data);
  //             this.setState({ ...this.state, departments, name: '',active: true, });
  //         });
  //     }
  // }

  addSalaryGradeLevel = () => {
    if (this.state.name !== "") {
      const unit = {
        id: 0,
        name: this.state.name,
        active: true,
      }
      this.setState({createGradeLevel:false})
      postData("/SalaryLevel", unit, data => {
        const { salaryGradeLevel } = this.state
        salaryGradeLevel.push(data)
        this.setState({
          ...this.state,
          salaryGradeLevel,
          name: "",
          active: true,
          added: true,
        })
      })
    }
  }
  closeAdded = () => {
    this.setState({
      added: false,
    })
  }

  clearInput = () => {
    if(typeof window !== "undefined"){
      document.getElementById("myInp").value = ""
    }
  }

  updateUnit = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      const unit = {
        id: this.state.id,
        name: this.state.name,
        active: this.state.active,
      }
      editData(`/SalaryLevel/${this.state.id}`, unit, () => {
        fetchData("/SalaryLevel", data => {
          this.setState({ salaryGradeLevel: data })
        })
      })
    }
  }

  deleteUnit = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/SalaryLevel/${this.state.id}`, () => {
        fetchData("/SalaryLevel", data => {
          this.setState({ salaryGradeLevel: data })
        })
      })
    }
  }

  updateDepartment = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      const department = {
        id: this.state.id,
        name: this.state.name,
        active: this.state.active,
      }
      editData(`/SalaryLevel/${this.state.id}`, department, () => {
        fetchData("/SalaryLevel", data => {
          this.setState({ departments: data })
        })
      })
    }
  }

  deleteDepartment = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/SalaryLevel/${this.state.id}`, () => {
        fetchData("/SalaryLevel", data => {
          this.setState({ departments: data })
        })
      })
    }
  }

  loadEditData = data => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
    })
  }

  handleCreateGradeLevel = () => {
    this.setState({
      createGradeLevel:true,
      name: " "
    })
  }

  render() {
    return (
      <>

<Modal isOpen={this.state.createGradeLevel}>
  <ModalBody>
  
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Add Grade Level
                  </h4>
                  <button
                    type="button"
                    className="close"
                   onClick={()=>{this.setState({createGradeLevel:false})}}
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
                          Level Name
                        </label>
                        <input
                          className="form-control"
                          id="myInp"
                          type="text"
                          name="unit"
                          value={this.state.name}
                          onChange={e => {
                            this.setState({ name: e.target.value })
                          }}
                        />
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.addSalaryGradeLevel()}
                        data-dismiss="modal"
                      >
                        Create Level
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                   onClick={()=>{this.setState({createGradeLevel:false})}}
                    
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
                Payroll{" "}
                <span className="h3 text-muted">
                  /Salary Grade Level Management
                </span>
              </h6>
              <span className="text-sm d-block">
                Create and manage Grade Levels and Steps.
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
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
                      <h4 className=" mb-0">Salary Grade Level</h4>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-outline-primary btn-icon btn-sm float-right"
                          type="button"
                         
                          onClick={() => this.handleCreateGradeLevel()}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            New Grade Level
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
                          <th>Level Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.salaryGradeLevel &&
                        this.state.salaryGradeLevel.length > 0
                          ? this.state.salaryGradeLevel.map(unit => {
                              return (
                                <tr key={unit.id}>
                                  <td>
                                    <h5 className="mt-2">{unit.name}</h5>
                                  </td>
                                  <td>
                                    <span
                                      onClick={() => this.loadEditData(unit)}
                                      className="h2 cpoint mr-4"
                                      data-toggle="modal"
                                      data-target=".edit-unit-modal"
                                    >
                                      <i className="d-inline fa fa-edit" />
                                    </span>
                                    <span
                                      onClick={() => this.loadEditData(unit)}
                                      className="h2 cpoint"
                                      data-toggle="modal"
                                      data-target=".delete-unit-modal"
                                    >
                                      <i className="fa fa-trash" />
                                    </span>
                                  </td>
                                </tr>
                              )
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div></div>
    

         
         
          <div
            className="modal fade edit-unit-modal"
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
                          onChange={e => {
                            this.setState({ name: e.target.value })
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
            className="modal fade delete-unit-modal"
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
    )
  }
}
