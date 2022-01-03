import React from "react"

export default class Referee extends React.Component {
  state = {
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
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (

      <fieldset>
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
                  <label htmlFor="text-input" className="form-control-label">
                    Name of Referee
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="nameOfReferee1"
                    onChange={this.handleChange}
                    value={this.state.nameOfReferee1}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="text-input" className="form-control-label">
                    Organisation
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="organisation1"
                    onChange={this.handleChange}
                    value={this.state.organisation1}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="text-input" className="form-control-label">
                    Designation
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="designation1"
                    onChange={this.handleChange}
                    value={this.state.designation1}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="text-input" className="form-control-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email1"
                    onChange={this.handleChange}
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
                  <label htmlFor="text-input" className="form-control-label">
                    Name of Referee
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="nameOfReferee2"
                    onChange={this.handleChange}
                    value={this.state.nameOfReferee2}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="text-input" className="form-control-label">
                    Organisation
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="organisation2"
                    onChange={this.handleChange}
                    value={this.state.organisation2}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="text-input" className="form-control-label">
                    Designation
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="designation2"
                    onChange={this.handleChange}
                    value={this.state.designation2}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="text-input" className="form-control-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email2"
                    onChange={this.handleChange}
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
                  <label htmlFor="text-input" className="form-control-label">
                    Name of Referee
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="nameOfReferee3"
                    onChange={this.handleChange}
                    value={this.state.nameOfReferee3}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="text-input" className="form-control-label">
                    Organisation
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="organisation3"
                    onChange={this.handleChange}
                    value={this.state.organisation3}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="text-input" className="form-control-label">
                    Designation
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="designation3"
                    onChange={this.handleChange}
                    value={this.state.designation3}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="text-input" className="form-control-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email3"
                    onChange={this.handleChange}
                    value={this.state.email3}
                  />
                </div>
              </div>
            </div>
          </div>
        }
      </fieldset>
    
    )
  }
}
