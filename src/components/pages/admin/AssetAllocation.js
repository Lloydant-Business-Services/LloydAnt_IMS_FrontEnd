import React from "react";
import { fetchData, postData, editData, deleteData } from "../../../utils/crud";
import _ from "lodash";
import { Fade } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import { HOD, Dean, Vice_Chancellor, _Declined, Wave_Three, _statCodeOne, _statCodeZ, _statCodeTwo, Roles } from "../../Barn";
import NotificationCard from "../../Reusables/NotificationCard";
// import ResponsiveDataTable from "../../Reusables/ResponsiveDataTable";
import { Table, Modal, Drawer, List, Avatar, Divider, Col, Row, Collapse } from "antd";
import { enquireScreen } from 'enquire-js';
const { Panel } = Collapse;
const columns = [
  { title: "SN", dataIndex: "key", key: "key" },
  { title: "Staff Name", dataIndex: "fullname", key: "fullname" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
//   { title: "Status", dataIndex: "status", key: "status" },
  { title: "Details", dataIndex: "view", key: "view" },

];

const data = [
  {
      key: 1,
      fullname: "O. Miracle Godspeed",
      email: "miracleoghenemado@lloydant.com",
      phone: "08023454543",
      status: (
          <div>
              <span className="badge badge-success">Active</span>
          </div>
      ),
      view: (
        <div>
            <a className="" href="#">view details <i className="fa fa-eye"/></a>
        </div>
    )
      
  },

  {
    key: 2,
    fullname: "Ogude Adanna",
    email: "miracleoghenemado@lloydant.com",
    phone: "08023454543",
    status: (
        <div>
            <span className="badge badge-success">Active</span>
        </div>
    ), 
    view: (
        <div>
            <a className="" href="#">view details <i className="fa fa-eye"/></a>
        </div>
    )
    
},
 
];
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
export default class AssetAllocation extends React.Component {
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
    enquireScreen((b) => {
        this.setState({
          isMobile: b,
        });
      });
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
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    require("antd/dist/antd.css")

    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <div className="content__inner">
         
         <Drawer
          width={this.state.isMobile ? 320 : 640}
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p className="site-description-item-profile-p" style={{ marginBottom: 24, fontWeight:'500' }}>
            Personal Profile
          </p>
          {/* <p className="site-description-item-profile-p">Personal</p> */}
          <Row>
            <Col span={12}>
              <label>Fullname</label>
              <p>Oghenechavwuko Miracle Godspeed</p>
            </Col>
            <Col span={12}>
            <label>Email address</label>
              <p>miracleoghenemado@gmail.com</p>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={12}>
            <label>Date of birth</label>
              <p>07-07-1888</p>
            </Col>
            <Col span={12}>
            <label>Phone</label>
              <p>09084747474</p>
            </Col>
          </Row>
         
          <Divider />
          <p className="site-description-item-profile-p" style={{fontWeight:'500'}}>Company Profile</p>
          <br/>
          <Row>
            <Col span={12}>
            <label>Unit/Department</label>
              <p>Software</p>
            </Col>
            <Col span={12}>
            <label>Designation</label>
              <p>Backend Developer</p>
            </Col>
          </Row>
        
          
          {/* <Divider />
          <p className="site-description-item-profile-p">Assets in Possesion</p> */}
          <br/>
        <div style={{maxHeight:'400px',  overflowY:'scroll'}}>
          <Collapse accordion defaultActiveKey={"1"}>
    <Panel header={<small>Company Asset(s)</small>} key="1">
    <p><label>1.</label> &nbsp; MacBook Pro 2021(IMEI4362782134323)</p>
    <p><label>1.</label> &nbsp; MacBook Pro 2021(IMEI4362782134323)</p>
    <p><label>1.</label> &nbsp; MacBook Pro 2021(IMEI4362782134323)</p>

        
    
    <Divider />

    
    </Panel>
   
  </Collapse>
  </div>
        </Drawer>
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
                Asset Allocation{" "}
                  <span className="h3 mobile__font__size sofia">/View/Allocate Assets</span>
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
                          Staff Asset Allocation List{" "}
                          {/* <b>{_.upperCase(this.state.departmentName)}</b> */}
                        </h3>
                      </div>
                    </div>
                  </div>



                  {/* <ResponsiveDataTable/> */}
 
                  <List
          dataSource={[
            {
              name: 'O. Godspeed Miracle',
            },
            {
              name: 'Benjamin White',
            },
          ]}
          bordered
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <a onClick={this.showDrawer} key={`a-${item.id}`}>
                  View Profile
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                }
                title={<a href="https://ant.design/index-cn">{item.name}</a>}
                description="Software"
              />
            </List.Item>
          )}
        />

                  {/* <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={data}
            className="manrope-text table-responsive"
        /> */}


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
