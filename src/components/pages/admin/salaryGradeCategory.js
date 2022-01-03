import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"

export default class salaryGradeCategory extends React.Component {
  state = {
    departments: [],
    salaryGradeCategory: [],
    name: "",
    id: 0,
    active: true,
    salaryGradeCategory: "",
    added: false,
  }

  componentDidMount() {
    // fetchData('/InstitutionDepartments', (data) => {
    //     this.setState({ departments: data })
    // });

    fetchData("/SalaryGradeCategory", data => {
      this.setState({ salaryGradeCategory: data })
      console.log(this.state.salaryGradeCategory, "Category")
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

  addsalaryGradeCategory = () => {
    if (this.state.name !== "") {
      const unit = {
        id: 0,
        name: this.state.name,
        active: true,
      }
      postData("/SalaryGradeCategory", unit, data => {
        const { salaryGradeCategory } = this.state
        salaryGradeCategory.push(data)
        this.setState({
          ...this.state,
          salaryGradeCategory,
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
      editData(`/SalaryGradeCategory/${this.state.id}`, unit, () => {
        fetchData("/SalaryGradeCategory", data => {
          this.setState({ salaryGradeCategory: data })
        })
      })
    }
  }

  deleteUnit = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/SalaryGradeCategory/${this.state.id}`, () => {
        fetchData("/SalaryGradeCategory", data => {
          this.setState({ salaryGradeCategory: data })
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
      editData(`/SalaryGradeCategory/${this.state.id}`, department, () => {
        fetchData("/SalaryGradeCategory", data => {
          this.setState({ departments: data })
        })
      })
    }
  }

  deleteDepartment = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/SalaryGradeCategory/${this.state.id}`, () => {
        fetchData("/SalaryGradeCategory", data => {
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

  render() {
    return (
      <>
        {this.state.added == true ? (
          <div className="jumbo-back" onClick={this.cancelEmpty}>
            <div className="container">
              <div className="jumbotron empty-alert">
                <h5>
                  Successfully Added!{" "}
                  <i
                    className="fa fa-check-circle"
                    style={{ fontSize: "30px", color: "green" }}
                  ></i>
                </h5>
                <hr />
                <button
                  className="btn btn-danger ok-btn"
                  onClick={this.closeAdded}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-12 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Salary Grade Category Management{" "}
              </h6>
              <span className="text-sm d-block">
                Create and manage Grade Categorys and Steps.
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          {/* Card stats */}
          <div className="row justify-content-center">
            
            <div className="col-md-8 mt-4">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h4 className=" mb-0">Salary Grade Category</h4>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-outline-primary btn-icon btn-sm float-right"
                          type="button"
                          data-toggle="modal"
                          data-target=".new-unit-modal"
                          onClick={() => this.clearInput()}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            New Salary Category
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
                          <th>Category Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.salaryGradeCategory &&
                        this.state.salaryGradeCategory.length > 0
                          ? this.state.salaryGradeCategory.map(unit => {
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
            className="modal fade new-unit-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Add Salary Category
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
                          Category Name
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
                        onClick={() => this.addsalaryGradeCategory()}
                        data-dismiss="modal"
                      >
                        Create Category
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
                    Edit Category
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
                          Category Name
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
                        Edit Category
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
                    Delete Category?
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
