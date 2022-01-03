import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"

class RankDataTable extends Component {
  state = {
    myData: { name: "Oko", rank: "Accountant" },
  }

  componentDidMount() {
        console.log(this.props.passedDept, "mmmm")
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
            label: "Cadre Name",
            field: "cadre",
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

export default RankDataTable;
