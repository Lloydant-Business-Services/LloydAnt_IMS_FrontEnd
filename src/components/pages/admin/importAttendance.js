import React from "react"
import { Link } from "gatsby"
import { fetchData, editData } from "../../../utils/crud"

export default class ImportAttendance extends React.Component {

    readExcelFile = (e) => {

        e.preventDefault();
        let file = e.target.files[0];
        const filename = file.name;
        console.log("file",file);

    }

    render() {
        return (
            <>
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Staff Attendance</span></h6>
                            <span className="text-sm d-block">Upload Device Data.</span>
                        </div>
                        <div className="col-lg-6 col-5 text-right">
                        </div>
                    </div>
                    {/* Card stats */}
                    <div className="row justify-content-md-center">
                        <hr className="mx-0" />
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">

                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right mr-3" type="button" >
                                                    <span className="btn-inner--icon"><i className="fa fa-download" /></span>
                                                    <span className="btn-inner--text">Download Monthly Report</span>
                                                </button>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Excel</label>
                                                <input className="form-control" type="file" name="passport" onChange={(e) => this.readExcelFile(e)} />
                                            </div>
                                        </div>


                                    </div>
                                    <button type="button" onClick={() => this.updateForm()} data-dismiss="modal" className="btn btn-primary">Save</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>     </>
        )
    }
}
