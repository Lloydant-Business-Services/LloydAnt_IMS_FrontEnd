import React from "react";
import { fetchData, postData, editData, URL } from "../../../utils/crud";
import _ from "lodash";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner2 from "../admin/Spinner";
import { Roles, PersonnelDepartmentId } from "../../Barn";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";
import { Slide, Fade, AttentionSeeker } from "react-awesome-reveal";
import checkIcon from "../../../images/checkIcon.png";
import * as XLSX from "xlsx";
import axios from "axios";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import { StatusCodes } from "../../Barn";

export default class Servicom extends React.Component {
  state = {
    // spinn:true,\
    showTable: false,
    warningCard: false,
    spin: false,
    createStaff: false,
    staffAdd: false,
    assignCard: false,
    finalCount: 0,
    searchText: "",
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    payLoad: JSON.parse(localStorage.getItem("userData")),

  
  };
  ProcessExcel = (data) => {
    if (typeof window !== "undefined") {
      //Read the Excel File data.
      let workbook = XLSX.read(data, {
        type: "binary",
      });

      //Fetch the name of First Sheet.
      let firstSheet = workbook.SheetNames[0];

      //Read all rows from First Sheet into an JSON array.
      let excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);

      console.log({ excelRows });

      //Create a HTML Table element.
      let table = document.createElement("table");
      table.border = "1";
      table.style.width = "100%";
      table.setAttribute("class", "table table-striped");

      //Add the header row.
      let row = table.insertRow(-1);

      const rows = excelRows[0];
      //Add the header cells.
      for (const key of Object.keys(rows)) {
        let headerCell = document.createElement("TH");
        headerCell.innerHTML = key;
        row.appendChild(headerCell);
      }

      for (let i = 0; i < excelRows.length; i++) {
        //Add the data row.
        let row = table.insertRow(-1);

        for (let [key, value] of Object.entries(excelRows[i])) {
          //Add the data cells.
          let cell = row.insertCell(-1);
          console.log("Value: ", value);
          cell.innerHTML = value || "--";
        }
      }

      // let dvExcel = document.getElementById("dvExcel");
      // dvExcel.innerHTML = "";
      // var createTable = document.createElement("table");
      // table.className = "table table-responsive";
      // dvExcel.appendChild(table);
    }
  };
  closeToggle = () => {
    this.setState({
      createStaff: false,
    });
  };
  PreviewFile = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
    //console.log("Multiple Files: ", e.target.files)
    console.log("Single Files: ", e.target.files[0]);
    //Reference the FileUpload element.
    let fileUpload = e.target;

    //Validate whether File is valid Excel file.
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof FileReader != "undefined") {
        var reader = new FileReader();

        //For Browsers other than IE.
        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
            this.ProcessExcel(e.target.result);
          };
          reader.readAsBinaryString(fileUpload.files[0]);

          let pHold = document.getElementById("progressHold");
          pHold.style.display = "block";
          let pBar = document.getElementById("pb");
          pBar.style.width = "0%";

          pBar.innerHTML = "Uploading.....";

          setTimeout(() => {
            pBar.style.width = "100%";
            pBar.innerHTML = "Attached";
          }, 2000);
        } else {
          //For IE Browser.
          reader.onload = (e) => {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
            }
            this.ProcessExcel(data);
          };
          reader.readAsArrayBuffer(fileUpload.files[0]);
        }
      } else {
        alert("This browser does not support HTML5.");
      }
    } else {
      alert("Please upload a valid Excel file.");
    }
  };
  
  uploadAttendanceExcelSheet = async () => {
    this.setState({
      spin: true,
    });
    const formData = new FormData();

    const file = this.state.selectedFile;
    console.log(file)

    formData.append("file", file, file.name);
    let myHeaders = () => {
      const user = this.state.payLoad;
      const authorization = `Bearer ${user.token}`;
      const fetchHeader = new Headers();
      fetchHeader.append(
        "content-type",
        `multipart/form-data; boundary=${formData._boundary}`
      );
      fetchHeader.append("Authorization", authorization);
      return fetchHeader;
    };

    try {

      const res = await axios({
        method: "post",
        url:
          URL + '/Servicom/UploadStaffListFromExcelSheet',
        data: formData,
        headers: myHeaders(),
      });

      if (res.status == 200) {
        // this.setState({ warningCard: true, spin: false,  });
        this.setState({
            successAttendanceExcel: true,
          spin: false,
          feedBack: res.data,
        });
      }

      console.log(res);
    } catch (err) {
      alert("Oops! Upload failed... Please try again")
      this.setState({spin:false})
      console.log(err);
    }
  };

  uploadExcelSheet = async () => {
    this.setState({
      spin: true,
    });
    const formData = new FormData();

    const file = this.state.selectedFile;
    console.log(file)

    formData.append("file", file, file.name);
    let myHeaders = () => {
      const user = this.state.payLoad;
      const authorization = `Bearer ${user.token}`;
      const fetchHeader = new Headers();
      fetchHeader.append(
        "content-type",
        `multipart/form-data; boundary=${formData._boundary}`
      );
      fetchHeader.append("Authorization", authorization);
      return fetchHeader;
    };

    try {

      const res = await axios({
        method: "post",
        url:
          URL + '/Servicom/ProcessStaffBiometricInfoFromExcel',
        data: formData,
        headers: myHeaders(),
      });

      if (res.status == 200) {
        // this.setState({ warningCard: true, spin: false,  });
        this.setState({
          successExcel: true,
          spin: false,
          feedBack: res.data,
        });
      }

      console.log(res);
    } catch (err) {
      alert("Oops! Upload failed... Please try again")
      this.setState({spin:false})
      console.log(err);
    }
  };



  handleFileSelector = (e) => {
    this.inputElement.click();
  };
  executeUpdate = () => {
    this.setState({ updateCard: false });

    let payload = {
      phoneNumber: this.state.selectedPhoneNumber,
      genderId: this.state.selectedGenderId,
      stateId: this.state.selectedStateId,
      lgaId: this.state.selectedLgaId,
      departmentId: this.state.selectedDepartmentId,
    };

    editData(
      `/StaffPosting/UpdateNewStaff?staffId=${this.state.selectedStaffId}`,
      payload,
      (data) => {
        if (data == 200) {
          this.setState({ successCard: true });
          this.reloadData();
        } else {
          alert("Error");
          // this.setState({spinn:false})
        }
      }
    );
  };

  loadStaffData = (data) => {
    console.log(data, "staff");
    this.setState({
      updateCard: true,
      selectedStaffName: data.staffName,
      selectedPhoneNumber: data.phoneNumber,
      selectedDepartmentId: data.departmentId,
      selectedStateId: data.stateId,
      selectedLgaId: data.lgaId,
      selectedGenderId: data.genderId,
      selectedStaffId: data.staffId,
    });

    setTimeout(() => {
      if (this.state.selectedStateId > 0) {
        fetchData(
          `/Lgas/byStateId?id=${this.state.selectedStateId}`,
          (data) => {
            this.setState({
              filteredLGA: data,
            });
          }
        );
      }
    }, 2000);
  };

  removeDuplicates(data, key) {
    return [...new Map(data.map((item) => [key(item), item])).values()];
  }



  // getInstDept = () => {
  //   fetchData(
  //     `/InstitutionDepartments`,
  //     (data) => {
  //       console.log(data, "Dept!!");
  //       this.setState({
  //         departmentName: data.name,
  //       });
  //     }
  //   );
  // };

  reloadData = () => {
    this.filterStaff();
  };

  componentDidMount() {
    let verification = JSON.parse(localStorage.getItem("userData"));
    if (verification == null) {
      this.setState({
        userRedirect: true,
      });
    } else if (
      verification.roleId != Roles.SuperAdmin &&
      verification.roleId != Roles.Personnel &&
      verification.roleId != Roles.Regularization &&
      verification.roleId != Roles.PersonnelDocumentation &&
      (verification.roleId != Roles.PersonnelSaps ||
        this.state.staffPayLoad?.departmentId != 133)
    ) {
      alert("Unauthorized Access");
      localStorage.clear();
      this.setState({
        userRedirect: true,
      });
    }
    fetchData("/InstitutionDepartments", (data) => {
      this.setState({
        institutionDepts: data,
      });

      console.log(this.state.institutionDepts, "Depts!!");
    });
    //this.loadRequests();
    //this.getInstDept();

    // this.filterStaff();

    // console.log(verification, "Localll")

    this.setState({ warningCard: false });

    fetchData("/InstitutionDepartments", (data) => {
      this.setState({
        institutionDepts: data,
      });

      // console.log(this.state.institutionDepts, "Depts!!");
    });

    fetchData("/InstitutionRanks", (data) => {
      this.setState({
        institutionRank: data,
      });

      // console.log(this.state.institutionCadre, "Cadres!!");
    });

    fetchData("/InstitutionUnits", (data) => {
      this.setState({
        institutionCadre: data,
      });

      // console.log(this.state.institutionCadre, "Cadres!!");
    });

    fetchData("/Genders", (data) => {
      this.setState({
        gender: data,
      });
    });
    fetchData("/States", (data) => {
      this.setState({
        showStates: data,
      });
    });

    fetchData("/InstitutionStaffTypes", (data) => {
      this.setState({
        institutionStaffType: data,
      });

      // console.log(this.state.institutionStaffType, "Satff Type!!");
    });

    setTimeout(() => {
      // console.log(this.state.allStaff);
    }, 4000);
  }

  handleCountCard = () => {
    if (!this.state.showCountCard) {
      this.setState({ showCountCard: true });
    } else {
      this.setState({ showCountCard: false });
    }
  };
  handleCountCard2 = () => {
    if (!this.state.showCountCard2) {
      this.setState({ showCountCard2: true });
    } else {
      this.setState({ showCountCard2: false });
    }
  };

  toggleAssignCard = () => {
    this.setState({
      assignCard: true,
      hodRequestCard: false,
      staffPostingCard: false,
      petitionCard: false,
      showCountCard: false,
      showCountCard2: false,
    });
  };

  handleStateOfOrigin = (e) => {
    this.setState({
      selectedStateId: parseInt(e.target.value),
    });

    setTimeout(() => {
      fetchData(`/Lgas/byStateId?id=${this.state.selectedStateId}`, (data) => {
        this.setState({
          filteredLGA: data,
        });
      });
    }, 2000);

    console.log(this.state.filteredLGA, "Filtered!!");
  };

  toggleHODRequestCard = () => {
    this.setState({
      assignCard: false,
      hodRequestCard: true,
      staffPostingCard: false,
      petitionCard: false,
    });
  };

  toggleStaffPostingRequestCard = () => {
    this.setState({
      assignCard: false,
      hodRequestCard: false,
      staffPostingCard: true,
      petitionCard: false,
    });
  };

  togglePetitionCard = () => {
    this.setState({
      assignCard: false,
      hodRequestCard: false,
      staffPostingCard: false,
      petitionCard: true,
    });
  };

  getCount = () => {
    this.setState({ spinn: true });
    fetchData(
      `/StaffPosting/NewStaffCount?departmentId=${this.state.selectedDeptId}&rankId=${this.state.selectedRankId}`,
      (data) => {
        this.setState({ finalCount: data, spinn: false });
      }
    );
  };

  closeNoticeCard = () => {
    this.setState({
      successCard: false,
    });
  };
  handleMonth = e => {
    this.setState({
      selectedMonth: parseInt(e.target.value),
    })

    if(typeof window !== "undefined"){
      const sel = document.getElementById("myMonth");
      const monthExtract = sel.options[sel.selectedIndex].text

      this.setState({
        monthExtract: monthExtract
      })

    }
  }
  handleYear = e => {
    this.setState({
      selectedYear: parseInt(e.target.value),
    })

    if(typeof window !== "undefined"){
      console.log(this.state.selectedYear, "Year")
      const sel = document.getElementById("myYear");
      const yearExtract = sel.options[sel.selectedIndex].text
      console.log(yearExtract);

      this.setState({
        yearExtract: yearExtract
      })

    }
  }

  handleDepartment = e => {
    this.setState({
      selectedDepartment: parseInt(e.target.value),
    })

    if(typeof window !== "undefined"){
      const sel = document.getElementById("departmentName");
      const departmentExtract = sel.options[sel.selectedIndex].text
      this.setState({
        departmentExtract: departmentExtract
      })

    }
  }
  loadReport = () => {
    this.setState({ spin: true });

    fetchData(
      `/Servicom/GetAttendanceReportByDepartmentAndDate?From=${this.state.selectedYear}-${this.state.selectedMonth}-01&To=${this.state.selectedYear}-${this.state.selectedMonth}-31&DepartmentId=${this.state.selectedDepartment}`,
      (data) => {
        this.setState({ attendanceReport: data, spin:false, redirect:true });
      console.log(this.state.attendanceReport, "Report")

      }

    );

  };



  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }

    if(this.state.redirect){
      return(
        <Redirect to={{pathname:"/AttendanceExportList", state:{
            attendanceReport:this.state.attendanceReport,
            yearExtract:this.state.yearExtract,
            monthExtract:this.state.monthExtract,
            departmentExtract:this.state.departmentExtract
        }}}/>
      )
  }
    return (
      <>
        {this.state.successCard ? (
          <NotificationCard
            message="Staff Record was updated successfully"
            checkIcon={true}
            closeCard={this.closeNoticeCard}
            okBtn={true}
          />
        ) : null}

    <Modal isOpen={this.state.successExcel}>
          <ModalHeader className="sofia">System Notice</ModalHeader>
          <ModalBody>
            <p className="sofia">
              Successfully Uploaded <img src={checkIcon} width="50" />
            </p>
            <br />
            <p className="sofia">
              Successful Uploads : {this.state.feedBack?.updated}
            </p>
           
            
            <p className="sofia">
              Failed Uploads (Invalid Username) : {this.state.feedBack?.failed}
            </p>
          </ModalBody>
          <ModalFooter>
           
            <button
              className="btn btn-primary sofia"
              onClick={() => this.setState({ successExcel: false })}
            >
              Ok
            </button>
            <Link pathname
             to={{
                pathname: "/FailedBiometricsUpload",
                state: { data: this.state.feedBack?.failedBiometricsUpload },
             }}
            >
            <button
              className="btn btn-danger btn-sm sofia"
              onClick={() => this.setState({ successExcel: false })}
            >
              See Failed Uploads
            </button>
            </Link>
          </ModalFooter>
        </Modal>
        
        
        <Modal isOpen={this.state.successAttendanceExcel}>
          <ModalHeader className="sofia">System Notice</ModalHeader>
          <ModalBody>
            <p className="sofia">
              Successfully Uploaded <img src={checkIcon} width="50" />
            </p>
            <br />
            <p className="sofia">
              Successful Uploads : {this.state.feedBack?.updated}
            </p>
           
            
            <p className="sofia">
              Failed Uploads (Invalid Biometric Number) : {this.state.feedBack?.failed}
            </p>
          </ModalBody>
          <ModalFooter>
           
            <button
              className="btn btn-primary sofia"
              onClick={() => this.setState({ successExcel: false })}
            >
              Ok
            </button>
            <Link pathname
             to={{
                pathname: "/FailedAttendanceUpload",
                state: { data: this.state.feedBack?.failedAttendanceUpload },
             }}
            >
            <button
              className="btn btn-danger btn-sm sofia"
              onClick={() => this.setState({ successExcel: false })}
            >
              See Failed Uploads
            </button>
            </Link>
          </ModalFooter>
        </Modal>  
        
        {/* {this.state.spin ? <Spinner2 /> : null}
        {this.state.spinn ? <Spinner /> : null} */}

        {/* {this.state.spinn ? <Spinner msg={"Please wait..."} /> : null} */}

        <div className="row mb-4 mt-4">
          <div className="col">
            <h1 className="d-inline-block mb-0 pop-font">
              Staff Attendance Management
              {/* <span className="h3 text-muted">
                / Assign Department / View Posting Requests / View Petitions
              </span> */}
            </h1>

            <span className="text-sm d-block">
              {/* Create and manage Staff Profiles */}
            </span>
          </div>

          <div className="col"></div>
        </div>

        <div className="row mt-4">
          <div
            className="col-xl-3 col-md-6"
            style={{ cursor: "pointer" }}
            onClick={this.toggleAssignCard}
          >
            <div className="card card-stats">
              {/* Card body */}
              <div className="card-body btn btn-outline-info">
                <div className="row">
                  <div className="col pop-font">
                    <h5 className="card-title text-uppercase mb-0">
                      <i className="fa fa-user-circle" />
                      &nbsp; Staff Biometric ID Upload
                    </h5>
                    <span className="h4 font-weight-bold mb-0">
                      {/* {"Assign Department To New Staff"} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-md-6"
            style={{ cursor: "pointer" }}
            onClick={this.toggleHODRequestCard}
          >
            <div className="card card-stats">
              {/* Card body */}
              <div className="card-body btn btn-outline-info">
                <div className="row">
                  <div className="col pop-font">
                    <h5 className="card-title text-uppercase mb-0">
                      <i className="fa fa-envelope" />
                      &nbsp; Staff Attendance List Upload
                    </h5>
                    <span className="h4 font-weight-bold mb-0">
                      {/* {"Assign Department To New Staff"} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-md-6"
            style={{ cursor: "pointer" }}
            onClick={this.toggleStaffPostingRequestCard}
          >
            <div className="card card-stats">
              {/* Card body */}
              <div className="card-body btn btn-outline-info">
                <div className="row">
                  <div className="col pop-font">
                    <h5 className="card-title text-uppercase mb-0">
                      <i className="fa fa-rocket" />
                      &nbsp; Attendance Report
                    </h5>
                    <span className="h4 font-weight-bold mb-0">
                      {/* {"Assign Department To New Staff"} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-md-6"
            style={{ cursor: "pointer" }}
            onClick={this.togglePetitionCard}
          >
            <div className="card card-stats">
              {/* Card body */}
              <div className="card-body btn btn-outline-info">
                <div className="row">
                  <div className="col pop-font">
                    <h5 className="card-title text-uppercase mb-0">
                      <i className="fa fa-thumbs-down" />
                      &nbsp; Biometric Capture/Notification
                    </h5>
                    <span className="h4 font-weight-bold mb-0">
                      {/* {"Assign Department To New Staff"} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.assignCard ? (
          <Fade>
            <AttentionSeeker effect={"shake"} duration={300}>
              <section>
                <div className="row justify-content-center">
                  <h2 className="sofia" style={{ textAlign: "center" }}>
                    {/* Multiple Mode */} &nbsp;
                  </h2>
                </div>

                <div className="row justify-content-center">
                  <hr className="mx-0" />
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">
                        <div className="row">
                          <div className="col">
                            <h3 className=" mb-0 sofia">
                              Staff Biometric ID Upload
                            </h3>
                          </div>
                          <div className="col"></div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          {/* <label
                            htmlFor="example-text-input"
                            className="form-control-label sofia"
                          >
                            Select File
                          </label> */}

                          <input
                            className="form-control col-12"
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            ref={(input) => (this.inputElement = input)}
                            onChange={(e) => {
                              this.PreviewFile(e);
                            }}
                            onClick={this.handleFileSelector}
                          />
                          <button
                            className="btn btn-outline-success"
                            onClick={this.handleFileSelector}
                          >
                            <i className="fa fa-file" /> Select File (Excel)
                          </button>
                        </div>

                        <div
                          class="progress"
                          id="progressHold"
                          style={{ height: "15px", display: "none" }}
                        >
                          <div
                            class="progress-bar"
                            id="pb"
                            style={{
                              width: "0%",
                              height: "15px",
                              backgroundColor: " #5e72e4",
                            }}
                          ></div>
                        </div>

                        <br />

                        {this.state.spin ? (
                          <MetroSpinner
                            size={60}
                            color={"#5e72e4"}
                            loading={this.state.loading}
                          />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary sofia"
                            onClick={this.uploadExcelSheet}
                          >
                            <i className="fa fa-send" /> Save & Upload
                          </button>
                        )}
                        <hr />
                        <div
                          id="dvExcel"
                          className="table table-responsive"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AttentionSeeker>
          </Fade>
        ) : null}
        {this.state.hodRequestCard ? (
          <Fade>
            <AttentionSeeker effect={"shake"} duration={300}>
              <section>
                <div className="row justify-content-center">
                  <h2 className="sofia" style={{ textAlign: "center" }}>
                    {/* Multiple Mode */} &nbsp;
                  </h2>
                </div>

                <div className="row justify-content-center">
                  <hr className="mx-0" />
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">
                        <div className="row">
                          <div className="col">
                            <h3 className=" mb-0 sofia">
                              Staff Attendance List Upload
                            </h3>
                          </div>
                          <div className="col"></div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          {/* <label
                            htmlFor="example-text-input"
                            className="form-control-label sofia"
                          >
                            Select File
                          </label> */}

                          <input
                            className="form-control col-12"
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            ref={(input) => (this.inputElement = input)}
                            onChange={(e) => {
                              this.PreviewFile(e);
                            }}
                            onClick={this.handleFileSelector}
                          />
                          <button
                            className="btn btn-outline-success"
                            onClick={this.handleFileSelector}
                          >
                            <i className="fa fa-file" /> Select File (Excel)
                          </button>
                        </div>

                        <div
                          class="progress"
                          id="progressHold"
                          style={{ height: "15px", display: "none" }}
                        >
                          <div
                            class="progress-bar"
                            id="pb"
                            style={{
                              width: "0%",
                              height: "15px",
                              backgroundColor: " #5e72e4",
                            }}
                          ></div>
                        </div>

                        <br />

                        {this.state.spin ? (
                          <MetroSpinner
                            size={60}
                            color={"#5e72e4"}
                            loading={this.state.loading}
                          />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary sofia"
                            onClick={this.uploadAttendanceExcelSheet}
                          >
                            <i className="fa fa-send" /> Save & Upload
                          </button>
                        )}
                        <hr />
                        <div
                          id="dvExcel"
                          className="table table-responsive"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AttentionSeeker>
          </Fade>
        ) : null}
        {this.state.staffPostingCard ? (
          <Fade>
            <AttentionSeeker effect={"shake"} duration={300}>
              <section>
                <div className="row justify-content-center">
                  <h2 className="sofia" style={{ textAlign: "center" }}>
                    {/* Multiple Mode */} &nbsp;
                  </h2>
                </div>

                <div className="row justify-content-center">
                  <hr className="mx-0" />
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">
                        <div className="row">
                          <div className="col">
                            <h3 className=" mb-0 sofia">
                              Attendance Report Pull
                            </h3>
                          </div>
                          <div className="col"></div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label sofia"
                          >
                            Month
                          </label>

                          <select
                            className="form-control col-12"
                            id="myMonth"
                            onChange={this.handleMonth}
                          >
                            <option>Select Month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label sofia"
                          >
                            Year
                          </label>

                          <select
                            className="form-control col-12"
                            id="myYear"
                            onChange={this.handleYear}
                          >
                            <option> Select Year</option>
                            <option value="2019"> 2019 </option>
                            <option value="2020"> 2020 </option>
                            <option value="2021"> 2021 </option>
                          </select>
                        </div>


                        
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label sofia"
                          >
                            Department
                          </label>

                          <select
                            className="form-control col-12"
                            id="departmentName"
                            onChange={this.handleDepartment}
                          >
                            <option> Select Department</option>
                            {this.state.institutionDepts && this.state.institutionDepts.map(d => {
                              return(
                                <option value={d.id}>{d.name}</option>
                              )
                            })}
                          </select>
                        </div>

                        <br />

                        {this.state.spin ? (
                          <MetroSpinner
                            size={60}
                            color={"#5e72e4"}
                            loading={this.state.loading}
                          />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary sofia"
                            onClick={this.loadReport}
                          >
                            Load Report
                          </button>
                        )}
                        <hr />
                        <div
                          id="dvExcel"
                          className="table table-responsive"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AttentionSeeker>
          </Fade>
        ) : null}
      </>
    );
  }
}
