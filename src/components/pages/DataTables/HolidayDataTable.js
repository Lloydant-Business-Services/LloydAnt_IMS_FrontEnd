import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"

class CommonDataTable extends Component {
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
          label: "Name",
          field: "name",
          sort: "asc",
          width: 100,
        },
        {
            label: "Date",
            field: "date",
            sort: "asc",
            width: 100,
          },
        {
          label: "Action",
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

export default CommonDataTable;
