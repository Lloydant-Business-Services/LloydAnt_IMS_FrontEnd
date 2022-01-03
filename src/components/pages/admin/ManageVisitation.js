// import { Table, Tag, Radio, Space } from 'antd';
import React, { Component } from "react";
import { Table, Tag, Space, PageHeader } from "antd";
import { postData, fetchData } from "../../../utils/crud";
import { Fade } from "reactstrap";
import PDFBuilder from "../../PDF_Builders/ForeignVisitationPDF"
import jsPDF from "jspdf"
import "jspdf-autotable"
import logobg from "../../../images/ziklogosm.png";
import _ from "lodash";


const { Column, ColumnGroup } = Table;


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


class Demo extends Component {
    state = {
        top: "topLeft",
        bottom: "bottomRight",
        removedDuplicates:[],
        m1:0
    };
    exportPDF = (_data) => {
      let _this = this;
    
      if(typeof window !== "undefined"){
        const doc = new jsPDF( 'portrait', 'pt', "A4", [200,400]);      
        var img = new Image()
        img.src = logobg
        var passport = new Image();
        passport.src = _data.imageUrl
   
        doc.setFontSize(13)
          doc.setFont('Times New Roman')
    
    
        const nau = "NNAMDI AZIKIWE UNIVERSITY";
        const ass = this.props.passedDepartment;
        const footer="khjlllbk"
    
        // const logg = logobg;
        const title = "Uinvited"
    
        const headers = [
          [
            " ",
            " ",
            // " ",
            
            
          ],
        ]
    
        const _spaceTab = [
        
          {
            br: "",
          }
          

      ]
    
      const _s = _spaceTab.map(d => [
        d.br,
       
        ])
        let _space_break = {
          head: headers,
          body: _s,
          theme:'plain',
          styles: { 
            cellPadding: 0,
            cellWidth: 'wrap'
       }, 
        }
    
      
      
    

    let dora = []

  

        const ff = [
        
          {
            label: `Name : ${_.upperCase(_data.fullName)}`,
            info: `Phone : ${_data.phoneNumber}`,
          },
          {
            label: `Email : ${_data.email}`,
            info: `Gender : ${"Male"}`,
          },
          {
            label: `Passport Number : ${_data.passportNumber}`,
            info: `Date of Birth : ${"07-08-1973"}`,
          },
          {
            label: `Permanent Address : ${"36bb Chukwuka Utazi Street, Moore, New York U.S.A"}`,
            info: " ",
          },
          {
            label: `Correspondence Address : ${"36bb Liberty Estate, Enugu State, Nigeria"}`,
            info: " ",
          }

      ]
    
      const data = ff.map(d => [
        d.label,
        d.info,
        // d.info2
       
        ])
        let content = {
          startY: 290,
          head: headers,
          body: data,
          theme:'plain',
          styles: { 
              fontSize: 12, 
              font:'Times New Roman',
              cellPadding: 7,
              overflow: 'linebreak',
              // cellWidth: 'wrap'
         },
        //  styles: { fontStyle: 'normal', cellPadding:"12", fontSize: 11},
          columnStyles: {
            // columnWidth: 'auto'
          },
          tableWidth: 510,
        
          // foot: foott
          
        }

        const _nok = [
        
          {
            label: `Name : ${" "}`,
            info: `Phone : ${" "}`,
          },
          {
            label: `Email : ${" "}`,
            info: " ",
          },
          

      ]
    
      const nok = _nok.map(d => [
        d.label,
        d.info,
        // d.info2
       
        ])
        let content2 = {
          // startY: 310,
          // startY: doc.autoTableEndPosY() + _this.state.m1,
          // startY: check+25,
          head: headers,
          body: nok,
          theme:'plain',
          // styles: { fontStyle: 'normal', minCellHeight:"2", cellPadding:"3" }
          styles: { 
            fontSize: 12, 
            font:'Times New Roman',
            cellPadding: 7,
            overflow: 'linebreak',
            cellWidth: 'wrap'
       },
       margin: {top: 12}
          // styles: { fontSize: 11 }
          
        }




        const prog_info = [
        
          {
            label1: `Type of Programme : ${"Post-Graduate"}`,
            label2: `Academic Year : ${" "}`,
           
          },
          {
            label1: `Faculty : ${"Sciences"}`,
            label2: `Department : ${"Medcine and Surgery"}`,
          },
          {
            label1: `Estimated Duration of Stay : ${"6 Months"}`,
          }
          

      ]


      const ioc = [
        
        {
          label1: `Date of Degree Awarded : ${"20-10-2020"}`,
          label2: `Faculty : ${"Medical Science"}`,
         
        },
        {
          label1: `Department : ${"Pharmacy"}`,
          label2: `Year : ${"2012"}`,
        },
        {
          label1: `Estimated Duration of Stay : ${"6 Months"}`,
        }
        

    ]

    const _ioc = ioc.map(d => [
      d.label1,
      d.label2,
      // d.info2
     
      ])
    
      const prog_arr = prog_info.map(d => [
        d.label1,
        d.label2,
        // d.info2
       
        ])
        let prog_tab = {
          // startY: 310,
          // startY: check+25,
          head: headers,
          body: prog_arr,
          theme:'plain',
          // styles: { fontStyle: 'normal', minCellHeight:"2", cellPadding:"3" }
          styles: { 
            fontSize: 12, 
            font:'Times New Roman',
            cellPadding: 7,
            overflow: 'linebreak',
            cellWidth: 'wrap'
       },
       margin: {top: 12}
          // styles: { fontSize: 11 }
          
        }
        doc.setFont('Arial')
        doc.setFontSize(13);
    
        doc.addImage(img, 'png', 280, 20, 28, 34);
       
        doc.setFontType("bold");
        doc.text(nau, 180, 70)
        doc.setFontType("normal");
        doc.text("P.M.B. 5025", 260, 87)
        doc.text("AWKA", 280, 105)
        
        doc.setFontSize(14);
        doc.text("DIRECTORATE FOR INTERNATIONAL COLLABORATION AND LINKAGES", 80, 130)
        doc.setLineDash([20, 0], 10);
        doc.line(50, 140, 553, 140);
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("BIO-DATA", 50, 200)
        doc.addImage(passport, 'png', 260, 210, 80, 86);
        doc.autoTable(content)
    //  doc.autoTableEndPosY() + 15
     var check = doc.autoTableEndPosY() + 15
     doc.setLineDash([20, 0], 10);
     doc.line(50, check, 553, check);
     _this.setState({m1:check});
    
     doc.setFontSize(11);
     //doc.text("You are expected to report at your new duty post on/before Tuesday 26th May, 2021.", 70, check)
    
     doc.setFontSize(12);
     doc.setFontType("bold");      
     doc.text("NEXT OF KIN", 47, check + 40)
    //  doc.text("Testing Report", data.settings.margin.left, 50);
    
    //  doc.autoTable(_space_break);
    //  doc.autoTable(content2, {startY:check + 40})
     var check2 = doc.autoTableEndPosY() + 15
     doc.setLineDash([20, 0], 10);
     doc.line(50, check2, 553, check2);
     //doc.autoTable(prog_tab);


     doc.autoTable({
      // html: '#my-table',
      head: [
        // ['ID', 'Name', 'Email', 'Country', 'IP-address'],
      ],
      body: _nok,
      theme: 'plain',
      tableWidth: 300,
      styles: {
        fontSize: 12, 
        font:'Times New Roman',
        cellPadding: 7,
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      columnStyles: {},
      startY: check + 50
    });
    var check3 = doc.autoTableEndPosY() + 15
    doc.text("PROGRAMME INFORMATION", 47, check3 + 40)
    doc.autoTable({
      // html: '#my-table',
      head: [
        // ['ID', 'Name', 'Email', 'Country', 'IP-address'],
      ],
      body: prog_arr,
      theme: 'plain',
      tableWidth: 510,
      styles: {
        fontSize: 12, 
        font:'Times New Roman',
        cellPadding: 7,
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      columnStyles: {},
      startY: check3 + 50
    });

    var check4 = doc.autoTableEndPosY() + 15
    doc.setFontSize(10);
    doc.autoTable(_space_break);

    //doc.text("INFORMATION ON CURRENT INSTITUTION (MASTERS/PREVIOUS INSTITUTION)", 47, check4 + 90)
    doc.autoTable({
      // html: '#my-table',
      head: [["INFORMATION ON CURRENT INSTITUTION (MASTERS/PREVIOUS INSTITUTION)"
        // ['ID', 'Name', 'Email', 'Country', 'IP-address'],
      ]],
      body: _ioc,
      theme: 'plain',
      tableWidth: 510,
      styles: {
        fontSize: 12, 
        font:'Times New Roman',
        cellPadding: 7,
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      columnStyles: {},
      startY: check4 + 100
    });
     //doc.autoTable(content2)
    
    //  var string = doc.output('datauristring');
    //  var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    //  var x = window.open();
    //  x.document.open();
    //  x.document.write(embed);
    //  x.document.close();
    window.open(doc.output('bloburl'))
    
        //doc.save("BURSARY_DEPT_TRAINING.pdf")
      }
    }
    
 
    GetApplications = () => {
        this.setState({ loading: true });
        fetchData("/ForeignVisitation/ForeignVistationApplications", (data) => {
            console.log(data);
            let mapped_applications = data.map((i, n) => {
                return {
                    sn: n + 1,
                    fullName: _.upperCase(i.fullName),
                    email: i.email,
                    programme: i.programmeType,
                    phone: i.phoneNumber,
                    durationOfStay: i.durationOfStay + " Months",
                    status: i.isApproved ?  <span className="badge badge-success badge-sm">Approved</span> : i.isApproved == false ? <span className="badge badge-danger badge-sm">Declined</span> :  <span className="badge badge-warning badge-sm">Awaiting Approval</span>,
                    key: i.id,
                    imageUrl: i.imageUrl,
                    address: i.address,
                    addressSecond: i.addressSecond,
                    institutionDepartment: i.institutionDepartment,
                    currentDepartent: i.currentDepartent,
                    passportNumber: i.passportNumber,
                    reason: i.reason,
                    sponsorshipType: i.sponsorshipType,
                    sponsorshipOrg: i.sponsorshipOrganization,
                    academicYear: i.academicYear,
                    visitationType: _.upperCase(i.visitationType),
                    awardingInstitution: i.awardingInstitution,
                    id: i.id,
                    action: 
                      <>
                      <Space>
                      <i className="fa fa-eye fa-sm btn btn-outline-warning btn-sm" onClick={() => {
                   this.exportPDF(i);
                 }} />
                                        <button className="btn btn-outline-success btn-sm">Approve</button>
                                        <button className="btn btn-outline-danger btn-sm">Decline</button>
                                        </Space>

                                        </>

                    
                };
            });
            this.setState({ applications: mapped_applications, loading: false });
            setTimeout(() => {
              console.log(this.state.applications)
            },2000)
        });
    };

   
    componentDidMount() {
        this.GetApplications();
    }
    render() {
        require("antd/dist/antd.css");

        return (
            <>
            
           
                <Fade>
                    <div className="col-md-12"></div>
                    <br />
                    <div className="">
                        <PageHeader className="site-page-header" onBack={() => null} title="Foreign Visitation/International Collaboration Management" subTitle="View, Approve &  Disprove Applications" />
                    </div>
                    <br />
                    <br />
              
                    <PDFBuilder
                      applications={this.state.applications}
                      passedDeptHeads={this.state.removedDuplicates}
                      passedDepartment={"BURSARY"}
                      passedDate={"May 19th - May 20th, 2021"}
                      />
               
                </Fade>
           
           
            </>
       
       
       );
    }
}

export default Demo;
