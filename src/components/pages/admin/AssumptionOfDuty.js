import React from "react";
import { fetchData, postData, editData, URL } from "../../../utils/crud";
import _ from "lodash";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import AssumptionDataTable from "../DataTables/AssumptioDataTable";
import CreateStaffForm from "./CreateStaffForm";
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner2 from "../admin/Spinner"
import {Roles} from "../../Barn"
import NewDataTable from "./NewDataTable";
// import MUIDataTable from "./MuiDatatable"


import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Label,
  Form,
  FormGroup,
  Fade,
} from "reactstrap";
import { StatusCodes } from "../../Barn";


export default class StaffTest extends React.Component {
  state = {
    // spinn:true,\
    showTable:false,
    warningCard:false,
    spin: false,
    createStaff: false,
    staffAdd: false,
    searchText: "", 
  };

  

  createStaffToggle = () => {
    this.setState({
      createStaff: true,
    });
  };

  closeToggle = () => {
    this.setState({
      createStaff: false,
    });
  };

  filterStaff = () => {
    this.setState({
      spinn: true,
      queryCard:false,
      staffTypeCard:false,
      staffRank:false,
      combined:false
    });
    fetchData(
      `/Staff/AssumptionOfDuty?from=${this.state.dateFrom}&to=${this.state.dateTo}`,
      (data) => {
        setTimeout(() => {
          console.log(data);
        }, 2000);

        let mappedStaff = data.map((d, i) => {
          this.setState({
            newID: d.personId,
          });

          return {
            status: d.department == "-" ? <span className="badge badge-danger badge-sm">Unassigned</span>: <span className="badge badge-success badge-sm">Assigned</span>,
            sn: i + 1,
            name: _.upperCase(d.staffName),
            staffIdentityNumber: _.upperCase(d.staffNumber),
            department: _.upperCase(d.department),
            salaryCategory:d.salaryCategory + " " + d.salaryLevel + " " + "STEP" + " " + d.salaryStep,
            rank: _.upperCase(d.rank),
            dateOfAssumption: d.dateOfAssumption.substring(0, 10),
            comment:d.comment
           
          };
        });
        setTimeout(() => {
          console.log(mappedStaff, "mapp!!!");
        }, 2000);
        this.setState({
          newStaffList: mappedStaff,
          spinn: false,
          showTable: true,
          staffTypeId:0,
          rankId:0,
          departmentId:0
        });
      }
    );
  };

  componentDidMount() {
  

    let verification = JSON.parse(localStorage.getItem("userData"));
    if (verification == null) {
      this.setState({
        userRedirect: true,
      });

    
    }
    else if (verification.roleId != Roles.SuperAdmin && verification.roleId != Roles.Personnel && verification.roleId != Roles.Regularization && verification.roleId != Roles.PersonnelDocumentation) {
      alert("Unauthorized Access")
      localStorage.clear();
      this.setState({
        userRedirect: true,
      });
    }
  
   

    console.log(verification, "Localll")
    

    this.setState({warningCard:false})

    fetchData("/InstitutionDepartments", (data) => {
      this.setState({
        institutionDepts: data,
      });

      console.log(this.state.institutionDepts, "Depts!!");
    });

    fetchData("/InstitutionRanks", (data) => {
      this.setState({
        institutionRank: data,
      });

      console.log(this.state.institutionCadre, "Cadres!!");
    });

    fetchData("/InstitutionStaffTypes", (data) => {
      this.setState({
        institutionStaffType: data,
      });

      console.log(this.state.institutionStaffType, "Satff Type!!");
    });

    setTimeout(() => {
      console.log(this.state.allStaff);
    }, 4000);
  }



 

  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <>









{this.state.spin ? <Spinner2/> : null}







        {this.state.spinn ? (
          <Spinner msg={"Loading Staff List, please wait..."} />
        ) : null}

      
    
       
     
        <div className="">
          <div className="py-4">
            <div className="row mb-4">
              <div className="col">
                <h1 className="d-inline-block mb-0 pop-font">
                  Assumption Of Duty{" "}
                  <span className="h3 text-muted">/ List</span>
                </h1>

                <span className="text-sm d-block">
                  {/* Create and manage Staff Profiles */}
                </span>
              </div>

              <div className="col">
               
              </div>
           
           
            </div>

           <Fade> 
            <div className="row col-md-11 staff-list-func">
              <div className="card col-md-11 dateCard">
                <div className="row card-body">

                {/* <div className="col-md-6 text-center"> */}
                    <h3>Load List:</h3>
                    <br />
                    <br />
                



                  <div className="col-md-5">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        From:
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        onChange={(e) => {this.setState({dateFrom: e.target.value.substring(0, 10)})}}

                        required
                      />
                       
                    </div>
                    
                  </div>


                  <div className="col-md-5">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        To:
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        onChange={(e) => {this.setState({dateTo: e.target.value.substring(0, 10)})}}
                        required
                      />
                       
                    </div>
                    
                  </div>

                    <div className="row col-md-5" style={{marginLeft:"75px"}}>
                        <button className="btn btn-primary btn-sm" onClick={this.filterStaff}>Load List</button>
                    </div>


               



                </div>
              </div>


              </div>
              </Fade>
             
           
            
              <Fade>
                {this.state.showTable ? <AssumptionDataTable
                  passedStaffData={this.state.newStaffList}
                  
                /> : null}




              </Fade>
              
          </div>
          {/* Card stats */}
        </div>

       

      </>
    );
  }
}
