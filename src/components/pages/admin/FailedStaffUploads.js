import React from "react";
import { fetchData, postData, editData, URL, deleteData } from "../../../utils/crud";
import _ from "lodash";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import { Slide, Fade, AttentionSeeker } from "react-awesome-reveal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";
import Axios from "axios";


export default class FailedStaffUploads extends React.Component {
  state = {
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
  };

  getFailedUploads = () => {
    fetchData(`/Staff/GetFailedUploads`, (data) => {
      this.setState({ failedUploads: data });
      console.log(this.state.failedUploads, "Failed Uploads");
    });
  };

  clearList = () => {
    deleteData('/Staff/ClearFailedStaffUploads', data => {
      this.componentDidMount();
    })
    
  }

  componentDidMount() {
    this.getFailedUploads();
  }

  render() {
    return (
      <>
        <div className="row mb-4 mt-4">
          <div className="col">
            <h1 className="d-inline-block mb-0 pop-font">
              Failed Staff Upload Records
            </h1>

            <span className="text-sm d-block">
              {/* Create and manage Staff Profiles */}
            </span>
          </div>

          <div className="col"></div>
        </div>

        <div className="row mt-4"></div>

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
                      filename="Failed Staff Uploads"
                      sheet="Staff List"
                      buttonText="Excel Export"
                    />
                    <button className="btn btn-outline-danger float-right btn-sm" onClick={this.clearList}>Clear List</button>
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
                          <th>Surname</th>

                          <th>First Name</th>
                          <th>Othernames</th>
                          <th>Staff Number</th>
                          <th>DOB</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Gender</th>
                          <th>InstitutionRankId</th>
                          <th>LgaId</th>
                          <th>SalaryGradeCategory</th>
                          <th>SalaryLevelId</th>
                          <th>SalaryStepId</th>
                          <th>DOE</th>
                          <th>DepartmentId</th>
                          <th>AppointmentType</th>
                        </thead>

                        <tbody>
                          {this.state.failedUploads &&
                            this.state.failedUploads.map((i, a) => {
                              return (
                                <tr>
                                  <td>{a + 1}</td>
                                  <td>{i.surname}</td>
                                  <td>{i.firstname}</td>
                                  <td>{i.othername}</td>
                                  <td>{i.staffNumber}</td>
                                  <td>{i.dob}</td>
                                  <td>{i.email}</td>
                                  <td>{i.phoneNumber}</td>
                                  <td>{i.gender}</td>
                                  <td>{i.institutionRankId}</td>
                                  <td>{i.lgaId}</td>
                                  <td>{i.salaryGradeCategory}</td>
                                  <td>{i.salaryLevelId}</td>
                                  <td>{i.salaryStepId}</td>
                                  <td>{i.doe}</td>
                                  <td>{i.institutionDepartmentId}</td>
                                  <td>{i.appointmentType}</td>
                                </tr>
                              );
                            })}
                          {!this.state.failedUploads ? (
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <MetroSpinner
                                  size={50}
                                  color={"#123abc"}
                                  loading={true}
                                />
                              </td>
                            </tr>
                          ) : null}
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
   
   
   
   
      </>
    );
  }
}
