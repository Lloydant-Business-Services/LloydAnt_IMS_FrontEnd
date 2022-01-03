import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"
// import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Loadable from "react-loadable";
// import jsPDF from "jspdf"
// import "jspdf-autotable"
//const jsPDF = typeof window !== "undefined" ? require("jspdf").default : null;
//const jspdf_autotable = typeof window !== "undefined" ? require("jspdf-autotable").default : null;

const jsPDF = Loadable({
  loader: () => import("jspdf"),
  loading: React,
});

// const jspdf_autotable = Loadable({
//   loader: () => import("jspdf-autotable"),
//   loading: React
// });

// let jsPDF = null;
// let jspdf_autotable = null;
// (async () => {
//     if (typeof window !== "undefined") {
//       // import module for side effects
//       jsPDF = await import("jspdf");
//       jspdf_autotable = await import("jspdf-autotable");
//     }
//   })();

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

      const title = "My Awesome Report"
      const headers = [
        [
          "surname",
          "firstname",
          "othername",
          "email",
          "position applied for",
          "application score",
        ],
      ]

      const data = this.props.rawData.map(d => [
        d.person.surname,
        d.person.firstname,
        d.person.othername,
        d.person.email,
        d.position,
        d.applicationScore,
      ])

      let content = {
        startY: 50,
        head: headers,
        body: data,
      }

      doc.text(title, marginLeft, 30)
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
            label: "Username",
            field: "username",
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
          label: "Staff Name",
          field: "staffName",
          sort: "asc",
          width: 150,
        },
        
        {
          label: "Staff Type",
          field: "staffType",
          sort: "asc",
          width: 150,
        },
        {
          label: "Rank",
          field: "staffRank",
          sort: "asc",
          width: 100,
        },

        {
          label: "Category",
          field: "staffCategory",
          sort: "asc",
          width: 100,
        },
        {
          label: "Salary Category",
          field: "staffSalaryCategory",
          sort: "asc",
          width: 100,
        },
        {
          label: "Check",
          field: "check",
          sort: "asc",
          width: 100,
        },

        {
          label: "Comments",
          field: "comments",
          sort: "asc",
          width: 100,
        },
        
      ],
      rows: this.props.passedRoll,
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            {/* <span className="text-sm">Export as: </span> */}
            {/* <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-sm btn-outline-primary"
              table="tblCustomers"
              filename="tablexls"
              sheet="tablexls"
              buttonText="excel"
            /> */}
            {/* <button className="btn btn-sm btn-primary" onClick={() => this.exportPDF()}>pdf</button> */}
            <hr className="my-3" />
            <MDBDataTableV5 striped hover data={data} searchTop searchBottom={false} id="tblCustomers" />
        </div>
        </div>
      </div>
    )
  }
}

export default UninvitedDataTable
