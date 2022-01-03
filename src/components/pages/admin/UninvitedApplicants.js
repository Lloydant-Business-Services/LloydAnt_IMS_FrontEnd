import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import UninvitedDataTable from "./UninvitedDataTable"
import Spinner from "./Spinner"
import {Modal} from "reactstrap"
import Notification from "../../Reusables/NotificationCard"
// import ReactToPrint from "react-to-print"

export default class UninvitedApplicants extends React.Component {
 

    state = {
      spin:true,
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

  

  handleSubmit = e => {
    e.preventDefault()
    this.setState({inviteModal:false, spin:true})

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
        this.setState({spin:false})
        // alert("Invitation Email Sent Successfully!")
        this.setState({inviteSuccess:true})

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
this.setState({inviteModal:true})
    let inviteArr = []
    const form = typeof window !== "undefined" ? document.querySelectorAll("input[name=applicant]"): []

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

    fetchData("/ApplicationForm/Uninvited", data => {
      this.setState({ uninvitedApplicants: data, spin:false })

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
          check: (
            <label class="container" > 
              <input name="applicant" value={d.personId} type="checkbox" />
              <span class="checkmark"></span>
            </label>
          ),
        }
      })
      this.setState({
        myApplicants: mappedApplicants,
      })
      //   console.log(this.state.checkedID)
    })
  }

  closeInvite = () => {
    this.setState({inviteSuccess:false})
  }

  render() {
    return (
      <>
      {this.state.inviteSuccess ? <Notification
        okBtn={true}
        closeCard={this.closeInvite}
        message={"Email Successfully Sent to Selected Applicant(s)!"}
      /> : null}
      {this.state.spin ? <Spinner/> : null}
      <div className="header-body">
          <div className="row align-items-center py-4">
              <div className="col-lg-12 col-7">
                  <h6 className="h1 d-inline-block mb-0 pop-font">Applicants</h6>
                      <span className="h3 text-muted">
                      /Uninvited Applicants List
                      </span>
              </div>
              <div className="col-lg-6 col-5 text-right">
              </div>
          </div>

        {/* <div>
          <ReactToPrint
            trigger={() => <button>Print</button>}
            content={() => this.componentRef}
          />
          <div style={{ display: "none" }}>
            <UninvitedDataTable
              passedApplicant={this.state.myApplicants}
              ref={el => (this.componentRef = el)}
            />
          </div>
        </div> */}

        <UninvitedDataTable
          passedApplicant={this.state.myApplicants}
          rawData={this.state.uninvitedApplicants}
        />

        <button type="button" class="btn btn-primary"
          data-toggle="modal" data-target="#myModal"
          onClick={this.inviteApplicants} >
          Invite Selected Applicants
        </button>

       <Modal isOpen={this.state.inviteModal}> 
        <form onSubmit={e => this.handleSubmit(e)}>
         
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Invitation Message</h4>
                  <button type="button" class="close" data-dismiss="modal" onClick={()=>{this.setState({inviteModal:false})}}>
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
        </form>
        </Modal>
      </div>
      </>
    )
  }
}
