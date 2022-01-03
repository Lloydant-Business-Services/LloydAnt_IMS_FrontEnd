import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"

export default class Department extends React.Component {
  state = {
    types: [],
    units: [],
    name: "",
    id: 0,
    active: true,
  }

  componentDidMount() {
    fetchData("/JobType", data => {
      this.setState({ types: data })
    })

    fetchData("/InstitutionUnits", data => {
      this.setState({ units: data })
    })
  }

  addType = () => {
    if (this.state.name !== "") {
      const type = {
        id: 0,
        name: this.state.name,
        active: this.state.active,
      }
      postData("/JobType", type, data => {
        const { types } = this.state
        types.push(data)
        this.setState({ ...this.state, types, name: "", active: true })
      })
    }
  }

  addUnit = () => {
    if (this.state.name !== "") {
      const unit = {
        id: 0,
        name: this.state.name,
        active: true,
      }
      postData("/InstitutionUnits", unit, data => {
        const { units } = this.state
        units.push(data)
        this.setState({ ...this.state, units, name: "", active: true })
      })
    }
  }

  updateUnit = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      const unit = {
        id: this.state.id,
        name: this.state.name,
        active: this.state.active,
      }
      editData(`/InstitutionUnits/${this.state.id}`, unit, () => {
        fetchData("/InstitutionUnits", data => {
          this.setState({ units: data })
        })
      })
    }
  }

  deleteUnit = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/InstitutionUnits/${this.state.id}`, () => {
        fetchData("/InstitutionUnits", data => {
          this.setState({ units: data })
        })
      })
    }
  }

  updateType = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      const type = {
        id: this.state.id,
        name: this.state.name,
        active: this.state.active,
      }
      editData(`/JobType/${this.state.id}`, type, () => {
        fetchData("/JobType", data => {
          this.setState({ types: data })
        })
      })
    }
  }

  deleteType = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/JobType/${this.state.id}`, () => {
        fetchData("/JobType", data => {
          this.setState({ types: data })
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
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Dashboard <span className="h3 text-muted">/Job Types </span>
              </h6>
              <span className="text-sm d-block">
                Create and Manage Job Types.
              </span>
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
                      <h4 className="card-title mb-0">Job Types</h4>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-outline-primary btn-icon btn-sm float-right"
                          type="button"
                          data-toggle="modal"
                          data-target=".new-department-modal"
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">New Job Type</span>
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
                          <th>Job Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.types && this.state.types.length > 0
                          ? this.state.types.map(type => {
                              return (
                                <tr key={type.id}>
                                  <td>
                                    <h6 className="mt-2">{type.name}</h6>
                                  </td>
                                  <td>
                                    <span
                                      onClick={() => this.loadEditData(type)}
                                      className="cpoint mr-4"
                                      data-toggle="modal"
                                      data-target=".edit-department-modal"
                                    >
                                      <i className="d-inline fa fa-edit" />
                                    </span>
                                    <span
                                      onClick={() => this.loadEditData(type)}
                                      className="cpoint"
                                      data-toggle="modal"
                                      data-target=".delete-department-modal"
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
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Add New Unit
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Unit Name
                        </label>
                        <input
                          className="form-control"
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
                        onClick={() => this.addUnit()}
                      >
                        Create Unit
                      </button>
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
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Edit Unit
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Unit Name
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
                        Edit Unit
                      </button>
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
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Delete Unit?
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
                    className="btn btn-danger btn-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade new-department-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Add New Job Type
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Job Type Name
                        </label>
                        <input
                          className="form-control"
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
                        onClick={() => this.addType()}
                      >
                        Create Job Type
                      </button>
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
          <div
            className="modal fade edit-department-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Edit Job Type
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Job Type Name
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
                        onClick={() => this.updateType()}
                        className="btn btn-primary"
                      >
                        Edit Job Type
                      </button>
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
          <div
            className="modal fade delete-department-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Delete Job Type?
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
                        Are you sure you want to delete this ({this.state.name})
                        record? All items related to it will be affected
                      </p>
                      <button
                        onClick={() => this.deleteType()}
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
      </>
    )
  }
}
