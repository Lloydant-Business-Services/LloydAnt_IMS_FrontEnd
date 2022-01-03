import React from "react";
import {
  fetchDataWithoutToken,
  postData,
  editData,
  URL as url,
  fetchData,
} from "../utils/crud";
import { URL as newURL } from "../utils/crud";
import { Link } from "react-router-dom";
import logosm from "../images/ziklogosml.png";
import axios from "axios";
import { thru } from "lodash";
import Notification from "../components/Reusables/NotificationCard";
import Spinner from "../components/pages/admin/Spinner";

let index = 0;

export default class NewForm extends React.Component {
  state = {
    pageTrack: 1,
    jobVacancyId: this.props.location.state.data,
    lastName: "",
    firstName: "",
    otherName: "",
    address: "",
    dateOfBirth: "",
    stateOfOrigin: "",
    phone: "",
    email: "",
    maritalStatus: "",
    maritalStatuses: [],
    states: [],
    religion: "",
    religions: [],
    lga: "",
    lgas: [],
    gender: "",
    genders: [],
    stateValue: [],
    lgaValue: [],
    maritalStatusValue: [],
    genderValue: [],
    religionValue: [],
    file: " ",
    imageFile: "",
    imagePath: "",
    biodataSection: true,
    educaSection: false,
    journalSection: false,
    certificationSection: false,
    proBodiesSection: false,
    workSection: false,
    researchSection: false,
    refereeSection: false,
    qualifications: "",
    educationalQualification: [
      {
        id: Math.random(),
        institutionAttended: "",
        course: "",
        graduationYear: 0,
        qualificationObtained: 0,
      },
    ],
    show: false,
    professionalBody: [
      { id: Math.random(), name: "", yearJoined: 0, comments: "" },
    ],

    show2: false,
    journals: [
      {
        id: Math.random(),
        title: "",
        yearOfPublication: 0,
        nameOfPublisher: "",
      },
    ],
    showWork: false,
    workExperience: [
      {
        id: Math.random(),
        organisation: "",
        positionHeld: "",
        startYear: "0001-01-01T00:00:00.597Z",
        endYear: "0001-01-01T00:00:00.597Z",
      },
    ],
    showResearch: false,

    researchGrants: [
      {
        id: Math.random(),
        nameOfBody: "",
        yearObtained: 0,
        researchTopic: "",
        researchType: "",
      },
    ],
    showCert: false,

    certifications: [
      {
        id: Math.random(),
        nameOfQualification: "",
        nameOfBody: "",
        yearObtained: 0,
      },
    ],
    nameOfReferee1: "",
    organisation1: "",
    designation1: "",
    email1: "",
    nameOfReferee2: "",
    organisation2: "",
    designation2: "",
    email2: "",
    nameOfReferee3: "",
    organisation3: "",
    designation3: "",
    email3: "",
  };
  getJob = () => {
    fetchDataWithoutToken(`JobVacancy/${this.state.jobVacancyId}`, (data) => {
      console.log(data, "data");
      this.setState({
        jobName: data.vacancyName,
      });
    });
  };
  async componentDidMount() {
    // this.getJob();
    this.formTabHandler();
    await fetchDataWithoutToken(
      `/JobVacancy/${this.state.jobVacancyId}`,
      (data) => {
        console.log(data, "dataaa");
        this.setState({
          jobName: data.vacancyName,
        });
      }
    );
    console.log(this.state.jobVacancyId, "Joboo");
    await fetchDataWithoutToken("/EducationalQualifications", (data) => {
      this.setState({ qualifications: data });
    });
    await fetchDataWithoutToken("/States", (data) => {
      this.setState({ states: data });
    });
    await fetchDataWithoutToken("/MaritalStatus", (data) => {
      this.setState({ maritalStatuses: data });
    });
    await fetchDataWithoutToken("/Religions", (data) => {
      this.setState({ religions: data });
    });
    await fetchDataWithoutToken("/Genders", (data) => {
      this.setState({ genders: data });
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.stateOfOrigin != this.state.stateOfOrigin) {
      await fetchDataWithoutToken(
        `/Lgas/byStateId/?id=${this.state.stateOfOrigin}`,
        (data) => {
          this.setState({ lgas: data });
        }
      );
      let stateValue = this.state.states.filter(
        (state) => state.id == this.state.stateOfOrigin
      );
      this.setState({ stateValue });
    }

    if (prevState.lga != this.state.lga) {
      let lgaValue = this.state.lgas.filter((lga) => lga.id == this.state.lga);
      this.setState({ lgaValue });
    }

    if (prevState.maritalStatus != this.state.maritalStatus) {
      let maritalStatusValue = this.state.maritalStatuses.filter(
        (maritalStatus) => maritalStatus.id == this.state.maritalStatus
      );
      this.setState({ maritalStatusValue });
    }

    if (prevState.gender != this.state.gender) {
      let genderValue = this.state.genders.filter(
        (gender) => gender.id == this.state.gender
      );
      this.setState({ genderValue });
    }

    if (prevState.religion != this.state.religion) {
      let religionValue = this.state.religions.filter(
        (religion) => religion.id == this.state.religion
      );
      this.setState({ religionValue });
    }
  }

  handleChangeBio = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  previewFile = (e) => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      imageFile: e.target.files[0],
    });
  };

  uploadImage = async () => {
    if (this.state.imageFile) {
      const formData = new FormData();

      const file = this.state.imageFile;
      console.log(file);

      formData.append("file", file);

      try {
        const res = await axios({
          method: "POST",
          url: url + "/Upload/UploadSingleFile",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        return this.setState({ imagePath: res.data.dbPath });
      } catch (err) {
        return console.log(err);
      }
    }
  };

  handleChangeEdu = (e) => {
    if (
      [
        "institutionAttended",
        "course",
        "graduationYear",
        "qualificationObtained",
      ].includes(e.target.name)
    ) {
      let educationalQualification = [...this.state.educationalQualification];
      educationalQualification[e.target.dataset.id][e.target.name] =
        e.target.value;
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  addNewEducationalRow = (e) => {
    this.setState((prevState) => ({
      educationalQualification: [
        ...prevState.educationalQualification,
        {
          id: Math.random(),
          institutionAttended: "",
          graduationYear: "",
          qualificationObtained: "",
          course: "",
        },
      ],
    }));
  };

  deleteEducationalRow = (index) => {
    this.setState({
      educationalQualification: this.state.educationalQualification.filter(
        (r) => r !== index
      ),
    });
  };

  //ProBodies Starts

  handleChangeProBodies = (e) => {
    if (["name", "yearJoined", "comments"].includes(e.target.name)) {
      let professionalBody = [...this.state.professionalBody];
      professionalBody[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  addNewRowPro = (e) => {
    this.setState((prevState) => ({
      professionalBody: [
        ...prevState.professionalBody,
        {
          id: Math.random(),
          name: null,
          yearJoined: null,
          comments: null,
        },
      ],
    }));
  };

  deletePro = (index) => {
    this.setState({
      professionalBody: this.state.professionalBody.filter((r) => r !== index),
    });
  };

  //Journals

  handleChangeJournal = (e) => {
    if (
      ["title", "yearOfPublication", "nameOfPublisher"].includes(e.target.name)
    ) {
      let journals = [...this.state.journals];
      journals[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  addNewRowJournal = (e) => {
    this.setState((prevState) => ({
      journals: [
        ...prevState.journals,
        {
          id: Math.random(),
          title: "",
          yearOfPublication: "",
          nameOfPublisher: "",
        },
      ],
    }));
  };

  handleShow = () => {
    if (!this.state.show2) {
      this.setState({
        show2: true,
      });
    } else {
      this.setState({
        show2: false,
      });
    }
  };

  deleteJournal = (index) => {
    this.setState({
      journals: this.state.journals.filter((r) => r !== index),
    });
  };

  //Work

  handleChangeWork = (e) => {
    if (
      ["organisation", "positionHeld", "startYear", "endYear"].includes(
        e.target.name
      )
    ) {
      let workExperience = [...this.state.workExperience];
      workExperience[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  addNewRowWork = (e) => {
    this.setState((prevState) => ({
      workExperience: [
        ...prevState.workExperience,
        {
          id: Math.random(),
          organisation: "",
          positionHeld: "",
          startYear: "",
          endYear: "",
        },
      ],
    }));
  };

  handleShowWork = () => {
    if (!this.state.showWork) {
      this.setState({
        showWork: true,
      });
    } else {
      this.setState({
        showWork: false,
      });
    }
  };

  deleteWork = (index) => {
    this.setState({
      workExperience: this.state.workExperience.filter((r) => r !== index),
    });
  };

  //Research

  handleChangeResearch = (e) => {
    if (
      ["nameOfBody", "yearObtained", "researchTopic", "researchType"].includes(
        e.target.name
      )
    ) {
      let researchGrants = [...this.state.researchGrants];
      researchGrants[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleShowResearch = () => {
    if (!this.state.showResearch) {
      this.setState({
        showResearch: true,
      });
    } else {
      this.setState({
        showResearch: false,
      });
    }
  };
  addNewRowResearch = (e) => {
    this.setState((prevState) => ({
      researchGrants: [
        ...prevState.researchGrants,
        {
          id: Math.random(),
          nameOfBody: "",
          yearObtained: "",
          researchTopic: "",
          researchType: "",
        },
      ],
    }));
  };

  deleteResearch = (index) => {
    this.setState({
      researchGrants: this.state.researchGrants.filter((r) => r !== index),
    });
  };

  //Certification
  handleChangeCert = (e) => {
    if (
      ["nameOfQualification", "nameOfBody", "yearObtained"].includes(
        e.target.name
      )
    ) {
      let certifications = [...this.state.certifications];
      certifications[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  addNewRowCert = (e) => {
    this.setState((prevState) => ({
      certifications: [
        ...prevState.certifications,
        {
          id: Math.random(),
          nameOfQualification: "",
          nameOfBody: "",
          yearObtained: "",
        },
      ],
    }));
  };
  handleShowCert = () => {
    if (!this.state.showCert) {
      this.setState({
        showCert: true,
      });
    } else {
      this.setState({
        showCert: false,
      });
    }
  };
  deleteCert = (index) => {
    this.setState({
      certifications: this.state.certifications.filter((r) => r !== index),
    });
  };

  //Referee
  handleChangeRef = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleBio = () => {

    const formWidgets = document.querySelectorAll(".form-widget");
    console.log(formWidgets[0].innerHTML);

    formWidgets.forEach((e) => {
      e.style.display = "none";
    });
    formWidgets[0].style.display = "block";
    // this.setState({
    //   biodataSection: true,
    //   educaSection: false,
    //   journalSection: false,
    //   certificationSection: false,
    //   proBodiesSection: false,
    //   workSection: false,
    //   researchSection: false,
    //   refereeSection: false,
    // });
  };

  toggleCertification = () => {
    const formWidgets = document.querySelectorAll(".form-widget");
    console.log(formWidgets[6].innerHTML);

    formWidgets.forEach((e) => {
      e.style.display = "none";
    });
    formWidgets[6].style.display = "block";
    // this.setState({
    //   biodataSection: false,
    //   educaSection: false,
    //   journalSection: false,
    //   certificationSection: true,
    //   proBodiesSection: false,
    //   workSection: false,
    //   researchSection: false,
    //   refereeSection: false,
    // });
  };

  toggleProfessionalBodies = () => {

    const formWidgets = document.querySelectorAll(".form-widget");
    console.log(formWidgets[2].innerHTML);

    formWidgets.forEach((e) => {
      e.style.display = "none";
    });
    formWidgets[2].style.display = "block";
    // this.setState({
    //   biodataSection: false,
    //   educaSection: false,
    //   journalSection: false,
    //   certificationSection: false,
    //   proBodiesSection: true,
    //   workSection: false,
    //   researchSection: false,
    //   refereeSection: false,
    // });
  };

  toggleJournals = () => {

    const formWidgets = document.querySelectorAll(".form-widget");
    console.log(formWidgets[3].innerHTML);

    formWidgets.forEach((e) => {
      e.style.display = "none";
    });
    formWidgets[3].style.display = "block";
    // this.setState({
    //   biodataSection: false,
    //   educaSection: false,
    //   journalSection: true,
    //   certificationSection: false,
    //   proBodiesSection: false,
    //   workSection: false,
    //   researchSection: false,
    //   refereeSection: false,
    // });
  };

  toggleWork = () => {

    const formWidgets = document.querySelectorAll(".form-widget");
    console.log(formWidgets[4].innerHTML);

    formWidgets.forEach((e) => {
      e.style.display = "none";
    });
    formWidgets[4].style.display = "block";
    // this.setState({
    //   biodataSection: false,
    //   educaSection: false,
    //   journalSection: false,
    //   certificationSection: false,
    //   proBodiesSection: false,
    //   workSection: true,
    //   researchSection: false,
    //   refereeSection: false,
    // });
  };

  toggleEducation = () => {

    // let doc = document.getElementById("edu_");
    // doc.style.display = "block";
    // index = 0;
    const formWidgets = document.querySelectorAll(".form-widget");
    console.log(formWidgets[1].innerHTML);

    formWidgets.forEach((e) => {
      e.style.display = "none";
    });
    formWidgets[1].style.display = "block";
    // this.setState({
    //   biodataSection: false,
    //   educaSection: true,
    //   journalSection: false,
    //   certificationSection: false,
    //   proBodiesSection: false,
    //   workSection: false,
    //   researchSection: false,
    //   refereeSection: false,
    // });
  };
  toggleResearch = () => {
    const formWidgets = document.querySelectorAll(".form-widget");
    console.log(formWidgets[5].innerHTML);

    formWidgets.forEach((e) => {
      e.style.display = "none";
    });
    formWidgets[5].style.display = "block";
    // this.setState({
    //   biodataSection: false,
    //   educaSection: false,
    //   journalSection: false,
    //   certificationSection: false,
    //   proBodiesSection: false,
    //   workSection: false,
    //   researchSection: true,
    //   refereeSection: false,
    // });
  };
  toggleReferee = () => {
    const formWidgets = document.querySelectorAll(".form-widget");
    console.log(formWidgets[2].innerHTML);

    formWidgets.forEach((e) => {
      e.style.display = "none";
    });
    formWidgets[2].style.display = "block";
    // this.setState({
    //   biodataSection: false,
    //   educaSection: false,
    //   journalSection: false,
    //   certificationSection: false,
    //   proBodiesSection: false,
    //   workSection: false,
    //   researchSection: false,
    //   refereeSection: true,
    // });
  };

  submitApplication = (e) => {
    e.preventDefault();
    this.setState({ spin: true });

    const applicationLoad = {
      person: {
        imageUrl: "strinnnnn",
        surname: this.state.lastName,
        firstname: this.state.firstName,
        othername: this.state.otherName,
        birthDay: this.state.dateOfBirth,
        email: this.state.email,
        address: this.state.address,
        phoneNumber: this.state.phone,
        stateId: parseInt(this.state.stateOfOrigin),
        lgaId: parseInt(this.state.lga),
        maritalStatusId: parseInt(this.state.maritalStatus),
        religionId: parseInt(this.state.religion),
        genderId: parseInt(this.state.gender),
      },
      personEducation: [
        {
          qualificationId: 1,
          institutionName: "string",
          courseOfStudy: "string",
          year: 2020,
        },
      ],

      personCertification: [
        {
          name: "string",
          issuer: "string",
          year: 2020,
        },
      ],
      personExperience: [
        {
          organisation: "string",
          role: "string",
          startDate: "2020-08-10T21:33:46.521Z",
          endDate: "2020-08-10T21:33:46.521Z",
        },
      ],
      personJournal: [
        {
          name: "string",
          publisher: "string",
          year: 2011,
        },
      ],
      personProfessionalBody: [
        {
          name: "string",
          comments: "string",
          year: 2011,
        },
      ],
      personReferee: [
        {
          name: "string",
          organisation: "string",
          designation: "string",
          email: "string",
        },
      ],
      personResearch: [
        {
          name: "string",
          topic: "string",
          year: 2004,
        },
      ],
      jobVacancyId: this.state.jobVacancyId,
    };

    postData(
      "/ApplicationForms/CreatApplicationForm",
      applicationLoad,
      (data) => {
        console.log(data, "Feedback");
        this.setState({ spin: false, success: true });
      }
    );
  };

  closeSuccess = () => {
    this.setState({
      success: false,
    });
  };

  tabManagement = () => {
    if (this.state.pageTrack == 1) {
      this.setState({
        biodataSection: true,
        educaSection: false,
        journalSection: false,
        certificationSection: false,
        proBodiesSection: false,
        workSection: false,
        researchSection: false,
        refereeSection: false,
      });
    } else if (this.state.pageTrack == 2) {
      this.setState({
        biodataSection: false,
        educaSection: true,
        journalSection: false,
        certificationSection: false,
        proBodiesSection: false,
        workSection: false,
        researchSection: false,
        refereeSection: false,
      });
    } else if (this.state.pageTrack == 3) {
      this.setState({
        biodataSection: false,
        educaSection: false,
        journalSection: true,
        certificationSection: false,
        proBodiesSection: false,
        workSection: false,
        researchSection: false,
        refereeSection: false,
      });
    }
    //Or

    // switch(this.state.pageTrack){
    //   case 1 : this.setState({
    //     bioSec:true,
    //     journ:false
    //   })
    //   break;

    //   default:
    //     break;
    // }
  };

  handleNextBtn = () => {
    var se = this.state.pageTrack++;
    this.setState({
      new: se,
    });
    console.log(this.state.new);
  };

  formTabHandler = async () => {
    index = 0;
    const formWidgets = document.querySelectorAll(".form-widget");
    console.log(formWidgets[0].innerHTML);

    await formWidgets.forEach((e) => {
      e.style.display = "none";
    });
    formWidgets[0].style.display = "block";
  };

  handleNextTest = () => {
    let nextBtn = document.getElementById("me");

    index++;
    // index++
    const formWidgets = document.querySelectorAll(".form-widget");
    const btnWidgets = document.querySelectorAll(".btn-widget");
  
    
    formWidgets.forEach((e) => {
      e.style.display = "none";
    });

    btnWidgets.forEach((e) => {
      e.style.backgroundColor = "transparent";
      btnWidgets[index].style.color = "black";

    });

    

    console.log(index, "Index");

    if (index <= formWidgets.length) {
      //Display only one
      formWidgets[index].style.display = "block";
      btnWidgets[index].style.backgroundColor = "#172b4d";
      btnWidgets[index].style.color = "ghostwhite";
    }
    if (index === formWidgets.length - 1) {
      //Disable the button
      nextBtn.setAttribute("disabled", true);
    }
  };


  handlePrevious = () => {
    let nextBtn = document.getElementById("prev");

    index--;
    // index++
    const formWidgets = document.querySelectorAll(".form-widget");

         //Hide all the Form widgets
         formWidgets.forEach(e => {
            e.style.display = "none";
        })

        if(index >= 0 && index <= formWidgets.length) {
            //Display only one
            formWidgets[index].style.display = "block";
        }
        // if(index <= 0) {
        //     //Disable the button
        //     e.target.setAttribute("disabled", true);

        //     //Enable the next button
        //     previousBtn.setAttribute("disabled", false);
        // }
  }

  render() {
    return (
      <>
        {this.state.spin ? <Spinner /> : null}
        {this.state.success ? (
          <Notification
            message={"Your Application Was Submitted Successfully!"}
            okBtn={true}
            closeCard={this.closeSuccess}
          />
        ) : null}

        <div>
          <header>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            {/* Favicon */}
            {/* <link rel="icon" href={favicon} type="image/png" /> */}
            {/* Fonts */}
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap"
              rel="stylesheet"
            />
            {/* Icons */}
            {/* <link rel="stylesheet" href={nucleo} type="text/css" /> */}
            {/* <link rel="stylesheet" href={fontawesome} type="text/css" /> */}
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" />
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" />
            <script
              src="https://code.jquery.com/jquery-3.4.1.min.js"
              integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
              crossOrigin="anonymous"
            ></script>
            {/* <link rel="stylesheet" href="../assets/css/style.css" type="text/css"> */}
          </header>

          <div className="main-content" id="panel">
            <nav
              className="navbar navbar-top navbar-expand navbar-light m-0 p-0"
              style={{ backgroundColor: "#253b80" }}
            >
              <div className="container">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  {/* Navbar links */}

                  <a
                    className="navbar-brand"
                    href="dashboard.html"
                    style={{ display: "inline-block" }}
                  >
                    {/* <img src="assets/img/brand/blue.png" className="navbar-brand-img" alt="..."> */}
                    {/* <h2 className="mb-0 text-white pop-font">HRM</h2>  */}
                    <span
                      className="avatar avatar-sm"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img src={logosm} className="pt-5" />
                    </span>
                  </a>

                  <ul className="navbar-nav align-items-center ml-md-auto">
                    <li className="nav-item d-xl-none">
                      {/* Sidenav toggler */}
                      <div
                        className="pr-3 sidenav-toggler sidenav-toggler-light"
                        data-action="sidenav-pin"
                        data-target="#sidenav-main"
                      >
                        <div className="sidenav-toggler-inner">
                          <i className="sidenav-toggler-line" />
                          <i className="sidenav-toggler-line" />
                          <i className="sidenav-toggler-line" />
                        </div>
                      </div>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/Login">
                        <button className="btn btn-accent">Sign In</button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Content */}

        <div className="header-body">
          <div className="container">
            <div className="row align-items-center py-4">
              <div className="col-lg-12 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Application{" - "} ({this.state.jobName})
                </h6>
              </div>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>

          {/* <button onClick={this.handleNextBtn}>Click</button> */}
          {/* <h2>{this.state.new}</h2> */}

          <div className="row justify-content-center">
            <div className="col-md-8 mt-4">
              <div className="card" id="sum-tab">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h4 className=" mb-0">Carefully Fill in Your Details</h4>
                    </div>
                    <div className="col">
                      <div></div>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <hr />
                    <div className="container">
                      <button
                        className="btn btn-widget"
                        onClick={this.toggleBio}
                      >
                        Biodata
                      </button>
                      <button
                        className="btn btn-widget"
                        onClick={this.toggleEducation}
                      >
                        Education
                      </button>
                      <button
                        className="btn btn-widget"
                        onClick={this.toggleProfessionalBodies}
                      >
                        Professional Bodies
                      </button>
                      <button
                        className="btn btn-widget"
                        onClick={this.toggleJournals}
                      >
                        Journal
                      </button>
                      <button
                        className="btn btn-widget"
                        onClick={this.toggleWork}
                      >
                        Work
                      </button>
                      <button
                        className="btn btn-widget"
                        onClick={this.toggleResearch}
                      >
                        Research
                      </button>
                      <button
                        className="btn btn-widget"
                        onClick={this.toggleCertification}
                      >
                        Certifications
                      </button>
                      <button
                        className="btn btn-widget"
                        onClick={this.toggleReferee}
                      >
                        Referee
                      </button>
                    </div>
                    <hr />
                    {/* Biodata Section  Starts*/}

                    {/* {this.state.biodataSection ?      */}
                    <fieldset className="form-widget">
                      <div className="text-center">
                        <h2 className="fs-title font-weight-700">BioData</h2>
                        <h3 className="fs-subtitle mb-5">
                          Your personal information
                        </h3>
                      </div>

                      <div className="row text-left mb-5">
                        <div className="col-md-12">
                          <img
                            src={this.state.file}
                            style={{
                              width: 200,
                              height: 200,
                              borderRadius: "5px",
                              border: "2px solid lightgray",
                            }}
                          />
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Image Upload
                            </label>

                            <input
                              className="form-control"
                              type="file"
                              name="image"
                              onChange={this.previewFile}
                            />

                            {/* <button onClick={this.uploadImage}>Upload</button> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Last Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="lastName"
                              onChange={this.handleChangeBio}
                              value={this.state.lastName}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              First Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="firstName"
                              onChange={this.handleChangeBio}
                              value={this.state.firstName}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Other Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="otherName"
                              onChange={this.handleChangeBio}
                              value={this.state.otherName}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Phone
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              name="phone"
                              onChange={this.handleChangeBio}
                              value={this.state.phone}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Email
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              onChange={this.handleChangeBio}
                              value={this.state.email}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Address
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="address"
                              onChange={this.handleChangeBio}
                              value={this.state.address}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Date of Birth
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              name="dateOfBirth"
                              onChange={this.handleChangeBio}
                              value={this.state.dateOfBirth}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              State of Origin
                            </label>
                            <select
                              className="form-control"
                              name="stateOfOrigin"
                              onChange={this.handleChangeBio}
                              value={this.state.stateOfOrigin}
                              required
                            >
                              <option value={0}>Select State of Origin</option>
                              {this.state.states.map((state) => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              LGA
                            </label>
                            <select
                              className="form-control"
                              name="lga"
                              onChange={this.handleChangeBio}
                              value={this.state.lga}
                              required
                            >
                              <option>Select LGA</option>
                              {this.state.lgas &&
                                this.state.lgas.map((lga) => (
                                  <option key={lga.id} value={lga.id}>
                                    {lga.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Marital Status
                            </label>
                            <select
                              className="form-control"
                              name="maritalStatus"
                              onChange={this.handleChangeBio}
                              value={this.state.maritalStatus}
                              required
                            >
                              <option>Select Marital Status</option>
                              {this.state.maritalStatuses.map((status) => (
                                <option key={status.id} value={status.id}>
                                  {status.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Religion
                            </label>
                            <select
                              className="form-control"
                              name="religion"
                              onChange={this.handleChangeBio}
                              value={this.state.religion}
                              required
                            >
                              <option>Select Religion</option>
                              {this.state.religions.map((religion) => (
                                <option key={religion.id} value={religion.id}>
                                  {religion.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Gender
                            </label>
                            <select
                              className="form-control"
                              name="gender"
                              onChange={this.handleChangeBio}
                              value={this.state.gender}
                              required
                            >
                              <option>Select Gender</option>
                              {this.state.genders.map((gender) => (
                                <option key={gender.id} value={gender.id}>
                                  {gender.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                    {/* : null} */}

                    {/* Educa Section  Starts*/}

                    {/* {this.state.educaSection ?    */}
                    <fieldset className="form-widget">
                      <form onChange={this.handleChangeEdu}>
                        <div className="text-center">
                          <h2 className="fs-title font-weight-700">
                            Education &amp; Qualifications
                          </h2>
                          <h3 className="fs-subtitle mb-5">
                            Educational Institutions attended and qualifications
                            obtained{" "}
                            <span style={{ color: "red" }}>
                              (This Section is Compulsory)
                            </span>
                          </h3>
                        </div>
                        {this.state.educationalQualification.map(
                          (education, index) => {
                            let institutionAttended = `institutionAttended-${index}`,
                              graduationYear = `graduationYear-${index}`,
                              qualificationObtained = `qualificationObtained-${index}`,
                              course = `course-${index}`;
                            return (
                              <div key={index} className="row text-left mb-5">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Institution Attended
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="institutionAttended"
                                      data-id={index}
                                      id={institutionAttended}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Course
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="course"
                                      data-id={index}
                                      id={course}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Graduation Year
                                    </label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="graduationYear"
                                      data-id={index}
                                      id={graduationYear}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Qualification Obtained
                                    </label>
                                    <select
                                      name="qualificationObtained"
                                      id={qualificationObtained}
                                      data-id={index}
                                      className="form-control"
                                    >
                                      <option value={0}>
                                        Select Qualification
                                      </option>
                                      {this.state.qualifications &&
                                        this.state.qualifications.map(
                                          (qualification) => (
                                            <option
                                              key={qualification.id}
                                              value={qualification.id}
                                            >
                                              {qualification.name}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                </div>
                                {index !== 0 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      this.deleteEducationalRow(education)
                                    }
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              </div>
                            );
                          }
                        )}
                        <div className="col-md-6">
                          <button
                            className="btn btn-icon btn-3 btn-primary btn-sm"
                            type="button"
                            onClick={this.addNewEducationalRow}
                          >
                            <span className="btn-inner--icon">
                              <i className="fa fa-plus" />
                            </span>
                            <span className="btn-inner--text">
                              Add qualification
                            </span>
                          </button>
                        </div>
                      </form>
                    </fieldset>

                    {/* : null} */}

                    {/* ProBodies Section  Starts*/}

                    {/* {this.state.proBodiesSection ?  */}

                    <fieldset className="form-widget">
                      <div className="text-center">
                        <h2 className="fs-title font-weight-700">
                          Professional Bodies
                        </h2>
                        <h3 className="fs-subtitle mb-5">
                          Professional bodies you belong or have belonged to
                        </h3>
                      </div>
                      <div className="border-bottom">
                        <div className="form-group text-left">
                          <h5>
                            I have belonged or belong to a professional
                            body/bodies &nbsp;
                          </h5>
                          <h5>
                            <label className="custom-toggle">
                              <input
                                type="checkbox"
                                value={this.state.show}
                                onChange={() =>
                                  this.setState({ show: !this.state.show })
                                }
                              />
                              <span
                                className="custom-toggle-slider rounded-circle"
                                style={{ borderRadius: "34px !important" }}
                                data-label-off="No"
                                data-label-on="Yes"
                              />
                            </label>
                          </h5>
                        </div>
                      </div>
                      {this.state.show ? (
                        <form onChange={this.handleChangeProBodies}>
                          {this.state.professionalBody.map((body, index) => {
                            let name = `name-${index}`,
                              yearJoined = `yearJoined-${index}`,
                              comments = `comments-${index}`;
                            return (
                              <div
                                key={body.ind}
                                className="row text-left mt-3 mb-5"
                              >
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Name
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="name"
                                      data-id={index}
                                      id={name}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Year Joined
                                    </label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="yearJoined"
                                      data-id={index}
                                      id={yearJoined}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Comments
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="comments"
                                      data-id={index}
                                      id={comments}
                                    />
                                  </div>
                                </div>
                                {index !== 0 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.deletePro(body)}
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          <div className="col-md-12">
                            <button
                              className="btn btn-icon btn-3 btn-primary btn-sm"
                              type="button"
                              onClick={this.addNewRowPro}
                            >
                              <span className="btn-inner--icon">
                                <i className="fa fa-plus" />
                              </span>
                              <span className="btn-inner--text">
                                Add professional body
                              </span>
                            </button>
                          </div>
                        </form>
                      ) : null}
                    </fieldset>

                    {/* : null} */}

                    {/* Journal Section Starts */}

                    {/* {this.state.journalSection ?  */}

                    <fieldset className="form-widget">
                      <div className="text-center">
                        <h2 className="fs-title font-weight-700">
                          Journals &amp; Publications
                        </h2>
                        <h3 className="fs-subtitle mb-5">
                          Journals, research or other published work
                        </h3>
                      </div>
                      <div className="border-bottom">
                        <div className="form-group text-left">
                          <h5>
                            I have journals or other published work &nbsp;
                          </h5>
                          <h5>
                            <label
                            // className="custom-toggle"
                            // onClick={this.handleShow}
                            >
                              <input
                                type="checkbox"
                                value={this.state.show2}
                                // onChange={this.handleShow}
                              />
                            </label>
                          </h5>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={this.handleShow}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                      {this.state.show2 ? (
                        <form onChange={this.handleChangeJournal}>
                          {this.state.journals.map((journal, index) => {
                            let title = `title-${index}`,
                              yearOfPublication = `yearOfPublication-${index}`,
                              nameOfPublisher = `nameOfPublisher-${index}`;
                            return (
                              <div
                                key={journal.ind}
                                className="row text-left mt-3 mb-5"
                                id="publications"
                              >
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Title
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="title"
                                      data-id={index}
                                      id={title}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Year of Publication
                                    </label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="yearOfPublication"
                                      data-id={index}
                                      id={yearOfPublication}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Name of Publisher
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="nameOfPublisher"
                                      data-id={index}
                                      id={nameOfPublisher}
                                    />
                                  </div>
                                </div>
                                {index !== 0 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteJournal(journal)}
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          <div className="col-md-6">
                            <button
                              className="btn btn-icon btn-3 btn-primary btn-sm"
                              type="button"
                              onClick={this.addNewRowJournal}
                            >
                              <span className="btn-inner--icon">
                                <i className="fa fa-plus" />
                              </span>
                              <span className="btn-inner--text">
                                Add publication
                              </span>
                            </button>
                          </div>
                        </form>
                      ) : null}
                    </fieldset>
                    {/* : null} */}

                    {/* Work */}

                    {/* {this.state.workSection ?  */}

                    <fieldset className="form-widget">
                      <div className="text-center">
                        <h2 className="fs-title font-weight-700">
                          Work Experience
                        </h2>
                        <h3 className="fs-subtitle mb-5">
                          Previous Work Experience
                        </h3>
                      </div>
                      <div className="border-bottom">
                        <div className="form-group text-left">
                          <h5>I have previous work experience &nbsp;</h5>
                          <h5>
                            <label
                              className="custom-toggle"
                              onClick="showThisForm('work')"
                            >
                              <input
                                type="checkbox"
                                //   value={this.state.show}
                                //   onChange={() => this.setState({ show: !this.state.show })}
                              />
                              <span
                                className="custom-toggle-slider rounded-circle"
                                style={{ borderRadius: "34px !important" }}
                                data-label-off="No"
                                data-label-on="Yes"
                              />
                            </label>
                          </h5>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={this.handleShowWork}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                      {this.state.showWork ? (
                        <form onChange={this.handleChangeWork}>
                          {this.state.workExperience.map((work, index) => {
                            let organisation = `organisation-${index}`,
                              positionHeld = `positionHeld-${index}`,
                              startYear = `startYear-${index}`,
                              endYear = `endYear-${index}`;
                            return (
                              <div
                                key={work.ind}
                                className="row text-left mt-3 mb-5"
                                id="work"
                              >
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Organisation
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="organisation"
                                      data-id={index}
                                      id={organisation}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Position Held
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="positionHeld"
                                      data-id={index}
                                      id={positionHeld}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Start Year
                                    </label>
                                    <input
                                      className="form-control"
                                      type="date"
                                      name="startYear"
                                      data-id={index}
                                      id={startYear}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      End Year
                                    </label>
                                    <input
                                      className="form-control"
                                      type="date"
                                      name="endYear"
                                      data-id={index}
                                      id={endYear}
                                    />
                                  </div>
                                </div>
                                {index !== 0 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteWork(work)}
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          <div className="col-md-6">
                            <button
                              className="btn btn-icon btn-3 btn-primary btn-sm"
                              type="button"
                              onClick={this.addNewRowWork}
                            >
                              <span className="btn-inner--icon">
                                <i className="fa fa-plus" />
                              </span>
                              <span className="btn-inner--text">
                                Add Work Experience
                              </span>
                            </button>
                          </div>
                        </form>
                      ) : null}
                    </fieldset>

                    {/* : null} */}

                    {/* Research */}

                    {/* {this.state.researchSection ?  */}

                    <fieldset className="form-widget">
                      <div className="text-center">
                        <h2 className="fs-title font-weight-700">
                          Research Grants
                        </h2>
                        <h3 className="fs-subtitle mb-5">
                          Research Grants Obtained
                        </h3>
                      </div>
                      <div className="border-bottom">
                        <div className="form-group text-left">
                          <h5>I have obtained research grants &nbsp;</h5>
                          <h5>
                            <label
                              className="custom-toggle"
                              onClick="showThisForm('grants')"
                            >
                              <input
                                type="checkbox"
                                value={this.state.show}
                                //   onChange={() => this.setState({ show: !this.state.show })}
                              />
                              <span
                                className="custom-toggle-slider rounded-circle"
                                style={{ borderRadius: "34px !important" }}
                                data-label-off="No"
                                data-label-on="Yes"
                              />
                            </label>
                          </h5>
                          <button
                            onClick={this.handleShowResearch}
                            className="btn btn-primary btn-sm"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                      {this.state.showResearch ? (
                        <form onChange={this.handleChangeResearch}>
                          {this.state.researchGrants.map((research, index) => {
                            let nameOfBody = `nameOfBody-${index}`,
                              yearObtained = `yearObtained-${index}`,
                              researchTopic = `researchTopic-${index}`,
                              researchType = `researchType-${index}`;
                            return (
                              <div
                                key={research.ind}
                                className="row text-left mt-3 mb-5"
                                id="grants"
                              >
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Name of Body
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="nameOfBody"
                                      data-id={index}
                                      id={nameOfBody}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Year Obtained
                                    </label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="yearObtained"
                                      data-id={index}
                                      id={yearObtained}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Research Topic
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="researchTopic"
                                      data-id={index}
                                      id={researchTopic}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="text-input"
                                      className="form-control-label"
                                    >
                                      Research Type
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="researchType"
                                      data-id={index}
                                      id={researchType}
                                    />
                                  </div>
                                </div>
                                {index !== 0 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      this.deleteResearch(research)
                                    }
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          <div className="col-md-6">
                            <button
                              className="btn btn-icon btn-3 btn-primary btn-sm"
                              type="button"
                              onClick={this.addNewRowResearch}
                            >
                              <span className="btn-inner--icon">
                                <i className="fa fa-plus" />
                              </span>
                              <span className="btn-inner--text">
                                Add Reseach grants
                              </span>
                            </button>
                          </div>
                        </form>
                      ) : null}
                    </fieldset>

                    {/* : null} */}

                    {/* Certifications        */}

                    {/* {this.state.certificationSection ?   */}

                    <fieldset className="form-widget">
                      <div className="text-center">
                        <h2 className="fs-title font-weight-700">
                          Professional Qualifications
                        </h2>
                        <h3 className="fs-subtitle mb-5">
                          Professional Qualifications Obtained
                        </h3>
                      </div>
                      <div className="border-bottom">
                        <div className="form-group text-left">
                          <h5>
                            I have obtained professional qualifications &nbsp;
                          </h5>
                          <h5>
                            <label
                              className="custom-toggle"
                              onClick="showThisForm('profqual')"
                            >
                              <input
                                type="checkbox"
                                value={this.state.show}
                                //   onChange={() => this.setState({ show: !this.state.show })}
                              />
                              <span
                                className="custom-toggle-slider rounded-circle"
                                style={{ borderRadius: "34px !important" }}
                                data-label-off="No"
                                data-label-on="Yes"
                              />
                            </label>
                          </h5>
                          <button
                            onClick={this.handleShowCert}
                            className="btn btn-primary btn-sm"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                      {this.state.showCert ? (
                        <form onChange={this.handleChangeCert}>
                          {this.state.certifications.map(
                            (certification, index) => {
                              let nameOfQualification = `nameOfQualification-${index}`,
                                nameOfBody = `nameOfBody-${index}`,
                                yearObtained = `yearObtained-${index}`;
                              return (
                                <div
                                  key={certification.ind}
                                  className="row text-left mt-3 mb-5"
                                  id="profqual"
                                >
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label
                                        htmlFor="text-input"
                                        className="form-control-label"
                                      >
                                        Name of Qualification
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="nameOfQualification"
                                        data-id={index}
                                        id={nameOfQualification}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label
                                        htmlFor="text-input"
                                        className="form-control-label"
                                      >
                                        Name of Body
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="nameOfBody"
                                        data-id={index}
                                        id={nameOfBody}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label
                                        htmlFor="text-input"
                                        className="form-control-label"
                                      >
                                        Year Obtained
                                      </label>
                                      <input
                                        className="form-control"
                                        type="number"
                                        name="yearObtained"
                                        data-id={index}
                                        id={yearObtained}
                                      />
                                    </div>
                                  </div>
                                  <br />
                                  {index !== 0 && (
                                    <button
                                      className="btn btn-danger"
                                      onClick={() =>
                                        this.deleteCert(certification)
                                      }
                                    >
                                      <i
                                        className="fa fa-minus"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  )}
                                </div>
                              );
                            }
                          )}
                          <div className="col-md-6">
                            <button
                              className="btn btn-icon btn-3 btn-primary btn-sm"
                              type="button"
                              onClick={this.addNewRowCert}
                            >
                              <span className="btn-inner--icon">
                                <i className="fa fa-plus" />
                              </span>
                              <span className="btn-inner--text">
                                Add professional qualification
                              </span>
                            </button>
                          </div>
                        </form>
                      ) : null}
                    </fieldset>

                    {/* : null} */}

                    {/* {this.state.refereeSection ? */}
                    <fieldset className="form-widget">
                      <div className="text-center">
                        <h2 className="fs-title font-weight-700">Referees </h2>
                      </div>
                      {
                        <div className="text-left mt-3" id="referees">
                          <div
                            className="bg-primary text-center"
                            style={{ borderRadius: "25px", width: "30px" }}
                          >
                            <p className="text-white">1</p>
                          </div>
                          <div className="row text-left mt-0 mb-5 ml-3 border-bottom">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Name of Referee
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="nameOfReferee1"
                                  onChange={this.handleChangeRef}
                                  value={this.state.nameOfReferee1}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Organisation
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="organisation1"
                                  onChange={this.handleChangeRef}
                                  value={this.state.organisation1}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Designation
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="designation1"
                                  onChange={this.handleChangeRef}
                                  value={this.state.designation1}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Email
                                </label>
                                <input
                                  className="form-control"
                                  type="email"
                                  name="email1"
                                  onChange={this.handleChangeRef}
                                  value={this.state.email1}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="bg-primary text-center"
                            style={{ borderRadius: "25px", width: "30px" }}
                          >
                            <p className="text-white">2</p>
                          </div>
                          <div className="row text-left mt-0 mb-5 ml-3 border-bottom">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Name of Referee
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="nameOfReferee2"
                                  onChange={this.handleChangeRef}
                                  value={this.state.nameOfReferee2}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Organisation
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="organisation2"
                                  onChange={this.handleChangeRef}
                                  value={this.state.organisation2}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Designation
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="designation2"
                                  onChange={this.handleChangeRef}
                                  value={this.state.designation2}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Email
                                </label>
                                <input
                                  className="form-control"
                                  type="email"
                                  name="email2"
                                  onChange={this.handleChangeRef}
                                  value={this.state.email2}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="bg-primary text-center"
                            style={{ borderRadius: "25px", width: "30px" }}
                          >
                            <p className="text-white">3</p>
                          </div>
                          <div className="row text-left mt-0 mb-5 ml-3 border-bottom">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Name of Referee
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="nameOfReferee3"
                                  onChange={this.handleChangeRef}
                                  value={this.state.nameOfReferee3}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Organisation
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="organisation3"
                                  onChange={this.handleChangeRef}
                                  value={this.state.organisation3}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Designation
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="designation3"
                                  onChange={this.handleChangeRef}
                                  value={this.state.designation3}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="text-input"
                                  className="form-control-label"
                                >
                                  Email
                                </label>
                                <input
                                  className="form-control"
                                  type="email"
                                  name="email3"
                                  onChange={this.handleChangeRef}
                                  value={this.state.email3}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      <hr />
                      <button
                        className="btn btn-success"
                        onClick={(e) => {
                          this.submitApplication(e);
                        }}
                      >
                        {/* Preview and Submit */}
                        Submit Application
                      </button>
                    </fieldset>

                    {/* : null} */}
                    <div className="container justify-content align-items-center mt-4">
                   

                    <button className="btn btn-warning" onClick={this.handlePrevious} id="prev">
                    <i className="fa fa-arrow-left"/> Previous
                    </button>

                    <button className="btn btn-primary" onClick={this.handleNextTest} id="me">
                      Next <i className="fa fa-arrow-right"/>
                    </button>
                    </div>

           

                    {/* <hr/>
                  <div className="container">
                  <button className="btn btn-secondary" onClick={this.toggleBio}>Biodata</button>
                  <button className="btn btn-secondary" onClick={this.toggleEducation}>Education</button>
                  <button className="btn btn-secondary" onClick={this.toggleProfessionalBodies}>Professional Bodies</button>
                  <button className="btn btn-secondary" onClick={this.toggleJournals}>Journal</button>
                  <button className="btn btn-secondary" onClick={this.toggleWork}>Work</button>
                  <button className="btn btn-secondary" onClick={this.toggleResearch}>Research</button>
                  <button className="btn btn-secondary" onClick={this.toggleCertification}>Certifications</button>
                  <button className="btn btn-secondary" onClick={this.toggleReferee}>Referee</button>
               
                </div>
<hr/> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Qualification Section  Starts*/}

            {/*Educational Qualification Section  Stops*/}
          </div>
        </div>
      </>
    );
  }
}
