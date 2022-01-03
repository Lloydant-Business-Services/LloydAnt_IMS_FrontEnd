import React from "react"
import { fetchData, postData, editData, deleteData, curr } from "../../../utils/crud"
import {currencyFormat, amountToWords, GetDate} from "../../../utils/helpers"
import logosm from "../../../images/ziklogosm.png"
import qrcode from "../../../images/qr-code.png"

export default class Paycheck extends React.Component {
  state = {
    departments: [],
    units: [],
    name: "",
    id: 0,
    active: true,
    userInfo: "",
    // newId: this.props.user.userId,
    staff: "",
    queryForm: false,
    showCheque: true,
    newId: JSON.parse(localStorage.getItem("DTO")),
    payLoad: JSON.parse(localStorage.getItem("userData")),

  }

  componentDidMount() {
    fetchData(`/Staff/${this.state.payLoad?.staffId}`, data => {
      this.setState({ staff: data })
      console.log(this.state.staff, "Staff New Info")
    })

    fetchData(
      `/SalaryGradingSystem/GetStaffCurrentPaycheck${this.state.newId}`,
      data => {
        this.setState({ staff: data })
        console.log(this.state.staff, "Staff New Info")
      }
    )

    fetchData(
      `/SalaryGradingSystem/GetStaffPayCheque?staffId=${this.state.payLoad?.staffId}`,
      data => {
        this.setState({ staff_paycheque: data })
        setTimeout(() => {
          console.log(this.state.staff_paycheque, "PayCheck")

        },2000)
      }
    )

    

    console.log(this.state.newId, "newID")
    fetchData("/InstitutionDepartments", data => {
      this.setState({ departments: data })
    })

    fetchData("/InstitutionUnits", data => {
      this.setState({ units: data })
    })

    //   window.localStorage.getItem("liteHRUser", JSON.stringify(user))
    let jay = JSON.parse(localStorage.getItem("liteHRUser"))
    this.setState({
      userInfo: jay,
    })

    // this.setState({
    //     userInfo: JSON.parse(localStorage.getItem("liteHRUser"))
    // });
    setTimeout(() => {
      console.log(this.state.userInfo, "UserInfo")
    }, 3000)

    console.log(JSON.parse(localStorage.getItem("liteHRUser")))
  }

  addDepartment = () => {
    if (this.state.name !== "") {
      const department = {
        id: 0,
        name: this.state.name,
        active: this.state.active,
      }
      postData("/InstitutionDepartments", department, data => {
        const { departments } = this.state
        departments.push(data)
        this.setState({ ...this.state, departments, name: "", active: true })
      })
    }
  }

  addUnit = () => {
    if (this.state.name !== "") {
      const unit = {
        id: 0,
        name: this.state.name,
        active: true,
      }
      postData("/InstitutionUnits", unit, data => {
        const { units } = this.state
        units.push(data)
        this.setState({ ...this.state, units, name: "", active: true })
      })
    }
  }
  trigger = () => {
    this.setState({
      queryForm: false,
      showCheque: true,
      showBack: true,
    })
  }

  updateUnit = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      const unit = {
        id: this.state.id,
        name: this.state.name,
        active: this.state.active,
      }
      editData(`/InstitutionUnits/${this.state.id}`, unit, () => {
        fetchData("/InstitutionUnits", data => {
          this.setState({ units: data })
        })
      })
    }
  }

  deleteUnit = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/InstitutionUnits/${this.state.id}`, () => {
        fetchData("/InstitutionUnits", data => {
          this.setState({ units: data })
        })
      })
    }
  }

  updateDepartment = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      const department = {
        id: this.state.id,
        name: this.state.name,
        active: this.state.active,
      }
      editData(`/InstitutionDepartments/${this.state.id}`, department, () => {
        fetchData("/InstitutionDepartments", data => {
          this.setState({ departments: data })
        })
      })
    }
  }

  deleteDepartment = () => {
    if (this.state.name !== "" && this.state.id > 0) {
      deleteData(`/InstitutionDepartments/${this.state.id}`, () => {
        fetchData("/InstitutionDepartments", data => {
          this.setState({ departments: data })
        })
      })
    }
  }

  loadEditData = data => {
    this.setState({
      name: data.name,
      id: data.id,
      active: data.active,
    })
  }
  printTable = () => {
    if(typeof window !== "undefined"){
      document
      .querySelectorAll(".ghost")
      .forEach(el => (el.style.visibility = "hidden"))
      window.print()    
    }
  }
  goBack = () => {
    this.setState({
      queryForm: true,
      showCheque: false,
      showBack: false,
    })
  }

  render() {
    var dateYear = new Date();
    return (
      <>
        <div>

        <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Payroll{" "}
                <span className="h3 text-muted">
                  /Pay-Slip
                </span>
              </h6>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
        </div>

        <div className="row justify-content-center">
            <div className="col-md-8">

                <div className="card">
                    {/* <div className="card-header">
                        <h3>Staff Pay Slip</h3>  
                    </div>   */}
                    <div className="card-body">
                      <div className="">
                        {this.state.queryForm == true ? (
                          <div className="">
                            <div className="">
                              
                              <div className="">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="example-text-input"
                                        className="form-control-label" >
                                        Month{" "}
                                      </label>

                                      <select className="form-control select-search-dropdown"
                                        id="mySelect" name="staffId" required onChange={this.handleMonthId} >
                                          <option value="0">-- Select Month --</option>
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
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="example-text-input" className="form-control-label" >
                                          Year
                                      </label>
                                      <select className="form-control select-search-dropdown"
                                        name="assetId" required onChange={this.handleYearId} >
                                          <option>-- Select Year -- </option>
                                          <option value="2018">2018</option>
                                          <option value="2019">2019</option>
                                          <option value="2020">2020</option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* <div className="jumbo-back"></div> */}
                                </div>

                                <button type="button" onClick={this.trigger} 
                                  data-dismiss="modal" className="btn btn-primary" >
                                  Generate Pay-Slip
                                </button>
                                {/* <Link
                          state={this.state.attendanceReport}
                          to={"app/admin/attendanceReport"}
                        > */}
                                {/* Pull
                        </Link> */}
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {this.state.showCheque == true ? (
                          <div className="col-lg-12 mx-auto">
                            <div className="bg-sky paycheck-div">
                              <div className="card-body">
                                <div className="">
                                  <div className="row mb-3">
                                    <div className="col-8">
                                      <h5 className="font-weight-bold">
                                        <img
                                          className="mr-2"
                                          alt="Logo"
                                          src={logosm}
                                          style={{ height: "40px" }}
                                        />
                                        Nnamdi Azikiwe University
                                      </h5>
                                      <h6 className="text-sm">
                                        Awka, Anambra State,
                                        Nigeria
                                      </h6>
                                    </div>

                                    <div className="col-4 text-right">
                                      <span className="text-sm">Date: </span>
                                      <span className="border-bottom border-heavy font-weight-bold ">
                                      {GetDate()}
                                      </span>
                                      <div className="">
                                        <span className="avatar avatar-xl ml-auto">
                                          <img src={qrcode} />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />

                                  <div className="row mb-2">
                                    <div className="col-2">
                                      <span className="text-sm">Pay: </span>
                                    </div>
                                    <div className="col-6">
                                      <p className=" h3 font-weight-bold border-bottom text-center">
                                        {" "}
                                        {this.state.staff
                                          ? this.state.staff?.person?.surname
                                          : ""}{" "}
                                        {this.state.staff
                                          ? this.state.staff?.person?.othername
                                          : ""}{" "}
                                        {this.state.staff
                                          ? this.state.staff?.person?.firstname
                                          : ""}
                                      </p>
                                    </div>
                                    <div className="col-4 border text-center">
                                      <span className="h4 font-weight-bold">
                                        {" "}
                                        {/* &#8358; 152 000.00{" "} */}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-12">
                                                                       {this.state.staff_paycheque?.amountInWords ? <p  className="">The Sum Of: &nbsp; &nbsp; &nbsp;<span style={{fontSize:'20px'}}> <i>    {this.state.staff_paycheque?.amountInWords} Naira Only</i></span> </p> : "-"}
                                     

                                    </div>
                                    <div className="col-10">
                                      {/* <p className=" h3 font-weight-bold border-bottom text-center">
                                        {" "}
                                        {this.state.staff_paycheque?.amount > 0 ? currencyFormat(this.state.staff_paycheque.amount) : null}
                                      </p> */}
                                    </div>
                                  </div>
                                 
                                  <hr />

                                  <div className="row mt-3">
                                    <div className="col-6">
                                    <p className="">
                                        {" "}
                                        Amount: {this.state.staff_paycheque?.amount > 0 ? currencyFormat(this.state.staff_paycheque.amount) + ".00" : null}
                                      </p>
                                      <span className="text-sm">Salary Grade Category For: </span>
                                      <p className="d-inline h5 font-weight-bold border-bottom text-center">
                                        {/* {" "}For{" "} */}
                                        {this.state.staff_paycheque?.staffSalaryDetails}
                                      </p>
                                    </div>
                                    <div className="col-6 text-right">
                                      <span className="text-sm">for: </span>
                                      <p className="d-inline h5 font-weight-bold border-bottom">
                                        {" "}
                                        {GetDate()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                            </div>

                            <div className="mt-4">
                                <button className="btn btn-primary ghost"
                                  id="pay-exp" onClick={this.printTable} >
                                  Export
                                </button>
                            </div>

                          </div>
                        ) : null}
                      </div>
                    </div>
                    
                </div>

                  {this.state.showBack == true ? (
                  <div className="">
                      <button className="btn btn-sm btn-outline-primary" onClick={this.goBack}>
                          <i className="fa fa-caret-left"></i> Back
                      </button>
                  </div>
                ) : null}

            </div>
            
        </div>
        
          
        </div>
      </>
    )
  }
}
