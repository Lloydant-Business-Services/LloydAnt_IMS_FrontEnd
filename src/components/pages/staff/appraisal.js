import React from "react"
import { fetchData, editData } from "../../../utils/crud"

export default class Appraisal extends React.Component {
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
                "imageUrl":"",
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
            if (data.person.imageUrl == ''){

                staff.person.imageUrl = null;

            }else{

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


    isValidInputs = () => {
        var phoneno = /^\d{11}$/;
        if (!this.state.staff.person.phoneNumber.match(phoneno)) {
            alert("Enter a valid Phone Number");
            return false;
        }

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.staff.person.email.match(mailformat)) {
            alert("Enter a valid Phone Number");
            return false;
        }

        return true;
    }

    updateForm = () => {
        if (this.isValidInputs()) {
            editData(`/Staff/${this.state.staff.id}`, this.state.staff, (data) => {
                if (data) {
                    alert("Saved!");
                }

            });

        }

    }

    handleFileUpload = (e) => {

        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        const {staff} = this.state;

        reader.onloadend = () => {

          staff.person.imageUrl = reader.result;
          this.setState({
            ...this.state,
            file: file,
            passport: reader.result,
            staff
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
                            <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard <span className="h3 text-muted">/Staff Appraisal</span></h6>
                            <span className="text-sm d-block">Fill Appraisal Form.</span>
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

                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </>
        )
    }
}
