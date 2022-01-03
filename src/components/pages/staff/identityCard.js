import React from "react"
import { fetchData } from "../../../utils/crud"
import logosm from "../../../images/ziklogosm.png"
import logobg from "../../../images/ziklogo.png"
import qrcode from "../../../images/qr-code.png"
import avi from "../../../images/theme/team-1.jpg"
import image from "../../../images/docs/VALIMAGE.jpeg"
import Loadable from "react-loadable";
import Layout from "../../layout"
import {Redirect} from "react-router-dom"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
// const jsPDF = typeof window !== "undefined" ? require("jspdf").default : null;
// const html2canvas = typeof window !== "undefined" ? require("html2canvas").default : null;

// const jsPDF = Loadable({
//   loader: () => import("jspdf"),
//   loading: React,
// });

// const html2canvas = Loadable({
//   loader: () => import("html2canvas"),
//   loading: React,
// });

// const jspdf_autotable = Loadable({
//   loader: () => import("jspdf-autotable"),
//   loading: React
// });

// let jsPDF = null;
// let html2canvas = null;
// (async () => {
//     if (typeof window !== "undefined") {
//       // import module for side effects
//       jsPDF = await import("jspdf");
//       html2canvas = await import("html2canvas");
//     }
//   })();

export default class IdentityCard extends React.Component {
  state = {
    payLoad: JSON.parse(localStorage.getItem("DTO")),
    payLoad2: JSON.parse(localStorage.getItem("userData")),


    // rec: this.props.location.state.newData,
    staff: {
      staffNumber: "NAU/",
      person: {
        surname: "",
        firstname: "",
        othername: "",
        birthDay: "",
        email: "",
        address: "",
        phoneNumber: "",
        stateId: 0,
        lgaId: 0,
        maritalStatusId: 0,
        religionId: 1,
        genderId: 0,
        imageUrl: "",
        id: 0,
      },
      rankId: 0,
      departmentId: 0,
      appointmentId: 0,
      unitId: 0,
      staffTypeId: 0,
      categoryId: 0,
      rank: "",
      department: "",
      appointment: "",
      unitd: "",
      staffType: "",
      category: "",
      id: 0,
    },
  }


  printIdCard = () => {
		const filename  = 'StaffID Card.pdf';

    if(typeof window !== "undefined"){
      html2canvas(document.querySelector('#IDcard')).then(canvas => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 50, 20, 120, 75);
        pdf.save(filename);
      });
    }
	}
  loadStaff = () => {
    const id = this.state.payLoad2.staffId
    fetchData(`/Staff/${id}`, data => {
      this.setState({staffInfo:data })

      console.log(data, "staffData")
      const { staff } = this.state
      staff.staffNumber = data.staffNumber
      staff.person.surname = data.person.surname
      staff.person.firstname = data.person.firstname
      staff.person.othername = data.person.othername
      staff.person.birthDay = data.person.birthDay
      staff.person.email = data.person.email
      staff.person.address = data.person.address
      staff.person.phoneNumber = data.person.phoneNumber
      staff.person.stateId = data.person.stateId
      staff.person.lgaId = data.person.lgaId
      staff.person.maritalStatusId = data.person.maritalStatusId
      staff.person.religionId = data.person.religionId
      staff.person.genderId = data.person.genderId
      staff.person.id = data.person.id
      

      staff.rankId = data.rankId
      staff.departmentId = data.departmentId
      staff.appointmentId = data.appointmentId
      staff.unitId = data.unitId
      staff.staffTypeId = data.staffTypeId
      staff.categoryId = data.categoryId

      staff.rank = data.rank.name
      staff.department = data.department.name
      staff.appointment = data.appointment.name
      staff.unit = data.unit.name
      staff.staffType = data.staffType.name
      staff.category = data.category.name
      staff.person.imageUrl = data.person.imageUrl
      staff.id = data.id
      console.log(data, "Data")
    })
  }
  componentDidMount() {
    this.loadStaff()
    console.log(this.state.rec, "Recieved!!")
  }

  render() {
    if(this.state.userRedirect){
      return(
          <Redirect
          to={{pathname:"/Login"}}
          />
      )
  }
    return (
      <>
    
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Dashboard <span className="h3 text-muted">/Staff ID Card</span>
              </h6>
              <span className="text-sm d-block">ID Card.</span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>
          {/* Card stats */}
          <div className="row justify-content-md-center" >
            <hr className="mx-0" />
            <div className="col-md-6">
              <div className="card px-3">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <div>
                        <button
                      
                          className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                          type="button"
                          onClick={this.printIdCard}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-download" />
                          </span>
                          <span className="btn-inner--text">Download Card</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-lighter3 id-card" id="IDcard">
                  <div className="card-header bg-main py-2">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-12 text-center">
                        <img
                          src={logobg}
                          style={{ height: "64px", width:"300px" }}
                          
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-accent"
                    style={{ backgroundColor: "#FF6000", minHeight: "5px" }}
                  ></div>

                  {/* Card body */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-4 bg-lighter">
                        <img src={this.state.staffInfo?.person.imageUrl} style={{width: "inherit", backgroundColor: "#E9ECEF"}} alt="Passport not Uploaded" />
                        {/* <img
                          src={image}
                          style={{
                            height: "165px",
                            backgroundColor: "#E9ECEF",
                          }}
                          alt="Image placeholder"
                        /> */}
                      </div>
                      <div className="col-8">
                        <div className="row">
                          <div className="col-6">
                            <span className="badge badge-lg badge-success">
                              {this.state.staff.unit}
                            </span>
                          </div>
                          <div className="col-6 text-right">
                            <img
                              src={qrcode}
                              style={{ height: "50px" }}
                              alt="QR Code"
                            />
                          </div>
                        </div>

                        <div className="my-2">
                          <span className="h6 surtitle text-muted">Name</span>
                          <div className="card-serial-number h4">
                            <div>
                              {this.state.staffInfo?.person.surname}{" "}
                              {this.state.staffInfo?.person.firstname}{" "}
                              {this.state.staffInfo?.person.othername}{" "}

                              
                         
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col">
                            <span className="h6 surtitle text-muted">Rank</span>
                            <span className="d-block h4 ">
                              {this.state.staffInfo?.rank?.name}
                            </span>
                          </div>
                          <div className="col">
                            <span className="h6 surtitle text-muted">
                              Staff Number
                            </span>
                            <span className="d-block h4 ">
                              {this.state.staffInfo?.generatedStaffNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer text-center bg-lighter">
                    <span className="h6 text-muted">
                      Enugu-Onitsha Expressway, Ifite Road, 420110, Awka
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
       
       
        </div>
     
      </>
    
    
    )
  }
}
