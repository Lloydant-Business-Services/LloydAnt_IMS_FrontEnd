import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
// import { navigate } from "gatsby";
import { Container, ListGroupItemHeading, ModalHeader } from "reactstrap";
import DeptDataTable from "../admin/DeptDataTable";
import FacDataTable from "../admin/FacDataTable";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { Fade, Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";
import axios from "axios";


export default class Department extends React.Component {
  state = {
    departments: [],
    units: [],
    name: "",
    id: 0,
    active: true,
    showSpin: true,
  };

  componentDidMount() {
    fetchData("/InstitutionDepartments", (data) => {
      this.setState({ departments: data });

      let mappedDept = data.map((d, i) => {
        return {
          sn: i + 1,
          name: d.name,
          facultyName: d.facultyName,
          action: (
            <span>
              <i className="fa fa-pencil-square-o" style={{cursor:"pointer"}} onClick={()=>this.loadEditData(d)}></i> &nbsp; &nbsp;
              <i className="fa fa-trash" style={{cursor:"pointer"}} onClick={()=>this.handleDeleteDepartments(d)}></i>
            </span>
          ),
        };
      });
      // console.log(mappedDept, "Mapeed!!!!");

      this.setState({
        newDept: mappedDept,
        showSpin: false,
      });

      //   setTimeout(() => {
      //     console.log(this.state.newDept, "New Dept....");
      //   }, 4000);
    });

    fetchData("/Faculty", (data) => {
      this.setState({ faculties: data });

      let mappedFac = data.map((d, i) => {
        return {
          sn: i + 1,
          name: d.name,
          action: (
            <span>
              <i className="fa fa-pencil-square-o" style={{cursor:"pointer"}} onClick={()=>this.loadFacultyData(d)}></i> &nbsp; &nbsp;
              <i className="fa fa-trash" style={{cursor:"pointer"}} onClick={()=>this.handleDeleteFaculty(d)}></i>
            </span>
          ),
        };
      });
      console.log(mappedFac, "Mapeed!!!!");

      this.setState({
        newFac: mappedFac,
        showSpin: false,
      });

      //   setTimeout(() => {
      //     console.log(this.state.newDept, "New Dept....");
      //   }, 4000);
    });
   

    fetchData("/InstitutionUnits", (data) => {
      this.setState({ units: data });
    });
  }
  navigateUpload = () => {
    // navigate("/app/admin/UploadDepartment")
  };

 




  postDepartment = (e) => {
    e.preventDefault();
    this.setState({
      addDepartmentCard: false,
      showSpin: true,
    });
    const newDept = {
      name: this.state.name,
      facultyId: this.state.selectedFaculty,
      active: true,
    };
    postData("/InstitutionDepartments", newDept, (data) => {
      console.log(data, "Data!!!!");
      if (data==200) {
        // alert("Added Successfully");
        this.setState({ added: true, showSpin: false });
        this.componentDidMount();
      }
    });
  };



  toggleDepartmentCard = () => {
    if (!this.state.addDepartmentCard) {
      this.setState({ addDepartmentCard: true, name: " ", Title: "Add" });
    } else {
      this.setState({ addDepartmentCard: false });
    }
  };


  


  loadEditData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      selectedFaculty:data.facultyId,
      addDepartmentCard: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateDepartments = () => {
    this.setState({
      addDepartmentCard: true,
      name: " ",
      Title: "Add",
    });
  };
  handleDeleteDepartments = (data) => {
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
    this.setState({spin:true, addDepartmentCard:false})
    let selectedData = {
      name: this.state.name,
      id: this.state.id,
      facultyId: this.state.selectedFaculty,
      active:true
    };
    editData(`/InstitutionDepartments/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDelete = () => {
    this.setState({deleteDepartments:false})
    deleteData(`/InstitutionDepartments/${this.state.id}`, data => {
      console.log(data)
      this.componentDidMount();
    this.setState({notice:true})

    })
  }


//Faculty Section
  postFaculty = (e) => {
    e.preventDefault();
    this.setState({
      addFacultyCard: false,
      showSpin: true,
    });
    const newFac = {
      name: this.state.facultyName,
      active: true,
    };
    postData("/Faculty", newFac, (data) => {
      console.log(data, "Data!!!!");
      if (data == 200) {
        // alert("Added Successfully");
        this.setState({ added: true, showSpin: false });
        this.componentDidMount();
      }
    });
  };
  
  toggleFacultyCard = () => {
    if (!this.state.addFacultyCard) {
      this.setState({ addFacultyCard: true, facultyName: " ", Title: "Add" });
    } else {
      this.setState({ addFacultyCard: false });
    }
  };

  loadFacultyData = (data) => {
    this.setState({
      facultyName: data.name,
      id: data.id,
      active: data.active,
      addFacultyCard: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateFaculty = () => {
    this.setState({
      addFacultyCard: true,
      facultyName: " ",
      Title: "Add",
    });
  };
  handleDeleteFaculty = (data) => {
    this.setState({
      facultyName: data.name,
      id: data.id,
      active: data.active,
      deleteFaculty: true,
    });
  };
  closeDeleteFaculty = () => {
    this.setState({ deleteFaculty: false });
  };

  initiateUpdateFaculty = () => {
    this.setState({spin:true, addFacultyCard:false})
    let selectedData = {
      name: this.state.facultyName,
      active:true,
      id: this.state.id
    };
    editData(`/Faculty/${this.state.id}`, selectedData, (data) => {
      console.log(data, "Editted");
      this.componentDidMount()
    this.setState({spin:false, notice:true})

    });
  };

  initiateDeleteFaculty = () => {
    this.setState({deleteFaculty:false})
    deleteData(`/Faculty/${this.state.id}`, data => {
      console.log(data)
      this.componentDidMount();
    this.setState({notice:true})

    })
  }

  video_conferencing = () => {
 

      axios.post('https://api.eyeson.team', {
        headers: {
          'Authorization': `I2xkMoTAmhXCqqHus2KmY6QIYuR45O3I4hJ4yPQOOS`
        }
      })
      .then(function (response) {
       
          console.log(response);
        
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  render() {
    return (
      <>
{/* <button className="btn btn-success" onClick={this.video_conferencing}>Start Video</button> */}
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


{this.state.deleteFaculty ? (
          <DeleteCard
            message={`Delete ${this.state.facultyName}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDeleteFaculty}
            confirm={this.initiateDeleteFaculty}
          />
        ) : null}
        <Modal isOpen={this.state.added}>
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">Department was Successfully Added!</h3>
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
          isOpen={this.state.addDepartmentCard}
          // style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.Title} Department</ModalHeader>
          <ModalBody>
            

          <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Department Name
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

        <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   Faculty
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedFaculty: parseInt(e.target.value) });
                    }}
                  >
                    <option
                    >Select Faculty</option>

                    {this.state.faculties &&
                      this.state.faculties.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selectedFaculty}
                        
                        >{type.name}</option>
                      ))}
                  </select>
                </div>
          </ModalBody>
          <ModalFooter>
            {this.state.Title == "Add" ? <button
              className="btn btn-info"
              onClick={(e) => {
                this.postDepartment(e);
              }}
            >
              Add Department
            </button> : 
            <button
            className="btn btn-info"
            onClick={this.initiateUpdate}
          >
            Update Department
          </button>
            }
            <button
              className="btn btn-danger"
              onClick={this.toggleDepartmentCard}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>








        <Modal
          isOpen={this.state.addFacultyCard}
          // style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.Title} Faculty</ModalHeader>
          <ModalBody>
            

          <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Faculty Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      class="form-control col-12"
                      defaultValue={this.state.facultyName}
                      onChange={(e) => {
                        this.setState({facultyName: e.target.value });
                      }}
                    />
                  </div>

        
          </ModalBody>
          <ModalFooter>
            {this.state.Title == "Add" ? <button
              className="btn btn-info"
              onClick={(e) => {
                this.postFaculty(e);
              }}
            >
              Add Faculty
            </button> : 
            <button
            className="btn btn-info"
            onClick={this.initiateUpdateFaculty}
          >
            Update Faculty
          </button>
            }
            <button
              className="btn btn-danger"
              onClick={this.toggleFacultyCard}
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
                Institution Departments/Faculties{" "}
                <span className="h3 text-muted"></span>
              </h1>
              <span className="text-sm d-block">
                Create and manage Departments
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row">
            <hr className="mx-0" />
            <div className="col-md-7 mt-4">
              {/* <div className="card"> */}
                {/* <div className="card" style={{ width: "750px" }}> */}
                  <div className="card-header">
                    <div className="justify-content-between">
                      <div>
                        <span className="h4 card-title mb-0 mr-2">
                          Departments
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
                          onClick={this.toggleDepartmentCard}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            New Department
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <DeptDataTable passedDept={this.state.newDept} />
                </div>







                <div className="col-md-5 mt-4">
              {/* <div className="card"> */}
                {/* <div className="card" style={{ width: "750px" }}> */}
                  <div className="card-header">
                    <div className="justify-content-between">
                      <div>
                        <span className="h4 card-title mb-0 mr-2">
                          Faculties
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
                          onClick={this.toggleFacultyCard}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus" />
                          </span>
                          <span className="btn-inner--text">
                            New Faculty
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <FacDataTable passedDept={this.state.newFac} />
                </div>
              </div>
            {/* </div> */}
          {/* </div> */}
        </div>
      </>
    );
  }
}
