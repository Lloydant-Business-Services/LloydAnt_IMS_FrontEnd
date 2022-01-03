import React from "react"

export default class ProfessionalBody extends React.Component {
  state = {
    show: false,
    professionalBody: [
      { id: Math.random(), name: "", yearJoined: 0, comments: "" },
    ],
  }

  handleChange = e => {
    if (["name", "yearJoined", "comments"].includes(e.target.name)) {
      let professionalBody = [...this.state.professionalBody]
      professionalBody[e.target.dataset.id][e.target.name] = e.target.value
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  addNewRow = e => {
    this.setState(prevState => ({
      professionalBody: [
        ...prevState.professionalBody,
        {
          id: Math.random(),
          name: null,
          yearJoined: null,
          comments: null,
        },
      ],
    }))
  }

  delete = index => {
    this.setState({
      professionalBody: this.state.professionalBody.filter(r => r !== index),
    })
  }

  render() {
    return (

      
      <fieldset>
        <div className="text-center">
          <h2 className="fs-title font-weight-700">Professional Bodies</h2>
          <h3 className="fs-subtitle mb-5">
            Professional bodies you belong or have belonged to
          </h3>
        </div>
        <div className="border-bottom">
          <div className="form-group text-left">
            <h5>
              I have belonged or belong to a professional body/bodies &nbsp;
            </h5>
            <h5>
              <label className="custom-toggle">
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
          </div>
        </div>
        {this.state.show ? (
          <form onChange={this.handleChange}>
            {this.state.professionalBody.map((body, index) => {
              let name = `name-${index}`,
                yearJoined = `yearJoined-${index}`,
                comments = `comments-${index}`
              return (
                <div key={body.ind} className="row text-left mt-3 mb-5">
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
                      onClick={() => this.delete(body)}
                    >
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>
                  )}
                </div>
              )
            })}
            <div className="col-md-12">
              <button
                className="btn btn-icon btn-3 btn-primary btn-sm"
                type="button"
                onClick={this.addNewRow}
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-plus" />
                </span>
                <span className="btn-inner--text">Add professional body</span>
              </button>
            </div>
          </form>
        ) : null}
      </fieldset>
   
   
   
   )
  }
}
