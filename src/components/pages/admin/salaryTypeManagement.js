import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"

export default class salaryTypeManagement extends React.Component {
  state = {
    salaryType: [],
    types: [],
    name: "",
    id: 0,
    active: true,
    added: false,
    updated: false,
  }

  componentDidMount() {
    fetchData("/SalaryType", data => {
      this.setState({ types: data })
    })

    fetchData("/SalaryType", data => {
      this.setState({ types: data })
      console.log(this.state.types)
    })
  }

  clearInput = () => {
    if(typeof window !== "undefined"){
      document.getElementById("inpName").value = ""
      document.getElementById("inpAmount").value = ""
    }
  }

  addSalaryType = () => {
    if (this.state.name !== "") {
      const salType = {
        id: 0,
        name: this.state.name,
        amount: parseInt(this.state.amount),
        active: this.state.active,
      }
      postData("/SalaryType", salType, data => {
        const { salaryType } = this.state
        salaryType.push(data)
        this.setState({
          ...this.state,
          salaryType,
          name: "",
          active: true,
          added: true,
        })
      })
    }
  }

  addUnit = () => {
    if (this.state.name !== "") {
      const types = {
        id: 0,
        name: this.state.name,
        active: true,
      }
      postData("/SalaryType", types, data => {
        const { types } = this.state
        types.push(data)
        this.setState({ ...this.state, types, name: "", active: true })
      })
    }
  }

  closeAdded = () => {
    this.setState({
      updated: false,
    })
    this.componentDidMount();
    // if(typeof window !== "undefined"){
    //   window.location.reload(true)
    // }
  }

  updateSalaryType = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      const types = {
        id: this.state.id,
        name: this.state.name,
        amount: parseInt(this.state.amount),
        active: this.state.active,
      }
      editData(`/SalaryType/${this.state.id}`, types, () => {
        fetchData("/SalaryType", data => {
          this.setState({ types: data })
        })
      })

      setTimeout(() => {
        this.setState({ updated: true })
      }, 2000)
    }
  }

  deleteUnit = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/SalaryType/${this.state.id}`, () => {
        fetchData("/SalaryType", data => {
          this.setState({ types: data })
        })
      })
    }
  }

  deleteDepartment = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/SalaryType/${this.state.id}`, () => {
        fetchData("/SalaryType", data => {
          this.setState({ salaryType: data })
        })
      })
    }
  }

  loadEditData = data => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      amount: data.amount,
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

        {this.state.updated == true ? (
          <div className="jumbo-back" onClick={this.cancelEmpty}>
            <div className="container">
              <div className="jumbotron empty-alert">
                <h5>
                  Successfully Updated!{" "}
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
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Salary Type Management <span className="h3 text-muted"></span>
              </h6>
              <span className="text-sm d-block">
                Create and manage Salary Type
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>


          <div className="row justify-content-center">
              <div className="form-group col-md-7">

                  <div className="row justify-content-center">
                      <div className="col-md-10">
                          <label htmlFor="example-text-input" className="form-control-label">Steps per Level</label>
                          <input className="form-control" type="number" name="steps" />
                      </div>
                      <div className="col-md-2">                        
                          <span className=" btn btn-primary mt-3rem" onClick={() => this.addSalaryType()}>Save</span>
                      </div>
                  </div>

              </div>
          </div>
          
          
          <div className="row justify-content-center">
            <div className="col-md-7 mt-4">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h4 className=" mb-0"> Salary Type</h4>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-outline-primary btn-icon btn-sm float-right"
                          types="button"
                          data-toggle="modal"
                          data-target=".new-types-modal"
                        >
                          <span className="btn-inner--icon">
                            <i
                              className="fa fa-plus"
                              onClick={() => this.clearInput()}
                            />
                          </span>
                          <span className="btn-inner--text">
                            New Salary Type
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
                          <th>Type Name</th>
                          <th>Amount</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.types && this.state.types.length > 0
                          ? this.state.types.map(types => {
                              return (
                                <tr key={types.id}>
                                  <td>
                                    <h5 className="mt-2">{types.name}</h5>
                                  </td>
                                  <td>
                                    <h5 className="mt-2">{types.amount}</h5>
                                  </td>
                                  <td>
                                    <span
                                      onClick={() => this.loadEditData(types)}
                                      className="h2 cpoint mr-4"
                                      data-toggle="modal"
                                      data-target=".edit-types-modal"
                                    >
                                      <i className="d-inline fa fa-edit" />
                                    </span>
                                    <span
                                      onClick={() => this.loadEditData(types)}
                                      className="h2 cpoint"
                                      data-toggle="modal"
                                      data-target=".delete-types-modal"
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
            className="modal fade new-types-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Add New Salary Type
                  </h4>
                  <button
                    types="button"
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
                          Salary Type Name
                        </label>
                        <input
                          className="form-control"
                          types="text"
                          id="inpName"
                          name="types"
                          value={this.state.name}
                          onChange={e => {
                            this.setState({ name: e.target.value })
                          }}
                        />
                      </div>

                      <button
                        className="btn btn-primary"
                        onClick={() => this.addSalaryType()}
                        data-dismiss="modal"
                      >
                        Create Salary Type
                      </button>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Amount
                        </label>
                        <input
                          className="form-control"
                          id="inpAmount"
                          types="text"
                          name="types"
                          value={this.state.amount}
                          onChange={e => {
                            this.setState({ amount: e.target.value })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    types="button"
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
            className="modal fade edit-types-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Edit Salary Type
                  </h4>
                  <button
                    types="button"
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
                          Salary Type Name
                        </label>
                        <input
                          className="form-control"
                          types="text"
                          name="unitName"
                          value={this.state.name}
                          onChange={e => {
                            this.setState({ name: e.target.value })
                          }}
                        />
                      </div>
                      <button
                        data-dismiss="modal"
                        onClick={() => this.updateSalaryType()}
                        className="btn btn-primary"
                      >
                        Update Salary Type
                      </button>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Amount
                        </label>
                        <input
                          className="form-control"
                          types="text"
                          name="unitName"
                          value={this.state.amount}
                          onChange={e => {
                            this.setState({ amount: e.target.value })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    types="button"
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
            className="modal fade delete-types-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Delete Salary Type?
                  </h4>
                  <button
                    types="button"
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
                    types="button"
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
