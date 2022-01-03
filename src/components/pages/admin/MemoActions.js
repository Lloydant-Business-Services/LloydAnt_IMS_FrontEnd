// import { Table, Tag, Radio, Space } from 'antd';
import React, { Component } from "react";
import { Table, Tag, Space, PageHeader } from "antd";
import { postData, fetchData } from "../../../utils/crud";
import MemoDataTable from "../DataTables/MemoDataTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import logobg from "../../../images/ziklogosm.png";
import _ from "lodash";
import newLogo from "../../../images/logobg.png";
import sig from "../../../images/signa.png";
import $ from "jquery";
import { makeBold } from "../../../utils/textEditor";
// import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "react-quill/dist/quill.snow.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import SweetAlert from "react-bootstrap-sweetalert";
import Spinner from "./Spinner";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";


// import {Modal} from 'react-bootstrap'
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Roles } from "../../../utils/Identifiers";

const { Column, ColumnGroup } = Table;

let nthDerivation = (data) => {
    if (parseInt(data) == 1 || parseInt(data) == 21 || parseInt(data) == 31) {
        return "st";
    } else if (parseInt(data) == 2 || parseInt(data) == 22) {
        return "nd";
    } else if (parseInt(data) == 3 || parseInt(data) == 23) {
        return "rd";
    } else {
        return "th";
    }
};

class MemoManagement extends Component {
    state = {
        top: "topLeft",
        bottom: "bottomRight",
        removedDuplicates: [],
        // viewMemo:true,
        payLoad: JSON.parse(localStorage.getItem("userData")),
        staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
        m1: 0,
        dept:0,
        loading:false,
        proposeArr: [0],
        applications: [
            {
                sn: 1,
                originator: "HOD Accountancy",
                title: "ADMISSION OPERATIONS",
                action: (
                    <>
                        <button className="btn btn-outline-primary btn-sm">view</button>
                    </>
                ),
            },
        ],
    };

    changeText = (event) => {
      const target = event.target;
    //   const yy = target.type === "select"? $("#yourdropdownid option:selected").text() : null
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;  
      this.setState({
        [name]: value,
      });
    };

    LoadData = (data) => {
        this.setState({
            viewMemo: true,
            title: data.title,
            refNo: data.refNo,
            body: data.body,
            originator: data.originator,
            datePosted: data.datePosted,
            memoId: data.memoId,
            deskId:data.id,
            vcomments: data.comments,
            activeDesk: data.activeDesk,
            activeDept:data.activeDept,
            isVetted:data.isVetted,
            isActed:data.isActed,
            forward:false,
            memoAttachment: data.attachmentUrl,
            isPublished: data.isPublished
        });
    };

    GetRoleMemo = () => {
      this.setState({spin:true, click_status:1})
        fetchData(`/InstituitionMemorandum/GetMemoActions?roleId=${this.state.payLoad?.roleId}&departmentId=${this.state.staffPayLoad?.department?.id}`, (data) => {
            console.log(data, "memo");
            let mapped_memo = data.map((i, t) => {
                return {
                    sn: t + 1,
                    title: i.title,
                    originator: i.originator,
                    datePosted: i.datePosted != null ? i.datePosted.substring(0, 10) : null,
                    status: <span className="badge badge-warning badge-sm">Awaitng Action</span>,
                    action: (
                        <>
                            <button className="btn btn-outline-warning btn-sm" onClick={() => this.LoadData(i)}>
                                <i className="fa fa-eye" />
                            </button>
                        </>
                    ),
                };
            });
            this.setState({ roleMemos: mapped_memo, spin:false });
        });
    };

    GetOriginatedMemo = () => {
      this.setState({spin:true, click_status:2})
        fetchData(`/InstituitionMemorandum/GetMemoOriginated?roleId=${this.state.payLoad?.roleId}&departmentId=${this.state.staffPayLoad?.department?.id}`, (data) => {
            console.log(data, "memo");
            let mapped_memo = data.map((i, t) => {
                return {
                    sn: t + 1,
                    title: i.title,
                    originator: i.originator,
                    datePosted: i.datePosted != null ? i.datePosted.substring(0, 10) : null,
                    status: !i.isVetted && !i.isActed ? <span className="badge badge-warning badge-sm">Processing</span> : !i.isVetted && i.isActed ?  <span className="badge badge-danger badge-sm">Declined</span> : i.isVetted && i.isActed ?  <span className="badge badge-success badge-sm">Approved</span> : null,
                    action: (
                        <>
                            <button className="btn btn-outline-warning btn-sm" onClick={() => this.LoadData(i)}>
                                <i className="fa fa-eye" />
                            </button>
                        </>
                    ),
                };
            });
            this.setState({ roleMemos: mapped_memo, spin:false });
        });
    };

    forwardMemo = () => {
      this.setState({loading:true})
      let fromDesk = this.state.payLoad?.roleId == Roles.Vice_Chancellor ? this.state.payLoad?.role : this.state.payLoad?.role + " " + this.state.staffPayLoad?.department?.name
      let payload = {
        // memoId: parseInt(this.state.memoId),
        // roleId: parseInt(this.state.role),
        // departmentId: parseInt(this.state.dept)
      }
      postData(`/InstituitionMemorandum/ForwardMemo?memoId=
      ${this.state.memoId}&roleId=
      ${this.state.role}&departmentId=
      ${this.state.dept}&comments=${this.state.comments}&fromDesk=${fromDesk}`, payload, data => {
        if(data == 200){
            this.setState({
              succ_pop:true,
              loading:false,
              forward:false,
              viewMemo:false
            })
          this.GetRoleMemo();
        }
      })
    }
    GetDeartments = () => {
      fetchData("/InstitutionDepartments", (data) => {
        this.setState({
          institutionDepts: data,
        });
    })
  }

  approveMemoVeting = () => {
   
    postData(`/InstituitionMemorandum/ApproveMemoVetting?memoId=${this.state.memoId}&deskId=${this.state.deskId}`, {}, data => {
      if(data == 200){
          this.setState({
            approved:true,
            loading:false,
            viewMemo:false
          })
          this.GetOriginatedMemo();
          this.GetRoleMemo();
      }else{
        alert("Please check to see that you have a stable connection")
        this.setState({
          loading:false
        })
      }
    })
  }
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
    toggleForward = () => {
      if(this.state.forward){
        this.setState({
          forward:false
        })
      }
      else{
        this.setState({
          forward:true
        })
      }
    }

    loadRoles = () => {
      fetchData("/Roles", (data) => {
        this.setState({ mappedRoles: data });
      });
    };
    resolveRole = (e) => {
      alert(e.target.value)
      if(parseInt(e.target.value) == 7){
        this.setState({
          showDepts: true
        })
      }
      this.setState({
        roleId: e.target.value
      })
    }

    toggleMemoSelector = () => {
      //document.getElementById("allStaff").checked = false;
  
      if (!this.state.all_staff) {
        this.setState({ all_staff: true, proposeArr: [0] });
      } else {
        this.setState({ all_staff: false, proposeArr: [] });
      }
    };

    publishMemo = () => {
      this.setState({loading:true, confirm_pop:false})
      let payload = {
        "roleIds": this.state.payLoad.roleId == Roles.HOD ?  [] : this.state.proposeArr,
        "departmentId": this.state.payLoad.roleId == Roles.HOD ? this.state.staffPayLoad?.department.id : null,
        "memoId": this.state.memoId
      }

      postData("/InstituitionMemorandum/PublishMemo", payload, data => {
        if(data == 200){
            this.setState({published:true, loading:false, viewMemo:false})
            this.GetOriginatedMemo();
            this.GetRoleMemo();
        }
      })
    }
    componentDidMount() {
        this.GetRoleMemo();
        this.loadRoles();
        this.GetDeartments();
    }
    render() {
        require("antd/dist/antd.css");

        return (
            <>
            {this.state.spin ? (
          <Spinner msg={"Please wait..."} />
        ) : null}
            {this.state.succ_pop ? (
                    <SweetAlert success title="Forwarded" onConfirm={() => this.setState({succ_pop:false})}>
                        Memo Successfully Forwarded!
                    </SweetAlert>
                ) : null}

        {this.state.approved ? (
                    <SweetAlert success title="Approved" onConfirm={() => this.setState({approved:false})}>
                        Memo Successfully Approved!
                    </SweetAlert>
                ) : null}
                 {this.state.published ? (
                    <SweetAlert success title="Published" onConfirm={() => this.setState({published:false})}>
                        Memo Published!
                    </SweetAlert>
                ) : null}

        {this.state.confirm_pop ? (
                    <SweetAlert warning showCancel confirmBtnText="Submit" confirmBtnBsStyle="primary" title="Are you sure?" onConfirm={this.publishMemo} onCancel={() => this.setState({ confirm_pop: false })} focusCancelBtn>
                        Publish Memo?
                    </SweetAlert>
                ) : null}
                <Modal isOpen={this.state.viewMemo} style={{ maxWidth: "800px", padding:'20px' }}>
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
                    {this.state.click_status == 2 && !this.state.isActed ? <div className="row">
                      <div className="col-sm-7">

                      </div>
                      <div className="col-sm-5">
                      Current Desk: &nbsp;
                        {this.state.activeDesk && this.state.activeDesk.includes("Chancellor") ? 
                        <span className="badge badge-info">{this.state.activeDesk}</span> : <span className="badge badge-info">{this.state.activeDesk} {this.state.activeDept != null ? this.state.activeDept : ""}</span>}
                      </div>
                    </div> : null}

                    {this.state.click_status == 2 && this.state.isActed && this.state.isVetted && !this.state.isPublished ? <div className="row">
                      <div className="col-sm-7">

                      </div>
                      <div className="col-sm-5">
                      
                        <span className="badge badge-success">Approved</span>
                      </div>
                    </div> : null}

                    {this.state.click_status == 2 && this.state.isPublished ? <div className="row">
                      <div className="col-sm-7">

                      </div>
                      <div className="col-sm-5">
                      
                        <span className="badge badge-info">Published</span>
                      </div>
                    </div> : null}

                    {this.state.click_status == 2 && this.state.isActed && !this.state.isVetted ? <div className="row">
                      <div className="col-sm-7">

                      </div>
                      <div className="col-sm-5">
                      
                        <span className="badge badge-danger">Declined</span>
                      </div>
                    </div> : null}

                    

                    <div className="row card-body">
                        <div className="col-md-12">
                            <div className="modal-header border-bottom" style={{ textAlign: "center" }}>
                                <h2 className="mb-0" id="exampleModalScrollableTitle" style={{ textAlign: "center", width: "100%" }}>
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
                            {/* <p>Office Of The Registrar</p> */}
                            <p style={{ fontSize: "14px" }}>
                                To: <b>The {this.state.payLoad?.role}</b>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h3>Internal Memorandum</h3>
                            <p style={{ fontSize: "14px" }}>
                                Originator: <b>{this.state.originator}</b>
                            </p>
                            <p style={{ fontSize: "14px" }}>
                                Date: <b>{this.state.datePosted != null ? this.state.datePosted.substring(0, 10) : "-"}</b>
                            </p>
                        </div>
                        {/* </div> */}

                        <br />
                        <div className="col-md-12">
                            <br />
                            <br />
                            <h4 className="text-center">{this.state.title}</h4>

                            <br />

                            <p>{this.state.body}</p>
                        </div>
                        {/* <button onClick={() => {alert(this.state.text_area)}}>Cli</button> */}
                        {this.state.memoAttachment != null ? (
                            <div className="col-md-12">
                                <a href={this.state.memoAttachment} className="btn btn-warning btn-sm" target="_blank">
                                    <i className="fa fa-eye" /> See Attachment
                                </a>
                            </div>
                        ) : null}
                        <div className="col-md-12">
                            <img alt="Image placeholder" src={sig} style={{ width: "100px" }} />
                        </div>
                        <div className="col-md-6">
                            {/* <b>Charles Okechukwu Esimone</b> */}
                            {/* <b>Jason Nwaogu</b> */}
                            {/* <p>H.O.D</p> */}
                        </div>
                        {this.state.vcomments != null && this.state.click_status == 1? 
                        <div className="col-md-12">
                            <p>Comments From {this.state.vcomments}</p>
                        </div> : null}
                    </div>
                    <div className="container-fluid" style={{padding:'30px'}}>
                        <div className="row">
                            <div className="col-sm-3">
                              
                <MetroSpinner
                  size={40}
                  color={"rgb(175 202 218)"}
                  loading={this.state.loading}
                />
                            </div>
                    {this.state.click_status == 1 ? <>
                            <div className="col-sm-2">
                                <button className="btn btn-outline-success btn-sm" onClick={this.approveMemoVeting}>
                                  Approve <i className="fa fa-check"/>
                                </button>
                            </div>
                            
                            <div className="col-sm-2">
                                <button className="btn btn-outline-danger btn-sm">
                                  Decline <i className="fa fa-cancel"/>
                                </button>
                            </div>
                            <div className="col-sm-2">
                                <button className="btn btn-outline-info btn-sm" onClick={this.toggleForward}>
                                  Forward <i className="fa fa-arrow-right"/>
                                </button>
                            </div>

                         
                        </> : null}
                      
                        </div>

                      {this.state.isVetted && this.state.isActed && this.state.payLoad?.roleId != Roles.HOD ? <> 
                  
                  <div className="col-md-6">
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
                  </div> </> : null}
                 
                  {this.state.click_status == 2 && this.state.isVetted && this.state.isActed && !this.state.isPublished ?
                          <>
                              <button className="btn btn-outline-info btn-sm" onClick={() => this.setState({confirm_pop:true})}>
                                  Publish <i className="fa fa-send"/>
                                </button>
                          </>
                        :null}

{/* {this.state.click_status == 2 && this.state.isPublished ?
                          <>
                              <button className="btn btn-outline-info btn-sm" onClick={() => this.setState({confirm_pop:true})}>
                                  Publish <i className="fa fa-send"/>
                                </button>
                          </>
                        :null} */}
                    </div>

<br/>
                   
                    {this.state.forward ? <div className="container-fluid" >
                      <Fade>
                      <AttentionSeeker effect={"shake"} duration={300}>
                      <div className="row">
                            <div className="col-sm-2 sofia">Forward to:</div>

                            <div className="col-sm-5">
                                <div className="form-group">
                                    {/* <label htmlFor="example-text-input" className="form-control-label">
                                            Type of Programme
                                        </label> */}
                                    <select className="form-control" id="role" name="role" onChange={this.changeText} required>
                                        <option>Select Role</option>
                                              {this.state.mappedRoles && this.state.mappedRoles.map((i, x) => {
                                                return(
                                                  <option value={i.id}>{i.name}</option>
                                                )
                                              })}
                                       
                                    </select>
                                </div>
                            </div>

                           <div className="col-sm-5">
                                <div className="form-group">
                                    {/* <label htmlFor="example-text-input" className="form-control-label">
                                            Type of Programme
                                        </label> */}
                                   <select className="form-control" id="dept" name="dept" onChange={this.changeText} required>
                                        <option>Select Department</option>
                                              {this.state.institutionDepts && this.state.institutionDepts.map((i, x) => {
                                                return(
                                                  <option value={i.id}>{i.name}</option>
                                                )
                                              })}
                                       
                                    </select>
                                </div>
                            </div>
                            
                            <div className="col-sm-2 sofia"></div>
                            <div className="col-sm-10">
                                <div className="form-group">
                                    <label htmlFor="example-text-input"  className="form-control-label">
                                            Comments
                                        </label>
                                    <textarea className="form-control" name="comments" onChange={this.changeText}>

                                    </textarea>
                                </div>
                            </div>
                            <div className="col-sm-2 sofia"></div>
                            <div className="col-sm-4">
                            <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">
                                            &nbsp;
                                        </label>
                                    <button className="btn btn-success btn-sm" onClick={this.forwardMemo}>Forward <i className="fa fa-send"/></button>
                                </div>
                               </div>
                            {
                            /* <div className="col-sm-2 sofia"></div>
                                <div className="col-sm-3">
                                    <button className="btn btn-success btn-sm">Forward</button>
                              </div> */
                              }
<br/>
<br/>
<br/>
<div className="col-sm-12"></div>
                        </div>
                      
                        </AttentionSeeker>
                      </Fade>
                      <div className="col-md-12"></div>
                    </div>
                    : null}
                    {/* </div> */}
                </Modal>

                <Fade>
                    <div className="col-md-12"></div>
                    <br />
                    <div className="">
                        <PageHeader className="site-page-header" onBack={false} title="Internal Memorandum" subTitle="Memo Management" />
                    </div>
                    <br />
                    <br />
                    <div className="card col-md-10">
        <div className="card-body">
          <div className="table-responsive">
          <button className="btn btn-outline-danger" onClick={this.GetRoleMemo}><i className="fa fa-bell"/>&nbsp; Memo Requests </button> 
            <button className="btn  btn-outline-primary custom-success" onClick={this.GetOriginatedMemo}><i className="fa fa-send"/> &nbsp;My sent Memo Requests</button>
          
            <hr className="my-3" />
                    <MemoDataTable clickStatus={this.state.click_status} applications={this.state.roleMemos} passedDeptHeads={this.state.removedDuplicates} passedDepartment={"BURSARY"} passedDate={"May 19th - May 20th, 2021"} />
                    </div>
        </div>
      </div>
                </Fade>
            </>
        );
    }
}

export default MemoManagement;
