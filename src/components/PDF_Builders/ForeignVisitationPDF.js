import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Loadable from "react-loadable";
import jsPDF from "jspdf"
import "jspdf-autotable"
import logobg from "../../images/ziklogosm.png";
import { Table, Tag, Space, PageHeader } from "antd";
import { Fade } from "reactstrap";

const { Column, ColumnGroup } = Table;



class AssignDept extends Component {
  state = {
    myData: { name: "Okoro", rank: "Accountant" },
    applications: this.props.applications,
    
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
            label: "Full Name",
            field: "fullName",
            sort: "asc",
            width: 150,
          },
 
          {
            label: "Visitation Type",
            field: "visitationType",
            sort: "asc",
            width: 150,
          },
       
        {
            label: "Email",
            field: "email",
            sort: "asc",
            width: 150,
          },
        
          
          {
            label: "Status",
            field: "status",
            sort: "asc",
            width: 150,
          },
          {
            label: "Duration of Stay",
            field: "durationOfStay",
            sort: "asc",
            width: 150,
          },
          {
            label: "Action",
            field: "action",
            sort: "asc",
            width: 150,
          },
        //   {
        //     label: "Phone",
        //     field: "phone",
        //     sort: "asc",
        //     width: 150,
        //   },
          
        //   {
        //     label: "Programme",
        //     field: "programme",
        //     sort: "asc",
        //     width: 150,
        //   },

       
        
     
      ],
      rows: this.props.applications,
    }
    return (
      <>
   
      
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
          {/* <button className="btn btn-primary" onClick={() => this.exportPDF()}><i className="fa fa-file-pdf-o"/> &nbsp; PDF (Documentation)</button>  */}
            {/* <button className="btn  btn-success custom-success" onClick={() => this.exportPDFPosting()}><i className="fa fa-paperclip"/> &nbsp; PDF (Post Copy)</button>  */}
          
            {/* <hr className="my-3" /> */}
            <MDBDataTableV5 bordered hover data={data} searchBottom={false} id="tblCustomers" />
          </div>
        </div>
      </div>

<>
            
            </>
       
       
      </>
    )
  }
}

export default AssignDept
