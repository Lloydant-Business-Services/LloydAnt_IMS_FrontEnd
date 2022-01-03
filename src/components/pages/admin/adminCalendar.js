import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import _ from "lodash"
import Calendar from "../../calendar"

export default class AdminCalendar extends React.Component {
  state = {
    events: [],
    event: {
      name: "string",
      venue: "string",
      date: "2020-02-11T15:07:38.669Z",
      id: 0,
    },
  }

  updateEventItem = (index, value) => {
    const { event } = this.state
    event[index] = value
    this.setState({ ...this.state, event })
  }

  updateStaffItem = (index, value) => {
    const { staff } = this.state
    staff[index] = value
    this.setState({ ...this.state, staff })
  }

  loadEvents = () => {
    fetchData("/Events", data => {
      this.setState({ events: data })
    })
  }




  getCurrentMonthName = () => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",

    ]
    var now = new Date()
    return months[now.getMonth()]
  }

  getStaffBirthdays = () => {}

  isValidInputs = () => {
    return true
  }

  setSelectedData = data => {
    let { event } = this.state
    event = data
    this.setState({ ...this.state, event })
  }

  submitForm = () => {
    if (this.isValidInputs()) {
      postData("/Events", this.state.event, data => {
        const { events } = this.state
        events.push(data)
        this.setState({ ...this.state, events })
      })
    }
  }

  updateForm = () => {
    if (this.isValidInputs()) {
      editData(`/Events/${this.state.event.id}`, this.state.event, data => {
        this.loadEvents()
      })
      this.loadEvents()
    }
  }

  deleteNews = () => {
    if (this.state.event.name !== "" && this.state.event.id > 0) {
      deleteData(`/Events/${this.state.event.id}`, () => {
        fetchData("/Events", data => {
          this.setState({ events: data })
        })
      })
    }
  }

  componentDidMount() {
    this.loadEvents()
  }

  render() {
    return (
      <>
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Dashboard <span className="h3 text-muted">/Staff Calendar</span>
              </h6>
            </div>
            <div className="col"></div>
          </div>
          {/* Card stats */}
          <div className="row">
            <div className="col-md-6">
              <Calendar events={this.state.events} />
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3>All {this.getCurrentMonthName()} Events</h3>
                  <button
                    className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                    type="button"
                    data-toggle="modal"
                    data-target=".new-level-modal"
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-plus" />
                    </span>
                    <span className="btn-inner--text">Add Event</span>
                  </button>
                  <div></div>
                </div>
                <div className="card-body">
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-content="axis"
                    data-timeline-axis-style="dashed"
                  >
                    {this.state.events != null && this.state.events.length > 0
                      ? this.state.events.map(event => {
                          return (
                            <div className="timeline-block">
                              <span className="timeline-step badge-success">
                                <i className="ni ni-briefcase-24" />
                              </span>
                              <div className="timeline-content">
                                <div className="d-flex justify-content-between pt-1">
                                  <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                      {event.venue}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <small className="text-muted">
                                      <i className="fas fa-clock mr-1" />
                                      {event.date.substring(0, 10)}
                                    </small>
                                    <button
                                      onClick={() =>
                                        this.setSelectedData(event)
                                      }
                                      type="button"
                                      rel="tooltip"
                                      className="ml-5 btn btn-primary-alt btn-icon btn-sm "
                                      data-toggle="modal"
                                      data-target=".edit-level-modal"
                                    >
                                      <i className="fa fa-edit pt-1" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        this.setSelectedData(event)
                                      }
                                      type="button"
                                      rel="tooltip"
                                      className="ml-1 btn btn-danger btn-icon btn-sm "
                                      data-toggle="modal"
                                      data-target=".delete-level-modal"
                                    >
                                      <i className="fa fa-trash pt-1" />
                                    </button>
                                  </div>
                                </div>
                                <h6 className="text-sm mt-1 mb-0">
                                  {event.name}
                                </h6>
                              </div>
                            </div>
                          )
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt--6">
          <div></div>
          <div
            className="modal fade new-level-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Create Event
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Event
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="Subject"
                            onChange={e => {
                              this.updateEventItem("name", e.target.value)
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Venue
                          </label>
                          <textarea
                            className="form-control"
                            onChange={e => {
                              this.updateEventItem("venue", e.target.value)
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Date
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            name="date"
                            onChange={e => {
                              this.updateEventItem("date", e.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => this.submitForm()}
                      data-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade edit-level-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Edit Event
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Event
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.event.name}
                        name="Subject"
                        onChange={e => {
                          this.updateEventItem("name", e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Venue
                      </label>
                      <textarea
                        className="form-control"
                        value={this.state.event.venue}
                        onChange={e => {
                          this.updateEventItem("venue", e.target.value)
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Date
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        value={this.state.event.date.substring(0, 10)}
                        name="Subject"
                        onChange={e => {
                          this.updateEventItem("date", e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => this.updateForm()}
                    data-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade delete-level-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Delete Staff?
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    <div>
                      <p>
                        Are you sure you want to delete this record? All items
                        related to it will be affected
                      </p>
                      <button
                        data-dismiss="modal"
                        onClick={() => this.deleteNews()}
                        className="btn btn-outline-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
