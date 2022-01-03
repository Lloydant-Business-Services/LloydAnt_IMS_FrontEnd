import React from "react";
import {
  fetchData,
  postData,
  editData,
  deleteData,
  URL,
} from "../../../utils/crud";
import axios from "axios";
import {
  Fade,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import Spinner from "./Spinner";
import * as _ from "lodash";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";

export default class Leave extends React.Component {
  state = {
    leaves: [],
    leavesTypes: [],
    staffTypes: [],
    ranks: [],
    name: "",
    id: 0,
    leavesTypeId: 0,
    staffTypeId: 0,
    rankId: 0,
    leaveId: 0,
    duration: 0,
    active: true,
    payLoad: JSON.parse(localStorage.getItem("userData")),
    personDTO: JSON.parse(localStorage.getItem("DTOFULL")),
  };

  loadLeave = () => {
    const currentState = this;
    const AuthStr = "Bearer ".concat(this.state.payLoad.token);

    axios
      .get(URL + "/LeaveType", {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then((response) => {
        //    console.log(response.data, "Broad!!!!!!")
        currentState.setState({
          leaves: response.data,
        });
      });
  };

  loadLeaveAssignments = () => {
    const currentState = this;
    const AuthStr = "Bearer ".concat(this.state.payLoad.token);

    axios
      .get(URL + "/LeaveAssignments", {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then((response) => {
        //    console.log(response.data, "Broad!!!!!!")
        currentState.setState({
          leavesTypes: response.data,
        });
      });
  };

  componentDidMount() {
    this.loadLeave();
    this.loadLeaveType();
    this.loadRanks();
    this.loadLeaveAssignments();

    fetchData("/InstitutionStaffTypes", (data) => {
      this.setState({ staffTypes: data });
    });

    fetchData("/InstitutionRanks", (data) => {
      this.setState({ ranks: data });
    });
  }

  addLeave = () => {
    if (this.state.name !== "" && this.state.staffTypeId > 0) {
      const asset = {
        id: 0,
        staffTypeId: parseInt(this.state.staffTypeId),
        name: this.state.name,
        active: true,
      };

      postData("/Leaves", asset, (data) => {
        fetchData("/Leaves", (data) => {
          this.setState({ leaves: data });
        });
      });
    } else {
      alert("Select all fields!");
    }
  };

  updateLeave = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      const asset = {
        id: this.state.id,
        name: this.state.name,
        active: this.state.active,
        staffTypeId: parseInt(this.state.staffTypeId),
      };
      editData(`/Leaves/${this.state.id}`, asset, () => {
        fetchData("/Leaves", (data) => {
          this.setState({ leaves: data });
        });
      });
    }
  };

  deleteAsset = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/Leaves/${this.state.id}`, () => {
        fetchData("/Leaves", (data) => {
          this.setState({ leaves: data });
        });
      });
    }
  };

  addLeavesType = () => {
    if (
      this.state.leaveId > 0 &&
      this.state.rankId > 0 &&
      this.state.duration > 0
    ) {
      const assignment = {
        id: 0,
        leaveId: parseInt(this.state.leaveId),
        rankId: parseInt(this.state.rankId),
        duration: parseInt(this.state.duration),
      };
      postData("/LeaveAssignments", assignment, (data) => {
        const { leavesTypes } = this.state;
        fetchData("/LeaveAssignments", (data) => {
          this.setState({ leavesTypes: data });
        });
      });
    }
  };

  updateLeaveType = () => {
    if (this.state.leaveId > 0 && this.state.id > 0 && this.state.rankId > 0) {
      const assignment = {
        id: this.state.id,
        leaveId: parseInt(this.state.leaveId),
        rankId: parseInt(this.state.rankId),
        duration: parseInt(this.state.duration),
      };
      editData(`/LeaveAssignments/${this.state.id}`, assignment, () => {
        fetchData("/LeaveAssignments", (data) => {
          this.setState({ leavesTypes: data });
        });
      });
    }
  };

  deleteAssetType = () => {
    if (this.state.id > 0) {
      deleteData(`/LeaveAssignments/${this.state.id}`, () => {
        fetchData("/LeaveAssignments", (data) => {
          this.setState({ leavesTypes: data });
        });
      });
    }
  };

  loadEditData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      leaveId: data.leaveId ?? 0,
      staffTypeId: data.staffTypeId ?? 0,
      rankId: data.rankId ?? 0,
      duration: data.duration ?? 0,
    });
  };

  toggleLeaveCard = () => {
    if (!this.state.addLeaveCard) {
      this.setState({ addLeaveCard: true,  Title:"Add", leaveTypeName:" "});
    } else {
      this.setState({ addLeaveCard: false });
    }
  };
  toggleLeaveAssignmentCard = () => {
    if (!this.state.addLeaveAssignmentCard) {
      this.setState({ addLeaveAssignmentCard: true , Title:"Add"});
    } else {
      this.setState({ addLeaveAssignmentCard: false });
    }
  };
  postCreateLeaveTypeName = (e) => {
    e.preventDefault();
    this.setState({ addLeaveCard: false, showSpin: true });
    postData(
      `/LeaveType/CreateLeaveType?LeaveTypeName=${this.state.leaveTypeName}`,
      this.state.leaveTypeName,
      (data) => {
        if (data > 0) {
          console.log(data, "data");
          this.setState({ added: true, showSpin: false });
          this.componentDidMount();
        } else {
          alert("Error Occurred");
        }
      }
    );
  };

  assignLeaveType = (e) => {
    e.preventDefault();
    this.setState({ addLeaveAssignmentCard: false, showSpin: true });
    let leaveAssign = {
      leaveTypeId: this.state.selecteLeave,
      rankId: this.state.selectedRank,
      durationInDays: this.state.durationInDays,
    };
    postData(`/LeaveType/CreateLeaveTypeRank`, leaveAssign, (data) => {
      if (data > 0) {
        console.log(data, "data");
        this.setState({ added: true, showSpin: false });
        this.componentDidMount();
      } else {
        alert("Error Occurred");
      }
    });
  };
  loadLeaveType = () => {
    fetchData("/LeaveType", (data) => {
      this.setState({ leaveType: data });
    });
  };

  loadRanks = () => {
    fetchData("/institutionRanks", (data) => {
      this.setState({ ranks: data });
    });
  };

  getLeaveByRank = () => {
    fetchData(`/LeaveType/LeaveTypeRankByRank?RankId=${this.state.selectedRank}`, (data) => {
      this.setState({ fetchedLeaveType: data });
    });
  };

  handleSelectedLeaveType = (e) => {
    this.setState({ selecteLeave: parseInt(e.target.value) });
  }
  handleSelectedRank = (e) => {
    this.setState({ selectedRank: parseInt(e.target.value) });

  }



  loadLeaveEditData = (data) => {
    this.setState({
      leaveTypeName: data.name,
      id: data.id,
      active: data.active,
      addLeaveCard: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  // handleCreateLeaveType = () => {
  //   this.setState({
  //     createLeaveType: true,
  //     name: " ",
  //     Title: "Add",
  //   });
  // };
  handleDeleteLeaveType = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteLeaveType: true,
    });
  };
  closeDelete = () => {
    this.setState({ deleteLeaveType: false });
  };

  initiateUpdate = () => {
    this.setState({spin:true, addLeaveCard:false})
    let selectedData = {
      name: this.state.leaveTypeName,
      id: this.state.id,
      active:true
    };
    editData(`/LeaveType/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDelete = () => {
    this.setState({deleteLeaveType:false})
    deleteData(`/LeaveType/${this.state.id}`, data => {
      console.log(data)
      this.componentDidMount();
    this.setState({notice:true})

    })
  }





  render() {
    return (
      <>
       {this.state.notice ? <Notice message={"Action was Successful!"} okBtn={true} closeCard={()=>{this.setState({notice:false})}}/> : null}
      {this.state.spin ? <Spinner/> : null}
        {this.state.deleteLeaveType ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}
        {this.state.showSpin ? <Spinner msg={"Saving..."} /> : null}

        <Modal isOpen={this.state.added}>
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">Added Successfully!</h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"info"}
              onClick={() => {
                this.setState({ added: false });
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.addLeaveCard} style={{ maxWidth: "700px" }}>
          <ModalHeader>{this.state.Title} Leave Type</ModalHeader>
          <ModalBody>
            <form class="form-inline">
              <label for="email" class="mr-sm-2">
                Leave Type Name:{" "}
              </label>
              <input
                type="text"
                class="form-control col-9"
                defaultValue={this.state.leaveTypeName}
                onChange={(e) => {
                  this.setState({ leaveTypeName: e.target.value });
                }}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            {this.state.Title == "Add" ? <button
              className="btn btn-info"
              onClick={(e) => {
                this.postCreateLeaveTypeName(e);
              }}
            >
              Add Leave Type
            </button>
            : 
            <button
            className="btn btn-info"
            onClick={(e) => {
              this.initiateUpdate(e);
            }}
          >
            Update Leave Type
          </button>
            }
            <button className="btn btn-danger" onClick={this.toggleLeaveCard}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.addLeaveAssignmentCard}
          style={{ maxWidth: "700px" }}
        >
          <ModalHeader>Leave Assignment Action</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Leave Type
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={this.handleSelectedLeaveType}
                  >
                    <option>Select Leave Type</option>

                    {this.state.leaveType &&
                      this.state.leaveType.map((type, i) => (
                        <option value={type.id}>{type.name}</option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Rank
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={this.handleSelectedRank}
                  >
                    <option>Select Rank</option>
                    {this.state.ranks &&
                      this.state.ranks.map((rank, i) => (
                        <option value={rank.id}>{rank.name}</option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Duration In Days
                  </label>

                  <input
                    type="number"
                    className="form-control col-12"
                    onChange={(e) =>
                      this.setState({
                        durationInDays: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-info"
              onClick={(e) => {
                this.assignLeaveType(e);
              }}
            >
              Assign
            </button>
            <button
              className="btn btn-danger"
              onClick={this.toggleLeaveAssignmentCard}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={false} className="myModal">
          <ModalHeader></ModalHeader>
          <ModalBody>
            <div className="row card-body">
              <div className="col-md-4">
                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Department:
                  </label>
                  <select
                    className="form-control"
                    name="state"
                    onChange={this.handleDepartment}
                    required
                  >
                    <option>Select Department</option>
                    {this.state.institutionDepts &&
                      this.state.institutionDepts.map((a, i) => {
                        return <option value={a.id}>{a.name}</option>;
                      })}
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Staff Type:
                  </label>
                  <select
                    className="form-control"
                    name="state"
                    onChange={this.handleStaffType}
                    required
                  >
                    <option>Select Staff type</option>
                    {this.state.institutionStaffType &&
                      this.state.institutionStaffType.map((a, i) => {
                        return <option value={a.id}>{a.name}</option>;
                      })}
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Rank:
                  </label>
                  <select
                    className="form-control"
                    name="state"
                    onChange={this.handleRank}
                    required
                  >
                    <option>Select Rank</option>
                    {this.state.institutionRank &&
                      this.state.institutionRank.map((a, i) => {
                        return <option value={a.id}>{a.name}</option>;
                      })}
                  </select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-info" onClick={() => this.filterStaff()}>
              Load Staff List
            </button>

            <button
              className="btn btn-danger"
              onClick={this.toggleCombinedCard}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Dashboard{" "}
                  <span className="h3 text-muted">
                    /Leave Types
                  </span>
                </h6>
                <span className="text-sm d-block">
                  Create and edit Leave Types.
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
                        <h4 className="card-title mb-0">Leave Types</h4>
                      </div>
                      <div className="col">
                        <div>
                          <button
                            className="btn btn-primary btn-icon btn-sm float-right"
                            type="button"
                            data-toggle="modal"
                            onClick={this.toggleLeaveCard}
                          >
                            <span className="btn-inner--icon">
                              <i className="fa fa-plus" />
                            </span>
                            <span className="btn-inner--text">
                              Add Leave Type
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
                            <th>Leave Name</th>
                            {/* <th>Leave Type</th> */}
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.leaves && this.state.leaves.length > 0
                            ? this.state.leaves.map((leave) => {
                                return (
                                  <tr key={leave.id}>
                                    <td>
                                      <h5 className="mt-2">
                                        {_.upperCase(leave.name)}
                                      </h5>
                                    </td>
                                    {/* <td>
                                                                        <h5 className="mt-2">{leave.staffType.name}</h5>
                                                                    </td> */}
                                    <td>
                                      <span
                                        onClick={() => this.loadLeaveEditData(leave)}
                                        className="h2 cpoint mr-4"
                                       
                                      >
                                        <i className="fa fa-edit" />
                                      </span>
                                      <span
                                        onClick={() => this.handleDeleteLeaveType(leave)}
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
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div
                      className="row justify-content-center"
                      style={{ marginBottom: "40px" }}
                    >
                      <div className="form-group col-md-10">
                        <div className="row justify-content-center">
                          <div className="col-md-10">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Fetch Leave Assigments by Rank
                            </label>
                            <select
                              className="form-control col-12"
                              onChange={(e) => {
                                this.setState({
                                  selectedRank: parseInt(e.target.value),
                                });
                              }}
                            >
                              <option>Select Rank</option>
                              {this.state.ranks &&
                                this.state.ranks.map((rank, i) => (
                                  <option value={rank.id}>{rank.name}</option>
                                ))}
                            </select>
                          </div>
                          <div className="col-md-2">
                            <span
                              className=" btn btn-primary mt-3rem"
                              onClick={this.getLeaveByRank}
                            >
                              Load
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col">
                        <h4 className="card-title mb-0">Leave Assignment</h4>
                      </div>
                      <div className="col">
                        <div>
                          <button
                            className="btn btn-primary btn-icon btn-sm float-right"
                            type="button"
                            onClick={this.toggleLeaveAssignmentCard}
                          >
                            <span className="btn-inner--icon">
                              <i className="fa fa-plus" />
                            </span>
                            <span className="btn-inner--text">
                              New Leave Assignment
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
                            <th>Leave</th>
                            <th>Rank</th>
                            <th>Duration</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.fetchedLeaveType &&
                            this.state.fetchedLeaveType.map((f) => {
                              return (
                                <tr key={f.id}>
                                  <td>
                                    <h5 className="mt-2">{f.name}</h5>
                                  </td>
                                  <td>
                                    <h5 className="mt-2">{f.rankName}</h5>
                                  </td>
                                  <td>
                                    <h5 className="mt-2">{f.durationInDays}</h5>
                                  </td>
                                  <td>
                                    <span
                                      onClick={() => this.loadEditData(f)}
                                      className="h2 cpoint mr-4"
                                      data-toggle="modal"
                                      data-target=".edit-department-modal"
                                    >
                                      <i className="d-inline fa fa-edit" />
                                    </span>
                                    <span
                                      onClick={() => this.loadEditData(f)}
                                      className="h2 cpoint"
                                      data-toggle="modal"
                                      data-target=".delete-department-modal"
                                    >
                                      <i className="fa fa-trash" />
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
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
                      Add New Leave
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
                            Leave Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="unit"
                            value={this.state.name}
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
                            Staff Type
                          </label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ staffTypeId: e.target.value });
                            }}
                          >
                            <option>Select Asset Type</option>
                            {this.state.staffTypes &&
                            this.state.staffTypes.length > 0
                              ? this.state.staffTypes.map((staffType) => {
                                  return (
                                    <option
                                      key={staffType.id}
                                      value={staffType.id}
                                    >
                                      {staffType.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                        <button
                          type="button"
                          data-dismiss="modal"
                          className="btn btn-primary"
                          onClick={() => this.addLeave()}
                        >
                          Create Leave
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
                    <h2 className="mb-0" id="exampleModalScrollableTitle">
                      Edit Leave
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
                            Leave Name
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
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Leave Type
                          </label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ staffTypeId: e.target.value });
                            }}
                          >
                            <option>Select Leave Type</option>
                            {this.state.staffTypes &&
                            this.state.staffTypes.length > 0
                              ? this.state.staffTypes.map((assetType) => {
                                  return (
                                    <option
                                      key={assetType.id}
                                      selected={
                                        assetType.id == this.state.staffTypeId
                                      }
                                      value={assetType.id}
                                    >
                                      {assetType.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                        <button
                          onClick={() => this.updateLeave()}
                          className="btn btn-primary"
                        >
                          Edit Leave
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
                    <h2 className="mb-0" id="exampleModalScrollableTitle">
                      Delete Leave?
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
                          Are you sure you want to delete this (
                          {this.state.name}) record? All items related to it
                          will be affected
                        </p>
                        <button
                          onClick={() => this.deleteAsset()}
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
                      Add New Leave Assignment
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
                            Leave{" "}
                          </label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ leaveId: e.target.value });
                            }}
                          >
                            <option>Select Leave</option>
                            {this.state.leaves && this.state.leaves.length > 0
                              ? this.state.leaves.map((leave) => {
                                  return (
                                    <option key={leave.id} value={leave.id}>
                                      {leave.name}{" "}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Staff Rank
                          </label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ rankId: e.target.value });
                            }}
                          >
                            <option>Select Rank</option>
                            {this.state.ranks && this.state.ranks.length > 0
                              ? this.state.ranks.map((rank) => {
                                  return (
                                    <option key={rank.id} value={rank.id}>
                                      {rank.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Leave Duration (days)
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            name="unitName"
                            value={this.state.duration}
                            onChange={(e) => {
                              this.setState({ duration: e.target.value });
                            }}
                          />
                        </div>

                        <button
                          type="button"
                          data-dismiss="modal"
                          className="btn btn-primary"
                          onClick={() => this.addLeavesType()}
                        >
                          Assign leave
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
                      Edit Leave Type
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
                            Leave{" "}
                          </label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ leaveId: e.target.value });
                            }}
                          >
                            <option>Select Leave</option>
                            {this.state.leaves && this.state.leaves.length > 0
                              ? this.state.leaves.map((leave) => {
                                  return (
                                    <option
                                      key={leave.id}
                                      selected={leave.id == this.state.leaveId}
                                      value={leave.id}
                                    >
                                      {leave.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Staff Rank
                          </label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ rankId: e.target.value });
                            }}
                          >
                            <option>Select Rank</option>
                            {this.state.ranks && this.state.ranks.length > 0
                              ? this.state.ranks.map((rank) => {
                                  return (
                                    <option
                                      key={rank.id}
                                      selected={rank.id == this.state.rankId}
                                      value={rank.id}
                                    >
                                      {rank.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Leave Duration (days)
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            name="unitName"
                            value={this.state.duration}
                            onChange={(e) => {
                              this.setState({ duration: e.target.value });
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          data-dismiss="modal"
                          onClick={() => this.updateLeaveType()}
                          className="btn btn-primary"
                        >
                          Edit Leave Type
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
                      Delete Leave Type?
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
                          Are you sure you want to delete this (
                          {this.state.name}) record? All items related to it
                          will be affected
                        </p>
                        <button
                          onClick={() => this.deleteAssetType()}
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
        </Fade>
      </>
    );
  }
}
