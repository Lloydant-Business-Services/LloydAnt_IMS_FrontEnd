import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const Index = ({ data }) => (
  <>
    <div className="header-body">
      <div className="row align-items-center py-4">
        <div className="col-lg-6 col-7">
          <h6 className="h1 d-inline-block mb-0 pop-font">Dashboard</h6>
        </div>
        <div className="col-lg-6 col-5 text-right"></div>
      </div>
      {/* Card stats */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card card-stats">
            {/* Card body */}
            <div className="card-body">
              <div className="row">
                <div className="col pop-font">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Total Staff
                  </h5>
                  <span className="h1 font-weight-bold mb-0">1,897</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                    <i className="ni ni-single-02" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card card-stats">
            {/* Card body */}
            <div className="card-body">
              <div className="row">
                <div className="col pop-font">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Branches
                  </h5>
                  <span className="h1 font-weight-bold mb-0">4</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                    <i className="ni ni-chart-pie-35" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card card-stats">
            {/* Card body */}
            <div className="card-body">
              <div className="row">
                <div className="col pop-font">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Open Positions
                  </h5>
                  <span className="h1 font-weight-bold mb-0">24</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                    <i className="ni ni-badge" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card card-stats">
            {/* Card body */}
            <div className="card-body">
              <div className="row">
                <div className="col pop-font">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    Active Interviews
                  </h5>
                  <span className="h1 font-weight-bold mb-0">6</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                    <i className="ni ni-briefcase-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default Index

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
