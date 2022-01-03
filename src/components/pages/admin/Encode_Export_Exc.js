import React from "react";
import { fetchData, postData, editData, URL, deleteData } from "../../../utils/crud";
import _ from "lodash";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import { Slide, Fade, AttentionSeeker } from "react-awesome-reveal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";
import Axios from "axios";


export default class Encode_Export_Exc extends React.Component {
  state = {
  };

  

  clearList = () => {
    deleteData('/Staff/ClearFailedStaffUploads', data => {
      this.componentDidMount();
    })
    
  }

  componentDidMount() {

    fetchData("/InstitutionRanks", (data) => {
        console.log(data,"Data")
        this.setState({ Ranks: data });
  
      });


      fetchData("/InstitutionDepartments", (data) => {
        this.setState({ departments: data });
      });
  }

  render() {
    return (
      <>
        <div className="row mb-4 mt-4">
          <div className="col">
            <h1 className="d-inline-block mb-0 pop-font">
              Export __ **
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
                      filename="Ranks"
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
                          <th>Name</th>
                          
                          <th>Id</th>
                          
                        </thead>

                        <tbody>
                          {this.state.Ranks &&
                            this.state.Ranks.map((i, a) => {
                              return (
                                <tr>
                                  <td>{a + 1}</td>
                                  <td>{i.name}</td>
                                
                                  <td>{i.id}</td>
                                  
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
                      table={"deptt"}
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
                        id="deptt"
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
                          <th>Name</th>                        
                          <th>Id</th>                          
                        </thead>

                        <tbody>
                          {this.state.departments &&
                            this.state.departments.map((i, a) => {
                              return (
                                <tr>
                                  <td>{a + 1}</td>
                                  <td>{i.name}</td>
                                
                                  <td>{i.id}</td>
                                  
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
