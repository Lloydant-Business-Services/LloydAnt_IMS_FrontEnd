import React from "react";
import { fetchData, postData, editData, URL } from "../../../utils/crud";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import AssignDeptDataTable from "../DataTables/AssignDeptDataTable";
import CreateStaffForm from "./CreateStaffForm";
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner2 from "../admin/Spinner";
import { Roles, PersonnelDepartmentId } from "../../Barn";
import {PushSpinner, ClassicSpinner, MetroSpinner} from "react-spinners-kit"
import { Slide, Fade, AttentionSeeker } from "react-awesome-reveal";
import _ from "lodash"


import Notice from "../../Reusables/NotificationCard";
import RankCountDataTable from "../DataTables/RankCountDataTable";

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

} from "reactstrap";
import { StatusCodes } from "../../Barn";

export default class StaffTest extends React.Component {
  state = {
    // spinn:true,\
    showTable: false,
    warningCard: false,
    spin: false,
    createStaff: false,
    staffAdd: false,
    assignCard: true,
    finalCount: 0,
    searchText: "",
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    person : [{name: "john"}, {name: "jane"}, {name: "imelda"}, {name: "john"}],
    removedDuplicates:[]

  };

  closeToggle = () => {
    this.setState({
      createStaff: false,
    });
  };

  executeUpdate = () => {
    this.setState({ updateCard: false });

    let payload = {
      phoneNumber: this.state.selectedPhoneNumber,
      genderId: this.state.selectedGenderId,
      stateId: this.state.selectedStateId,
      lgaId: this.state.selectedLgaId,
      departmentId: this.state.selectedDepartmentId,
    };

    editData(
      `/StaffPosting/UpdateNewStaff?staffId=${this.state.selectedStaffId}`,
      payload,
      (data) => {
        if (data == 200) {
          this.setState({ successCard: true });
          this.reloadData();
        } else {
          alert("Error");
          // this.setState({spinn:false})
        }
      }
    );
  };

  loadStaffData = (data) => {
    console.log(data, "staff");
    this.setState({
      updateCard: true,
      selectedStaffName: data.staffName,
      selectedPhoneNumber: data.phoneNumber,
      selectedDepartmentId: data.departmentId,
      selectedStateId: data.stateId,
      selectedLgaId: data.lgaId,
      selectedGenderId: data.genderId,
      selectedStaffId: data.staffId,
    });

    setTimeout(() => {
      if (this.state.selectedStateId > 0) {
        fetchData(
          `/Lgas/byStateId?id=${this.state.selectedStateId}`,
          (data) => {
            this.setState({
              filteredLGA: data,
            });
          }
        );
      }
    }, 2000);
  };



removeDuplicates(data, key) {
  
  return [
    ...new Map(data.map(item => [key(item), item])).values()
    
  ]

};


  filterStaff = () => {
    // console.log(this.removeDuplicates(this.state.person, item => item.name));
    
    this.setState({
      re: this.removeDuplicates(this.state.person, item => item.name)
    })
    
    setTimeout(() => {
      console.log(this.state.re, "reer")
    },3000)
    
    this.setState({
      spinn: true,
      queryCard: false,
      staffTypeCard: false,
      staffRank: false,
      combined: false,
    });
    fetchData(`/StaffPosting/GetNewStaff?from=${this.state.dateFrom}&to=${this.state.dateTo}`, (data) => {
      setTimeout(() => {
        console.log(data);
      }, 2000);

      let mappedHeadReps = data.map(h => {
        return{
          newHeadRep: h.headRep == "Unassigned" ? "      -" : h.headRep
        }
      })
     

      
      
      
      let mappedStaff = data.map((d, i) => {
        this.setState({
          newID: d.personId,
        });

        return {
          status:
            d.department == "-" || d.departmentId == PersonnelDepartmentId ? (
              <span className="badge badge-danger badge-sm">Not-Posted</span>
            ) : (
              <span className="badge badge-success badge-sm">Posted</span>
            ),
          sn: i + 1,
          name: _.upperCase(d.staffName),
          staffIdentityNumber: _.upperCase(d.staffNumber),
          department: _.upperCase(d.department),
          salaryCategory:
            d.salaryCategory +
            " " +
            d.salaryLevel +
            " " +
            "STEP" +
            " " +
            d.salaryStep,
          rank: _.upperCase(d.rank),
          defaultDepartmentName: d.defaultDepartmentName,
          dateOfAssumption: d.dateOfAssumption.substring(0, 10),
          comment: d.comment,
          headRep:d.headRep == "Unassigned" ? "-" : d.headRep,
          action: (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => this.loadStaffData(d)}
            >
              <i className="fa fa-edit" />
            </button>
          ),

          
        };
      });


  // console.log(mappedStaff, "mapp!!!");
  console.log(this.state.removedDuplicates, "Fisrt Dupll!!!");

      this.setState({
        newStaffList: mappedStaff,
        spinn: false,
        removedDuplicates: this.removeDuplicates(mappedHeadReps, item => item.newHeadRep),
        showTable: true,
        showNewStaffCard:true,
        staffTypeId: 0,
        rankId: 0,
        departmentId: 0,
      });
      var obj = {};
      var obj1 = {};
      var obj2= {};
      var obj3 = {};
obj["newHeadRep"] = "      Vice-Chancellor";
obj1["newHeadRep"] = "      Deputy Vice-Chancellor(Administration)";
obj2["newHeadRep"] = "      Registrar";
obj3["newHeadRep"] = "      Bursar";
this.state.removedDuplicates.unshift(obj, obj1, obj2, obj3);

      setTimeout(() => {
        // console.log(mappedStaff, "mapp!!!");
        console.log(this.state.removedDuplicates, "Final Removal!!!");
      }, 2000);
    });
  
  
  
  };

  loadRequests = () => {
    fetchData("/DepartmentTransfer/GetByAdmin", (data) => {
      this.setState({ conRequests: _.reverse(data) });
    });
  };

  getInstDept = () => {
    fetchData(
      `/InstitutionDepartments/${this.state.staffPayLoad.departmentId}`,
      (data) => {
        console.log(data, "Dept!!");
        this.setState({
          departmentName: data.name,
        });
      }
    );
  };

reloadData = () => {
 this.filterStaff();

}


  componentDidMount() {
    let verification = JSON.parse(localStorage.getItem("userData"));
    if (verification == null) {
      this.setState({
        userRedirect: true,
      });
    } else if (
      verification.roleId != Roles.SuperAdmin &&
      verification.roleId != Roles.Personnel &&
      verification.roleId != Roles.Regularization &&
      verification.roleId != Roles.PersonnelDocumentation &&
      (verification.roleId != Roles.PersonnelSaps ||
        this.state.staffPayLoad?.departmentId != 133)
    ) {
      alert("Unauthorized Access");
      localStorage.clear();
      this.setState({
        userRedirect: true,
      });
    }

    this.loadRequests();
    this.getInstDept();

    // this.filterStaff();

    // console.log(verification, "Localll")

    this.setState({ warningCard: false });

    fetchData("/InstitutionDepartments", (data) => {
      this.setState({
        institutionDepts: data,
      });

      // console.log(this.state.institutionDepts, "Depts!!");
    });

    fetchData("/InstitutionRanks", (data) => {
      this.setState({
        institutionRank: data,
      });

      // console.log(this.state.institutionCadre, "Cadres!!");
    });

    fetchData("/InstitutionUnits", (data) => {
      this.setState({
        institutionCadre: data,
      });

      // console.log(this.state.institutionCadre, "Cadres!!");
    });

    fetchData("/Genders", (data) => {
      this.setState({
        gender: data,
      });
    });
    fetchData("/States", (data) => {
      this.setState({
        showStates: data,
      });
    });

    fetchData("/InstitutionStaffTypes", (data) => {
      this.setState({
        institutionStaffType: data,
      });

      // console.log(this.state.institutionStaffType, "Satff Type!!");
    });

    setTimeout(() => {
      // console.log(this.state.allStaff);
    }, 4000);
  }

  handleCountCard = () => {
    if (!this.state.showCountCard) {
      this.setState({ showCountCard: true });
    } else {
      this.setState({ showCountCard: false });
    }
  };
  handleCountCard2 = () => {
    if (!this.state.showCountCard2) {
      this.setState({ showCountCard2: true });
    } else {
      this.setState({ showCountCard2: false });
    }
  };

  toggleAssignCard = () => {
    this.setState({
      assignCard: true,
      hodRequestCard: false,
      staffPostingCard: false,
      petitionCard: false,
      showCountCard: false,
      showCountCard2: false,
    });
  };

  handleStateOfOrigin = (e) => {
    this.setState({
      selectedStateId: parseInt(e.target.value),
    });

    setTimeout(() => {
      fetchData(`/Lgas/byStateId?id=${this.state.selectedStateId}`, (data) => {
        this.setState({
          filteredLGA: data,
        });
      });
    }, 2000);

    console.log(this.state.filteredLGA, "Filtered!!");
  };

  toggleHODRequestCard = () => {
    this.setState({
      assignCard: false,
      hodRequestCard: true,
      staffPostingCard: false,
      petitionCard: false,
    });
  };

  toggleStaffPostingRequestCard = () => {
    this.setState({
      assignCard: false,
      hodRequestCard: false,
      staffPostingCard: true,
      petitionCard: false,
    });
  };

  togglePetitionCard = () => {
    this.setState({
      assignCard: false,
      hodRequestCard: false,
      staffPostingCard: false,
      petitionCard: true,
    });
  };

  getCount = () => {
    this.setState({ spinn: true });
    fetchData(
      `/StaffPosting/NewStaffCount?departmentId=${this.state.selectedDeptId}&rankId=${this.state.selectedRankId}`,
      (data) => {
        this.setState({ finalCount: data, spinn: false });
      }
    );
  };

  closeNoticeCard = () => {
    this.setState({
      successCard: false,
    });
  };

  filterCadreCount = () => {
    this.setState({ cadreLoad: true });
    

    fetchData(`/InstitutionRanks/GetInstitutionRankBy?unitId=${this.state.selectedCadreId}`, data => {
      this.setState({rankHead:data})
    }) 


    fetchData(`/StaffPosting/Whole?cadreId=${this.state.selectedCadreId}`, 
    (data) => {
      console.log(data, "Ranks from Cadre")
      const newArr = [];
      let mappedRank = data.map((r, i) => {
      
        return{
          departmentName: r.departmentName,
          rankStaffCounts: r.rankStaffCounts.map(n =>{
              return{
                rankName:n.rankName,
                count:n.count
              }
          })
          // id: 7
        }
      })
    this.setState({ cadreLoad: false, retrievedRanksByCadre:mappedRank, filterCadre:true });

      console.log(mappedRank,"mappedRank")
      // mappedRank.forEach(item => {
      //   fetchData(
          
      //     `/StaffPosting/AllDepartmentRankCount?rankId=${item.mappedRankId}&departmentId=${this.state.selectedDeptId}`,
      //     (data) => {
      //       console.log(data, "Foreachmapped")
      //       newArr.push(data);

          
      //     }
      //   );
      // });
      // console.log(mappedRank,"mappedRank")
      // setTimeout(()=>{
      // console.log(newArr, "NeArray")
      // let remappedArr = newArr.map((a,m) =>{
      //   return{
      //     mappedRankName: a.rankCount,
      //   }
      // })
      // this.setState({properCount:remappedArr})

      // },2000)
      // console.log(this.state.compiledRanks,"CompiledRank")


// setTimeout(()=>{
//   this.setState({retrievedRanksByCadre:mappedRank, filterCadre:true})
//   console.log(this.state.retrievedRanksByCadre, "Rettttt")
  
// },2000)
    })
  }

  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <>
        {this.state.successCard ? (
          <NotificationCard
            message="Staff Record was updated successfully"
            checkIcon={true}
            closeCard={this.closeNoticeCard}
            okBtn={true}
          />
        ) : null}

        <Modal
          isOpen={this.state.updateCard}
          // style={{ maxWidth: "700px" }}
        >
          <ModalHeader>
            <i className="fa fa-user" /> &nbsp; {this.state.selectedStaffName}
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label
                htmlFor="example-text-input"
                className="form-control-label"
              >
                Phone Number
              </label>
              <input
                className="form-control"
                type="text"
                class="form-control col-12"
                defaultValue={this.state.selectedPhoneNumber}
                onChange={(e) => {
                  this.setState({ selectedPhoneNumber: e.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="example-text-input"
                className="form-control-label"
              >
                Gender
              </label>

              <select
                className="form-control col-12"
                onChange={(e) => {
                  this.setState({ selectedGenderId: parseInt(e.target.value) });
                }}
              >
                <option>Select Gender</option>

                {this.state.gender &&
                  this.state.gender.map((s, i) => {
                    return (
                      <option
                        value={s.id}
                        key={s.id}
                        selected={s.id == this.state.selectedGenderId}
                      >
                        {s.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="example-text-input"
                className="form-control-label"
              >
                State
              </label>

              <select
                className="form-control col-12"
                onChange={this.handleStateOfOrigin}
              >
                <option>Select State</option>
                {this.state.showStates &&
                  this.state.showStates.map((s, i) => {
                    return (
                      <option
                        value={s.id}
                        key={s.id}
                        selected={s.id == this.state.selectedStateId}
                      >
                        {s.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="example-text-input"
                className="form-control-label"
              >
                LGA
              </label>

              <select
                className="form-control col-12"
                onChange={(e) => {
                  this.setState({ selectedLgaId: parseInt(e.target.value) });
                }}
              >
                <option>Select Local Government</option>

                {this.state.filteredLGA &&
                  this.state.filteredLGA.map((s, i) => {
                    return (
                      <option
                        value={s.id}
                        key={s.id}
                        selected={s.id == this.state.selectedLgaId}
                      >
                        {s.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="example-text-input"
                className="form-control-label"
              >
                Department
              </label>

              <select
                className="form-control col-12"
                onChange={(e) => {
                  this.setState({
                    selectedDepartmentId: parseInt(e.target.value),
                  });
                }}
              >
                <option>Select Department</option>

                <option>Select State</option>
                {this.state.institutionDepts &&
                  this.state.institutionDepts.map((s, i) => {
                    return (
                      <option
                        value={s.id}
                        key={s.id}
                        selected={s.id == this.state.selectedDepartmentId}
                      >
                        {s.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-info" onClick={this.executeUpdate}>
              Save & Update
            </button>

            <button
              className="btn btn-danger"
              onClick={() => {
                this.setState({ updateCard: false });
              }}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        {this.state.spin ? <Spinner2 /> : null}
        {this.state.spinn ? <Spinner /> : null}

        {/* {this.state.spinn ? <Spinner msg={"Please wait..."} /> : null} */}

        <div className="row mb-4 mt-4">
          <div className="col">
            <h1 className="d-inline-block mb-0 pop-font">
              Staff Posting
              <span className="h3 text-muted">
                / Assign Department / View Posting Requests / View Petitions
              </span>
            </h1>

            <span className="text-sm d-block">
              {/* Create and manage Staff Profiles */}
            </span>
          </div>

          <div className="col"></div>
        </div>

        <div className="row mt-4">
          <div
            className="col-xl-3 col-md-6"
            style={{ cursor: "pointer" }}
            onClick={this.toggleAssignCard}
          >
            <div className="card card-stats">
              {/* Card body */}
              <div className="card-body btn btn-outline-info">
                <div className="row">
                  <div className="col pop-font">
                    <h5 className="card-title text-uppercase mb-0">
                      <i className="fa fa-user-circle" />
                      &nbsp; Assign Department to new staff
                    </h5>
                    <span className="h4 font-weight-bold mb-0">
                      {/* {"Assign Department To New Staff"} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-md-6"
            style={{ cursor: "pointer" }}
            onClick={this.toggleHODRequestCard}
          >
            <div className="card card-stats">
              {/* Card body */}
              <div className="card-body btn btn-outline-info">
                <div className="row">
                  <div className="col pop-font">
                    <h5 className="card-title text-uppercase mb-0">
                      <i className="fa fa-envelope" />
                      &nbsp; HOD Request(s) For Staff
                    </h5>
                    <span className="h4 font-weight-bold mb-0">
                      {/* {"Assign Department To New Staff"} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-md-6"
            style={{ cursor: "pointer" }}
            onClick={this.toggleStaffPostingRequestCard}
          >
            <div className="card card-stats">
              {/* Card body */}
              <div className="card-body btn btn-outline-info">
                <div className="row">
                  <div className="col pop-font">
                    <h5 className="card-title text-uppercase mb-0">
                      <i className="fa fa-rocket" />
                      &nbsp; Staff Posting Request(s)
                    </h5>
                    <span className="h4 font-weight-bold mb-0">
                      {/* {"Assign Department To New Staff"} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-md-6"
            style={{ cursor: "pointer" }}
            onClick={this.togglePetitionCard}
          >
            <div className="card card-stats">
              {/* Card body */}
              <div className="card-body btn btn-outline-info">
                <div className="row">
                  <div className="col pop-font">
                    <h5 className="card-title text-uppercase mb-0">
                      <i className="fa fa-thumbs-down" />
                      &nbsp; View Staff Petitions
                    </h5>
                    <span className="h4 font-weight-bold mb-0">
                      {/* {"Assign Department To New Staff"} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.assignCard ? (
          <div className="">
            <div className="py-4">
              <div className="row">
                <div className="col-md-2">
                  <label
                    htmlFor="example-text-input"
                    className="row form-control-label"
                    style={{ marginLeft: "3px" }}
                  >
                    Staff Count By Dept (Single) &nbsp;
                  </label>

                  <label
                    className="custom-toggle"
                    // onClick="showThisForm('publications')"
                  >
                    <input
                      type="checkbox"
                      //   value={this.state.show}
                      onChange={this.handleCountCard}
                    />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      style={{ borderRadius: "34px !important" }}
                      data-label-off="Show"
                      data-label-on="Hide"
                    />
                  </label>
                </div>

                <div className="col-md-2">
                  <label
                    htmlFor="example-text-input"
                    className="row form-control-label"
                    style={{ marginLeft: "3px" }}
                  >
                    Staff Count By Cadre &nbsp;
                  </label>

                  <label className="custom-toggle">
                    <input type="checkbox" onChange={this.handleCountCard2} />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      style={{ borderRadius: "34px !important" }}
                      data-label-off="Show"
                      data-label-on="Hide"
                    />
                  </label>
                </div>
              </div>

              <Fade>
                {this.state.showCountCard ? (
                   <AttentionSeeker effect={"shake"} duration={300}>
                  
                    <h2>Staff Count By Department/Rank</h2>

                    <div className="row col-md-12 staff-list-func">
                      <div className="card col-md-11 dateCard">
                        {/* <div className="card-header crdHeader">
                  <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">
                     
                    </div>
                  </div>
                </div> */}
                        <div className="row card-body">
                          {/* <div className="col-md-6 text-center"> */}
                          {/* <h3>Load List:</h3> */}
                          <br />
                          <br />

                          <div className="col-md-5">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Select Department
                              </label>
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  this.setState({
                                    selectedDeptId: parseInt(e.target.value),
                                  });
                                }}
                                required
                              >
                                <option>Select Department</option>
                                {this.state.institutionDepts &&
                                  this.state.institutionDepts.map((dept, i) => {
                                    return (
                                      <option value={dept.id}>
                                        {dept.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>

                          <div className="col-md-5">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Select Rank
                              </label>
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  this.setState({
                                    selectedRankId: parseInt(e.target.value),
                                  });
                                }}
                                required
                              >
                                <option>Select Rank</option>
                                {this.state.institutionRank &&
                                  this.state.institutionRank.map((rank, i) => {
                                    return (
                                      <option value={rank.id}>
                                        {rank.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>

                          <div className="col-md-2">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Number of Staff
                              </label>

                              <div className="col-auto">
                                <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                  {this.state.finalCount}
                                </div>
                              </div>
                              {/* <h2
                        className="text-muted"

                        
                      >27</h2>
                           */}
                            </div>
                          </div>

                          <div
                            className="row col-md-5"
                            style={{ marginLeft: "8px" }}
                          >
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={this.getCount}
                            >
                              Get Count
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </AttentionSeeker>
                ) : null}
              </Fade>

<Fade>
              {this.state.showCountCard2 ? (
                <AttentionSeeker effect={"shake"} duration={300}>
               
              
                {/* <Fade> */}
                  <h2>Staff Count By Cadre</h2>
                  <div className="card crdHeader">
                    {/* <h4 className=" mb-0 mt-1">Staff Count By Cadre</h4> */}

                    <div className="card-body">
                      <div className="row">
                        {/* <div className="col-md-12">
  <h4 className=" mb-0">Staff Count By Cadre</h4>
              </div> */}
                        <div className="col-md-5">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Select Cadre
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => {
                                this.setState({
                                  selectedCadreId: parseInt(e.target.value),
                                });
                              }}
                              required
                            >
                              <option>Select Cadre</option>
                              {this.state.institutionCadre &&
                                this.state.institutionCadre.map((cadre, i) => {
                                  return (
                                    <option value={cadre.id}>{cadre.name}</option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>

                        
                        <div className="col-md-5">
                     
                             
                          <button
                            className="btn btn-primary"
                            style={{ marginTop: "30px" }}
                            onClick={this.filterCadreCount}
                          >
                            {this.state.cadreLoad ? 
                          <MetroSpinner
                          size={40}
                          color={"white"}
                          loading={this.state.loading}
                          
                          
                        /> :
                       <> <i className="fa fa-hourglass-1" /> Load Count </>
                          }
                            
                          </button>
                        </div>
                      </div>
                      
                      {this.state.filterCadre ?<div className="table-responsive" style={{height:"600px"}}>


                                 <table className="table table-striped">
                                  <thead style={{position:"sticky", top:"0", color:"ghostwhite", zIndex:"1"}} className="thead-dark">
                                    <th className="sticky-top" scope="col" style={{color:"ghostwhite", zIndex:"1"}}>Department</th>
                                  {this.state.rankHead && this.state.rankHead.map((a, i) => {
                                    return(
                                    <th className="sticky-top" scope="col" style={{color:"ghostwhite", zIndex:"1"}}>{a.name}</th>
                                    )
                                  })}
                                  </thead>

                                  <tbody>
                                  
                                    {this.state.retrievedRanksByCadre && this.state.retrievedRanksByCadre.map((c,i) =>{
                                      return(
                                        
                                       <tr>
                                         <td>{c.departmentName}</td>
                                         {/* <td>{c.count}</td> */}
                                         {c.rankStaffCounts.map(a => {
                                           return(
                                           <td>{a.count}</td>
                                           )
                                         })}
                                       </tr>

                                      )
                                    })}
                                  </tbody>

                                  
                                  {/* {this.state.retrievedRanksByCadre && this.state.retrievedRanksByCadre.map((a, i) => {
                                    return(
                                      <tr>
                                    <td>{a.departmentName}</td>
                                  </tr>

                                    )
                                  })} */}
                                </table> 



                        {/* {this.state.filterCadre ? (
                          <RankCountDataTable
                            passedStaffData={this.state.newStaffList}
                            retrievedRanksByCadre={this.state.retrievedRanksByCadre}
                            properCount = {this.state.properCount}
                          />
                        ) : null} */}
                      </div> : null}
                    </div>
                  </div>
                {/* </Fade> */}
                </AttentionSeeker>
              ) : null}
              </Fade>





<Fade duration={1000}>
            <div className="row col-md-11 staff-list-func mt-4">
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
          
             

              {this.state .showNewStaffCard ? <Fade>
                <AssignDeptDataTable
                  passedStaffData={this.state.newStaffList}
                  passedDeptHeads={this.state.removedDuplicates}
                />
              </Fade>: null}
            </div>
            {/* Card stats */}
          </div>
        ) : null}

        {this.state.staffPostingCard ? (
          <Fade>
            <div className="header-body">
              {/* <div className="row align-items-center py-4">
      <div className="col-lg-6 col-7">
        <h6 className="h1 d-inline-block mb-0 pop-font">
          Staff Transfer/Change of Department Requests{" "}
          <span className="h3 text-muted">Approve/Decline</span>
        </h6>
      </div>
      <div className="col-lg-6 col-5 text-right"></div>
    </div> */}
              {/* Card stats */}
              <div className="row">
                <hr className="mx-0" />
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="card-title mb-0 float-left mr-3">
                            Staff Posting Request(s){" "}
                            {/* <b>{_.upperCase(this.state.departmentName)}</b> */}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped">
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
                                  <td>{_.upperCase(a.staffName)}</td>
                                  <td>{a.dateOfRequest.substring(0, 10)}</td>
                                  <td>
                                    {a.isApproved && a.isClosed ? (
                                      <span class="badge badge-success">
                                        Approved
                                      </span>
                                    ) : !a.isApproved && !a.isClosed ? (
                                      <span class="badge badge-warning new-badge">
                                        New
                                      </span>
                                    ) : !a.isApproved && a.isClosed ? (
                                      <span class="badge badge-danger">
                                        Declined
                                      </span>
                                    ) : null}
                                  </td>
                                  <td>
                                    <Link
                                      to={{
                                        pathname: "/StaffTransferLetter",
                                        state: {
                                          data: a,
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        ) : null}
      </>
    );
  }
}
