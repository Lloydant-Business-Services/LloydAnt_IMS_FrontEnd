import React from "react"

import hero from "../images/hero.png"
import logosm from "../images/ziklogosm.png"
// import logobg from "../images/ziklogo.png"
import "../styles/global.css"
import {Link, Redirect} from "react-router-dom";
import about1 from '../../src/images/about1.png'
import about2 from '../../src/images/about21.png'
import hiring from '../../src/images/hiring.svg'
import interview from '../../src/images/interview.svg'
import onboarding from '../../src/images/onboarding.svg'
import compensation from '../../src/images/compensation.svg'
import lloydant from "../../src/images/llan.png"
import { fetchData, fetchDataWithoutToken } from "../utils/crud"
import Avatar from "../images/use.png"
import Spinner from "../components/pages/admin/Spinner"

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    
    Fade,
  } from "reactstrap";
  

// import { navigate } from "@reach/router"

export default class GetLoginDetails extends React.Component {
  state = {
    jobVacancy: [],
    navigate:false,
  }

  checkStaffInfo = () => {
    this.setState({spin:true})
    fetchDataWithoutToken(`/Staff/GetLoginCredentials?surname=${this.state.surname}&staffNumber=${this.state.staffNumber}`, data => {
      console.log(data, "Staff data")
      if(data.status == 200){
        this.setState({staffInfo:data, spin:false, userFound:true})

      }else if(data.status == 204){
        this.setState({spin:false})
        alert("No Record Found!")

      }
    })
  }
 

  componentDidMount() {
  // fetchData("/JobVacancy", data => {
	//   console.log(data, "Data")
	//   this.setState({
	// 	  jobVacancy:data
	//   })
  // })
     
  }

  render() {
    var dateYear = new Date();



   
    return (
      <>
      {this.state.spin ? <Spinner msg={"Checking..."}/> : null}
      <Modal
          isOpen={this.state.userFound}
          // style={{ maxWidth: "700px" }}
        >
          <ModalHeader>
              <div className="container" style={{textAlign:"center"}}>
             <span className="badge badge-success">Login Credentials/Info</span>
              </div>
              </ModalHeader>
          <ModalBody>
          <div className="container" style={{textAlign:"center"}}>
            
          <img class="card-img-top" src={Avatar} style={{width:"150px", background:"transparent", borderRadius:"30px"}} alt="Card image"/>
          </div>

          <div className="form-group" style={{marginTop:"30px"}}>
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Staff Name
                    </label>
    <h2 className="text-muted">{this.state.staffInfo?.surname} {this.state.staffInfo?.firstName} {this.state.staffInfo?.otherName}</h2>
        </div>

        
        <div className="form-group" style={{marginTop:"30px"}}>
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Staff Number
                    </label>
                   <h2 className="text-muted">{this.state.staffInfo?.staffIdentityNumber}</h2>
        </div>

        <div className="form-group" style={{marginTop:"30px"}}>
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Login Username
                    </label>
                   <h2 className="text-muted">{this.state.staffInfo?.userName}</h2>
        </div>

        <div className="form-group" style={{marginTop:"30px"}}>
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Default Password
                    </label>
                   <h2 className="text-muted">1234567</h2>
        </div>
        <small className="text-danger"><span className="text-danger">IMPORTANT! :</span> On successful login into your account using the information provided above, it is <b>STRICTLY</b> recommended that you immediately change your password for security and privacy sake!</small>

         
          </ModalBody>
          <ModalFooter>
            
          
            
            <button
              className="btn btn-danger"
              onClick={()=> {this.setState({userFound:false})}}
            >
              Close
            </button>
          </ModalFooter>
        </Modal>



        <nav
          className="navbar navbar-top navbar-expand navbar-light m-0 p-0"
          style={{ backgroundColor: "#CCEFF9" }}
        >
			<div className="container">
				<div
				className="collapse navbar-collapse"
				id="navbarSupportedContent"
				>
				{/* Navbar links */}
				<a
					className="navbar-brand"
					href="dashboard.html"
					style={{ display: "inline-block" }}
				>
					{/* <img src="assets/img/brand/blue.png" class="navbar-brand-img" alt="..."> */}
					{/* <h2 className="mb-0 text-white pop-font">HRM</h2>  */}
					<span
					className="avatar avatar-sm"
					style={{ backgroundColor: "transparent" }}
					>
					<img src={logosm} className="pt-5" />
					</span>
				</a>

				<ul className="navbar-nav align-items-center ml-md-auto">
					<li className="nav-item d-xl-none">
					{/* Sidenav toggler */}
					<div
						className="pr-3 sidenav-toggler sidenav-toggler-light"
						data-action="sidenav-pin"
						data-target="#sidenav-main"
					>
						<div className="sidenav-toggler-inner">
						<i className="sidenav-toggler-line" />
						<i className="sidenav-toggler-line" />
						<i className="sidenav-toggler-line" />
						</div>
					</div>
					</li>

					<li className="nav-item">
					{/* <Link className="nav-link" to="/login"> */}
						{/* <button className="btn btn-outline-primary" to="/admin/user-profile" tag={Link}>Sign In</button> */}
						<Button className="btn btn-outline-primary" to="/Home" color={"primary"} tag={Link}>
							Home
						</Button>
					{/* </Link> */}
					</li>
				</ul>
				</div>
			</div>
			</nav>

			<section className="pb-5 pr-2 pl-2 overflow-hidden shadow-sm hero" style={{backgroundColor:"rgb(204, 239, 249)"}}>
			<div className="container">
				
			</div>
			</section>

			<section >
				<div class="container mt-5">
						<div className="row mb-2 pr-2 pl-2">
							<div className="col-12">
								<h2>Get Login Credentials</h2>
							</div>
						</div>
						<div className="container">
						<div className="row my-4">
                        <div className="row col-md-10">
              <div className="card col-md-11 dateCard">
                <div className="row card-body">

            
                    <br />
                    <br />
                



                  <div className="col-md-5">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Surname
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => {this.setState({surname: e.target.value})}}
                        placeholder="Enter Surname"
                        required
                      />
                          
                       
                    </div>
                    
                  </div>

                  <div className="col-md-5">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Staff Number
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => {this.setState({staffNumber: e.target.value})}}
                        placeholder="Enter Staff number"
                        required
                      />
                          
                       
                    </div>
                    
                  </div>
     

                    <div className="row col-md-5" style={{marginLeft:"8px"}}>
                        <button className="btn btn-primary" onClick={this.checkStaffInfo}><i className="fa fa-search"/></button>
                    </div>


               



                </div>
              </div>


              </div>
							
						</div>
						
					</div>
					

					{/* {this.state.jobVacancy && this.state.jobVacancy.length > 0
					? this.state.jobVacancy.map(vacancy => {
						return (
							<div class="card mb-2 border">
							<div class="card-body d-md-flex align-items-center">
								<div class="d-flex flex-fill align-items-center">
								<div class="d-flex flex-fill flex-column flex-md-row align-items-md-center">
									<div>
									<h3 class="d-inline-block align-middle font-weight-bold mb-0 mr-2">
										<span class="companyname">{vacancy.name}</span>
									</h3>
									<p class="card-text text-muted small mb-0">
										{vacancy.jobType.name}
									</p>
									</div>
									<div class="ml-auto p-0 col-12 col-md-4 d-flex text-align-right justify-content-md-end align-items-center">
									<span class="card-text text-muted small ml-auto">
										<span class="font-weight-bold"> Open: </span>
										{vacancy.dateCreated}
									</span>
										<Link class="ml-auto btn btn-outline-primary " to={{pathname:"/Application", state:{data: vacancy.id}}}>
										Apply
										</Link>
									</div>
								</div>
								</div>
							</div>
							</div>
						)
						})
					: null} */}

				</div>
				
				

				

			
			</section>

			<div className="container-fluid mt-12 min-vh-20 bg-lighter" style={{marginTop:"300px"}}>
			{/* Footer */}
			<footer className="footer py-auto bg-lighter">
				<div className="row align-items-center justify-content-lg-between">
					<div className="col-lg-12">
						<div className="copyright text-center text-muted">
						Copyright © {dateYear.getFullYear()}{" "}
						<a
							href="https://www.lloydant.com/"
							className="font-weight-bold ml-1"
							target="_blank"
						>
							<br/>
							<br/>
							<img src={lloydant} style={{width:"50px"}}/>
						</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
      </>
    )
  }
}


