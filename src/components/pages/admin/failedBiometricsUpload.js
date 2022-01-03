import React from "react";
import { fetchData, postData, editData, URL, deleteData } from "../../../utils/crud";
import _ from "lodash";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import { Slide, Fade, AttentionSeeker } from "react-awesome-reveal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";
import Axios from "axios";


export default class FailedBiometricsUpload extends React.Component {
  state = {
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    failedUploads: this.props.location.state.data
  };

  

  clearList = () => {
    deleteData('/Staff/ClearFailedStaffUploads', data => {
      this.componentDidMount();
    })
    
  }

  componentDidMount() {
  }

  render() {
    return (
      <>
        <div className="row mb-4 mt-4">
          <div className="col">
            <h1 className="d-inline-block mb-0 pop-font">
              Failed Biometric Uploads
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
                          <th>Biometric Id</th>
                          
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
                                  <td>{i.biometricNumber}</td>
                                  
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
   
   
   
   
      </>
    );
  }
}
