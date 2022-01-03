import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"

export default class payrollSummary extends React.Component {

    render() {

        return (
            <>
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-12 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Payroll</h6>
                                <span className="h3 text-muted">
                                /Pay Summary
                                </span>
                        </div>
                        <div className="col-lg-6 col-5 text-right">
                        </div>
                    </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label" >
                                Salary Year
                            </label>

                            <select className="form-control select-search-dropdown" required>

                                <option>--- Select Year ---</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2013</option>
                                <option>2012</option>
                                <option>2011</option>
                                <option>2010</option>
                            </select>
                            
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label" >
                                Salary Month
                            </label>

                            <select className="form-control select-search-dropdown" required>

                                <option>--- Select Month ---</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                            </select>
                            
                        </div>
                    </div>

                    <div className="col-md-2">
                        <button className="btn btn-primary mt-3rem">Load List</button>
                    </div>

                </div>
                    
                    {/* Card stats */}
                    <div className="row ">
                        <hr className="mx-0" />
                        <div className="col-md-12 mt-4">
                            <div className="card" id="sum-tab">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className=" mb-0">Payroll Summary <span className="text-sm text-muted"> (February 2019)</span> </h3>
                                        </div>
                                        <div className="col">
                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead >
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Employee ID</th>
                                                    <th>Staff Name</th>
                                                    <th>Bank Name</th>
                                                    <th>Account No.</th>
                                                    <th>Grade</th>
                                                    <th>Gross Earning</th>
                                                    <th>PAYE</th>
                                                    <th>Check Off</th>
                                                    <th>Net Earning</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>MTH136</td>
                                                    <td>Okoronkwo Numbere</td>
                                                    <td>GTBank</td>
                                                    <td>0298567893</td>
                                                    <td>CONHESS/01/20</td>
                                                    <td>N 80,000.00</td>
                                                    <td>-N 1,045.00</td>
                                                    <td>-N 745.00</td>
                                                    <td>N 78,000.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>MTH136</td>
                                                    <td>Ekanah Wisdom</td>
                                                    <td>GTBank</td>
                                                    <td>0298567893</td>
                                                    <td>CONHESS/01/20</td>
                                                    <td>N 80,000.00</td>
                                                    <td>-N 1,045.00</td>
                                                    <td>-N 745.00</td>
                                                    <td>N 78,000.00</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>MTH136</td>
                                                    <td>Omoaruna Nosayaba</td>
                                                    <td>Zenith</td>
                                                    <td>0298567893</td>
                                                    <td>CONHESS/01/20</td>
                                                    <td>N 80,000.00</td>
                                                    <td>-N 1,045.00</td>
                                                    <td>-N 745.00</td>
                                                    <td>N 78,000.00</td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>MTH136</td>
                                                    <td>Jessica Ugwuaji</td>
                                                    <td>GTBank</td>
                                                    <td>0298567893</td>
                                                    <td>CONHESS/01/20</td>
                                                    <td>N 80,000.00</td>
                                                    <td>-N 1,045.00</td>
                                                    <td>-N 745.00</td>
                                                    <td>N 78,000.00</td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>MTH136</td>
                                                    <td>Atere Chukwukere</td>
                                                    <td>UBA</td>
                                                    <td>0298567893</td>
                                                    <td>CONHESS/01/20</td>
                                                    <td>N 70,000.00</td>
                                                    <td>-N 1,045.00</td>
                                                    <td>-N 745.00</td>
                                                    <td>N 68,000.00</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container-fluid mt--6">
                    <div>
                    </div>
                    <div className="modal fade new-unit-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h4 className="mb-0" id="exampleModalScrollableTitle">Add New Level</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Level Name</label>
                                                <input className="form-control" id="myInp" type="text" name="unit"  />
                                            </div>
                                            <button className="btn btn-primary" data-dismiss="modal">Create Level</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade edit-unit-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h4 className="mb-0" id="exampleModalScrollableTitle">Edit Level</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Level Name</label>
                                                <input className="form-control" type="text" name="unitName"  />
                                            </div>
                                            <button className="btn btn-primary">Edit Level</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade delete-unit-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h4 className="mb-0" id="exampleModalScrollableTitle">Delete Level?</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div>
                                            <p>Are you sure you want to delete this record? All items related to it will be affected</p>
                                            <button className="btn btn-outline-danger" data-dismiss="modal">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}
