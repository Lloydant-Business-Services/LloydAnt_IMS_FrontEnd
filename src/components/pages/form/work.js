import React from "react"

export default class WorkExperience extends React.Component {
  state = {
    show: false,
    workExperience: [
      {
        id: Math.random(),
        organisation: "",
        positionHeld: "",
        startYear: "0001-01-01T00:00:00.597Z",
        endYear: "0001-01-01T00:00:00.597Z",
      },
    ],
  }

  handleChange = e => {
    if (
      ["organisation", "positionHeld", "startYear", "endYear"].includes(
        e.target.name
      )
    ) {
      let workExperience = [...this.state.workExperience]
      workExperience[e.target.dataset.id][e.target.name] = e.target.value
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  addNewRow = e => {
    this.setState(prevState => ({
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
      workExperience: this.state.workExperience.filter(r => r !== index),
    })
  }

  render() {
    return (


      <fieldset>
        <div className="text-center">
          <h2 className="fs-title font-weight-700">Work Experience</h2>
          <h3 className="fs-subtitle mb-5">Previous Work Experience</h3>
        </div>
        <div className="border-bottom">
          <div className="form-group text-left">
            <h5>I have previous work experience &nbsp;</h5>
            <h5>
              <label className="custom-toggle" 
              onClick="showThisForm('work')"
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
            {this.state.workExperience.map((work, index) => {
              let organisation = `organisation-${index}`,
                positionHeld = `positionHeld-${index}`,
                startYear = `startYear-${index}`,
                endYear = `endYear-${index}`
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
                      onClick={() => this.delete(work)}
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
                <span className="btn-inner--text">Add Work Experience</span>
              </button>
            </div>
          </form>
        ) : null}
      </fieldset>
    
    
    
    
    )
  }
}
