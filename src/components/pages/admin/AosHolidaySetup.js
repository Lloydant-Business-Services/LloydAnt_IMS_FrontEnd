import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
// import { navigate } from "gatsby";
import { Container, ListGroupItemHeading, ModalHeader } from "reactstrap";
import DeptDataTable from "../admin/DeptDataTable";
import FacDataTable from "../admin/FacDataTable";
import DefaultDataTable from "../DataTables/CommonDataTable";
import HolidayDataTable from "../DataTables/HolidayDataTable";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { Fade, Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import DeleteCard from "../../Reusables/NotificationCard";
import Notice from "../../Reusables/NotificationCard";

export default class AosHolidaySetup extends React.Component {
  state = {
    departments: [],
    units: [],
    name: "",
    id: 0,
    active: true,
    showSpin: true,
  };

  componentDidMount() {
    fetchData("/Pfa/GetAreaOfSpecialization", (data) => {
      this.setState({ AosList: data });

      let mapName = data.map((d, i) => {
        return {
          sn: i + 1,
          name: d.name,
          action: (
            <span>
              <i
                className="fa fa-pencil-square-o"
                style={{ cursor: "pointer" }}
                onClick={() => this.loadEditData(d)}
              ></i>{" "}
              &nbsp; &nbsp;
              <i
                className="fa fa-trash"
                style={{ cursor: "pointer" }}
                onClick={() => this.handleDeleteAos(d)}
              ></i>
            </span>
          ),
        };
      });
      //console.log(mapName, "Mapeed!!!!");

      this.setState({
        mappedAos: mapName,
        showSpin: false,
      });

      //setTimeout(() => {
      //     console.log(this.state.mappedAos, "New Dept....");
      //   }, 4000);
    });

    fetchData("/Holiday/GetHolidays", (data) => {
      this.setState({ pfaNameLists: data });

      let mapped_holiday = data.map((d, i) => {
        return {
          sn: i + 1,
          name: d.name,
          date:d.date == null ? "-" : d.date.slice(0, 10),
          action: (
            <span>
              <i
                className="fa fa-pencil-square-o"
                style={{ cursor: "pointer" }}
                onClick={() => this.loadHoliday(d)}
              ></i>{" "}
              &nbsp; &nbsp;
              <i
                className="fa fa-trash"
                style={{ cursor: "pointer" }}
                onClick={() => this.handleDeleteHoliday(d)}
              ></i>
            </span>
          ),
        };
      });
      console.log(mapped_holiday, "Mapeed!!!!");

      this.setState({
        mappedHoliday: mapped_holiday,
        showSpin: false,
      });
    });
  }

  postAreaOfSpecialization = (e) => {
    e.preventDefault();
    this.setState({
      addAosCard: false,
      showSpin: true,
    });
    const mappedAosPayload = {
        name: this.state.name,
        active: true,
      };
    postData("/Pfa/AddAreaOfSpecialization", mappedAosPayload, (data) => {
      console.log(data, "Data!!!!");
      if (data == 200) {
        // alert("Added Successfully");
        this.setState({ added: true, showSpin: false });
        this.componentDidMount();
      }
    });
  };

  toggleAosCard = () => {
    if (!this.state.addAosCard) {
      this.setState({ addAosCard: true, name: " ", Title: "Add" });
    } else {
      this.setState({ addAosCard: false });
    }
  };

  loadEditData = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      addAosCard: true,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleCreateDepartments = () => {
    this.setState({
      addAosCard: true,
      name: " ",
      Title: "Add",
    });
  };
  handleDeleteAos = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
      deleteAosPrompt: true,
    });
  };
  closeDelete = () => {
    this.setState({ deleteAosPrompt: false });
  };

  initiateUpdate = () => {
    this.setState({ spin: true, addAosCard: false });
    let selectedData = {
      name: this.state.name,
      id: this.state.id,
    };
    editData(
      `/Pfa/EditAreaOfSpecialization?id=${this.state.id}`,
      selectedData,
      (data) => {
        console.log(data, "Editted");
        if (data == 200 || data == 201) {
            // alert("Added Successfully");
            this.setState({ notice: true, showSpin: false });
            this.componentDidMount();
          }
        // this.componentDidMount();
        // this.setState({ spin: false, notice: true });
      }
    );
  };

  initiateDelete = () => {
    this.setState({ deleteAosPrompt: false });
    deleteData(
      `/Pfa/DeleteAreaOfSpecialization?id=${this.state.id}`,
      (data) => {
        console.log(data);
        if (data == 200 || data == 201) {
            // alert("Added Successfully");
            this.setState({ notice: true, showSpin: false });
            this.componentDidMount();
          }
        // this.componentDidMount();
        // this.setState({ notice: true });
      }
    );
  };

  //Faculty Section
  postHoliday = (e) => {
    e.preventDefault();
    this.setState({
      addHolidayCard: false,
      showSpin: true,
    });
    const mappedHoliday = {
      name: this.state.name,
      active: true,
      date: this.state.holiday_date,
    };
    postData("/Holiday/AddHoliday", mappedHoliday, (data) => {
      console.log(data, "Data!!!!");
      if (data == 200 || data == 201) {
        // alert("Added Successfully");
        this.setState({ added: true, showSpin: false });
        this.componentDidMount();
      }
    });
  };

  toggleHolidayCard = () => {
    if (!this.state.addHolidayCard) {
      this.setState({ addHolidayCard: true, name: " ", Title: "Add", holiday_date:"" });
    } else {
      this.setState({ addHolidayCard: false });
    }
  };

  loadHoliday = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      addHolidayCard: true,
      holiday_date:data.date,
      Title: "Edit",
    });

    console.log(data, "data");
  };

  handleDeleteHoliday = (data) => {
    this.setState({
      name: data.name,
      id: data.id,
      deleteHoliday: true,
    });
  };
  closeDeleteHoliday = () => {
    this.setState({ deleteHoliday: false });
  };

  initiateUpdateHoliday = () => {
    this.setState({ spin: true, addHolidayCard: false });
    let selectedData = {
      name: this.state.name,
      active: true,
      id: this.state.id,
      date: this.state.holiday_date
    };
    editData(
      `/Holiday/EditHoliday?id=${this.state.id}`,
      selectedData,
      (data) => {
        console.log(data, "Editted");
      
        this.componentDidMount();
        this.setState({ spin: false, notice: true });
      }
    );
  };

  initiateDeleteHoliday = () => {
    this.setState({ deleteHoliday: false });
    deleteData(`/Holiday/DeleteHoliday?id=${this.state.id}`, (data) => {
      console.log(data);
   
    this.componentDidMount();
    this.setState({ notice: true });
    });
  };
  render() {
    return (
      <>
        {this.state.notice ? (
          <Notice
            message={"Action was Successful!"}
            okBtn={true}
            closeCard={() => {
              this.setState({ notice: false });
            }}
          />
        ) : null}
        {this.state.spin ? <Spinner /> : null}
        {this.state.deleteAosPrompt ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDelete}
            confirm={this.initiateDelete}
          />
        ) : null}

        {this.state.deleteHoliday ? (
          <DeleteCard
            message={`Delete ${this.state.name}?`}
            confirmBtn={true}
            closeBtn={true}
            closeCard={this.closeDeleteHoliday}
            confirm={this.initiateDeleteHoliday}
          />
        ) : null}
        <Modal isOpen={this.state.added}>
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">
              Added Successfully!
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
          isOpen={this.state.addAosCard}
          // style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.Title} Area of Specialization</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label
                htmlFor="example-text-input"
                className="form-control-label"
              >
                Area of Specialization
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
            {this.state.Title == "Add" ? (
              <button
                className="btn btn-info"
                onClick={(e) => {
                  this.postAreaOfSpecialization(e);
                }}
              >
                Add
              </button>
            ) : (
              <button className="btn btn-info" onClick={this.initiateUpdate}>
                Update
              </button>
            )}
            <button className="btn btn-danger" onClick={this.toggleAosCard}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.addHolidayCard}
          // style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.Title} Holiday</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label
                htmlFor="example-text-input"
                className="form-control-label"
              >
                Holiday Name
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


<label
                htmlFor="example-text-input"
                className="form-control-label"
              >
                Date
              </label>
              <input
                className="form-control"
                type="date"
                class="form-control col-12"
                defaultValue={this.state.holiday_date ? this.state.holiday_date.substring(0, 10) : ""}
                onChange={(e) => {
                  this.setState({ holiday_date: e.target.value });
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.Title == "Add" ? (
              <button
                className="btn btn-info"
                onClick={(e) => {
                  this.postHoliday(e);
                }}
              >
                Add Holiday
              </button>
            ) : (
              <button
                className="btn btn-info"
                onClick={this.initiateUpdateHoliday}
              >
                Update Holiday
              </button>
            )}
            <button className="btn btn-danger" onClick={this.toggleHolidayCard}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        {this.state.showSpin ? <Spinner msg={"Loading..."} /> : null}

        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h1 className="d-inline-block mb-0 pop-font">
                Area of Specialization/Holiday Setup{" "}
                <span className="h3 text-muted"></span>
              </h1>
              <span className="text-sm d-block">
                Create, edit and delete Area of Specialization/Holiday
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row">
            <hr className="mx-0" />
            <div className="col-md-6 mt-4">
              <div className="card-header">
                <div className="justify-content-between">
                  <div>
                    <span className="h4 card-title mb-0 mr-2">
                      Area of Specialization
                    </span>
                    <button
                      className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                      type="button"
                      onClick={this.toggleAosCard}
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Add</span>
                    </button>
                  </div>
                </div>
              </div>
              <DefaultDataTable passedDept={this.state.mappedAos} />
            </div>

            <div className="col-md-6 mt-4">
              <div className="card-header">
                <div className="justify-content-between">
                  <div>
                    <span className="h4 card-title mb-0 mr-2">Holidays</span>

                    <button
                      className="btn btn-primary btn-icon btn-sm mx-1 float-right"
                      type="button"
                      onClick={this.toggleHolidayCard}
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Add Holiday</span>
                    </button>
                  </div>
                </div>
              </div>
              <HolidayDataTable passedDept={this.state.mappedHoliday} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
