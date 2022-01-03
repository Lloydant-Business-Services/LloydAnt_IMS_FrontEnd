import React from "react"
import { Link } from "gatsby"
import { fetchData, editData } from "../../../utils/crud"
import _ from "lodash"

export default class News extends React.Component {
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
    loadBroadcasts = () => {
        fetchData('/Broadcasts', (data) => {
            this.setState({ broadcasts: _.reverse(data) })
        });
    }


    componentDidMount() {

        this.loadBroadcasts();

    }


    render() {
        return (
            <>
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Staff News</span></h6>
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


                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="card">
                                        {/* Card header */}
                                        <div className="card-header">
                                            {/* Title */}
                                            <h5 className="h3 mb-0">Latest News</h5>
                                        </div>
                                        {/* Card body */}
                                        <div className="card-body">
                                            <div className="timeline timeline-one-side" data-timeline-content="axis" data-timeline-axis-style="dashed">
                                                {
                                                    this.state.broadcasts != null && this.state.broadcasts.length > 0 ?

                                                        this.state.broadcasts.map((news) => {
                                                            return (
                                                                <div className="timeline-block">
                                                                    <span className="timeline-step badge-success">
                                                                        <i className="ni ni-bell-55" />
                                                                    </span>
                                                                    <div className="timeline-content">
                                                                        <div className="d-flex justify-content-between pt-1">
                                                                            <div>
                                                                                <span className="text-muted text-sm font-weight-bold">{news.subject}</span>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <small className="text-muted"><i className="fas fa-clock mr-1" />{news.date.substring(0,10)}</small>
                                                                            </div>
                                                                        </div>
                                                                        <h6 className="text-sm mt-1 mb-0">{news.details}</h6>
                                                                    </div>
                                                                </div>

                                                            )
                                                        })
                                                        : null
                                                }
                                            </div>
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
