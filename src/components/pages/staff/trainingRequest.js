import React from "react"
import { fetchData, postData } from "../../../utils/crud"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
    Input,
    Label,
    Form,
    FormGroup,
    Fade,
  } from "reactstrap";

export default class TrainingRequest extends React.Component {
    state = {
    payLoad: JSON.parse(localStorage.getItem("userData")),

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


    loadStaff = () => {
        const id = this.state.payLoad.staffId;
        fetchData(`/Staff/${id}`, (data) => {
            const { staff, leaveRequest } = this.state;
            staff.staffNumber = data.staffNumber;
            staff.person.surname = data.person.surname;
            staff.person.firstname = data.person.firstname;
            staff.person.othername = data.person.othername;
            staff.person.birthDay = data.person.birthDay;
            staff.person.email = data.person.email;
            staff.person.address = data.person.address;
            staff.person.phoneNumber = data.person.phoneNumber;
            staff.person.stateId = data.person.stateId;
            staff.person.lgaId = data.person.lgaId;
            staff.person.maritalStatusId = data.person.maritalStatusId;
            staff.person.religionId = data.person.religionId;
            staff.person.genderId = data.person.genderId;
            staff.person.id = data.person.id;
            staff.rankId = data.rankId;
            staff.departmentId = data.departmentId;
            staff.appointmentId = data.appointmentId;
            staff.unitId = data.unitId;
            staff.staffTypeId = data.staffTypeId;
            staff.categoryId = data.categoryId;
            staff.id = data.id;
            if (data.person.imageUrl === '') {

                staff.person.imageUrl = null;

            } else {

                staff.person.imageUrl = data.person.imageUrl
            }


            leaveRequest.staffId = staff.id;
            this.setState({ ...this.state, staff, leaveRequest })
        });
    }

    loadTrainings = () => {
        fetchData('/TrainingTypes', (data) => {
            console.log(data, "Training Types")
            this.setState({ trainingTypes: data })
        });
    }

    loadRequests = () => {
        const id = this.state.payLoad?.staffId;
        fetchData(`/TrainingRequest/TrainingRequestByStaff/${id}`, (data) => {
            console.log(data, "Train_")
            this.setState({leaveRequests: data })
        });
    }


    componentDidMount() {

        this.loadStaff();
        this.loadTrainings();
        this.loadRequests();

    }



    addForm = () => {
        postData(`/TrainingRequest`, this.state.leaveRequest, (data) => {
            if (data) {
                this.loadRequests();
            }

        });
    }

    updateForm = () => {
        postData(`/TrainingRequest`, this.state.leaveRequest, (data) => {
            if (data) {
                this.loadRequests();
            }

        });
    }

    handleFileUpload = (e) => {

        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        const { leaveRequest } = this.state;

        reader.onloadend = () => {

            leaveRequest.attachmentUrl = reader.result;
            this.setState({
                ...this.state,
                file: file,
                leaveRequest
            });
        }
        reader.readAsDataURL(file)

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
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right mr-3" type="button" onClick={() => this.setState({make_request:true})}>
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">Make a request</span>
                                                </button>

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
                                                    <th>Training Type</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Approved</th>
                                                    <th>Approval Date</th>
                                                    <th>Remarks</th>
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
                                                                    <td>{leaveRequest.trainingType.name}</td>
                                                                    <td>{leaveRequest?.startDate != null ? leaveRequest.startDate.substring(0, 10) : "-"}</td>
                                                                    <td>{leaveRequest?.endDate != null ? leaveRequest?.endDate.substring(0, 10) : "-"}</td>
                                                                    {/* <td>{leaveRequest.startDate}</td> */}
                                                                    <td>{leaveRequest.approved ? "Approved" : "Declined"}</td>
                                                                    <td>{leaveRequest.approvedDate != null ? leaveRequest.approvedDate.substring(0, 10) : "-"}</td>
                                                                    <td>{leaveRequest.remarks}</td>
                                                                    <td className="td-actions">
                                                                        {/* <button onClick={() => this.setSelectedData(leaveRequest)} type="button" rel="tooltip" className="btn btn-primary btn-icon btn-sm " data-toggle="modal" data-target=".edit-level-modal">
                                                                            <i className="fa fa-edit pt-1" />
                                                                        </button> */}
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
                    <Modal isOpen={this.state.make_request}><div>
                        <div>
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Make New Request</h2>
                                    <button type="button" className="close" onClick={() => this.setState({make_request:false})}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Training Type</label>
                                                    <select className="form-control" name="state" onChange={(e) => { this.updatePersonItem('trainingTypeId', parseInt(e.target.value)) }} required>
                                                        <option>Select a Training Type</option>
                                                        {
                                                            this.state.trainingTypes && this.state.trainingTypes.length > 0 ?
                                                                this.state.trainingTypes.map((training) => {
                                                                    return (
                                                                        <option key={training.id} value={training.id}>{training.name}</option>
                                                                    )
                                                                })
                                                                :
                                                                null
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Start Date</label>
                                                    <input className="form-control" type="date" name="surname" value={this.state.leaveRequest.startDate} onChange={(e) => { this.updatePersonItem('startDate', e.target.value) }} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">End Date</label>
                                                    <input className="form-control" type="date" name="firstname" value={this.state.leaveRequest.endDate} onChange={(e) => { this.updatePersonItem('endDate', e.target.value) }} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Reason/Comments</label>
                                                    <input className="form-control" type="text" name="firstname" value={this.state.leaveRequest.reason} onChange={(e) => { this.updatePersonItem('reason', e.target.value) }} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Attachments</label>
                                                    <input className="form-control" type="file" name="passport" onChange={(e) => this.handleFileUpload(e)} />
                                                </div>
                                            </div>



                                        </div>
                                        <button type="button" onClick={() => this.addForm()} data-dismiss="modal" className="btn btn-primary">Save</button>
                                    </form>
                                </div>
                                {/* <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                                </div> */}
                            </div>
                        </div>
                    
                        
                    </div>
                    </Modal>
                    <div className="modal fade edit-level-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Edit Profile</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Training Type</label>
                                                <select className="form-control" name="state" onChange={(e) => { this.updatePersonItem('trainingTypeId', parseInt(e.target.value)) }} required>
                                                    <option>Select a Leave Type</option>
                                                    {
                                                        this.state.trainingTypes && this.state.trainingTypes.length > 0 ?
                                                            this.state.trainingTypes.map((leave) => {
                                                                return (
                                                                    <option key={leave.id} value={leave.id}>{leave.name}</option>
                                                                )
                                                            })
                                                            :
                                                            null
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Start Date</label>
                                                <input className="form-control" type="date" name="surname" value={this.state.leaveRequest.startDate} onChange={(e) => { this.updatePersonItem('startDate', e.target.value) }} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">End Date</label>
                                                <input className="form-control" type="date" name="firstname" value={this.state.leaveRequest.endDate} onChange={(e) => { this.updatePersonItem('endDate', e.target.value) }} />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Reason/Comments</label>
                                                <input className="form-control" type="text" name="firstname" value={this.state.leaveRequest.reason} onChange={(e) => { this.updatePersonItem('reason', e.target.value) }} />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Attachments</label>
                                                <input className="form-control" type="file" name="passport" onChange={(e) => this.handleFileUpload(e)} />
                                            </div>
                                        </div>



                                    </div>
                                    <button type="button" onClick={() => this.updateForm()} data-dismiss="modal" className="btn btn-primary">Save</button>

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
