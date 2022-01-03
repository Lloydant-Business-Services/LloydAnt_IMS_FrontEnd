import React from "react"
import { fetchData } from "../../../utils/crud"
import logosm from "../../../images/ziklogosm.png"
import logobg from "../../../images/ziklogo.png"
import Loadable from "react-loadable";

const jsPDF = Loadable({
  loader: () => import("jspdf"),
  loading: React,
});

// const jspdf_autotable = Loadable({
//   loader: () => import("jspdf-autotable"),
//   loading: React
// });

//Import troublesome modules dynamically
// let jsPDF = null;
// let jspdf_autotable = null;
// (async () => {
//     if (typeof window !== "undefined") {
//       // import module for side effects
//       jsPDF = await import("jspdf");
//       jspdf_autotable = await import("jspdf-autotable");
//     }
//   })();

export default class AttendanceReport extends React.Component {
  state = {
    attendance: [],
    attendanceReportInfo: this.props.location?.state?.passedReport,
    reportName: this.props.location.state.reportName,
    holidayCount: this.props.location.state.holidayCount,
    newDepartment: this.props.location.state.currentDepartment,
  }

  exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "landscape" // portrait or landscape

    const marginLeft = 20;

    if(typeof window !== "undefined"){
      const doc = new jsPDF(orientation, unit, size)

      doc.setFontSize(15)

      const title = `Attendance Report Sheet for the Department of ${this.state.newDepartment} (${this.state.reportName})`
      const headers = [
        ["S/N", "Name", "Early", "Late", "Present", "Absent", "% Attendance"],
      ]

      const data =
        this.state.attendanceReportInfo &&
        this.state.attendanceReportInfo?.attendanceReportings.map((d, i) => [
          i + 1,
          d.fullName,
          d.earlyCount,
          d.lateCount,
          d.presentCount,
          d.absentCount,
          d.attendancePercentage,
        ])

      let content = {
        startY: 50,
        head: headers,
        body: data,
      }

      doc.text(title, marginLeft, 30)
      doc.autoTable(content)
      doc.save(`${this.state.newDepartment} Monthly Report.pdf`)
    }
  }

  loadAttendance = () => {
    fetchData("/Attendance/AttendanceMonthlyReport", data => {
      this.setState({ attendance: data })
    })
  }

  componentDidMount() {
    // this.loadAttendance()
    setTimeout(() => {
      console.log(this.state.attendanceReportInfo, "Attenda")
    }, 3000)
  }

  render() {
    console.log(this.state.attendanceReportInfo, "Attenda")
    return (
      <>
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-5 text-right"></div>
          </div>
          {/* Card stats */}
          <div className="row justify-content-md-center" id="nauu">
            <hr className="mx-0" />
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="text-center table-responsive">
                    <table className="table table-borderless p-0">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src={logosm}
                              style={{ height: "74px" }}
                              alt="Logo"
                            />
                          </td>
                        </tr>

                        <tr>
                          <td className="py-0">
                            <h1>NNAMDI AZIKIWE UNIVERSITY</h1>
                          </td>
                        </tr>

                        <tr>
                          <td className="py-0">
                            <p className="mb-0">P.M.B 5025</p>
                          </td>
                        </tr>

                        <tr>
                          <td className="pt-0">
                            <p>info@unizik.edu.ng</p>
                          </td>
                        </tr>

                        <tr>
                          <td className="p-0">
                            <h3>
                              STAFF ATTENDANCE REPORT FOR THE DEPARTMENT OF{" "}
                              <b>{this.state.newDepartment.toUpperCase()}</b>{" "}
                            </h3>
                            <h5>
                              Official Report for the Month of{" "}
                              <b>{this.state.reportName.toUpperCase() || ""}</b>
                            </h5>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless p-0 mb-3">
                      <tbody>
                        <tr>
                          <td className="p-2">
                            <p className="mb-0 text-sm">
                              <span className="font-weight-bold">Early: </span>
                              Staff Checks In on or before 8:30 am
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            <p className="mb-0 text-sm">
                              <span className="font-weight-bold">Late: </span>{" "}
                              Staff Checks In on or before 8:30 am
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            <p className="mb-0 text-sm">
                              <span className="font-weight-bold">
                                Present:{" "}
                              </span>{" "}
                              Staff Checks In and Out
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            <p className="mb-0 text-sm">
                              <span className="font-weight-bold">Absent: </span>{" "}
                              No Check in Or Check Out Record available
                            </p>
                          </td>
                        </tr>
                        <hr />

                        <tr>
                          <td className="p-2">
                            <p className="mb-0 text-sm">
                              <span className="font-weight-bold">
                                Department:{" "}
                              </span>{" "}
                              {this.state.newDepartment}
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            <p className="mb-0 text-sm">
                              <span className="font-weight-bold">Period: </span>{" "}
                              {this.state.reportName || ""}
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            <p className="mb-0 text-sm">
                              <span className="font-weight-bold">
                                Valid Work Days:{" "}
                              </span>{" "}
                              22
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            <p className="mb-0 text-sm">
                              <span className="font-weight-bold">
                                Holiday Count: {this.state.holidayCount || ""}
                              </span>{" "}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead className="bg-primary text-lighter">
                        <tr>
                          <th>S/No</th>
                          <th>Name</th>
                          <th>Early</th>
                          <th>Late</th>
                          <th>Present</th>
                          <th>Absent</th>
                          <th>%Attendance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.attendanceReportInfo &&
                          this.state.attendanceReportInfo?.attendanceReportings.map(
                            (d, i) => {
                              return (
                                <tr>
                                  <td> {i + 1} </td>
                                  <td> {d.fullName} </td>
                                  <td> {d.earlyCount} </td>
                                  <td> {d.lateCount} </td>
                                  <td> {d.presentCount} </td>
                                  <td> {d.absentCount} </td>
                                  <td> {d.attendancePercentage} </td>
                                </tr>
                              )
                            }
                          )}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.exportPDF()}
                      disabled
                    >
                      Export to PDF
                    </button>
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
