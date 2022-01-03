import React from "react"

export default class Research extends React.Component {
  state = {
    show: false,
    researchGrants: [
      {
        id: Math.random(),
        nameOfBody: "",
        yearObtained: 0,
        researchTopic: "",
        researchType: "",
      },
    ],
  }

  handleChange = e => {
    if (
      ["nameOfBody", "yearObtained", "researchTopic", "researchType"].includes(
        e.target.name
      )
    ) {
      let researchGrants = [...this.state.researchGrants]
      researchGrants[e.target.dataset.id][e.target.name] = e.target.value
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
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
  addNewRow = e => {
    this.setState(prevState => ({
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
    }))
  }

  delete = index => {
    this.setState({
      researchGrants: this.state.researchGrants.filter(r => r !== index),
    })
  }

  render() {
    return (


      <fieldset>
        <div className="text-center">
          <h2 className="fs-title font-weight-700">Research Grants</h2>
          <h3 className="fs-subtitle mb-5">Research Grants Obtained</h3>
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
            {this.state.researchGrants.map((research, index) => {
              let nameOfBody = `nameOfBody-${index}`,
                yearObtained = `yearObtained-${index}`,
                researchTopic = `researchTopic-${index}`,
                researchType = `researchType-${index}`
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
                      onClick={() => this.delete(research)}
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
                <span className="btn-inner--text">Add Reseach grants</span>
              </button>
            </div>
          </form>
        ) : null}
      </fieldset>
    
    
    )
  }
}
