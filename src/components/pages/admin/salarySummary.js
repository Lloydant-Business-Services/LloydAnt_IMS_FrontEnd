import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"

export default class salaryGradeCategory extends React.Component {
  state = {
    departments: [],
    salaryGradeLevel: [],
    name: "",
    id: 0,
    active: true,
    salaryGradeLevel: "",
    added: false,
    categoryProperties: "",
    spin: false,
  }

  componentDidMount() {
    // fetchData('/InstitutionDepartments', (data) => {
    //     this.setState({ departments: data })
    // });

    fetchData("/SalaryGradeCategory", data => {
      this.setState({ salaryGradeCategory: data })
      console.log(this.state.salaryGradeCategory, "Category")
    })
  }
  loadSalaryCategory = () => {
    this.setState({
      spin: false,
    })

    fetchData(
      `/SalaryGradingSystem/GetGradeBenefitsBySalaryGradeCategoryId?salaryGradeCategoryId=${this.state.categoryPropertyId}`,
      data => {
        this.setState({ categoryProperties: data })

        const remappedObject = this.state.categoryProperties.map(cat => {
          return {
            salaryLevelName: cat.salaryGrade.salaryLevel.name,
            salaryStepName: cat.salaryGrade.salaryStep.name,
            gradeBenefits: cat.gradeBenefit.map(bef => {
              return {
                benefitName: bef.salaryType.name,
                benefitAmount: bef.salaryType.amount,
              }
            }),
          }
        })

        this.setState({
          summaryPayload: remappedObject,
          spin: false,
        })

        setTimeout(() => {
          console.log(this.state.summaryPayload, "This")
        }, 3000)

        setTimeout(() => {
          console.log(this.state.summaryPayload, "This")
        }, 3000)
      }
    )
  }

  handleCategoryPropertyId = e => {
    this.setState({
      categoryPropertyId: e.target.value,
    })

    console.log(this.state.categoryPropertyId, "catPropety Id")
  }

  render() {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })

    console.log(formatter.format(1000)) // "N1,000.00"

    return (
      <>
        {this.state.spin === true ? (
          <div className="jumbo-back">
            <div className="container">
              <div className="jumbotron jumbo">
                <div className="spinner-border text primary spin-size"></div>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.added == true ? (
          <div className="jumbo-back" onClick={this.cancelEmpty}>
            <div className="container">
              <div className="jumbotron empty-alert">
                <h5>
                  Successfully Added!{" "}
                  <i
                    className="fa fa-check-circle"
                    style={{ fontSize: "30px", color: "green" }}
                  ></i>
                </h5>
                <hr />
                <button
                  className="btn btn-danger ok-btn"
                  onClick={this.closeAdded}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-12 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Salary Summary{" "}
              </h6>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          <div className="row justify-content-center">
              <div className="form-group col-md-9">

                  <div className="row justify-content-center">
                      <div className="col-md-10">

                        <label htmlFor="example-text-input" className="form-control-label" >
                          Salary Grade Category
                        </label>

                        <select
                          className="form-control select-search-dropdown"
                          name="assetId"
                          id="myDept"
                          required
                          onChange={this.handleCategoryPropertyId}
                        >
                          <option>--- Select Salary Category ---</option>
                          {this.state.salaryGradeCategory &&
                            this.state.salaryGradeCategory.map((c, i) => (
                              <option value={c.id} key={i}>
                                {c.name}
                              </option>
                            ))}
                        </select>

                      </div>

                      <div className="col-md-2">

                        <span
                          className=" btn btn-primary mt-3rem"
                          onClick={this.loadSalaryCategory}
                        >
                          Load List
                        </span>
                      </div>
                  </div>

              </div>
            </div>

          {/* Card stats */}
          <div className="row justify-content-center">
            
            <div className="col-md-9 mt-4">
              <div className="card" id="sum-tab">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h4 className=" mb-0">Salary Summary By Category</h4>
                    </div>
                    <div className="col">
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th>GRADE</th>
                          <th>EMOLUMENTS</th>

                          <th>TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.summaryPayload &&
                          this.state.summaryPayload.map((d, i) => {
                            return (
                              <tr rowSpan={d.gradeBenefits.length}>
                                <td>{i + 1}</td>
                                <td>
                                  <b>
                                    GL{d.salaryLevelName.slice(-1)}S
                                    {d.salaryStepName.slice(-1)}
                                  </b>
                                </td>
                                <td>
                                  {this.state.summaryPayload &&
                                    d.gradeBenefits.map(function(g) {
                                      return (
                                        <tr className="ext-tr">
                                          <b>
                                            {g.benefitName} |{" "}
                                            {formatter.format(g.benefitAmount)}
                                          </b>
                                        </tr>
                                      )
                                    })}
                                </td>

                                {/* <td style={{textAlign:"left"}}>  <i className="fa fa-arrow-right"></i> &nbsp; &nbsp; <b>₦{d.salaryType.amount}</b></td> */}

                                <td className="ext-tr" id="summ">
                                  <b>
                                    {formatter.format(
                                      d.gradeBenefits.reduce((a, b) => {
                                        return a + parseFloat(b.benefitAmount)
                                      }, 0)
                                    )}
                                  </b>
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div></div>
          <div
            className="modal fade new-unit-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Add New Level
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Level Name
                        </label>
                        <input
                          className="form-control"
                          id="myInp"
                          type="text"
                          name="unit"
                          value={this.state.name}
                          onChange={e => {
                            this.setState({ name: e.target.value })
                          }}
                        />
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.addSalaryGradeLevel()}
                        data-dismiss="modal"
                      >
                        Create Level
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade edit-unit-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Edit Level
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Level Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="unitName"
                          value={this.state.name}
                          onChange={e => {
                            this.setState({ name: e.target.value })
                          }}
                        />
                      </div>
                      <button
                        onClick={() => this.updateUnit()}
                        className="btn btn-primary"
                      >
                        Edit Level
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade delete-unit-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h4 className="mb-0" id="exampleModalScrollableTitle">
                    Delete Level?
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    <div>
                      <p>
                        Are you sure you want to delete this ({this.state.name})
                        record? All items related to it will be affected
                      </p>
                      <button
                        onClick={() => this.deleteUnit()}
                        className="btn btn-outline-danger"
                        data-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm text-white"
                    data-dismiss="modal"
                  >
                    Close
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
