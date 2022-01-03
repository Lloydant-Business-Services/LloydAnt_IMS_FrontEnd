import React, { Component } from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"

export default class StaffPayrollGrade extends Component {
  state = {
    salaryGradeCategorys: [],
    salaryLevels: [],
    salarySteps: [],
    salaryTypes: [],
    salaryGradeCategory: "",
    salaryLevel: "",
    salaryStep: "",
    salaryType: "",
    staffSalary: [],
  }

  async componentDidMount() {
    await fetchData("/SalaryGradeCategory", data => {
      this.setState({ salaryGradeCategorys: data })
    })

    await fetchData("/SalaryLevel", data => {
      this.setState({ salaryLevels: data })
    })

    await fetchData("/SalaryStep", data => {
      this.setState({ salarySteps: data })
    })

    await fetchData("/SalaryType", data => {
      this.setState({ salaryTypes: data })
    })

    if (localStorage.getItem("staffSalary") != null) {
      this.setState({
        staffSalary: JSON.parse(localStorage.getItem("staffSalary")),
      })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.staffSalary.length !== this.state.staffSalary.length) {
      localStorage.setItem(
        "staffSalary",
        JSON.stringify(this.state.staffSalary)
      )
      this.setState({
        staffSalary: JSON.parse(localStorage.getItem("staffSalary")),
      })
    }
  }

  append = () => {
    let id = this.state.salaryType
    let selectedSalaryType = []
    let selectedSalaryTypeArray = this.state.staffSalary.filter(
      salary => salary.id == id
    )

    if (selectedSalaryTypeArray.length == 0) {
      selectedSalaryType = this.state.salaryTypes.filter(
        salary => salary.id == id
      )

      this.setState(prevState => ({
        staffSalary: prevState.staffSalary.concat(selectedSalaryType),
        salaryType: "",
      }))
    }

    let reset = typeof window !== "undefined" ? document.getElementById("salaryType") : null;
    reset.selectedIndex = 0
  }

  deleteItem = id => {
    let staffSalary = this.state.staffSalary.filter(salary => salary.id != id)
    this.setState({ staffSalary })
  }

  postSalaryData = async () => {
    let salaryTypeModels = this.state.staffSalary.map(salary =>
      parseInt(salary.id)
    )
    console.log(salaryTypeModels)
    let salaryData = {
      salaryCategoryId: parseInt(this.state.salaryGradeCategory),
      salaryStepId: parseInt(this.state.salaryLevel),
      salaryLevelId: parseInt(this.state.salaryStep),
      salaryTypeModels,
    }
    console.log(salaryData)
    if (
      this.state.salaryLevel &&
      this.state.salaryStep &&
      this.state.salaryGradeCategory &&
      salaryTypeModels.length > 0
    ) {
      await postData(
        "/SalaryGradingSystem/AddGradeBenefit",
        salaryData,
        data => {
          console.log(data)
          localStorage.clear()

          this.setState({
            salaryGradeCategory: "",
            salaryLevel: "",
            salaryStep: "",
            staffSalary: [],
          })

          let salaryGradeCategoryReset = null;
          let salaryLevelReset = null;
          let salaryStepReset = null;

          if(typeof window !== "undefined"){
            salaryGradeCategoryReset = document.getElementById(
              "salaryGradeCategory"
            );

            salaryLevelReset = document.getElementById("salaryLevel");
            salaryStepReset = document.getElementById("salaryStep")
          }

          salaryGradeCategoryReset.selectedIndex = 0
          salaryLevelReset.selectedIndex = 0
          salaryStepReset.selectedIndex = 0
        }
      )
    }
  }

  render() {
    return (
      <div>

        <div className="row align-items-center py-4">
            <div className="col-lg-12 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Staff Payroll Grade{" "}
              </h6>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
        </div>

        <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">

                  <div className="card-header">
                    <h3>Set Salary Grade Emolument</h3>
                  </div>
                  <div className="card-body">
                <div className="header-body">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label" >
                      Salary Grade Category
                    </label>
                    <select className="form-control" onChange={this.handleChange}
                      name="salaryGradeCategory" id="salaryGradeCategory" >

                        <option value={0}>Select Grade Category</option>
                        {this.state.salaryGradeCategorys &&
                        this.state.salaryGradeCategorys.length > 0
                          ? this.state.salaryGradeCategorys.map(salary => (
                              <option key={salary.id} value={salary.id}>
                                {salary.name}
                              </option>
                            ))
                          : null}

                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label" >
                      Salary Level
                    </label>
                    <select className="form-control" onChange={this.handleChange}
                      name="salaryLevel" id="salaryLevel" >

                      <option value={0}>Select Level</option>
                      {this.state.salaryLevels && this.state.salaryLevels.length > 0
                        ? this.state.salaryLevels.map(salary => (
                            <option key={salary.id} value={salary.id}>
                              {salary.name}
                            </option>
                          ))
                        : null}

                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label" >
                      Salary Step
                    </label>
                    <select className="form-control" onChange={this.handleChange}
                      name="salaryStep" id="salaryStep" >

                      <option value={0}>Select Step</option>
                      {this.state.salarySteps && this.state.salarySteps.length > 0
                        ? this.state.salarySteps.map(salary => (
                            <option key={salary.id} value={salary.id}>
                              {salary.name}
                            </option>
                          ))
                        : null}

                    </select>
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Emolument
                    </label>
                    <select
                      className="form-control"
                      onChange={this.handleChange}
                      name="salaryType"
                      id="salaryType"
                    >
                      <option value={0}>Select Emolument</option>
                      {this.state.salaryTypes && this.state.salaryTypes.length > 0
                        ? this.state.salaryTypes.map(salary => (
                            <option key={salary.id} value={salary.id}>
                              {`${salary.name} ${salary.amount}`}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                  <button className="btn btn-danger" onClick={this.append}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>

                </div>
              </div>
              
              </div>
        
            </div>
        </div>



        <div className="row justify-content-center">
            <div className="col-md-8">

                <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Emolument</th>
                              <th>Amount</th>
                              <th>Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.staffSalary && this.state.staffSalary.length > 0
                              ? this.state.staffSalary.map(salary => {
                                  return (
                                    <tr key={salary.id}>
                                      <td>
                                        <h5 className="mt-2">{salary.name}</h5>
                                      </td>
                                      <td>
                                        <h5 className="mt-2">{salary.amount}</h5>
                                      </td>
                                      <td>
                                        <span
                                          onClick={() => this.deleteItem(salary.id)}
                                          className="h2 cpoint mr-4"
                                          data-toggle="modal"
                                          data-target=".edit-unit-modal"
                                        >
                                          <i className="d-inline fa fa-backspace" />
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                })
                              : null}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="card-footer">
                        <button type="button" onClick={this.postSalaryData}
                          disabled={
                            this.state.staffSalary.length == 0 ||
                            !this.state.salaryGradeCategory ||
                            !this.state.salaryLevel ||
                            !this.state.salaryStep
                          }
                        data-dismiss="modal" className="btn btn-primary" >
                        Submit
                      </button>
                
                    </div>
                </div>
          
            </div>
        </div>
      </div>
      )
  }
}
