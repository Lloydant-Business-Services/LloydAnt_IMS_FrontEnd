import React from "react"
import { Container, Row, Col } from "reactstrap"
import Step1 from "../components/pages/form/index"
import Step2 from "../components/pages/form/educationalQualification"
import Step3 from "../components/pages/form/professionalBody"
import Step4 from "../components/pages/form/journals"
import Step5 from "../components/pages/form/work"
import Step6 from "../components/pages/form/research"
import Step7 from "../components/pages/form/certifications"
import Step8 from "../components/pages/form/referee"
import { postData } from "../utils/crud"
import logosm from "../images/ziklogosml.png"
import favicon from "../images/brand/favicon.png"
import { Link } from "react-router-dom"
import Preview from "../components/pages/form/Preview"
import Home from "./home";
import Loadable from "react-loadable";

const ReactWizard = Loadable({
  loader: () => import("react-bootstrap-wizard"),
  loading: Home
});

export default class FormPage extends React.Component {
  state = {
    id: this.props.location.state?.id || "",
    redirect: false,
    alertSuccess: false,
    allStates: [],
    modifiedEducationalQualificationArray: [],
    proBody: [
      {
        name: null,
        comments: null,
        year: null,
      },
    ],
  }

  finishButtonClick = allStates => {
    this.setState({ allStates, redirect: true })
    console.log(allStates)
    console.log(this.state.id, "ID Check")
    document.getElementsByClassName("wizard-container")[0].style.display =
      "none"
  }

  hidePreview = () => {
    this.setState({ redirect: false })
  }
  previewPassport = () => {
    // Assuming only image
    var file = this.refs.file.files[0]
    var reader = new FileReader()
    var url = reader.readAsDataURL(file)
    console.log(url) // Would see a path?
    // TODO: concat files for setState
  }

  handleSubmit = e => {
    e.preventDefault()

    const applicant = {
      person: {
        imageUrl: this.state.allStates["1"].imagePath,
        surname: this.state.allStates["1"].lastName,
        firstname: this.state.allStates["1"].firstName,
        othername: this.state.allStates["1"].otherName,
        birthDay: this.state.allStates["1"].dateOfBirth,
        email: this.state.allStates["1"].email,
        address: this.state.allStates["1"].address,
        phoneNumber: this.state.allStates["1"].phone,
        stateId: parseInt(this.state.allStates["1"].stateOfOrigin),
        lgaId: parseInt(this.state.allStates["1"].lga),
        maritalStatusId: parseInt(this.state.allStates["1"].maritalStatus),
        religionId: parseInt(this.state.allStates["1"].religion),
        genderId: parseInt(this.state.allStates["1"].gender),
      },
      personEducations: this.state.allStates["2"].educationalQualification.map(
        education => {
          return {
            institution: education.institutionAttended,
            course: education.course,
            year: parseInt(education.graduationYear),
            educationalQualificationId: parseInt(
              education.qualificationObtained
            ),
          }
        }
      ),
      personProfessionalBodies:
        this.state.allStates["3"].professionalBody.map(body => {
          return {
            name: body.name,
            comments: body.comments,
            year: parseInt(body.yearJoined),
          }
        }) || this.state.proBody,
      personJournals: this.state.allStates["4"].journals.map(journal => {
        return {
          name: journal.title,
          publisher: journal.nameOfPublisher,
          year: parseInt(journal.yearOfPublication),
        }
      }),
      personExperiences:
        this.state.allStates["5"].workExperience.map(work => {
          return {
            organisation: work.organisation,
            role: work.positionHeld,
            startDate: work.startYear,
            endDate: work.endYear,
          }
        }) || [],
      personResearchGrants: this.state.allStates["6"].researchGrants.map(
        research => {
          return {
            name: research.nameOfBody,
            topic: research.researchTopic,
            year: parseInt(research.yearObtained),
          }
        } 
      ),
      personCertifications: this.state.allStates["7"].certifications.map(
        certification => {
          return {
            name: certification.nameOfQualification,
            issuer: certification.nameOfBody,
            year: parseInt(certification.yearObtained),
          }
        }
      ),
      personReferees: [
        {
          name: this.state.allStates["8"].nameOfReferee1 || null,
          organisation: this.state.allStates["8"].organisation1 || null,
          designation: this.state.allStates["8"].organisation1 || null,
          email: this.state.allStates["8"].email1 || null,
        },
        {
          name: this.state.allStates["8"].nameOfReferee2 || null,
          organisation: this.state.allStates["8"].organisation2 || null,
          designation: this.state.allStates["8"].organisation2 || null,
          email: this.state.allStates["8"].email2 || null,
        },
        {
          name: this.state.allStates["8"].nameOfReferee3 || null,
          organisation: this.state.allStates["8"].organisation3 || null,
          designation: this.state.allStates["8"].organisation3 || null,
          email: this.state.allStates["8"].email3 || null,
        },
      ],
      jobVacancyId: parseInt(this.state.id),
    }

    console.log(applicant)

    postData("/ApplicationForms", applicant, data => {
      console.log(data)

      if (data.personId) {
        // alert("Application successful, Please Check your mail. redirecting...")
        // navigate("/home")
        this.setState({
          alertSuccess: true,
          redirect: false,
        })
      } else {
        alert("application was not successful")
      }
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.allStates !== this.state.allStates) {
      if (typeof this.state.allStates[2] !== "undefined") {
        let qualificationIdArray = [],
          qualificationNameArray = [],
          qualificationsArray = this.state.allStates[2].qualifications

        if (this.state.allStates[2].educationalQualification) {
          this.state.allStates[2].educationalQualification.map(qualification =>
            qualificationIdArray.push(
              parseInt(qualification.qualificationObtained)
            )
          )
        }

        for (let i = 0; i < qualificationIdArray.length; i++) {
          for (let j = 0; j < qualificationsArray.length; j++) {
            if (qualificationIdArray[i] === qualificationsArray[j].id) {
              qualificationNameArray.push(qualificationsArray[j].name)
            } else if (isNaN(qualificationIdArray[i])) {
              qualificationNameArray.push(" ")
              break
            }
          }

          let modifiedEducationalQualificationArray = this.state.allStates[2]
            .educationalQualification
          for (
            let i = 0;
            i < modifiedEducationalQualificationArray.length;
            i++
          ) {
            for (let j = 0; j < qualificationNameArray.length; j++) {
              if (i == j) {
                modifiedEducationalQualificationArray[i].qualification =
                  qualificationNameArray[j]
              }
            }
          }
          this.setState({ modifiedEducationalQualificationArray })
        }
      }
    }
  }
  componentDidMount() {
    //console.log(this.state.id, "MiracleID")
  }

  render() {
    //console.log(this.state.allStates, "state")
    //console.log(this.state.id, "id")
    const steps = [
      // this step hasn't got a isValidated() function, so it will be considered to be true
      {
        stepName: "1",
        stepIcon: "now-ui-icons business_badge",
        component: Step1,
        stepProps: {
          prop1: this.state.data,
        },
      },
      // this step will be validated to false
      {
        stepName: "2",
        stepIcon: "now-ui-icons education_paper",
        component: Step2,
        stepProps: {
          prop2: this.state.data,
        },
      },
      // this step will never be reachable because of the seconds isValidated() steps function that will always return false
      {
        stepName: "3",
        stepIcon: "now-ui-icons emoticons_satisfied",
        component: Step3,
        stepProps: {
          prop3: this.state.data,
        },
      },
      {
        stepName: "4",
        stepIcon: "now-ui-icons emoticons_satisfied",
        component: Step4,
        stepProps: {
          prop4: this.state.data,
        },
      },
      // this step hasn't got a isValidated() function, so it will be considered to be true
      {
        stepName: "5",
        stepIcon: "now-ui-icons business_badge",
        component: Step5,
        stepProps: {
          prop5: this.state.data,
        },
      },
      // this step will be validated to false
      {
        stepName: "6",
        stepIcon: "now-ui-icons education_paper",
        component: Step6,
        stepProps: {
          prop6: this.state.data,
        },
      },
      // this step will never be reachable because of the seconds isValidated() steps function that will always return false
      {
        stepName: "7",
        stepIcon: "now-ui-icons emoticons_satisfied",
        component: Step7,
        stepProps: {
          prop7: this.state.data,
        },
      },
      {
        stepName: "8",
        stepIcon: "now-ui-icons emoticons_satisfied",
        component: Step8,
        stepProps: {
          prop8: this.state.data,
        },
      },
    ]

    return (
      <div>
        <header>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {/* Favicon */}
          <link rel="icon" href={favicon} type="image/png" />
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

        {/* <FormIndex id={this.state.id} /> */}
        <Container fluid className="bg-light pt-5">
          <Row>
            <Col xs={12} md={7} className="mr-auto ml-auto">
              <ReactWizard
                steps={steps}
                navSteps
                title="Job Application Form"
                description=""
                headerTextCenter
                validate
                color="orange"
                background="white"
                finishButtonClick={this.finishButtonClick}
              />
            </Col>
          </Row>
        </Container>

        <Preview
          sub={this.handleSubmit}
          hidePreview={this.hidePreview}
          allStates={this.state.allStates}
          redirect={this.state.redirect}
          modifiedEducationalQualificationArray={
            this.state.modifiedEducationalQualificationArray
          }
          alertSuc={this.state.alertSuccess}
        />
      </div>
    )
  }
}
