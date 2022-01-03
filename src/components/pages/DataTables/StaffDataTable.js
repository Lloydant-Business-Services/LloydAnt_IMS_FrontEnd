import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"

class TemporalStaffDataTable extends Component {
  state = {
    myData: { name: "Okoro", rank: "Accountant" },
  }

  componentDidMount() {
    // ajax
    //   .get("http://97.74.6.243/portal_dev/api/Country")
    //   .end((error, response) => {
    //     if (!error && response) {
    //       this.setState({
    //         Country: response.body,
    //       })
    //     } else {
    //       console.log("There was an error fetching from list", error)
    //     }
    //     console.log(this.state.Country)
    //     console.log("i have no idea")
    // //   })
    // setTimeout(() => {
    //   console.log(this.props.passedStaffData)
    //   console.table(this.props.passedStaffData)
    //   console.log(...this.props.passedStaffData)
    // }, 6000)
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
          label: "Staff ID",
          field: "staffIdentityNumber",
          sort: "asc",
          width: 150,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 270,
        },
        // {
        //   label: "D.O.B",
        //   field: "dob",
        //   sort: "asc",
        //   width: 200,
        // },
        {
          label: "Rank",
          field: "rank",
          sort: "asc",
          width: 150,
        },
        {
          label: "Department",
          field: "department",
          sort: "asc",
          width: 100,
        },
        // {
        //   label: "Action",
        //   field: "action",
        //   sort: "asc",
        //   width: 100,
        // },
        {
          label: "Action",
          field: "action2",
          sort: "asc",
          width: 100,
        },
      ],
      rows: this.props.passedStaffData,
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <MDBDataTableV5 striped hover data={data} searchTop searchBottom={false} />
          </div>
        </div>
      </div>
    )
  }
}

export default TemporalStaffDataTable
