import React from "react"
import hero from "../images/hero.png"
import logosm from "../images/ziklogosm.png"
import "../styles/global.css"
// import { fetchData } from "../utils/crud"
import _ from "lodash"

export default class Home extends React.Component {
  state = {
    jobVacancy: [],
  }

  // async componentDidMount() {
  //   await fetchData("/Home", data => {
  //     this.setState({ jobVacancy: data })
  //   })
  // }

  render() {
    var dateYear = new Date();
    return (
      <>
        <nav className="navbar navbar-top navbar-expand navbar-light m-0 p-0" style={{ backgroundColor: "#CCEFF9" }} >
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
              {/* Navbar links */}

              <a className="navbar-brand" href="dashboard.html" style={{ display: "inline-block" }} >
                {/* <img src="assets/img/brand/blue.png" class="navbar-brand-img" alt="..."> */}
                {/* <h2 className="mb-0 text-white pop-font">HRM</h2>  */}
                <span
                  className="avatar"
                  style={{ backgroundColor: "transparent" }}
                >
                  {/* <img src={logosm} className="pt-5" /> */}
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
           
                    <button className="btn btn-outline-accent">Sign In</button>
                 
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section className="pb-5 pr-2 pl-2 overflow-hidden shadow-sm hero">
          <div className="container">
            <div className="row">
              <div
                className="col-12 col-md-6 align-self-center mt-3 mb-3"
                style={{ marginTop: "-300px" }}
              >
                <div className="text-center mb-4">
                  <span className="" style={{ backgroundColor: "transparent" }}>
                    <img
                      src={logosm}
                      className=""
                      style={{
                        backgroundColor: "transparent",
                        height: "120px",
                        marginRight: "200px",
                      }}
                    />
                  </span>
                </div>
                <h1 className=" font-weight-700">Nnamdi Azikiwe University</h1>
                <h4 className=" font-weight-500 ">We Are Hiring...</h4>
                {/* <p className="mb-4 mt-2 font-weight-400">
                  Discover, hire and manage the best talent more efficiently,{" "}
                  <br />
                  with Human Resource Management System from Lloydant.{" "}
                </p> */}
                {/* <a href="#" className="btn btn-primary mb-2 col-12 col-sm-auto">
                  View Jobs
                </a>
                <a
                  href="#"
                  className="btn btn-outline-accent mb-2 col-12 col-sm-auto "
                >
                  Get Started
                </a> */}
              </div>
              <div className="col-12 col-md-6">
                <img src={hero} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section>
			<div className="container mt-5">

				{this.state.jobVacancy && this.state.jobVacancy.length > 0 ?
					<div className="row mb-2 pr-2 pl-2">
						<div className="col-12">
							<h2>Open Positions</h2>
						</div>
					</div>
					: null
				}

				{this.state.jobVacancy && this.state.jobVacancy.length > 0
				? this.state.jobVacancy.map((vacancy, index) => {
					return (
						<div key={index} className="card mb-2 border">
						<div className="card-body d-md-flex align-items-center">
							<div className="d-flex flex-fill align-items-center">
							<div className="d-flex flex-fill flex-column flex-md-row align-items-md-center">
								<div>
								<h3 className="d-inline-block align-middle font-weight-bold mb-0 mr-2">
									<span className="companyname">
									{vacancy.name}
									</span>
								</h3>
								<p className="card-text text-muted small mb-0">
									{vacancy.jobType.name}
								</p>
								</div>
								<div className="ml-auto p-0 col-12 col-md-4 d-flex text-align-right justify-content-md-end align-items-center">
								<span className="card-text text-muted small ml-auto">
									<span className="font-weight-bold">
									{" "}
									Open:{" "}
									</span>
									{vacancy.dateCreated}
								</span>
							
									<span className="ml-3 btn btn-accent ">
									Apply
									</span>
							
								</div>
							</div>
							</div>
						</div>
						</div>
					)
					})
				: null}
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
                    Lloydant Business Services
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

// export const query = graphql`
//   query {
//     allFile {
//       totalCount
//       edges {
//         node {
//           extension
//           dir
//           modifiedTime
//           publicURL
//         }
//       }
//     }
//   }
// `
