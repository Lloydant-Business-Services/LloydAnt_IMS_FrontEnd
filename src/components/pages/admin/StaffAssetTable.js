import React, { Component } from "react"
import { MDBDataTable } from "mdbreact"

class StaffAssetTable extends Component {
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
          width: 150,
        },
        {
          label: "Asset Type",
          field: "assetType",
          sort: "asc",
          width: 270,
        },
        {
          label: "Asset Name",
          field: "assetName",
          sort: "asc",
          width: 200,
        },
        {
          label: "Serial Number",
          field: "serialNumber",
          sort: "asc",
          width: 150,
        },
        {
          label: "Asset Code",
          field: "assetCode",
          sort: "asc",
          width: 100,
        },

        {
          label: "Staff Name",
          field: "staffName",
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
      rows: this.props.passedAssets,
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

export default StaffAssetTable
