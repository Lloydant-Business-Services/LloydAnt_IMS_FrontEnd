import React from "react"
import * as XLSX from "xlsx"
import { getUser } from "../../../utils/auth"
import axios from "axios"
import { URL } from "../../../utils/crud"
import AlertBox from "./alertBox"
import { navigate } from "gatsby"
import Spinner from "./Spinner"



export default class UploadDepartment extends React.Component {
  state = {
    selectedFile: null,
    success:false,
    spin:false
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
      dvExcel.innerHTML = ""
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
    navigate("/app/admin/department")
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
      const user = getUser()
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
        url: URL + "/ApplicationForms/UploadDepartmentListFromExcelSheet",
        data: formData,
        headers: myHeaders(),
      })
      this.setState({success: true, spin:false})
      return console.log(res)
    } catch (err) {
      return console.log(err)
    }
  }

  render() {
    return (
      <div className="header-body">
        {this.state.success ? <AlertBox message={"Uploaded Successfully!"} ok={this.reloadPage}/> : null}
        {this.state.spin ? <Spinner/> : null}
        <div className="row align-items-center py-4">
          <div className="col-lg-12">
            <h6 className="h1 d-inline-block mb-0 pop-font">
              Upload Department List{" "}
              <span className="h3 text-muted"></span>
            </h6>
          </div>

          <div className="col-lg-12 ">
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <p className="text-danger">
                    <b>NOTE: Do not copy &amp; paste Excel data</b>
                  </p>
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
                    className="btn btn-sm btn-info"
                    onClick={this.handleFileSelector}
                  >
                    Select File
                  </button>
                  <br />
                  <button
                    className="btn btn-sm btn-success upl2"
                    onClick={this.uploadFile}
                  >
                    Upload List
                  </button>
                  <hr />
                  <div id="dvExcel"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
