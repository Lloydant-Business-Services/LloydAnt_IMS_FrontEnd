import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Loadable from "react-loadable";
import jsPDF from "jspdf"
import "jspdf-autotable"
import logobg from "../../../images/ziklogosm.png";



// let dora = [];
let nthDerivation  = (data) => {
  if(parseInt(data) == 1 || parseInt(data) == 21 || parseInt(data) == 31){
    return "st"
  }
  else if(parseInt(data) == 2 || parseInt(data) == 22){
    return "nd"
  }
  else if(parseInt(data) == 3 || parseInt(data) == 23){
    return "rd"
  }
  else{
    return "th"
  }
  
}

class AssignDept extends Component {
  state = {
    myData: { name: "Okoro", rank: "Accountant" },
  }


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
      const doc = new jsPDF( 'portrait', 'pt', "A4", [200,400]);

    
      var img = new Image()
      img.src = logobg
  

      var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
  domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var today =  dayOfMonth  + nthDerivation(dayOfMonth) + " " + curMonth + ", " + curYear;


      doc.setFontSize(15)
        doc.setFont('Times New Roman')


      const nau = "NNAMDI AZIKIWE UNIVERSITY";
      const ass = this.props.passedDepartment;
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
        // "STAFF NO",
        "USERNAME",
        "NAME OF STAFF",
        "STAFF NUMBER",
        //"PRESENT DUTY POST",
        "PRESENT",
        // "DATE OF ASSUMPTION"
        // "application score",
      ],
    ]

    let vcFoot = [
      {
        info:""
      },
      {
        info:"SAM UFOH"
      }, 
      {
        info:"Deputy Registrar(Personnel)"
      },
      {
        info:"FOR REGISTRAR"
      },
      {
        info:""
      },
      {
        info:"CC : "
      }
    ]
     let bodyFoot = vcFoot.map(a => [
     
        a.info
      
    ])
    let content3 = {
      // startY: 310,
      // startY: check+25,
      head: headers2,
      body: bodyFoot,
      theme:'plain',
      styles: { fontStyle: 'italic', minCellHeight:"1", cellPadding:"3" }
      // styles: { fontSize: 11 }
      
    }

   
  
    
   



  let dora = this.props.passedDeptHeads.map(a => [
     
    a.newHeadRep
  
])

      const data = this.props.passedStaffData.map(d => [
        d.sn,
        d.userName,
        d.staffName,
        d.staffNumber,

        // d.defaultDepartmentName,
        d.action,
        // d.salaryCategory,
        // d.headRep,
        // d.comment + " " + d.rank + " " + "on"+ " " + d.dateOfAssumption.substring(0, 10)
        // d.applicationScore,
      ])

      let content = {
        startY: 350,
        head: headers,
        body: data,
        theme:'grid',
        headStyles:{fillColor:"#3b67b1"},
        
        // foot: foott
        
      }

   

      let content2 = {
        // startY: 310,
        // startY: check+25,
        head: headers2,
        body: dora,
        theme:'plain',
        styles: { fontStyle: 'italic', minCellHeight:"1", cellPadding:"3" }
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
      doc.text("LITE HR(HUMAN RESOURCE MANAGEMENT) SOLUTION TRAINING", 60, 150)
      //doc.text("Internal Memorandum", 380, 150)
    // NAU/A/R/P/G.50
      doc.setFontSize(12);
      //doc.text("See Distribution Below", 60, 180)
      //doc.text("The Registrar", 410, 180 )
      doc.setFontType("bold");
      doc.text("Department : "  + this.props.passedDepartment, 60, 180)
      doc.text("Date:...............................................", 350, 180)
      doc.setFontType("normal");
      doc.setLineDash([20, 0], 10);
      doc.line(50, 200, 553, 200);
     
      doc.setFontSize(14);
//    doc.setFontType("bold");

//       doc.text(ass, 140, 280)
//       doc.setFontSize(12);
//    doc.setFontType("normal");
   doc.setFontType("bold");
   doc.setFontSize(12);
      doc.text("FOCUS: ", 60, 240)
      doc.setFontType("normal");
      doc.text("* Staff payroll Management", 120, 256)
      //doc.text("* Memo Management- Preparation of Memo and posting.", 120, 270)
      //doc.text("* Training Request Management.", 120, 284)
      //doc.text("* Recap.", 120, 298)

      
      doc.setFontSize(14);
    //   doc.text(title, marginLeft, 50)
    doc.setFontSize(15)
   doc.autoTable(content)
  //  doc.autoTableEndPosY() + 15
   var check = doc.autoTableEndPosY() + 15

   doc.setFontSize(11);
   //doc.text("You are expected to report at your new duty post on/before Tuesday 26th May, 2021.", 70, check)

  				

   //doc.autoTable(content3)
   //doc.autoTable(content2)
  


      doc.save("BURSARY_DEPT_TRAINING.pdf")
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
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),

	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var today =  dayOfMonth + nthDerivation(dayOfMonth) + " " + curMonth + ", " + curYear;
// curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " +

      doc.setFontSize(15)
        doc.setFont('Times New Roman')


      const nau = "NNAMDI AZIKIWE UNIVERSITY";
      const ass = "DEPLOYMENT/REDEPLOYMENT";
      const footer="khjlllbk"
      const headers2 = [
        [
          " ",
         
        ],
      ]
      // const logg = logobg;
      const title = "Uinvited"



      let vcFoot = [
        {
          info:""
        },
        {
          info:"SAM UFOH"
        }, 
        {
          info:"Deputy Registrar(Personnel)"
        },
        {
          info:"FOR REGISTRAR"
        },
        {
          info:""
        },
        {
          info:"CC : "
        }
      ]
       let bodyFoot = vcFoot.map(a => [
       
          a.info
        
      ])
      let content3 = {
        // startY: 310,
        // startY: check+25,
        head: headers2,
        body: bodyFoot,
        theme:'plain',
        styles: { fontStyle: 'italic', minCellHeight:"1", cellPadding:"4" }
        // styles: { fontSize: 11 }
        
      }

      const headers = [
        [
          "S/N",
          // "STAFF NO",
          "NAME OF STAFF",
          "RANK",
          "PRESENT DUTY POST",
          "NEW POSTING",
          // "DATE OF ASSUMPTION"
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



    let dora = this.props.passedDeptHeads.map(a => [
     
      a.newHeadRep
    
  ])



    let content2 = {
      // startY: 310,
      // startY: check+25,
      head: headers2,
      body: dora,
      theme:'plain',
      styles: { fontStyle: 'italic', minCellHeight:"1", cellPadding:"4" }
      
    }


      const data = this.props.passedStaffData.map(d => [
        d.sn,
        // d.staffIdentityNumber,
        d.name,
        d.rank,
        d.defaultDepartmentName,
        d.department,
        // d.salaryCategory,
        // d.comment + " " + d.rank + " " + "on"+ " " + d.dateOfAssumption.substring(0, 10)
        // d.applicationScore,
      ])

      let content = {
        startY: 200,
        head: headers,
        body: data,
        theme:'grid',
        headStyles:{fillColor:"#3b67b1"},
        // foot: foott
        
      }

   
      doc.setFontType("normal");
     
      doc.setFontSize(12);
      doc.text("See Distribution Below", 60, 100)
      doc.text("The Registrar", 410, 100 )
      doc.text("Ref No : "  + "NAU/A/R/P/G.027", 60, 125)
      doc.text("Date: " + " " + today, 410, 125 )
      // doc.setLineDash([20, 0], 10);
      // doc.line(50, 220, 553, 220);
     
      doc.setFontSize(14);
   doc.setFontType("bold");

      doc.text(ass, 60, 170)
      doc.setFontSize(12);
   doc.setFontType("normal");

      // doc.text("I am directed to forward the assumption of duty forms of the underlisted staff", 90, 186)
      doc.text("I am directed to deploy/redeploy the underlisted staff as indicated in the table hereunder.", 60, 186)

    //   doc.text(title, marginLeft, 50)
    doc.setFontSize(15)
   doc.autoTable(content)
   


   var check = doc.autoTableEndPosY() + 15
    doc.setFontSize(11);
   doc.text("You are expected to report at your new duty post on/before Tuesday 26th May, 2021.", 70, check)

   doc.autoTable(content3)
   doc.autoTable(content2)


  

      doc.save(today + " StaffPosting.pdf")
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
            label: "User Name",
            field: "userName",
            sort: "asc",
            width: 150,
          },
 
        {
          label: "Staff Name",
          field: "staffName",
          sort: "asc",
          width: 150,
        },
        {
            label: "Staff Number",
            field: "staffNumber",
            sort: "asc",
            width: 150,
          },
       
          {
            label: "Action",
            field: "action",
            sort: "asc",
            width: 150,
          },
     
      ],
      rows: this.props.passedStaffData,
    }
    return (
      <>
   
      
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
          <button className="btn btn-primary" onClick={() => this.exportPDF()}><i className="fa fa-file-pdf-o"/> &nbsp; PDF (Documentation)</button> 
            <button className="btn  btn-success custom-success" onClick={() => this.exportPDFPosting()}><i className="fa fa-paperclip"/> &nbsp; PDF (Post Copy)</button> 
            {/* <button className="btn btn-sm btn-primary" onClick={() => this.exportPDF()}>pdf(Post)</button>  */}
            <hr className="my-3" />
            <MDBDataTableV5 striped hover data={data} searchTop searchBottom={false} id="tblCustomers"/>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default AssignDept
