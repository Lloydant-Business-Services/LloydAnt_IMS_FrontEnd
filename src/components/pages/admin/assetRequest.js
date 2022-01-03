import React from "react"
import { Link, navigateTo, navigate } from "gatsby"
import { fetchData, editData, postData } from "../../../utils/crud"
import StaffAssetTable from "./StaffAssetTable"
import EditAsset from "./EditAsset"

export default class AssetRequest extends React.Component {
  state = {
    allStaff: [],
    allStaffSearch: [],
    assets: [],
    assetRequest: {
      staffId: 0,
      assetId: 0,
      serialNumber: "",
      id: 0,
    },
  }

  updatePersonItem = (index, value) => {
    const { assetRequest } = this.state
    assetRequest[index] = value
    this.setState({ ...this.state, assetRequest })
  }

  loadAssets = () => {
    fetchData(`/Assets`, data => {
      this.setState({ assets: data })
    })
  }

  loadStaff = () => {
    fetchData("/Staff", data => {
      this.setState({ allStaff: data, allStaffSearch: data })
    })
  }

  loadStaffAssets = () => {
    fetchData("/StaffAssets", data => {
      this.setState({ staffAssets: data, staffAssetsSearch: data })
    })
    setTimeout(() => {
      console.log(this.state.staffAssets, "Staff Assets")
    }, 4000)
  }

  componentDidMount() {
    fetchData("/StaffAssets/", data => {
      this.setState({ staffAssets: data, staffAssetsSearch: data })
      let mappedAssets = data.map((d, index) => {
        return {
          sn: index + 1,
          assetType: d.asset.assetType.name,
          assetName: d.asset.name,
          serialNumber: d.serialNumber,
          assetCode: d.assetNumber,
          staffName: `${d.staff.person.surname} ${d.staff.person.firstname} ${d.staff.person.othername} `,
          action: (
            <Link state={d} to={"/app/admin/EditAsset"}>
              <i className="fa fa-edit pt-1" />
            </Link>
          ),
        }
      })

      this.setState({
        listAsset: mappedAssets,
      })
    })

    this.loadAssets()
    this.loadStaff()
    this.loadStaffAssets()
  }

  setSelectedData = data => {
    let { assetRequest } = this.state
    assetRequest = data
    this.setState({ ...this.state, assetRequest })
  }

  addForm = () => {
    postData(`/TrainingRequest`, this.state.leaveRequest, data => {
      if (data) {
        this.loadRequests()
      }
    })
  }

  isValidInputs = () => {
    return true
  }

  submitForm = () => {
    if (this.isValidInputs()) {
      postData(`/StaffAssets`, this.state.assetRequest, data => {
        this.loadStaffAssets()
      })
    }
  }

  updateForm = () => {
    editData(
      `/StaffAssets/${this.state.assetRequest.id}`,
      this.state.assetRequest,
      data => {
        if (data) {
          this.loadStaffAssets()
        }
      }
    )
    this.loadStaffAssets()
  }

  _calculateDuration = (startDate, endDate) => {
    // To set two dates to two variables
    const _start = new Date(startDate)
    const _end = new Date(endDate)

    // To calculate the time difference of two dates
    const Difference_In_Time = _end.getTime() - _start.getTime()

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
    return Difference_In_Days
  }

  render() {
    return (
      <>
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Assets<span className="h3 text-muted">/Staff assets</span>
              </h6>
            </div>
          </div>
          <StaffAssetTable passedAssets={this.state.listAsset} />
          {/* Card stats */}
          {/* <div className="row">
            <hr className="mx-0" />
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="card-title mb-0 float-left mr-3">
                        All Institution Assets
                      </h3>
                    </div>
                    <div className="col">
                      <div>
                        <button
                          className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                          type="button"
                          data-toggle="modal"
                          data-target=".new-level-modal"
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            Assign Asset to Staff
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
                          <th>S/No</th>
                          <th>Asset Type</th>
                          <th>Asset Name</th>
                          <th>Serial Number</th>
                          <th>Asset Code</th>
                          <th>Staff Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.staffAssets &&
                        this.state.staffAssets.length > 0
                          ? this.state.staffAssets.map((asset, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1} </td>
                                  <td>{asset.asset.assetType.name} </td>
                                  <td>{asset.asset.name} </td>
                                  <td>{asset.serialNumber} </td>
                                  <td>{asset.assetNumber} </td>
                                  <td>
                                    {asset.staff.person.surname}{" "}
                                    {asset.staff.person.firstname}{" "}
                                    {asset.staff.person.othername}{" "}
                                  </td>
                                  <td className="td-actions">
                                    <button
                                      onClick={() =>
                                        this.setSelectedData(asset)
                                      }
                                      type="button"
                                      rel="tooltip"
                                      className="btn btn-primary btn-icon btn-sm "
                                      data-toggle="modal"
                                      data-target=".edit-level-modal"
                                    >
                                      <i className="fa fa-edit pt-1" />
                                    </button>
                                    <button onClick={()=>this.setSelectedData(staff)} type="button" rel="tooltip" className="btn btn-danger btn-icon btn-sm " data-toggle="modal" data-target=".delete-level-modal">
                                                                            <i className="fa fa-trash pt-1" />
                                                                        </button>
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
          </div> */}
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
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Assign Asset
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
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Staff{" "}
                          </label>
                          <select
                            className="form-control select-search-dropdown"
                            name="staffId"
                            onChange={e => {
                              this.updatePersonItem(
                                "staffId",
                                parseInt(e.target.value)
                              )
                            }}
                            required
                          >
                            <option>Select a Staff</option>
                            {this.state.allStaff &&
                            this.state.allStaff.length > 0
                              ? this.state.allStaff.map(staff => {
                                  return (
                                    <option key={staff.id} value={staff.id}>
                                      {staff.staffNumber} -{" "}
                                      {staff.person.surname}{" "}
                                      {staff.person.firstname}{" "}
                                      {staff.person.othername}
                                    </option>
                                  )
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
                            Asset
                          </label>
                          <select
                            className="form-control select-search-dropdown"
                            name="assetId"
                            onChange={e => {
                              this.updatePersonItem(
                                "assetId",
                                parseInt(e.target.value)
                              )
                            }}
                            required
                          >
                            <option>Select an Asset</option>
                            {this.state.assets && this.state.assets.length > 0
                              ? this.state.assets.map(asset => {
                                  return (
                                    <option key={asset.id} value={asset.id}>
                                      {asset.name}
                                    </option>
                                  )
                                })
                              : null}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Serial Number
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="serialNumber"
                            onChange={e => {
                              this.updatePersonItem(
                                "serialNumber",
                                e.target.value
                              )
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => this.submitForm()}
                      data-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
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
          {/* modal here */}
          {/* <EditAsset id="assetEdit" /> */}
          <div
            className="modal fade edit-level-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Edit News
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
                          Staff{" "}
                        </label>
                        <select
                          className="form-control select-search-dropdown"
                          name="staffId"
                          onChange={e => {
                            this.updatePersonItem(
                              "staffId",
                              parseInt(e.target.value)
                            )
                          }}
                          required
                        >
                          <option>Select a Staff</option>
                          {this.state.allStaff && this.state.allStaff.length > 0
                            ? this.state.allStaff.map(staff => {
                                return (
                                  <option
                                    key={staff.id}
                                    selected={
                                      staff.id ==
                                      this.state.assetRequest.staffId
                                    }
                                    value={staff.id}
                                  >
                                    {staff.staffNumber} - {staff.person.surname}{" "}
                                    {staff.person.firstname}{" "}
                                    {staff.person.othername}
                                  </option>
                                )
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
                          Asset
                        </label>
                        <select
                          className="form-control select-search-dropdown"
                          name="assetId"
                          onChange={e => {
                            this.updatePersonItem(
                              "assetId",
                              parseInt(e.target.value)
                            )
                          }}
                          required
                        >
                          <option>Select an Asset</option>
                          {this.state.assets && this.state.assets.length > 0
                            ? this.state.assets.map(asset => {
                                return (
                                  <option
                                    key={asset.id}
                                    selected={
                                      asset.id ==
                                      this.state.assetRequest.assetId
                                    }
                                    value={asset.id}
                                  >
                                    {asset.name}
                                  </option>
                                )
                              })
                            : null}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Serial Number
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="serialNumber"
                          value={this.state.assetRequest.serialNumber}
                          onChange={e => {
                            this.updatePersonItem(
                              "serialNumber",
                              e.target.value
                            )
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => this.updateForm()}
                    data-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Update
                  </button>
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
                      <button
                        data-dismiss="modal"
                        onClick={() => this.deleteNews()}
                        className="btn btn-outline-danger"
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
