//import { duration } from "@material-ui/core";
import React from "react";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { fetchData, postData, editData, URL } from "../../../utils/crud";
import { Roles, PersonnelDepartmentId, StatusCodes } from "../../Barn";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";
import checkIcon from "../../../images/checkIcon.png";
import caution from "../../../images/caution.png";
import EmailDataTable from "../DataTables/EmailRecipientDataTable";

import Spinner from "./Spinner";
import * as XLSX from "xlsx";

import axios from "axios";

class CreateJobLink extends React.Component {
  state = {
    // singleMode: true,
    payLoad: JSON.parse(localStorage.getItem("userData")),

    // spin:true
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

  handlePostLink = () => {
    this.setState({
      sendLink: false,
      spin: true,
    });
    let payLoad = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email,
      jobVacancyId: parseInt(this.state.vacancyId),
    };

    console.log("payload", payLoad);
    postData("/JobVacancy/CreateJobLink", payLoad, (data) => {
      if (data == StatusCodes.Created) {
        this.setState({
          success: true,
          spin: false,
        });
        this.componentDidMount();
        console.log("Return", data);
      } else if (data == StatusCodes.AlreadyExist) {
        this.setState({
          alreadyExist: true,
          spin: false,
        });
      } else {
        alert("Error Submitting Request");
        this.setState({
          spin: false,
        });
      }
    });
  };

  toggleMutipleMode = () => {
    document.getElementById("single").checked = false;

    if (!this.state.multipleMode) {
      this.setState({ singleMode: false, multipleMode: true });
    } else {
      this.setState({ singleMode: false, multipleMode: false });
    }
  };

  toggleSingleMode = () => {
    document.getElementById("multiple-id").checked = false;

    if (!this.state.singleMode) {
      this.setState({ singleMode: true, multipleMode: false });
    } else {
      this.setState({ singleMode: false, multipleMode: false });
    }
  };

  componentDidMount() {
    // document.getElementById("single").checked = true;

    this.getEmailRecipients();

    fetchData("/JobVacancy", (data) => {
      this.setState({ jobVacancy: data });
      console.log(this.state.jobVacancy, "Vacancy Payload");
    });
  }

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

  uploadExcelSheet = async () => {
    this.setState({
      spin: true,
    });
    const formData = new FormData();

    const file = this.state.selectedFile;

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
          URL +
          `/JobVacancy/ProcessApplicantDetailsFromExcel?jobVacancyId=${parseInt(
            this.state.vacancyId
          )}`,
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
      console.log(err);
    }
  };

  handleFileSelector = (e) => {
    this.inputElement.click();
  };

  loadRecipientData = (data) => {
    this.setState({
      recipientEmail: data.email,
      recipientId: data.id,
      recipientGuid:data.guid,
      sendMailConfirmCard: true,
    });
    console.log(data);
  };

  getEmailRecipients = () => {
    fetchData(`/JobVacancy/GetJobRecipients`, (data) => {
      let mappedRecipients = data.map((d, i) => {
        return {
          sn: i + 1,
          firstname: d.firstname,
          lastname: d.lastname,
          email: d.email,
          jobVacancyName:d.jobVacancyName,
          action: (
            <button className="btn btn-sm"
            style={{background:"#7b2580", color:"ghostwhite"}}
            onClick={() => this.loadRecipientData(d)}
            
            >
              <i
                className="fa fa-refresh"
                style={{ cursor: "pointer" }}
              ></i>
            </button>
          ),
        };
      });
      console.log(mappedRecipients, "Mapped");
      this.setState({
        emailRecipients: mappedRecipients,
      });
      console.log(this.state.emailRecipients, "State");
    });
  };

  initiateResendEmailLink = () => {
    this.setState({sendMailConfirmCard:false, spin:true})
    postData(`/JobVacancy/ResendEmailLink?id=${this.state.recipientId}&guid=${this.state.recipientGuid}`, this.state.recipientId, (data) =>{
      this.setState({success:true, returnData:data, spin:false})
    });
  }
  
  
  render() {
    return (
      <>
      {this.state.spin ? <Spinner/> : null}
        <div className="row align-items-center py-4">
          <div className="col-lg-6 col-7">
            <h6 className="h1 d-inline-block mb-0 pop-font">
              Dashboard <span className="h3 text-muted">/Job Invitation</span>
            </h6>
          </div>
          <div className="col-lg-6 col-5 text-right"></div>
        </div>
        {/* {this.state.spin ? <Spinner msg={"Processing..."}/> : null} */}
        <Modal isOpen={this.state.successExcel}>
          <ModalHeader className="sofia">System Notice</ModalHeader>
          <ModalBody>
            <p className="sofia">
              Successfully Uploaded <img src={checkIcon} width="50" />
            </p>
            <br />
            <p className="sofia">
              Successful Uploads : {this.state.feedBack?.success}
            </p>
            <p className="sofia">
              Failed Uploads (Already Existing) : {this.state.feedBack?.failed}
            </p>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary sofia"
              onClick={() => this.setState({ successExcel: false })}
            >
              Ok
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.success}>
          <ModalHeader className="sofia">System Notice</ModalHeader>
          <ModalBody>
            <p className="sofia">
              Job application link was sent successfully{" "}
              <img src={checkIcon} width="50" />
            </p>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary sofia"
              onClick={() => this.setState({ success: false })}
            >
              Ok
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.sendMailConfirmCard}>
          <ModalHeader className="sofia">System Notice</ModalHeader>
          <ModalBody>
            <p className="sofia">
              Resend Job Link to <b>{this.state.recipientEmail}</b>?
            </p>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary sofia"
              onClick={this.initiateResendEmailLink}
            >
              Yes
            </button>
            <button
              className="btn btn-danger sofia"
              onClick={() => this.setState({ sendMailConfirmCard: false })}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.alreadyExist}>
          <ModalHeader className="sofia">System Notice</ModalHeader>
          <ModalBody className="text-center">
            <p className="sofia">
              A link, with the selected Job Position has already been sent to the email provided <img src={caution} width="50" />
            </p>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary sofia"
              onClick={() => this.setState({ alreadyExist: false })}
            >
              Ok
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.sendLink}>
          <ModalHeader className="sofia">System Notice</ModalHeader>
          <ModalBody>
            <p className="sofia">Are you Sure about this action?</p>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary sofia"
              onClick={this.handlePostLink}
            >
              Confirm
            </button>
            <button
              className="btn btn-danger sofia"
              onClick={() => {
                this.setState({ sendLink: false });
              }}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        <div className="row mt-3">
          <div className="col-md-2">
            <label
              htmlFor="example-text-input"
              className="row form-control-label sofia"
              style={{ marginLeft: "3px" }}
            >
              Send Job Invitation (Single) &nbsp;
            </label>

            <label
              className="custom-toggle"
              // onClick="showThisForm('publications')"
            >
              <input
                type="checkbox"
                // checked={true}
                id="single"
                //   value={this.state.show}
                onChange={this.toggleSingleMode}
              />
              <span
                className="custom-toggle-slider rounded-circle"
                style={{ borderRadius: "34px !important" }}
                data-label-off="Show"
                data-label-on="Hide"
              />
            </label>
          </div>

          <div className="col-md-2">
            <label
              htmlFor="example-text-input"
              className="row form-control-label sofia"
              style={{ marginLeft: "3px" }}
            >
              Send Job Invitation (Multiple) &nbsp;
            </label>

            <label className="custom-toggle">
              <input
                type="checkbox"
                id="multiple-id"
                onChange={this.toggleMutipleMode}
              />
              <span
                className="custom-toggle-slider rounded-circle"
                style={{ borderRadius: "34px !important" }}
                data-label-off="Show"
                data-label-on="Hide"
              />
            </label>
          </div>
        </div>

        {/* Single Mode */}
        <Fade>
          {this.state.singleMode ? (
            <AttentionSeeker effect={"shake"} duration={300}>
              <section>
                <div className="row justify-content-center">
                  <h2 className="sofia" style={{ textAlign: "center" }}>
                    {/* Single Mode */} &nbsp;
                  </h2>
                </div>

                <div className="row justify-content-center">
                  <hr className="mx-0" />
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-12">
                            <h3
                              className=" mb-0 sofia text-center"
                              style={{ fontWeight: "600" }}
                            >
                              <b>SEND APPLICATION LINK</b>
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
                            First Name
                          </label>

                          <input
                            className="form-control col-12"
                            type="text"
                            onChange={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                            value={this.state.firstName}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label sofia"
                          >
                            Last Name
                          </label>

                          <input
                            className="form-control col-12"
                            type="text"
                            onChange={(e) =>
                              this.setState({ lastName: e.target.value })
                            }
                            value={this.state.lastName}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label sofia"
                          >
                            Email
                          </label>

                          <input
                            className="form-control col-12"
                            type="text"
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                            value={this.state.email}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label sofia"
                          >
                            Position
                          </label>

                          <select
                            className="form-control col-12"
                            onChange={(e) => {
                              this.setState({ vacancyId: e.target.value });
                            }}
                          >
                            <option>Select Vacant Position</option>
                            {this.state.jobVacancy &&
                              this.state.jobVacancy.map((j, i) => {
                                return <option value={j.id}>{j.name}</option>;
                              })}
                          </select>
                        </div>
                        <br />

                        <button
                          type="button"
                          className={
                            this.state.spin
                              ? "btn btn-primary text-white sofia disabled"
                              : "btn btn-primary text-white sofia"
                          }
                          onClick={() => {
                            this.setState({ sendLink: true });
                          }}
                        >
                          {this.state.spin ? "Processing..." : "Send Mail"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AttentionSeeker>
          ) : null}
        </Fade>

        {/* Multiple Mode */}
        <Fade>
          {this.state.multipleMode ? (
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
                            <h3 className=" mb-0 sofia">Excel Sheet Upload</h3>
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
                            Position
                          </label>

                          <select
                            className="form-control col-12"
                            onChange={(e) => {
                              this.setState({ vacancyId: e.target.value });
                            }}
                          >
                            <option>Select Vacant Position</option>
                            {this.state.jobVacancy &&
                              this.state.jobVacancy.map((j, i) => {
                                return <option value={j.id}>{j.name}</option>;
                              })}
                          </select>
                        </div>
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
                            className="btn btn-info"
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
                            className="btn btn-primary text-white sofia"
                            onClick={this.uploadExcelSheet}
                          >
                            Upload & Send
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
          ) : null}
        </Fade>
        <div className="row justify-content-center">
          <hr className="mx-0" />
          <div className="col-md-9 mt-4 justify-content-center">
            {/* <div className="card"> */}
            {/* <div className="card" style={{ width: "750px" }}> */}
            <div className="card-header">
              <div className="justify-content-center">
                <div>
                  <span className="h4 card-title mb-0 mr-2">
                    Invited Applicants
                  </span>
                </div>
              </div>
            </div>
            <EmailDataTable passedDept={this.state.emailRecipients} />
          </div>
        </div>
      </>
    );
  }
}

export default CreateJobLink;
