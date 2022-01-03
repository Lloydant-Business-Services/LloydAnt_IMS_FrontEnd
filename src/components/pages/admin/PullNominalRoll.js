import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
import FacultyDataTable from "../DataTables/FacultyNominalRoll";
import Spinner from "./Spinner";
import Notification from "../../Reusables/NotificationCard";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Slide, Fade, AttentionSeeker } from "react-awesome-reveal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

// import ReactToPrint from "react-to-print"

export default class PullNominalRoll extends React.Component {
  state = {
    payloadDTO: JSON.parse(localStorage.getItem("DTOFULL")),

    //   spin:true,
    allStaff: [],
    selectedStaff: [],
    confirm: [],
    subject: "",
    message: "",
    checkedID: true,
    newNominalInfo: this.props.location.state.nominalInfo,
    monthExtract: this.props.location.state.monthExtract,
    yearExtract: this.props.location.state.yearExtract,
    facultyId: 0,
    departmentId: 0,
  };

  handleGetMonth = (month) => {
    var ch =
      month == 1
        ? "January"
        : month == 2
        ? "February"
        : month == 3
        ? "March"
        : month == 4
        ? "April"
        : month == 5
        ? "May"
        : month == 6
        ? "June"
        : month == 7
        ? "July"
        : month == 8
        ? "August"
        : month == 9
        ? "September"
        : month == 10
        ? "October"
        : month == 11
        ? "November"
        : month == 12
        ? "December"
        : null;
    console.log(ch);

    return ch;
  };

  filterStaff = () => {
    this.setState({
      spinn: true,
      queryCard: false,
      departmentCard: false,
      staffRank: false,
      combined: false,
    });
    fetchData(
      `/StaffNominalRoll/GetNominalRollBy?facultyId=${this.state.facultyId}&departmentId=${this.state.departmentId}`,
      (data) => {
        setTimeout(() => {
          console.log(data);
        }, 2000);

        this.setState({
          newNominalInfo: data,
          spinn: false,
          showDataTable: true,
          staffTypeId: 0,
          rankId: 0,
          departmentId: 0,
        });
      }
    );
  };

  componentDidMount() {
    fetchData("/InstitutionDepartments", (data) => {
      this.setState({
        institutionDepts: data,
      });

      console.log(this.state.institutionDepts, "Depts!!");
    });
  }

  render() {
    var myMonth = new Date();
    return (
      <>
        <Modal isOpen={this.state.departmentCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary">
              Select Department
            </ModalHeader>
            <div className="col-md-12">
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
                  onChange={(e) => {
                    this.setState({ departmentId: e.target.value });
                  }}
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
          </ModalBody>
          <ModalFooter>
            <Button
              // className="ok-btn"
              color={"info"}
              onClick={this.filterStaff}
            >
              Load Staff List
            </Button>

            <Button
              // className="ok-btn"
              color={"danger"}
              onClick={() => {
                this.setState({ departmentCard: false });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {this.state.confirmSuccess ? (
          <Notification
            okBtn={true}
            closeCard={this.closeInvite}
            message={"Selected Staff successfully Confirmed"}
          />
        ) : null}
        {this.state.spin ? <Spinner /> : null}
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-12 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Staff Nominal Roll List{" "}
              </h6>{" "}
              &nbsp;
              <span className="h3 text-muted">
                / For the Month of{" "}
                <b>
                  {this.state.monthExtract}, {this.state.yearExtract}
                </b>
              </span>
              <br />
              <Link
                to={{ pathname: "/NominalRollRequest" }}
                className="btn btn-info"
                data-toggle="tooltip"
                data-placement="top"
                title="Back"
              >
                <i className="fa fa-arrow-circle-left fa-2x" />
              </Link>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row col-md-12 staff-list-func">
            {/* <div
              className="card col-md-3"
              style={{ borderLeft: "4px solid orange" }}
            >
              <div className="row card-body">
               
                <br />
                <br />
                <div className="container">
                  Load List By : &nbsp;
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      this.setState({ departmentCard: true });
                    }}
                  >
                    <i className="fa fa-sort" />
                    &nbsp; Department
                  </button>
                </div>
              </div>
            </div> */}

            
          </div>
          <div className="">
            <div className="py-4">
              <Fade>
                <AttentionSeeker effect={"shake"} duration={300}>
                  <div className="card">
                    {/* <h4 className=" mb-0 mt-1">Staff Count By Cadre</h4> */}
                    <div className="card-body">
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-sm btn-success"
                        table={"staffUploads"}
                        // data={data}
                        filename={
                          this.state.monthExtract +
                          "," +
                          this.state.yearExtract +
                          " Nominal Roll"
                        }
                        sheet="Staff List"
                        buttonText="Excel Export"
                      />
                   
                    </div>
                    <div className="card-body">
                      <div
                        className="table-responsive"
                        style={{ height: "600px" }}
                      >
                        <table
                          className="table table-striped sofia"
                          id="staffUploads"
                        >
                          <thead
                            style={{
                              position: "sticky",
                              top: "0",
                              zIndex: "1",
                            }}
                            //   className="thead-light"
                          >
                            <th>S/N</th>
                            <th>Username</th>
                            <th>Staff ID</th>
                            <th>Staff Name</th>
                            <th>Status</th>
                            <th>Comments</th>
                            <th>Appointment Type</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th>State</th>
                            <th>LGA</th>
                            <th>Date of Employment</th>
                            <th>Date of Retirement</th>
                            <th>Educationa Qualificaions</th>
                            <th>Staff Type</th>
                            <th>Staff Category</th>
                            <th>Salary Category</th>
                            <th>Rank</th>
                            <th>PFA Name</th>
                            <th>Area of Specialization</th>
                            <th>Action</th>
                          </thead>

                          <tbody>
                            {this.state.newNominalInfo &&
                              this.state.newNominalInfo.map((i, a) => {
                                return (
                                  <tr>
                                    <td>{a + 1}</td>
                                   
                                    <td>{i.userName}</td>
                                    <td>{"-"}</td>
                                    <td>{i.staffName}</td>
                                    <td>
                                      {i.isCleared ? (
                                        <span className="badge badge-success badge-sm">
                                          Cleared
                                        </span>
                                      ) : !i.isCleared && i.comment != null ? (
                                        <span className="badge badge-warning badge-sm">
                                          Not Cleared with comments
                                        </span>
                                      ) : (
                                        <span className="badge badge-danger badge-sm">
                                          Not Cleared
                                        </span>
                                      )}
                                    </td>
                                    <td style={{fontSize:'12px'}}><i className="text-warning">{i.comments == null ? "-" : i.comments}</i> &nbsp; <i className="fa fa-comment-o"/></td>
                                    <td>{i.appointmentType}</td>
                                    <td>{i.staffDepartment}</td>
                                    <td>{i.email}</td>
                                    <td>{i.phone}</td>
                                    <td>{i.staffDOB == null ? "-" : i.staffDOB.slice(0,10)}</td>
                                    <td>{i.state}</td>
                                    <td>{i.lga}</td>
                                    <td>{i.dateOfEmployment == null ? "-" : i.dateOfEmployment.slice(0,10)}</td>
                                    <td>{i.dateOfRetirement == null ? "-" :  i.dateOfRetirement.slice(0,10)}</td>
                                    <td> - </td>
                                    <td>{i.staffType}</td>
                                    <td>{i.staffCategory}</td>
                                    <td>{i.staffSalaryCategory}</td>
                                    <td>{i.staffRank}</td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* </Fade> */}
                </AttentionSeeker>
              </Fade>
            </div>
          </div>

          {/* <div className="card">
            <FacultyDataTable rawData={this.state.newNominalInfo} />
          </div> */}
        </div>
      </>
    );
  }
}
