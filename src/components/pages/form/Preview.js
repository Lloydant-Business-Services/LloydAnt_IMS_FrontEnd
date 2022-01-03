import React, { Component } from "react"
import logo from "../../../images/ziklogosm.png"
import AlertBox from "../admin/alertBox"
// import { navigate } from "gatsby"

export default class Preview extends Component {
  state = {}

  navigateToHome = () => {
    // navigate("/home")
  }

  render() {
    return (
      <div>
        {this.props.alertSuc ? (
          <AlertBox
            message={"Your Application was Successful!"}
            ok={this.navigateToHome}
          />
        ) : null}
        {this.props.redirect && (
          <div className="jumbo-back">
            <div className="container marg-top">
              <div className="row justify-content-end p-3 pr-4">
                <button
                  onClick={this.props.hidePreview}
                  className="btn btn-danger m-close"
                >
                  Return To Form
                </button>
              </div>
              <div className="container mt5-pct mb-5">
                <div className="card shadow">
                  <div className="card-body primary-bg">
                    <div className="row">
                      <div className="offset-md-2 col-md-8">
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "50px",
                          }}
                        >
                          <img
                            src={logo}
                            alt="school logo"
                            style={{
                              width: "50px",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          />
                        </div>
                        <form className="mt-5" onSubmit={this.handleSubmit}>
                          <b>BIODATA</b>
                          <hr />

                          <div className="form-group row">
                            <label className="col-sm-3">
                              Full Name: <br />
                              <p>
                                {this.props.allStates["1"].firstName +
                                  " " +
                                  this.props.allStates["1"].otherName +
                                  " " +
                                  this.props.allStates["1"].lastName}
                              </p>
                            </label>

                            <label className="col-sm-3">
                              Date of Birth :
                              <br />
                              <p> {this.props.allStates["1"].dateOfBirth}</p>
                            </label>

                            <label className="col-sm-3">
                              Gender:
                              <br />
                              <p>
                                {this.props.allStates["1"].genderValue
                                  .length !== 0 &&
                                  this.props.allStates["1"].genderValue[0].name}
                              </p>
                            </label>

                            <div
                              className="col-sm-3"
                              style={{ backgroundColor: "grey" }}
                            >
                              <img
                                src={this.props.allStates["1"].file}
                                style={{ width: 150, height: 150 }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3">
                              Address:
                              <br />
                              <p> {this.props.allStates["1"].address}</p>
                            </label>

                            <label className="col-sm-3">
                              Phone Number:
                              <br />
                              <p> {this.props.allStates["1"].phone}</p>
                            </label>

                            <label className="col-sm-3">
                              Email Address:
                              <br />
                              <p> {this.props.allStates["1"].email}</p>
                            </label>
                            <label className="col-sm-3">
                              Marital Status:
                              <br />
                              <p>
                                {this.props.allStates["1"].maritalStatusValue
                                  .length !== 0 &&
                                  this.props.allStates["1"]
                                    .maritalStatusValue[0].name}
                              </p>
                            </label>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3">
                              Religion:
                              <br />
                              <p>
                                {this.props.allStates["1"].religionValue
                                  .length !== 0 &&
                                  this.props.allStates["1"].religionValue[0]
                                    .name}
                              </p>
                            </label>

                            <label className="col-sm-3">
                              State of Origin:
                              <br />
                              <p>
                                {this.props.allStates["1"].stateValue.length !==
                                  0 &&
                                  this.props.allStates["1"].stateValue[0].name}
                              </p>
                            </label>

                            <label className="col-sm-3">
                              LGA:
                              <br />
                              <p>
                                {this.props.allStates["1"].lgaValue.length !==
                                  0 &&
                                  this.props.allStates["1"].lgaValue[0].name}
                              </p>
                            </label>
                          </div>

                          <hr />
                          <b>EDUCATION & QUALIFICATIONS</b>
                          <hr />
                          {this.props.modifiedEducationalQualificationArray.map(
                            education => {
                              return (
                                <div className="form-group row">
                                  <label className="col-sm-3">
                                    Institution Attended:
                                    <br />
                                    <p> {education.institutionAttended}</p>
                                  </label>

                                  <label className="col-sm-3">
                                    Course:
                                    <br />
                                    <p> {education.course}</p>
                                  </label>

                                  <label className="col-sm-3">
                                    Graduation Year:
                                    <br />
                                    <p> {education.graduationYear}</p>
                                  </label>

                                  <label className="col-sm-3">
                                    Qualification Obtained:
                                    <br />
                                    <p> {education.qualification}</p>
                                  </label>
                                </div>
                              )
                            }
                          )}

                          <hr />
                          <b>PROFESSIONAL BODIES</b>
                          <hr />
                          {typeof this.props.allStates["3"] === "undefined"
                            ? ""
                            : this.props.allStates["3"]
                            ? this.props.allStates["3"].professionalBody.map(
                                body => {
                                  return (
                                    <div className="form-group row">
                                      <label className="col-sm-3">
                                        Name:
                                        <br />
                                        <p>{body.name}</p>
                                      </label>

                                      <label className="col-sm-3">
                                        Year Joined:
                                        <br />
                                        <p>{body.yearJoined}</p>
                                      </label>

                                      <label className="col-sm-3">
                                        Comments:
                                        <br />
                                        <p>{body.comments}</p>
                                      </label>
                                    </div>
                                  )
                                }
                              )
                            : ""}

                          <hr />
                          <b>JOURNALS & PUBLICATIONS</b>
                          <hr />
                          {typeof this.props.allStates["4"] === "undefined"
                            ? ""
                            : this.props.allStates["4"]
                            ? this.props.allStates["4"].journals.map(
                                journal => {
                                  return (
                                    <div className="form-group row">
                                      <label className="col-sm-3">
                                        Title:
                                        <br />
                                        <p>{journal.title}</p>
                                      </label>
                                      <label className="col-sm-3">
                                        Year of Publication:
                                        <br />
                                        <p>{journal.yearOfPublication}</p>
                                      </label>
                                      <label className="col-sm-3">
                                        Name of Publisher:
                                        <br />
                                        <p>{journal.nameOfPublisher}</p>
                                      </label>
                                    </div>
                                  )
                                }
                              )
                            : ""}

                          <hr />
                          <b>WORK EXPERIENCE</b>
                          <hr />
                          {typeof this.props.allStates["5"] === "undefined"
                            ? ""
                            : this.props.allStates["5"]
                            ? this.props.allStates["5"].workExperience.map(
                                work => {
                                  return (
                                    <div className="form-group row">
                                      <label className="col-sm-3">
                                        Organisation:
                                        <br />
                                        <p>{work.organisation}</p>
                                      </label>
                                      <label className="col-sm-3">
                                        Position Held:
                                        <br />
                                        <p>{work.positionHeld}</p>
                                      </label>
                                      <label className="col-sm-3">
                                        Start Year:
                                        <br />
                                        <p>
                                          {work.startYear ==
                                          "0001-01-01T00:00:00.597Z"
                                            ? null
                                            : work.startYear}
                                        </p>
                                      </label>
                                      <label className="col-sm-3">
                                        End Year:
                                        <br />
                                        <p>
                                          {work.endYear ==
                                          "0001-01-01T00:00:00.597Z"
                                            ? null
                                            : work.endYear}
                                        </p>
                                      </label>
                                    </div>
                                  )
                                }
                              )
                            : ""}

                          <hr />
                          <b>RESEARCH GRANTS</b>
                          <hr />
                          {typeof this.props.allStates["6"] === "undefined"
                            ? ""
                            : this.props.allStates["6"]
                            ? this.props.allStates["6"].researchGrants.map(
                                research => {
                                  return (
                                    <div className="form-group row">
                                      <label className="col-sm-3">
                                        Name of Body:
                                        <br />
                                        <p>{research.nameOfBody}</p>
                                      </label>
                                      <label className="col-sm-3">
                                        Year Obtained:
                                        <br />
                                        <p>
                                          {research.yearObtained == 0
                                            ? null
                                            : research.yearObtained}
                                        </p>
                                      </label>
                                      <label className="col-sm-3">
                                        Research Topic:
                                        <br />
                                        <p>{research.researchTopic}</p>
                                      </label>
                                      <label className="col-sm-3">
                                        Research Type:
                                        <br />
                                        <p>{research.researchType}</p>
                                      </label>
                                    </div>
                                  )
                                }
                              )
                            : ""}

                          <hr />
                          <b>PROFESSIONAL QUALIFICATIONS</b>
                          <hr />
                          {typeof this.props.allStates["7"] === "undefined"
                            ? ""
                            : this.props.allStates["7"]
                            ? this.props.allStates["7"].certifications.map(
                                certification => {
                                  return (
                                    <div className="form-group row">
                                      <label className="col-sm-3">
                                        Name of Qualification:
                                        <br />
                                        <p>
                                          {certification.nameOfQualification}
                                        </p>
                                      </label>
                                      <label className="col-sm-3">
                                        Name of Body:
                                        <br />
                                        <p>{certification.nameOfBody}</p>
                                      </label>
                                      <label className="col-sm-3">
                                        Year Obtained:
                                        <br />
                                        <p>{certification.yearObtained}</p>
                                      </label>
                                    </div>
                                  )
                                }
                              )
                            : ""}

                          <hr />
                          <b>REFEREES</b>
                          <hr />

                          <div className="form-group row">
                            <label className="col-sm-3">
                              Name of Referee 1:
                              <br />
                              <p>{this.props.allStates["8"].nameOfReferee1}</p>
                            </label>
                            <label className="col-sm-3">
                              Organisation:
                              <br />
                              <p>{this.props.allStates["8"].organisation1}</p>
                            </label>{" "}
                            <label className="col-sm-3">
                              Designation:
                              <br />
                              <p>{this.props.allStates["8"].designation1}</p>
                            </label>
                            <label className="col-sm-3">
                              Email:
                              <br />
                              <p>{this.props.allStates["8"].email1}</p>
                            </label>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3">
                              Name of Referee 2:
                              <br />
                              <p>{this.props.allStates["8"].nameOfReferee2}</p>
                            </label>
                            <label className="col-sm-3">
                              Organisation:
                              <br />
                              <p>{this.props.allStates["8"].organisation2}</p>
                            </label>{" "}
                            <label className="col-sm-3">
                              Designation:
                              <br />
                              <p>{this.props.allStates["8"].designation2}</p>
                            </label>
                            <label className="col-sm-3">
                              Email:
                              <br />
                              <p>{this.props.allStates["8"].email2}</p>
                            </label>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3">
                              Name of Referee 3:
                              <br />
                              <p>{this.props.allStates["8"].nameOfReferee3}</p>
                            </label>
                            <label className="col-sm-3">
                              Organisation:
                              <br />
                              <p>{this.props.allStates["8"].organisation3}</p>
                            </label>{" "}
                            <label className="col-sm-3">
                              Designation:
                              <br />
                              <p>{this.props.allStates["8"].designation3}</p>
                            </label>
                            <label className="col-sm-3">
                              Email:
                              <br />
                              <p>{this.props.allStates["8"].email3}</p>
                            </label>
                          </div>
                          <button
                            onClick={this.props.sub}
                            type="submit"
                            className="btn btn-success float-right purp"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
