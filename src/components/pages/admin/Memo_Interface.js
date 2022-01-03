// import { Table, Tag, Radio, Space } from 'antd';
import React, { Component } from "react";
// import { Table, Tag, Space, PageHeader } from "antd";
import { postData, fetchData, URL, LoginRequest } from "../../../utils/crud";
import MemoDataTable from "../DataTables/MemoDataTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import logobg from "../../../images/ziklogosm.png";
import "jspdf-autotable";
// import logobg from "../../../images/ziklogosm.png";
import _, { includes, values, xorBy } from "lodash";
import newLogo from "../../../images/logobg.png";
import loading_gif from "../../../images/loading.gif";
// import html2canvas from "html2canvas";
import sig from "../../../images/signa.png";
import { enquireScreen } from 'enquire-js';
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
import axios from "axios";
// import { Fade } from "reactstrap";
import { StatusCodes } from "../../Barn";
import QueueAnim from "rc-queue-anim";
import Spinner from "./Spinner";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";
import { AutoComplete, Drawer, Form, Button, Col, Radio, Row, Input, Select, DatePicker, Badge, Switch, Table, Space, Collapse, Tooltip, List, Comment, message, Upload, Modal } from "antd";
import { Roles, ActionType } from "../../../utils/Identifiers";
import { ArrowRightOutlined, RedoOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import { FiRefreshCcw, FiArrowRight, FiCheck, FiArrowLeft } from "react-icons/fi";
import Loadable from "react-loadable";

// const jsPDF = Loadable({
//     loader: () => import("jspdf"),
//     loading: React,
//   });
  
//   const html2canvas = Loadable({
//     loader: () => import("html2canvas"),
//     loading: React
//   });

// Import troublesome modules dynamically
// let jsPDF = null;
// let html2canvas = null;
// (async () => {
//     if (typeof window !== "undefined") {
//       // import module for side effects
//       jsPDF = await import("jspdf");
//       html2canvas = await import("html2canvas");
//     }
//   })();
const { Option } = Select;
//import {Memo_Init} from "../../../components/Reusables/memoInit"

// import {Modal} from 'react-bootstrap'
// import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const { Column, ColumnGroup } = Table;
const { Panel } = Collapse;
const columns = [
    {
        title: "Copy Recipients",
        dataIndex: "name",
        //   sorter: {
        //     compare: (a, b) => a.chinese - b.chinese,
        //     multiple: 3,
        //   },
    },

    {
        title: " ",
        dataIndex: "action",
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
];

const data = [
    {
        key: "1",
        name: "John Brown",
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: "2",
        name: "Jim Green",
        chinese: 98,
        math: 66,
        english: 89,
    },
];
let fileHold = null;
let newBase64Signature;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = true;
    // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "doc/pdf" || file.type === "doc/docx";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    console.log(file, "file before");
    fileHold = file;

    setTimeout(() => {
        console.log(fileHold, "exttrrrr before");
    }, 1500);

    return isJpgOrPng && isLt2M;
}
function convertImgToBase64(url, callback, outputFormat){
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
		canvas.height = img.height;
		canvas.width = img.width;
	  	ctx.drawImage(img,0,0);
	  	var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	  	callback.call(this, dataURL);
        // Clean up
	  	canvas = null; 
	};
	img.src = url;
}
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    //console.log(typeof img[this.spriteCostumeCount])
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
const key = "updatable";
var lists = [];
class MemoInterface extends Component {
    state = {
        top: "topLeft",
        bottom: "bottomRight",
        removedDuplicates: [],
        // viewMemo:true,
        payLoad: JSON.parse(localStorage.getItem("userData")),
        staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
        m1: 0,
        dept: 0,
        signatureResolved: false,
        loading: false,
        isAcknowledgedAndForward: false,
        isForward: false,
        isReturnToOriginator: false,
        isRejectAndClose: false,
        proposeArr: [],
        commentList: [],
        roleFilterList: [],
        inboxMailing: [],
        archiveMailing: [],
        officeRecipient: true,
        staffFilterList: [],
        isConfidential:false,
        mailSelectionType:"..",
        searchDateFrom:"0001-01-01",
        searchDateTo:"4000-01-01"
        //confidential_prompt:true
        //loader_copy:true
    };
   
    exportPDF = (_data) => {
        let _this = this;
        let pdfData = this.state.pdfData;
        if (typeof window !== "undefined") {
            const doc = new jsPDF("portrait", "pt", "A4", [200, 400]);
            var img = new Image();
            img.style.opacity = ".5"
            img.src = logobg;
            // html2canvas(document.querySelector("#signatureCapture")).then((canvas) => {
            //     alert("df")
            //    document.body.appendChild(canvas);
            //     doc.addImage(canvas.toDataURL("image/png"), "PNG", 280, 20, 28, 34);
            // });
            var pdfSignature = new Image();
            //var b4 = this.getBase64Image(pdfData.signatureUrl)
            // console.log(b4, "b4")
            if(newBase64Signature != null){
                pdfSignature.src = newBase64Signature;
                pdfSignature.style.height = "500px";
            }
           

            doc.setFontSize(13);
            doc.setFont("Times New Roman");

            const nau = "NNAMDI AZIKIWE UNIVERSITY";
            const ass = this.props.passedDepartment;
            const footer = "khjlllbk";

            // const logg = logobg;
            const title = "Uinvited";

            const headers = [
                [
                    " ",
                    " ",
                    // " ",
                ],
            ];

            let dora = [];

            const ff = [
                {
                    label: `TITLE: ${_.upperCase(pdfData.title)}`,
                    //info: `Phone : ${_data.phoneNumber}`,
                },
            ];
            const _mailBody = [
                {
                    label: `${pdfData.body}`,
                    //info: `Phone : ${_data.phoneNumber}`,
                },
            ];
            const data = ff.map((d) => [
                d.label,
                d.info,
                // d.info2
            ]);
            let content = {
                startY: 290,
                head: headers,
                body: data,
                theme: "plain",
                styles: {
                    fontSize: 12,
                    font: "Times New Roman",
                    cellPadding: 7,
                    overflow: "linebreak",
                    // cellWidth: 'wrap'
                },
                //  styles: { fontStyle: 'normal', cellPadding:"12", fontSize: 11},
                columnStyles: {
                    // columnWidth: 'auto'
                },
                tableWidth: 510,

                // foot: foott
            };

            const _nok = [
                {
                    label: `Name : ${" "}`,
                    info: `Phone : ${" "}`,
                },
                {
                    label: `Email : ${" "}`,
                    info: " ",
                },
            ];

            const nok = _nok.map((d) => [
                d.label,
                d.info,
                // d.info2
            ]);
            let content2 = {
                // startY: 310,
                // startY: doc.autoTableEndPosY() + _this.state.m1,
                // startY: check+25,
                head: headers,
                body: nok,
                theme: "plain",
                // styles: { fontStyle: 'normal', minCellHeight:"2", cellPadding:"3" }
                styles: {
                    fontSize: 12,
                    font: "Times New Roman",
                    cellPadding: 7,
                    overflow: "linebreak",
                    cellWidth: "wrap",
                },
                margin: { top: 12 },
                // styles: { fontSize: 11 }
            };

            const prog_info = [
                {
                    label1: `Type of Programme : ${"Post-Graduatehjgkkjhdfjgkghdfgjkydfygjhukutyfguhkiutdfygkhjluyfyghijiyufghljkyfkgujhlufygkhjujgkhjfjgkhjfg"}`,
                    label2: `Academic Year : ${" "}`,
                },
                {
                    label1: `Faculty : ${"Sciences"}`,
                    label2: `Department : ${"Medcine and Surgery"}`,
                },
                {
                    label1: `Estimated Duration of Stay : ${"6 Months"}`,
                },
            ];

            const ioc = [
                {
                    label1: `Date of Degree Awarded : ${"20-10-2020"}`,
                    label2: `Faculty : ${"Medical Science"}`,
                },
                {
                    label1: `Department : ${"Pharmacy"}`,
                    label2: `Year : ${"2012"}`,
                },
                {
                    label1: `Estimated Duration of Stay : ${"6 Months"}`,
                },
            ];

            const _ioc = ioc.map((d) => [
                d.label1,
                d.label2,
                // d.info2
            ]);

            const prog_arr = prog_info.map((d) => [
                d.label1,
                d.label2,
                // d.info2
            ]);
            let prog_tab = {
                // startY: 310,
                // startY: check+25,
                head: headers,
                body: prog_arr,
                theme: "plain",
                // styles: { fontStyle: 'normal', minCellHeight:"2", cellPadding:"3" }
                styles: {
                    fontSize: 12,
                    font: "Times New Roman",
                    cellPadding: 7,
                    overflow: "linebreak",
                    cellWidth: "wrap",
                },
                margin: { top: 12 },
                // styles: { fontSize: 11 }
            };
            doc.setFont("Arial");
            doc.setFontSize(13);

            doc.addImage(img, "png", 280, 20, 28, 34);

            doc.setFontType("bold");
            doc.text(nau, 180, 70);
            doc.setFontType("normal");
            doc.text("P.M.B. 5025", 260, 87);
            doc.text("AWKA", 280, 105);

            doc.setFontSize(13);
            doc.text("UNIZIK Administrative Maling System", 180, 130);
            doc.setLineDash([20, 0], 10);
            doc.line(50, 140, 553, 140);
            doc.setFontSize(12);
            //doc.setFontType("bold");
            doc.text("File Name: " + pdfData.fileName, 50, 180);
            doc.text("File Number: " + pdfData.fileNumber, 50, 200);

            doc.text("Originator: " + pdfData.originatorInfo, 320, 220);
            doc.text("Date Originated: " + pdfData.dateEntered.substring(0, 10), 320, 240);

            doc.setFontSize(13);
            doc.setFontType("bold");
            //   doc.text(pdfData.title, 50, 320)
            //   doc.setFontType("normal");
            //   doc.text(pdfData.body, 50, 340)

            //doc.addImage(passport, 'png', 260, 210, 80, 86);
            //doc.autoTable(content)
            doc.autoTable({
                // html: '#my-table',
                head: [
                    // ['ID', 'Name', 'Email', 'Country', 'IP-address'],
                ],
                body: ff,
                theme: "plain",
                tableWidth: 500,
                styles: {
                    fontSize: 12,
                    font: "Times New Roman",
                    cellPadding: 7,
                    //   overflow: 'linebreak',
                    //   cellWidth: 'wrap'
                },
                columnStyles: {},
                startY: 300,
            });
            //  doc.autoTableEndPosY() + 15
            var check = doc.autoTableEndPosY() + 5;
            doc.autoTable({
                // html: '#my-table',
                head: [
                    // ['ID', 'Name', 'Email', 'Country', 'IP-address'],
                ],
                body: _mailBody,
                theme: "plain",
                tableWidth: 500,
                styles: {
                    fontSize: 12,
                    font: "Times New Roman",
                    cellPadding: 7,
                    lineHeight: 2,
                },
                columnStyles: {},
                startY: check + 5,
            });
            var checkComp = doc.autoTableEndPosY() + 5;
            doc.text("Yours faithfully", 50, checkComp+40);

            var check2 = doc.autoTableEndPosY() + 20;
            // html2canvas(document.querySelector("#signatureCapture")).then((canvas) => {
            //    setTimeout(() => {
            //     doc.addImage(canvas.toDataURL("image/png"), "PNG", 50, 50, check2, 200);
            //     window.open(doc.output("bloburl"));

            //    },2000)
            // });
            if(newBase64Signature != null){
                doc.addImage(pdfSignature, 'png', 50, check2+30, 100, 100);

            }
            //doc.text(this.state.originatorName, 50, check2+150);

            window.open(doc.output("bloburl"));

            
            

            //doc.save("BURSARY_DEPT_TRAINING.pdf")
        }
    };

    onChangeAttachment = (info) => {
        let currentState = this;
        console.log(info, "infooo");
        console.log(this.state.extractImage, "extract");
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            getBase64(
                info.file.originFileObj,
                (imageUrl) =>
                    this.setState({
                        imageUrl,
                        loading: false,
                        staffImageUrl: info.fileList[0],
                    }),
                setTimeout(() => {
                    console.log(this.state.imageUrl, "Img");
                    console.log(this.state.staffImageUrl, "StaffImage");
                }, 1500)
            );
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    openMessage = (data) => {
        message.loading({ content: "Finalizing action...", key });
        setTimeout(() => {
            message.success({ content: data, key, duration: 4 });
        }, 1000);
    };

    onChange = (info) => {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
            this.setState({ attachmentFile: info.file });
        }
        if (info.file.status === "done") {
            message.open({
                type: "success",
                content: "File Attached successfully",
                duration: 3,
            });
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 2000);
    };
    addedToggle = () => {
        message.open({
            type: "success",
            content: "Email Forwarded",
            duration: 3,
        });
    };
    changeText = (event) => {
        const target = event.target;
        //   const yy = target.type === "select"? $("#yourdropdownid option:selected").text() : null
        const value = target.type === "checkbox" ? target.checked : target.value;
        console.log(value)
        const name = target.name;
        this.setState({
            [name]: value,
        });
    };

    handleMailTitle = ({ target: { value } }) => {
        this.setState({ mailTitle: value });
    };

    handleComposeMail = ({ target: { value } }) => {
        this.setState({ mailBody: value });
    };
    postMail = (e) => {
        e.preventDefault();
        let _this = this;
        let _copyPayload = [];
        const { proposeArr } = this.state;
        if (this.state.mailTitle == null || this.state.mailBody == null || parseInt(this.state.roleIdForward) <= 0) {
            this.setState({ field_err: true });
            return false;
        }
        this.setState({ btn_loading: true });
        

        let formData = new FormData();

        formData.append("Title", this.state.mailTitle);
        formData.append("Body", this.state.mailBody);
        formData.append("DepartmentId", parseInt(this.state.departmentIdForward) > 0 ? this.state.departmentIdForward : 0);
        formData.append("FacultyId", this.state.facultyIdForward > 0 ? this.state.facultyIdForward : 0);
        if(this.state.isConfidential){
            formData.append("RoleId", Roles.VC_Secretary)
            formData.append("IsConfidential", true)
            
        }
        else{
            formData.append("RoleId", parseInt(this.state.roleIdForward) || 0);
            formData.append("IsConfidential", false)
        }
        
        //formData.append("CopyList", JSON.stringify(_copyPayload));
        // formData.append("CopyList", [{name:"dd", id:2, roleId:1, action:""}]);

        formData.append("IsExternal", false);        
        formData.append("OriginatorExternal", "-");
        formData.append("SignatureUrl", this.state.signatureUrl);
        formData.append("AttachmentUrl", fileHold);
        formData.append("FileTypeId", this.state.composeFileTypeId || 0);
        formData.append("OriginatorUserId", this.state.payLoad?.id);
        formData.append("ToStaffId", this.state.staffIdToSend || 0);
        axios({
            method: "post",
            url: URL + "/Mailing/PostNewMail",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response, "ytugkhi");
                _this.executeCopy(proposeArr, response.data);
                _this.openMessage("Mail sent successfully!");

                _this.setState({
                    compose: false,
                    btn_loading: false,
                    mailTitle: "",
                    mailBody: "",
                    roleIdForward: 0,
                    signatureUrl: "",
                    imageUrl: "",
                });
                // setTimeout(() => {
                //     _this.componentDidMount()
                // },2000)
            })
            .catch(function (response) {
                console.log(response, "error");
                _this.setState({ err_pop: true, btn_loading: false });
            });
    };

    executeCopy = (arr, mailingId) => {
        let _copyPayload = [];
        if (arr.length > 0 && mailingId > 0) {
            _copyPayload = arr.map((x, i) => {
                return {
                    name: x.name,
                    roleId: x.roleId,
                    id: x.id,
                    action: "",
                };
            });
            console.log(_copyPayload, "Copy payload");

            _copyPayload.forEach((e) => {
                postData(`/Mailing/CopyMailToAction?mailingId=${mailingId}`, e, (data) => {
                    if (data == StatusCodes.Created) {
                        this.openMessage("Mail sent successfully!");
                        this.setState({
                            compose: false,
                            visible: false,
                            btn_loading: false,
                            mailTitle: "",
                            toggleCopy: false,
                            toggleCopy1: false,
                            proposeArr: [],
                            mailBody: "",
                            roleIdForward: 0,
                        });
                    }
                });
            });
            return;
        }
    };

    GetRoleMailing = () => {
        this.setState({ spin: true, click_status: 1, box_loader: true, sentMailing: [] });
        fetchData(
            `/Mailing/GetMailInbox?RoleId=${this.state.payLoad?.roleId}&DeptId=${this.state.staffPayLoad?.department?.id || 0}&FacultyId=${this.state.staffPayLoad?.department?.facultyId || 0}&staffId=${this.state.payLoad?.staffId}`,
            (data) => {
                //this.setState({box_loader:false})
                console.log(data, "mails")

                this.setState({ inboxMailing: data, spin: false, box_loader: false });
            }
        );
    };
    GetRoleArchive = () => {
        this.setState({ spin: true, click_status: 1, box_loader: true, sentMailing: [] });
        fetchData(`/Mailing/GetMailActionArchive?RoleId=${this.state.payLoad?.roleId}&DeptId=${this.state.staffPayLoad?.department?.id || 0}&FacultyId=${this.state.staffPayLoad?.department?.facultyId || 0}`, (data) => {
            //this.setState({box_loader:false})

            this.setState({ inboxMailing: data, spin: false, box_loader: false });
        });
    };

    toggleForward = () => {
        if (this.state.forward) {
            this.setState({
                forward: false,
            });
        } else {
            this.setState({
                forward: true,
            });
        }
    };

    replaceAdd = (data) => {
        let lists = [1, 2, 3, 4];
        let spliced;
        spliced = lists.filter((x) => x.id != data);
    };

    loadRoles = () => {
        fetchData("/Roles", (data) => {
            var exclude = [18, 16, 19, 2, 1, 3];
            let lists = data;
            let spliced;

            // for(let i = 0; i < exclude.length; i++){
            //alert(exclude[i])
            if (this.state.payLoad?.roleId == Roles.VC_IncomingMailOfficer) {
                spliced = lists.filter((x) => x.id != Roles.VC_IncomingMailOfficer && x.id != 1 && x.id != 2 && x.id != 4);
            } else {
                spliced = lists.filter((x) => x.id != Roles.VC_IncomingMailOfficer && x.id != 1 && x.id != 2 && x.id != 4);
            }

            // spliced = lists.filter(x => x.id != exclude[i])
            // spliced = lists.filter((x) => {
            //      x.id != exclude[i];
            //   });
            // }
            setTimeout(() => {
                console.log(spliced, "filter");
                this.setState({ mappedRoles: spliced });
            }, 1500);
        });
    };
    loadCopyRoles = () => {
        //this.setState({ loader_copy: true });
        fetchData("/Roles", (data) => {
            if (data.length > 0) {
                var exclude = [18, 16, 19, 2, 1, 3];
                let lists = data;
                let spliced = [];

                if (this.state.payLoad?.roleId == Roles.VC_IncomingMailOfficer) {
                    spliced = lists.filter(
                        (x) =>
                            x.id != Roles.VC_IncomingMailOfficer &&
                            x.id != 1 &&
                            x.id != 2 &&
                            x.id != 4 &&
                            x.id != Roles.Staff &&
                            x.id != Roles.Personnel_Secretarial &&
                            x.id != Roles.Personnel_Mailing_Staff &&
                            x.id != Roles.Personnel_Documentation &&
                            x.id != Roles.VC_OutgoingMailOfficer
                    );
                } else {
                    spliced = lists.filter(
                        (x) =>
                            x.id != Roles.Personnel_Secretarial &&
                            x.id != Roles.Personnel_Mailing_Staff &&
                            x.id != Roles.Personnel_Documentation &&
                            x.id != Roles.VC_IncomingMailOfficer &&
                            x.id != Roles.VC_OutgoingMailOfficer &&
                            x.id != Roles.VC_Secretary &&
                            x.id != 1 &&
                            x.id != 2 &&
                            x.id != 4 &&
                            x.id != Roles.Staff &&
                            x.id != Roles.PersonnelSaps
                    );
                }

                this.setState({ mappedCopyRoles: spliced, loader_copy: false });
            }
        });
    };
    resolveRole = (e) => {
        //alert(e.target.value);
        if (parseInt(e.target.value) == 7) {
            this.setState({
                showDepts: true,
            });
        }
        this.setState({
            roleId: e.target.value,
        });
    };

    toggleMemoSelector = () => {
        //document.getElementById("allStaff").checked = false;

        if (!this.state.all_staff) {
            this.setState({ all_staff: true, proposeArr: [0] });
        } else {
            this.setState({ all_staff: false, proposeArr: [] });
        }
    };

    showDrawer = async (data) => {
        //console.log(data, "datss");
        fetchData(`/Mailing/SignatureToBase64?signatureUrl=${data.signatureUrl}`, returnSig => {
            newBase64Signature = returnSig;
            this.setState({newBase64Signature:returnSig})
            console.log(newBase64Signature, "base64")
        })

        this.setState({
            pdfData: data,
            visible: true,
            displayTitle: data.title,
            displayDateEntered: data.dateEntered != null ? data.dateEntered.substring(0, 10) : null,
            displayBody: data.body,
            displayAttachment: data.attachmentUrl,
            originatorInfo: data.originatorInfo,
            isExternal:data.isExternal,
            mailingId: data.mailingId,
            deskId: data.deskId,
            comments_loader: true,
            commentList: [],
            deskIsActive: data.deskIsActive,
            displayIsAcknowledged: data.isAcknowledged,
            displayIsClosed: data.isClosed,
            displayIsRejected: data.isRejected,
            displaySignatureUrl: newBase64Signature,
            displayFileNumber: data.fileNumber,
            displayFileName: data.fileName,
            originatorName: data.originatorName,
            confidentialityMail: data.isConfidential
        });
        setTimeout(() => {
            fetchData(`/Mailing/GetMailTrailingCommentsByMailId?mailingId=${this.state.mailingId}`, (data) => {
                //console.log(data, "Comments");
                //console.log(this.state.displaySignatureUrl, "siggg");

                this.setState({ commentList: data });

                postData(`/Mailing/ActivateRead?deskChainId=${this.state.deskId}`, "", (data) => {
                    console.log(data, "Read Ok");
                    this.setState({ comments_loader: false });
                    this.GetRoleMailing();
                });
            });
        }, 1500);
    };

    archiveMail = (data) => {
        const payload = {
            mailingId: 222222,
            fileTypeId: 2222,
            userId: 2222,
        };

        postData("/Mailing/ArchiveMail", payload, (data) => {
            if (data == 200) {
                this.openMessage("Added to Archive!");
            }
        });
    };
    getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = () => {
            const base64data = reader.result;   
            resolve(base64data);
          }
        });
      }

      convertImgToBase64 = (url, callback, outputFormat) =>{
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            canvas.height = img.height;
            canvas.width = img.width;
              ctx.drawImage(img,0,0);
              var dataURL = canvas.toDataURL(outputFormat || 'image/png');
              callback.call(this, dataURL);
            // Clean up
              canvas = null; 
        };
        img.src = url;
    }
    showSentDrawer = (data) => {
        
        fetchData(`/Mailing/SignatureToBase64?signatureUrl=${data.signatureUrl}`, returnSig => {
            newBase64Signature = returnSig;
            this.setState({newBase64Signature:returnSig})
            console.log(newBase64Signature, "base64")
        })
        // var dd = this.getBase64FromUrl(data.signatureUrl)
        //var b4 = getBase64Image(data.signatureUrl)
        //console.log(b4, "b4")
        // console.log(dd, "dd")

        // var uu = convertImgToBase64(data.signatureUrl, function(base64Img){
        //    console.log(base64Img)
        // });
        // console.log(uu)


        this.setState({
            pdfData: data,
            showSent: true,
            sentTitle: data.title,
            sentDateEntered: data.dateEntered != null ? data.dateEntered.substring(0, 10) : null,
            sentBody: data.body,
            sentAttachment: data.attachmentUrl,
            sentMailingId: data.mailingId,
            status_loader: true,
            sentIsAcknowledged: data.isAcknowledged,
            sentIsClosed: data.isClosed,
            sentIsRejected: data.isRejected,
            sentSignatureUrl: data.signatureUrl,
            fileNumber: data.fileNumber,
            fileName: data.fileName,
            base64Signature: newBase64Signature
        });
        setTimeout(() => {
            fetchData(`/Mailing/GetMailingDeskStatus?mailingId=${this.state.sentMailingId}`, (data) => {
                console.log(data, "sent status");
                this.setState({ sent_mail_status: data, status_loader: false });
            });
        }, 1500);
    };

    onClose = () => {
        this.setState({
            visible: false,
            compose: false,
            showSent: false,
        });
    };
    handleRoleForward = (e) => {
        console.log(e.target.value)
        this.setState({
            roleIdForward: parseInt(e.target.value),
            role_loader: true,
            departmentIdForward: 0,
            facultyIdForward: 0,
        });
        fetchData(`/Mailing/FilterByRole?roleId=${e.target.value}`, (data) => {
            console.log(data, "ROle Filters");
            if (data.length > 0) {
                this.setState({
                    role_loader: false,
                    roleFilterList: data,
                });
            } else {
                this.setState({ role_loader: false, roleFilterList: [] });
            }
        });
    };
    setStaffId = (value) => {
        this.setState({
            staffIdToSend: value,
        });
    };
    handleStaffDepartmentSelect = (e) => {
        console.log(e.target.value)
        this.setState({
            roleIdForward: e.target.value,
            role_loader: true,
            departmentIdForward: 0,
            facultyIdForward: 0,
            staffId: e.target.value,
        });
        fetchData(`/Mailing/GetSpecificMailingStaff?departmentId=${e.target.value}`, (data) => {
            console.log(data, "dept Filters");
            if (data.length > 0) {
                this.setState({
                    role_loader: false,
                    staffFilterList: data,
                });
            } else {
                this.setState({ role_loader: false, staffFilterList: [] });
            }
        });
    };
    handleFacultySelect = (e) => {
        console.log(e.target.value)
        this.setState({
            facultyIdForward: e.target.value,
        });
        // setTimeout(() => {
        //     console.log(this.state.facultyIdForward, "fac STate");
        //     console.log(e.target.value, "value");
        // }, 1500);
    };
    handleOfficeSelect = (e) => {
        console.log(e.target.value)
        this.setState({
            departmentIdForward: e.target.value,
        });
    };
    handleFileTypeSelect = (value) => {
        this.setState({
            fileTypeId: value,
        });
    };
    // changeComment = (value) => {
    //     alert(value)
    //     this.setState({comments:value})
    // }
    changeComment = ({ target: { value } }) => {
        this.setState({ comments: value });
    };
    handleAcknowledgeAndClose = () => {
        this.setState({
            isTransition: false,
            ack_close: false,
        });
        const payload = {
            mailingId: this.state.mailingId,
            isTransition: false,
            // "comments": this.state.comments,
            // "toRoleId": this.state.roleIdForward,
            // "toDepartmentId": this.state.departmentIdForward,
            // "toFacultyId": this.state.facultyIdForward,
            actionType: ActionType.AcknowledgeAndClose,
            userId: this.state.payLoad?.id,
        };
        postData("/Mailing/PostMailingAction", payload, (data) => {
            if (data == 200) {
                this.setState({ btn_loading: false, ack_forward: false, visible: false });
                this.openMessage("Mail Acknowledged successfully!");
                this.GetRoleMailing();
            }
        });
    };
    // changeText = (event) => {
    //     const target = event.target;
    //     const value = target.type === "checkbox" ? target.checked : target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value,
    //     });
    // };

    toggleAcknowledgeAndForward = (type) => {
        //    alert(type)
        this.setState({ action_type: type, roleFilterList: [] });
        if (type == ActionType.Forward) {
            this.setState({ action_title: "Foward Mail", isTransition: true });
        }
        if (type == ActionType.AcknowledgeAndFoward) {
            this.setState({ action_title: "Acknowledge and Forward", isTransition: true, action_type: ActionType.Acknowledge });
        }
        if (type == ActionType.RejectAndClose) {
            this.setState({ action_title: "Reject & Close", isTransition: false, action_type: ActionType.RejectAndClose, isRejectAndClose: true });
        }
        if (type == ActionType.ReturnToOriginator) {
            this.setState({ action_title: "Return to Originator's Desk", isReturnToOriginator: true });
        }
        if (!this.state.ack_forward) {
            this.setState({ ack_forward: true });
        } else {
            this.setState({
                ack_forward: false,
                isAcknowledgedAndForward: false,
                isForward: false,
                isReturnToOriginator: false,
                isRejectAndClose: false,
                isTransition: false,
                // roleIdForward:0
            });
        }
    };

    postForwardAction = () => {
        //alert("here")
        this.setState({ btn_loading: true });
        const payload = {
            mailingId: this.state.mailingId,
            isTransition: this.state.isTransition,
            comments: this.state.comments,
            toRoleId: parseInt(this.state.roleIdForward),
            toDepartmentId: parseInt(this.state.departmentIdForward),
            toFacultyId: parseInt(this.state.facultyIdForward),
            actionType: this.state.action_type,
            userId: this.state.payLoad?.id,
        };
        postData("/Mailing/PostMailingAction", payload, (data) => {
            if (data == 200) {
                this.setState({ btn_loading: false, ack_forward: false, visible: false });
                this.GetRoleMailing();
                this.openMessage("Action successful!");
            }
        });
    };
    inboxToggle = (value) => {
        this.setState({mailSelectionType:value})
        this.setState({ arc: false });
        if (value === "sent") {
            this.setState({ inboxMailing: [], box_loader: true });
            //get sent
            fetchData(`/Mailing/GetSentMail?userId=${this.state.payLoad?.id}`, (data) => {
                this.setState({ sentMailing: data, box_loader: false });
                console.log(data, "sent");
            });
        } 
        else if (value === "archived") {
            this.setState({ spin: true, click_status: 1, box_loader: true, archiveMailing: [], sentMailing: [], inboxMailing: [] });
            fetchData(`/Mailing/GetAllMailArchives`, (data) => {
                console.log(data, "arch");

                //this.setState({box_loader:false})

                this.setState({ archiveMailing: data, spin: false, box_loader: false, arc: true });
            });
        } 
        else {
            this.GetRoleMailing();
        }
    };
    handleFileTypeSort = (value) => {
        this.setState({ spin: true, click_status: 1, box_loader: true, archiveMailing: [], sentMailing: [], inboxMailing: [] });
        fetchData(`/Mailing/GetMailArchives?fileTypeId=${parseInt(value)}`, (data) => {
            //this.setState({box_loader:false})
            // fetchData(`/Mailing/GetMailArchives?fileTypeId=${parseInt(value)}&searchParam=${this.state.searchParam}&datePosted=${this.state.datePosted}`

            this.setState({ archiveMailing: data, spin: false, box_loader: false, arc: true });
        });
    };
handleMailDateFrom = (date, dateString) => {
    this.setState({searchDateFrom:dateString})
    
}
handleMailDateTo = (date, dateString) => {
    this.setState({searchDateTo:dateString})
    if(this.state.mailSelectionType.includes("sent")){
   
            fetchData(`/Mailing/SearchSentMail?userId=${this.state.payLoad?.id}&dateFrom=${this.state.searchDateFrom}&dateTo=${dateString}`, (data) => {           
                this.setState({ sentMailing: data, spin: false, box_loader: false, arc: true });
            });
     
    }
    else if(this.state.mailSelectionType.includes("archived")){
      
            fetchData(`/Mailing/GetMailArchives?dateFrom=${this.state.searchDateFrom}&dateTo=${dateString}`, (data) => {           
                this.setState({ archiveMailing: data, spin: false, box_loader: false, arc: true });
            });
        
        
    }
    else{
        fetchData(`/Mailing/SearchMailInbox?RoleId=${this.state.payLoad?.roleId}&DeptId=${this.state.staffPayLoad?.department?.id || 0}&FacultyId=${this.state.staffPayLoad?.department?.faculty?.id || 0}&staffId=${this.state.payLoad?.staffId}&dateFrom=${this.state.searchDateFrom}&dateTo=${dateString}
    `, (data) => {           
        // &dateFrom=${this.state.searchDateFrom || ""}&dateTo=${this.state.searchDateTo || ""}`, (data) => {           
        this.setState({ inboxMailing: data, spin: false, box_loader: false, arc: true });
    });
    }
}
    handleSearchMail = (value) => {
        this.setState({ spin: true, click_status: 1, box_loader: true, archiveMailing: [], sentMailing: [], inboxMailing: [] });
        if(this.state.mailSelectionType.includes("sent")){
           
                fetchData(`/Mailing/SearchSentMail?userId=${this.state.payLoad?.id}&searchParam=${value}`, (data) => {           
                    this.setState({ sentMailing: data, spin: false, box_loader: false, arc: true });
                });
            
            
        }
        else if(this.state.mailSelectionType.includes("archived")){
            // if(value == null || value == ""){
            //     this.GetRoleMailing();
            // }
        
                fetchData(`/Mailing/GetMailArchives?searchParam=${value}`, (data) => {           
                    this.setState({ archiveMailing: data, spin: false, box_loader: false, arc: true });
                });
            
            
        }
        else{
            if(value == null || value == ""){
                this.GetRoleMailing();
            }
            else{
                fetchData(`/Mailing/SearchMailInbox?RoleId=${this.state.payLoad?.roleId}&DeptId=${this.state.staffPayLoad?.department?.id || 0}&FacultyId=${this.state.staffPayLoad?.department?.faculty?.id || 0}&staffId=${this.state.payLoad?.staffId}&searchParam=${value}
            `, (data) => {           
                // &dateFrom=${this.state.searchDateFrom || ""}&dateTo=${this.state.searchDateTo || ""}`, (data) => {           
                this.setState({ inboxMailing: data, spin: false, box_loader: false, arc: true });
            });
            }
            
            
        }
        
        
    };
    toggleRecipient = (e) => {
        if (this.state.officeRecipient) {
            this.setState({ officeRecipient: false, staffSpecific: true });
        } else {
            this.setState({ officeRecipient: true, staffSpecific: false });
        }

        // this.setState({
        //     roleFilterList: [],
        //     staffSpecific: parseInt(e.target.value),
        // });
    };
    loadDepartment = () => {
        fetchData("/InstitutionDepartments", (data) => {
            this.setState({ departments: data });
        });
    };
    handleToggleCopy = () => {
        if (!this.state.toggleCopy) {
            this.setState({
                toggleCopy: true,
            });
        } else {
            this.setState({
                toggleCopy: false,
            });
        }
    };
    toggleCopy1 = () => {
        if (this.state.showCopy1) {
            this.setState({
                showCopy1: false,
            });
        } else {
            this.setState({
                showCopy1: true,
            });
        }
    };
    removeRecipient = (id) => {
        const { proposeArr } = this.state;
        //alert("hg")
        if (proposeArr.some((e) => e.id === id.id)) {
            lists = proposeArr.filter((x) => {
                return x.id !== id.id;
            });
            this.setState({ proposeArr: lists });
            console.log(this.state.proposeArr, "filtered");
        }
    };
    selectRole = (id) => {
        //alert(id.id);
        let lists;
        const { count, proposeArr, recipient } = this.state;
        let newMappedData = {
            name: this.state.recipient == 7 ? "HOD " + id.name : this.state.recipient == 5 ? "Dean " + id.name : this.state.recipient == 13 ? "Deputy Registrar " + id.name : id.name,

            action: (
                <button type="button" onClick={() => this.removeRecipient(id)} className="btn btn-outline-danger btn-sm">
                    <i className="fa fa-trash" />
                </button>
            ),
            id: id.id,
            roleId: parseInt(this.state.recipient),
        };

        if (proposeArr.some((e) => e.id === newMappedData.id)) {
            lists = proposeArr.filter((x) => {
                return x.id !== newMappedData.id;
            });
            this.setState({ proposeArr: lists });
            console.log(this.state.proposeArr, "filtered");
        } else {
            this.setState({
                proposeArr: [...proposeArr, newMappedData],
                count: count + 1,
            });
        }

        //proposeArr.push(id);

        //lists = this.state.proposeArr
        //  this.state.copyArray = lists;
        //    this.setState({copyArray: this.state.proposeArr})
        setTimeout(() => {
            console.log(proposeArr, "copy");
        }, 2000);

        console.log(`i just added ${id.name}`);
        //   console.log(this.state.proposeArr, "Propose");
    };
    appendStaffSignature = () => {
        this.setState({ load_signature: true, loading: true });

        fetchData(`/StaffAdditionalInfo/GetStaffSignatureByPin?signaturePin=${this.state.signaturePin}&staffId=${this.state.payLoad?.staffId}`, (data) => {
            console.log(data);
            if (data.includes("not found")) {
                this.setState({ signatureNotFound: true, load_signature: false, loading: false });
            } else {
                this.setState({ signatureUrl: data, load_signature: false, loading: false, signatureModal: false, signatureResolved: true });
            }
        });
    };
    showSignatureModal = () => {
        this.setState({ signatureModal: true });
    };
    getMailingFileType = () => {
        fetchData("/Mailing/GetMailingFileType", (data) => {
            this.setState({ fileTypes: data });
        });
    };
    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
              isMobile: b,
            });
          });
        window.scrollTo(0, 0);
        this.GetRoleMailing();
        this.loadRoles();
        this.loadCopyRoles();
        this.loadDepartment();
        this.getMailingFileType();
      
        // this.loadRoles();
        //this.GetDeartments();
    }
    // testLogin = () => {
    //     let payload = {
    //         "userName": "admin@elearn.com",

    //         "password": "1234567"

    //       }
    //     LoginRequest('/User/Authenticate', payload, data => {
    //         alert("Yes")
    //     })
    // }

    handleCopyRoles = (e) => {
        const { proposeArr } = this.state;
        this.setState({ recipient: e.target.value, loader_copy: true });
        if (e.target.value == Roles.Vice_Chancellor) {
            this.setState({ copyRoleFilterList: [] });
            let data = {
                roleId: parseInt(Roles.VC_IncomingMailOfficer),
                id: 0,
                name: "Vice Chancelor's Office",
            };
            let newMappedData = {
                name: data.name,

                action: (
                    <button type="button" onClick={() => this.removeRecipient(data)} className="btn btn-outline-danger btn-sm">
                        <i className="fa fa-trash" />
                    </button>
                ),
                id: data.id,
                roleId: data.roleId,
            };
            this.setState({
                proposeArr: [...proposeArr, newMappedData],
                loader_copy: false,
            });
            return;
        }
        if (e.target.value == Roles.PersonnelDocumentation || e.target.value == Roles.Personnel_Statistics || e.target.value == Roles.Personnel_Secretarial || e.target.value == Roles.VC_Secretary) {
            this.setState({ copyRoleFilterList: [] });
            let data = {
                roleId: parseInt(e.target.value),
                id: 0,
                name:
                    e.target.value == Roles.PersonnelDocumentation
                        ? "Personnel Documentation"
                        : e.target.value == Roles.Personnel_Statistics
                        ? "Personnel Statistics"
                        : e.target.value == Roles.PersonnelSaps
                        ? "Personnel Saps"
                        : e.target.value == Roles.VC_Secretary
                        ? "Secretary to the VC"
                        : null,
            };
            let newMappedData = {
                name: data.name,

                action: (
                    <button type="button" onClick={() => this.removeRecipient(data)} className="btn btn-outline-danger btn-sm">
                        <i className="fa fa-trash" />
                    </button>
                ),
                id: data.id,
                roleId: data.roleId,
            };
            this.setState({
                proposeArr: [...proposeArr, newMappedData],
                loader_copy: false,
            });
            return;
        }
        fetchData(`/Mailing/FilterByRole?roleId=${parseInt(e.target.value)}`, (data) => {
            console.log(data, "ROle Filters");
            let _data = data;
            if (data.length > 0) {
                if (proposeArr.length > 0) {
                    for (let i = 0; i < proposeArr.length; i++) {
                        // let _filtered = _data.filter(item => item.name !== proposeArr[i].name)
                        let _filtered = _data.filter((item) => !proposeArr[i].name.includes(item.name));
                        _data = _filtered;
                    }
                }

                this.setState({
                    loader_copy: false,
                    copyRoleFilterList: _data,
                });
            } else {
                this.setState({ loader_copy: false, copyRoleFilterList: [] });
            }
        });
    };
    onSearchCopy = (data) => {
        const { proposeArr } = this.state;
        console.log("onSelect", data);
        var fetchStaff = this.state.options.filter((x) => {
            return x.staffDetail === data;
        });
        if (fetchStaff != null) {
            this.setState({ staffIdToSend: fetchStaff[0].staffId });
            let _data = {
                roleId: "",
                id: fetchStaff[0].staffId,
                name: fetchStaff[0].staffDetail,
                action: (
                    <button type="button" onClick={() => this.removeRecipient(fetchStaff[0])} className="btn btn-outline-danger btn-sm">
                        <i className="fa fa-trash" />
                    </button>
                ),
            };
            this.setState({
                proposeArr: [...proposeArr, _data],
            });
            // this.clearSelected()
        }

        setTimeout(() => {
            console.log("State", this.state.staffIdToSend);
            console.log("Fetched Staff", fetchStaff);
        }, 1500);
    };
    onSearchSelect = (data) => {
        const { proposeArr } = this.state;
        console.log("onSelect", data);
        var fetchStaff = this.state.options.filter((x) => {
            return x.staffDetail === data;
        });
        if (fetchStaff != null) {
            this.setState({ staffIdToSend: fetchStaff[0].staffId });
           
        }

        setTimeout(() => {
            console.log("State", this.state.staffIdToSend);
            console.log("Fetched Staff", fetchStaff);
        }, 1500);
    };
    clearSelected = () => {
        // this line will clear the select
        // when you click on the button
        $("#atc").val("mi");
    };
    onSearchChange = (data) => {
        console.log(data);
    };
   
    onSearch = (searchText) => {
        console.log(searchText);
        fetchData(`/Mailing/SearchRecipient?search=${searchText}`, (data) => {
            console.log(data, "serc");
            this.setState({
                options: data,
            });
        });
    };
    handleComposeFileType = (value) => {
        this.setState({
            composeFileTypeId: parseInt(value),
        });
    };
    
    
    handleDateRange = (dates, dateStrings) => {
        console.log("From: ", dates[0], ", to: ", dates[1]);
        console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    };
    toggleMailType = (e) => {
        console.log(e.target.value)
        if(e.target.value.includes("Confidential")){
        this.setState({
            isConfidential:true,
            confidential_prompt:true
        })
    }
    else{
        this.setState({
            isConfidential:false,
            //confidential_prompt:true
        })
    }
}
toggleArchiveModal = () => {
    this.setState({archiveModal:true})
}
handleArchiveMail = () =>{
    const payload = {
        "mailingId": this.state.mailingId || this.state.sentMailingId,
        "fileTypeId": this.state.composeFileTypeId,
        "userId": this.state.payLoad?.id
      }
    postData('/Mailing/ArchiveMail', payload, data => {
        if(data == StatusCodes.Created){
            this.setState({archiveModal:false})
            this.openMessage("Archived Successfully")
        }
        else{
            this.setState({alreadyArchived:true})
        }
        
    })
}
hideOption = () => {
    var gd = document.getElementById("op-div");
    gd.style.display = 'none'
}
toggleIncomingForward = () => {
    this.setState({routeSecretaryConfirm : true})
}
handleSecretaryRoute = () => {
    this.setState({ btn_loading: true, routeSecretaryConfirm:false });
    const payload = {
        mailingId: this.state.mailingId,
        isTransition: true,
        comments: "",
        toRoleId: Roles.VC_Secretary,
        //toDepartmentId: parseInt(this.state.departmentIdForward),
        //toFacultyId: parseInt(this.state.facultyIdForward),
        actionType: ActionType.Forward,
        //userId: this.state.payLoad?.id,
    };
    postData("/Mailing/PostMailingAction", payload, (data) => {
        if (data == 200) {
            this.setState({ btn_loading: false});
            this.GetRoleMailing();
            this.openMessage("Action successful!");
        }
    });
}

    render() {
        const { RangePicker } = DatePicker;
        require("../../../assets/memo-int.css");
        require("antd/dist/antd.css");
        let screen_width = $(window).width();

        const { recipient, proposeArr, isMobile } = this.state;
        const avi = "https://thumbs.dreamstime.com/b/user-icon-vector-male-person-symbol-profile-circle-avatar-sign-user-icon-vector-male-person-symbol-profile-circle-avatar-sign-115922528.jpg";
        return (
            <>
                {/* <button onClick={this.testLogin}>Click</button> */}
                {this.state.ack_close ? (
                    <SweetAlert warning showCancel confirmBtnText="Confirm" confirmBtnBsStyle="primary" title="Are you sure?" onConfirm={this.handleAcknowledgeAndClose} onCancel={() => this.setState({ ack_close: false })} focusCancelBtn>
                        Acknowledge & Close Mail?
                    </SweetAlert>
                ) : null}
                   {this.state.routeSecretaryConfirm ? (
                    <SweetAlert warning showCancel confirmBtnText="Confirm" confirmBtnBsStyle="primary" title="Confirm Action" onConfirm={this.handleSecretaryRoute} onCancel={() => this.setState({ routeSecretaryConfirm: false })} focusCancelBtn>
                        Routing to the VC's Secretary. Are you sure?
                    </SweetAlert>
                ) : null}

                {this.state.ack ? (
                    <SweetAlert warning showCancel confirmBtnText="Confirm" confirmBtnBsStyle="primary" title="Are you sure?" onConfirm={this.confirmSubmission} onCancel={() => this.setState({ ack: false })} focusCancelBtn>
                        Acknowledge Mail?
                    </SweetAlert>
                ) : null}

{this.state.confidential_prompt ? (
                    <SweetAlert info title="Confidentiality Notice" onConfirm={() => this.setState({confidential_prompt:false})} 
                    >
                        You have indicated that you want this mail to maintain confidentiality. Kindly undersand that all confidential Mails are automatically and directly routed to the <b>Secretary to the VC's</b> desk. Click OK to continue
                    </SweetAlert>
                ) : null}

                {/* {this.state.forward_succ ? (
                    <SweetAlert success title="Success!" onConfirm={() => this.setState({ forward_succ: false })}>
                        Operation Successful!
                    </SweetAlert>
                ) : null} */}

                {this.state.field_err ? (
                    <SweetAlert error title="Error!" onConfirm={() => this.setState({ field_err: false })}>
                        Required fields are not to be left empty!
                    </SweetAlert>
                ) : null}

                {this.state.err_pop ? (
                    <SweetAlert error title="Error!" onConfirm={() => this.setState({ err_pop: false })}>
                        Oops Something went wrong, please try again!
                    </SweetAlert>
                ) : null}
                {this.state.signatureNotFound ? (
                    <SweetAlert error title="Not Found!" onConfirm={() => this.setState({ signatureNotFound: false })}>
                        Signature could not be retrieved. Ensure that the pin provided is correct.
                    </SweetAlert>
                ) : null}
                {this.state.alreadyArchived ? (
                    <SweetAlert error title="Already Archived!" onConfirm={() => this.setState({ alreadyArchived: false })}>
                        Mail already archived
                    </SweetAlert>
                ) : null}

                {this.state.mailPosted ? (
                    <SweetAlert success title="Posted!" onConfirm={() => this.setState({ mailPosted: false })}>
                        Mail posted successfully!
                    </SweetAlert>
                ) : null}

                <Modal
                    title={this.state.action_title}
                    visible={this.state.ack_forward}
                    onOk={""}
                    onCancel={this.toggleAcknowledgeAndForward}
                    footer={[
                        <Button key="back" onClick={() => this.setState({ ack_forward: false })}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.btn_loading} onClick={this.postForwardAction}>
                            Send &nbsp; <i className="fa fa-send" />
                        </Button>,
                        ,
                    ]}
                >
                    <Form layout="vertical">
                        {!this.state.isReturnToOriginator && !this.state.isRejectAndClose ? (
                            <>
                            
                            <Row gutter={16}>
                            <div className="col-md-12 col-sm-12">
                            <label for="sel1">Select Role</label>
                                    <select className="form-control" placeholder="Select Office/Role" name="roleIdForward" onChange={this.handleRoleForward}>
                                        <option value="0">Select Role</option>
                                        {this.state.mappedRoles &&
                                            this.state.mappedRoles.map((i, r) => {
                                                return <option value={i.id}>{i.name}</option>;
                                            })}
                                    </select>
                                    <br/>
                             
                            </div>
                           
                                {/* <Col span={24}>
                                    <Form.Item placeholder="Select Role" name="recipient" label="Role" rules={[{ required: true, message: "Please select an owner" }]}>
                                        <Select placeholder="Select Role" name="roleIdForward" onChange={this.handleRoleForward}>
                                            <Option value="0">Select Role</Option>
                                            {this.state.mappedRoles &&
                                                this.state.mappedRoles.map((i, r) => {
                                                    return <Option value={i.id}>{i.name}</Option>;
                                                })}
                                        </Select>
                                    </Form.Item>
                                </Col> */}
                                {this.state.role_loader ? <img src={loading_gif} style={{ width: "60px", height: "60px" }} /> : null}
                                {this.state.roleFilterList.length > 0 &&
                                this.state.roleIdForward != Roles.Dean &&
                                this.state.roleIdForward != Roles.Vice_Chancellor &&
                                this.state.roleIdForward != Roles.VC_Secretary &&
                                this.state.roleIdForward != Roles.VC_OutgoingMailOfficer ? (
                                    <div className="col-lg-12 col-sm-12">
                                             <label for="sel1">Select Office/Department</label>
                                                <select placeholder="Select Office" className="form-control" name="departmentIdForward" defaultValue="private" onChange={this.handleOfficeSelect}>
                                                    <option value="private">Select Department</option>
                                                    {this.state.roleFilterList &&
                                                        this.state.roleFilterList.map((i, t) => {
                                                            return <option value={i.id}>{i.name}</option>;
                                                        })}
                                                </select>
                            <br/>
                                            
                                        </div>
                                ) : null}

                                {this.state.roleFilterList.length > 0 && this.state.roleIdForward == Roles.Dean ? (
                                   <div className="col-lg-12 col-sm-12">
                                   <label for="sel1">Select Office/Faculty</label>
                                        <select className="form-control" placeholder="Select Office" name="ack_foward_office" onChange={this.handleFacultySelect}>
                                            <option value="private">Select Faculty</option>
                                            {this.state.roleFilterList &&
                                                this.state.roleFilterList.map((i, t) => {
                                                    return <option value={i.id}>{i.name}</option>;
                                                })}
                                        </select>
                            <br/>
                                
                                </div>
                                ) : null}

                                {/* {this.state.roleIdForward == Roles.Dean ? <Col span={24}>
                                <Form.Item name="type" label="Fculty">
                                    <Select placeholder="Choose Faculty" name="ack_foward_office" onChange={this.handleFacultyForward}>
                                        <Option value="private">Private</Option>
                                        <Option value="public">Public</Option>
                                    </Select>
                                </Form.Item>
                            </Col> : null} */}
                            </Row>
                            </>
                        ) : null}

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="comments"
                                    label="Comments (Optional)"
                                    // onChange={this.changeText}
                                >
                                    <Input.TextArea rows={4} placeholder="Enter Comments Here..." onChange={this.changeComment} />
                                </Form.Item>
                            </Col>
                        </Row>
              
                    </Form>
                   
                </Modal>
                
                <Modal
                    title={"Archive Mail"}
                    visible={this.state.archiveModal}
                    onOk={""}
                    onCancel={() => this.setState({ archiveModal: false })}
                    footer={[
                        <Button key="back" onClick={() => this.setState({ signatureModal: false })}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.btn_loading} onClick={this.handleArchiveMail}>
                            Save &nbsp; <i className="fa fa-send" />
                        </Button>,
                        ,
                    ]}
                >
                    <Form layout="vertical">
                    <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item placeholder="Select File Type" name="recipient" label="File Type" rules={[{ required: true, message: "Please select" }]}>
                                    <Select placeholder="Select File Type" name="file_type" onChange={this.handleComposeFileType}>
                                        {/* <Option value="private">Select </Option> */}
                                        {/* <Option value="inbox">Sort By File Type</Option> */}
                                        {this.state.fileTypes &&
                                            this.state.fileTypes.map((x) => {
                                                return <Option value={x.id}>{x.title}</Option>;
                                            })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                <Modal
                    title={this.state.action_title}
                    visible={this.state.signatureModal}
                    onOk={""}
                    onCancel={() => this.setState({ signatureModal: false })}
                    footer={[
                        <Button key="back" onClick={() => this.setState({ signatureModal: false })}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.btn_loading} onClick={this.appendStaffSignature}>
                            Retrieve Signature &nbsp; <i className="fa fa-send" />
                        </Button>,
                        ,
                    ]}
                >
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="Signature Pin"
                                    // onChange={this.changeText}
                                >
                                    <input className="form-control" type="password" placeholder="Enter Signature Pin Here..." name="signaturePin" onChange={this.changeText} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>

                <Drawer
                    title={this.state.sentTitle}
                    width={screen_width > 700 ? 800 : 330}
                    onClose={this.onClose}
                    visible={this.state.showSent}
                    // visible={true}
                    bodyStyle={{ paddingBottom: 80 }}
                    placement={"right"}
                    footer={
                        <div
                            style={{
                                textAlign: "right",
                            }}
                        >
                            <Button onClick={this.toggleArchiveModal} type="default" loading={this.state.btn_loading}>
                                Archive Mail<i className="fa fa-pdf" />
                            </Button>
                            &nbsp;
                            &nbsp;
                            <Button onClick={this.exportPDF} type="primary" loading={this.state.btn_loading}>
                                Export(PDF) <i className="fa fa-pdf" />
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <div className="sent-view">
                        <center>
                            <div className="col-sm-4 text-center">
                                <img src={newLogo} style={{ width: "70px" }} />
                            </div>
                        </center>
                        <div className="row">
                            <div className="col-lg-7 col-sm-12">
                                <p className="sofia">
                                    <b>File Name: </b> {this.state.fileName}
                                </p>
                                <p className="sofia">
                                    <b>File Number: </b> {this.state.fileNumber}
                                </p>
                                {/* <p style={{ fontSize: "14px" }}>
                                To: <b>The   {this.state.payLoad?.roleId == Roles.HOD || this.state.payLoad?.roleId == Roles.DeputyRegistrar ? <b className="sofia">Department of {this.state.staffPayLoad?.department?.name}</b> : this.state.payLoad?.roleId == Roles.Dean ? <b className="sofia">Faculty of {this.state.staffPayLoad?.department?.faculty.name}</b> : <b className="sofia">{this.state.payLoad?.role}</b>}</b>
                            </p> */}
                            </div>
                            <div className="col-lg-5 col-sm-12">
                                <h3>Mailing/Memo</h3>
                                <p style={{ fontSize: "14px" }}>
                                    {/* Originator: <b>{this.state.originator}</b> */}
                                    Originator: <b>Self</b>
                                </p>
                                <p style={{ fontSize: "14px" }}>
                                    Date: <b>{this.state.sentDateEntered}</b>
                                    {/* Date: <b>{this.state.datePosted != null ? this.state.datePosted.substring(0, 10) : "-"}</b> */}
                                </p>
                            </div>
                        </div>

                        <Row gutter={16}>
                            <Col span={24}>
                                <center>
                                    <br />
                                    <br />
                                    {/* <h4 className="text-center">{this.state.title}</h4> */}
                                    <h4 className="text-center">{this.state.sentTitle}</h4>

                                    <br />

                                    {/* <p>{this.state.body}</p> */}
                                    <p className="text-left">{this.state.sentBody}</p>
                                </center>
                            </Col>
                        </Row>

                        {this.state.sentAttachment != null ? (
                            <Row gutter={16}>
                                <br />
                                <br />
                                <br />
                                <Col span={20}>
                                    {/* <a href={this.state.memoAttachment} className="btn btn-warning btn-sm" target="_blank"> */}
                                    <a href={this.state.sentAttachment} className="btn btn-outline-default btn-sm" target="_blank">
                                        <i className="fa fa-eye" /> View Attachment
                                    </a>
                                </Col>
                            </Row>
                        ) : null}
                        <br />
         

                        <>
                            {this.state.sentSignatureUrl ? (
                                <>
                                    <QueueAnim>
                                        {" "}
                                        <div key="1">
                                            <img className="img-bw" src={this.state.sentSignatureUrl} />
                                            <p>
                                            <b>{this.state.originatorName}</b>
                                            </p>
                                        </div>
                                    </QueueAnim>{" "}
                                </>
                            ) : null}
                            <Row gutter={16}>
                                <Col span={24}>
                                    {this.state.status_loader ? <img src={loading_gif} style={{ width: "40px", height: "40px" }} /> : null}
                                    Current Desk: <b>{this.state.sent_mail_status?.currentDeskName}</b>
                                    <p>
                                        Mail Status:{" "}
                                        {!this.state.sentIsClosed && !this.state.sentIsAcknowledged && !this.state.sentIsRejected ? (
                                            <span className="badge badge-info">Processing</span>
                                        ) : this.state.sentIsRejected ? (
                                            <span className="badge badge-danger">Rejected</span>
                                        ) : this.state.sentIsAcknowledged ? (
                                            <span className="badge badge-success">Acknowledged</span>
                                        ) : null}
                                    </p>
                                </Col>
                            </Row>
                            <br />
                            <br />
                        </>
                        </div>
                    </Form>
                </Drawer>
                
                <div id="mybutton">
                <button className="btn btn-primary feedback text-white sofia" onClick={() => this.setState({ compose: true })} className="feedback">
                   Compose &nbsp; <i className="fa fa-edit text-white"/>
                    </button>
                
{/* <button class="feedback">Feedback</button> */}
</div>
                <Drawer
                    title={
                        <Row gutter={16}>
                            <Col span={12}>
                            <span>
                            Compose Mail &nbsp;
                            <i className="fa fa-envelope" />
                        </span>
                            </Col>
                        <Col span={10}>
                        <Badge count={proposeArr.length > 0 ? proposeArr.length+1 : null} style={{padding:'-4px', width:'30px', height:'30px' }}/>
                        </Col>
                       
                        </Row>
                    }
                    width={screen_width > 700 ? 770 : 350}
                    onClose={this.onClose}
                    visible={this.state.compose}
                    // visible={true}
                    bodyStyle={{ paddingBottom: 80 }}
                    placement={"right"}
                    footer={
                        <div
                            style={{
                                textAlign: "right",
                            }}
                        >
            
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button onClick={this.postMail} type="primary" loading={this.state.btn_loading}>
                                Send <i className="fa fa-send" />
                            </Button>
                       
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <center>
                            <br />
                            <div className="col-sm-4 text-center">
                                <img src={newLogo} style={{ width: "70px" }} />
                            </div>
                            <b className="sofia">NNAMDI AZIKIWE UNIVERSITY ADMINISTRATIVE MAILING SYSTEM</b>
                            <br/>
                            <br/>
                            <p>
                                {/* <b>UNIZIKMail</b> */}
                            </p>
                            {/* <p style={{ marginTop: "-15px" }}>
                          <b>AWKA</b>
                        </p>
                        <b className="sofia">Internal Memorandum</b> */}
                        </center>
                        <Row gutter={16}>
                            <Col span={screen_width > 700 ? 6 : 24}>
                                <p className="sofia">Confidentiality Status: </p>
                            </Col>
                            <Col span={screen_width > 700 ? 14 : 24}>
                                <Radio.Group defaultValue="Non-confidential" buttonStyle="outline" onChange={this.toggleMailType}>
                                    <Radio.Button value="Non-confidential">Non-confidential</Radio.Button>
                                    <Radio.Button value="Confidential">Confidential</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="tit" label="Title" rules={[{ required: true }]}>
                                    <Input placeholder="Enter Title" name="title" onChange={this.handleMailTitle} />
                                </Form.Item>
                            </Col>
                            {/* <Col span={24}>
                                <Form.Item name="offi" label="Office" rules={[{ required: true }]}>
                                    <Input
                                        defaultValue={
                                            this.state.payLoad?.roleId == Roles.SuperAdmin
                                                ? "Office Of The Vice Chancellor"
                                                : this.state.payLoad?.roleId == Roles.HOD
                                                ? "Office of the H.O.D"
                                                : this.state.payLoad?.roleId == Roles.DeputyRegistrar
                                                ? "Office of the Deputy Registrar"
                                                : this.state.payLoad?.roleId == Roles.Dean
                                                ? "Office of the Dean"
                                                : this.state.payLoad?.roleId == Roles.Vice_Chancellor
                                                ? "Office of the Vice Chancellor"
                                                : null
                                        }
                                        disabled
                                    />
                                </Form.Item>
                            </Col> */}
                        </Row>
                {!this.state.isConfidential ? <>
                    
                {screen_width > 700 ? <><label for="sel1">File Type</label><select className="form-control" name="composeFileTypeId" onChange={this.changeText}>
                    <option>Select File Type</option>
                    {this.state.fileTypes &&
                             this.state.fileTypes.map((x) => {
                                return (
                                    <option className="" value={x.id}>{x.title.length > 80 ? x.title.substring(0,80) + "..." : x.title}</option>
                                   )
                     })}
                </select></> : <><select className="form-control" name="composeFileTypeId" onChange={this.changeText}>
                    <option>Select File Type</option>
                    {this.state.fileTypes &&
                             this.state.fileTypes.map((x) => {
                                return (
                                    <option className="" value={x.id}>{x.title.length > 30 ? x.title.substring(0,30) + "..." : x.title}</option>
                                   )
                     })}
                </select></>}

                        {/* <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item placeholder="Select File Type" name="recipient" label="File Type" rules={[{ required: true, message: "Please select" }]}>
                                    <Select placeholder="Select File Type" name="file_type" onChange={this.handleComposeFileType}>
                                      
                                        {this.state.fileTypes &&
                                            this.state.fileTypes.map((x) => {
                                                return <Option value={x.id}>{x.title}</Option>;
                                            })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row> */}
                        <hr />
                        <h4 className="sofia">Recipient</h4>
                        {/* <Row gutter={16}>
                            <Col span={12}>
                              <p>To : &nbsp;
                              <Radio.Group defaultValue="2" buttonStyle="solid" onChange={this.toggleRecipient}>
                                <Radio.Button value="2">General</Radio.Button>
                                <Radio.Button value="1">Specific Staff</Radio.Button>
                            </Radio.Group>
                              </p>
                            </Col>
                            </Row> */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Radio.Group defaultValue="general" buttonStyle="solid" onChange={this.toggleRecipient}>
                                    <Radio.Button value="general">Office</Radio.Button>
                                    <Radio.Button value="specific">Specific Staff</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <br />
                        {/* General Recipient section */}
                        {this.state.officeRecipient ? (
                            <>
                                {" "}
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                    <label for="sel1">Select Role</label>
                                            <select className="form-control" placeholder="Select Office/Role" name="roleIdForward" onChange={this.handleRoleForward}>
                                                <option value="0">Select Role</option>
                                                {this.state.mappedRoles &&
                                                    this.state.mappedRoles.map((i, r) => {
                                                        return <option value={i.id}>{i.name}</option>;
                                                    })}
                                            </select>
                                     
                                    </div>
<br/>
                                    {this.state.role_loader ? <img src={loading_gif} style={{ width: "50px", height: "50px" }} /> : null}
                                    {this.state.roleFilterList.length > 0 &&
                                    this.state.roleIdForward != Roles.Dean &&
                                    this.state.roleIdForward != Roles.Vice_Chancellor &&
                                    this.state.roleIdForward != Roles.VC_Secretary &&
                                    this.state.roleIdForward != Roles.VC_OutgoingMailOfficer ? (
                                        <div className="col-md-6 col-sm-12">
                                             <label for="sel1">Select Office/Department</label>
                                                <select placeholder="Select Office" className="form-control" name="departmentIdForward" defaultValue="private" onChange={this.handleOfficeSelect}>
                                                    <option value="private">Select Department</option>
                                                    {this.state.roleFilterList &&
                                                        this.state.roleFilterList.map((i, t) => {
                                                            return <option value={i.id}>{i.name}</option>;
                                                        })}
                                                </select>
                                            
                                        </div>
                                        
                                    ) : null}
<br/>
                                    {this.state.roleFilterList.length > 0 && this.state.roleIdForward == Roles.Dean ? (
                                       <div className="col-md-6 col-sm-12">
                                           <label for="sel1">Select Office/Faculty</label>
                                                <select className="form-control" placeholder="Select Office" name="ack_foward_office" onChange={this.handleFacultySelect}>
                                                    <option value="private">Select Faculty</option>
                                                    {this.state.roleFilterList &&
                                                        this.state.roleFilterList.map((i, t) => {
                                                            return <option value={i.id}>{i.name}</option>;
                                                        })}
                                                </select>
                                        
                                        </div>
                                    ) : null}
                                </div>{" "}
                            </>
                        ) : (
                            <>
                                <Row gutter={16}>
                                    <Col span={screen_width > 700 ? 12 : 24}>
                                        <label className="label-control">
                                            <small style={{ color: "green" }}>Search Keywords: Staff Name, Staff Number, Department</small>
                                        </label>
                                        
                                        <AutoComplete
                                            style={{
                                                width: screen_width > 700 ? 400 : 200,
                                            }}
                                            id="atc"
                                            allowClear={true}
                                            onSearch={this.onSearch}
                                            onSelect={this.onSearchSelect}
                                            placeholder="Search Recipient..."
                                        >
                                            {this.state.options &&
                                                this.state.options.map((i) => (
                                                  
                                                    <Option key={i.staffId} value={i.staffDetail}>
                                                        {i.staffDetail}
                                                    </Option>
                                                 
                                                ))}
                                        </AutoComplete>
                                       
                                    </Col>
                                </Row>
                                <br />
                                <br />
                            </>
                        )}
                        <br/>
                        <br/>
                           <Row gutter={16}>
                            <Col span={screen_width > 700 ? 4 : 24}>Copy?</Col>
                            <Col span={screen_width > 700 ? 8 : 24}>
                                <Switch checked={this.state.showCopy} checkedChildren={"No"} unCheckedChildren={"Yes"} onChange={this.handleToggleCopy} />
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={16}>
                            <Col span={24}>
                                {this.state.toggleCopy ? (
                                    <>
                                        <br />
                                        <h4>Copy List</h4>
                                        <p>
                                            {proposeArr &&
                                                proposeArr.map((x, i) => {
                                                    return (
                                                        <QueueAnim>
                                                            <small key={x.id}>
                                                                <span class="justify-content-between align-items-center">
                                                                    {x.name}
                                                                    <span style={{ cursor: "pointer" }} onClick={() => this.removeRecipient(x)} class="">
                                                                        &nbsp; <i className="fa fa-trash" />
                                                                    </span>
                                                                </span>
                                                            </small>
                                                        </QueueAnim>
                                                    );
                                                })}
                                        </p>
                                    </>
                                ) : null}
                            </Col>
                        </Row>
            </> : 
             <Col span={24}>
             <Form.Item name="conf-rec" label="Recipient" rules={[{ required: true }]}>
                 <Input
                     defaultValue={"Office of the Vice Chancelor"}
                     disabled
                 />
             </Form.Item>
         </Col>
            }
                        {/* Staff Specific section*/}
                        {/* {this.state.staffSpecific == 1 ? <Row>
                            <Col span={12}>
                                <Form.Item placeholder="Select Department" name="recipient" label="Department" rules={[{ required: true, message: "Please select an owner" }]}>
                                    <Select placeholder="Select Deparment" name="roleIdForward" onChange={this.handleStaffDepartmentSelect}>
                                        <Option value="0">Select Department</Option>
                                        {this.state.departments && this.state.departments.map((i, r) => {
                                            return(
                                                <Option value={i.id}>{i.name}</Option>
                                            )
                                        })}
                                        
                                    </Select>
                                </Form.Item>
                            </Col>
                            {this.state.role_loader ? <img src={loading_gif} style={{width:'50px', height:'50px'}}/> : null}
                            {this.state.roleFilterList && this.state.roleFilterList.length > 0 && this.state.roleIdForward != Roles.Dean 
                            ? <Col span={12}>
                                <Form.Item name="type" label="Department">
                                    <Select placeholder="Select Office" name="ack_foward_office" defaultValue="private" onChange={this.handleStaffDepartmentSelect}>
                                        <Option value="private">Select Department</Option>
                                        {this.state.roleFilterList && this.state.roleFilterList.map((i, t) => {
                                            return(
                                                <Option value={i.id}>{i.name}</Option>
                                            )
                                        })}
                                        
                                    </Select>
                                </Form.Item>
                            </Col> : null}

                      

                          
                            {this.state.staffFilterList.length > 0 ? <Col span={12}>
                                <Form.Item name="type" label="Staff List" >
                                    <Select placeholder="Select Staff" defaultValue="private" name="ack_foward_office" onChange={this.setStaffId}>
                                        <Option value="private">Select Staff</Option>
                                        {this.state.staffFilterList && this.state.staffFilterList.map((i, t) => {
                                            return(
                                                <Option value={i.staffId}>{i.staffDetail}</Option>
                                            )
                                        })}
                                        
                                    </Select>
                                </Form.Item>
                            </Col> : null}
                    
                     </Row> : null} */}

                        {/* <Row gutter={16}>
                           
<Col span={8}>
                            <Switch
        checked={this.state.showCopy1}
        onChange={this.toggleCopy1}
      />
      
      </Col>


                            </Row>
                         */}
                     
                        <Row gutter={16}>
                            {this.state.toggleCopy ? (
                                <QueueAnim>
                                    <div key="1">
                                        <Col span={24}>
                                            <Radio.Group value={recipient} onChange={this.handleCopyRoles}>
                                                {this.state.mappedCopyRoles &&
                                                    this.state.mappedCopyRoles.map((x, i) => {
                                                        return (
                                                            <>
                                                                <Radio.Button value={x.id}>{x.name}</Radio.Button>
                                                            </>
                                                        );
                                                    })}
                                            </Radio.Group>
                                        </Col>
                                    </div>
                                    <div key="2">
                                        <Col span={24}>
                                            <label className="label-control">
                                                <small style={{ color: "green" }}>Search Keywords: Staff Name, Staff Number, Department</small>
                                            </label>
                                            <br />
                                            <AutoComplete
                                                style={{
                                                    width: screen_width > 700 ? 400 : 220,
                                                }}
                                                id="atc"
                                                allowClear={true}
                                                onSearch={this.onSearch}
                                                onSelect={this.onSearchCopy}
                                                placeholder="Search Recipient..."
                                            >
                                                {this.state.options &&
                                                    this.state.options.map((i) => (
                                                        <Option key={i.staffId} value={i.staffDetail}>
                                                            {i.staffDetail}
                                                        </Option>
                                                    ))}
                                            </AutoComplete>
                                        </Col>
                                    </div>
                                </QueueAnim>
                            ) : null}
                        </Row>
                        <br />
                        <br />
                        {this.state.loader_copy ? <img src={loading_gif} style={{ width: "40px", height: "40px" }} /> : null}

                        {this.state.toggleCopy ? (
                            <Row gutter={16}>
                                <QueueAnim>
                                    <div key="1">
                                        <Col span={24}>
                                            <div id="role-sec">
                                                {this.state.copyRoleFilterList &&
                                                    this.state.copyRoleFilterList.map((r, i) => {
                                                        return (
                                                            <div className="mt-3">
                                                                <div class="form-check">
                                                                    <button class="btn btn-success btn-sm" type="button" onClick={() => this.selectRole(r)} id={r.id}>
                                                                        &nbsp;
                                                                        <i className="fa fa-plus" />
                                                                    </button>
                                                                    <label class="form-check-label sofia" for="flexCheckDefault">
                                                                        {r.name}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </Col>
                                    </div>
                                </QueueAnim>
                            </Row>
                        ) : null}

                        {/* <Row gutter={16}>
                            
                            <br />
                            <br />
                            {this.state.toggleCopy ? (
                                <ul class="list-group col-md-10 mt-3">
                                    <br />
                                    <h3>Copy List</h3>
                                    <br />
                                    {proposeArr &&
                                        proposeArr.map((x, i) => {
                                            return (
                                                <QueueAnim>
                                                    <div key={x.id}>
                                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                                            {x.name}
                                                            <span onClick={() => this.removeRecipient(x)} class="btn btn-danger btn-sm">
                                                                <i className="fa fa-trash" />
                                                            </span>
                                                        </li>
                                                    </div>
                                                </QueueAnim>
                                            );
                                        })}
                                </ul>
                            ) : null}
                           
                        </Row> */}

                        <hr />
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="attachment" label="Add Attachment" rules={[{ required: true, message: "Please choose the approver" }]}>
                                    <Upload onChange={this.onChange} customRequest={this.dummyRequest} beforeUpload={beforeUpload} onChange={this.onChangeAttachment} name="file" maxCount={1}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="message"
                                    label="Message"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="Enter Message Here..." onChange={this.handleComposeMail} />
                                    {this.state.post_loader ? <img src={loading_gif} style={{ width: "50px", height: "50px" }} /> : null}
                                </Form.Item>
                            </Col>
                            {!this.state.signatureResolved ? (
                                <Col span={24}>
                                    <button type="button" className="btn btn-outline-success btn-sm" onClick={this.showSignatureModal}>
                                        Append Signature
                                    </button>
                                </Col>
                            ) : null}
                            {this.state.load_signature ? <img src={loading_gif} style={{ width: "50px", height: "50px" }} /> : null}
                            {this.state.signatureUrl ? (
                                <>
                                    <QueueAnim>
                                        {" "}
                                        <div key="1">
                                            <img className="img-bw" src={this.state.signatureUrl} style={{ width: "150px", height: "150px" }} />
                                        </div>
                                    </QueueAnim>{" "}
                                </>
                            ) : null}
                        </Row>
                    </Form>
                </Drawer>

                <Drawer
                    title={this.state.displayTitle}
                    width={screen_width > 700 ? 750 : 320}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    // visible={true}
                    bodyStyle={{ paddingBottom: 80 }}
                    placement={"right"}
                    footer={
                        <div
                            style={{
                                textAlign: "right",
                            }}
                        >
                             <Button onClick={this.toggleArchiveModal} type="default" loading={this.state.btn_loading}>
                                Archive Mail<i className="fa fa-pdf" />
                            </Button>
                            &nbsp;
                            &nbsp;
                            <Button onClick={this.exportPDF} type="primary" loading={this.state.btn_loading}>
                                Export(PDF) <i className="fa fa-pdf" />
                            </Button>
                           
                           
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark id="">
                    <div className="sent-view">
                        <center>
                            <div className="col-sm-4 text-center">
                                <img src={newLogo} style={{ width: "70px" }} />
                            </div>
                            <br/>
                            {this.state.confidentialityMail ? <span className="badge badge-danger">Confidential</span> : null}
                        </center>
                       <br/>
                        <div className="row">
                            <div className="col-lg-7 col-sm-12">
                                <p className="sofia">
                                    File Name: <b>{this.state.displayFileName}</b>
                                </p>
                                <p className="sofia">
                                    File Number: <b>{this.state.displayFileNumber}</b>
                                </p>
                                <p style={{ fontSize: "14px" }}>
                                    To:{" "}
                                    <b>
                                        The{" "}
                                        {this.state.payLoad?.roleId == Roles.HOD || this.state.payLoad?.roleId == Roles.DeputyRegistrar ? (
                                            <b className="sofia">Department of {this.state.staffPayLoad?.department?.name}</b>
                                        ) : this.state.payLoad?.roleId == Roles.Dean ? (
                                            <b className="sofia">Faculty of {this.state.staffPayLoad?.department?.faculty.name}</b>
                                        ) : (
                                            <b className="sofia">{this.state.payLoad?.role}</b>
                                        )}
                                    </b>
                                </p>
                            </div>
                            <div className="col-lg-5 col-sm-12">
                                <h3>Mailing/Memo</h3>
                                <p style={{ fontSize: "14px" }}>
                                    {/* Originator: <b>{this.state.originator}</b> */}
                                    Originator: <b>{this.state.originatorInfo}</b>
                                </p>
                                <p style={{ fontSize: "14px" }}>
                                    Date: <b>{this.state.displayDateEntered}</b>
                                    {/* Date: <b>{this.state.datePosted != null ? this.state.datePosted.substring(0, 10) : "-"}</b> */}
                                </p>
                            </div>
                        </div>

                        <Row gutter={16}>
                            <Col span={24}>
                                <center>
                                    <br />
                                    <br />
                                    {/* <h4 className="text-center">{this.state.title}</h4> */}
                                    <h4 className="text-center">{this.state.displayTitle}</h4>

                                    <br />

                                    {/* <p>{this.state.body}</p> */}
                                    <p className="text-left">{this.state.displayBody}</p>
                                </center>
                            </Col>
                        </Row>

                        {this.state.displayAttachment != null ? (
                            <Row gutter={16}>
                                <br />
                                <br />
                                <br />
                                <Col span={20}>
                                    {/* <a href={this.state.memoAttachment} className="btn btn-warning btn-sm" target="_blank"> */}
                                    <a href={this.state.displayAttachment} className="btn btn-outline-default btn-sm" target="_blank">
                                        <i className="fa fa-eye" /> View Attachment
                                    </a>
                                </Col>
                            </Row>
                        ) : null}
                        <br />
                        {/* <div id="signatureCapture">
                  
                                        <img className="img-bw" src={this.state.newBase64Signature} style={{ width: "150px", height: "150px" }} /> <br />
                                        <p>
                                        <b>Signed: {this.state.originatorName}</b>
                                            </p>
                                            
                                    </div> */}

                        {this.state.displaySignatureUrl ? (
                            <>
                                <QueueAnim>
                                    <br/>
                                <p>Yours Faithfully,</p>
                                    {" "}
                                    <div key="1" id="signatureCapture">
                                        <img className="img-bw" src={this.state.displaySignatureUrl} style={{ width: "150px", height: "150px" }} /> <br />
                                       
                                        
                                        <b>{this.state.originatorName}.</b>
                                           
                                            
                                    </div>
                                </QueueAnim>{" "}
                            </>
                        ) : null}
                        <>
                        <b>
                            {this.state.isExternal ? <><br/><br/><br/>Your's faithfully, <br/>{this.state.originatorInfo}</> : null}</b>
                            <hr />
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Collapse ghost={true}>
                                        {this.state.comments_loader && this.state.deskIsActive ? <img src={loading_gif} style={{ width: "60px", height: "60px" }} /> : null}
                                        {this.state.commentList && this.state.deskIsActive && this.state.commentList.length > 0 ? (
                                            <Panel className="sofia" header="See Trailing Comments" key="1">
                                                <List>
                                                    {this.state.inboxMailing &&
                                                        this.state.deskIsActive &&
                                                        this.state.commentList.map((i, s) => {
                                                            return (
                                                                <Comment
                                                                    // actions={item.actions}
                                                                    author={i.userInfo}
                                                                    avatar={avi}
                                                                    content={i.comments}
                                                                    datetime={i.dateEntered != null ? i.dateEntered.substring(0, 10) : null}
                                                                />
                                                            );
                                                        })}
                                                </List>
                                            </Panel>
                                        ) : null}
                                    </Collapse>
                                </Col>
                            </Row>

                            <br />
                            <br />
                        </>

                        {this.state.deskIsActive && !this.state.displayIsClosed && this.state.payLoad?.roleId != Roles.Staff && this.state.payLoad?.roleId != Roles.VC_IncomingMailOfficer ? (
                            <Row gutter={16}>
                                <div className="col-lg-4 col-sm-12 mb-2">
                                    <Button onClick={() => this.setState({ ack_close: true, isTransition: false })} type="primary">
                                        Acknowledge & Close &nbsp; <FiCheck />
                                    </Button>
                                </div>
                                <div className="col-lg-4 col-sm-12 mb-2">
                                    <Button onClick={() => this.toggleAcknowledgeAndForward(ActionType.AcknowledgeAndFoward)} type="primary">
                                        Acknowledge & Forward &nbsp; <FiCheck /> &nbsp; <FiArrowRight />
                                    </Button>
                                </div>

                                <div className="col-lg-4 col-sm-12 mb-2">
                                    <Button onClick={() => this.toggleAcknowledgeAndForward(ActionType.RejectAndClose)} danger>
                                        Reject & Close
                                    </Button>
                                </div>
                                <div className="col-lg-2 col-sm-12 mb-2">
                                    <Tooltip title="Return to Originator Desk">
                                        <Button disabled onClick={() => this.toggleAcknowledgeAndForward(ActionType.ReturnToOriginator)} type="primary">
                                            Return &nbsp; <FiArrowLeft />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </Row>
                        ) : null}
                         {this.state.payLoad?.roleId == Roles.VC_IncomingMailOfficer ? <div className="col-lg-4 col-sm-12 mb-2">
                            <Tooltip title="Reroute to a different Desk for Action">
                                <Button onClick={this.toggleIncomingForward} type="primary">
                                    Forward &nbsp; <FiArrowRight />
                                </Button>
                            </Tooltip>
                        </div> : null}

                        {this.state.payLoad?.roleId != Roles.VC_IncomingMailOfficer ? <div className="col-lg-4 col-sm-12 mb-2">
                            <Tooltip title="Reroute to a different Desk for Action">
                                <Button onClick={() => this.toggleAcknowledgeAndForward(ActionType.Forward)} type="primary">
                                    Forward &nbsp; <FiArrowRight />
                                </Button>
                            </Tooltip>
                        </div> : null}
                        <div className="col-lg-4 col-sm-12 mb-2">
                            <Button onClick={this.handleToggleCopy} type="primary">
                                CC(Copy to) &nbsp;
                            </Button>
                        </div>

                        <br />
                        <Row gutter={16}>
                            {this.state.toggleCopy ? (
                                <QueueAnim>
                                    <div key="1">
                                        <Col span={24}>
                                            {/* <label className="label-control">Copy to all Faculty Deans? &nbsp; </label><Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked /> */}
                                            <Radio.Group value={recipient} onChange={this.handleCopyRoles}>
                                                {this.state.mappedCopyRoles &&
                                                    this.state.mappedCopyRoles.map((x, i) => {
                                                        return (
                                                            <>
                                                                <Radio.Button value={x.id}>{x.name}</Radio.Button>
                                                                {/* <Radio.Button value="default">Faculty Deans</Radio.Button>
                                <Radio.Button value="small">Deputy Registrar</Radio.Button> */}
                                                            </>
                                                        );
                                                    })}
                                            </Radio.Group>
                                        </Col>
                                    </div>
                                </QueueAnim>
                            ) : null}
                        </Row>
                        <br />
                        <br />
                        {this.state.loader_copy ? <img src={loading_gif} style={{ width: "40px", height: "40px" }} /> : null}

                        {this.state.toggleCopy ? (
                            <Row gutter={16}>
                                <QueueAnim>
                                    <div key="1">
                                        <Col span={24}>
                                            <div id="role-sec">
                                                {this.state.copyRoleFilterList &&
                                                    this.state.copyRoleFilterList.map((r, i) => {
                                                        return (
                                                            <div className="mt-3">
                                                                <div class="form-check">
                                                                    <button class="btn btn-success btn-sm" type="button" onClick={() => this.selectRole(r)} id={r.id}>
                                                                        &nbsp;
                                                                        <i className="fa fa-plus" />
                                                                    </button>
                                                                    <label class="form-check-label sofia" for="flexCheckDefault">
                                                                        {r.name}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </Col>
                                    </div>
                                </QueueAnim>
                            </Row>
                        ) : null}

                        <Row gutter={16}>
                            <br />

                            {this.state.toggleCopy ? (
                                <>
                                    <ul class="list-group col-md-10 mt-3">
                                        <br />
                                        <h3>Copy List</h3>

                                        {proposeArr &&
                                            proposeArr.map((x, i) => {
                                                return (
                                                    <QueueAnim>
                                                        <div key={x.id}>
                                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                                {x.name}
                                                                <span onClick={() => this.removeRecipient(x)} class="btn btn-danger btn-sm">
                                                                    <i className="fa fa-trash" />
                                                                </span>
                                                            </li>
                                                        </div>
                                                    </QueueAnim>
                                                );
                                            })}
                                    </ul>
                                    <div className="col-lg-4 col-sm-12 mb-2">
                                        <br />
                                        {proposeArr.length > 0 ? (
                                            <button onClick={() => this.executeCopy(proposeArr, this.state.mailingId)} className="btn btn-success btn-sm">
                                                Send &nbsp;
                                            </button>
                                        ) : null}
                                    </div>
                                </>
                            ) : null}
                        </Row>
                        </div>
                    </Form>
                </Drawer>

                <br />
                {/* <center> */}
                {screen_width > 700 ? <div className="col-12">
                    {/* <img src={newLogo} style={{ width: "70px" }} /> */}
                    <h2 className="sofia text-center">UNIZIK Administrative Mailing System</h2>
                </div> : 
                <div className="col-12" style={{marginTop:'70px'}}>
                {/* <img src={newLogo} style={{ width: "70px" }} /> */}
                <h3 className="sofia text-center">UNIZIK Administrative Mailing System</h3>
            </div>
                }
                {/* </center> */}
                <br />

                <div className="">
                    <div className="mail-box">
                        <aside className="lg-side">
                            <div className="inbox-head row">
                                {/* <center> */}
                                <div className="col-sm-4">
                                    <h2 className="sofia text-white text-center">Mail/Memo</h2>
                                </div>
                                <div className="col-sm-4 text-center">
                                    <img src={newLogo} style={{ width: "70px" }} />
                                </div>
                                {/* <h2 className="sofia text-white">Institution Mailing System</h2> */}
                                {/* </center> */}
                                {/* <h3 className="text-white">Mailings</h3> */}
                                <div className="col-sm-4 text-center m-srch" >
                                    <form action="#" className="pull-right position">
                                        <div className="input-append">
                                            <input type="text" className="sr-input" placeholder="Search Mail" />
                                            <button className="btn sr-btn" type="button">
                                                <i className="fa fa-search" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="inbox-body">
                                <Row gutter={16}>
                                <div className="mail-option">
                                    <Space>
                                    <div className="chk-all">
                                        <Col span={screen_width > 700 ? 6 : 24}>
                                            {/* <Form.Item name="type" label="Department"> */}
                                            <Select placeholder="Inbox" name="ack_foward_office" onChange={this.inboxToggle}>
                                                {/* <Option value="private">Select </Option> */}
                                                <Option value="inbox">Inbox </Option>
                                                <Option value="sent">Sent </Option>
                                                <Option value="archived">Archived </Option>
                                            </Select>
                                            {/* </Form.Item> */}
                                        </Col>
                                    </div>
                                    {/* <div className="btn-group">
                                        <a data-original-title="Refresh" data-placement="top" data-toggle="dropdown" href="#" className="btn mini tooltips">
                                            <i className=" fa fa-refresh" />
                                        </a>
                                    </div> */}
                                    <div className="btn-group hidden-phone">
                                        <AutoComplete
                                            style={{
                                                width: screen_width > 700 ? 200 : 180,
                                            }}
                                            onSearch={this.handleSearchMail}
                                            //onSelect={this.onSearchSelect}
                                            placeholder="Search..."
                                        >
                                            {/* {this.state.options && this.state.options.map((i) => (
        <Option key={i.staffId} value={i.staffId}>
          {i.staffDetail}
        </Option>
      ))} */}
                                        </AutoComplete>
                                        {/* <Select placeholder="More" name="ack_foward_office" onChange={this.handleOfficeSelect}>
                                            <Option value="inbox">-</Option>
                                        </Select> */}
                                    </div>
                                    </Space>
                                    {this.state.arc ? (
                                        <div className="btn-group">
                                            <Select style={{ width: "300px" }} placeholder="Sort By File Type" name="file_type" onChange={this.handleFileTypeSort}>
                                                {/* <Option value="private">Select </Option> */}
                                                {/* <Option value="inbox">Sort By File Type</Option> */}
                                                {this.state.fileTypes &&
                                                    this.state.fileTypes.map((x) => {
                                                        return <Option value={x.id}>{x.title}</Option>;
                                                    })}
                                            </Select>
                                        </div>
                                    ) : null}
                                   <Space direction="">
    <DatePicker onChange={this.handleMailDateFrom}/>
    <DatePicker  onChange={this.handleMailDateTo}/>
   
    
  </Space>
                                    {this.state.box_loader ? <img src={loading_gif} style={{ width: "50px", height: "50px" }} /> : null}
                                    <ul className="unstyled inbox-pagination">
                                        {/* <li>
                                            <button className="btn btn-primary btn-sm" onClick={() => this.setState({ compose: true })}>
                                                Compose &nbsp; <i className="fa fa-edit" />
                                            </button>
                                        </li> */}
                                        <li>
                                            <a className="np-btn" href="#">
                                                <i className="fa fa-angle-left  pagination-left" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="np-btn" href="#">
                                                <i className="fa fa-angle-right pagination-right" />
                                            </a>
                                        </li>
                                    </ul>
                                   
                                </div>
                                <table className="table table-inbox table-hover">
                                    <tbody>
                                        {this.state.inboxMailing &&
                                            this.state.inboxMailing.map((i, s) => {
                                                return (
                                                    <tr className={!i.deskIsRead ? "unread" : ""} onClick={() => this.showDrawer(i)}>
                                                         {screen_width > 800 ? <> <td className="inbox-small-cells">
                                                            <input type="checkbox" className="mail-checkbox" />
                                                        </td>
                                                        <td className="inbox-small-cells">
                                                            <i className="fa fa-star" />
                                                        </td>
                                                         <td className="view-message  dont-show">
                                                            {i.title.length > 35 ? i.title.substring(0, 35) + "..." : i.title}
                                                            
                                                            </td> 
                                                          
                                                          
                                                            </> : 
                                                            <>  
                                                            <td className="inbox-small-cells">
                                                            <i className="fa fa-star" />
                                                        </td>
                                                       
                                                         <td className="view-message  dont-show">
                                                         {i.title.length > 35 ? i.title.substring(0, 35) + "..." : i.title}
                                                            <p className="sofia">
                                                            <small>{i.body != null && i.body.length > 40 ? i.body.substring(0, 40) + "..." : i.body}</small>
                                                            </p>
                                                            <p>
                                                                <small>
                                                                {i.dateEntered != null ? i.dateEntered.substring(0, 10) : null}
                                                                </small>
                                                            </p>
                                                            
                                                            </td> 
                                                            
                                                            </>
                                                            }
                                                        {screen_width > 800 ? (
                                                            <>
                                                                <td className="view-message ">{i.body != null && i.body.length > 40 ? i.body.substring(0, 40) + "..." : i.body}</td>
                                                                <td className="view-message  inbox-small-cells">
                                                                    <i className="fa fa-paperclip" />
                                                                    {/* {i.attachmentUrl != null ? <i className="fa fa-paperclip" /> : null} */}
                                                                </td>
                                                                <td className="view-message  text-right">{i.dateEntered != null ? i.dateEntered.substring(0, 10) : null}</td>
                                                            </>
                                                        ) : null}
                                                    </tr>
                                                );
                                            })}

                                        {this.state.sentMailing &&
                                            this.state.sentMailing.map((i, s) => {
                                                return (
                                                    <tr className onClick={() => this.showSentDrawer(i)}>
                                                        {screen_width > 800 ? <> <td className="inbox-small-cells">
                                                            <input type="checkbox" className="mail-checkbox" />
                                                        </td>
                                                        <td className="inbox-small-cells">
                                                            <i className="fa fa-star" />
                                                        </td>
                                                         <td className="view-message  dont-show">
                                                         {i.title.length > 35 ? i.title.substring(0, 35) + "..." : i.title}
                                                            
                                                            </td> 
                                                          
                                                          
                                                            </> : 
                                                            <>  
                                                            <td className="inbox-small-cells">
                                                            <i className="fa fa-star" />
                                                        </td>
                                                       
                                                         <td className="view-message  dont-show">
                                                         {i.title.length > 35 ? i.title.substring(0, 35) + "..." : i.title}
                                                            <p className="sofia">
                                                            <small>{i.body != null && i.body.length > 30 ? i.body.substring(0, 30) + "..." : i.body}</small>
                                                            </p>
                                                            <p>
                                                                <small>
                                                                {i.dateEntered != null ? i.dateEntered.substring(0, 10) : null}
                                                                </small>
                                                            </p>
                                                            
                                                            </td> 
                                                            
                                                            </>
                                                            }
                                                        {screen_width > 800 ? (
                                                            <>
                                                                <td className="view-message ">{i.body != null && i.body.length > 40 ? i.body.substring(0, 40) + "..." : i.body}</td>
                                                                <td className="view-message  inbox-small-cells">
                                                                    <i className="fa fa-paperclip" />
                                                                    {/* {i.attachmentUrl != null ? <i className="fa fa-paperclip" /> : null} */}
                                                                </td>
                                                                <td className="view-message  text-right">{i.dateEntered != null ? i.dateEntered.substring(0, 10) : null}</td>
                                                            </>
                                                        ) : null}
                                                    </tr>
                                                );
                                            })}

                                        {this.state.archiveMailing &&
                                            this.state.archiveMailing.map((i, s) => {
                                                return (
                                                    <tr className onClick={() => this.showSentDrawer(i)}>
                                                        <td className="inbox-small-cells">
                                                            <input type="checkbox" className="mail-checkbox" />
                                                        </td>
                                                        <td className="inbox-small-cells">
                                                            <i className="fa fa-star" />
                                                        </td>
                                                        <td className="view-message  dont-show">{i.title}</td>
                                                        {screen_width > 800 ? (
                                                            <>
                                                                <td className="view-message ">{i.body != null && i.body.length > 40 ? i.body.substring(0, 40) + "..." : i.body}</td>
                                                                <td className="view-message  inbox-small-cells">
                                                                    <i className="fa fa-paperclip" />
                                                                    {/* {i.attachmentUrl != null ? <i className="fa fa-paperclip" /> : null} */}
                                                                </td>
                                                                <td className="view-message  text-right">{i.dateEntered != null ? i.dateEntered.substring(0, 10) : null}</td>
                                                            </>
                                                        ) : null}
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            
                                </Row>
                            </div>
                            
                        </aside>
                    </div>
                </div>
            </>
        );
    }
}

export default MemoInterface;
