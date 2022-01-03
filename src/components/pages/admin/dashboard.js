import React from "react";
import {
  fetchData,
  postData,
  editData,
  deleteData,
  URL,
  fetchDataWithoutToken,
} from "../../../utils/crud";
// import { Link } from "gatsby"
import _ from "lodash";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
// import { Fade } from "reactstrap";
import { Roles, StatusCodes } from "../../Barn";
import Spinner from "./Spinner";
import "../../../assets/css/msg.css";
import newLogo from "../../../images/logobg.png";
import profile_pic from "../../../images/avr1.png";
import sig from "../../../images/signa.png";
import $ from "jquery";
import { calenderTrigger } from "../../../utils/calenderNew";
import { makeBold } from "../../../utils/textEditor";
// import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { enquireScreen } from 'enquire-js';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import SweetAlert from "react-bootstrap-sweetalert";
import { Statistic, Card, AutoComplete, Drawer, Form, Button, Col, Radio, Row, Input, Select, DatePicker, Badge, Switch, Table, Space, Collapse, Tooltip, List, Comment, message, Upload } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";


// import {Modal} from 'react-bootstrap'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Calendar } from 'antd';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

export default class Dashboard extends React.Component {
  state = {
    allStaff: [],
    attendance: [],
    broadcasts: [],
    leaveRequests: [],
    trainingRequest: [],
    events: [],
    allVacancy: [],
    payLoad: JSON.parse(localStorage.getItem("userData")),
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    departmentName: "...",
    all_staff: true,
    dept_staff: true,
    proposeArr: [0],
    inboxMailingCount:0
    // memoOpen:true
    // spin:true
  };

  getInstDept = () => {
    fetchDataWithoutToken(
      `/InstitutionDepartments/${this.state.staffPayLoad?.departmentId}`,
      (data) => {
        console.log(data, "Dept!!");
        this.setState({
          departmentName: data.name,
        });
      }
    );
  };

  loadStats = () => {
    //fetch staff
    // this.loadStaff()
    // this.loadNews()
    // this.loadLeaveRequest()
    // this.loadTrainingRequests()
    // this.loadEvents()
    // this.loadJobOpening()
  };
  GetRoleMailing = () => {
    this.setState({ spin: true, click_status: 1, box_loader:true, sentMailing:[] });
    fetchData(`/Mailing/GetNewMailCount?RoleId=${this.state.payLoad?.roleId}&DeptId=${this.state.staffPayLoad?.department?.id || 0}&FacultyId=${this.state.staffPayLoad?.department?.facultyId || 0}`, (data) => {
        //this.setState({box_loader:false})
        
         this.setState({ inboxMailingCount: data});
        
    });
};
  changeText = (event) => {
    const target = event.target;
    const value = target.type == "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  makeBold = () => {
    document.execCommand("bold");
    if (document.getElementById("bold").isToggled) {
      document.getElementById("bold").style.backgroundColor = "#00cc55";
      document.getElementById("bold").isToggled = false;
    } else {
      document.getElementById("bold").style.backgroundColor = "#008833";
      document.getElementById("bold").isToggled = true;
    }
  };

  makeItalic = () => {
    document.execCommand("italic");
    if (document.getElementById("italic").isToggled) {
      document.getElementById("italic").style.backgroundColor = "#00cc55";
      document.getElementById("italic").isToggled = false;
    } else {
      document.getElementById("italic").style.backgroundColor = "#008833";
      document.getElementById("italic").isToggled = true;
    }
  };

  doUnderline = () => {
    document.execCommand("underline");
    if (document.getElementById("underline").isToggled) {
      document.getElementById("underline").style.backgroundColor = "#00cc55";
      document.getElementById("underline").isToggled = false;
    } else {
      document.getElementById("underline").style.backgroundColor = "#008833";
      document.getElementById("underline").isToggled = true;
    }
  };

  doAddImage = () => {
    var image_url = prompt("Image URL:");
    if (image_url != "") {
      document.execCommand("insertImage", false, image_url);
    } else {
      alert("You must set a URL!");
    }
  };

  justifyLeft = () => {
    document.execCommand("justifyLeft");
  };

  justifyCenter = () => {
    document.execCommand("justifyCenter");
  };

  justifyRight = () => {
    document.execCommand("justifyRight");
  };

  doSetTextColor = () => {
    var text_color = prompt("CSS Color:");
    if (text_color != "") {
      document.execCommand("foreColor", false, text_color);
    } else {
      alert("You must set a Color!");
    }
  };

  reloadStaff = () => {
    fetchDataWithoutToken(`/Staff/${this.state.payLoad.staffId}`, (data) => {
      console.log(data, "Reload");
      this.setState({staffDash: data})
      localStorage.setItem("DTO", JSON.stringify(data.id));
      localStorage.setItem("DTOFULL", JSON.stringify(data));
    });
  };

  loadEvents = () => {
    fetchDataWithoutToken("/Events", (data) => {
      console.log(data, "Events");
      this.setState({ events: data });
    });
  };

  loadTrainingRequests = () => {
    fetchDataWithoutToken(`/TrainingRequest`, (data) => {
      this.setState({ trainingRequest: data });
    });
  };

  loadLeaveRequest = () => {
    fetchDataWithoutToken("/LeaveRequest", (data) => {
      this.setState({ leaveRequests: _.reverse(data) });
    });
  };

  loadStaff = () => {
    fetchDataWithoutToken("/Staff", (data) => {
      this.setState({ allStaff: data });
    });
  };
  loadRoles = () => {
    fetchDataWithoutToken("/Roles", (data) => {
      this.setState({ mappedRoles: data });
    });
  };
  loadJobOpening = () => {
    fetchDataWithoutToken("/JobVacancy", (data) => {
      this.setState({ allVacancy: data });
    });
  };

  loadAttendance = () => {
    fetchDataWithoutToken("/Attendance/AttendanceByMonth", (data) => {
      this.setState({ attendance: data });
    });
  };
  loadMemo = () => {
    fetchDataWithoutToken(
      `/InstituitionMemorandumTarget/GetMemorandumByRoleId?userId=${this.state.payLoad?.id}`,
      (data) => {
        console.log(data, "Data Memo");
        this.setState({ memoData: data });
      }
    );
    console.log(this.state.memoData, "Memo");
  };
  loadNews = () => {
    const currentState = this;
    const AuthStr = "Bearer ".concat(this.state.payLoad.token);

    axios
      .get(URL + "/Broadcasts", {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then((response) => {
        console.log(response.data, "Broad!!!!!!");
        currentState.setState({
          broadcasts: response.data,
        });
      });
  };
  deleteo = () => {
    delete this.state.Test.key2;
    this.componentDidMount();
    setTimeout(() => {
      console.log(this.state.Test, "After!!");
    }, 3000);
  };

  countStaff = () => {
    this.setState({ spin: true });
    fetchDataWithoutToken("/Staff/StaffCounter", (data) => {
      this.setState({ totalStaff: data });
      console.log(data, "Count!!");
      this.loadStaff();
      this.GetRoleMailing();
      this.loadNews();
      this.loadLeaveRequest();
      this.loadTrainingRequests();
      this.loadEvents();
      this.loadJobOpening();
      this.loadMemo();
      this.loadRoles();
      this.setState({ spin: false });
    });
  };

  openMemoModal = (memo) => {
    this.setState({
      viewMemo: true,
      memoBody: memo.body,
      memoRole: memo.roleName,
      memoTitle: memo.title,
      memoAttachment:memo.attachmentUrl,
      roleName:memo.roleName
    });
  };

  componentDidMount() {
    enquireScreen((b) => {
        this.setState({
          isMobile: b,
        });
      });
    $("#memo-btn").click(function () {
      // $("#memo-btn").hide();
      $("#memo-mgt").toggle(200);
    });
    $("#hide-memo").click(function () {
      // $("#memo-btn").show(600);
      $("#memo-mgt").hide();
    });
    this.countStaff();
    this.countMemoReq();

    fetchDataWithoutToken("/LeaveRequestManagement/RequestCount", (data) => {
      this.setState({
        leaveRequestCount: data,
      });
    });

    if (
      this.state.payLoad.roleId == 7 &&
      this.state.staffPayLoad?.departmentId != null
    ) {
      this.getInstDept();
    }

    this.reloadStaff();

    var sampleObject = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
      key4: "value4",
    };
    this.setState({
      Test: sampleObject,
    });
    setTimeout(() => {
      // console.log(this.state.Test, "Sample State")
    }, 2000);
    // console.log(sampleObject, "Sample")
    // console.log(this.state.payLoad, "Callback!!!")

    // this.loadStats()
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(this.state.editorState);
  };
  showState = (html) => {
    this.setState({ editorHtml: html });
    console.log(this.state.editorHtml);
  };
  toggleMemoSelector = () => {
    //document.getElementById("allStaff").checked = false;

    if (!this.state.all_staff) {
      this.setState({ all_staff: true, proposeArr: [0] });
    } else {
      this.setState({ all_staff: false, proposeArr: [] });
    }
  };

  toggleDeptMemoSelector = () => {
    //document.getElementById("allStaff").checked = false;

    if (!this.state.dept_staff) {
      this.setState({ dept_staff: true, proposeArr: [0] });
    } else {
      this.setState({ dept_staff: false, proposeArr: [] });
    }
  };

  postMemoData = (e) => {
    e.preventDefault();
    let _this = this;
    if(this.state.formTitle == null || this.state.refNumber == null || this.state.formBody == null){
      this.setState({err_pop:true})
      return false
    }
    this.setState({saving:true})

    let formData = new FormData();
    formData.append("Title", this.state.formTitle);
    formData.append("RefNo", this.state.refNumber);
    formData.append("Body", this.state.formBody);
    formData.append("DatePosted", "2021-01-01");
    formData.append("UserId", this.state.payLoad.id);
    formData.append("DepartmentId", this.state.staffPayLoad?.department?.id);
    formData.append("FacultyId", 0);
    formData.append("RoleIds", this.state.proposeArr.length > 0 ? this.state.proposeArr : []);
    formData.append("Active", true);
    formData.append("Attachment", this.state.file);
    formData.append("Id", 0);

    axios({
      method: "post",
      url: URL + "/InstituitionMemorandum/AddMemorandum",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if (response.data == StatusCodes.Created) {
          _this.setState({
            memoOpen:false,
            saving:false,
            succ_pop:true
          })
          // _this.setState({succ_pop:true})
         _this.loadMemo();
        } 
        else if (response.data == StatusCodes.NotAuthorized) {
          console.log(response);
        }
      })
      .catch(function (response) {
        console.log(response);
        console.log(formData);
      });
  };

  selectRole = (id) => {
    var check = this.state.proposeArr.includes(id);
    if (check) {
      var lists = this.state.proposeArr.filter((x) => {
        return x != id;
      });
      this.state.proposeArr = lists;
      console.log(this.state.proposeArr, "Propose");
    } else {
      this.state.proposeArr.push(id);
      console.log(`i just added ${id}`);
      console.log(this.state.proposeArr, "Propose");
    }
  };

  handleFileUpload = (e) => {
    e.preventDefault();
    let pHold = document.getElementById("progressHold");
    //let docPrev = document.getElementById("docPreview")
    pHold.style.display = "block";
    let pBar = document.getElementById("pb");
    pBar.style.width = "0%";

    pBar.innerHTML = "Uploading.....";

    setTimeout(() => {
      pBar.style.width = "100%";
      //docPrev.style.display = "block";
      pBar.innerHTML = "Attached Successfully !";
    }, 2000);

    // setTimeout(()=>{
    //   pHold.style.display = "none"
    //   pBar.style.width = "0%";

    // },6000)

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file, "file")

    reader.onloadend = () => {
      this.state.documentPreview = reader.result;
      this.setState({
        ...this.state,
        file: file,
        documentUploaded: reader.result,
      });
    };
    setTimeout(() => {
      console.log(this.state.file, "File");
      reader.readAsDataURL(file);
    }, 2000);
  };
  countMemoReq = () => {
    fetchData(`/InstituitionMemorandum/PendingMemoAction?roleId=${this.state.payLoad?.roleId}&departmentId=${this.state.staffPayLoad?.department?.id}`, data => {
      console.log(data, "mem count")
      this.setState({
        count_memo: data
      })
    })
  }
  render() {
    require("antd/dist/antd.css");
    let screen_width = $(window).width();
    const {isMobile} = this.state;
    //   const [editorState, setEditorState] = React.useState(() =>
    //   EditorState.createEmpty()
    // );

    // const editor = React.useRef(null);
    // function focusEditor() {
    //   editor.current.focus();
    // }

    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <div className="content__inner">
        {this.state.spin ? (
          <Spinner msg={"Setting up, Please wait..."} />
        ) : null}

{this.state.saving ? (
          <Spinner msg={" Please wait..."} style={{zIndex:'99999999'}}/>
        ) : null}

{this.state.succ_pop ? (
                    <SweetAlert success title="Saved!" onConfirm={() => this.setState({succ_pop:false})}>
                        Memo Successfully Published!
                    </SweetAlert>
                ) : null}

{this.state.err_pop ? (
                    <SweetAlert error title="Error!" onConfirm={() => this.setState({err_pop:false})}>
                        Important fields are not be left empty!
                    </SweetAlert>
                ) : null}
        <Fade>
          {/* <button onClick={this.deleteo}>Test</button> */}
          <div className="header-body">
              <br/>
            <div className="row align-items-center">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard</h6>
              </div>

              <div className="col-lg-6 col-5 text-right">
                <h4 className="mobile__font__size">
                  {this.state.payLoad?.roleId == Roles.Regularization
                    ? "Logged in as Regularization Officer"
                    : this.state.payLoad?.roleId == Roles.SuperAdmin
                    ? "Logged in as an Administrator"
                    : this.state.payLoad?.roleId == Roles.HOD
                    ? `Logged in as Head of Department ${_.upperCase(
                        this.state.departmentName
                      )}`
                      : this.state.payLoad?.roleId == Roles.DeputyRegistrar
                      ? `Logged in as DEPUTY REGISTRAR`
                    : null}
                </h4>
              </div>
            </div>
            {this.state.inboxMailingCount > 0 ? <div className="col-sm-12">
  <p>
    You have <span className="badge badge-danger">{this.state.inboxMailingCount}</span> new mail(s) <Link to="/Mailing_Memo"><b>Click Here</b></Link> to see
  </p>
</div> : null}

            {/* Card stats */}
            {this.state.payLoad?.roleId == Roles.SuperAdmin ||
            this.state.payLoad?.roleId == Roles.Regularization ||
            this.state.payLoad?.roleId == Roles.Dean ||
            this.state.payLoad?.roleId == Roles.Personnel ||
            this.state.payLoad?.roleId == Roles.VC ||
            this.state.payLoad?.roleId == Roles.HRAdmin ||
            (this.state.payLoad?.roleId == Roles.PersonnelDocumentation &&
              this.state.staffPayLoad?.departmentId == 133) ||
            (this.state.payLoad?.roleId == Roles.PersonnelSaps &&
              this.state.staffPayLoad?.departmentId == 133) ? (
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col pop-font">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Total Staff
                          </h5>
                          <span className="h1 font-weight-bold mb-0">
                            {this.state.totalStaff > 0
                              ? this.state.totalStaff
                              : "0"}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                            <i className="ni ni-single-02" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col pop-font">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Leave Request(s)
                          </h5>
                          <span className="h1 font-weight-bold mb-0">
                            {this.state.leaveRequestCount > 0
                              ? this.state.leaveRequestCount
                              : "0"}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                            <i className="ni ni-chart-pie-35" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col pop-font">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Training Request(s)
                          </h5>
                          <span className="h1 font-weight-bold mb-0">
                            {this.state.trainingRequest.length > 0
                              ? this.state.trainingRequest.length
                              : "0"}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                            <i className="ni ni-badge" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col pop-font">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Open Postion(s)
                          </h5>

                          <span className="h1 font-weight-bold mb-0">
                            {this.state.allVacancy.length > 0
                              ? this.state.allVacancy.length
                              : "0"}
                          </span>
                          {/* <span className="h1 font-weight-bold mb-0">0</span> */}
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                            <i className="ni ni-briefcase-24" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="row" style={{display:'none'}}>
            {screen_width < 700 ? <><div className="site-statistic-demo-card">
    <Row gutter={16} style={{marginTop:'20px', marginLeft:'8px', marginBottom:'10px'}}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Profile Completion"
            value={75}
            precision={1}
            valueStyle={{ color: '#3f8600' }}
            //prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title={"Hello!"}
            value={this.state.staffPayLoad?.person?.firstname}
            //precision={2}
            valueStyle={{ color: '#6666d2', fontSize:'12px' }}
            //prefix={<ArrowUpOutlined />}
            //suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
                
                </> : <> 
                
                <div className={"col-md-3"}>
                <aside
                  className="card profile-card"
                  style={{
                    borderTop: "2px solid rgb(131 141 190 / 44%)",
                    borderLeft: "2px solid rgb(131 141 190 / 44%)",
                    borderRight: "2px solid rgb(131 141 190 / 44%)",
                    height:'420px'
                  }}
                >
                  <header>
                    <img
                      alt="Image placeholder"
                      src={newLogo}
                      style={{ width: "50px" }}
                    />
                    <div className="profile-bio">
                      <h3 className="text-bold">
                        NNAMDI AZIKIWE UNIVERSITY
                      </h3>
                    </div>
                    <p>Staff E-Identity Card</p>
                    {/* here’s the avatar */}
                    <a href="#">
                      <img style={{height:'100px', width:'100px'}} src={this.state.staffDash?.person?.imageUrl != null ? this.state.staffDash?.person?.imageUrl : profile_pic} />
                    </a>
                    {/* the username */}
                    <h1 className="sofia">{this.state.staffPayLoad?.generatedStaffNumber}</h1>
                  </header>
                  <div className="profile-bio text-left sofia">
                    <p>
                      Name:{" "}
                      <b style={{ fontWeight: "bold", fontSize:'13px' }}>
                        {this.state.staffPayLoad?.person?.surname} {this.state.staffPayLoad?.person?.firstname}
                      </b>{" "}
                      <br />
                      Department:{" "}
                      <b style={{ fontWeight: "bold", fontSize:'13px'  }}>{this.state.staffPayLoad?.department?.name}</b> <br />
                      Rank: <b style={{ fontWeight: "bold", fontSize:'13px'  }}>{this.state.staffPayLoad?.rank?.name}</b>
                    </p>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "35px",
                      backgroundColor: "#57648d",
                      padding: "2px",
                      color: "#FFF",
                    }}
                    className="text-center sofia"
                  >
                    <h4
                      className="text-white"
                      style={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      {this.state.staffPayLoad?.person?.surname}
                    </h4>
                  </div>
                </aside>
                <button className="btn btn-success btn-sm" disabled>
                  Print ID <i className="fa fa-print" />
                </button>
              </div>
      
                </> }
              <div className="col-md-5">
                <div className="card">
                  {/* Card header */}
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "rgb(175, 202, 218)",
                      color: "white",
                    }}
                  >
                    {/* Title */}
                    <h2 className="mb-0 sofia" style={{ color: "white" }}>
                      Latest News
                    </h2>
                  </div>
                  {/* Card body */}
                  <div className="card-body">
                    <div
                      className="timeline timeline-one-side"
                      data-timeline-content="axis"
                      data-timeline-axis-style="dashed"
                    >
                      {this.state.broadcasts != null &&
                      this.state.broadcasts.length > 0
                        ? this.state.broadcasts.map((news, key) => {
                            return (
                              <div key={key} className="timeline-block">
                                <span className="timeline-step badge-success">
                                  <i className="ni ni-bell-55" />
                                </span>
                                <div className="timeline-content">
                                  <div className="d-flex justify-content-between pt-1">
                                    <div>
                                      <span className="h5 text-muted text-sm font-weight-bold">
                                        {news.subject}
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />
                                        {news.date.substring(0, 10)}
                                      </small>
                                    </div>
                                  </div>
                                  <h6 className="text-sm mt-1 mb-0">
                                    {news.details}
                                  </h6>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
             
             
              <div className="col-md-3">
                {/* <p>ghvjbknl</p> */}

                <div className="card">
                <div className="site-calendar-demo-card">
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>
               
                
                
                </div>
              
              
              </div>
            
             {/* Set Up Memo */}
             <Modal isOpen={this.state.memoOpen} style={{ maxWidth: "700px" }}>
                {/* <div className="modal-content mdal2"> */}
                <span
                  style={{
                    float: "right",
                    marginRight: "30px",
                    marginTop: "10px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={() => this.setState({ memoOpen: false })}
                >
                  x
                </span>

                <div className="row card-body">
                  <div className="col-md-12">
                    <div
                      className="modal-header border-bottom"
                      style={{ textAlign: "center" }}
                    >
                      <h2
                        className="mb-0"
                        id="exampleModalScrollableTitle"
                        style={{ textAlign: "center", width: "100%" }}
                      >
                        <div className="col-12 text-center">
                          <img src={newLogo} style={{ width: "50px" }} />
                        </div>
                        <b className="sofia">NNAMDI AZIKIWE UNIVERSITY</b>
                        <p>
                          <b>P.M.B. 5025</b>
                        </p>
                        <p style={{ marginTop: "-15px" }}>
                          <b>AWKA</b>
                        </p>
                        <b className="sofia">Internal Memorandum</b> <br/>
                        {this.state.payLoad?.roleId == Roles.HOD ? <b className="sofia">Department of {this.state.staffPayLoad?.department?.name}</b> : null}

                      </h2>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Ref No. <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="refNumber"
                        onChange={this.changeText}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Office <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="office"
                        value={this.state.payLoad?.roleId == Roles.SuperAdmin ? "Office Of The Vice Chancellor" : this.state.payLoad?.roleId == Roles.HOD ? "Office of the H.O.D" : this.state.payLoad?.roleId == Roles.DeputyRegistrar ? "Office of the Deputy Registrar" : this.state.payLoad?.roleId == Roles.Dean ? "Office of the Dean": this.state.payLoad?.roleId == Roles.Vice_Chancellor ? "Office of the Vice Chancellor" : null}
                        disabled
                        // onChange={(e) => {
                        //   this.setState({ firstName: e.target.value });
                        // }}
                      />
                    </div>
                  </div>


                  {/* {this.state.payLoad?.roleId == Roles.HOD ? <> 
                   */}
                 {this.state.payLoad?.roleId == Roles.HOD ? <div className="col-md-6">
                    <div className="form-group">
                      {/* <label
            htmlFor="example-text-input"
            className="form-control-label"
          >
            Send To <span className="text-danger">*</span>
          </label> */}
                      <label
                        htmlFor="example-text-input"
                        className="row form-control-label sofia"
                        style={{ marginLeft: "3px" }}
                      >
                        Send To All Department Staff? &nbsp;
                      </label>

                      <label
                        className="custom-toggle"
                        // onClick="showThisForm('publications')"
                      >
                        <input
                          type="checkbox"
                          checked={this.state.dept_staff}
                          id="allStaff"
                          //   value={this.state.show}
                          onChange={this.toggleDeptMemoSelector}
                        />
                        <span
                          className="custom-toggle-slider rounded-circle"
                          style={{ borderRadius: "34px !important" }}
                          data-label-off="No"
                          data-label-on="Yes"
                        />
                      </label>
                    </div>
                  </div> : null}
                  
                  
                  <div className="col-md-6">
                    <Fade>
                      {!this.state.dept_staff ? (
                        <AttentionSeeker effect={"shake"} duration={300}>
                          <div id="role-sec">
                            {this.state.mappedRoles &&
                              this.state.mappedRoles.map((r, i) => {
                                return (
                                  <div>
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        onClick={() => this.selectRole(r.id)}
                                        id={r.id}
                                      />
                                      <label
                                        class="form-check-label sofia"
                                        for="flexCheckDefault"
                                      >
                                        {r.name}
                                      </label>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </AttentionSeeker>
                      ) : null}
                    </Fade>
                  </div> 
                  {/* </> : null} */}
                  <div className="col-sm-12"></div>
                 
                  {this.state.payLoad?.roleId == Roles.DeputyRegistrar || this.state.payLoad?.roleId == Roles.SuperAdmin || this.state.payLoad?.roleId == Roles.Vice_Chancellor ? <> <div className="col-md-6">
                    <div className="form-group">
              
                      <label
                        htmlFor="example-text-input"
                        className="row form-control-label sofia"
                        style={{ marginLeft: "3px" }}
                      >
                        Send and Publish to all University Staff? &nbsp;
                      </label>

                      <label
                        className="custom-toggle"
                        // onClick="showThisForm('publications')"
                      >
                        <input
                          type="checkbox"
                          checked={this.state.all_staff}
                          id="allStaff"
                          //   value={this.state.show}
                          onChange={this.toggleMemoSelector}
                        />
                        <span
                          className="custom-toggle-slider rounded-circle"
                          style={{ borderRadius: "34px !important" }}
                          data-label-off="No"
                          data-label-on="Yes"
                        />
                      </label>
                    </div>
                  </div>
                  
                   </> : null}
                 
                   <div className="col-md-6">
                    <Fade>
                      {!this.state.all_staff ? (
                        <AttentionSeeker effect={"shake"} duration={300}>
                          <div id="role-sec">
                            {this.state.mappedRoles &&
                              this.state.mappedRoles.map((r, i) => {
                                return (
                                  <div>
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        onClick={() => this.selectRole(r.id)}
                                        id={r.id}
                                      />
                                      <label
                                        class="form-check-label sofia"
                                        for="flexCheckDefault"
                                      >
                                        {r.name}
                                      </label>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </AttentionSeeker>
                      ) : null}
                    </Fade>
                  </div>
                 
                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Title <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="formTitle"
                        onChange={this.changeText}
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="col-md-12">
                    <textarea
                      className="col-md-12"
                      style={{
                        minHeight: "200px",
                        borderRadius: "5px",
                        borderColor: "#8080804a",
                      }}
                      name="formBody"
                      onChange={this.changeText}
                      // onChange={(e) => {
                      //   this.setState({ text_area: e.target.value });
                      // }}
                    ></textarea>

                    {/* <Editor
  editorState={this.state.editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={this.onEditorStateChange}
/> */}

                    {/* <ReactQuill theme="snow" value={this.state.editorHtml}  onChange={this.showState}
/> */}
                  </div>
<hr/>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Attachment(Optional)&nbsp;
                        <small style={{ color: "crimson" }}>
                          (Supported File Formats: JPEG, JPG)
                        </small>
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        onChange={(e) => this.handleFileUpload(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div
                      class="progress"
                      id="progressHold"
                      style={{ height: "15px", display: "none" }}
                    >
                      <div
                        class="progress-bar bg-success"
                        id="pb"
                        style={{ width: "0%", height: "15px" }}
                      ></div>
                    </div>
                  </div>
                  {/* <button onClick={() => {alert(this.state.text_area)}}>Cli</button> */}

                  <div className="col-md-4">
                    <div className="form-group">
                      <button
                        id="btt"
                        type="button"
                        onClick={this.postMemoData}
                        data-dismiss="modal"
                        className="btn btn-primary btn-sm"
                      >
                        Publish Memo <i className="fa fa-send" />
                      </button>
                    </div>
                    
                  </div>
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <button
                        id="btt"
                        type="button"
                        onClick={this.postMemoData}
                        data-dismiss="modal"
                        className="btn btn-primary btn-sm"
                      >
                         Forward for Vetting <i className="fa fa-send" />
                      </button>
                    </div>
                    
                  </div> */}
                </div>

                {/* </div> */}
              </Modal>

              {/* View Memo */}

              <Modal isOpen={this.state.viewMemo} style={{ maxWidth: "800px" }}>
                {/* <div className="modal-content mdal2"> */}
                <span
                  style={{
                    float: "right",
                    marginRight: "30px",
                    marginTop: "10px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={() => this.setState({ viewMemo: false })}
                >
                  x
                </span>

                <div className="row card-body">
                  <div className="col-md-12">
                    <div
                      className="modal-header border-bottom"
                      style={{ textAlign: "center" }}
                    >
                      <h2
                        className="mb-0"
                        id="exampleModalScrollableTitle"
                        style={{ textAlign: "center", width: "100%" }}
                      >
                        <div className="col-12 text-center">
                          <img src={newLogo} style={{ width: "70px" }} />
                        </div>
                        <b className="sofia">NNAMDI AZIKIWE UNIVERSITY</b>
                        <p>
                          <b>P.M.B. 5025</b>
                        </p>
                        <p style={{ marginTop: "-15px" }}>
                          <b>AWKA</b>
                        </p>
                      </h2>
                    </div>
                  </div>
                  {/* <div className='border-bottom col-md-12'> */}
                  <div className="col-md-6">
                    <p>Office Of The Registrar</p>
                    <p style={{ fontSize: "14px" }}>
                      To: <b>The University Community</b>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h3>Internal Memorandum</h3>
                    <p style={{ fontSize: "14px" }}>
                      From: <b>The Office of {this.state.roleName}</b>
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      Date: <b>25th June, 2021</b>
                    </p>
                  </div>
                  {/* </div> */}

                  <br />
                  <div className="col-md-12">
                    <br />
                    <br />
                    <h4 className="text-center">{this.state.memoTitle}</h4>

                    <br />

                    <p>{this.state.memoBody}</p>
                  </div>
                  {/* <button onClick={() => {alert(this.state.text_area)}}>Cli</button> */}
                  {this.state.memoAttachment != null ? <div className="col-md-12">
                  <a href={this.state.memoAttachment} className="btn btn-warning btn-sm"  target="_blank"><i className="fa fa-eye"/>  See Attachment</a>
                  </div> : null}
                  <div className="col-md-12">
                    <img
                      alt="Image placeholder"
                      src={sig}
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    {/* <b>Charles Okechukwu Esimone</b> */}
                    {/* <b>Jason Nwaogu</b> */}
                    {/* <p>H.O.D</p> */}
                  </div>
                </div>

                {/* </div> */}
              </Modal>

             
            </div>
          
          
          </div>
        </Fade>
      </div>
    );
  }
}
