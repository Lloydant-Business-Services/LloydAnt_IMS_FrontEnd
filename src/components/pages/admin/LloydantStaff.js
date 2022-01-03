import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
import _ from "lodash";
import { Fade } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import { HOD, Dean, Vice_Chancellor, _Declined, Wave_Three, _statCodeOne, _statCodeZ, _statCodeTwo, Roles } from "../../Barn";
import NotificationCard from "../../Reusables/NotificationCard";
// import ResponsiveDataTable from "../../Reusables/ResponsiveDataTable";
import { Table, Modal } from "antd";

const columns = [
  { title: "SN", dataIndex: "key", key: "key" },
  { title: "Document Proprietor", dataIndex: "docprop", key: "docprop" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "Status", dataIndex: "status", key: "status" },

];

const data = [
  {
      key: 1,
      docprop: "Federal Polytechnic Nekede",
      email: "miracleoghenemado@lloydant.com",
      phone: "08023454543",
      pending: "0.00",
      total: "₦ 2,250.000",
      status: (
          <div>
              <span className="badge badge-success">Active</span>
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

  {
    key: 2,
    docprop: "Abia State Polytechnic",
    email: "miracleoghenemado@lloydant.com",
    phone: "08023454543",
    pending: "0.00",
    total: "₦ 2,250.000",
    status: (
        <div>
            <span className="badge badge-success">Active</span>
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

export default class LloydantUsers extends React.Component {
  state = {
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    staffRoleId: JSON.parse(localStorage.getItem("DTO")),
    payLoad: JSON.parse(localStorage.getItem("userData")),



    conRequests: [],
    leaveRequest: {
      leaveId: 0,
      staffId: 0,
      startDate: null,
      endDate: null,
      reason: "",
      attachmentUrl: "",
      remarks: "",
      id: 0,
      progressBar: null
    },
  };

  updateItem = (index, value) => {
    const { leaveRequest } = this.state;
    leaveRequest[index] = value;
    this.setState({ ...this.state, leaveRequest });
  };

  updateChekcbox = () => {
    const { leaveRequest } = this.state;
    leaveRequest.approved = !leaveRequest.approved;
    this.setState({ ...this.state, leaveRequest });
  };

  loadRequests = () => {
    fetchData("/ChangeOfName/GetRequestsByAdmin", (data) => {
      this.setState({ conRequests: _.reverse(data) });
    });
  };

  getInstDept = () => {
    fetchData(
      `/InstitutionDepartments/${this.state.staffPayLoad?.departmentId}`,
      (data) => {
        console.log(data, "Dept!!");
        this.setState({
          departmentName: data.name,
        });
      }
    );
  };



  getconRequestsByRole = () => {
      fetchData(`/LeaveRequestManagement/GetconRequestsByRole?departmentId=${this.state.staffPayLoad?.departmentId}&roleId=${this.state.payLoad?.roleId}`, (data) => {
          console.log(data, "Fusion")
          this.setState({
              newCONrequests:data
          })
      })
  }

  componentDidMount() {
    let verification = JSON.parse(localStorage.getItem("userData"));

    if (!localStorage.getItem("userData")) {
      this.setState({
        userRedirect: true,
      });
    }
    else if (verification.roleId != Roles.SuperAdmin && verification.roleId != Roles.Personnel) {
      alert("Unauthorized Access")
      localStorage.clear();
      this.setState({
        userRedirect: true,
      });
    }
 
//     if(this.state.newCONrequests.progress == 1){
//   this.setState({progressBar:33.4}) 
//  } 
    console.log(this.state.staffPayLoad, "Staff PAyload");
    this.getconRequestsByRole();
    this.getInstDept();
    this.loadRequests();


  }

  setSelectedData = (data) => {
    let { leaveRequest } = this.state;
    leaveRequest = data;
    this.setState({ ...this.state, leaveRequest });
  };

  isValidInputs = () => {
    return true;
  };

  submitForm = () => {
    if (this.isValidInputs()) {
      const { leaveRequest } = this.state;
      if (leaveRequest.approved) {
        const id = this.props.user.userId;
        leaveRequest.approvedById = parseInt(id);
      }

      editData(
        `/LeaveRequest/${this.state.leaveRequest.id}`,
        leaveRequest,
        (data) => {
          this.loadRequests();
        }
      );
    }
  };

  _calculateDuration = (startDate, endDate) => {
    // To set two dates to two variables
    const _start = new Date(startDate);
    const _end = new Date(endDate);

    // To calculate the time difference of two dates
    const Difference_In_Time = _end.getTime() - _start.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  };

  render() {
    require("antd/dist/antd.css")

    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <div className="content__inner">
          <Modal title="Add Document Propietor" visible={this.state.modalPropietor} onOk={this.handleOk} onCancel={() => this.setState({modalPropietor:false})}>
        <div className="form-group">
            <label className="control-label">Propietor Name</label>
            <input className="form-control" type="text"/>

        </div>
        
      </Modal>
        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-md-12">
                <h6 className="h1 d-inline-block mb-0  mobile__font__header">
                Organization Staff{" "}
                  <span className="h3 mobile__font__size sofia">/View/Manage</span>
                </h6>
              </div>
              {/* <div className="col-lg-6 col-md-12 text-right">
                <a className="sofia" href="#" onClick={() => this.setState({modalPropietor:true})}><i className="fa fa-plus-square-o"/> &nbsp; Add a Document Propietor</a>
              </div> */}
              <div className="col-lg-6 col-5 text-right"></div>
            </div>
            {/* Card stats */}
            <div className="row">
              <hr className="mx-0" />
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="card-title mb-0 float-left mr-3 sofia mobile__font__header">
                          Staff List{" "}
                          {/* <b>{_.upperCase(this.state.departmentName)}</b> */}
                        </h3>
                      </div>
                    </div>
                  </div>



                  {/* <ResponsiveDataTable/> */}
 


                  <Table
            columns={columns}
            // expandable={{
            //     expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
            //     rowExpandable: (record) => record.name !== "Not Expandable",
            // }}
            dataSource={data}
            className="manrope-text table-responsive"
        />


                  {/* <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table__responsive">
                        <thead>
                          <tr>
                            <th>S/No</th>
                            <th>Staff Number</th>
                            <th>Staff Name</th>
                            <th>Date of Submission</th>
                            <th>Status</th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.conRequests &&
                            this.state.conRequests.map((a, i) => (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{a.staffNumber}</td>
                                <td>{_.upperCase(a.surname)} {_.upperCase(a.firstname)} {_.upperCase(a.othername)}</td>
                                <td>{a.dateOfRequest.substring(0, 10)}</td>
                                <td>
                              
                                 
                                {a.isApproved && a.isClosed ? <span class="badge badge-success">Approved</span> : 
                                      !a.isApproved  && !a.isClosed ? <span class="badge badge-warning new-badge">New</span> :
                                      !a.isApproved  && a.isClosed ? <span class="badge badge-danger">Declined</span> 
                                      
                                      : null}
                          
                          
                          
                                  
                                </td>
                                <td>
                                  <Link
                                    to={{
                                      pathname: "/ChangeOfNameLetter",
                                      state: {
                                        data:a,
                                      },
                                    }}
                                    className="btn btn-info btn-sm"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}
