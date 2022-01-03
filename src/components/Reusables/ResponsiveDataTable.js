import { React, Component } from "react";
import { Table } from "antd";

const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "Name", dataIndex: "fullname", key: "fullname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Status", dataIndex: "status", key: "status" },
  
];

const data = [
    {
        key: 1,
        id: "ADM221-10",
        collection: "School of health fees",
        department: "Admin",
        pending: "0.00",
        total: "₦ 2,250.000",
        status: (
            <div>
                {/* <img src={badge} /> */}
            </div>
        ),
        description: (
            <div className="container">
                <div className="row" style={{ paddingTop: "10px" }}>
                    <div className="col-sm-6">
                        <p className="manrope-text" style={{ fontSize: "20px" }}>
                            School of health fees
                        </p>
                        <p className="manrope-text-light" style={{ fontSize: "14px", color: "#84818A", marginTop: "-20px" }}>
                            Your payment status for this month is payed for <span style={{ color: "#FFA043" }}>65%</span>
                        </p>
                    </div>

                    <div className="col-sm-2">
                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                            NO OF STUDENTS
                        </p>
                        <p className="manrope-text drk-text" style={{ fontSize: "20px", color: "#84818A", marginTop: "-10px" }}>
                            5632
                        </p>
                    </div>
                    <div className="col-sm-2">
                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                            TOTAL INFLOW
                        </p>
                        <p className="manrope-text drk-text" style={{ fontSize: "20px", color: "#84818A", marginTop: "-10px" }}>
                            ₦120,630
                        </p>
                    </div>
                    <div className="col-sm-2">
                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                            EXPECTED INFLOW
                        </p>
                        <p className="manrope-text drk-text" style={{ fontSize: "20px", color: "#84818A", marginTop: "-10px" }}>
                            ₦560,630
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
   
];

export default class ResponsiveDataTable extends Component{
    state = {

    }
    componentDidMount(){

    }



    render() {
        return(
            <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={this.state.allVendors}
            className="manrope-text table-responsive"
        />
        )
          }
}