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




class AssumptionDataTable extends Component {
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
      const ass = "ASSUMPTION OF DUTY";
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
        "STAFF NO",
        "STAFF NAME",
        "RANK",
        "DEPARTMENT",
        "SALARY LEVEL",
        "DATE OF ASSUMPTION"
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
        vc: "SAM UFOH",
      },

      {
        vc:"Deputy Registrar (Personnel)",
      },
      {
        vc:"For: REGISTRAR",
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

      doc.text("I am directed to forward the assumption of duty forms of the underlisted staff", 90, 296)
    //   doc.text(title, marginLeft, 50)
    doc.setFontSize(15)
   doc.autoTable(content)
  //  doc.autoTableEndPosY() + 15
   var check = doc.autoTableEndPosY() + 15

  //  doc.setFontSize(11);
  //  doc.text("Kindly payroll them with effect from the date they assumed duty.", 130, check)
  //  doc.text("NB: Those without staff numbers should check at the Bursary for their numbers.", 130, check+15)

  
   doc.autoTable(content2)
  


   

  //  doc.setFontSize(12);
  //  doc.text("Kindly payroll them with effect from the date they assumed duty.", 30, check)
  //  doc.text("NB: Those without staff numbers should check at the Bursary for their numbers.", 30, check+15)
   
  //  doc.setFontType("bold");
  //  doc.text("SAMUEL UFOH", 30, check+40)
  //  doc.setFontType("normal");

  //  doc.text("Deputy Registrar(Personnel)", 30, check+55)
   
  //  doc.setFontType("bold");

  //  doc.text("FOR: REGISTRAR", 30, check+75)
  //  doc.setFontType("normal");

  //  doc.text("CC " + "   : " + "Registrar", 30, check+90)
  //  doc.text("   " + "      " + "  " + "Director, Internal Audit", 30, check+105)
  //  doc.text("   " + "      " + "  " + "Statistics(Personnel)", 30, check+120)
  //  doc.text("   " + "      " + "  " + "Staff P/F", 30, check+135)
  //  doc.text("   " + "      " + "  " + "File G.50", 30, check+150)





  //  doc.internal.pageMargins = 200
  //  alert(sum)
  //  doc.text("Foot", 50, doc.internal.body.height - 20);
  //  var height = doc.text("Footer", 50, doc.internal.pageSize.height - 100);

      doc.save(today + " Assumption of duty.pdf")
    }
  }


  exportPDFPosting = () => {

    
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape
    // const pageMargins = [ 40, 60, 40, 60 ],

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
      const headers2 = [
        [
          " ",
         
        ],
      ]
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
    let bodyFoot = [
      {
        vc: "           Kindly payroll them with effect from the date they assumed duty.",
      },
      {
        vc: "           NB: Those without staff numbers should check at the Bursary for their numbers.",
      },
      {
        vc: " ",
      },
      {
        vc: " ",
      },
      {
        vc: "SAM UFOH",
      },

      {
        vc:"Deputy Registrar (Personnel)",
      },
      {
        vc:"For: REGISTRAR",
      },

      
      {
        vc:"       Director. Internal Audit",
      },
      {
        vc:"       Statistics (Personnel)",
      },
      {
        vc:"       Staff P/F",
      },
      {
        vc:"       File G.50",
      },
      // {vcd:"Miracle"},
    ]

    const dora = bodyFoot.map(d => [
      d.vc,
    // (<b>{d.vc}</b>)
      
    ])

    let content2 = {
      // startY: 310,
      // startY: check+25,
      head: headers2,
      body: dora,
      theme:'plain',
      styles: { fontStyle: 'italic' }
      
    }
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
        startY: 200,
        head: headers,
        body: data,
        // theme:'grid'
        // foot: foott
        
      }

   
      doc.setFontType("normal");
     
      doc.setFontSize(12);
      doc.text("To:  Bursar", 60, 100)
      doc.text("From:  Registrar", 410, 100 )
      doc.text("Ref No : "  + "NAU/A/R/P/G.50", 60, 125)
      doc.text("Date: " + " " + today, 410, 125 )
      // doc.setLineDash([20, 0], 10);
      // doc.line(50, 220, 553, 220);
     
      doc.setFontSize(14);
   doc.setFontType("bold");

      doc.text(ass, 210, 170)
      doc.setFontSize(12);
   doc.setFontType("normal");

      doc.text("I am directed to forward the assumption of duty forms of the underlisted staff", 90, 186)
    //   doc.text(title, marginLeft, 50)
    doc.setFontSize(15)
   doc.autoTable(content)

   var check = doc.autoTableEndPosY() + 50

   doc.autoTable(content2)


  

      doc.save(today + " Assumption of duty.pdf")
    }
  }
  componentDidMount() {
    
  }
  render() {
    const data = {
      columns: [
      
        {
          label: "S/N",
          field: "sn",
          sort: "asc",
          width: 150,
        },
 
        {
          label: "Staff Number",
          field: "staffIdentityNumber",
          sort: "asc",
          width: 150,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150,
        },
     
        {
          label: "Department",
          field: "department",
          sort: "asc",
          width: 100,
        },

        {
            label: "Rank",
            field: "rank",
            sort: "asc",
            width: 150,
          },

          {
            label: "Salary Category",
            field: "salaryCategory",
            sort: "asc",
            width: 150,
          },

          {
            label: "Date of Assumption",
            field: "dateOfAssumption",
            sort: "asc",
            width: 150,
          },






          // {
          //   label: "this.state.rank",
          //   field: "this.state.count",
          //   sort: "asc",
          //   width: 150,
          // },
     
      ],
      rows: this.props.passedStaffData,
    }
    return (
      <>
      <Modal
          isOpen={this.state.assumptionParameters}
          // style={{ maxWidth: "700px" }}
        >
          <ModalHeader>{this.state.Title} Document Info</ModalHeader>
          <ModalBody>
            

          <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Reference Number
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="refNumber"
                      class="form-control col-12"
                      defaultValue={this.state.refNumber}
                      onChange={(e) => {
                        this.setState({ refNumber: e.target.value });
                      }}
                    />
                  </div>

        <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   File Number
                  </label>

                  <input
                      className="form-control"
                      type="text"
                      id="fileNumber"
                      class="form-control col-12"
                      defaultValue={this.state.fileNumber}
                      onChange={(e) => {
                        this.setState({ fileNumber: e.target.value });
                      }}
                    />
                </div>
          </ModalBody>
          <ModalFooter>
          <button
              className="btn btn-info"
              onClick={() => this.exportPDF()}
            >
              Download
            </button>
         
            
            <button
              className="btn btn-danger"
              onClick={() => {this.setState({assumptionParameters:false})}}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
          <span className="text-sm">Download/Export: </span>
            {/* <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-sm btn-outline-primary"
              table={"tblCustomers"}
              // data={data}
              filename="tablexls"
              sheet="tablexls"
              buttonText="excel"
            /> */}

            <button className="btn btn-primary" onClick={() => this.exportPDF()}><i className="fa fa-file-pdf-o"/> &nbsp; PDF (Documentation)</button> 
            <button className="btn  btn-success custom-success" onClick={() => this.exportPDFPosting()}><i className="fa fa-paperclip"/> &nbsp; PDF (Post Copy)</button> 
            <hr className="my-3" />
            <MDBDataTableV5 striped hover data={data} searchTop searchBottom={false} id="tblCustomers"/>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default AssumptionDataTable
