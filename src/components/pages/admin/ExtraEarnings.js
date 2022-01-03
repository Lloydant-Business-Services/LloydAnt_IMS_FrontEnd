import React, { Component } from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"

export default class Promotion extends Component {
  state = {
    id: this.props.location.state.id,
    salaryExtraTypes: [],
    salaryExtraType: "",
    salaryExtraType1: "",
    additionAmount: "",
    deductionAmount: "",
    returnData: [],
    spin: false,
  }

  async componentDidMount() {
    fetchData(`/SalaryExtraType`, data => {
      this.setState({ salaryExtraTypes: data })
      console.log(data, "data")
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addSalaryExtraEarning = () => {
    const salaryExtraEarning = {
      staffId: parseInt(this.state.id),
      staff: {
        personId: 0,
        staffNumber: "string",
        person: {
          imageUrl: "string",
          surname: "string",
          firstname: "string",
          othername: "string",
          birthDay: "2020-03-18T11:27:34.207Z",
          email: "string",
          address: "string",
          phoneNumber: "string",
          stateId: 0,
          lgaId: 0,
          maritalStatusId: 0,
          religionId: 0,
          genderId: 0,
          state: {
            name: "string",
            active: true,
            id: 0,
          },
          lga: {
            stateId: 0,
            state: {
              name: "string",
              active: true,
              id: 0,
            },
            name: "string",
            active: true,
            id: 0,
          },
          maritalStatus: {
            name: "string",
            active: true,
            id: 0,
          },
          religion: {
            name: "string",
            active: true,
            id: 0,
          },
          gender: {
            name: "string",
            active: true,
            id: 0,
          },
          id: 0,
        },
        rankId: 0,
        departmentId: 0,
        appointmentId: 0,
        rank: {
          name: "string",
          active: true,
          id: 0,
        },
        department: {
          name: "string",
          active: true,
          id: 0,
        },
        appointment: {
          name: "string",
          active: true,
          id: 0,
        },
        unitId: 0,
        unit: {
          name: "string",
          active: true,
          id: 0,
        },
        staffTypeId: 0,
        staffType: {
          name: "string",
          active: true,
          id: 0,
        },
        categoryId: 0,
        category: {
          name: "string",
          active: true,
          id: 0,
        },
        id: 0,
      },
      salaryExtraTypeId: parseInt(this.state.salaryExtraType),
      salaryExtraType: {
        name: "string",
        active: true,
        id: 0,
      },
      amount: parseInt(this.state.additionAmount),
      dateCreated: new Date(),
      isDeductible: false,
      active: true,
      id: 0,
    }

    this.setState({
      spin: true,
    })
    postData(
      `/SalaryExtraEarning/AddSalaryExtraEarning`,
      salaryExtraEarning,
      data => {
        this.setState({ returnData: data, spin: false, additionAmount: "" })
        console.log(data, "returnData")
        let reset = typeof window !== "undefined" ? document.getElementById("salaryExtraType") : null
        reset.selectedIndex = 0
      }
    )
  }

  deductSalaryExtraEarning = () => {
    const salaryExtraEarning = {
      staffId: parseInt(this.state.id),
      staff: {
        personId: 0,
        staffNumber: "string",
        person: {
          imageUrl: "string",
          surname: "string",
          firstname: "string",
          othername: "string",
          birthDay: "2020-03-18T11:27:34.207Z",
          email: "string",
          address: "string",
          phoneNumber: "string",
          stateId: 0,
          lgaId: 0,
          maritalStatusId: 0,
          religionId: 0,
          genderId: 0,
          state: {
            name: "string",
            active: true,
            id: 0,
          },
          lga: {
            stateId: 0,
            state: {
              name: "string",
              active: true,
              id: 0,
            },
            name: "string",
            active: true,
            id: 0,
          },
          maritalStatus: {
            name: "string",
            active: true,
            id: 0,
          },
          religion: {
            name: "string",
            active: true,
            id: 0,
          },
          gender: {
            name: "string",
            active: true,
            id: 0,
          },
          id: 0,
        },
        rankId: 0,
        departmentId: 0,
        appointmentId: 0,
        rank: {
          name: "string",
          active: true,
          id: 0,
        },
        department: {
          name: "string",
          active: true,
          id: 0,
        },
        appointment: {
          name: "string",
          active: true,
          id: 0,
        },
        unitId: 0,
        unit: {
          name: "string",
          active: true,
          id: 0,
        },
        staffTypeId: 0,
        staffType: {
          name: "string",
          active: true,
          id: 0,
        },
        categoryId: 0,
        category: {
          name: "string",
          active: true,
          id: 0,
        },
        id: 0,
      },
      salaryExtraTypeId: parseInt(this.state.salaryExtraType1),
      salaryExtraType: {
        name: "string",
        active: true,
        id: 0,
      },
      amount: parseInt(this.state.deductionAmount),
      dateCreated: new Date(),
      isDeductible: true,
      active: true,
      id: 0,
    }

    this.setState({
      spin: true,
    })
    postData(
      `/SalaryExtraEarning/AddSalaryExtraEarning`,
      salaryExtraEarning,
      data => {
        this.setState({ returnData: data, spin: false, deductionAmount: "" })
        console.log(data, "returnData")
        let reset = typeof window !== "undefined" ? document.getElementById("salaryExtraType1") : null;
        reset.selectedIndex = 0
      }
    )
  }

  render() {
    console.log(this.state.id, "id")
    return (
      <>
        {this.state.spin ? (
          <div className="jumbo-back">
            <div className="container">
              <div className="jumbotron jumbo">
                <div className="spinner-border text primary spin-size"></div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="card-body">
          <h2>Extra Earnings</h2>
          <div className="row">
            <div className="col-md-6 ">
              <div className="card">
                <div className="card-header">Addition </div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-control-label text-right" htmlFor="">
                      Earning Addition
                    </label>
                    <select
                      className="form-control"
                      onChange={this.handleChange}
                      name="salaryExtraType"
                      id="salaryExtraType"
                      value={this.state.salaryExtraType}
                    >
                      <option value={0}>Select Earning Addition</option>
                      {this.state.salaryExtraTypes &&
                      this.state.salaryExtraTypes.length > 0
                        ? this.state.salaryExtraTypes.map(salary => (
                            <option key={salary.id} value={salary.id}>
                              {salary.name}
                            </option>
                          ))
                        : null}
                    </select>
                    <div className=" mt-3">
                      <div className="">
                        <label
                          className="form-control-label text-right"
                          htmlFor=""
                        >
                          Addition Amount
                        </label>
                      </div>
                      <div className="">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Amount"
                          onChange={this.handleChange}
                          name="additionAmount"
                          value={this.state.additionAmount}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    onClick={this.addSalaryExtraEarning}
                    disabled={
                      !this.state.additionAmount || !this.state.salaryExtraType
                    }
                    data-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Deduction</div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-control-label text-right" htmlFor="">
                      Earning Deduction
                    </label>

                    <select
                      className="form-control"
                      onChange={this.handleChange}
                      name="salaryExtraType1"
                      id="salaryExtraType1"
                      value={this.state.salaryExtraType1}
                    >
                      <option value={0}>Select Earning Deduction</option>
                      {this.state.salaryExtraTypes &&
                      this.state.salaryExtraTypes.length > 0
                        ? this.state.salaryExtraTypes.map(salary => (
                            <option key={salary.id} value={salary.id}>
                              {salary.name}
                            </option>
                          ))
                        : null}
                    </select>
                    <div className="mt-3">
                      <label
                        className="form-control-label text-right"
                        htmlFor=""
                      >
                        Deduction Amount
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Amount"
                        onChange={this.handleChange}
                        name="deductionAmount"
                        value={this.state.deductionAmount}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    onClick={this.deductSalaryExtraEarning}
                    disabled={
                      !this.state.deductionAmount ||
                      !this.state.salaryExtraType1
                    }
                    data-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
