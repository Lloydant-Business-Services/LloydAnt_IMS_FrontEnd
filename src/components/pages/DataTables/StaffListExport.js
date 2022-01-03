import React from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
// import { columns, data } from './Data.js';
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Loadable from "react-loadable";
import jsPDF from "jspdf"
import "jspdf-autotable"

class StaffListDataTable extends React.Component {
  state = {
    tablePayload: JSON.parse(localStorage.getItem("TableData")),

  }


  exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "landscape" // portrait or landscape

    const marginLeft = 20

    if(typeof window !== "undefined"){
      const doc = new jsPDF(orientation, unit, size)

      doc.setFontSize(15)

      const nau = "NNAMDI AZIKIWE UNIVERSITY";
      // const logg = logobg;
      const title = "Uinvited"
      const headers = [
        [
          "SN",
          "USERNAME",

          "STAFF NUMBER",
          "STAFF NAME",
          "STAFF TYPE",
          "STAFF CATEGORY",
          "RANK",

          "DEPARTMENT",
          // "application score",
        ],
      ]

      const data = this.props.passedStaffData.map(d => [
        d.sn,
        d.username,
        d.staffIdentityNumber,
        d.name,
        d.staffType,
        d.staffCategory,
        d.rank,
        d.department,
        // d.applicationScore,
      ])

      let content = {
        startY: 70,
        head: headers,
        body: data,
      }

      doc.text(nau, marginLeft, 30)
      doc.text(title, marginLeft, 50)
      doc.autoTable(content)
      doc.save("report.pdf")
    }
  }
 

  render(){

    const columns = [
      {
        name: "S/N",
        selector: "sn",
        sortable: true,
      },
     
     
        {
            name: "USERNAME",
            selector: "username",
            sortable: true,
          },

          {
            name: "STAFF NUMBER",
            selector: "staffIdentityNumber",
            sortable: true,
          },
  
          {
            name: "SURNAME",
            selector: "surname",
            sortable: true,
          },

          {
            name: "FIRSTNAME",
            selector: "firstname",
            sortable: true,
          },
          {
            name: "OTHERNAME",
            selector: "othername",
            sortable: true,
          },
          {
            name: "DATE OF RETIREMENT",
            selector: "dateOfRetirement",
            sortable: true,
          },
          // {
          //   name: "SALARY CATEGORY",
          //   selector: "salaryCategory",
          //   sortable: true,
          // },

          {
            name: "DEPARTMENT",
            selector: "department",
            sortable: true,
          },
          {
            name: "RANK",
            selector: "rank",
            sortable: true,
          },

          {
            name: "CATEGORY",
            selector: "staffCategory",
            sortable: true,
          },

          {
            name: "STAFF TYPE",
            selector: "staffType",
            sortable: true,
          },
        
        
      ];
      
      const data = this.props.passedStaffData

   


    const tableData = {
        columns,
        data,
      };




      
    
  return (
    <>
     <div className="card">
        <div className="card-body">
          <div className="table-responsive">
          <span className="text-sm">Staff List </span>
           
            {/* <button className="btn btn-sm btn-primary" onClick={() => this.exportPDF()}>pdf</button> */}
            <hr className="my-3" />
    {/* <ReactHTMLTableToExcel
      id="test-table-xls-button"
      className="download-table-xls-button btn btn-sm btn-outline-primary"
      table={"tblCustomers"}
      data={data}
      filename="tablexls"
      sheet="tablexls"
      buttonText="excel"
    /> */}


    <DataTableExtensions
      {...tableData}
        style={{padding:"20px"}}
        
      
      
    >


   
      <DataTable
        noHeader
        // defaultSortField="id"
        defaultSortAsc={true}
        pagination
        highlightOnHover
        expandOnRowClicked={true}
        title={"Nominal Roll"}
        fixedHeader={"header test"}
        id="tblCustomers"

        
        
        
        
        
        
        
      />
    </DataTableExtensions>
    </div>
    </div>
    </div>
    </>
  );
}
}

export default StaffListDataTable;