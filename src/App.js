import React, { Component } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Router,
} from "react-router-dom";
import "./App.css";
import "./responsive.css";
import Home from "./pages/home";
import NewHome from "./pages/NewHome";
import Index from "./pages/index";
import Login from "./pages/login";
import Form from "./pages/form";
import Dashboard from "./components/pages/admin/dashboard";
import Layout from "./components/layout";
import AdminLayout from "./Layouts/AdminLayout";
import Staff from "./components/pages/admin/staff";
import TemporalStaff from "./components/pages/admin/TemporalStaff";
import EditStaffProfile from "./components/pages/admin/EditStaffProfile";
import StaffProfile from "./components/pages/admin/staffprofile";
import EditTempStaff from "./components/pages/admin/EditTempStaff";
import indo from "../src/views/Index";
import Biodata from "./components/pages/staff/biodata";
import SideNavo from "./components/pages/admin/SideNav";
import NewDashboard from "./components/pages/admin/NewDashBoard";
import SideBar from "./components/NewSideBar";
import UploadStaffList from "./components/pages/admin/UploadStaffList";
import sidenav from "./components/sidenav";
import Leave from "./components/pages/admin/leave";
import LeaveRequest from "./components/pages/admin/leaveRequest";
import ViewLeaveRequest from "./components/pages/admin/ViewLeaveRequest";
import StaffLeaveRequest from "./components/pages/staff/leaveRequest";
import Department from "./components/pages/admin/department";
import Rough from "./components/pages/admin/rough";
import Asset from "./components/pages/admin/asset";
import StaffCategory from "./components/pages/admin/staffcategory";
import SalaryManagement from "./components/pages/admin/salaryManagement";
import Payroll from "./components/pages/admin/payroll";
import ResponseChain from "./components/pages/admin/ResponseChain";
import EducationalQualification from "./components/pages/admin/EducationalQualifications";
import Cadre from "./components/pages/admin/Cadres";
import Rank from "./components/pages/admin/Rank";
import PayCheque from "./components/pages/admin/paycheck";
import SalarySummary from "./components/pages/admin/salarySummary";
import SalaryCategory from "./components/pages/admin/salaryGradeCategory";
import StaffPayrollList from "./components/pages/admin/StaffPayrollList";
import IDCard from "./components/pages/staff/identityCard";
import Role from "./components/pages/admin/RoleAssignment";
import AttendanceReport from "./components/pages/admin/AttendanceReportRequest";
import AttendanceReportPage from "./components/pages/admin/attendanceReport";
import DocumentType from "./components/pages/admin/DocumentType";
import ViewDocument from "./components/pages/admin/ViewDocument";
import GetStaffUpdate from "./components/pages/admin/GetStaff";
import GetStaffVerification from "./components/pages/admin/GetStaffVerification";
import AdminStaffDocUpdate from "./components/pages/admin/AdminStaffDocUpdate";
import Training from "./components/pages/admin/Training";
import TrainingRequests from "./components/pages/staff/trainingRequest";
import ManageTrainingRequest from "./components/pages/admin/trainingRequest";
import StaffDocumentVerification from "./components/pages/admin/StaffDocumentVerification";
import ApplicantList from "./components/pages/admin/applicantList";
import StaffTest from "./components/pages/admin/StaffTest";
import UploadDocuments from "./components/pages/staff/UploadDocuments";
import JobPositions from "./pages/JobPositions";
import Events from "./components/pages/admin/broadcast";
import StaffProfileTest from "./components/pages/admin/StaffProfileTest";
import ViewCV from "./components/pages/admin/ViewCV";
import InvitedApplicants from "./components/pages/admin/InvitedApplicants";
import UninvitedApplicants from "./components/pages/admin/UninvitedApplicants";
import ChangePassword from "./components/pages/admin/ChangePassword";
import ManageVacancies from "./components/pages/admin/vacancies";
import MenuManagement from "./components/pages/admin/MenuManagement";
import TestEditProfile from "./components/pages/admin/TestEditProfile";
import NewForm from "./pages/NewForm";
import ChangeOfName from "./components/pages/staff/ChangeOfName";
import ViewChangeOfName from "./components/pages/staff/ViewChangeOfName";
import organizationDocuments from "./components/pages/admin/organizationDocuments";
import ViewCONLetter from "./components/pages/admin/ViewCONLetter";
import StaffDeptTransfer from "./components/pages/staff/StaffDeptTransfer";
import StaffDeptTransferLetter from "./components/pages/staff/StaffDeptTransferLetter";
import ChangeOfDeptManagement from "./components/pages/admin/DeptTransferMgt";
import ViewStaffTransferLetter from "./components/pages/admin/ViewDeptTransferLetter";
import NewDataTable from "./components/pages/admin/NewDataTable";
import PrepareNominalRoll from "./components/pages/admin/PrepareNominalRoll";
import PullNominalRoll from "./components/pages/admin/PullNominalRoll";
import NominalRollRequest from "./components/pages/admin/NominalRollRequest";
import CreateStaffForm from "./components/pages/admin/CreateStaffForm";
import CreatedProfilePreview from "./components/pages/admin/CreatedProfilePreview";
import ExportableStaffList from "./components/pages/admin/ExportableStaffList";
import GenerateStaffNumber from "./components/pages/admin/GenerateStaffNumber";
import AssumptionOfDuty from "./components/pages/admin/AssumptionOfDuty";
import StaffPosting from "./components/pages/admin/StaffPosting";
import GetLoginDetails from "./pages/GetLoginDetails";
import JobTypes from "./components/pages/admin/jobtypes";
import VerifyEmail from "./components/pages/admin/VerifyEmail";
import CreateJobLink from "./components/pages/admin/CreateJobLink";
import NewLeaveRequests from "./components/pages/admin/NewLeaveRequests";
import FailedStaffUploads from "./components/pages/admin/FailedStaffUploads";
import PFASetup from "./components/pages/admin/PFASetup";
import AosHolidaySetup from "./components/pages/admin/AosHolidaySetup";
import Servicom from "./components/pages/admin/Servicom";
import FailedBiometricsUpload from "./components/pages/admin/failedBiometricsUpload";
import FailedAttendanceUpload from "./components/pages/admin/FailedAttendanceUpload";
import AttendanceExportList from "./components/pages/admin/AttendanceExportList";
import Encode_Export_Exc from "./components/pages/admin/Encode_Export_Exc";
import SalarySetup from "./components/pages/admin/SalarySetup";
import ManageVisitation from "./components/pages/admin/ManageVisitation";
import GeneratePayroll from "./components/pages/admin/GeneratePayroll";
import TrainingSchedule from "./components/pages/admin/TrainingSchedule";
import InternationalCollaorations from "./pages/InternationalCollaorations";
import ExternalMail from "./pages/ExternalMail";
import PasswordReset from "./pages/PasswordReset";
import ForeignVistationType from "./pages/ForeignVisitationType";
import InternationalCollaboForm from "./pages/InternationalCollaboForm";
import ManageMemo from "./components/pages/admin/MemoActions";
import MemoInterface from "./components/pages/admin/Memo_Interface";
import DocumentPropietors from "./components/pages/admin/DocumentPropietors";
import WorkingOnIt from "./components/pages/admin/WorkingOnIt";
import LloydantStaff from "./components/pages/admin/LloydantStaff";
import AssetAllocation from "./components/pages/admin/AssetAllocation";

import $ from "jquery";


import "jquery/dist/jquery.min.js";

import { Fade } from "reactstrap";
import Calendar from "./components/calendar";
class App extends Component {
  componentDidMount() {}

  render() {

    // var $viewportMeta = $('meta[name="viewport"]');
    //     $('input, select, textarea').bind('focus blur', function(event) {
    //     $viewportMeta.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type == 'blur' ? 10 : 1));
    //     });
    // if (this.state.redirect) {
    //   return <Redirect to={{ pathname: "/login" }} />;
    // }
    return (
      <>
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Sofia"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sofia&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Sofia&display=swap"
          rel="stylesheet"
        />
       
        <link
          rel="stylesheet"
          href="//cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css"
        />
        <script src="//cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>

        <link
          rel="stylesheet"
          href="https://cdn.datatables.net/buttons/1.4.1/css/buttons.dataTables.min.css"
        />
        <script
          type="text/javascript"
          language="javascript"
          src="https://cdn.datatables.net/buttons/1.4.1/js/dataTables.buttons.min.js"
        ></script>
        <script
          type="text/javascript"
          language="javascript"
          src="https://cdn.datatables.net/buttons/1.4.1/js/buttons.flash.min.js"
        ></script>
        <script
          type="text/javascript"
          language="javascript"
          src="https://cdn.datatables.net/buttons/1.4.1/js/buttons.html5.min.js"
        ></script>
        <script
          type="text/javascript"
          language="javascript"
          src="https://cdn.datatables.net/buttons/1.4.1/js/buttons.print.min.js"
        ></script>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/> */}

{/* <meta name="viewport" content="width=1000"/> */}
        <BrowserRouter>
          <Fade>
            <Switch>
              <Route exact path="/" component={Index}>
                <Redirect to="/Home" />
              </Route>
              <Route exact path={"/Home"} component={Index} />
              <Route path={"/Login"} component={Login} />

              <Route path={"/NewHome"} component={NewHome} />
              <Route path={"/JobPositions"} component={JobPositions} />
              <Route path={"/Form"} component={Form} />
              <Route path={"/Application"} component={NewForm} />
              <Route path={"/GetLoginDetails"} component={GetLoginDetails} />

              <Route path={"/VerifyEmail"} component={VerifyEmail} />
              <Route path={"/International_Collaborations"} component={InternationalCollaorations} />
              <Route path={"/ForeignVistationType"} component={ForeignVistationType} />
              <Route path={"/International_Collaboration_Form"} component={InternationalCollaboForm} />
              <Route path={"/External_Mailing"} component={ExternalMail} />
              <Route path={"/PasswordReset"} component={PasswordReset} />
              
              
              
              <Layout>
                <Route path={"/Dashboard"} component={Dashboard} />
                <Route path={"/Staff"} component={Staff} />
                <Route path={"/TemporalStaff"} component={TemporalStaff} />
                <Route
                  path={"/EditStaffProfile"}
                  component={EditStaffProfile}
                />
                <Route path={"/StaffProfile"} component={StaffProfile} />
                <Route path={"/EditTempStaff"} component={EditTempStaff} />
                <Route path={"/indo"} component={indo} />
                <Route path={"/Biodata"} component={Biodata} />
                <Route path={"/SideNav"} component={SideNavo} />
                <Route path={"/NewDashboard"} component={NewDashboard} />
                {/* <Route path={"/SideBar"} component={SideBar} /> */}
                <Route path={"/UploadStaffList"} component={UploadStaffList} />
                <Route path={"/sidenav"} component={sidenav} />
                <Route path={"/Leave"} component={Leave} />
                <Route path={"/LeaveRequest"} component={LeaveRequest} />
                <Route
                  path={"/ViewLeaveRequest"}
                  component={ViewLeaveRequest}
                />
                <Route
                  path={"/StaffLeaveRequest"}
                  component={StaffLeaveRequest}
                />
                <Route path={"/Department"} component={Department} />
                <Route path={"/Asset"} component={Asset} />
                <Route path={"/StaffCategory"} component={StaffCategory} />
                <Route path={"/Calender"} component={Calendar} />
                <Route
                  path={"/SalaryManagement"}
                  component={SalaryManagement}
                />
                <Route path={"/SalaryGradeLevel"} component={Payroll} />
                <Route path={"/LeaveResponseChain"} component={ResponseChain} />
                <Route
                  path={"/EducationalQualifications"}
                  component={EducationalQualification}
                />
                <Route path={"/CadreManagement"} component={Cadre} />
                <Route path={"/RankManagement"} component={Rank} />
                <Route path={"/payCheque"} component={PayCheque} />
                <Route path={"/SalarySummary"} component={SalarySummary} />
                <Route path={"/Manage_Visitation"} component={ManageVisitation} />
                <Route path={"/Manage_Memo"} component={ManageMemo} />
                <Route path={"/Mailing_Memo"} component={MemoInterface} />
                <Route
                  path={"/SalaryGradeCategory"}
                  component={SalaryCategory}
                />
                <Route
                  path={"/StaffPayrollList"}
                  component={StaffPayrollList}
                />
                <Route path={"/IdentityCard"} component={IDCard} />
                {/* <Route path={"/RoleManagement"} component={Role} />  */}
                <Route
                  path={"/anceRAttendeport"}
                  component={AttendanceReport}
                />
                <Route
                  path={"/AttendanceReportPage"}
                  component={AttendanceReportPage}
                />
                <Route path={"/DocumentType"} component={DocumentType} />
                <Route path={"/ViewDocument"} component={ViewDocument} />
                <Route path={"/UploadDocuments"} component={UploadDocuments} />
                <Route path={"/GetStaffUpdate"} component={GetStaffUpdate} />
                <Route
                  path={"/GetStaffVerification"}
                  component={GetStaffVerification}
                />
                <Route
                  path={"/AdminStaffDocumentUpdate"}
                  component={AdminStaffDocUpdate}
                />
                <Route
                  path={"/StaffDocumentVerification"}
                  component={StaffDocumentVerification}
                />
                <Route path={"/Staff_List"} component={StaffTest} />
                <Route path={"/Training"} component={Training} />
                <Route path={"/TrainingRequests"} component={TrainingRequests} />
                <Route path={"/ManageTrainingRequest"} component={ManageTrainingRequest} />
                
                <Route path={"/Events"} component={Events} />
                <Route path={"/ApplicantList"} component={ApplicantList} />
                <Route path={"/ViewCV"} component={ViewCV} />
                <Route path={"/SalarySetup"} component={SalarySetup} />
                <Route
                  path={"/InvitedApplicants"}
                  component={InvitedApplicants}
                />
                <Route
                  path={"/UninvitedApplicants"}
                  component={UninvitedApplicants}
                />
                <Route path={"/ManageVacancies"} component={ManageVacancies} />
                <Route path={"/ChangePassword"} component={ChangePassword} />
                <Route path={"/TrainingSchedule"} component={TrainingSchedule} />
                <Route
                  path={"/Edit_Staff_Profile"}
                  component={TestEditProfile}
                />
                <Route
                  path={"/StaffProfileTest"}
                  component={StaffProfileTest}
                />
                {/* <Route path={"/MenuManagement"} component={MenuManagement} /> */}
                <Route path={"/ChangeOfName"} component={ChangeOfName} />
                <Route
                  path={"/ViewChangeOfName"}
                  component={ViewChangeOfName}
                />
                <Route
                  path={"/organizationDocuments"}
                  component={organizationDocuments}
                />
                <Route path={"/ChangeOfNameLetter"} component={ViewCONLetter} />
                <Route
                  path={"/StaffDepartmentTransfer"}
                  component={StaffDeptTransfer}
                />
                <Route
                  path={"/DepartmentTransferLetter"}
                  component={StaffDeptTransferLetter}
                />
                <Route
                  path={"/ManageChangeOfDepartment"}
                  component={ChangeOfDeptManagement}
                />
                <Route
                  path={"/StaffTransferLetter"}
                  component={ViewStaffTransferLetter}
                />
                <Route path={"/NewDataTable"} component={NewDataTable} />
                <Route
                  path={"/PrepareNominalRoll"}
                  component={PrepareNominalRoll}
                />
                <Route path={"/PullNominalRoll"} component={PullNominalRoll} />
                <Route
                  path={"/NominalRollRequest"}
                  component={NominalRollRequest}
                />
                <Route path={"/CreateStaffForm"} component={CreateStaffForm} />
                <Route
                  path={"/CreatedProfilePreview"}
                  component={CreatedProfilePreview}
                />
                <Route
                  path={"/StaffListExport"}
                  component={ExportableStaffList}
                />
                <Route
                  path={"/GenerateStaffNumber"}
                  component={GenerateStaffNumber}
                />
                <Route
                  path={"/AssumptionOfDuty"}
                  component={AssumptionOfDuty}
                />
                <Route
                  path={"/GeneratePayroll"}
                  component={GeneratePayroll}
                />
                <Route path={"/StaffPosting"} component={StaffPosting} />
                <Route path={"/JobTypes"} component={JobTypes} />
                <Route path={"/SendJobInvite"} component={CreateJobLink} />
                <Route
                  path={"/NewLeaveRequests"}
                  component={NewLeaveRequests}
                />
                <Route
                  path={"/FailedStaffUploads"}
                  component={FailedStaffUploads}
                />
                <Route
                  path={"/FailedBiometricsUpload"}
                  component={FailedBiometricsUpload}
                />
                <Route
                  path={"/FailedAttendanceUpload"}
                  component={FailedAttendanceUpload}
                />
                <Route
                  path={"/AttendanceExportList"}
                  component={AttendanceExportList}
                />
                <Route path={"/PFASetup"} component={PFASetup} />
                <Route path={"/AosHolidaySetup"} component={AosHolidaySetup} />
                <Route path={"/StaffAttendance"} component={Servicom} />
                <Route
                  path={"/Encode_Export_Exc"}
                  component={Encode_Export_Exc}
                />
                <Route path={"/RoleManagement"} component={Role} />
                <Route path={"/MenuManagement"} component={MenuManagement} />
                <Route path={"/DocumentPropietors"} component={DocumentPropietors} />
                <Route path={"/WorkingOnIt"} component={WorkingOnIt} />
                <Route path={"/OrganizationStaff"} component={LloydantStaff} />
                <Route path={"/AssetAllocation"} component={AssetAllocation} />

                {/* <Route path={"/admin"} component={AdminLayout} /> */}
                {/* <Route path={"/AdminCalender"} component={AdminCalendar} /> */}
                <Route path={"/Rough"} component={Rough} />

                {/* <Route exact path={"/Home"} component={Home} /> */}
              </Layout>

              {/* <AdminLayout>
            <Route path={"/RoleManagement"} component={Role} /> 
            <Route path={"/MenuManagement"} component={MenuManagement} />



            </AdminLayout> */}
            </Switch>
          </Fade>
        </BrowserRouter>
     
     
      </>
    );
  }
}
export default App;
