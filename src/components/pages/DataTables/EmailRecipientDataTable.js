import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"

class EmailRecipientDataTable extends Component {
  state = {
    myData: { name: "Oko", rank: "Accountant" },
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
          label: "Firstname",
          field: "firstname",
          sort: "asc",
          width: 100,
        },
        
        {
          label: "Lastname",
          field: "lastname",
          sort: "asc",
          width: 100,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 100,
        },
        {
          label: "Position",
          field: "jobVacancyName",
          sort: "asc",
          width: 100,
        },
        {
            label: "Resend Link",
            field: "action",
            sort: "asc",
            width: 100,
          },
      ],
      rows: this.props.passedDept,
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <MDBDataTableV5 striped bordered hover data={data} searchTop searchBottom={false} />
          </div>
        </div>
      </div>
    )
  }
}

export default EmailRecipientDataTable;
