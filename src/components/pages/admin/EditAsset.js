import React, { Component } from "react"
import { fetchData, editData, postData } from "../../../utils/crud"

class EditAsset extends Component {
  state = {
    allStaff1: this.props.location.state,
    assetRequest: {
      staffId: "",
      assetId: 0,
      serialNumber: "",
      id: "",
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

  componentDidMount() {
    console.log(this.state.allStaff1)
    this.loadStaff()
    this.loadAssets()
    fetchData("/StaffAssets", data => {
      this.setState({ staffAssets: data, staffAssetsSearch: data })
    })
    setTimeout(() => {
      console.log(this.state.staffAssets, "Staff Assets")
    }, 4000)
  }
  updateForm = () => {
    editData(
      `/StaffAssets/${this.state.allStaff1.id}`,
      this.state.assetRequest,
      data => {
        if (data) {
          console.log(this.state.assetRequest)
          setTimeout(() => {
            // window.location.reload(true)
          }, 3000)
          // this.loadStaffAssets()
        }
      }
    )
    // this.loadStaffAssets()
  }

  render() {
    return (
      <div>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-bottom">
              <h2 className="mb-0" id="exampleModalScrollableTitle">
                Edit Asset Assignment
              </h2>
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
                                  staff.id == this.state.allStaff1.staffId
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
                                  asset.id == this.state.allStaff1.assetId
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
                      value={this.state.allStaff1.serialNumber}
                      onChange={e => {
                        this.updatePersonItem("serialNumber", e.target.value)
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
          </div>
        </div>
      </div>
    )
  }
}

export default EditAsset
