import React from "react";
import { fetchData, postData, editData, URL, deleteData } from "../../../utils/crud";
import _ from "lodash";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import { Slide, Fade, AttentionSeeker } from "react-awesome-reveal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";
import Axios from "axios";
import jsPDF from "jspdf"
import "jspdf-autotable"
import logobg from "../../../images/ziklogosm.png";



export default class AttendanceExportList extends React.Component {
  state = {
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    attendanceList: this.props.location.state.attendanceReport,
    yearExtract:this.props.location.state.yearExtract,
    monthExtract:this.props.location.state.monthExtract,
    departmentExtract:this.props.location.state.departmentExtract
  };

  exportPDF = () => {

    
    const orientation = "portrait" // portrait or landscape
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const margins = {
      bottom:40,
      top:10,
      left:10,
      right:10
 };

    const marginLeft = 20;
   


    if(typeof window !== "undefined"){
      // const doc = new jsPDF(orientation, unit, size)
      const doc = new jsPDF( 'portrait', 'pt', "A4", [200,400]);

    
      var img = new Image()
      img.src = logobg
  

      var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var today =  dayOfMonth + " " + curMonth + ", " + curYear;
// curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " +


      doc.setFontSize(15)
        doc.setFont('Times New Roman')


      const nau = "NNAMDI AZIKIWE UNIVERSITY";
      const ass = "P.M.B. 5025";
      const footer="khjlllbk"

      // const logg = logobg;
      const title = "Uinvited"
      const headers2 = [
        [
          " ",
          // "STAFF NO",
          // "STAFF NAME",
          // "RANK",
          // "DEPARTMENT",
          // "SALARY LEVEL",
          // "DATE OF ASSUMPTION"
          // "application score",
        ],
      ]

    


    const headers = [
      [
        "S/N",
        "STAFF NAME",
        "EARLY",
        "LATE",
        "PRESENT",
        "ABSENT",
        "% Attendance"
        // "application score",
      ],
    ]
    let me;
    
    let bodyFoot = [
      // {
      //   vc: "                          Kindly payroll them with effect from the date they assumed duty.",
      // },
      // {
      //   vc: "                          NB: Those without staff numbers should check at the Bursary for their numbers.",
      // },
      // {
      //   vc: " ",
      // },
      // {
      //   vc: " ",
      // },
      {
        vc: "Least Punctual",
      },
      {
        vc: "Most Punctual",
      },

    
      // {
      //   vc:"       Director. Internal Audit",
      // },
      // {
      //   vc:"       Statistics (Personnel)",
      // },
      // {
      //   vc:"       Staff P/F",
      // },
      // {
      //   vc:"       File G.50",
      // },
      // {vcd:"Miracle"},
    ]
    
  const dora = bodyFoot.map(d => [
    d.vc,
  // (<b>{d.vc}</b>)
    
  ])

      const data = this.state.attendanceList.attendanceList.map((d, i)=> [
        i+1,
        d.staffName,
        d.early,
        d.late,
        d.present,
        d.absent,
        "%"
        // d.applicationScore,
      ])

      let content = {
        startY: 420,
        head: headers,
        body: data,
        
        // foot: foott
        
      }

   

      let content2 = {
        // startY: 310,
        // startY: check+25,
        head: headers2,
        body: dora,
        theme:'plain',
        styles: { fontStyle: 'italic' }
        // styles: { fontSize: 11 }
        
      }

      doc.setFont('Arial')
      doc.setFontSize(17);

      //doc.addImage(img, 'png', 280, 20, 28, 34);
     
      doc.setFontType("bold");
      doc.text(nau, 180, 70)
      doc.setFontType("normal");
      doc.setFontSize(13);
      doc.text("P.M.B. 5025", 260, 87)
      doc.text("info@unizik.edu.ng", 250, 105)

      doc.setFontType("bold");
      doc.text("NON ACADEMIC STAFF ATTENDANCE REPORT", 150, 150)
      doc.setFontType("normal");
      doc.setFontSize(30);
      //imageOverload(left, top, width, height)
      doc.addImage(img, 'png', 260, 160, 60, 80);
     //textOverload(left, top)
      doc.setFontSize(12);
      doc.setFontType("bold");
      doc.text("Early: ", 40, 260)
      doc.setFontType("normal");
      doc.text(" Staff Checks In on or before 8:30 am", 70, 260)

      doc.setFontType("bold");
      doc.text("Late: ", 40, 280)
      doc.setFontType("normal");
      doc.text(" Staff does not Check In; Check-Out record available", 70, 280)

      doc.setFontType("bold");
      doc.text("Present: ", 40, 300)
      doc.setFontType("normal");
      doc.text(" Staff Checks In and Out", 90, 300)

      doc.setFontType("bold");
      doc.text("Absent: ", 40, 320)
      doc.setFontType("normal");
      doc.text(" No Check in Or Check Out Record available", 90, 320)

      doc.setFontType("bold");
      doc.text("Department: ", 40, 340)
      doc.setFontType("normal");
      doc.text(" " + this.state.departmentExtract, 110, 340)

      doc.setFontType("bold");
      doc.text("Period: ", 40, 360)
      doc.setFontType("normal");
      doc.text(" " + this.state.monthExtract, 90, 360)

      doc.setFontType("bold");
      doc.text("Valid Workdays: ", 40, 380)
      doc.setFontType("normal");
      doc.text("-", 90, 380)


      doc.setFontType("bold");
      doc.text("Holiday Count : ", 40, 400)
      doc.setFontType("normal");
      doc.text(this.state.attendanceList?.holidays.toString(), 90, 400)

      doc.setFontSize(14);
   
    doc.setFontSize(15)
   doc.autoTable(content)
  //  doc.autoTableEndPosY() + 15
   var check = doc.autoTableEndPosY() + 15

  
  
   doc.autoTable(content2)
  


      doc.save(today + " Assumption of duty.pdf")
    }
  }


  

  componentDidMount() {
      console.log(this.state.attendanceList)
      console.log(this.state.yearExtract)
      console.log(this.state.monthExtract)
      console.log(this.state.departmentExtract)
  }

  render() {
    return (
      <>
        <div className="row mb-4 mt-4">
          <div className="col">
            <h1 className="d-inline-block mb-0 pop-font">
              Attendance Report for the Department of {this.state.departmentExtract}
            </h1>

            <span className="text-sm d-block">
             {this.state.monthExtract}, {this.state.yearExtract}
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
                    {/* <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button btn btn-sm btn-success"
                      table={"staffUploads"}
                      // data={data}
                      filename="Failed Staff Uploads"
                      sheet="Staff List"
                      buttonText="Excel Export"
                    /> */}
            <button className="btn btn-primary btn-sm" onClick={() => this.exportPDF()}><i className="fa fa-file-pdf-o"/> &nbsp; Export to PDF</button> 

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
                          <th>Staff Name</th>
                          <th>Early</th>
                          <th>Late</th>
                          <th>Present</th>
                          <th>Absent</th>
                          <th>% Attendance</th>
                          
                        </thead>

                        <tbody>
                          {this.state.attendanceList?.attendanceList &&
                            this.state.attendanceList?.attendanceList.map((i, a) => {
                              return (
                                <tr>
                                  <td>{a + 1}</td>
                                  <td>{i.staffName}</td>
                                  <td>{i.early}</td>
                                  <td>{i.late}</td>
                                  <td>{i.present}</td>
                                  <td>{i.absent}</td>
                                  <td>- %</td>
                                  
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
