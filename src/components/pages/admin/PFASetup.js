import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
// import { navigate } from "gatsby";
import { Container, ListGroupItemHeading, ModalHeader } from "reactstrap";
import DeptDataTable from "../admin/DeptDataTable";
import FacDataTable from "../admin/FacDataTable";
import DefaultDataTable from "../DataTables/CommonDataTable";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { Fade, Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";

export default class PFASetup extends React.Component {
  state = {
    departments: [],
    units: [],
    name: "",
    id: 0,
    active: true,
    showSpin: true,
  };

  componentDidMount() {


    fetchData("/Pfa/GetPFA", (data) => {
      this.setState({ pfaNameList: data });

      let mapName = data.map((d, i) => {
        return {
          sn: i + 1,
          name: d.name,
          action: (
            <span>
              <i className="fa fa-pencil-square-o" style={{cursor:"pointer"}} onClick={()=>this.loadEditData(d)}></i> &nbsp; &nbsp;
              <i className="fa fa-trash" style={{cursor:"pointer"}} onClick={()=>this.handleDeletePFAName(d)}></i>
            </span>
          ),
        };
      });
      //console.log(mapName, "Mapeed!!!!");

      this.setState({
        mappedPFAName: mapName,
        showSpin: false,
      });

      //setTimeout(() => {
      //     console.log(this.state.mappedPFAName, "New Dept....");
      //   }, 4000);
    });

    fetchData("/Pfa/GetPFAStatus", (data) => {
      this.setState({ pfaNameLists: data });

      let mappedStatus = data.map((d, i) => {
        return {
          sn: i + 1,
          name: d.name,
          action: (
            <span>
              <i className="fa fa-pencil-square-o" style={{cursor:"pointer"}} onClick={()=>this.loadPFAStatus(d)}></i> &nbsp; &nbsp;
              <i className="fa fa-trash" style={{cursor:"pointer"}} onClick={()=>this.handleDeletePFAStatus(d)}></i>
            </span>
          ),
        };
      });
      console.log(mappedStatus, "Mapeed!!!!");

      this.setState({
        mappedPFAStatus: mappedStatus,
        showSpin: false,
      });

      //   setTimeout(() => {
      //     console.log(this.state.mappedPFAName, "New Dept....");
      //   }, 4000);
    });
   

    fetchData("/InstitutionUnits", (data) => {
      this.setState({ units: data });
    });
  }
  navigateUpload = () => {
    // navigate("/app/admin/UploadDepartment")
  };

 




  postPFA = (e) => {
    e.preventDefault();
    this.setState({
      addPFACard: false,
      showSpin: true,
    });
    const mappedPFAName = {
      name: this.state.name,
    };
    postData("/Pfa/AddPFA", mappedPFAName, (data) => {
      console.log(data, "Data!!!!");
      if (data==200) {
        // alert("Added Successfully");
        this.setState({ added: true, showSpin: false });
        this.componentDidMount();
      }
    });
  };



  togglePFACard = () => {
    if (!this.state.addPFACard) {
      this.setState({ addPFACard: true, name: " ", Title: "Add" });
    } else {
      this.setState({ addPFACard: false });
    }
  };


  


  loadEditData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      selectedFaculty:data.facultyId,
      addPFACard: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateDepartments = () => {
    this.setState({
      addPFACard: true,
      name: " ",
      Title: "Add",
    });
  };
  handleDeletePFAName = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteDepartments: true,
    });
  };
  closeDelete = () => {
    this.setState({ deleteDepartments: false });
  };

  initiateUpdate = () => {
    this.setState({spin:true, addPFACard:false})
    let selectedData = {
      name: this.state.name,
      id: this.state.id,
    };
    editData(`/Pfa/EditPFAName?id=${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDelete = () => {
    this.setState({deleteDepartments:false})
    deleteData(`/Pfa/DeletePFAName?id=${this.state.id}`, data => {
      console.log(data)
      this.componentDidMount();
    this.setState({notice:true})

    })
  }


//Faculty Section
  postPFAStatus = (e) => {
    e.preventDefault();
    this.setState({
      addPFAStatusCard: false,
      showSpin: true,
    });
    const mappedPFAStatus = {
      name: this.state.name,
      active: true,
    };
    postData("/Pfa/AddPFAStatus", mappedPFAStatus, (data) => {
      console.log(data, "Data!!!!");
      if (data == 200) {
        // alert("Added Successfully");
        this.setState({ added: true, showSpin: false });
        this.componentDidMount();
      }
    });
  };
  
  togglePFAStausCard = () => {
    if (!this.state.addPFAStatusCard) {
      this.setState({ addPFAStatusCard: true, name: " ", Title: "Add" });
    } else {
      this.setState({ addPFAStatusCard: false });
    }
  };

  loadPFAStatus = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      addPFAStatusCard: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  // handleCreateFaculty = () => {
  //   this.setState({
  //     addPFAStatusCard: true,
  //     facultyName: " ",
  //     Title: "Add",
  //   });
  // };
  handleDeletePFAStatus = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      deletePFAStaus: true,
    });
  };
  closeDeletePFAStatus = () => {
    this.setState({ deletePFAStaus: false });
  };

  initiateUpdatePFAStatus = () => {
    this.setState({spin:true, addPFAStatusCard:false})
    let selectedData = {
      name: this.state.name,
      active:true,
      id: this.state.id
    };
    editData(`/Pfa/EditPFAStatus?id=${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDeletePFAStatus = () => {
    this.setState({deletePFAStaus:false})
    deleteData(`/Pfa/DeletePFAStatus?id=${this.state.id}`, data => {
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
        {this.state.deleteDepartments ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}


{this.state.deletePFAStaus ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDeletePFAStatus}
            confirm={this.initiateDeletePFAStatus}
          />
        ) : null}
        <Modal isOpen={this.state.added}>
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">PFA was Successfully Added!</h3>
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
          isOpen={this.state.addPFACard}
          // style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.Title} PFA</ModalHeader>
          <ModalBody>
            

          <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                     PFA Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      class="form-control col-12"
                      defaultValue={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </div>

        
          </ModalBody>
          <ModalFooter>
            {this.state.Title == "Add" ? <button
              className="btn btn-info"
              onClick={(e) => {
                this.postPFA(e);
              }}
            >
              Add PFA
            </button> : 
            <button
            className="btn btn-info"
            onClick={this.initiateUpdate}
          >
            Update PFA
          </button>
            }
            <button
              className="btn btn-danger"
              onClick={this.togglePFACard}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>








        <Modal
          isOpen={this.state.addPFAStatusCard}
          // style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.Title} PFA Status</ModalHeader>
          <ModalBody>
            

          <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Status Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      class="form-control col-12"
                      defaultValue={this.state.name}
                      onChange={(e) => {
                        this.setState({name: e.target.value });
                      }}
                    />
                  </div>

        
          </ModalBody>
          <ModalFooter>
            {this.state.Title == "Add" ? <button
              className="btn btn-info"
              onClick={(e) => {
                this.postPFAStatus(e);
              }}
            >
              Add PFA Status
            </button> : 
            <button
            className="btn btn-info"
            onClick={this.initiateUpdatePFAStatus}
          >
            Update PFA Status
          </button>
            }
            <button
              className="btn btn-danger"
              onClick={this.togglePFAStausCard}
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
                PFA Names/PFA Status{" "}
                <span className="h3 text-muted"></span>
              </h1>
              <span className="text-sm d-block">
                Create and manage PFA Names
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row">
            <hr className="mx-0" />
            <div className="col-md-6 mt-4">
              {/* <div className="card"> */}
                {/* <div className="card" style={{ width: "750px" }}> */}
                  <div className="card-header">
                    <div className="justify-content-between">
                      <div>
                        <span className="h4 card-title mb-0 mr-2">
                          PFA Name
                        </span>
{/* 
                        <button
                          onClick={this.navigateUpload}
                          className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                          id="upl"
                          type="button"
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-file" />
                          </span>
                          <span className="btn-inner--text">
                            Upload Departments
                          </span>
                        </button> */}
                        <button
                          className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                          type="button"
                          onClick={this.togglePFACard}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            Add PFA
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <DefaultDataTable passedDept={this.state.mappedPFAName} />
                </div>







                <div className="col-md-6 mt-4">
              {/* <div className="card"> */}
                {/* <div className="card" style={{ width: "750px" }}> */}
                  <div className="card-header">
                    <div className="justify-content-between">
                      <div>
                        <span className="h4 card-title mb-0 mr-2">
                          PFA Status
                        </span>
{/* 
                        <button
                          onClick={this.navigateUpload}
                          className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                          id="upl"
                          type="button"
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-file" />
                          </span>
                          <span className="btn-inner--text">
                            Upload Departments
                          </span>
                        </button> */}
                        <button
                          className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                          type="button"
                          onClick={this.togglePFAStausCard}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            Add PFA Status
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <DefaultDataTable passedDept={this.state.mappedPFAStatus} />
                </div>
              </div>
            {/* </div> */}
          {/* </div> */}
        </div>
      </>
    );
  }
}
