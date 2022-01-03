import React from "react"
// import { Link, navigate } from "gatsby"
import { fetchData, postData, editData } from "../../../utils/crud"
import _ from "lodash"
import axios from "axios"
import Layout from "../../layout"
import {Link, Redirect} from "react-router-dom"
import SideBar from "../../NewSideBar"
import AdminFooter from "../admin/AdminFooter"

import Spinner from "./Spinner"
// import ReactTable from "react-table";
// import "react-table/react-table.css";


// import Spinner from "./Spinner"

import TemporalStaffDataTable from "./TemporalStaffDataTable"
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
} from "reactstrap"

export default class Staff extends React.Component {
  state = {
    spinn:true,
    staffRegu:false,
    spin: false,
    personFirstName: "".firstname,
    personOtherName: "",
    confirmRegularization: false,
    lastname: "",
    firstname: "",
    othername: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
    regularizationDate: "",
    departmentId: 0,
    unitId: 0,
    genderId: 0,
    appointmentTypeId: 0,
    appointmentId: 0,
    staffCategoryId: 0,
    stateOfOriginId: 0,
    lgaId: 0,
    rankeId: 0,
    staffCadreId: 0,
    staffNum: "NAU/",
    religionId: 0,
    maritalStatusId: 0,
    newID: "",
    spinner: true,
    editStaff: "",
    allStaff: [],
    allStaffSearch: [],
    staff: {
      staffNumber: "NAU/",
      person: {
        surname: "",
        firstname: "",
        othername: "",
        birthDay: "",
        email: "",
        address: "",
        phoneNumber: "",
        stateId: 0,
        lgaId: 0,
        maritalStatusId: 0,
        religionId: 1,
        genderId: 0,
        id: 0,
        staffTypeId: 0,
      },
      rankId: 0,
      departmentId: 0,
      appointmentId: 0,
      unitId: 0,
      staffTypeId: 0,
      categoryId: 0,
      id: 0,
    },
    appointments: [],
    units: [],
    departments: [],
    ranks: [],
    states: [],
    lgas: [],
    maritalStatus: [],
    genders: [],
    staffTypes: [],
    staffCategories: [],
    searchText: "",
  }

  updatePersonItem = (index, value) => {
    const { staff } = this.state
    staff.person[index] = value
    this.setState({ ...this.state, staff })
  }

  updateStaffItem = (index, value) => {
    const { staff } = this.state
    staff[index] = value
    this.setState({ ...this.state, staff })
  }

  loadStaff = () => {
    fetchData("/Staff", data => {
      this.setState({ allStaff: data, allStaffSearch: data })
    })
  }
  alertHi = () => {
    alert("Worked")
  }
  loadStaffData = data => {
    this.setState({
      confirmRegularization: true,
      name: data.name,
      id: data.id,
      active: data.active,
      personFirstName: data.person.firstname,
      personOtherName: data.person.othername,
      surname: data.person.surname,
    })
    alert(this.state.id);
    console.log(data)
  }
  loadAppointmentType = () => {
    fetchData("/AppointmentType", data => {
      this.setState({ appointmentType: data })
    })
    // setTimeout(()=>{
    //   console.log(this.state.appointmentType, "Appointment Type!!!!")
    // },2000)
  }
  handleRegularization = e => {
    e.preventDefault()
    this.setState({
        regLoad: true
    })
    const newState = this;

    const regStaff = {
      staffId: parseInt(this.state.id),
      appointmentTypeId: 1,
    
    }

    axios({
      method: "PUT",
      url: "http://97.74.6.243/litehr/api/Staff/RegularizeStaff",
      data: regStaff,
      config: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
      .then(res => {
        newState.componentDidMount();

          newState.setState({
              staffRegu:true,
              regLoad:false
          })
        console.log(res, "Response")
      })
      .catch(err => {
          newState.setState({
            regLoad:false

          })
        alert("Error Submitting Form")
        console.log(err)
      })
  }

  componentDidMount() {

    if(!localStorage.getItem("userData")){
      this.setState({
          userRedirect:true
      })

     
   
  }
    let currentState = this
    fetchData("/Staff/GetTemporalStaff", data => {
      this.setState({
        newData: data,
        spinn:false
      })

      // localStorage.setItem(
      //   "locals",
      //   JSON.stringify(data)
      // );
      // this.setState({
      //   browserStorage: JSON.parse(localStorage.getItem("locals"))
      // });
      let mappedStaff = data.map((d, i) => {
        this.setState({
          newID: d.personId,
        })
       

        return {
           sn: i + 1,
         
           username: d.userName,
           name: <Link to={{pathname:"/StaffProfileTest", state:{data: d.staffId} }}>
                   {d.surname + " " + d.firstName + " " + d.otherName}
                   </Link>,
           staffIdentityNumber: d.staffIdentityNumber,
           email: d.email || "-",
          //  dob: d.staffDOB.substring(0,10),
           rank:d.staffRank,
           department:d.staffDepartment || "-",
           staffId: d.staffId,
           action2: (
             <Link
               to={{
                 pathname: "/Edit_Staff_Profile",
                 state: { data: d.staffId, compoTitle: "Temporal" },
               }}
               className="btn btn-warning btn-sm myLinks"
             >
               <i className="fa fa-edit"></i>
             </Link>
           ),
         
           
        }
        
      })
      // localStorage.setItem(
      //   "mappo",
      //   JSON.stringify(mappedStaff)
      // );
      // this.setState({
      //   browser: JSON.parse(localStorage.getItem("mapo"))
      // });
      // console.table(mappedStaff)
      this.setState({
        myStaff: mappedStaff,
      })

      this.setState({ allStaff: data, allStaffSearch: data })
    })

    this.loadAppointmentType()

    setTimeout(() => {
      console.log(this.state.allStaff)
    }, 4000)
  }

  handleAppointmentType = e => {
    this.setState({
      appointmentTypeId: parseInt(e.target.value),
    })
  }

  submitForm = () => {
    postData("/Staff/AddSingleStaff", this.state.staff, data => {
      this.loadStaff()

      //Re-mount the component to force a reload
      this.componentDidMount()
    })
  }
  closeExistToggle = () => {
    this.setState({
      confirmRegularization: false,
    })
  }

  closeReg = () => {
    this.setState({
      staffRegu: false,
      confirmRegularization:false
    })
  }

  render() {
    if(this.state.userRedirect){
      return(
          <Redirect
          to={{pathname:"/Login"}}
          />
      )
  }
 
    return (
      <>
      {/* <SideBar/> */}
    
      {this.state.spinn ? <Spinner msg={"Loading Staff List, please wait..."}/> : null}
        <Modal isOpen={this.state.staffRegu} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">Staff Regularization Successful!</h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"info"}
              onClick={this.closeReg}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.confirmRegularization} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary">
             
            </ModalHeader>

            <form>
            

           Confirm regularization of   <b>
                {this.state.surname}{" "}
                {this.state.personFirstName}{" "}
                ?
              </b>
            </form>
          </ModalBody>
          <ModalFooter>
            {this.state.regLoad ? <span className="text-primary">
              Regularizing Staff, please wait.....
            </span> : null}

            <Button
              className="ok-btn"
              color={"success"}
              onClick={e => this.handleRegularization(e)}
            >
              Confirm
            </Button>
            <Button
              className="ok-btn"
              color={"danger"}
              onClick={this.closeExistToggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* <div id="dashboard">
        



        <div class="dashboard-content"> */}
        <div className="">
          {/* {this.state.spinner == true ? <Spinner /> : null} */}
          <div className="py-4">
            <div className="row mb-4">
              <div className="col">
                <h1 className="d-inline-block mb-0 pop-font">
                  Staff Regularization
                  <span className="h3 text-muted">/Temporal Staff</span>
                </h1>

                <span className="text-sm d-block">
                  Manage Staff Regularization
                </span>
              </div>

            </div>

            <TemporalStaffDataTable
              passedStaffData={this.state.myStaff}
              take={this.state.staff.staffNumber}
            />
          </div>
          {/* Card stats */}
        </div>
        {/* </div>
        </div> */}
        <AdminFooter/>
       
      </>
    )
  }
}
