import React from "react"

import hero from "../images/hero.png"
import logosm from "../images/ziklogosm.png"
// import logobg from "../images/ziklogo.png"
import "../styles/global.css"
import {Button} from "reactstrap"
import {Link, Redirect} from "react-router-dom";
import about1 from '../../src/images/about1.png'
import about2 from '../../src/images/about21.png'
import hiring from '../../src/images/hiring.svg'
import interview from '../../src/images/interview.svg'
import onboarding from '../../src/images/onboarding.svg'
import compensation from '../../src/images/compensation.svg'
import lloydant from "../../src/images/llan.png"
import { fetchData, fetchDataWithoutToken } from "../utils/crud"

// import { navigate } from "@reach/router"

export default class JobPositions extends React.Component {
  state = {
    jobVacancy: [],
    navigate:false
  }
 

  componentDidMount() {
  fetchDataWithoutToken("/JobVacancy/DisplayJobVacancy", data => {
	  console.log(data, "Data")
	  this.setState({
		  jobVacancy:data
	  })
  })
     
  }

  render() {
    var dateYear = new Date();



   
    console.log(this.state.jobVacancy.map(id => console.log(id.id)))
    return (
      <>
      
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

			<section>
				<div class="container mt-5">
					
					
						<div className="row mb-2 pr-2 pl-2">
							<div className="col-12">
								<h2>Open Positions</h2>
							</div>
						</div>
						
						{this.state.jobVacancy.length < 0 ? <div className="container">
						 <div className="row my-4">
							<div className="col-lg-6 mb-4 mt-lg-5">
								<h2 className="display-12 sofia">There are no open Job Positions at this time. Kindly check back after a while...</h2>
								
							</div>
	
							
						</div> 
						
					</div> : null}
					

					{this.state.jobVacancy && this.state.jobVacancy.length > 0
					? this.state.jobVacancy.map(vacancy => {
						return (
							<div class="card mb-2 border">
							<div class="card-body d-md-flex align-items-center">
								<div class="d-flex flex-fill align-items-center">
								<div class="d-flex flex-fill flex-column flex-md-row align-items-md-center">
									<div>
									<h3 class="d-inline-block align-middle font-weight-bold mb-0 mr-2">
										<span class="companyname">{vacancy.vacancyName}</span>
									</h3>
									<p class="card-text text-muted small mb-0">
										{vacancy.jobType}
									</p>
									</div>
									<div class="ml-auto p-0 col-12 col-md-4 d-flex text-align-right justify-content-md-end align-items-center">
									<span class="card-text text-muted small ml-auto">
										<span class="font-weight-bold"> Open: </span>
										{vacancy.dateCreated}
									</span>
									{/* <Link to={`/form`} state={vacancy}> */}
										<Link class="ml-auto btn btn-outline-primary " to={{pathname:"/Application", state:{data: vacancy.jobId}}}>
										Apply
										</Link>
									{/* </Link> */}
									</div>
								</div>
								</div>
							</div>
							</div>
						)
						})
					: <h3>There are no open Job Positions at this time. Kindly check back after some time</h3>}

				</div>
				
				

				

			
			</section>

			<div className="container-fluid mt-5 min-vh-20 bg-lighter">
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


