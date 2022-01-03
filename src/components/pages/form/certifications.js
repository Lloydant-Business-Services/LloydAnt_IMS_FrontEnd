import React from "react"

export default class Certification extends React.Component {
  state = {
    show: false,
    certifications: [
      {
        id: Math.random(),
        nameOfQualification: "",
        nameOfBody: "",
        yearObtained: 0,
      },
    ],
  }

  handleChange = e => {
    if (
      ["nameOfQualification", "nameOfBody", "yearObtained"].includes(
        e.target.name
      )
    ) {
      let certifications = [...this.state.certifications]
      certifications[e.target.dataset.id][e.target.name] = e.target.value
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  addNewRow = e => {
    this.setState(prevState => ({
      certifications: [
        ...prevState.certifications,
        {
          id: Math.random(),
          nameOfQualification: "",
          nameOfBody: "",
          yearObtained: "",
        },
      ],
    }))
  }
  handleShow = () => {
    if(!this.state.show){
      this.setState({
        show:true
      })
    }else{
      this.setState({
        show:false
      })
    }
  }
  delete = index => {
    this.setState({
      certifications: this.state.certifications.filter(r => r !== index),
    })
  }

  render() {
    return (


      <fieldset>
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
            <h5>I have obtained professional qualifications &nbsp;</h5>
            <h5>
              <label
                className="custom-toggle"
                onClick="showThisForm('profqual')"
              >
                <input
                  type="checkbox"
                  value={this.state.show}
                  onChange={() => this.setState({ show: !this.state.show })}
                />
                <span
                  className="custom-toggle-slider rounded-circle"
                  style={{ borderRadius: "34px !important" }}
                  data-label-off="No"
                  data-label-on="Yes"
                />
              </label>
            </h5>
            <button onClick={this.handleShow}>dffdfd</button>

          </div>
        </div>
        {this.state.show ? (
          <form onChange={this.handleChange}>
            {this.state.certifications.map((certification, index) => {
              let nameOfQualification = `nameOfQualification-${index}`,
                nameOfBody = `nameOfBody-${index}`,
                yearObtained = `yearObtained-${index}`
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
                  {index !== 0 && (
                    <button
                      className="btn btn-danger"
                      onClick={() => this.delete(certification)}
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
                <span className="btn-inner--text">
                  Add professional qualification
                </span>
              </button>
            </div>
          </form>
        ) : null}
      </fieldset>
    
    
    
    )
  }
}
