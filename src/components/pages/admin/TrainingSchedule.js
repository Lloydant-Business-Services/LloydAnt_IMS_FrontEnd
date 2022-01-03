import React from "react";
import { fetchData, postData, editData, URL } from "../../../utils/crud";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import AssignDeptDataTable from "../DataTables/TrainingScheduleDT";
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
    //fetchData(`/TrainingRequest/GetTrainingScheduleFaculty?FacId=18`, (data) => {
        fetchData(`/TrainingRequest/GetTrainingSchedule?DeptId=85`, (data) => {
        
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
          staffName: _.upperCase(d.staffName),
          staffNumber: _.upperCase(d.staffNumber),
          userName: d.username,
        //   staffIdentityNumber: _.upperCase(d.staffNumber),
        //   department: _.upperCase(d.department),
        //   salaryCategory:
        //     d.salaryCategory +
        //     " " +
        //     d.salaryLevel +
        //     " " +
        //     "STEP" +
        //     " " +
        //     d.salaryStep,
        //   rank: _.upperCase(d.rank),
        //   defaultDepartmentName: d.defaultDepartmentName,
        //   dateOfAssumption: d.dateOfAssumption.substring(0, 10),
        //   comment: d.comment,
        //   headRep:d.headRep == "Unassigned" ? "-" : d.headRep,
          action: (
           ""
          ),

          
        };
      });


  // console.log(mappedStaff, "mapp!!!");
  console.log(this.state.removedDuplicates, "Fisrt Dupll!!!");

      this.setState({
        newStaffList: mappedStaff,
        spinn: false,
        //removedDuplicates: this.removeDuplicates(mappedHeadReps, item => item.newHeadRep),
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
//his.state.removedDuplicates.unshift(obj, obj1, obj2, obj3);

    //   setTimeout(() => {
    //     console.log(mappedStaff, "mapp!!!");
    //     console.log(this.state.removedDuplicates, "Final Removal!!!");
    //   }, 2000);
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
      this.filterStaff();
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
      



        {this.state.assignCard ? (
          <div className="">
            <div className="py-4">
         


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
                  passedDepartment={"BURSARY"}
                  passedDate={"May 19th - May 20th, 2021"}
                />
              </Fade>: null}
            </div>
            {/* Card stats */}
          </div>
        ) : null}

      
      </>
    );
  }
}
