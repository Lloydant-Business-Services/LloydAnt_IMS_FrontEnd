import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Loadable from "react-loadable";
import jsPDF from "jspdf"
import "jspdf-autotable"
import logobg from "../../../images/ziklogosm.png";

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
  Fade,
} from "reactstrap";




class RankCount extends Component {
  state = {
    myData: { name: "Okoro", rank: "Accountant" },
  }


  exportPDF = () => {

    // var refNo = document.getElementById("refNumber").value
    // var fileNo = document.getElementById("fileNumber").value
    // if(refNo == null || refNo == "" || fileNo == null || fileNo == ""){
    //   alert("Reference number and File number Cannot be left empty!")
    //   return false
    // }
    // this.setState({assumptionParameters:false})
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 20;
   


    if(typeof window !== "undefined"){
      const doc = new jsPDF(orientation, unit, size)
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
      const ass = "ASSUMPTION OF DUTY";
      const footer="khjlllbk"

      // const logg = logobg;
      const title = "Uinvited"
      const headers = [
        [
          "S/N",
          "STAFF NO",
          "STAFF NAME",
          "RANK",
          "DEPARTMENT",
          "SALARY LEVEL",
          "DATE OF ASSUMPTION"
          // "application score",
        ],
      ]

      const foott = [
        [
        "Registrar: Okeke Steph"
      ],
      [
        "Registrar: Okeke Steph"
      ],
    
    ]

      const data = this.props.passedStaffData.map(d => [
        d.sn,
        d.staffIdentityNumber,
        d.name,
        d.rank,
        d.department,
        d.salaryCategory,
        d.comment + " " + d.rank + " " + "on"+ " " + d.dateOfAssumption.substring(0, 10)
        // d.applicationScore,
      ])

      let content = {
        startY: 310,
        head: headers,
        body: data,
        // foot: foott
        
      }

      doc.setFont('Arial')
      doc.setFontSize(17);

      doc.addImage(img, 'png', 280, 20, 28, 34);
     
      doc.setFontType("bold");
      doc.text(nau, 180, 70)
      doc.setFontType("normal");
      doc.text("P.M.B. 5025", 260, 87)
      doc.text("AWKA", 280, 105)
      
      doc.setFontSize(15);
      doc.setLineDash([20, 0], 10);
    doc.line(50, 135, 553, 135);
      doc.text("OFFICE OF THE REGISTRAR", 60, 150)
      doc.text("Internal Memorandum", 380, 150)
      doc.setLineDash([20, 0], 10);
    doc.line(50, 155, 553, 155);
    // NAU/A/R/P/G.50
      doc.setFontSize(12);
      doc.text("To:  Bursar", 60, 180)
      doc.text("From:  Registrar", 410, 180 )
      doc.text("Ref No : "  + "NAU/A/R/P/G.50", 60, 205)
      doc.text("Date: " + " " + today, 410, 205 )
      doc.setLineDash([20, 0], 10);
      doc.line(50, 220, 553, 220);
     
      doc.setFontSize(14);
   doc.setFontType("bold");

      doc.text(ass, 210, 280)
      doc.setFontSize(12);
   doc.setFontType("normal");

      doc.text("I am directed the forward the assumption of duty forms of the underlisted staff", 90, 296)
    //   doc.text(title, marginLeft, 50)
    doc.setFontSize(15)
   doc.autoTable(content)

   var check = doc.autoTableEndPosY() + 50

   doc.setFontSize(12);
   doc.text("Kindly payroll them with effect from the date they assumed duty.", 30, check)
   doc.text("NB: Those without staff numbers should check at the Bursary for their numbers.", 30, check+15)
   
   doc.setFontType("bold");
   doc.text("OKEKE DORATHY N. (MRS)", 30, check+40) // check+40
   doc.setFontType("normal");

   doc.text("Deputy Registrar(Personnel)", 30, check+55)
   
   doc.setFontType("bold");

   doc.text("FOR: REGISTRAR", 30, check+75)
   doc.setFontType("normal");

   doc.text("CC " + "   : " + "Registrar", 30, check+90)
   doc.text("   " + "      " + "  " + "Director, Internal Audit", 30, check+105)
   doc.text("   " + "      " + "  " + "Statistics(Personnel)", 30, check+120)
   doc.text("   " + "      " + "  " + "Staff P/F", 30, check+135)
   doc.text("   " + "      " + "  " + "File G.50", 30, check+150)
   var sum = doc.internal.pageSize.height
   alert(sum)
  //  doc.text("Foot", 50, doc.internal.body.height - 20);
  //  var height = doc.text("Footer", 50, doc.internal.pageSize.height - 100);

      doc.save(today + " Assumption of duty.pdf")
    }
  }

  componentDidMount() {
    
  }
  render() {
    const data = {
    //   columns: [
    //     {
    //       label: "S/N",
    //       field: "sn",
    //       sort: "asc",
    //       width: 150,
    //     },
 
    //     {
    //       label: "Lecturer II",
    //       field: "staffIdentityNumber",
    //       sort: "asc",
    //       width: 150,
    //     },
    //     {
    //       label: "Accountant",
    //       field: "name",
    //       sort: "asc",
    //       width: 150,
    //     },
     
    //     {
    //       label: "Bursar",
    //       field: "department",
    //       sort: "asc",
    //       width: 100,
    //     },

    //     {
    //         label: "Chief Clerical Officer",
    //         field: "rank",
    //         sort: "asc",
    //         width: 150,
    //       },

    //       {
    //         label: "Accountant I",
    //         field: "salaryCategory",
    //         sort: "asc",
    //         width: 150,
    //       },

    //       {
    //         label: "Technlogists",
    //         field: "dateOfAssumption",
    //         sort: "asc",
    //         width: 150,
    //       },
    //       {
    //         label: "Enginneer",
    //         field: "action",
    //         sort: "asc",
    //         width: 150,
    //       },
     
    //   ],
      columns :  
      
       
        this.props.retrievedRanksByCadre.rankStaffCounts.map((a, i) => {
          return{

              label: a.rankName,
          }
      }),
      rows: this.props.properCount,
    }
    return (
      <>
      
      
            <MDBDataTableV5 striped hover data={data} searchTop searchBottom={false} id="tblCustomers"/>

      </>
    )
  }
}

export default RankCount
