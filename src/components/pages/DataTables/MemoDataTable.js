import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Loadable from "react-loadable";
import jsPDF from "jspdf"
import "jspdf-autotable"
// import logobg from "../../images/ziklogosm.png";
import { Table, Tag, Space, PageHeader } from "antd";
import { Fade } from "reactstrap";

const { Column, ColumnGroup } = Table;



class MemoDataTable extends Component {
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
            label: "Originator",
            field: "originator",
            sort: "asc",
            width: 150,
          },
        
          {
            label: "Memo Title",
            field: "title",
            sort: "asc",
            width: 150,
          },
          {
            label: "Date",
            field: "datePosted",
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
            label: "Action",
            field: "action",
            sort: "asc",
            width: 150,
          },
        
       
        
     
      ],
      rows: this.props.applications,
    //   rows: [
    //       {
    //         sn:1,
    //         originator:"HOD Accountancy",
    //         title:"ADMISSION OPERATIONS",
    //         action: <>
            
    //                     <button className="btn btn-outline-primary btn-sm">view</button>
                       
    //                         </>
    //       }
    //   ]
    }
    return (
      <>
   
{/*       
      <div className="card col-md-10">
        <div className="card-body">
          <div className="table-responsive">
          <button className="btn btn-primary" onClick={() => this.exportPDF()}><i className="fa fa-file-pdf-o"/>&nbsp; Incoming</button> 
            <button className="btn  btn-success custom-success" onClick={() => this.props.onClickF}><i className="fa fa-paperclip"/> &nbsp;Sent</button>
          
            <hr className="my-3" /> */}
            <MDBDataTableV5 bordered hover data={data} searchBottom={false} id="tblCustomers" />
          {/* </div>
        </div>
      </div> */}

<>
            
            </>
       
       
      </>
    )
  }
}

export default MemoDataTable
