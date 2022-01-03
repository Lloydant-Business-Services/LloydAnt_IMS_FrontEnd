import React, { Component } from "react"
import { MDBDataTable } from "mdbreact"

class AppListDataTable extends Component {
  state = {
    myData: { name: "Okoro", rank: "Accountant" },
  }

  componentDidMount() {}
  render() {
    const data = {
      columns: [
        {
          label: "S/N",
          field: "sn",
          sort: "asc",
          width: 100,
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
          width: 150,
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
          label: "Job Applied For",
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
        // {
        //   label: "CV",
        //   field: "staffCV",
        //   sort: "asc",
        //   width: 100,
        // },
        {
          label: "Invitation Status",
          field: "invitationStatus",
          sort: "asc",
          width: 70,
        },
      ],
      rows: this.props.passedApplicant,
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
        <MDBDataTable striped bordered hover data={data} />
        </div>
        </div>
      </div>
    )
  }
}

export default AppListDataTable
