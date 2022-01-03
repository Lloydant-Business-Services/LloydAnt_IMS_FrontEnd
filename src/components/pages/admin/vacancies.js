import React from "react";
import {
  fetchData,
  postData,
  editData,
  editDataWithPatch,
  deleteData,
} from "../../../utils/crud";
import _ from "lodash";
import { getUser } from "../../../utils/auth";
import AlertBox from "./alertBox";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Spinner from "../admin/Spinner";
import DeleteCard from "../../Reusables/NotificationCard";
import CreateJobLink from "../../pages/admin/CreateJobLink";
import { Slide, Fade, AttentionSeeker } from "react-awesome-reveal";
//import { duration } from "@material-ui/core";
import { StatusCodes } from "../../Barn";
import checkIcon from "../../../images/checkIcon.png"
//import { Title } from "@material-ui/icons";


export default class Job extends React.Component {
  state = {
    payLoad: JSON.parse(localStorage.getItem("userData")),
    jobBtn: "active",
    jobLinkBtn: "",
    jobRecipientBtn: "",
    jobLink: "",
    jobRecipient: "",
    createJobSection: true,
    // createJobLink:true,

    added: false,
    jobVacancy: [],
    jobDetails: {
      jobtitle: "",
      jobtype: "",
      jobdescription: "",
      sectionheaderweights: [],
    },
    applicationSections: {
      name: ",",
      description: "",
      active: "",
      id: "",
    },
    jobType: {
      name: "",
      description: "",
      active: "",
      id: "",
    },

    jobTitle: "",
    jobDescription: "",
    jobTypeSelect: 0,
    active: true,
    sectionWt: [],
    updatedData: "",
  };
  closeAdded = () => {
    this.setState({
      added: false,
    });
    this.forceUpdate();
    // if(typeof window !== "undefined"){
    //     window.location.reload(true)
    // }
  };

  componentDidMount() {
    fetchData("/JobType", (data) => {
      this.setState({ types: data });
    });

    fetchData("/JobVacancy", (data) => {
      this.setState({ jobVacancy: data });
      console.log(this.state.jobVacancy, "Vacancy Payload");
    });

    // fetchData('/JobType', (data) => {
    //     this.setState({ jobType: data })
    // });

    fetchData("/ApplicationSectionHeader", (data) => {
      this.setState({ applicationSections: data });
      console.log(this.state.applicationSections, "Section");
    });

    fetchData("/JobType", (data) => {
      this.setState({ jobType: data });
      console.log(this.state.jobType, "Jobtype");
    });
  }

  setJobType = (e) => {
    this.setState({ jobTypeSelect: e.target.value });
  };

  toggleActive = () => {
    if (typeof window !== "undefined") {
      const chekd = document.forms["createjobform"];
      if (chekd.active.checked) {
        this.setState({ active: true });
      } else {
        this.setState({ active: false });
      }
    }
  };

  activateJob = (vacancyId) => {
    console.log(vacancyId, "Vac ID");

    editData(
      `/JobVacancy/ActivateJob?jobVacancyId=${vacancyId}`,
      vacancyId,
      (data) => {
        this.setState({
          updatedData: data,
        });

        fetchData("/JobVacancy", (data) => {
          this.setState({ jobVacancy: data });
          console.log(this.state.jobVacancy, "Vacancy Payload");
        });
        // this.componentDidMount();
      }
    );
  };

  addVacancy = () => {
    this.setState({ createJob: false, spin: true });

    const { userId } = getUser();
    const { jobTitle, jobTypeSelect, sectionWt } = this.state;

    if (
      jobTitle !== "" &&
      jobTypeSelect !== ""
      // && (sectionWt && sectionWt.length > 0)
    ) {
      const vacancy = {
        name: this.state.jobTitle,
        description: this.state.jobDescription,
        jobTypeId: parseInt(this.state.jobTypeSelect),
        active: this.state.active,
        dateCreated: new Date(),
        sectionHeaderWeight: this.state.sectionWt,
        userId: this.state.payLoad.personId,
      };

      console.log(vacancy);

      postData("/JobVacancy", vacancy, (data) => {
        const { ranks } = this.state;
        if (ranks && typeof ranks !== "array") {
          ranks.push(data);
        }
        this.setState({
          ...this.state,
          ranks,
          name: "",
          active: true,
          spin: false,
        });

        //clear localstorage to an empty array
        if (typeof window !== "undefined") {
          localStorage.setItem("sections", "[]");

          const { user } = data;
          this.componentDidMount();
          //window.location.reload(true)
        }
      });
    }
  };

  // consoleMyStuff = (name) => {
  //     console.log("I was trigered atbthe right time: ", name)
  // }

  setSection = (e) => {
    if (e) {
      const key = e.target.previousSibling.innerHTML;
      const value = e.target.value;

      const obj = {
        [key]: value,
      };

      let objFromLocalStorage =
        JSON.parse(localStorage.getItem("sections")) || [];
      let arrayOfKeys = [];

      for (let i = 0; i < objFromLocalStorage.length; i++) {
        let innerKeyArray = Object.keys(objFromLocalStorage[i]);
        arrayOfKeys.push(...innerKeyArray);
      }

      let keyExists = arrayOfKeys.find((i) => i === key);
      let keyExistsIndex = arrayOfKeys.findIndex((i) => i === key);

      if (keyExists) {
        objFromLocalStorage[keyExistsIndex] = obj;
      } else {
        objFromLocalStorage.push(obj);
      }

      localStorage.setItem("sections", JSON.stringify(objFromLocalStorage));
      // console.log(localStorage.getItem("sections"));

      {
        const sections = localStorage.getItem("sections");
        const sec =
          sections && JSON.parse(localStorage.getItem("sections")).length > 0
            ? JSON.parse(localStorage.getItem("sections")).map((section) => {
                return {
                  applicationSectionHeaderId: parseInt(
                    Object.entries(section)[0][0]
                  ),
                  weight: parseInt(Object.entries(section)[0][1]),
                };
              })
            : null;

        this.setState({ sectionWt: sec });

        console.log(sec);
      }
    }
  };

  setSelectedData = (data) => {
    const { jobDetails } = this.state;
    jobDetails.jobtitle = data.jobtitle;
    jobDetails.jobtype = data.jobtype;
    jobDetails.jobdescription = data.jobdescription;
    jobDetails.sectionheaderweights = data.sectionheaderweights;

    this.setState({ ...this.state, jobDetails });
  };

  updateJobTypeItem = (index, value) => {
    const { jobType } = this.state;
    jobType[index] = value;
    this.setState({ ...this.state, jobType });
  };
  handleDeleteVacancy = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteVacancy: true,
    });
    // console.log(data, "Data")
  };

  handleDeleteJobType = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteJobType: true,
    });
    // console.log(data, "Data")
  };



  closeDelete = () => {
    this.setState({ deleteVacancy: false, deleteJobType:false });
  };


  initiateDelete = () => {
    this.setState({ deleteVacancy: false });
    deleteData(
      `/JobVacancy/DeleteJobVacancy?jobId=${this.state.id}`,
      (data) => {
        this.componentDidMount();
        console.log(data, "-");
      }
    );
  };

  
  initiateDeleteJobType = () => {
    this.setState({ deleteJobType: false });
    deleteData(
      `/JobType/${this.state.id}`,
      (data) => {
        this.componentDidMount();
        console.log(data, "-");
      }
    );
  };

  selectJobTypeHandler = (e) => {
    this.setState({
      jobTypeId: parseInt(e.target.value)
    })
    console.log(this.state.jobTypeId, "JobType")
  }

  loadProperties = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      jobTypeId: data.jobTypeId,
      editVacancy: true,
    });
    // console.log(data, "Loaded Data")
  };

  loadData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      jobTypeCard: true,
      Title:"Update"
    });
    console.log(data, "Loaded Data")
  };

  initiateVacancyUpdate = () => {
    this.setState({editVacancy:false})
    var payLoad = {
      
        jobId: this.state.id,
        jobTypeId: this.state.jobTypeId,
        vacancyName: this.state.name,
        // jobType: "string"
      
    }

    editData(`/JobVacancy/${this.state.id}`, payLoad, (data) => {
      this.componentDidMount();
      this.setState({updated:true})
    })
  }


  AddJobType = () => {
    this.setState({
      jobTypeCard:true,
      name:"",
      Title:"Add"
    })
  }
  
  initiateJobTypeUpdate = () => {
    this.setState({jobTypeCard:false})
    
    var payLoad = {
      
        name: this.state.name,
        active: true,
        id:this.state.id
      
    }

    editData(`/JobType/${this.state.id}`, payLoad, (data) => {
      this.componentDidMount();
      this.setState({updated:true})
    })
  }

  postJobType = () => {
        this.setState({jobTypeCard:false})
    var payLoad = {
      name: this.state.name,
      active: true,
      id: this.state.id
    }

    postData(`/JobType`, payLoad, (data) => {
      console.log(data, "Data")
      this.componentDidMount();
    })

  }

  render() {
    return (
      <>
      <Modal isOpen={this.state.updated}>
        <ModalHeader>System Notice!</ModalHeader>
        <ModalBody className="sofia text-center">
            Updated Succesfully!<img width="50" src={checkIcon}/>
        </ModalBody>
        <ModalFooter><button className="btn btn-primary sofia" onClick={() => {this.setState({updated:false})}}>Ok</button></ModalFooter>
      </Modal>

      

      <Modal isOpen={this.state.jobTypeCard}>
          <ModalHeader>
            <h3 className>{this.state.Title} Job Type</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Job Name
                  </label>
                  <input
                    className="form-control"
                    id="myInp"
                    type="text"
                    name="docType"
                    defaultValue={this.state.name}
                    onChange={(e) => {
                      this.setState({ name: e.target.value });
                    }}
                  />
                </div>

               

                {this.state.Title == "Update" ? <button
                  className="btn btn-primary"
                  onClick={this.initiateJobTypeUpdate}
                >
                  {this.state.Title} Job Type
                </button> : 

                    <button
                    className="btn btn-primary"
                    onClick={this.postJobType}
                    >
                    Add Job Type
                    </button>
                
                }
              </div>
            </div>
            <ModalFooter>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  this.setState({ jobTypeCard: false });
                }}
              >
                Close
              </button>
            </ModalFooter>
          </ModalBody>
        </Modal>

       
       
        <Modal isOpen={this.state.editVacancy}>
          <ModalHeader>
            <h3 className>Edit Job Position</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    Job Name
                  </label>
                  <input
                    className="form-control"
                    id="myInp"
                    type="text"
                    name="docType"
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
                    Job Type
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={this.selectJobTypeHandler}
                  >
                    <option>Select Job Type</option>

                    {this.state.types &&
                      this.state.types.map((type, i) => (
                        <option
                          value={type.id}
                          selected={type.id == this.state.jobTypeId}
                        >
                          {type.name}
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={this.initiateVacancyUpdate}
                >
                  Update
                </button>
              </div>
            </div>
            <ModalFooter>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  this.setState({ editVacancy: false });
                }}
              >
                Close
              </button>
            </ModalFooter>
          </ModalBody>
        </Modal>

        {this.state.deleteVacancy ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}

{this.state.deleteJobType ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDeleteJobType}
          />
        ) : null}
        {this.state.spin ? <Spinner /> : null}
       
        {this.state.added == true ? (
          <AlertBox ok={this.closeAdded} message={"Executed Succesfully!"} />
        ) : null}
        
        
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Dashboard{" "}
                <span className="h3 text-muted">
                  /Create/Manage Jobs and Job Types
                </span>
              </h6>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row align-items-center py-4 mt-4"></div>

          {/* Card stats */}
          <Fade>
            {this.state.createJobSection ? (
              <AttentionSeeker effect={"shake"} duration={300}>
                <div className="row ">
                  <hr className="mx-0" />
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <div className="row align-items-center">
                          <div className="col">
                            <h4 className="card-title mb-0 float-left mr-3">
                              All Jobs
                            </h4>
                          </div>
                          <div className="col">
                            <div>
                              <button
                                className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                                type="button"
                                data-toggle="modal"
                                data-target=".new-vacancy-modal"
                                onClick={() => {
                                  this.setState({ createJob: true });
                                }}
                              >
                                <span className="btn-inner--icon">
                                  <i className="fa fa-plus" />
                                </span>
                                <span className="btn-inner--text">
                                  Create Job
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
                                <th>Job Title</th>
                                {/* <th>Created By</th> */}
                                <th>Job Type</th>
                                <th>Active </th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.jobVacancy &&
                              this.state.jobVacancy.length > 0
                                ? this.state.jobVacancy.map(
                                    (vacancy, index) => {
                                      return (
                                        <tr key={index}>
                                          <td> {index + 1} </td>
                                          <td>{vacancy.name}</td>
                                          {/* <td> {vacancy.user.staff.person.surname} {vacancy.user.staff.person.firstname} {vacancy.user.staff.person.othername} </td> */}
                                          <td>{vacancy.jobType.name}</td>
                                          <td>
                                            {vacancy.active == true
                                              ? "Yes"
                                              : "No"}
                                          </td>

                                          <td className="td-actions">
                                            <button
                                              className={
                                                vacancy.active
                                                  ? "btn btn-sm text-white btn-warning"
                                                  : "btn btn-sm btn-success"
                                              }
                                              id={vacancy.id}
                                              onClick={this.activateJob.bind(
                                                this,
                                                vacancy.id
                                              )}
                                            >
                                              {vacancy.active
                                                ? "Deactivate"
                                                : "Activate"}{" "}
                                            </button>
                                           

                                            <button
                                              onClick={() =>
                                                this.loadProperties(vacancy)
                                              }
                                              type="button"
                                              rel="tooltip"
                                              className="btn btn-primary btn-icon btn-sm "
                                              data-toggle="modal"
                                              data-target=".edit-vacancy-modal"
                                            >
                                              <i className="fa fa-edit pt-1" />
                                            </button>

                                            <button
                                              onClick={() =>
                                                this.handleDeleteVacancy(
                                                  vacancy
                                                )
                                              }
                                              type="button"
                                              rel="tooltip"
                                              className="btn btn-danger btn-icon btn-sm "
                                              data-toggle="modal"
                                              data-target=".edit-vacancy-modal"
                                            >
                                              <i className="fa fa-trash pt-1" />
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )
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
                                onClick={this.AddJobType}
                              >
                                <span className="btn-inner--icon">
                                  <i className="fa fa-plus" />
                                </span>
                                <span className="btn-inner--text">
                                  New Job Type
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
                                <th>S/N</th>
                                <th>Job Type</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.types && this.state.types.length > 0
                                ? this.state.types.map((type, i) => {
                                    return (
                                      <tr key={type.id}>
                                        <td>{i + 1}</td>
                                        <td>
                                         {type.name}
                                        </td>
                                        <td>
                                          <span
                                            onClick={() =>
                                              this.loadData(type)
                                            }
                                            className="cpoint mr-4"
                                            data-toggle="modal"
                                            data-target=".edit-department-modal"
                                          >
                                            <i className="btn btn-primary btn-sm d-inline fa fa-edit" />
                                          </span>
                                          <span
                                            onClick={() =>
                                              this.handleDeleteJobType(type)
                                            }
                                            className="btn btn-danger btn-sm cpoint"
                                            data-toggle="modal"
                                            data-target=".delete-department-modal"
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
                </div>
              </AttentionSeeker>
            ) : null}
          </Fade>
        </div>

        <Modal isOpen={this.state.createJob}>
          {" "}
          <div className="container-fluid mt--6">
            <ModalHeader>Create Job Vacancy</ModalHeader>
            <ModalBody>
              {/* <div className="modal-body"> */}
              <div className="modal-header">
                <h2 className="mb-0" id="exampleModalScrollableTitle">
                  Create Job Vacancy
                </h2>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    this.setState({ createJob: false });
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </ModalBody>
            <form id="createjobform">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Job Title
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      onChange={(e) => {
                        this.setState({ jobTitle: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Job Type
                    </label>
                    <select
                      className="form-control"
                      name="jobtype"
                      onChange={this.setJobType}
                    >
                      <option>Select Job Type</option>
                      {this.state.jobType && this.state.jobType.length > 0
                        ? this.state.jobType.map((type) => {
                            return (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            );
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
                      Job Description
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      onChange={(e) => {
                        this.setState({ jobDescription: e.target.value });
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group mb-0">
                    <label
                      htmlFor="activecheck"
                      className="form-control-label mr-3"
                    >
                      Active
                    </label>
                    <input
                      id="activecheck"
                      name="active"
                      type="checkbox"
                      defaultChecked={this.state.active}
                      onChange={this.toggleActive}
                    ></input>
                  </div>
                </div>

                <div className="col-12">
                  <hr />
                  <h3 className="text-center mb-3">
                    Job Criteria and Weight
                    <span className="text-sm text-muted font-weight-light">
                      {" "}
                      (Add the weight for each application section)
                    </span>
                  </h3>
                </div>

                {this.state.applicationSections &&
                this.state.applicationSections.length > 0
                  ? this.state.applicationSections.map((sections) => {
                      return (
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label col-4 my-auto text-right"
                            >
                              {sections.name}
                            </label>
                            <label hidden>{sections.id}</label>
                            <select
                              className="form-control col-6"
                              name="eduweight"
                              onChange={this.setSection.bind(this)}
                            >
                              {/* this.setSection.bind(sections.name) */}
                              <option>0.0</option>
                              <option>1.0</option>
                              <option>2.0</option>
                              <option>3.0</option>
                              <option>4.0</option>
                              <option>5.0</option>
                              <option>6.0</option>
                              <option>7.0</option>
                              <option>8.0</option>
                              <option>9.0</option>
                              <option>10.0</option>
                            </select>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
              <button
                type="button"
                onClick={() => this.addVacancy()}
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
              className="btn btn-danger btn-sm text-white"
              data-dismiss="modal"
              onClick={() => {
                this.setState({ createJob: false });
              }}
            >
              Close
            </button>
          </div>
          {/* </div> */}
        </Modal>
      </>
    );
  }
}
