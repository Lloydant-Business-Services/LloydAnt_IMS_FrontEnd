import React from "react";

import hero from "../images/hero.png";
import logosm from "../assets/img/theme/unizik.png";
// import logobg from "../images/ziklogo.png"
import "../styles/global.css";
import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import about1 from "../../src/images/about1.png";
import about2 from "../../src/images/about21.png";
import hiring from "../../src/images/hiring.svg";
import interview from "../../src/images/interview.svg";
import onboarding from "../../src/images/onboarding.svg";
import compensation from "../../src/images/compensation.svg";
import lloydant from "../../src/images/llan.png";
import { fetchData, fetchDataWithoutToken } from "../utils/crud";
import { Fade } from "reactstrap";

// import { navigate } from "@reach/router"

export default class ForeignVistationType extends React.Component {
  state = {
    jobVacancy: [],
    navigate: false,
  };
  VisitationType = () => {
    fetchDataWithoutToken("/ForeignVisitation/GetVisitationType", (data) => {
      this.setState({ visitationTypes: data });
    });
  };
  componentDidMount() {

    this.VisitationType();
  }

  render() {
    var dateYear = new Date();

    return (
      <>
        <Fade>
          <header className="masthead">
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <div className="site-heading">
                    <div
                      className="col-sm-12"
                      //   style={{ backgroundColor: "transparent" }}
                    >
                      <center>
                        <img
                          src={logosm}
                          className=""
                          style={{
                            padding: "10px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            height: "100px",
                          }}
                        />
                      </center>
                    </div>

                    {/* <center> */}
                    <h1 className="heading sofia display-5 text-white">
                      Visitation Type
                    </h1>
                    <span className="subheading sofia">
                      Current listings for international
                      collaborations/visitation type
                    </span>
                    {/* </center> */}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section>
            <div class="container mt-5">
              <div className="row mb-2 pr-2 pl-2">
                <div className="col-12">
                  {/* <h2 className="sofia">Open Positions</h2> */}
                </div>
              </div>

        

              {/* {this.state.jobVacancy && this.state.jobVacancy.length > 0
					? this.state.jobVacancy.map(vacancy => {
						return ( */}

            {this.state.visitationTypes && this.state.visitationTypes.map((v) =>{
              return(
                <div class="card mb-2 border">
                <div class="card-body d-md-flex align-items-center">
                  <div class="d-flex flex-fill align-items-center">
                    <div class="d-flex flex-fill flex-column flex-md-row align-items-md-center">
                      <div>
                        <h3 class="d-inline-block align-middle font-weight-bold mb-0 mr-2">
                          <span class="companyname sofia">
                            {v.name}
                          </span>
                        </h3>
                        <p class="card-text text-muted small mb-0 sofia">
                          {v.description}
                        </p>
                      </div>
                      <div class="ml-auto p-0 col-12 col-md-4 d-flex text-align-right justify-content-md-end align-items-center">
                        <span class="card-text text-muted small ml-auto">
                          <span class="font-weight-bold sofia"> Open: </span>
                          {/* {vacancy.dateCreated} */}
                        </span>
                        {/* <Link to={`/form`} state={vacancy}> */}
                        {v.id == 1 ? <Link
                          class="ml-auto btn btn-outline-primary sofia"
                          to={{
                            pathname: "/International_Collaboration_Form",
                            state:{data: v}
                          }}
                        >
                          Fill Form
                        </Link> : <a
                          class="ml-auto btn btn-outline-primary sofia"
                          href="#"
                          // to={{
                          //   pathname: "/International_Collaboration_Form",
                          //   state:{data: v}
                          // }}
                        >
                          Fill Form
                        </a>}
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              )
            })}
     
              {/* )
						})
					: <h3>There are no open Job Positions at this time. Kindly check back after some time</h3>} */}
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
                      <br />
                      <br />
                      <img src={lloydant} style={{ width: "50px" }} />
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Fade>
      </>
    );
  }
}
