import React from "react"
import { Link } from "gatsby"
import { fetchData, editData } from "../../../utils/crud"
import Calendar from "../../calendar"

export default class Attendance extends React.Component {
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
        passport: null

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
        const id = this.props.user.userId;
        fetchData(`/Staff/${id}`, (data) => {
            const { staff } = this.state;
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
            if (data.person.imageUrl == '') {

                staff.person.imageUrl = null;

            } else {

                staff.person.imageUrl = data.person.imageUrl
            }
            this.setState({ ...this.state, staff })
        });
    }

    loadStates = () => {
        fetchData('/States', (data) => {
            this.setState({ states: data })
        });
    }


    componentDidMount() {

        this.loadStaff();

    }


    render() {
        return (
            <>
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Staff Attendance</span></h6>
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
                                                    <span className="btn-inner--text">Download CV</span>
                                                </button>
                                                <Link to="/app/identityCard" state={{ staffData: this.state.staff }} className="btn btn-outline-primary btn-icon btn-sm float-right mr-3" >
                                                    <span className="btn-inner--icon"><i className="fa fa-credit-card" /></span>
                                                    <span className="btn-inner--text">ID Card</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Calendar />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
