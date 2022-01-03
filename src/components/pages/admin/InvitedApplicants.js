import React from "react"
// import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import AppListDataTable from "./AppListDataTable"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import axios from "axios"
import InvitedDataTable from "./InvitedDataTable"
import Spinner from "./Spinner"

export default class InvitedApplicants extends React.Component {
  constructor() {
    super()

    this.state = {
      spin: true,
      allStaff: [],
      selectedApplicants: [],
      appointments: [],
      subject: "",
      message: "",
      checkedID: true,
      customApplicant: [
        {
          surname: "Oghenechavwuko",
          firstname: "Miracle",
          othername: "Goodspeed",
          email: "miracleoghenemado@gmail.com",
          position: "Vice-Chancellor",
          applicationScore: "100",
          personId: 1,
        },
        {
          surname: "Okafor",
          firstname: "Emeka",
          othername: "Obi",
          email: "miracle.speed@yahoo.com",
          position: "Registrar",
          applicationScore: "75",
          personId: 2,
        },

        {
          surname: "Eze",
          firstname: "Nwobodo",
          othername: "Ikemefunna",
          email: "eze@mail.com",
          position: "Driver",
          applicationScore: "44",
          personId: 3,
        },
      ],
    }

    console.log("checking")
  }

  handleSubmit = e => {
    e.preventDefault()

    const applicantPayload = []
    const { selectedApplicants } = this.state

    selectedApplicants.forEach((applicantId, index) => {
      const invite = {
        subject: this.state.subject,
        message: this.state.message,
        id: parseInt(applicantId),
      }

      applicantPayload.push(invite)
    })
    console.log(applicantPayload)

    postData("/Email", applicantPayload, data => {
      console.log({ data })
      const { appointments } = this.state
      appointments.push(data)
      this.setState({ ...this.state, appointments, name: "", active: true })
      if (data == "success") {
        alert("Invitation Email Sent Successfully!")
        this.componentDidMount();
        // if(typeof window !== "undefined"){
        //   window.location.reload(true)
        // }
      }
      console.log(appointments)
    })
  }
  inviteApplicants = e => {
    e.preventDefault()

    let inviteArr = []
    const form = typeof window !== "undefined" ? document.querySelectorAll("input[name=applicant]") : [];

    for (let a of form) {
      if (a.checked) inviteArr.push(a.value)
    }

    setTimeout(() => {
      console.log(inviteArr, "Invited")
    }, 1000)
    this.setState({
      selectedApplicants: inviteArr,
    })
    setTimeout(() => {
      console.log(this.state.selectedApplicants, "Selected Applicant")
    }, 1000)
  }

  componentDidMount() {
    // fetchData("/Staff", data => {
    //   this.setState({ allStaff: data })
    // })

    fetchData("/ApplicationForm/Invited", data => {
      this.setState({ uninvitedApplicants: data, spin: false })

      setTimeout(() => {
        console.log(this.state.uninvitedApplicants, "Selected Applicant")
      }, 4000)

      let mappedApplicants = this.state.uninvitedApplicants.map((d, index) => {
        this.setState({
          newID: d.personId,
        })

        return {
          sn: index + 1,
          surname: d.person.surname,
          firstname: d.person.firstname,
          othername: d.person.othername,
          email: d.person.email,
          position: d.jobVacancy.name,
          applicationScore: d.applicationScore,
        }
      })
      this.setState({
        myApplicants: mappedApplicants,
      })
      //   console.log(this.state.checkedID)
    })
  }
  render() {
    return (
      <div className="header-body">
        {this.state.spin ? <Spinner /> : null}

        <div className="row align-items-center py-4">
            <div className="col-lg-12 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">Applicants</h6>
                    <span className="h3 text-muted">
                    /Invited Applicants List
                    </span>
            </div>
            <div className="col-lg-6 col-5 text-right">
            </div>
        </div>

        <InvitedDataTable passedApplicant={this.state.myApplicants} />

        <form onSubmit={e => this.handleSubmit(e)}>
          <div class="modal fade mod-me" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Invitation Message</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div class="modal-body">
                  <labe>Subject</labe>:{" "}
                  <input
                    className="form-control"
                    type="text"
                    onChange={e =>
                      this.setState({
                        subject: e.target.value,
                      })
                    }
                  />
                  <br />
                  <label>Message</label> :{" "}
                  <textarea
                    onChange={e =>
                      this.setState({
                        message: e.target.value,
                      })
                    }
                    className="form-control"
                  ></textarea>
                </div>

                <div class="modal-footer">
                  <button onClick={this.handleSubmit} class="btn btn-info">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
