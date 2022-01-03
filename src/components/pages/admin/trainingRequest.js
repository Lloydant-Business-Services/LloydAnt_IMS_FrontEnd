import React from "react"
// import { Link, navigateTo, navigate } from "gatsby"
import { fetchData, editData, postData } from "../../../utils/crud"
import _ from "lodash"

export default class ManageTrainingRequest extends React.Component {
    state = {
        staff: {
            "staffNumber": "NAU/",
            "person": {
                "surname": "",
                "firstname": "",
                "othername": "",
                "birthDay": "",
                "email": "",
                "address": "",
                "phoneNumber": "",
                "stateId": 0,
                "lgaId": 0,
                "maritalStatusId": 0,
                "religionId": 1,
                "genderId": 0,
                "imageUrl": "",
                "id": 0
            },
            "rankId": 0,
            "departmentId": 0,
            "appointmentId": 0,
            "unitId": 0,
            "staffTypeId": 0,
            "categoryId": 0,
            "id": 0
        },
        trainingTypes: [],
        leaveRequests:[],
        leaveRequest: {
            "trainingTypeId": 0,
            "staffId": 0,
            "startDate": null,
            "endDate": null,
            "reason": "",
            "attachmentUrl": "",
            "remarks": "",
            "id": 0
        }
    }

    updatePersonItem = (index, value) => {
        const { leaveRequest } = this.state;
        leaveRequest[index] = value;
        this.setState({ ...this.state, leaveRequest });
    }

    updateItem = (index, value) => {
        const { leaveRequest } = this.state;
        leaveRequest[index] = value;
        this.setState({ ...this.state, leaveRequest });
    }

    updateChekcbox = () => {
        const { leaveRequest } = this.state;
        leaveRequest.approved = !leaveRequest.approved;
        this.setState({ ...this.state, leaveRequest});
    }


    loadTrainings = () => {
        fetchData('/TrainingTypes', (data) => {
            this.setState({ trainingTypes: data })
        });
    }

    loadRequests = () => {
        //const id = this.props.user.userId;
        fetchData(`/TrainingRequest`, (data) => {
            console.log(data, "Training")
            this.setState({leaveRequests: data })
        });
    }


    componentDidMount() {
        fetchData(`/TrainingRequest`, (data) => {
            console.log(data, "Training")
            this.setState({leaveRequests: data })
        });
        this.loadTrainings();
        this.loadRequests();

    }

    setSelectedData = (data) => {

        let { leaveRequest } = this.state;
        leaveRequest = data;
        this.setState({ ...this.state, leaveRequest })
    }

    addForm = () => {

        postData(`/TrainingRequest`, this.state.leaveRequest, (data) => {
            if (data) {
                this.loadRequests();
            }

        });
    }

    isValidInputs = () => {
        return true;
    }

    submitForm = () => {
        if (this.isValidInputs()) {

            const {leaveRequest} = this.state;
            if (leaveRequest.approved){
                const id = this.props.user.userId;
                leaveRequest.approvedById = parseInt(id);
            }

            editData(`/TrainingRequest/${this.state.leaveRequest.id}`, leaveRequest, (data) => {
                this.loadRequests();
            });
        }
    }

    updateForm = () => {
        postData(`/TrainingRequest`, this.state.leaveRequest, (data) => {
            if (data) {
                this.loadRequests();
            }

        });
    }

    _calculateDuration = (startDate, endDate) => {

        // To set two dates to two variables
        const _start = new Date(startDate);
        const _end = new Date(endDate);

        // To calculate the time difference of two dates
        const Difference_In_Time = _end.getTime() - _start.getTime();

        // To calculate the no. of days between two dates
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Difference_In_Days;

    }



    render() {
        return (
            <>
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Training Requests <span className="h3 text-muted">/Staff Training</span></h6>
                        </div>
                        <div className="col-lg-6 col-5 text-right">
                        </div>
                    </div>
                    {/* Card stats */}
                    <div className="row">
                        <hr className="mx-0" />
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="card-title mb-0 float-left mr-3">All Training Requests</h3>

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
                                            <thead>
                                                <tr>
                                                    <th>S/No</th>
                                                    <th>Staff Name</th>
                                                    <th>Training Type</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Duration</th>
                                                    <th>Approved</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.leaveRequests && this.state.leaveRequests.length > 0 ?
                                                        this.state.leaveRequests.map((leaveRequest, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1} </td>
                                                                    <td>{_.upperCase(leaveRequest.staff?.person?.surname)} {_.upperCase(leaveRequest.staff?.person?.firstname)}</td>
                                                                    <td>{leaveRequest.trainingType.name}</td>
                                                                    <td>{leaveRequest.startDate.substring(0, 10)}</td>
                                                                    <td>{leaveRequest.endDate.substring(0, 10)}</td>
                                                                    <td>{this._calculateDuration(leaveRequest.startDate.substring(0, 10), leaveRequest.endDate.substring(0, 10))} days</td>
                                                                    <td>{leaveRequest.approved ? 'Yes':'No'}</td>
                                                                    <td className="td-actions">
                                                                        <button onClick={() => this.setSelectedData(leaveRequest)} type="button" rel="tooltip" className="btn btn-primary btn-icon btn-sm " data-toggle="modal" data-target=".edit-level-modal">
                                                                            <i className="fa fa-edit pt-1" />
                                                                        </button>
                                                                        {/* <button onClick={()=>this.setSelectedData(staff)} type="button" rel="tooltip" className="btn btn-danger btn-icon btn-sm " data-toggle="modal" data-target=".delete-level-modal">
                                                                            <i className="fa fa-trash pt-1" />
                                                                        </button> */}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        null
                                                }
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
                    <div className="modal fade edit-level-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Training Details</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Staff Number</label>
                                                <input className="form-control" type="text" name="staffNumber" value={this.state.leaveRequest.staff ? this.state.leaveRequest.staff.staffNumber : ''} disabled />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Rank</label>
                                                <input className="form-control" type="text" name="rank" value={this.state.leaveRequest.staff ? this.state.leaveRequest.staff.rank.name : ''} disabled />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Fullname</label>
                                                <input className="form-control" type="text" name="person" value={this.state.leaveRequest.staff ? this.state.leaveRequest.staff.person.surname + " " + this.state.leaveRequest.staff.person.firstname + " " + this.state.leaveRequest.staff.person.othername : ''} disabled />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Department</label>
                                                <input className="form-control" type="text" name="department" value={this.state.leaveRequest.staff ? this.state.leaveRequest.staff.department.name : ''} disabled />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Leave Type</label>
                                                <input className="form-control" type="text" name="leave" value={this.state.leaveRequest.staff ? this.state.leaveRequest.trainingType.name : ''} disabled />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Start Date</label>
                                                <input className="form-control" type="text" name="startDate" value={this.state.leaveRequest.staff ? this.state.leaveRequest.startDate.substring(0,10) : ''} disabled />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">End Date</label>
                                                <input className="form-control" type="text" name="endDate" value={this.state.leaveRequest.staff ? this.state.leaveRequest.endDate.substring(0,10) : ''} disabled />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Reason</label>
                                                <input className="form-control" type="text" name="reason" value={this.state.leaveRequest.staff ? this.state.leaveRequest.reason : ''} disabled />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Approve</label>
                                                <input className="form-control" type="checkbox" name="approved"
                                                 onChange={() => this.updateChekcbox()}
                                                 defaultChecked={this.state.leaveRequest.staff ? this.state.leaveRequest.approved : false}
                                                 checked={this.state.leaveRequest.staff ? this.state.leaveRequest.approved : false} />

                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Comments</label>
                                                <input className="form-control" type="text" name="remarks"
                                                 onChange={(e) => this.updateItem('remarks',e.target.value)}
                                                 value={this.state.leaveRequest.staff ? this.state.leaveRequest.remarks : ''} />
                                            </div>
                                        </div>



                                    </div>

                                    <button type="button" onClick={() => this.submitForm()} data-dismiss="modal" className="btn btn-warning">Update</button>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade delete-level-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Delete Staff?</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div>
                                            <p>Are you sure you want to delete this record? All items related to it will be affected</p>
                                            <button className="btn btn-outline-danger">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
