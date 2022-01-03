import React, { Component } from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import {Link, Redirect} from "react-router-dom"
import Spinner from "./Spinner";



class AttendanceReportRequest extends Component {
  state = {
    month: "",
    year: "",
    textMonth: "",
    reportTitle: "",
    monthValue: "",
    yearValue: "",
    redirect: false,
    holiday: "",
    attendanceReport: [],
    spin:false,
    emptyFields: false,
    department:"",
    departmentHandler: "",
    currentDepartment:""
  }

  cancelEmpty = () =>{
    this.setState({
      emptyFields:false,
      spin:false
    })
  }

  handlePull = () => {

    this.setState({
      spin:true
    })
    if(this.state.month == "" || this.state.year == "" || this.state.holiday == ""){


      this.setState({
        emptyFields:true,
        spin:false
      })
    }else{

    fetchData(
      `/Attendance/AttendanceMonthlyReport?monthFigure=${this.state.month}&yearFigure=${this.state.year}&monthWord=${this.state.reportTitle}&holidayCount=${this.state.holiday}&departmentId=${this.state.department}`,
      data => {
        console.log(data)
        setTimeout(()=>{
          this.setState({ attendanceReport: data, redirect:true })
        console.log(this.state.attendanceReport, "attendeeeee")
        // if (this.state.redirect) {
        //   navigate("/app/admin/attendanceReport", {
        //     state: { passedReport: this.state.attendanceReport, reportName: this.state.reportTitle, holidayCount: this.state.holiday, currentDepartment: this.state.departmentHandler },
        //   })
        // }

        },4000)



      }
    )}

    console.log(this.state.attendanceReport, "Report")
  }
  trigger = () =>{
    this.handlePull();
  }

  handleMonthId = e => {
    this.setState({
      month: parseInt(e.target.value),
    })

    if(typeof window !== "undefined"){
      console.log(this.state.month, "Month")
      const sel = document.getElementById("mySelect");
      const textValues = sel.options[sel.selectedIndex].text
      console.log(textValues);

      this.setState({
        reportTitle: textValues
      })

    }
  }


  handleYearId = e => {
    this.setState({
      year: parseInt(e.target.value),
    })
    console.log(this.state.year, "YearValue")
  }
  handleDepartmentId = e => {
    this.setState({
      department: parseInt(e.target.value),
    })

    const departmentList = typeof window !== "undefined" ? document.getElementById("myDept") : null;
    const selectedDepartment = departmentList.options[departmentList.selectedIndex].text;


    this.setState({
      departmentHandler : selectedDepartment
    })

    console.log(this.state.department, "DepartmentValue")
    console.log(this.state.departmentHandler, "Department Name")
  }

  componentDidMount(){
    fetchData('/InstitutionDepartments', (data) => {
      this.setState({ instDept: data })
      console.log(this.state.instDept, "Department")
  });
  }


  render() {

    if(this.state.redirect){
      return(
          <Redirect
          to={{pathname:"/AttendanceReportPage" ,
          state: { passedReport: this.state.attendanceReport, reportName: this.state.reportTitle, holidayCount: this.state.holiday, currentDepartment: this.state.departmentHandler },
        }}
          />
      )}
    return (
      <div>
        <h6 className="h2 d-inline-block mb-0 pop-font py-4">
          Attendance Report
        </h6>



{this.state.spin ? <Spinner msg={"Loading Report"}/> : null}
{this.state.emptyFields == true ? <div className="jumbo-back" onClick={this.cancelEmpty}>
<div className="container">
    <div className="jumbotron empty-alert">
      <h5>Some fields were not selected!</h5>

    </div>
  </div>
  </div> : null}


        {/* <div>Attendance Report Request</div> */}

        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Month{" "}
                    </label>
                    <select
                      className="form-control select-search-dropdown"
                      id="mySelect"
                      name="staffId"
                      required
                      onChange={this.handleMonthId}
                    >
                      <option value="0">--- Select Month ---</option>
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
                </div>


                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Year
                    </label>
                    <select
                      className="form-control select-search-dropdown"
                      name="assetId"

                      required
                      onChange={this.handleYearId}
                    >
                      <option>--- Select Year --- </option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>
                </div>
                {/* <div className="jumbo-back"></div> */}

                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Department
                    </label>
                    <select
                      className="form-control select-search-dropdown"
                      name="assetId"
                     id="myDept"
                      required
                      onChange={this.handleDepartmentId}
                    >

                      <option>--- Select Department ---</option>
                      {this.state.instDept &&
                                  this.state.instDept.map((c, i) => (
                                    <option value={c.id} key={i}>
                                      {c.name}
                                    </option>
                                  ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Number of Holidays
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="serialNumber"
                      value={this.state.holiday}
                      onChange={e =>
                        this.setState({
                          holiday: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>



              </div>

            <div className="text-center">
              <button type="button" onClick={this.trigger} data-dismiss="modal" className="btn btn-primary" >
                Get Report
              </button>
            </div>

              {/* <Link
                state={this.state.attendanceReport}
                to={"app/admin/attendanceReport"}
              > */}
              {/* Pull
              </Link> */}



            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AttendanceReportRequest
