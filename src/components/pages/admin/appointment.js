import React from "react"
import { fetchData, postData,editData,deleteData } from "../../../utils/crud"

export default class Appointment extends React.Component {

    state = {
        appointments: [],
        ranks: [],
        name: '',
        id:0,
        active:true
    }

    componentDidMount() {

        fetchData('/InstitutionAppointments', (data) => {
            this.setState({ appointments: data })
        });

        fetchData('/InstitutionRanks', (data) => {
            this.setState({ ranks: data })
        });

    }

    addAppointment = () => {

        if (this.state.name !== '') {
            const appointment = {
                id: 0,
                name: this.state.name,
                active: true
            };
            postData('/InstitutionAppointments', appointment, (data) => {
                const { appointments } = this.state;
                appointments.push(data);
                this.setState({ ...this.state, appointments, name: '',active: true, });
            });
        }

    }

    updateAppointment = () => {

        if (this.state.name !== '' && this.state.id > 0) {
            const appointment = {
                id: this.state.id,
                name: this.state.name,
                active: this.state.active
            };
            editData(`/InstitutionAppointments/${this.state.id}`, appointment, () => {
                fetchData('/InstitutionAppointments', (data) => {
                    this.setState({ appointments: data })
                });
            });
        }

    }

    deleteAppointment = () => {

        if (this.state.name !== '' && this.state.id > 0) {

            deleteData(`/InstitutionAppointments/${this.state.id}`, () => {
                fetchData('/InstitutionAppointments', (data) => {
                    this.setState({ appointments: data })
                });
            });
        }

    }

    addRank = () => {
        if (this.state.name !== '') {
            const rank = {
                id: 0,
                name: this.state.name,
                active: this.state.active
            };
            postData('/InstitutionRanks', rank, (data) => {
                const { ranks } = this.state;
                ranks.push(data);
                this.setState({ ...this.state, ranks, name: '',active: true, });
            });
        }
    }

    updateRank = () => {

        if (this.state.name !== '' && this.state.id > 0) {
            const rank = {
                id: this.state.id,
                name: this.state.name,
                active: this.state.active
            };
            editData(`/InstitutionRanks/${this.state.id}`, rank, () => {
                fetchData('/InstitutionRanks', (data) => {
                    this.setState({ ranks: data })
                });
            });
        }

    }

    deleteRank = () => {

        if (this.state.name !== '' && this.state.id > 0) {

            deleteData(`/InstitutionRanks/${this.state.id}`, () => {
                fetchData('/InstitutionRanks', (data) => {
                    this.setState({ ranks: data })
                });
            });
        }

    }

    loadEditData = (data) => {
        this.setState({
            name: data.name,
            id: data.id,
            active: data.active
        })
    }

    render() {
        return (
            <>
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Appointments &amp; Ranks</span></h6>
                            <span className="text-sm d-block">Create and manage Appointments &amp; Ranks.</span>
                        </div>
                        <div className="col-lg-6 col-5 text-right">
                        </div>
                    </div>
                    {/* Card stats */}
                    <div className="row">
                        <hr className="mx-0" />
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="card-title mb-0">Appointments</h3>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right" type="button" data-toggle="modal" data-target=".new-unit-modal">
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">New Appointment</span>
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
                                                    <th>Appointment Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.appointments && this.state.appointments.length > 0
                                                        ?
                                                        this.state.appointments.map(appointment => {
                                                            return (
                                                                <tr key={appointment.id}>
                                                                    <td>
                                                                        <h5 className="mt-2">{appointment.name}</h5>
                                                                    </td><td>
                                                                        <span onClick={() => this.loadEditData(appointment)} className="h2 cpoint mr-4" data-toggle="modal" data-target=".edit-unit-modal"><i className="d-inline fa fa-edit" /></span>
                                                                        <span onClick={() => this.loadEditData(appointment)} className="h2 cpoint" data-toggle="modal" data-target=".delete-unit-modal"><i className="fa fa-trash" /></span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="card-title mb-0">Organization Ranks</h3>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right" type="button" data-toggle="modal" data-target=".new-department-modal">
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">New Rank</span>
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
                                                    <th>Rank</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.ranks && this.state.ranks.length > 0 ?
                                                        this.state.ranks.map(rank => {
                                                            return (
                                                                <tr key={rank.id}>
                                                                    <td>
                                                                        <h5 className="mt-2">{rank.name}</h5>
                                                                    </td><td>
                                                                        <span onClick={() => this.loadEditData(rank)} className="h2 cpoint mr-4" data-toggle="modal" data-target=".edit-department-modal"><i className="d-inline fa fa-edit" /></span>
                                                                        <span onClick={() => this.loadEditData(rank)} className="h2 cpoint" data-toggle="modal" data-target=".delete-department-modal"><i className="fa fa-trash" /></span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        : null
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
                    <div className="modal fade new-unit-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Add New Appointment</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Appointment Name</label>
                                                    <input className="form-control" type="text" name="unit" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                <button type="button"  data-dismiss="modal" className="btn btn-primary" onClick={() => this.addAppointment()}>Create Appointment</button>

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
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Edit Appointment</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Appointment Name</label>
                                                    <input className="form-control" type="text" name="unitName" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                <button onClick={() => this.updateAppointment()} className="btn btn-primary">Edit Appointment</button>

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
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Delete Appointment?</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div>
                                            <p>Are you sure you want to delete this ({this.state.name}) record? All items related to it will be affected</p>
                                            <button onClick={() => this.deleteAppointment()} className="btn btn-outline-danger" data-dismiss="modal">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade new-department-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Add New Rank</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Rank Name</label>
                                                    <input className="form-control" type="text" name="unit" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                <button className="btn btn-primary" onClick={() => this.addRank()}>Create Rank</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade edit-department-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Edit Rank</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Rank Name</label>
                                                    <input className="form-control" type="text" name="unitName" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                </div>
                                                <button onClick={() => this.updateRank()} className="btn btn-primary">Edit Rank</button>

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm text-white" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade delete-department-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Delete Rank?</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div>
                                            <p>Are you sure you want to delete this ({this.state.name}) record? All items related to it will be affected</p>
                                            <button onClick={() => this.deleteRank()} className="btn btn-outline-danger" data-dismiss="modal">Delete</button>
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
