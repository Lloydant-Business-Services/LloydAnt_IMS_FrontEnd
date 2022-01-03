import React from "react"
import { graphql } from "gatsby"

export default class settings extends React.Component {
  render() {
    return (
      <>
        <div className="header-body">
          <div className="row py-4">
            <div className="col-md-6">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Dashboard{" "}
                <span className="h3 text-muted">/Organization Details</span>
              </h6>
              <span className="text-sm d-block">
                Set and manage the details of your organization.
              </span>
            </div>
          </div>
          {/* Card stats */}
          <div className="row justify-content-center">
            <div className="col-md-6">
              
              <div className="card">
                <div className="card-body">

                  <form>
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Organization Name
                  </label>
                      <input className="form-control" name="name" type="text" />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Logo
                  </label>
                      <input className="form-control" name="logoUrl" type="file" />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Email Address
                  </label>
                      <input className="form-control" name="email" type="text" />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Office Address
                  </label>
                      <input className="form-control" name="address" type="text" />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Organization Phone
                  </label>
                      <input className="form-control" name="phone" type="text" />
                    </div>
                    <div className="text-center">
                      <button className="btn btn-primary">Update Details</button>
                    </div>
                    
                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }
}

export const query = graphql`
  query {
    allFile {
      totalCount
      edges {
        node {
          extension
          dir
          modifiedTime
          publicURL
        }
      }
    }
  }
`
