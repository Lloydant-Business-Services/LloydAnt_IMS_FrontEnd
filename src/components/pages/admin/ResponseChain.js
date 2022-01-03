import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
// import { navigate } from "gatsby";
import { Container, ListGroupItemHeading, ModalHeader } from "reactstrap";
import ResponseChainDataTable from "../admin/ResponseChainDataTable";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { Fade, Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { _PointOne, _PointTwo, _PointThree } from "../../Barn";

export default class ResponseChain extends React.Component {
  state = {
    ResponseChains: [],
    units: [],
    name: "",
    id: 0,
    active: true,
    showSpin: false,
  };

  componentDidMount() {
    fetchData("/LeaveRequestManagement/GetLeaveResponseChain", (data) => {
      this.setState({ ResponseChains: data });
      console.log(data, "raw chain")

      let mappedDept = data.map((d, i) => {
        return {
          sn: i + 1,
          leaveType: d.leaveName,
          roleName: d.roleName,
          leaveTypeId:d.leaveTypeId,
          roleId:d.roleId,
          order:
            d.order == _PointOne
              ? "First"
              : d.order == _PointTwo
              ? "Second"
              : d.order == _PointThree
              ? "Third"
              : null,
          action: (
            <span onClick={() => this.loadEditData(d)} style={{cursor:"pointer"}}>
              <i className="fa fa-pencil-square-o"></i> &nbsp; &nbsp;
            </span>
          ),
        };
      });
      console.log(mappedDept, "Mapeed!!!!");

      this.setState({
        newDept: mappedDept,
        showSpin: false,
      });

      //   setTimeout(() => {
      //     console.log(this.state.newDept, "New Dept....");
      //   }, 4000);
    });
    this.loadLeaveType();
    this.loadRoles();

    fetchData("/InstitutionUnits", (data) => {
      this.setState({ units: data });
    });
  }
  navigateUpload = () => {
    // navigate("/app/admin/UploadResponseChain")
  };

  loadLeaveType = () => {
    fetchData("/LeaveType", (data) => {
      this.setState({ leaveType: data });
    });
  };

  loadRoles = () => {
    fetchData("/Roles", (data) => {
      this.setState({ roles: data });
    });
  };

  updateResponseChain = () => {
    
      const ResponseChain = {
        id: this.state.id,
        leaveTypeId: this.state.selecteLeave,
        order:this.state.selectedAction,
        roleId: this.state.selectedRole

      };
      editData(
        `/LeaveRequestManagement/UpdateResponseChain?chainId=${this.state.selectedId}`,
        ResponseChain,
        () => {
         this.componentDidMount();
        }
      );
    
  };

  deleteResponseChain = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/InstitutionResponseChains/${this.state.id}`, () => {
        fetchData("/InstitutionResponseChains", (data) => {
          this.setState({ ResponseChains: data });
          alert("Updated");
        })
      });
    }
  };

  loadEditData = (data) => {
    this.setState({
      selecteLeave: data.leaveTypeId,
      selectedRole: data.roleId,
      selectedAction: data.order,
      addResponseChainCard:true,
      selectedId:data.id,
      title:"Edit"
    });
    console.log(data, "Chain Data")
  };

  postResponseChain = (e) => {
    e.preventDefault();
    this.setState({
      addResponseChainCard: false,
      showSpin: true,
    });
    const newPayload = {
      leaveTypeId: this.state.selecteLeave,
      roleId: this.state.selectedRole,
      order: this.state.selectedAction,
    };
    postData(
      "/LeaveRequestManagement/AddLeaveResponseChain",
      newPayload,
      (data) => {
        console.log(data, "Data!!!!");
        if (data > 0) {
          // alert("Added Successfully");
          this.setState({ added: true, showSpin: false });
          this.componentDidMount();
        }
      }
    );
  };

  toggleResponseChainCard = () => {
    if (!this.state.addResponseChainCard) {
      this.setState({ addResponseChainCard: true, title:"Add", selecteLeave:"", selectedRole:"" });
    } else {
      this.setState({ addResponseChainCard: false });
    }
  };

  render() {
    return (
      <>
        <Modal isOpen={this.state.added}>
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">
              Response Chain was Successfully Added!
            </h3>
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

        <Modal
          isOpen={this.state.addResponseChainCard}
          style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.title} Response Chain</ModalHeader>
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
                    onChange={(e) => {
                      this.setState({ selecteLeave: parseInt(e.target.value) });
                    }}
                  >
                    <option>Select Leave Type</option>

                    {this.state.leaveType &&
                      this.state.leaveType.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selecteLeave}
                        
                        >{type.name}</option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Role
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedRole: parseInt(e.target.value) });
                    }}
                  >
                    <option>Select Role</option>
                    {this.state.roles &&
                      this.state.roles.map((role, i) => (
                        <option 
                    selected={role.id == this.state.selectedRole}

                        
                        value={role.id}>{role.name}</option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Chain of Action
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({
                        selectedAction: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option>Select Chain of Action</option>
                    <option value="1">First Action</option>
                    <option value="2">Second Action</option>
                    <option value="3">Third Action</option>
                  </select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.title == "Add" ? <button
              className="btn btn-info"
              onClick={(e) => {
                this.postResponseChain(e);
              }}
            >
              Add Response Chain
            </button> 
          : this.state.title == "Edit" ? 
          <button
          className="btn btn-info"
          onClick={
            this.updateResponseChain}
        >
          Update Response Chain
        </button> : null
          }
            <button
              className="btn btn-danger"
              onClick={this.toggleResponseChainCard}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        {this.state.showSpin ? <Spinner msg={"Loading..."} /> : null}

        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h1 className="d-inline-block mb-0 pop-font">
                Leave Response Chain Setup{" "}
                <span className="h3 text-muted"></span>
              </h1>
              <span className="text-sm d-block">
                Create and manage Leave Response Order
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row justify-content-center">
            <hr className="mx-0" />
            <div className="col-md-7 mt-4">
              <div className="card">
                <div className="card" style={{ width: "750px" }}>
                  <div className="card-header">
                    <div className="justify-content-between">
                      <div>
                        <span className="h4 card-title mb-0 mr-2">
                          Response Chain List
                        </span>

                        <button
                          className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                          type="button"
                          onClick={this.toggleResponseChainCard}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            Add a Response Chain
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <ResponseChainDataTable passedDept={this.state.newDept} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
