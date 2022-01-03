import React, { Component } from "react"
import {PushSpinner, ClassicSpinner, MetroSpinner} from "react-spinners-kit"

class SaveSpinner extends Component {
  state = {}

  render() {
    return (
      <div style={{zIndex:"60"}} className="jumbo-back">
        <div className="container sp">
          <div className="jumbotron jumbo">
            <div className="metro-spin">
            <MetroSpinner
              size={90}
              color={"#123abc"}
              loading={this.state.loading}
              
              
            />
            </div>
            <p><b>{this.props.msg}</b></p>
          </div>
        </div>
      </div>
    )
  }
}

export default SaveSpinner
