import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"

class SalaryTable extends Component {
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
          label: "Salary Grade Category",
          field: "sgc",
          sort: "asc",
          width: 100,
        },
        {
          label: "Salary Level",
          field: "sl",
          sort: "asc",
          width: 100,
        },
        
        {
          label: "Salary Step",
          field: "ss",
          sort: "asc",
          width: 100,
        },

       

          {
            label: "Amount",
            field: "amt",
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
      rows: this.props.data,
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

export default SalaryTable;
