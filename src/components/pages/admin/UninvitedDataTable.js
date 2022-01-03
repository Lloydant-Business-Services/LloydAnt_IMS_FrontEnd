import React, { Component } from "react"
import { MDBDataTable } from "mdbreact"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Loadable from "react-loadable";
import jsPDF from "jspdf"
import "jspdf-autotable"
import logobg from "../../../images/ziklogosm.png";

// const jsPDF = typeof window !== "undefined" ? require("jspdf").default : null;
// const jspdf_autotable = typeof window !== "undefined" ? require("jspdf-autotable").default : null;

// const jsPDFF = Loadable({
//   loader: () => import("jspdf"),
//   loading: React,
// });

// const jspdf_autotable = Loadable({
//   loader: () => import("jspdf-autotable"),
//   loading: React
// });

let jsPDF2 = null;
let jspdf_autotable2 = null;
(async () => {
    if (typeof window !== "undefined") {
      // import module for side effects
      jsPDF2 = await import("jspdf");
      jspdf_autotable2 = await import("jspdf-autotable");
    }
  })();

class UninvitedDataTable extends Component {
  state = {
    myData: { name: "Okoro", rank: "Accountant" },
  }

  exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 20

    if(typeof window !== "undefined"){
      const doc = new jsPDF(orientation, unit, size)

      doc.setFontSize(15)

      const nau = "NNAMDI AZIKIWE UNIVERSITY";
      const logg = logobg;
      const title = "Uinvited"
      const headers = [
        [
          "SN",
          "SURNAME",
          "FIRSTNAME",
          "OTHERNAME",
          "EMAIL",
          "POSITION APPLIED FOR",
          // "application score",
        ],
      ]

      const data = this.props.passedApplicant.map(d => [
        d.sn,
        d.surname,
        d.firstname,
        d.othername,
        d.email,
        d.position,
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
          label: "Surname",
          field: "surname",
          sort: "asc",
          width: 150,
        },
        {
          label: "Firstname",
          field: "firstname",
          sort: "asc",
          width: 270,
        },
        {
          label: "Othername",
          field: "othername",
          sort: "asc",
          width: 200,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 150,
        },
        {
          label: "Position Applied For",
          field: "position",
          sort: "asc",
          width: 100,
        },

        // {
        //   label: "Application Score",
        //   field: "applicationScore",
        //   sort: "asc",
        //   width: 100,
        // },
        {
          label: "Check",
          field: "check",
          sort: "asc",
          width: 100,
        },
      ],
      rows: this.props.passedApplicant,
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <span className="text-sm">Export as: </span>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-sm btn-outline-primary"
              table="tblCustomers"
              filename="tablexls"
              sheet="tablexls"
              buttonText="excel"
            />
            <button className="btn btn-sm btn-primary" onClick={() => this.exportPDF()}>pdf</button>
            <hr className="my-3" />
            <MDBDataTable striped bordered hover data={data} id="tblCustomers" />
        </div>
        </div>
      </div>
    )
  }
}

export default UninvitedDataTable
