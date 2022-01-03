import React from "react"
import * as XLSX from "xlsx"
import { getUser } from "../../../utils/auth"
import axios from "axios"
import { URL, fetchData } from "../../../utils/crud"
import AlertBox from "./alertBox"
// import { navigate } from "gatsby"
import Spinner from "./Spinner"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
//import { data } from "jquery"
import Format from "../../Reusables/StaffListFormat.xlsx"
import {Link} from "react-router-dom"
//import { LinkedCameraRounded } from "@material-ui/icons"






export default class UploadStaffList extends React.Component {
  state = {
    selectedFile: null,
    success:false,
    spin:false,
    staffTypeId:"",
    payLoad: JSON.parse(localStorage.getItem("userData")),

    // warningCard:true
  }

ZoomAction = () => {
  
}

  ProcessExcel = data => {
    if(typeof window !== "undefined"){
      //Read the Excel File data.
      let workbook = XLSX.read(data, {
        type: "binary",
      })

      //Fetch the name of First Sheet.
      let firstSheet = workbook.SheetNames[0]

      //Read all rows from First Sheet into an JSON array.
      let excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet])

      console.log({ excelRows })

       //Create a HTML Table element.
      let table = document.createElement("table")
      table.border = "1"
      table.style.width = "100%"
      table.setAttribute("class", "table table-striped")

      //Add the header row.
      let row = table.insertRow(-1)

      const rows = excelRows[0]
      //Add the header cells.
      for (const key of Object.keys(rows)) {
        let headerCell = document.createElement("TH")
        headerCell.innerHTML = key
        row.appendChild(headerCell)
      }

      for (let i = 0; i < excelRows.length; i++) {
        //Add the data row.
        let row = table.insertRow(-1)
  
        for (let [key, value] of Object.entries(excelRows[i])) {
          //Add the data cells.
          let cell = row.insertCell(-1)
          console.log("Value: ", value)
          cell.innerHTML = value || "--"
        }
      }
  
      let dvExcel = document.getElementById("dvExcel")
      dvExcel.innerHTML = "";
      var createTable = document.createElement("table");
      table.className = "table table-responsive"
      dvExcel.appendChild(table)
    }
  }

  PreviewFile = e => {
    this.setState({ selectedFile: e.target.files[0] })
    //console.log("Multiple Files: ", e.target.files)
    console.log("Single Files: ", e.target.files[0])
    //Reference the FileUpload element.
    let fileUpload = e.target

    //Validate whether File is valid Excel file.
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof FileReader != "undefined") {
        var reader = new FileReader()

        //For Browsers other than IE.
        if (reader.readAsBinaryString) {
          reader.onload = e => {
            this.ProcessExcel(e.target.result)
          }
          reader.readAsBinaryString(fileUpload.files[0])
        } else {
          //For IE Browser.
          reader.onload = e => {
            var data = ""
            var bytes = new Uint8Array(e.target.result)
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i])
            }
            this.ProcessExcel(data)
          }
          reader.readAsArrayBuffer(fileUpload.files[0])
        }
      } else {
        alert("This browser does not support HTML5.")
      }
    } else {
      alert("Please upload a valid Excel file.")
    }
  }
  reloadPage = ()=>{
    this.setState({
      success:false
    })
    // navigate("/app/admin/staff")
  }

  handleFileSelector = e => {
    this.inputElement.click()
  }

  uploadFile = async () => {
    this.setState({
      spin:true
    })
    const formData = new FormData()

    const file = this.state.selectedFile

    formData.append("file", file, file.name)

    let myHeaders = () => {
      const user = this.state.payLoad;
      const authorization = `Bearer ${user.token}`
      const fetchHeader = new Headers()
      fetchHeader.append(
        "content-type",
        `multipart/form-data; boundary=${formData._boundary}`
      )
      fetchHeader.append("Authorization", authorization)
      return fetchHeader
    }

    try {
      const res = await axios({
        method: "post",
        // url: "http://97.74.6.243/LITEHR/api/Attendance",
        url: URL + `/Staff/UploadStaffListFromExcelSheet`,
        data: formData,
        headers: myHeaders(),
      })
      if(res.status == 200){
      this.setState({warningCard: true, spin:false, feedBack:res.data})
      this.componentDidMount();

      }
      return console.log(res)
    } catch (err) {
      return console.log(err)
    }
  }

  
  handleStaffType = (e) => {
    this.setState({
      staffTypeId: parseInt(e.target.value)
    })
  }

  getFailedUploads = () => {
    fetchData(`/Staff/GetFailedUploads`, (data) => {
      this.setState({ failedUploads: data });
    });
  };

  componentDidMount(){
    this.getFailedUploads();
  }

  render() {
    return (
<>

<Modal isOpen={this.state.warningCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"><span className="badge badge-success">System Notice!</span></ModalHeader>
            <button
                type="button"
                className="close"
                onClick={() => {
                  this.setState({ createMenus: false });
                }}
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            <h3 className="text-center sofia">
             Successful Uploads : {this.state.feedBack?.success} <br />
             Failed Uploads: {this.state.feedBack?.failed}<br/>
             Updated : {this.state.feedBack?.updated}
            </h3>
          </ModalBody>
          <ModalFooter>
            <Link
              className="btn btn-outline-danger btn-sm"
             to={"/FailedStaffUploads"}
            >
              See Failed Uploads
            </Link>
            <button
              className="btn btn-success btn-sm"
              onClick={(e) => {this.setState({warningCard:false})}}
            >
              Close
            </button>
          </ModalFooter>
        </Modal>
      <div className="header-body">
        {this.state.success ? <AlertBox message={"Uploaded Successfully!"} ok={this.reloadPage}/> : null}
        {this.state.spin ? <Spinner/> : null}


        <div id="dashboard">
        



        <div class="dashboard-content">

        <div className="row align-items-center py-4">
          <div className="col-lg-12">
            <h6 className="h1 d-inline-block mb-0 pop-font">
              Upload Staff List{" "}
              <span className="h3 text-muted"></span>
            </h6>
          </div>

          <div className="col-lg-12 ">
            <div className="card">
              <div className="card-body">
                <div className="container">
                  <small className="text-center">
                    <b><span className="text-danger">IMPORTANT! :</span> The Upload of staff list using the excel sheet functionality uses a specific format. Staff details are to be formatted accordingly otherwise, the upload action may not be successful. Hit the 'Download format' button below to see how</b> <br/><br/>
                  {/* <button className="btn btn-success btn-sm" disabled href="../upload_format.xlsx" download>Download Format</button> */}
                  <a className="btn btn-success btn-sm sofia" href={Format} download>
                    <b>Download format</b>
                  </a>
                  {this.state.failedUploads?.length > 0 ? <Link className="btn btn-danger btn-sm sofia" href={Format} download style={{float:"right"}} to={"/FailedStaffUploads"}>
                    <b>See Failed Uploads</b>
                  </Link> : null}

                  </small>
                  
                 <br/>
                 <br/>
                 <br/>

                  




                  <label htmlFor="file" className="form-control-label">
                    Upload Excel File:&nbsp;
                  </label>
                  <input
                    className="form-control upl2"
                    name="logoUrl"
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    ref={input => (this.inputElement = input)}
                    onChange={e => {
                      this.PreviewFile(e)
                    }}
                  />

                  <button
                    className="btn btn-outline-info"
                    onClick={this.handleFileSelector}
                  >
                    Select File &nbsp; <i className="fa fa-file"/>
                  </button>
                  <br />
                  <br />
                  <button
                    className="btn btn-outline-primary"
                    onClick={this.uploadFile}
                    // disabled
                  >
                    Upload List <i className="fa fa-send"/>
                  </button>
                  <hr />
                  <div id="dvExcel" className="table table-responsive"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </>
    )
  }
}
