import React, { Component } from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"

export default class Promotion extends Component {
  state = {
    salaryGradeSystem: [],
    staffGrade: [],
    id: this.props.location.state.id,
    salaryGradeCategory: "",
    salaryGradeCategorys: [],
    salaryGrade: "",
    salaryGrade: [],
    returnData: [],
  }

  async componentDidMount() {
    fetchData(`/StaffGrade/StaffId?id=${this.state.id}`, data => {
      this.setState({ staffGrade: data })
      console.log(data, "data")
    })

    fetchData("/SalaryGradeCategory", data => {
      this.setState({ salaryGradeCategorys: data })
      console.log(data)
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.salaryGradeCategory != this.state.salaryGradeCategory) {
      console.log(this.state.salaryGradeCategory)
      fetchData(
        `/SalaryGradingSystem/GetGradeBenefitsBySalaryGradeCategoryId/?salaryGradeCategoryId=${this.state.salaryGradeCategory}`,
        data => {
          this.setState({ salaryGrades: data })
          console.log(data)
        }
      )
    }

    if (prevState.returnData != this.state.returnData) {
      fetchData(`/StaffGrade/StaffId?id=${this.state.id}`, data => {
        this.setState({ staffGrade: data })
        console.log(data, "data")
      })

      fetchData("/SalaryGradeCategory", data => {
        this.setState({ salaryGradeCategorys: data })
        console.log(data)
      })
    }
  }

  postSalaryData = () => {
    postData(
      `/SalaryGradingSystem/AddStaffGrade?staffId=${this.state.id}&salaryGradeId=${this.state.salaryGrade}`,
      null,
      data => {
        this.setState({ returnData: data })
        console.log(data, "returnData")
      }
    )
  }

  render() {
    console.log(this.state.id, "id")
    return (
      <div className="header-body">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Grade</th>
                  <th>Date Promoted</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {this.state.staffGrade && this.state.staffGrade.length > 0
                  ? this.state.staffGrade.map(staff => {
                      return (
                        <tr key={staff.id}>
                          <td>
                            <h5 className="mt-2">
                              {staff.salaryGrade.salaryGradeCategory.name}
                            </h5>
                          </td>
                          <td>
                            <h5 className="mt-2">
                              {"GL" +
                                staff.salaryGrade.salaryLevel.name.split(
                                  " "
                                )[1] +
                                "S" +
                                staff.salaryGrade.salaryStep.name.split(" ")[1]}
                            </h5>
                          </td>
                          <td>
                            <h5 className="mt-2">
                              {staff.datePromoted.toString().slice(0, 10)}
                            </h5>
                          </td>
                          <td>
                            <h5 className="mt-2">
                              {staff.active ? "True" : " False"}
                            </h5>
                          </td>
                        </tr>
                      )
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="example-text-input" className="form-control-label">
            Salary Grade Category
          </label>
          <select
            className="form-control"
            onChange={this.handleChange}
            name="salaryGradeCategory"
            id="salaryGradeCategory"
            value={this.state.salaryGradeCategory}
          >
            <option value={0}>Select Salary Grade Category</option>
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
          <label htmlFor="example-text-input" className="form-control-label">
            Salary Grade
          </label>
          <select
            className="form-control"
            onChange={this.handleChange}
            name="salaryGrade"
            id="salaryGrade"
            value={this.state.salaryGrade}
          >
            <option value={0}>Select Salary Grade</option>
            {this.state.salaryGrades && this.state.salaryGrades.length > 0
              ? this.state.salaryGrades.map(salary => (
                  <option
                    key={salary.salaryGrade.id}
                    value={salary.salaryGrade.id}
                  >
                    {"GL" +
                      salary.salaryGrade.salaryLevel.name.split(" ")[1] +
                      "S" +
                      +salary.salaryGrade.salaryStep.name.split(" ")[1]}
                  </option>
                ))
              : null}
          </select>
        </div>
        <button
          type="button"
          onClick={this.postSalaryData}
          disabled={!this.state.salaryGrade}
          data-dismiss="modal"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    )
  }
}
