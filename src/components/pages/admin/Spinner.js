import React, { Component } from "react"
// import ClipLoader from "react-spinners/ClipLoader"
// import RingLoader from "react-spinners/RingLoader"
// import FadeLoader from "react-spinners/FadeLoader"
import {PushSpinner, ClassicSpinner, MetroSpinner} from "react-spinners-kit"
import logosm from "../../../images/logoFresh.png";
import { enquireScreen } from 'enquire-js';


class Spinner extends Component {
  state = {}

  componentDidMount(){
    enquireScreen((b) => {
      this.setState({
        isMobile: b,
      });
    });
  }
  render() {
    return (
      <div className="jumbo-back">
        <div className="container sp">
          <div className="jumbotron jumbo">
            <div className="metro-spin">
            {/* <MetroSpinner
              size={90}
              color={"#123abc"}
              loading={this.state.loading}
              
              
            /> */}
             <img src={logosm} className="pt-5 lloyd-logo" style={!this.state.isMobile ? {width:'50px'} : {width:'40px'}}/>
                <p className="text-white mt-4 manrope" style={this.state.isMobile ? {marginLeft:'-3px'} : {marginLeft:'7px', fontSize:'12px'}}>{this.props.msg}</p>
            </div>
            {/* <small><b>{this.props.msg}</b></small> */}
            {/* <p className="text-white mt-4" style={this.state.isMobile ? {marginLeft:'-3px'} : {marginLeft:'-12px'}}>Initializing...</p> */}

          </div>
        </div>
      </div>
    )
  }
}

export default Spinner
