import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import AlertBox from "./alertBox"
import Spinner from "../admin/Spinner"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  

} from "reactstrap";
import {Redirect} from "react-router-dom";

export default class NominalRollRequest extends React.Component {
  state = {
    departments: [],
    documentType: [],
    name: "",
    id: 0,
    active: true,
    documentType: "",
    added: false,
    spin:false,
    payloadDTO: JSON.parse(localStorage.getItem("DTOFULL")),
    departmentId:0

  }


  handleMonth = e => {
    this.setState({
      selectedMonth: parseInt(e.target.value),
    })

    if(typeof window !== "undefined"){
      console.log(this.state.selectedMonth, "Month")
      const sel = document.getElementById("myMonth");
      const monthExtract = sel.options[sel.selectedIndex].text
      console.log(monthExtract);

      this.setState({
        monthExtract: monthExtract
      })

    }
  }

  handleYear = e => {
    this.setState({
      selectedYear: parseInt(e.target.value),
    })

    if(typeof window !== "undefined"){
      console.log(this.state.selectedYear, "Year")
      const sel = document.getElementById("myYear");
      const yearExtract = sel.options[sel.selectedIndex].text
      console.log(yearExtract);

      this.setState({
        yearExtract: yearExtract
      })

    }
  }

  loadStaff = () => {
      let currentState = this

      
      currentState.setState({
          spin:true
      })
      
      setTimeout(() => {
        fetchData(`/StaffNominalRoll/PullStaffForMonthlyNominalRoll?departmentId=${parseInt(this.state.departmentId)}&month=${this.state.selectedMonth}&year=${this.state.selectedYear}`, data => {
            console.log(data, "Nominal Info")
            currentState.setState({
                nominalInfo:data
            })
            if(data){

                currentState.setState({
                  spin:false,
                   redirect:true
              })
             
  
            }
            else{
              
                currentState.setState({
                    spin:false
                })
                  alert("Bad Request")
            }
        })
      }, 2000)
   
  }

  componentDidMount() {
    fetchData("/InstitutionDepartments", (data) => {
      this.setState({ departments: data });
    });

  }

  
  
  

  render() {
      if(this.state.redirect){
          return(
            <Redirect to={{pathname:"/PullNominalRoll", state:{
                nominalInfo:this.state.nominalInfo,
                yearExtract:this.state.yearExtract,
                monthExtract:this.state.monthExtract
            }}}/>
          )
      }
    return (
      <>

        {this.state.spin ? <Spinner msg={"Loading Staff..."}/> : null}

        {this.state.added == true ? (
          <AlertBox ok={this.closeAdded} message={"Succesfully Added!"} />
        ) : null}
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Monthly Staff Nominal Roll{" "}
                <span className="h3 text-muted">
                
                </span>
              </h6>
              <span className="text-sm d-block">
                {/* Upload/Update Staff Document */}
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>


          {/* Card stats */}
          <div className="row justify-content-center">
            <hr className="mx-0" />
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
        {/* <h4 className=" mb-0">Manage Staff Document</h4> */}
                    </div>
                    <div className="col">
                     
                    </div>
                  </div>
                </div>
                <div className="card-body">
                <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   Month
                  </label>

                  <select
                    className="form-control col-12"
                    id="myMonth"
                    onChange={this.handleMonth}
                  >
                    <option>Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>

                   
                  </select>
                  </div>

                  <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   Year
                  </label>

                  <select
                  id="myYear"
                    className="form-control col-12"
                    onChange={this.handleYear}
                  >
                    <option> Select Year</option>
                    <option value="2019"> 2019 </option>
                    <option value="2020"> 2020 </option>
                    <option value="2021"> 2021 </option>

                 
                  </select>
                  </div>

                  <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                    
                   Department <small className="text-warning">(Optional)</small>
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {this.setState({departmentId:e.target.value})}}
                  >
                    <option> Select Department</option>
                    {this.state.departments && this.state.departments.map(d => {
                      return(
                        <option value={d.id}>{d.name}</option>
                      )
                    })}

                 
                  </select>
                  </div>
                <br/>

                <button
                    type="button"
                    className="btn btn-info text-white"
                   onClick={this.loadStaff}
                    
                  >
                    Load List
                  </button>
              </div>
             
             
             
              </div>
            </div>
          </div>
        
        
        
        </div>
       
       
       
       
        <div className="container-fluid mt--6">
          <div></div>
    

         
     
      
        </div>
      </>
    )
  }
}
