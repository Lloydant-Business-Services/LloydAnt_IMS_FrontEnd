import React, { Component } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import RingLoader from "react-spinners/RingLoader"
import FadeLoader from "react-spinners/FadeLoader"

class SpinnerMain extends Component {
  state = {}

  render() {
    return (
      <div className="jumbo-back">
        <div className="container sp">
          <div className="jumbotron jumbo">
            <ClipLoader
              size={100}
              color={"#123abc"}
              loading={this.state.loading}
            />
           
          </div>
        </div>
      </div>
    )
  }
}

export default SpinnerMain
