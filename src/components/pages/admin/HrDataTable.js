import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Loadable from "react-loadable";
import jsPDF from "jspdf"
import "jspdf-autotable"
import { AutoComplete, Drawer, Form, Button, Col, Radio, Row, Input, Select, DatePicker, Badge, Switch, Table, Space, Collapse, Tooltip, List, Comment, message, Upload, Modal } from "antd";

class HrDataTable extends Component {
  state = {
    myData: { name: "Okoro", rank: "Accountant" },
  }


  exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "landscape" // portrait or landscape

    const marginLeft = 20

    if(typeof window !== "undefined"){
      const doc = new jsPDF(orientation, unit, size)

      doc.setFontSize(15)

      const nau = "NNAMDI AZIKIWE UNIVERSITY";
      // const logg = logobg;
      const title = ""
      const headers = [
        [
          "SN",
          "USERNAME",

          "STAFF NUMBER",
          "STAFF NAME",
          "STAFF TYPE",
          "STAFF CATEGORY",
          "RANK",

          "DEPARTMENT",
          // "application score",
        ],
      ]

      const data = this.props.passedStaffData.map(d => [
        d.sn,
        d.username,
        d.staffIdentityNumber,
        d.name,
        d.staffType,
        d.staffCategory,
        d.rank,
        d.department,
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
      doc.save("Staff List.pdf")
    }
  }

  componentDidMount() {
    
  }
  render() {
    require("../../../assets/memo-int.css");
      const {staffList} = this.props.passedStaffData;
      console.log(staffList, "ll")
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
          field: "userName",
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
          label: "Biometric ID",
          field: "biometric_number",
          sort: "asc",
          width: 150,
        },
        {
          label: "Staff Fullname",
          field: "staffFullName",
          sort: "asc",
          width: 100,
        },
        {
          label: "Appointment Type",
          field: "appointment_type",
          sort: "asc",
          width: 100,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 150,
        },
        {
          label: "Phone",
          field: "phone",
          sort: "asc",
          width: 150,
        },
        {
          label: "Date of Birth",
          field: "staff_dob",
          sort: "asc",
          width: 270,
        },
        {
          label: "State",
          field: "state",
          sort: "asc",
          width: 270,
        },
        {
          label: "LGA",
          field: "lga",
          sort: "asc",
          width: 270,
        },
        {
          label: "Date of Employment",
          field: "date_of_employment",
          sort: "asc",
          width: 270,
        },
        {
          label: "Date of Retirement",
          field: "date_of_retirement",
          sort: "asc",
          width: 270,
        },
        {
          label: "Staff Type",
          field: "staff_type",
          sort: "asc",
          width: 270,
        },
        {
          label: "Staff Category",
          field: "staffCategory",
          sort: "asc",
          width: 270,
        },
        // {
        //   label: "Educational Qualifications",
        //   field: "qualificationName",
        //   sort: "asc",
        //   width: 270,
        // },
       
        {
          label: "Salary Category",
          field: "salaryCategory",
          sort: "asc",
          width: 150,
        },
        {
          label: "Rank",
          field: "rank",
          sort: "asc",
          width: 150,
        },
        {
          label: "PFA Name",
          field: "pfaName",
          sort: "asc",
          width: 270,
        },

        {
          label: "Area of Specialization",
          field: "areaOfSpecialization",
          sort: "asc",
          width: 270,
        },
       
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 100,
        },

      ],
      rows: this.props.passedStaffData,
    }
    return (
        <>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive sofia">
          <span className="text-sm">Export as: </span>
          <button className="btn btn-sm btn-outline-success" onClick={() => this.setState({isPreview:true})}>Excel</button>
            {/* <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-sm btn-outline-success"
              table={"tblCustomers"}
              filename="Staff List"
              sheet="Staff List"
              buttonText="excel"
            /> */}
            <button className="btn btn-sm btn-primary" disabled onClick={() => this.exportPDF()}>pdf</button>
            <hr className="my-3" />
            <MDBDataTableV5 striped hover data={data} searchTop searchBottom={false} id="tblCustomers"/>
          </div>
        </div>
      </div>

      <Modal
                    title="Staff List Excel Export"
                    // centered
                    visible={this.state.isPreview}
                    style={{ top: 20 }}
                    // onOk={() => setVisible(false)}
                    onCancel={() => this.setState({ isPreview: false })}
                    
                    width={1000}
                >
                   <div className="">
                <div className="py-4">
              
                      <div className="card">
                       
                        <div className="card-body">
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-sm btn-success"
                            table={"staffUploads"}
                            filename="Staff List"
                            sheet="Staff List"
                            buttonText="Export"
                          />
                         
                        </div>
                        <div className="card-body">
                          <div
                            className="table-responsive"
                            style={{ height: "600px" }}
                          >
                            <table
                              className="table table-striped sofia"
                              id="staffUploads"
                            >
                              <thead
                                style={{
                                  position: "sticky",
                                  top: "0",
                                  zIndex: "999999",
                                  backgroundColor: "white",
                                }}
                              >
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  S/N
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Username
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Staff Number
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Biometric ID
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Staff Name
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Appointment Type
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Department
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Email
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Phone
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Date of Birth
                                </th>
                                {/* <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  State
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  LGA
                                </th> */}
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Date of Employment
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Date of Retirement
                                </th>
                                {/* <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Educationa Qualificaions
                                </th> */}
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Staff Type
                                </th>
                                {/* <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Staff Category
                                </th> */}
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Salary Category
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Rank
                                </th>
                                {/* <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  PFA Name
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Area of Specialization
                                </th>
                                <th
                                  className="sticky-top"
                                  style={{ backgroundColor: "white" }}
                                >
                                  Action
                                </th> */}
                              </thead>

                              <tbody>
                                {this.props.passedStaffData &&
                                  this.props.passedStaffData.map((i, a) => {
                                    return (
                                      <tr>
                                        <td>{a + 1}</td>
                                        <td>{i.userName}</td>
                                        <td>{i.staffIdentityNumber}</td>
                                        <td>{i.biometricNumber}</td>
                                        <td>{i.staffFullName}</td>
                                        <td>{i.appointment_type}</td>
                                        <td>{i.staff_department}</td>
                                        <td>{i.email || " - "}</td>
                                        <td>{i.phone}</td>
                                        <td>
                                          {i.staffDOB == null
                                            ? "-"
                                            : i.staffDOB.slice(0, 10)}
                                        </td>
                                        {/* <td>{i.state}</td> */}
                                        {/* <td>{i.lga}</td> */}
                                        <td>
                                          {i.dateOfEmployment == null
                                            ? "-"
                                            : i.dateOfEmployment.slice(0, 10)}
                                        </td>
                                        <td>
                                          {i.dateOfRetirement == null
                                            ? " - "
                                            : i.dateOfRetirement.slice(0, 10)}
                                        </td>
                                        {/* <td>
                                          {i.personEducations.map((a) => {
                                            return (
                                              <>
                                                <p style={{ fontSize: "12px" }}>
                                                  {a.qualificationName} -{" "}
                                                  {a.year}
                                                </p>
                                              </>
                                            );
                                          })}
                                        </td> */}
                                        <td>{i.staffType}</td>
                                        {/* <td>{i.staffCategory}</td> */}
                                        <td>{i.salaryCategory}</td>
                                        <td>{i.rank}</td>
                                        {/* <td> - </td>
                                        <td> - </td> */}
                                       
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                   
                </div>
              </div>
         
                </Modal>

   
            

      </>
    )
  }
}

export default HrDataTable
