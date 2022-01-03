import React, { Component } from "react"
import { fetchData } from "../../../utils/crud"
import Loadable from "react-loadable";

const jsPDF = Loadable({
  loader: () => import("jspdf"),
  loading: React,
});

const html2canvas = Loadable({
  loader: () => import("html2canvas"),
  loading: React
});

// const jspdf_autotable = Loadable({
//   loader: () => import("jspdf-autotable"),
//   loading: React
// });

// let jsPDF = null;
// let html2canvas = null;
// let jspdf_autotable = null;
// (async () => {
//     if (typeof window !== "undefined") {
//       // import module for side effects
//       jsPDF = await import("jspdf");
//       html2canvas = await import("html2canvas");
//       jspdf_autotable = await import("jspdf-autotable");
//     }
//   })();

if(typeof window !== "undefined"){
  window.addEventListener("click", () =>
    document
      .querySelectorAll(".ghost")
      .forEach(el => (el.style.visibility = "visible"))
  )
}

class StaffPayrollList extends Component {
  state = {
    spin: false,
    emptyFields: false,
    department: "",
    currentDepartment: "",
    payrollList: "",
    paylist: "",
    showTab: false,
    queryForm: true,
    month: "",
    year: "",
  }

  // printDocument = ()=> {
  //   const input = document.getElementById('divToPrint');
  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF();
  //       pdf.addImage(imgData, 'JPEG', 0, 0);
  //       // pdf.output('dataurlnewwindow');
  //       pdf.save("download.pdf");
  //     })
  //   }

  initDataURLs = async () => {
    if(typeof window !== "undefined"){
      let container = document.querySelector(".print-table")
      const canvas = await html2canvas(container)
      const image = canvas.toDataURL("image/png", 1.0)
      return image
    }
  }

  // initDataURLs = () => {
  //   let container = document.querySelector('.print');
  //   let image = "";
  //   html2canvas(container).then(canvas => {
  //     image = canvas.toDataURL("image/png");
  //   });

  //   return image;
  // }

  canvasTest = async () => {
    let image = await this.initDataURLs()

    const filename = "Payroll_Summary.pdf"

    if(typeof window !== "undefined"){
      let pdf = new jsPDF("p", "mm", "a4")
      //pdf.addImage(image, 'PNG', 0, 0, 211, 278);
      pdf.addImage(image, "PNG", 0, 0, 27, 12)
      //pdf.addImage(image, 'PNG', 0, 0, 150, 2);
      pdf.addPage()
      pdf.save(filename)
    }

    // document.querySelector("#pay-exp").addEventListener("click", (e) => {
    //     e.preventDefault();

    //     const filename = 'Referal_Fillout.pdf';
    //     let pdf = new jsPDF('p', 'mm', 'a4');
    //     pdf.addImage(image, 'PNG', 0, 0, 211, 278);
    //     pdf.addPage();
    //     pdf.save(filename);
    // });
  }

  cancelEmpty = () => {
    this.setState({
      emptyFields: false,
      spin: false,
    })
  }

  handlePull = () => {
    this.setState({
      //   redirect: true,
      spin: true,
    })

    // if(this.state.month == "" || this.state.year == "" || this.state.holiday == ""){

    //   this.setState({
    //     emptyFields:true,
    //     spin:false
    //   })
    // }else{

    fetchData(
      `/Staff/GetStaffPayrollByDepartmentMonthAndYear?departmentId=${this.state.department}&month=${this.state.month}&year=${this.state.year}`,
      data => {
        console.log(data)

        this.setState({ payrollList: data })
        let remappedPayList = this.state.payrollList.map(pay => {
          return {
            staffSurname: pay.staff.person.surname,
            staffFirstName: pay.staff.person.firstname,
            staffOtherName: pay.staff.person.othername,
            staffAppNumber: pay.staff.staffNumber,
            staffDepartment: pay.department.name,
            salaryLevel: pay.salaryLevel.name,
            salaryStep: pay.salaryStep.name,
            staffId: pay.staff.personId,
            gradeBenefit: pay.gradeBenefits.map(n => {
              return {
                benefitName: n.salaryType.name,
                benefitAmount: n.salaryType.amount,
              }
            }),

            extraEarning: pay.salaryExtraEarnings.filter(earn => {
              return earn.isDeductible.toString().includes("true")
            }),
            deductions: pay.salaryExtraEarnings.filter(deduc => {
              return deduc.isDeductible.toString().includes("false")
            }),
          }
        })
        this.setState({
          paylist: remappedPayList,
          showTab: true,
          spin: false,
          queryForm: false,
        })

        console.log(remappedPayList, "staffNumber")
      }
    )

    // }

    console.log(this.state.payrollList, "Quick List")
  }

  printTable = () => {
    if(typeof window !== "undefined"){
      document
      .querySelectorAll(".ghost")
      .forEach(el => (el.style.visibility = "hidden"))
      window.print()   
    }
  }

  // newExport = () =>{
  //   var doc = new jsPDF();
  //   var specialElementHandlers = {
  //       '#editor': function (element, renderer) {
  //           return true;
  //       }
  //   };

  //   $('#pay-exp').click(function () {
  //       doc.fromHTML($('#content').html(), 15, 15, {
  //           'width': 180,
  //               'elementHandlers': specialElementHandlers
  //       });
  //       doc.save('Miracle-file.pdf');
  //   });
  // }
  trigger = () => {
    this.handlePull()
  }

  handleMonthId = e => {
    this.setState({
      month: parseInt(e.target.value),
    })
    console.log(this.state.month, "Month")
    const sel = typeof window !== "undefined" ? document.getElementById("mySelect") : null;
    const textValues = sel.options[sel.selectedIndex].text
    console.log(textValues)

    this.setState({
      reportTitle: textValues,
    })
  }

  handleYearId = e => {
    this.setState({
      year: parseInt(e.target.value),
    })
    console.log(this.state.year, "YearValue")
  }
  handleDepartmentId = e => {
    this.setState({
      department: parseInt(e.target.value),
    })

    const departmentList = typeof window !== "undefined" ? document.getElementById("myDept"): null;
    const selectedDepartment =
      departmentList.options[departmentList.selectedIndex].text

    this.setState({
      departmentHandler: selectedDepartment,
    })

    console.log(this.state.department, "DepartmentValue")
    console.log(this.state.departmentHandler, "Department Name")
  }

  componentDidMount() {
    // console.log(sumValues({a: 4, b: 6, c: 5, d: 4}));
    fetchData("/InstitutionDepartments", data => {
      this.setState({ instDept: data })
      console.log(this.state.instDept, "Department")
    })
  }
  changeStatus = () => {
    this.setState({
      showTab: false,
      queryForm: true,
    })
  }

  render() {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })

    console.log(formatter.format(1000))
    return (
      <div onFocus={this.revealSidebar}>
        {/* <div id="content">
     <h3>Hello, this is a H3 tag</h3>

    <p>a pararaph</p>
</div>
<div id="editor"></div>
<button id="cmd" onClick={()=> this.newExport()}>generate PDF</button> */}

        {this.state.spin === true ? (
          <div className="jumbo-back">
            <div className="container">
              <div className="jumbotron jumbo">
                <div className="spinner-border text primary spin-size"></div>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.emptyFields == true ? (
          <div className="jumbo-back" onClick={this.cancelEmpty}>
            <div className="container">
              <div className="jumbotron empty-alert">
                <h5>Some fields were not selected!</h5>
              </div>
            </div>
          </div>
        ) : null}


        <div className="row align-items-center py-4">
            <div className="col-lg-12 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Staff Payroll List{" "}
              </h6>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
        </div>

        {/* <div>Attendance Report Request</div> */}
        {this.state.queryForm == true ? (

          <div className="row justify-content-center">
            <div className="col-md-8">

              <div className="card">
                  <div className="card-header">
                      <h3>Generate Staff Payroll List</h3>
                  </div>
                  <div className="card-body">
                      <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Month{" "}
                              </label>
                              <select className="form-control select-search-dropdown"
                                id="mySelect" name="staffId" required
                                onChange={this.handleMonthId} >
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
                              <label htmlFor="example-text-input"
                                className="form-control-label" >
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

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="example-text-input" className="form-control-label" >
                                Department
                              </label>
                              <select className="form-control select-search-dropdown"
                                name="assetId" id="myDept" required
                                onChange={this.handleDepartmentId} >
                                  <option>-- Select Department --</option>
                                  {this.state.instDept &&
                                    this.state.instDept.map((c, i) => (
                                      <option value={c.id} key={i}>
                                        {c.name}
                                      </option>
                                    ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <button type="button" onClick={this.trigger}
                          className="btn btn-primary" >
                          Generate Payroll List
                        </button>
                
                  </div>
              </div>

            </div>
          </div>

        ) : null}

        {this.state.showTab == true ? (
          <div className="header-body" id="content">
            <div className="row align-items-center py-4">
              <div className="col-lg-12 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Payroll for the Department of{" "}
                  {this.state.departmentHandler.toUpperCase()}{" "}
                </h6>
              </div>
              <div className="col-lg-6 col-5 text-right"></div>
            </div>
         
            <button className="btn btn-sm btn-outline-primary" onClick={this.changeStatus}>
                          <i className="fa fa-caret-left"></i> Back
                      </button>

            {/* Card stats */}
            <div className="row ">
              <hr className="mx-0" />
              <div className="col-md-8 mt-4">
                <div className="card print-table" id="sum-tab">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className=" mb-0">
                          Payroll Summary{" "}
                          <span className="text-sm text-muted">
                            {" "}
                            ({this.state.reportTitle}, {this.state.year}),
                          </span>{" "}
                          {this.state.departmentHandler.toUpperCase()}{" "}
                          Department
                        </h5>
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
                            <th>Staff ID</th>
                            <th>Staff Name</th>
                            <th>Grade Level</th>
                            <th>Gross Earning</th>
                            <th>Extra Earning</th>
                            <th>Deductions</th>
                            <th>Net Earning</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.paylist &&
                            this.state.paylist.map((c, d) => {
                              return (
                                <tr rowSpan={c.gradeBenefit.length}>
                                  <td>{d + 1}</td>
                                  <td>{c.staffAppNumber}</td>
                                  <td>
                                    {c.staffSurname} {c.staffFirstName}{" "}
                                    {c.staffOtherName}
                                  </td>

                                  <td>
                                    GL{c.salaryLevel.slice(-1)}S
                                    {c.salaryStep.slice(-1)}
                                  </td>

                                  <td className="ext-tr" id="summ">
                                    <b>
                                      {formatter.format(
                                        c.gradeBenefit.reduce((a, b) => {
                                          return a + parseFloat(b.benefitAmount)
                                        }, 0)
                                      )}
                                    </b>
                                  </td>
                                  {/* <td className="ext-tr" id="summ"><b>{formatter.format(c.extraEarning.reduce((y, z) => {
                                                            return y + parseFloat(z.extraAmount);
                                                                            }, 0))}</b>
                                                                </td> */}
                                  <td className="ext-tr" id="summ">
                                    <b>
                                      {formatter.format(
                                        c.extraEarning.reduce((a, bb) => {
                                          return a + parseFloat(bb.amount)
                                        }, 0)
                                      )}
                                    </b>
                                  </td>

                                  <td className="ext-tr" id="summ">
                                    <b>
                                      -{" "}
                                      {formatter.format(
                                        c.deductions.reduce((a, o) => {
                                          return a + parseFloat(o.amount)
                                        }, 0)
                                      )}
                                    </b>
                                  </td>
                                  <td className="ext-tr" id="summ">
                                    <b>
                                      {" "}
                                      {formatter.format(
                                        c.gradeBenefit.reduce((a, o) => {
                                          return a + parseFloat(o.benefitAmount)
                                        }, 0) -
                                          c.deductions.reduce((a, o) => {
                                            return a + parseFloat(o.amount)
                                          }, 0) +
                                          c.extraEarning.reduce((a, o) => {
                                            return a + parseFloat(o.amount)
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

            <button className="btn btn-success ghost"
              id="pay-exp" onClick={this.printTable} >
              Export as PDF
            </button>

            <div className="modal fade new-unit-modal" tabIndex={-1} role="dialog"
              aria-labelledby="myLargeModalLabel" aria-hidden="true" >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header border-bottom">
                      <h4 className="mb-0" id="exampleModalScrollableTitle">
                        Add New Level
                      </h4>
                      <button type="button" className="close"
                        data-dismiss="modal" aria-label="Close" >
                          <span aria-hidden="true">×</span>
                      </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="example-text-input" className="form-control-label" >
                            Level Name
                          </label>
                          <input className="form-control" id="myInp" type="text"
                            name="unit" value={this.state.name}
                            onChange={e => {
                              this.setState({ name: e.target.value })
                            }} />
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
                    <button type="button" className="btn btn-danger btn-sm text-white"
                      data-dismiss="modal" onClick={(typeof window !== "undefined") ? window.print : null} >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default StaffPayrollList
