import React from "react"

export default class Journals extends React.Component {
  state = {
    show: false,
    journals: [
      {
        id: Math.random(),
        title: "",
        yearOfPublication: 0,
        nameOfPublisher: "",
      },
    ],
  }

  handleChange = e => {
    if (
      ["title", "yearOfPublication", "nameOfPublisher"].includes(e.target.name)
    ) {
      let journals = [...this.state.journals]
      journals[e.target.dataset.id][e.target.name] = e.target.value
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  addNewRow = e => {
    this.setState(prevState => ({
      journals: [
        ...prevState.journals,
        {
          id: Math.random(),
          title: "",
          yearOfPublication: "",
          nameOfPublisher: "",
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
      journals: this.state.journals.filter(r => r !== index),
    })
  }

  render() {
    return (

      
      <fieldset>
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
            <h5>I have journals or other published work &nbsp;</h5>
            <h5>
              <label
                className="custom-toggle"
                onClick="showThisForm('publications')"
              >
                <input
                  type="checkbox"
                  value={this.state.show}
                  onChange={this.handleShow}
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
            {this.state.journals.map((journal, index) => {
              let title = `title-${index}`,
                yearOfPublication = `yearOfPublication-${index}`,
                nameOfPublisher = `nameOfPublisher-${index}`
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
                      onClick={() => this.delete(journal)}
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
                <span className="btn-inner--text">Add publication</span>
              </button>
            </div>
          </form>
        ) : null}
      </fieldset>
   
   
   
   )
  }
}
