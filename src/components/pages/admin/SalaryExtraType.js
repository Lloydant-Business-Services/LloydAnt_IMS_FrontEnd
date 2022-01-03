import React, { Component } from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import { getUser } from "../../../utils/auth"
import { URL } from "../../../utils/crud"
import axios from "axios"

export default class SalaryExtraType extends Component {
  state = {
    salaryExtraType: [],
    newExtraSalary: "",
    returnData: [],
    editSalary: [],
    editExtraSalary: "",
    editActiveState: true,
  }

  async componentDidMount() {
    fetchData(`/SalaryExtraType`, data => {
      this.setState({ salaryExtraType: data })
      console.log(data, "data")
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.returnData != this.state.returnData) {
      fetchData(`/SalaryExtraType`, data => {
        this.setState({ salaryExtraType: data })
        console.log(data, "data")
      })
    }
  }

  addSalaryData = async () => {
    const salaryData = {
      name: this.state.newExtraSalary,
      active: true,
    }

    postData(`/SalaryExtraType`, salaryData, data => {
      this.setState({ returnData: data })
      console.log(data, "returnData")
    })
  }

  editSalaryData = async data => {
    let myHeaders = () => {
      const user = getUser()
      const authorization = `Bearer ${user.token}`
      const fetchHeader = new Headers()
      fetchHeader.append("content-type", `application/json`)
      fetchHeader.append("Authorization", authorization)
      return fetchHeader
    }

    const salaryData = {
      name: this.state.editExtraSalary,
      active: this.state.editActiveState,
      id: data.id,
    }

    try {
      const res = await axios({
        method: "put",
        url: URL + `/SalaryExtraType/${data.id}`,
        headers: myHeaders(),
        data: salaryData,
      })
      return this.setState({ returnData: res })
    } catch (err) {
      return console.log(err)
    }
  }

  deleteSalaryData = async data => {
    let myHeaders = () => {
      const user = getUser()
      const authorization = `Bearer ${user.token}`
      const fetchHeader = new Headers()
      fetchHeader.append("content-type", `application/json`)
      fetchHeader.append("Authorization", authorization)
      return fetchHeader
    }

    try {
      const res = await axios({
        method: "delete",
        url: URL + `/SalaryExtraType/${data.id}`,
        headers: myHeaders(),
      })
      return this.setState({ returnData: res })
    } catch (err) {
      return console.log(err)
    }
  }

  render() {
    return (
      <div>

          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Payroll{" "}
                <span className="h3 text-muted">
                  /Extra Salary Types
                </span>
              </h6>
              <span className="text-sm d-block">
                Create and manage Extra Salary Types.
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row justify-content-center">
              <div className="col-md-8">

                    <div className="card">
                      <div className="card-header">
                        <div className="row justify-content-between">
                          <h3>Salary Extra Type</h3>

                          <button className="btn btn-outline-primary btn-icon btn-sm float-right"
                            type="button" data-toggle="modal" data-target=".new-types-modal" >
                              <span className="btn-inner--icon">
                                <i className="fa fa-plus" />
                              </span>
                              <span className="btn-inner--text">Add Extra Salary Type</span>
                        </button>
                        </div>
                      </div>

                      <div className="card-body">

                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Active</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.salaryExtraType &&
                                this.state.salaryExtraType.length > 0
                                  ? this.state.salaryExtraType.map(salary => {
                                      return (
                                        <tr key={salary.id}>
                                          <td>
                                            <h5 className="mt-2">{salary.name}</h5>
                                          </td>
                                          <td>
                                            <h5 className="mt-2">
                                              {salary.active ? "True" : " False"}
                                            </h5>
                                          </td>
                                          <td>
                                            <h5 className="mt-2">
                                              <span
                                                onClick={() => {
                                                  this.setState({
                                                    editSalary: salary,
                                                    editExtraSalary: salary.name,
                                                    editActiveState: salary.active,
                                                  })
                                                }}
                                                className="h2 cpoint mr-4"
                                                data-toggle="modal"
                                                data-target=".edit-types-modal"
                                              >
                                                <i className="d-inline fa fa-edit" />
                                              </span>
                                              <span
                                                onClick={() => this.deleteSalaryData(salary)}
                                                className="h2 cpoint"
                                                data-toggle="modal"
                                                data-target=".delete-types-modal"
                                              >
                                                <i className="fa fa-trash" />
                                              </span>
                                            </h5>
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
                  Add New Extra Salary
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
                        Extra Salary Type Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="newExtraSalary"
                        value={this.state.newExtraSalary}
                        onChange={this.handleChange}
                      />
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() => this.addSalaryData()}
                      data-dismiss="modal"
                    >
                      Create Extra Salary Type
                    </button>
                  </div>
                  <div className="col-md-6"></div>
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
                  Edit Extra Salary
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
                        Extra Salary Type Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="editExtraSalary"
                        value={this.state.editExtraSalary}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Active State
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="editActiveState"
                        value={this.state.editActiveState}
                        onChange={this.handleChange}
                      />
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() => this.editSalaryData(this.state.editSalary)}
                      data-dismiss="modal"
                    >
                      Edit Extra Salary Type
                    </button>
                  </div>
                  <div className="col-md-6"></div>
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
    )
  }
}
