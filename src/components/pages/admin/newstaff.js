import React from "react"
import { Link } from "gatsby"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import _ from 'lodash'


export default class Staff extends React.Component {
    state = {
        allStaff: [],
        allStaffSearch: [],
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
        appointments: [],
        units: [],
        departments: [],
        ranks: [],
        states: [],
        lgas: [],
        maritalStatus: [],
        genders: [],
        staffTypes: [],
        staffCategories: [],
        searchText:'',

    }

    updatePersonItem = (index, value) => {
        const { staff } = this.state;
        staff.person[index] = value;
        this.setState({ ...this.state, staff });
    }

    updateStaffItem = (index, value) => {
        const { staff } = this.state;
        staff[index] = value;
        this.setState({ ...this.state, staff });
    }

    loadStaff = () => {
        fetchData('/Staff', (data) => {
            this.setState({ allStaff: data , allStaffSearch:data})
        });
    }

    loadStates = () => {
        fetchData('/States', (data) => {
            this.setState({ states: data })
        });
    }

    loadLgas = () => {
        fetchData('/Lgas', (data) => {
            this.setState({ lgas: data })
        });
    }

    loadMaritalStatus = () => {
        fetchData('/MaritalStatus', (data) => {
            this.setState({ maritalStatus: data })
        });
    }

    loadGender = () => {
        fetchData('/Genders', (data) => {
            this.setState({ genders: data })
        });
    }

    loadRank = () => {
        fetchData('/InstitutionRanks', (data) => {
            this.setState({ ranks: data })
        });
    }

    loadDepartment = () => {
        fetchData('/InstitutionDepartments', (data) => {
            this.setState({ departments: data })
        });
    }

    loadAppointment = () => {
        fetchData('/InstitutionAppointments', (data) => {
            this.setState({ appointments: data })
        });
    }

    loadUnit = () => {
        fetchData('/InstitutionUnits', (data) => {
            this.setState({ units: data })
        });
    }

    loadStaffType = () => {
        fetchData('/InstitutionStaffTypes', (data) => {
            this.setState({ staffTypes: data })
        });
    }

    loadStaffCategory = () => {
        fetchData('/InstitutionStaffCategories', (data) => {
            this.setState({ staffCategories: data })
        });
    }

    componentDidMount() {

        this.loadStaff();
        this.loadStaffCategory();
        this.loadStaffType();
        this.loadUnit();
        this.loadAppointment();
        this.loadDepartment();
        this.loadRank();
        this.loadGender();
        this.loadLgas();
        this.loadStates();
        this.loadMaritalStatus()

    }

    setSelectedData = (data) => {

        const { staff } = this.state;
        staff.staffNumber = data.staffNumber;
        staff.person.surname = data.person.surname;
        staff.person.firstname = data.person.firstname;
        staff.person.othername = data.person.othername;
        staff.person.birthDay = data.person.birthDay.substring(0,10);
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

        this.setState({...this.state,staff})
    }

    isValidInputs = () => {
        var phoneno = /^\d{11}$/;
        if (!this.state.staff.person.phoneNumber.match(phoneno))
        {
            alert("Enter a valid Phone Number");
            return false;
        }

        // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // if (!this.state.staff.person.email.match(mailformat))
        // {
        //     alert("Enter a valid Phone Number");
        //     return false;
        // }

        return true;
    }

    submitForm = () => {
        if (this.isValidInputs()){
            postData('/Staff', this.state.staff, (data) => {
                this.loadStaff()
            });
        }
    }

    updateForm = () => {
        if (this.isValidInputs()){
            editData(`/Staff/${this.state.staff.id}`, this.state.staff, (data) => {
                this.loadStaff();
            });
            this.loadStaff();
        }

    }

    searchStaff = (text) => {

        const {allStaff, allStaffSearch} = this.state;
        this.setState({searchText:text, allStaff:allStaffSearch});
        if (text == ''){
            this.setState({searchText:text, allStaff:allStaffSearch});
            return
        }

        const filter = allStaff.filter((staff) => {

            const surnameLower = staff.person.surname.toLowerCase();
            const firstnameLower = staff.person.firstname.toLowerCase();
            const othernameLower = staff.person.othername ? staff.person.othername.toLowerCase() : '';
            const mobilenumberLower = staff.person.phoneNumber ? staff.person.phoneNumber.toLowerCase(): '';
            const rankLower = staff.rank ? staff.rank.name.toLowerCase() : '';
            const departmentLower = staff.department ? staff.department.name.toLowerCase():'';

            const searchValLower = text.toLowerCase();
            return surnameLower.includes(searchValLower) || firstnameLower.includes(searchValLower)
            || othernameLower.includes(searchValLower) || mobilenumberLower.includes(searchValLower)
            || rankLower.includes(searchValLower) || departmentLower.includes(searchValLower);
        });
        this.setState({allStaff:filter});
    }

    render() {
        return (
            <>
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Staff Profiles</span></h6>
                            <span className="text-sm d-block">Create and manage Staff Profiles.</span>
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
                                            <h3 className="card-title mb-0 float-left mr-3">All Staff Profiles</h3>
                                            <div className="form-inline input-group-sm float-left mr-3">
                                                <input type="text" className="form-control input-sm" onChange={(e) => this.searchStaff(e.target.value)} placeholder="Search staff" />

                                            </div>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <button className="btn btn-outline-primary btn-icon btn-sm float-right mr-3" type="button" data-toggle="modal" data-target=".new-level-modal">
                                                    <span className="btn-inner--icon"><i className="fa fa-plus" /></span>
                                                    <span className="btn-inner--text">Create  Staff</span>
                                                </button>
                                                {/* <div className="form-inline float-right mr-3">
                                                    <label className="mr-2" htmlFor="#filterinline">Filter by: </label>
                                                    <select id="filterinline">
                                                        <option>None</option>
                                                        <option>Former Staff</option>
                                                        <option>On leave</option>
                                                        <option>Employeee Status</option>
                                                    </select>
                                                </div> */}
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
                                                    <th>Staff ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>D.O.B</th>
                                                    <th>Rank</th>
                                                    <th>Department</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.allStaff && this.state.allStaff.length > 0 ?
                                                        this.state.allStaff.map((staff, index) => {
                                                                const url = `/app/admin/staffprofile`
                                                            return (
                                                                <tr key={index}>
                                                                    <td> {index + 1} </td>
                                                                    <td>{staff.staffNumber}</td>
                                                                    <td> <Link to={url} state={staff}>{staff.person.surname} {staff.person.firstname} {staff.person.othername}</Link></td>
                                                                    <td>{staff.person.email}</td>
                                                                    <td>{new Date(staff.person.birthDay).toDateString()}</td>
                                                                    <td>{staff.rank ? staff.rank.name: ' - '}</td>
                                                                    <td>{staff.department ? staff.department.name: ' - '}</td>
                                                                    <td className="td-actions">
                                                                        <button onClick={()=>this.setSelectedData(staff)} type="button" rel="tooltip" className="btn btn-primary btn-icon btn-sm " data-toggle="modal" data-target=".edit-level-modal">
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
                    <div className="modal fade new-level-modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-bottom">
                                    <h2 className="mb-0" id="exampleModalScrollableTitle">Create New Staff</h2>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Last Name</label>
                                                    <input className="form-control" type="text" name="surname" onChange={(e) => { this.updatePersonItem('surname', e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">First Name</label>
                                                    <input className="form-control" type="text" name="firstname" onChange={(e) => { this.updatePersonItem('firstname', e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Other Name</label>
                                                    <input className="form-control" type="text" name="othername" onChange={(e) => { this.updatePersonItem('othername', e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Date of birth</label>
                                                    <input className="form-control" type="date" name="birthDay" onChange={(e) => { this.updatePersonItem('birthDay', e.target.value) }} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Email Address</label>
                                                    <input className="form-control" type="email" name="email" onChange={(e) => { this.updatePersonItem('email', e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Phone</label>
                                                    <input className="form-control" type="text" name="phoneNumber" onChange={(e) => { this.updatePersonItem('phoneNumber', e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">Contact Address</label>
                                                    <textarea className="form-control" type="text" name="address" onChange={(e) => { this.updatePersonItem('address', e.target.value) }}></textarea>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label">State of Origin</label>
                                                    <select className="form-control" name="state" onChange={(e) => { this.updatePersonItem('stateId', parseInt(e.target.value)) }} required>
                                                        <option>Select a state</option>
                                                        {
                                                            this.state.states && this.state.states.length > 0 ?
                                                                this.state.states.map((state) => {
                                                                    return (
                                                                        <option key={state.id} value={state.id}>{state.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Local Government Area</label>
                                                    <select className="form-control" name="lgaId" onChange={(e) => { this.updatePersonItem('lgaId', parseInt(e.target.value)) }} required>
                                                        <option>Select a Local Government</option>
                                                        {
                                                            this.state.lgas && this.state.lgas.length > 0 ?
                                                                this.state.lgas.map((lga) => {
                                                                    return (
                                                                        <option key={lga.id} value={lga.id}>{lga.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Gender</label>
                                                    <select className="form-control" name="gender" onChange={(e) => { this.updatePersonItem('genderId', parseInt(e.target.value)) }} >
                                                        <option>Select a Gender</option>
                                                        {
                                                            this.state.genders && this.state.genders.length > 0 ?
                                                                this.state.genders.map((gender) => {
                                                                    return (
                                                                        <option key={gender.id} value={gender.id}>{gender.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Relationship Status</label>
                                                    <select className="form-control" name="maritalStatusId" onChange={(e) => { this.updatePersonItem('maritalStatusId', parseInt(e.target.value)) }} >
                                                        <option>Select a Relationship Status</option>
                                                        {
                                                            this.state.maritalStatus && this.state.maritalStatus.length > 0 ?
                                                                this.state.maritalStatus.map((status) => {
                                                                    return (
                                                                        <option key={status.id} value={status.id}>{status.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Staff Type</label>
                                                    <select className="form-control" name="staffTypeId" onChange={(e) => { this.updateStaffItem('staffTypeId', parseInt(e.target.value)) }} >
                                                        <option>Select Staff Type</option>
                                                        {
                                                            this.state.staffTypes && this.state.staffTypes.length > 0 ?
                                                                this.state.staffTypes.map((types) => {
                                                                    return (
                                                                        <option key={types.id} value={types.id}>{types.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Staff Category</label>
                                                    <select className="form-control" name="categoryId" onChange={(e) => { this.updateStaffItem('categoryId', parseInt(e.target.value)) }} >
                                                        <option>Select a Staff Category</option>
                                                        {
                                                            this.state.staffCategories && this.state.staffCategories.length > 0 ?
                                                                this.state.staffCategories.map((category) => {
                                                                    return (
                                                                        <option key={category.id} value={category.id}>{category.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Unit</label>
                                                    <select className="form-control" name="unitId" onChange={(e) => { this.updateStaffItem('unitId', parseInt(e.target.value)) }} >
                                                        <option>Select a unit</option>
                                                        {
                                                            this.state.units && this.state.units.length > 0 ?
                                                                this.state.units.map((unit) => {
                                                                    return (
                                                                        <option key={unit.id} value={unit.id}>{unit.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Department</label>
                                                    <select className="form-control" name="departmentId" onChange={(e) => { this.updateStaffItem('departmentId', parseInt(e.target.value)) }} >
                                                        <option>Select a Department</option>
                                                        {
                                                            this.state.departments && this.state.departments.length > 0 ?
                                                                this.state.departments.map((department) => {
                                                                    return (
                                                                        <option key={department.id} value={department.id}>{department.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Rank</label>
                                                    <select className="form-control" name="rankId" onChange={(e) => { this.updateStaffItem('rankId', parseInt(e.target.value)) }}  >
                                                        <option>Select an Rank</option>
                                                        {
                                                            this.state.ranks && this.state.ranks.length > 0 ?
                                                                this.state.ranks.map((rank) => {
                                                                    return (
                                                                        <option key={rank.id} value={rank.id}>{rank.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Appointment</label>
                                                    <select className="form-control" name="appointmentId" onChange={(e) => { this.updateStaffItem('appointmentId', parseInt(e.target.value)) }}  >
                                                        <option>Select an Appointment</option>
                                                        {
                                                            this.state.appointments && this.state.appointments.length > 0 ?
                                                                this.state.appointments.map((appointment) => {
                                                                    return (
                                                                        <option key={appointment.id} value={appointment.id}>{appointment.name}</option>
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
                                                    <label htmlFor="example-text-input" className="form-control-label">Staff Number</label>
                                                    <input className="form-control" type="text" name="staffNumber" value={this.state.staff.staffNumber} onChange={(e) => { this.updateStaffItem('staffNumber', e.target.value) }} />
                                                </div>
                                            </div>



                                        </div>
                                        <button type="button" onClick={() => this.submitForm()} data-dismiss="modal" className="btn btn-primary">Submit</button>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
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

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Last Name</label>
                                                <input className="form-control" type="text" name="surname" value={this.state.staff.person.surname} onChange={(e) => { this.updatePersonItem('surname', e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">First Name</label>
                                                <input className="form-control" type="text" name="firstname" value={this.state.staff.person.firstname} onChange={(e) => { this.updatePersonItem('firstname', e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Other Name</label>
                                                <input className="form-control" type="text" name="othername" value={this.state.staff.person.othername} onChange={(e) => { this.updatePersonItem('othername', e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Date of birth</label>
                                                <input className="form-control" type="date" name="birthDay" value={this.state.staff.person.birthDay} onChange={(e) => { this.updatePersonItem('birthDay', e.target.value) }} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Email Address</label>
                                                <input className="form-control" type="email" name="email" value={this.state.staff.person.email} onChange={(e) => { this.updatePersonItem('email', e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Phone</label>
                                                <input className="form-control" type="text" name="phoneNumber" value={this.state.staff.person.phoneNumber} onChange={(e) => { this.updatePersonItem('phoneNumber', e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Contact Address</label>
                                                <textarea className="form-control" type="text" name="address" value={this.state.staff.person.address} onChange={(e) => { this.updatePersonItem('address', e.target.value) }}></textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">State of Origin</label>
                                                <select className="form-control" name="state" onChange={(e) => { this.updatePersonItem('stateId', parseInt(e.target.value)) }} required>
                                                    <option>Select a state</option>
                                                    {
                                                        this.state.states && this.state.states.length > 0 ?
                                                            this.state.states.map((state) => {
                                                                return (
                                                                    <option key={state.id} selected={state.id == this.state.staff.person.stateId} value={state.id}>{state.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Local Government Area</label>
                                                <select className="form-control" name="lgaId" onChange={(e) => { this.updatePersonItem('lgaId', parseInt(e.target.value)) }} required>
                                                    <option>Select a Local Government</option>
                                                    {
                                                        this.state.lgas && this.state.lgas.length > 0 ?
                                                            this.state.lgas.map((lga) => {
                                                                return (
                                                                    <option key={lga.id} selected={lga.id == this.state.staff.person.lgaId} value={lga.id}>{lga.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Gender</label>
                                                <select className="form-control" name="gender" onChange={(e) => { this.updatePersonItem('genderId', parseInt(e.target.value)) }} >
                                                    <option>Select a Gender</option>
                                                    {
                                                        this.state.genders && this.state.genders.length > 0 ?
                                                            this.state.genders.map((gender) => {
                                                                return (
                                                                    <option key={gender.id} selected={gender.id == this.state.staff.person.genderId} value={gender.id}>{gender.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Relationship Status</label>
                                                <select className="form-control" name="maritalStatusId" onChange={(e) => { this.updatePersonItem('maritalStatusId', parseInt(e.target.value)) }} >
                                                    <option>Select a Relationship Status</option>
                                                    {
                                                        this.state.maritalStatus && this.state.maritalStatus.length > 0 ?
                                                            this.state.maritalStatus.map((status) => {
                                                                return (
                                                                    <option key={status.id} selected={status.id == this.state.staff.person.maritalStatusId} value={status.id}>{status.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Staff Type</label>
                                                <select className="form-control" name="staffTypeId" onChange={(e) => { this.updateStaffItem('staffTypeId', parseInt(e.target.value)) }} >
                                                    <option>Select Staff Type</option>
                                                    {
                                                        this.state.staffTypes && this.state.staffTypes.length > 0 ?
                                                            this.state.staffTypes.map((types) => {
                                                                return (
                                                                    <option key={types.id} selected={types.id == this.state.staff.staffTypeId} value={types.id}>{types.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Staff Category</label>
                                                <select className="form-control" name="categoryId" onChange={(e) => { this.updateStaffItem('categoryId', parseInt(e.target.value)) }} >
                                                    <option>Select a Staff Category</option>
                                                    {
                                                        this.state.staffCategories && this.state.staffCategories.length > 0 ?
                                                            this.state.staffCategories.map((category) => {
                                                                return (
                                                                    <option key={category.id} selected={category.id == this.state.staff.categoryId} value={category.id}>{category.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Unit</label>
                                                <select className="form-control" name="unitId" onChange={(e) => { this.updateStaffItem('unitId', parseInt(e.target.value)) }} >
                                                    <option>Select a unit</option>
                                                    {
                                                        this.state.units && this.state.units.length > 0 ?
                                                            this.state.units.map((unit) => {
                                                                return (
                                                                    <option key={unit.id} selected={unit.id == this.state.staff.unitId} value={unit.id}>{unit.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Department</label>
                                                <select className="form-control" name="departmentId" onChange={(e) => { this.updateStaffItem('departmentId', parseInt(e.target.value)) }} >
                                                    <option>Select a Department</option>
                                                    {
                                                        this.state.departments && this.state.departments.length > 0 ?
                                                            this.state.departments.map((department) => {
                                                                return (
                                                                    <option key={department.id} selected={department.id == this.state.staff.departmentId} value={department.id}>{department.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Rank</label>
                                                <select className="form-control" name="rankId" onChange={(e) => { this.updateStaffItem('rankId', parseInt(e.target.value)) }}  >
                                                    <option>Select an Rank</option>
                                                    {
                                                        this.state.ranks && this.state.ranks.length > 0 ?
                                                            this.state.ranks.map((rank) => {
                                                                return (
                                                                    <option key={rank.id} selected={rank.id == this.state.staff.rankId} value={rank.id}>{rank.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Appointment</label>
                                                <select className="form-control" name="appointmentId" onChange={(e) => { this.updateStaffItem('appointmentId', parseInt(e.target.value)) }}  >
                                                    <option>Select an Appointment</option>
                                                    {
                                                        this.state.appointments && this.state.appointments.length > 0 ?
                                                            this.state.appointments.map((appointment) => {
                                                                return (
                                                                    <option key={appointment.id} selected={appointment.id == this.state.staff.appointmentId} value={appointment.id}>{appointment.name}</option>
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
                                                <label htmlFor="example-text-input" className="form-control-label">Staff Number</label>
                                                <input className="form-control" type="text" name="staffNumber" value={this.state.staff.staffNumber} onChange={(e) => { this.updateStaffItem('staffNumber', e.target.value) }} />
                                            </div>
                                        </div>



                                    </div>
                                    <button type="button" onClick={() => this.updateForm()} data-dismiss="modal" className="btn btn-primary">Submit</button>

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
