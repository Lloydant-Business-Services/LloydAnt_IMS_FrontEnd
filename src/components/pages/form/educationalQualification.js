import React from "react"
import { fetchData } from "../../../utils/crud"

export default class Education extends React.Component {
  state = {
    qualifications: '',
    educationalQualification: [
      {
        id: Math.random(),
        institutionAttended: "",
        course: "",
        graduationYear: 0,
        qualificationObtained: 0,
      },
    ],
  }

  async componentDidMount() {
    await fetchData("/EducationalQualifications", data => {
      this.setState({ qualifications: data })
    })
  }

  handleChange = e => {
    if (
      [
        "institutionAttended",
        "course",
        "graduationYear",
        "qualificationObtained",
      ].includes(e.target.name)
    ) {
      let educationalQualification = [...this.state.educationalQualification]
      educationalQualification[e.target.dataset.id][e.target.name] =
        e.target.value
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }

  addNewRow = e => {
    this.setState(prevState => ({
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
    }))
  }

  delete = index => {
    this.setState({
      educationalQualification: this.state.educationalQualification.filter(
        r => r !== index
      ),
    })
  }

  render() {
    return (

      
      <fieldset>
        <form onChange={this.handleChange}>
          <div className="text-center">
            <h2 className="fs-title font-weight-700">
              Education &amp; Qualifications
            </h2>
            <h3 className="fs-subtitle mb-5">
              Educational Institutions attended and qualifications obtained <span style={{color:"red"}}>(This Section is Compulsory)</span>
            </h3>
          </div>
          {this.state.educationalQualification.map((education, index) => {
            let institutionAttended = `institutionAttended-${index}`,
              graduationYear = `graduationYear-${index}`,
              qualificationObtained = `qualificationObtained-${index}`,
              course = `course-${index}`
            return (
              <div key={index} className="row text-left mb-5">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="text-input" className="form-control-label">
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
                    <label htmlFor="text-input" className="form-control-label">
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
                    <label htmlFor="text-input" className="form-control-label">
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
                    <label htmlFor="text-input" className="form-control-label">
                      Qualification Obtained
                    </label>
                    <select
                      name="qualificationObtained"
                      id={qualificationObtained}
                      data-id={index}
                      className="form-control"
                    >
                      <option value={0}>Select Qualification</option>
                      {this.state.qualifications &&
                        this.state.qualifications.map(qualification => (
                          <option
                            key={qualification.id}
                            value={qualification.id}
                          >
                            {qualification.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {index !== 0 && (
                  <button
                    className="btn btn-danger"
                    onClick={() => this.delete(education)}
                  >
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </button>
                )}
              </div>
            )
          })}
          <div className="col-md-6">
            <button
              className="btn btn-icon btn-3 btn-primary btn-sm"
              type="button"
              onClick={this.addNewRow}
            >
              <span className="btn-inner--icon">
                <i className="fa fa-plus" />
              </span>
              <span className="btn-inner--text">Add qualification</span>
            </button>
          </div>
        </form>
      </fieldset>
   
   
   
   
   )
  }
}
